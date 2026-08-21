import { NextResponse } from "next/server";
import { allow, clientIp, DAY, HOUR, type Limit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Limites d'envoi du formulaire de contact.
 *
 * Cet endpoint est public et chaque appel valide déclenche un email via
 * Brevo. Le destinataire est fixe (jan@inawa.org), donc le risque n'est pas
 * de bombarder un tiers mais de vider le quota du compte Brevo, partagé avec
 * medialuna.org et diagnostic-pme : 300 envois par jour pour les trois.
 * Le honeypot n'arrête qu'un robot naïf, celui qui remplit tous les champs.
 *
 * Les valeurs sont calibrées sur l'usage réel d'un site vitrine de freelance :
 * quelques messages par semaine. Un visiteur légitime qui envoie deux fois son
 * message n'est jamais gêné.
 */
const PER_IP: Limit[] = [
  { windowMs: HOUR, max: 3 },
  { windowMs: DAY, max: 10 },
];

const PER_EMAIL: Limit[] = [
  { windowMs: HOUR, max: 2 },
  { windowMs: DAY, max: 5 },
];

/** Filet de sécurité, toutes provenances confondues. */
const GLOBAL: Limit[] = [{ windowMs: DAY, max: 40 }];

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";
// Expéditeur : domaine inawa.app authentifié dans Brevo (PAS inawa.org).
const FROM_EMAIL = process.env.CONTACT_FROM || "contact@inawa.app";
const FROM_NAME = process.env.CONTACT_FROM_NAME || "Site inawa.org";
const TO_EMAIL = process.env.CONTACT_TO || "jan@inawa.org";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const isEmail = (s: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s);

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const name = String(data.name ?? "").trim().slice(0, 120);
  const email = String(data.email ?? "").trim().slice(0, 200);
  const idea = String(data.idea ?? "").trim().slice(0, 5000);
  const stage = String(data.stage ?? "").trim().slice(0, 40);
  const honeypot = String(data.company ?? "").trim();

  // Bot détecté (honeypot rempli) : on renvoie un succès sans rien envoyer.
  if (honeypot) return NextResponse.json({ ok: true });

  if (!name || !idea || !isEmail(email)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  // Limitation de débit. Le refus renvoie la même réponse que le succès, comme
  // le fait déjà le honeypot : rien ne doit indiquer à un script qu'il a été
  // arrêté, ni lui permettre de sonder les seuils.
  //
  // Une IP indéterminable (en-tête absent ou vide) n'exempte pas de la limite :
  // ces requêtes partagent un compartiment unique et donc la même limite. Sauter
  // le contrôle dans ce cas est précisément le défaut qui a laissé l'endpoint de
  // medialuna.org sans protection.
  const ip = clientIp(request.headers) ?? "inconnue";
  const address = email.toLowerCase();

  // Ordre voulu : du plus spécifique au plus général. Le compteur global n'est
  // consommé qu'une fois les autres franchis, sinon un seul attaquant déjà
  // bloqué par IP viderait quand même le compteur global et rendrait le
  // formulaire indisponible pour tout le monde.
  if (!allow(`ip:${ip}`, PER_IP)) {
    console.warn(`[contact] limite par IP atteinte (${ip}), message ignoré`);
    return NextResponse.json({ ok: true });
  }
  if (!allow(`email:${address}`, PER_EMAIL)) {
    console.warn(`[contact] limite par adresse atteinte (${address}), message ignoré`);
    return NextResponse.json({ ok: true });
  }
  if (!allow("global", GLOBAL)) {
    console.warn("[contact] plafond journalier global atteint, message ignoré");
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("[contact] BREVO_API_KEY absente");
    return NextResponse.json({ ok: false, error: "config" }, { status: 500 });
  }

  const htmlContent = `
    <p><strong>Nom :</strong> ${esc(name)}</p>
    <p><strong>Email :</strong> ${esc(email)}</p>
    <p><strong>Priorité :</strong> ${esc(stage)}</p>
    <p><strong>Projet :</strong></p>
    <p>${esc(idea).replace(/\n/g, "<br>")}</p>
  `;

  try {
    const res = await fetch(BREVO_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: FROM_NAME, email: FROM_EMAIL },
        to: [{ email: TO_EMAIL }],
        replyTo: { email, name },
        subject: `Nouveau message du site - ${name}`,
        htmlContent,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[contact] Brevo", res.status, body.slice(0, 500));
      return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] fetch", err);
    return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
  }
}
