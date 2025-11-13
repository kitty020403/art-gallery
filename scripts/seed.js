// Script to populate MongoDB with initial data
// Run with: node scripts/seed.js

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// Import models (adjust paths if needed)
const Artwork = require('../models/Artwork').default;
const Artist = require('../models/Artist').default;

const MONGODB_URI = process.env.MONGODB_URI || 'your_mongodb_connection_string';

const artworks = [
  { title: 'The Starry Night', artist: 'Vincent van Gogh', year: '1889', image: '/images/6.jpg', description: 'I look at the stars and with all my being feel that I am a part of these stars.', period: 'Post-Impressionism' },
  { title: 'Water Lilies', artist: 'Claude Monet', year: '1919', image: '/images/7.jpg', description: 'Every day I discover more and more beautiful things.', period: 'Impressionism' },
  { title: 'The Persistence of Memory', artist: 'Salvador Dalí', year: '1931', image: '/images/8.jpg', description: 'Intelligence without ambition is a bird without wings.', period: 'Surrealism' },
  { title: 'Girl with a Pearl Earring', artist: 'Johannes Vermeer', year: '1665', image: '/images/9.jpg', description: 'A quiet portrait with a luminous pearl.', period: 'Dutch Golden Age' },
  { title: 'The Kiss', artist: 'Gustav Klimt', year: '1908', image: '/images/10.jpg', description: 'Love at first golden sight, adorned with patterns of devotion.', period: 'Art Nouveau' },
  { title: 'The Birth of Venus', artist: 'Sandro Botticelli', year: '1485', image: '/images/11.jpg', description: 'Venus emerges from the sea foam, a symbol of divine beauty and love.', period: 'Renaissance' },
  { title: 'The Scream', artist: 'Edvard Munch', year: '1893', image: '/images/12.jpg', description: 'Nature screams through us, expressing the anxiety of existence.', period: 'Expressionism' },
  { title: 'The Night Café', artist: 'Vincent van Gogh', year: '1888', image: '/images/13.jpg', description: 'A place where one can ruin oneself, go mad, or commit a crime.', period: 'Post-Impressionism' },
  { title: 'Impression, Sunrise', artist: 'Claude Monet', year: '1872', image: '/images/14.jpg', description: 'The dawn breaks through the mist, giving birth to impressionism.', period: 'Impressionism' },
  { title: 'The Dream', artist: 'Pablo Picasso', year: '1932', image: '/images/15.jpg', description: 'Dreams speak in shapes and colors that defy reality.', period: 'Cubism' },
  { title: 'The Son of Man', artist: 'René Magritte', year: '1964', image: '/images/16.jpg', description: 'Everything we see hides another thing we want to see.', period: 'Surrealism' },
  { title: 'The Great Wave off Kanagawa', artist: 'Hokusai', year: '1829', image: '/images/17.jpg', description: 'A mighty wave threatens three boats while Mount Fuji stands serene.', period: 'Ukiyo-e' },
  { title: 'The Garden of Earthly Delights', artist: 'Hieronymus Bosch', year: '1503', image: '/images/18.jpg', description: 'Paradise and perdition dance together in this triptych of human desire.', period: 'Northern Renaissance' },
  { title: 'The Lovers', artist: 'René Magritte', year: '1928', image: '/images/19.jpg', description: 'Love veiled in mystery, faces shrouded yet intimately close.', period: 'Surrealism' },
  { title: 'Café Terrace at Night', artist: 'Vincent van Gogh', year: '1888', image: '/images/20.jpg', description: 'The night café terrace glows with warmth under a starlit sky.', period: 'Post-Impressionism' },
];

const artists = [
  { name: 'Vincent van Gogh', period: 'Post-Impressionism', years: '1853-1890', country: 'Netherlands' },
  { name: 'Claude Monet', period: 'Impressionism', years: '1840-1926', country: 'France' },
  { name: 'Salvador Dalí', period: 'Surrealism', years: '1904-1989', country: 'Spain' },
  { name: 'Johannes Vermeer', period: 'Dutch Golden Age', years: '1632-1675', country: 'Netherlands' },
  { name: 'Gustav Klimt', period: 'Art Nouveau', years: '1862-1918', country: 'Austria' },
  { name: 'Sandro Botticelli', period: 'Renaissance', years: '1445-1510', country: 'Italy' },
  { name: 'Edvard Munch', period: 'Expressionism', years: '1863-1944', country: 'Norway' },
  { name: 'Pablo Picasso', period: 'Cubism', years: '1881-1973', country: 'Spain' },
  { name: 'René Magritte', period: 'Surrealism', years: '1898-1967', country: 'Belgium' },
  { name: 'Katsushika Hokusai', period: 'Ukiyo-e', years: '1760-1849', country: 'Japan' },
  { name: 'Hieronymus Bosch', period: 'Northern Renaissance', years: '1450-1516', country: 'Netherlands' },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Artwork.deleteMany({});
    await Artist.deleteMany({});
    console.log('Cleared existing data');

    // Insert artists
    const insertedArtists = await Artist.insertMany(artists);
    console.log(`Inserted ${insertedArtists.length} artists`);

    // Insert artworks
    const insertedArtworks = await Artwork.insertMany(artworks);
    console.log(`Inserted ${insertedArtworks.length} artworks`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
