# Galerium - Galerie d'Art Tunisienne

Application web de galerie d'art développée avec Next.js, permettant de découvrir des artistes tunisiens et leurs œuvres.

---

## Présentation du projet

Dans le cadre de notre projet de développement web, nous avons créé une application de galerie d'art en utilisant Next.js avec l'App Router. Cette application permet de gérer des œuvres d'art, des artistes et des utilisateurs, avec une interface moderne et des fonctionnalités d'authentification.

L'objectif principal était de mettre en valeur les artistes tunisiens en créant une plateforme où les visiteurs peuvent :
- Parcourir un catalogue d'œuvres d'art avec des images haute qualité
- Découvrir les artistes à travers leurs biographies et parcours
- Interagir avec les œuvres (likes, favoris, partages)
- Créer un compte et gérer leurs préférences

Nous avons intégré des pages côté serveur et client, des routes API complètes et des modèles Mongoose pour interagir avec MongoDB. L'architecture choisie nous a permis de construire une application full-stack cohérente avec un seul framework.

---

## Technologies utilisées

### Frontend
- Next.js 15 (App Router) pour le framework principal
- React 19 pour la gestion de l'interface
- Bootstrap 5 pour le design et la mise en page responsive
- Font Awesome pour les icônes
- Framer Motion pour certaines animations

### Backend
- Next.js API Routes pour créer notre API REST
- MongoDB comme base de données NoSQL
- Mongoose pour modéliser nos données
- JWT (jsonwebtoken) pour gérer l'authentification
- bcryptjs pour sécuriser les mots de passe

---

## Structure du projet

Voici un aperçu de l'organisation de notre code :

```
galerium/
├── app/
│   ├── home/              Page d'accueil avec carrousel
│   ├── catalog/           Catalogue des œuvres avec filtres
│   ├── artists/           Liste des artistes
│   │   └── [id]/          Page de détails d'un artiste
│   ├── login/             Page de connexion
│   ├── signup/            Page d'inscription
│   ├── myaccount/         Compte utilisateur
│   ├── aboutus/           Page à propos
│   └── api/               Routes API backend
│       ├── artworks/      CRUD pour les œuvres
│       ├── artists/       CRUD pour les artistes
│       │   └── [id]/      Récupération d'un artiste spécifique
│       ├── auth/          Authentification
│       │   ├── login/
│       │   ├── signup/
│       │   ├── logout/
│       │   └── me/        Vérifier l'utilisateur connecté
│       ├── interactions/  Gestion des likes, favoris, partages
│       └── users/         Gestion des utilisateurs
│
├── models/                Schémas Mongoose
│   ├── Artist.js
│   ├── Artwork.js
│   ├── User.js
│   └── Interaction.js
│
├── lib/
│   └── mongodb.js         Connexion à MongoDB
│
├── public/
│   └── images/            Images (logo, artistes, œuvres)
│
└── components/            Composants React réutilisables
```

Nous avons structuré les pages pour une navigation fluide et séparé clairement le frontend du backend via les API routes.

---

## Prérequis

Avant de lancer le projet, assurez-vous d'avoir :

- Node.js version 18 ou supérieure (nous recommandons la version 18 pour la compatibilité avec Next.js 15)
- npm ou yarn comme gestionnaire de paquets
- MongoDB Atlas (un compte gratuit suffit, nous utilisons le cloud plutôt qu'une installation locale)
- Git pour cloner le repository

Pour vérifier vos versions installées :
```powershell
node --version
npm --version
```

---

## Installation et configuration

### Étape 1 : Cloner le projet

```powershell
git clone https://github.com/[votre-repository]/galerium.git
cd galerium
```

### Étape 2 : Installer les dépendances

Naviguez vers le dossier du projet et exécutez :

```powershell
npm install
```

Cela installera toutes les bibliothèques nécessaires listées dans `package.json`. L'installation peut prendre quelques minutes selon votre connexion.

### Étape 3 : Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet. Ce fichier contient les informations sensibles et n'est pas versionné sur Git pour des raisons de sécurité.

Structure du fichier `.env.local` :

```ini
# MongoDB connection string
MONGODB_URI="mongodb+srv://linamrad02_db_user:6VgmBQdevLHtwd8v@cluster1.ow9rplb.mongodb.net/art-gallery"
# JWT Secret Key 

JWT_SECRET="token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJlOGFhOTk1MTIzMDAwMTU1MmM1ZmIiLCJpYXQiOjE3NTczMTk2MDd9.fMSc6NvgLFd8Dcj_W0apHywIST_9BIa3Zcw5NRy0YyY
"



Nous avons choisi d'utiliser des JWT pour l'authentification car cela permet une gestion sécurisée des sessions sans stocker d'état côté serveur. La clé secrète doit rester confidentielle et ne jamais être exposée dans le code.

---

## Démarrer le serveur de développement

Une fois les dépendances installées et les variables d'environnement configurées, lancez :

```powershell
npm run dev
```

Le serveur démarre par défaut sur le port 3000. Ouvrez ensuite votre navigateur à l'adresse :

```
http://localhost:3000
```

Vous devriez voir la page d'accueil de Galerium avec le carrousel d'œuvres d'art.

**Port utilisé :** L'application écoute sur le port 3000 par défaut. Si ce port est déjà occupé sur votre machine, Next.js proposera automatiquement le port suivant disponible (3001, 3002, etc.). Vous pouvez aussi forcer un port spécifique :

```powershell
# Windows
set PORT=4000 && npm run dev

# macOS/Linux
PORT=4000 npm run dev
```

---

## Endpoints API utiles pour les tests

Pour vérifier que le backend fonctionne correctement, vous pouvez accéder directement à ces endpoints depuis votre navigateur :

- `http://localhost:3000/api/artworks` - Liste toutes les œuvres au format JSON
- `http://localhost:3000/api/artists` - Liste tous les artistes au format JSON
- `http://localhost:3000/api/auth/me` - Vérifie l'utilisateur connecté (nécessite d'être authentifié)

