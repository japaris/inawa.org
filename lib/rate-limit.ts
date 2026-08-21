/**
 * Limitation de débit en mémoire, pour les endpoints publics qui déclenchent
 * un envoi d'email.
 *
 * Pourquoi en mémoire : ce site n'a pas de base de données, et le service
 * tourne en un seul process Next (systemd `inawa` sur Aïda). Un compteur de
 * process suffit donc à couvrir tout le trafic. Il est remis à zéro au
 * redéploiement, ce qui est acceptable : les redéploiements sont manuels et
 * rares, et un attaquant ne les déclenche pas.
 *
 * Pourquoi cette limite existe : le formulaire de contact appelle Brevo avec
 * la clé du compte JanTango, partagé avec medialuna.org et diagnostic-pme,
 * dont le quota gratuit est de 300 envois par jour pour l'ensemble. En août
 * 2026, un abus de l'endpoint public de medialuna.org a vidé ce quota
 * pendant plus d'une semaine et cassé la connexion à ce site. Le formulaire
 * de contact d'ici présente la même surface : public, non authentifié, un
 * appel égale un email. Son honeypot n'arrête qu'un robot naïf.
 */

interface Hit {
  /** Horodatages des passages retenus, du plus ancien au plus récent. */
  times: number[];
}

const buckets = new Map<string, Hit>();

/** Au-delà, on purge les compartiments inactifs pour borner la mémoire. */
const MAX_BUCKETS = 5000;

export interface Limit {
  /** Largeur de la fenêtre glissante, en millisecondes. */
  windowMs: number;
  /** Nombre de passages tolérés dans cette fenêtre. */
  max: number;
}

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

function prune(now: number, longestWindow: number): void {
  if (buckets.size <= MAX_BUCKETS) return;
  for (const [key, hit] of buckets) {
    const last = hit.times[hit.times.length - 1];
    if (last === undefined || now - last > longestWindow) {
      buckets.delete(key);
    }
  }
}

/**
 * Consomme un jeton pour `key`. Renvoie `false` si l'une des fenêtres est
 * saturée, auquel cas rien n'est consommé : un appelant déjà bloqué ne
 * repousse pas indéfiniment sa propre fenêtre en insistant.
 */
export function allow(key: string, limits: Limit[]): boolean {
  const now = Date.now();
  const longest = Math.max(...limits.map((l) => l.windowMs));

  const hit = buckets.get(key) ?? { times: [] };
  // On ne garde que ce qui reste utile à la plus large des fenêtres.
  hit.times = hit.times.filter((t) => now - t < longest);

  for (const limit of limits) {
    const count = hit.times.filter((t) => now - t < limit.windowMs).length;
    if (count >= limit.max) {
      buckets.set(key, hit);
      return false;
    }
  }

  hit.times.push(now);
  buckets.set(key, hit);
  prune(now, longest);
  return true;
}

/**
 * IP du client derrière le proxy nginx d'Aïda. `x-forwarded-for` peut
 * contenir une chaîne de proxies : la première entrée est le client.
 *
 * Renvoie `null` si aucune IP n'est déterminable. L'appelant doit alors
 * traiter la requête comme suspecte plutôt que de sauter la limite : c'est
 * exactement ainsi que la protection par défaut de better-auth s'est
 * désactivée en silence sur medialuna.org.
 */
export function clientIp(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || null;
}
