# Backend Setup Guide

## MongoDB + Next.js API Routes

### 1. Set Up MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (choose free tier)
4. Click "Connect" → "Connect your application"
5. Copy your connection string

### 2. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```powershell
   Copy-Item .env.local.example .env.local
   ```

2. Edit `.env.local` and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/art-gallery?retryWrites=true&w=majority
   ```

### 3. Seed the Database (Optional)

Populate your database with initial artwork and artist data:

```powershell
node scripts/seed.js
```

### 4. Test Your API

Start the dev server:
```powershell
npm run dev
```

Test the endpoints:
- `http://localhost:3000/api/artworks` - Get all artworks
- `http://localhost:3000/api/artists` - Get all artists

### API Endpoints

#### Artworks
- `GET /api/artworks` - Get all artworks
- `POST /api/artworks` - Create new artwork
- `GET /api/artworks/[id]` - Get single artwork
- `PUT /api/artworks/[id]` - Update artwork
- `DELETE /api/artworks/[id]` - Delete artwork

#### Artists
- `GET /api/artists` - Get all artists
- `POST /api/artists` - Create new artist
- `GET /api/artists/[id]` - Get single artist
- `PUT /api/artists/[id]` - Update artist
- `DELETE /api/artists/[id]` - Delete artist

### Next Steps

1. Update your pages to fetch from API instead of hardcoded data
2. Add authentication for user login/signup
3. Add admin panel to manage artworks and artists

## Files Created

```
lib/
  mongodb.js          # MongoDB connection utility
models/
  Artwork.js          # Artwork schema
  Artist.js           # Artist schema
  User.js             # User schema
app/api/
  artworks/
    route.js          # GET all, POST new
    [id]/route.js     # GET, PUT, DELETE by ID
  artists/
    route.js          # GET all, POST new
    [id]/route.js     # GET, PUT, DELETE by ID
scripts/
  seed.js             # Database seeding script
.env.local.example    # Environment template
```
