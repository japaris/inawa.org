# inawa.org — site statique

Site minimal one-page pour Inawa (product manager freelance).

Structure créée :
- `index.html` — page d'accueil one-page
- `styles.css` — styles simples
- `products/*.html` — 6 fiches produit

Déploiement recommandé (Cloudflare Pages) :
1. Sur GitHub, poussez ce dossier (`/`) dans le dépôt `japaris/inawa.org`.
2. Dans Cloudflare Pages, créez un nouveau projet et connectez-le à `japaris/inawa.org`.
   - Framework preset: "None (static)" — pas de build command.
   - Build output directory: `/` ou `.` selon l'UI.
3. Dans Cloudflare DNS, ajoutez un enregistrement CNAME pour `www` pointant vers le domaine Pages indiqué par Cloudflare, et un redirect/root suivant l'UI Pages.
4. Activez HTTPS via Cloudflare et testez le formulaire.

Formulaire : le `form` dans `index.html` est un placeholder. Options d'intégration rapides :
- Formspree (formspree.io)
- Netlify Forms (si déployé sur Netlify)
- Endpoint custom (serverless / Cloudflare Workers)

Analytics léger : Plausible ou Fathom sont recommandés pour la confidentialité.

Prochaines étapes proposées :
- Vous me fournissez la version rédigée complète de la Home.
- Vous fournissez le template de fiche produit (ex: Us ou TandaBuilder) pour remplir les pages produit.
- Optionnel : je peux générer un deploy workflow (GitHub Actions) si vous préférez automatiser la mise en ligne.
