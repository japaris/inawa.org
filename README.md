# inawa.org

Landing de Jan Tumpach, Product Manager freelance. Voix tutoiement, cible porteurs
de projet solo.

## Stack

- Next.js 15 (App Router) + React 19
- Tailwind CSS 4 (polices Fraunces + Inter, palette bleu nuit + terre cuite + ocre)
- TypeScript
- Copie centralisée et typographie française dans `lib/copy.ts`

## Développement

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm start          # sert le build
```

## Structure

- `app/` — App Router (page d'accueil, mentions légales, layout, favicon `icon.svg`)
- `app/_components/` — en-tête et pied de page
- `lib/copy.ts` — toute la copie (objet `LANDING`) + transformateur typographique `deepFr`

Règle : aucune chaîne marketing en dur dans les composants, tout passe par `lib/copy.ts`.

## Déploiement (serveur Aïda)

- Hôte : Aïda (Hetzner), user de service `inawa`, code dans `/srv/inawa/app`.
- Process : systemd `inawa.service`, Node 22, `next start` sur `127.0.0.1:3140`.
- Reverse proxy : nginx (pattern Aïda, `listen 65.108.111.116:443 ssl http2`), TLS Let's Encrypt.
- Branche déployée : `main`.

Redéploiement :

```bash
ssh aida 'sudo -u inawa -H bash -c "cd /srv/inawa/app && git pull --ff-only && npm ci && npm run build" && sudo systemctl restart inawa.service'
```

- Preview avant bascule de l'apex : https://new.inawa.org
- Fiche serveur détaillée : `aida-admin/docs/services/inawa.md`

## Branches

- `main` — site Next.js actuel (déployé sur Aïda).
- `legacy-static` — ancien site statique HTML/CSS (archive, servait Cloudflare Pages).

## DNS / bascule

L'apex `inawa.org` (Cloudflare, proxy orange) sert encore l'ancien site jusqu'à la
bascule finale (repointage A vers `65.108.111.116`, détachement de Cloudflare Pages).
