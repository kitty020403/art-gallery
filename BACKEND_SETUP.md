# Backend Setup Guide

We built this art gallery app using Next.js and MongoDB. Here's how we set up the backend stuff. We used MongoDB Atlas for the database since it's free and easy to use.

## Setting Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account
2. Create a new project and cluster (stick with the free tier)
3. Click "Connect" and choose "Connect your application"
4. Copy the connection string - it should look like this: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/art-gallery?retryWrites=true&w=majority`

## Environment Variables

We need to set up some environment variables for the database connection and authentication.

First, create a `.env.local.example` file in the root of your project with this content:

```
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/art-gallery?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

Then copy it to `.env.local`:

```powershell
Copy-Item .env.local.example .env.local
```

And fill in your actual MongoDB URI and a random string for JWT_SECRET.

## Database Models

We created several MongoDB models using Mongoose. Here's what each one stores:

### User Model
- `name`: User's full name
- `email`: Email address (unique)
- `password`: Hashed password
- `role`: Either 'user', 'artist', or 'admin'
- `phone`, `bio`, `location`, `instagram`, `website`: Optional profile info
- `favorites`: Array of artwork IDs the user has favorited

### Artwork Model
- `title`: Name of the artwork
- `artist`: Artist's name
- `year`: Year created
- `image`: URL to artwork image
- `description`: Description of the artwork
- `period`: Art period/style
- `price`: Price if for sale
- `featured`: Boolean for highlighting
- `submittedBy`: User ID who submitted it
- `status`: 'pending', 'approved', or 'rejected'
- `rejectionReason`: Why it was rejected (if applicable)

### Artist Model
- `name`: Artist's name
- `period`: Art period they worked in
- `years`: Years they were active
- `country`: Country of origin
- `bio`: Biography
- `image`: Profile picture URL

### Interaction Model
- `user`: User ID who interacted
- `artwork`: Artwork ID
- `type`: 'like', 'favorite', or 'share'
- Tracks user engagement with artworks

## API Endpoints

We built a REST API with these endpoints:

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/logout` - Logout (clears cookie)
- `GET /api/auth/me` - Get current user info

### Users
- `GET /api/users` - List all users (admin only)
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user (admin or self)
- `DELETE /api/users/[id]` - Delete user (admin only)

### Artworks
- `GET /api/artworks` - Get all approved artworks (with filters for status/submittedBy)
- `POST /api/artworks` - Submit new artwork (artists/admins only)
- `GET /api/artworks/[id]` - Get single artwork
- `PUT /api/artworks/[id]` - Update artwork
- `DELETE /api/artworks/[id]` - Delete artwork (admin only)

### Artists
- `GET /api/artists` - Get all artists
- `POST /api/artists` - Create new artist (admin only)
- `GET /api/artists/[id]` - Get single artist
- `PUT /api/artists/[id]` - Update artist (admin only)
- `DELETE /api/artists/[id]` - Delete artist (admin only)

### Interactions
- `GET /api/interactions/[artworkId]` - Get user's interactions with an artwork
- `POST /api/interactions/[artworkId]` - Toggle like/favorite/share
- `GET /api/interactions/stats/[artworkId]` - Get interaction counts for an artwork

## Creating Admin User

To create an admin user for managing the gallery:

```powershell
node scripts/create-admin.js
```

This creates an admin with email `admin@artgallery.com` and password `admin123`. Make sure to change the password after first login!

## Testing the API

Start the dev server:

```powershell
npm run dev
```

Test some endpoints:
- `GET http://localhost:3000/api/artworks` - Should return approved artworks
- `GET http://localhost:3000/api/artists` - Should return all artists
- `POST http://localhost:3000/api/auth/register` - Try registering a new user

## How Authentication Works

We use JWT tokens stored in HTTP-only cookies. When users login/register, they get a token that expires in 7 days. The token includes their user ID, email, and role. Protected routes check for this token and verify the user's permissions.

For artwork submissions, we added a workflow where artists submit artworks that get status 'pending' until an admin approves them. This prevents spam and ensures quality control.

## Files We Created

```
lib/
  mongodb.js              # Database connection utility

models/
  Artwork.js              # Artwork schema with submission workflow
  Artist.js               # Artist information
  User.js                 # User accounts with roles
  Interaction.js          # User engagement tracking

app/api/
  auth/
    login/route.js        # User login
    logout/route.js       # User logout
    register/route.js     # User registration
    me/route.js           # Get current user
  artworks/
    route.js              # CRUD for artworks
    [id]/route.js         # Single artwork operations
  artists/
    route.js              # CRUD for artists
    [id]/route.js         # Single artist operations
  users/
    route.js              # User management
    [id]/route.js         # Single user operations
  interactions/
    [artworkId]/route.js  # User interactions
    stats/[artworkId]/route.js  # Interaction counts

scripts/
  create-admin.js         # Create admin user script

.env.local.example        # Environment template
```

## Next Steps

Now that the backend is set up, we need to:
1. Connect the frontend pages to use these APIs instead of hardcoded data
2. Add user authentication to the UI
3. Build an admin panel for managing submissions
4. Add image upload functionality
5. Implement the favorites and interaction features

We ran into some challenges with the artwork submission workflow, but using the status field and submittedBy reference made it work well. The interaction system lets us track user engagement without complicating the main models too much.
