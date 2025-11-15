
### Choix du framework

notre projet  utilise **Next.js** (App Router). 
Raisons principales : 
   rendu côté serveur ou statique si nécessaire, 
   routage intégré,
   routes API directement dans le projet, 

### Fonctionnalités développées

- Pages dynamiques principales  :
	- `app/home/page.js` — page d'accueil avec carousel et actions.
	- `app/artists/page.js` — listing d'artistes.
	- `app/catalog/page.js` — catalogue d'œuvres.
	- `app/users/[id]/page.js` — profils utilisateurs dynamiques.

- Backend/API minimal :
	- Routes API dans `app/api/` pour `artists`, `artworks`, `users`, `auth`, et `interactions`.
	- Modèles Mongoose dans `models/` (`Artist.js`, `Artwork.js`, `User.js`, `Interaction.js`).
	- Connexion MongoDB gérée par `lib/mongodb.js`.

### Étapes de lancement (local)

1. Installer les dépendances :

```powershell
npm install
```

2. Créer le fichier d'environnement (`.env.local`) à la racine et ajouter les variables nécessaires (ex. `MONGODB_URI`), p. ex. :

```
MONGODB_URI="mongodb+srv://linamrad02_db_user:6VgmBQdevLHtwd8v@cluster1.ow9rplb.mongodb.net/art-gallery?retryWrites=true&w=majority"


```

3. Lancer le serveur de développement :

```powershell
npm run dev
# Ouvrir http://localhost:3000/home
```

4. Vérifier les endpoints API (exemples) :

- `http://localhost:3000/api/artworks`
- `http://localhost:3000/api/artists`

### Emballer le livrable

 Fournir un lien GitHub :
- Pousser le code sur un dépôt GitHub et partager le lien (format recommandé).

```powershell
# depuis la racine du projet (supprimez node_modules si vous voulez réduire la taille)
Compress-Archive -Path .\* -DestinationPath ..\art-gallery-deliverable.zip -Force
```

