import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