Ces routes retournent des données JSON que vous pouvez inspecter dans le navigateur ou avec des outils comme curl :

```powershell
curl http://localhost:3000/api/artworks
```

---

## Scripts disponibles

Nous avons configuré quelques scripts npm pour faciliter le développement :

- `npm run dev` - Lance Next.js en mode développement avec rechargement automatique des modifications
- `npm run build` - Construit l'application pour la production (optimisation, minification)
- `npm run start` - Démarre l'application buildée en mode production
- `npm run lint` - Vérifie la qualité du code selon les règles ESLint

Pour l'évaluation, `npm run dev` est le plus approprié car il permet de voir les modifications en temps réel.

---

## Informations pour l'évaluation

### Accès au repository GitHub

Le projet est hébergé sur GitHub. Vous pouvez y accéder avec le lien fourni séparément. Si vous rencontrez des problèmes d'accès, n'hésitez pas à nous contacter.

### Credentials et comptes de test

Pour des raisons de bonnes pratiques de sécurité (que nous avons apprises dans ce cours), nous n'avons pas inclus les credentials dans le repository Git. Vous avez reçu dans un document séparé :

1. Les variables d'environnement à copier dans `.env.local`
2. Les comptes de test pour tester l'application :
   - Un compte utilisateur standard pour tester les fonctionnalités de base
   - Un compte administrateur pour accéder aux fonctionnalités avancées (si implémentées)

### Base de données

La base de données MongoDB est déjà peuplée avec :
- Une quinzaine d'artistes tunisiens
- Une soixantaine d'œuvres d'art
- Les comptes de test mentionnés ci-dessus

Vous n'avez donc pas besoin de créer de données de test, tout est prêt pour l'évaluation.

---

## Dépannage

Voici quelques problèmes courants que nous avons rencontrés pendant le développement et leurs solutions :

### Erreur "Invalid token: secret or public key must be provided"

Cette erreur survient quand la variable `JWT_SECRET` n'est pas définie ou mal configurée.

Solution :
1. Vérifiez que le fichier `.env.local` existe bien à la racine du projet
2. Vérifiez que `JWT_SECRET` est bien défini avec une valeur (pas de guillemets vides)
3. Redémarrez le serveur après avoir modifié `.env.local` (Ctrl+C puis `npm run dev`)

### Cookie/token non envoyé côté client

Si vous voyez des erreurs d'authentification dans la console, vérifiez que les requêtes fetch incluent `credentials: 'include'` :

```javascript
fetch('/api/endpoint', {
  credentials: 'include'
})
```

Vous pouvez vérifier dans les DevTools du navigateur (onglet Network, puis Headers) que le cookie `token` est bien présent dans les requêtes.

### Avertissement Next.js sur plusieurs lockfiles

Si vous voyez un warning concernant plusieurs fichiers `package-lock.json`, vous pouvez l'ignorer ou le résoudre en ajoutant dans `next.config.js` :

```javascript
const path = require('path');
module.exports = {
  outputFileTracingRoot: path.resolve(__dirname),
};
```

### Module not found: Can't resolve 'mongoose'

Si cette erreur apparaît, relancez simplement :

```powershell
npm install
```

Ou installez spécifiquement Mongoose :

```powershell
npm install mongoose
```

### Images en 404

Les images doivent être placées dans le dossier `public/images/` et référencées sans le préfixe `public/` :

Correct : `/images/logo.png`  
Incorrect : `/public/images/logo.png`

### Port 3000 déjà utilisé

Si vous avez déjà un autre serveur qui tourne sur le port 3000, vous verrez une erreur. Solutions :

1. Arrêter l'autre application
2. Utiliser un autre port (voir section "Démarrer le serveur")
3. Sur Windows, trouver et tuer le processus :
   ```powershell
   netstat -ano | findstr :3000
   taskkill /PID [numéro_du_PID] /F
   ```

---

## Tests rapides pour valider l'installation

Une fois le serveur lancé, vous pouvez vérifier rapidement que tout fonctionne :

1. Ouvrir `http://localhost:3000` - vous devriez voir la page d'accueil
2. Ouvrir `http://localhost:3000/api/artworks` - vous devriez voir un JSON avec la liste des œuvres
3. Cliquer sur "Artists" dans la navigation - vous devriez voir la grille d'artistes
4. Cliquer sur un artiste - vous devriez voir sa page de détails avec ses œuvres

Si l'une de ces étapes ne fonctionne pas, consultez la section Dépannage ci-dessus.

---

## Bonnes pratiques appliquées

Pour maintenir la sécurité et la qualité du code, nous avons appliqué les pratiques suivantes :

- Séparation des credentials dans `.env.local` (jamais commité sur Git)
- Hashage des mots de passe avec bcrypt avant stockage
- Authentification par JWT avec cookies httpOnly pour plus de sécurité
- Validation des données côté serveur dans les API routes
- Structure modulaire avec séparation claire des responsabilités
- Gestion d'erreurs cohérente dans toutes les routes API

---

## Notes finales

Ce projet nous a permis d'explorer les technologies modernes du développement web full-stack. Nous avons particulièrement apprécié la flexibilité de Next.js qui permet de gérer à la fois le frontend et le backend dans un seul projet.

Si vous rencontrez des erreurs non couvertes dans ce README, n'hésitez pas à nous contacter. Nous pourrons vous aider à diagnostiquer le problème en regardant la sortie complète de la console (terminal) et les logs réseau dans les DevTools du navigateur.

---

Dernière mise à jour : Décembre 2024
