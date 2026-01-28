# Guide de déploiement — inawa.org sur Cloudflare Pages

## Prérequis

- Dépôt GitHub : `japaris/inawa.org` (accessible sur GitHub)
- Compte Cloudflare avec accès à `inawa.org`
- Accès aux DNS chez Cloudflare

---

## Étape 1 : Préparer le dépôt GitHub

### 1a. Initialiser Git (si pas déjà fait)

```bash
cd /Users/jan/Projets/Inawa/web
git init
git add .
git commit -m "Initial commit: Inawa portfolio website"
```

### 1b. Créer la branche `main` et pousser vers GitHub

```bash
git branch -M main
git remote add origin https://github.com/japaris/inawa.org.git
git push -u origin main
```

Vérifiez sur GitHub que le contenu est bien présent : https://github.com/japaris/inawa.org

---

## Étape 2 : Connecter Cloudflare Pages au dépôt GitHub

### 2a. Se connecter à Cloudflare

1. Allez sur [dash.cloudflare.com](https://dash.cloudflare.com)
2. Connectez-vous avec votre compte

### 2b. Créer un nouveau projet Pages

1. Cliquez sur **Pages** dans le menu latéral (ou accédez à `dash.cloudflare.com/pages`)
2. Cliquez sur **Create a project**
3. Sélectionnez **Connect to Git**

### 2c. Autoriser Cloudflare sur GitHub

1. Cliquez sur **GitHub**
2. Une fenêtre s'ouvrira pour autoriser Cloudflare à accéder à vos repos
3. Approuvez et sélectionnez le dépôt `japaris/inawa.org`

### 2d. Configurer le build

Dans l'écran **Create a project** :

- **Project name** : `inawa` (ou un nom au choix)
- **Production branch** : `main`
- **Build command** : (laisser vide — c'est un site statique)
- **Build output directory** : `/` ou `.` (laisser vide, ou entrer `/`)
- **Root directory (advanced)** : (laisser vide)

Cliquez sur **Save and Deploy**.

Cloudflare créera automatiquement votre domaine Pages : `inawa.pages.dev`

---

## Étape 3 : Configurer le DNS pour inawa.org

### 3a. Ajouter le domaine à Cloudflare (si pas déjà fait)

Si `inawa.org` n'est pas encore géré par Cloudflare :

1. Dans Cloudflare, allez à **Websites** → **+ Add a site**
2. Entrez `inawa.org`
3. Sélectionnez le plan gratuit (Free)
4. Suivez les étapes de vérification DNS (Cloudflare vous donnera les nameservers à configurer chez votre registraire)

Une fois `inawa.org` ajouté à Cloudflare, continuez vers l'étape 3b.

### 3b. Créer les enregistrements DNS pour Pages

Dans Cloudflare, allez à **Websites** → `inawa.org` → **DNS** → **Records**.

Vous verrez probablement des enregistrements existants. Ajoutez / modifiez selon votre besoin :

#### Option A : Apex domain (inawa.org)

Créez un enregistrement **CNAME** :

- **Type** : CNAME
- **Name** : @ (ou laissez vide)
- **Target** : `inawa.pages.dev`
- **TTL** : Auto
- **Proxy status** : Proxied (orange)

**Note importante** : Pour un apex domain (sans `www`), Cloudflare utilise une redirection interne. Vous pouvez aussi utiliser un **ALIAS** (propriétaire Cloudflare) qui fonctionne mieux :

- **Type** : ALIAS
- **Name** : @ (ou laissez vide)
- **Target** : `inawa.pages.dev`

#### Option B : Sous-domaine www (www.inawa.org)

Si vous préférez `www.inawa.org` :

- **Type** : CNAME
- **Name** : www
- **Target** : `inawa.pages.dev`
- **TTL** : Auto
- **Proxy status** : Proxied (orange)

#### Recommandation

Configurez les **deux** pour plus de flexibilité :
- `@` → `inawa.pages.dev` (ALIAS ou CNAME)
- `www` → `inawa.pages.dev` (CNAME)

Puis, dans les **Page Rules** ou **Redirects**, créez une règle pour rediriger l'un vers l'autre si souhaité.

---

## Étape 4 : Configurer le domaine personnalisé dans Cloudflare Pages

### 4a. Lier le domaine à votre projet Pages

1. Dans Cloudflare Pages, allez à votre projet **inawa**
2. Cliquez sur **Settings** → **Domains**
3. Cliquez sur **Add a domain** ou **Add custom domain**
4. Entrez `inawa.org`
5. Validez les enregistrements DNS
   - Si vous avez déjà configuré les CNAME/ALIAS, Cloudflare les détectera
   - Cliquez sur **Activate domain**

Le domaine devrait maintenant être actif et pointer vers votre site.

---

## Étape 5 : Vérifier le déploiement

### 5a. Testez dans un navigateur

```
https://inawa.org
https://www.inawa.org
```

Vous devriez voir votre page d'accueil.

### 5b. Vérifiez les builds Cloudflare Pages

1. Allez sur `dash.cloudflare.com/pages`
2. Cliquez sur votre projet **inawa**
3. Allez à **Deployments**

Chaque push vers `main` sur GitHub déclenchera un nouveau build automatique.

### 5c. Vérifiez les statuts DNS

```bash
nslookup inawa.org
dig inawa.org
```

Vous devriez voir que `inawa.org` pointe vers les serveurs Cloudflare.

---

## Étape 6 (Optionnel) : Configurer HTTPS

Cloudflare active HTTPS automatiquement via son certificat.

- Allez à **Websites** → `inawa.org` → **SSL/TLS**
- **SSL/TLS encryption mode** : Full (recommandé) ou Strict

---

## Étape 7 (Optionnel) : Mettre en place le formulaire de contact

Le formulaire dans `index.html` pointe actuellement vers `action="#"`. Vous pouvez l'intégrer à :

### Option A : Formspree (gratuit, simple)

1. Allez sur [formspree.io](https://formspree.io)
2. Créez un compte et créez un nouveau formulaire
3. Récupérez l'ID du formulaire (ex: `f_xxxx`)
4. Modifiez la ligne `<form action="#"` dans `index.html` :

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

5. Poussez vers GitHub :

```bash
git add index.html
git commit -m "Integrate Formspree contact form"
git push
```

Cloudflare redéploiera automatiquement.

### Option B : Email simple via mailto

```html
<form action="mailto:votre-email@example.com" method="post" enctype="text/plain">
```

(Moins fiable, mais basique)

---

## Étape 8 (Optionnel) : Ajouter Analytics

### Option A : Cloudflare Web Analytics (inclus)

1. Allez à **Websites** → `inawa.org` → **Analytics**
2. Vous verrez des données de traffic automatiquement

### Option B : Plausible Analytics (privacy-focused)

1. Allez sur [plausible.io](https://plausible.io) et créez un compte
2. Ajoutez votre domaine `inawa.org`
3. Récupérez le script de tracking
4. Ajoutez-le dans la balise `<head>` de `index.html` :

```html
<script defer data-domain="inawa.org" src="https://plausible.io/js/script.js"></script>
```

5. Poussez vers GitHub

---

## Troubleshooting

### Le domaine n'apparaît pas

- **Vérifiez les DNS** : Allez dans Cloudflare **DNS Records** et confirmez que le CNAME/ALIAS pointe vers `inawa.pages.dev`
- **TTL** : Attendez quelques minutes (les DNS peuvent mettre du temps à se propager)
- **Navigateur** : Videz le cache ou testez en navigation privée

### "403 Forbidden" ou "Page not found"

- Assurez-vous que votre `index.html` est à la racine du dépôt (pas dans un sous-dossier)
- Vérifiez que le build Cloudflare Pages a réussi (allez à **Deployments**)
- Si le build échoue, regardez les logs : il y a peut-être une erreur dans les fichiers

### Les fichiers CSS ou images ne se chargent pas

- Assurez-vous que les chemins sont corrects dans `index.html` (ex: `/styles.css`, pas `./styles.css`)
- Vérifiez que tous les fichiers ont été poussés vers GitHub

---

## Résumé du flux

```
1. Code local → Git commit
2. Git push vers GitHub (main)
3. Cloudflare Pages détecte le push
4. Build automatique (site statique = copie du dépôt)
5. Déploiement sur inawa.pages.dev
6. Domaine DNS inawa.org pointe vers Pages
7. HTTPS automatique via Cloudflare
```

À chaque nouvelle modification, il suffit de :

```bash
git add .
git commit -m "Description"
git push
```

Cloudflare mettra à jour automatiquement en quelques secondes.

---

## Support & Ressources

- **Cloudflare Pages Docs** : https://developers.cloudflare.com/pages/
- **Formspree Docs** : https://formspree.io/docs/
- **Plausible Docs** : https://plausible.io/docs/
