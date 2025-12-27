
## Présentation du projet

Dans le cadre de notre projet de développement web, nous avons créé une application de galerie d'art en utilisant Next.js avec l'App Router. Cette application permet de gérer des œuvres d'art, des artistes et des utilisateurs, avec une interface moderne et des fonctionnalités d'authentification. Nous avons intégré des pages côté serveur et client, des routes API complètes et des modèles Mongoose pour interagir avec MongoDB.

## Structure du projet

Voici un aperçu de l'organisation de notre code :

- **Pages (App Router)** : Situées dans `app/`, elles incluent `home`, `catalog`, `artists`, `users/[id]`, `aboutus`, etc. Nous avons structuré les pages pour une navigation fluide.
- **Routes API** : Dans `app/api/`, nous avons des endpoints pour les œuvres (`artworks`), les artistes (`artists`), l'authentification (`auth`), les interactions (`interactions`), et les utilisateurs (`users`).
- **Modèles** : Le dossier `models/` contient nos schémas Mongoose : `Artist.js`, `Artwork.js`, `User.js` et `Interaction.js`.
- **Connexion à la base de données** : Fichier `lib/mongodb.js` pour gérer la connexion MongoDB.
- **Composants et UI** : `components/ui/` pour les éléments réutilisables comme les boutons et la navbar.
- **Scripts et public** : Des scripts utilitaires dans `scripts/`, et les images dans `public/images/`.

## Prérequis

Avant de lancer le projet, assurez-vous d'avoir :

- Node.js (version 18 ou supérieure, que nous recommandons pour la compatibilité avec Next.js)
- MongoDB (avec une URI de connexion prête pour la variable `MONGODB_URI`)

## Installation et configuration

Pour mettre en place l'environnement de développement localement :

1. **Installer les dépendances** :
   Naviguez vers le dossier du projet et exécutez :

   ```powershell
   cd "c:\Users\[VotreNomUtilisateur]\art-gallery"
   npm install
   ```

   Cela installera toutes les bibliothèques nécessaires, comme Next.js, Mongoose et les autres dépendances listées dans `package.json`.

2. **Configurer les variables d'environnement** :
   Créez un fichier `.env.local` à la racine du projet. Ajoutez au minimum ces variables :

   ```ini
   # Chaîne de connexion MongoDB
   MONGODB_URI="votre-uri-mongodb"

   # Clé secrète pour signer les JWT (essentiel pour la sécurité)
   JWT_SECRET="une-cle-secrete-longue-et-complexe"

   # Optionnel : port, environnement, etc.
   ```

   Nous avons choisi d'utiliser des JWT pour l'authentification, car cela permet une gestion sécurisée des sessions sans stocker d'état côté serveur.

3. **Démarrer le serveur de développement** :

   ```powershell
   npm run dev
   ```

   Ouvrez ensuite votre navigateur à l'adresse `http://localhost:3000` pour voir l'application en action.

4. **Endpoints API utiles** :
   Pour tester rapidement, vous pouvez accéder à :
   - `http://localhost:3000/api/artworks` pour les œuvres
   - `http://localhost:3000/api/artists` pour les artistes

## Scripts disponibles

Nous avons configuré quelques scripts npm pour faciliter le développement :

- `npm run dev` : Lance Next.js en mode développement avec rechargement automatique.
- `npm run build` : Construit l'application pour la production.
- `npm run start` : Démarre l'application buildée en mode production.

## Dépannage

Voici quelques problèmes courants que nous avons rencontrés pendant le développement et leurs solutions :

- **Erreur "Invalid token: secret or public key must be provided"** :
  Vérifiez que `JWT_SECRET` est bien défini dans `.env.local` et redémarrez le serveur après modification. Assurez-vous d'utiliser la même clé pour générer et vérifier les tokens.

- **Cookie/token non envoyé côté client** :
  Pour les requêtes fetch, ajoutez `credentials: 'include'`. Vérifiez dans les DevTools (Network > Request Headers) que le cookie `token` est présent.

- **Avertissement Next.js sur plusieurs lockfiles** :
  Si vous avez un `package-lock.json` dans votre dossier utilisateur, supprimez-le si inutile. Sinon, ajoutez dans `next.config.js` :

  ```javascript
  const path = require('path');
  module.exports = {
    outputFileTracingRoot: path.resolve(__dirname),
  };
  ```

- **Module not found: Can't resolve 'mongoose'** :
  Relancez `npm install` ou installez spécifiquement avec `npm install mongoose`.

- **Images 404** :
  Placez les images dans `public/images/` et référencez-les avec `/images/votre-fichier.jpg` (sans le préfixe `public/`).

## Bonnes pratiques

Pour maintenir la sécurité et la qualité du code :

- Ne commitez jamais le fichier `.env.local` dans Git – il contient des informations sensibles.
- Utilisez une `JWT_SECRET` longue et aléatoire en production pour éviter les failles de sécurité.
- Testez régulièrement les API et les pages pour s'assurer que tout fonctionne correctement.

## Tests rapides

Pour vérifier que tout est bien configuré :

- Testez une API : Utilisez `curl http://localhost:3000/api/artworks` ou ouvrez l'URL directement dans le navigateur pour voir les données JSON.

## Notes finales

Si vous rencontrez des erreurs non couvertes ici, partagez la sortie complète de la console (terminal) et les logs réseau (DevTools). Nous pourrons alors diagnostiquer plus facilement. Ce projet nous a permis d'explorer les technologies modernes du web, et nous espérons qu'il sera utile pour comprendre Next.js et MongoDB.



