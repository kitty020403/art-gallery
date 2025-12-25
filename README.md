
## Présentation

Ce projet utilise Next.js (App Router) pour une application galerie d'art : pages côté serveur/cliente, routes API intégrées et modèles Mongoose pour MongoDB.

## Structure principale

- Pages (app router) : `app/home`, `app/catalog`, `app/artists`, `app/users/[id]`, `app/aboutus`, etc.
- Routes API : `app/api/*` (ex. `app/api/artworks`, `app/api/auth`, `app/api/interactions`).
- Modèles : `models/` (`Artist.js`, `Artwork.js`, `User.js`, `Interaction.js`).
- Connexion DB : `lib/mongodb.js`.

## Prérequis

- Node.js (version compatible, ex. 18+)
- MongoDB (URI de connexion pour `MONGODB_URI`)

## Installation et lancement (local)

1. Installer les dépendances :

```powershell
cd "c:\Users\BEN SOUISSI RIHEM\art-gallery"
npm install
```

2. Créer `.env.local` à la racine du projet et ajouter au minimum :

```ini
# MongoDB connection string
MONGODB_URI="your-mongodb-uri"

# Secret pour signer les JWT (IMPORTANT)
JWT_SECRET="une-cle-secrete-longue-et-complexe"

# Optionnel : PORT, NODE_ENV, etc.
```

3. Démarrer le serveur de développement :

```powershell
npm run dev
# Ouvrir http://localhost:3000
```

4. Endpoints utiles (exemples) :

- `http://localhost:3000/api/artworks`
- `http://localhost:3000/api/artists`

## Scripts npm

- `npm run dev` — lance Next.js en développement
- `npm run build` — build de production
- `npm run start` — démarre l'app buildée

## Dépannage (problèmes fréquents)

- Erreur "Invalid token: secret or public key must be provided":
	- Assurez‑vous que `.env.local` contient `JWT_SECRET` et que le serveur a été redémarré après modification.
	- Vérifiez que la même clé est utilisée pour générer et vérifier les tokens.

- Cookie/token non envoyé (client) :
	- Pour envoyer le cookie HttpOnly, ajoutez `credentials: 'include'` à vos `fetch()` côté client.
	- Vérifiez dans DevTools → Network → Request Headers → `Cookie` que le cookie `token` est présent.

- Next.js détecte plusieurs lockfiles (warning `outputFileTracingRoot`):
	- Si vous avez un `package-lock.json` dans votre dossier utilisateur (`C:\Users\...`) supprimez‑le si inutile, ou ajoutez `outputFileTracingRoot` dans `next.config.js` :

```javascript
const path = require('path');
module.exports = {
	outputFileTracingRoot: path.resolve(__dirname),
};
```

- Module not found: Can't resolve 'mongoose' :
	- Exécutez `npm install` (ou `npm install mongoose`) et relancez.

- Images 404 (ex. `/images/team-1.jpg`):
	- Placez vos images dans `public/images/` et utilisez `/images/your-file.jpg` (sans `public/` dans le chemin).

## Bonnes pratiques

- Ne commitez jamais `.env.local` dans Git.
- Gardez `JWT_SECRET` secret en production et utilisez une valeur longue et aléatoire.

## Tests rapides

- Vérifier l'API :
	- `curl http://localhost:3000/api/artworks` ou ouvrez l'URL dans le navigateur.

## Rappels

- Si vous rencontrez encore des erreurs, copiez la sortie console complète (terminal) et les logs réseau (DevTools) et partagez‑les — je vous aiderai à diagnostiquer.

---
Merci — dites-moi si vous voulez que je :
- ajoute une section « Déploiement »
- génère un exemple `.env.sample`
- ou crée un `next.config.js` avec `outputFileTracingRoot` directement.


