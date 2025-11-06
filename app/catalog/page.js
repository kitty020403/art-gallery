 'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CatalogPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  const artworks = [
    { id: 6, title: 'The Starry Night', artist: 'Vincent van Gogh', year: '1889', image: '/images/6.jpg', description: 'I look at the stars and with all my being feel that I am a part of these stars.' },
    { id: 7, title: 'Water Lilies', artist: 'Claude Monet', year: '1919', image: '/images/7.jpg', description: 'Every day I discover more and more beautiful things.' },
    { id: 8, title: 'The Persistence of Memory', artist: 'Salvador Dalí', year: '1931', image: '/images/8.jpg', description: 'Intelligence without ambition is a bird without wings.' },
    { id: 9, title: 'Girl with a Pearl Earring', artist: 'Johannes Vermeer', year: '1665', image: '/images/9.jpg', description: 'A quiet portrait with a luminous pearl.' },
    { id: 10, title: 'The Kiss', artist: 'Gustav Klimt', year: '1908', image: '/images/10.jpg', description: 'Love at first golden sight, adorned with patterns of devotion.' },
    { id: 11, title: 'The Birth of Venus', artist: 'Sandro Botticelli', year: '1485', image: '/images/11.jpg', description: 'Venus emerges from the sea foam, a symbol of divine beauty and love.' },
    { id: 12, title: 'The Scream', artist: 'Edvard Munch', year: '1893', image: '/images/12.jpg', description: 'Nature screams through us, expressing the anxiety of existence.' },
    { id: 13, title: 'The Night Café', artist: 'Vincent van Gogh', year: '1888', image: '/images/13.jpg', description: 'A place where one can ruin oneself, go mad, or commit a crime.' },
    { id: 14, title: 'Impression, Sunrise', artist: 'Claude Monet', year: '1872', image: '/images/14.jpg', description: 'The dawn breaks through the mist, giving birth to impressionism.' },
    { id: 15, title: 'The Dream', artist: 'Pablo Picasso', year: '1932', image: '/images/15.jpg', description: 'Dreams speak in shapes and colors that defy reality.' },
    { id: 16, title: 'The Son of Man', artist: 'René Magritte', year: '1964', image: '/images/16.jpg', description: 'Everything we see hides another thing we want to see.' },
    { id: 17, title: 'The Great Wave off Kanagawa', artist: 'Hokusai', year: '1829', image: '/images/17.jpg', description: 'A mighty wave threatens three boats while Mount Fuji stands serene.' },
    { id: 18, title: 'The Garden of Earthly Delights', artist: 'Hieronymus Bosch', year: '1503', image: '/images/18.jpg', description: 'Paradise and perdition dance together in this triptych of human desire.' },
    { id: 19, title: 'The Lovers', artist: 'René Magritte', year: '1928', image: '/images/19.jpg', description: 'Love veiled in mystery, faces shrouded yet intimately close.' },
    { id: 20, title: 'Café Terrace at Night', artist: 'Vincent van Gogh', year: '1888', image: '/images/20.jpg', description: 'The night café terrace glows with warmth under a starlit sky.' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#001026',
      color: '#ffffff',
      fontFamily: "'Inter', sans-serif",
      position: 'relative'
    }}>

      {/* Header (keeps same palette as landing) */}
      <nav className="d-flex align-items-center justify-content-between" style={{
        background: 'rgba(203, 189, 147, 0.05)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(203, 189, 147, 0.2)',
        height: '120px',
        padding: '0 1rem'
      }}>
        <div className="d-flex align-items-center">
          <img src="/images/logo.png" alt="Galerium" style={{ height: '100px', width: '100px', objectFit: 'contain', filter: 'brightness(0) saturate(100%) invert(83%) sepia(12%) saturate(488%) hue-rotate(358deg) brightness(90%) contrast(90%)' }} />
        </div>

        <div>
          <button className="btn" onClick={() => router.push('/login')} style={{ borderRadius: 6, padding: '6px 12px', border: '2px solid #cbbd93', color: '#cbbd93', backgroundColor: 'transparent', marginRight: 8 }}>Login</button>
          <button className="btn" onClick={() => router.push('/signup')} style={{ borderRadius: 6, padding: '6px 12px', backgroundColor: '#e0c1a2ff', color: '#fff', border: 'none' }}>Register</button>
        </div>
      </nav>

      <main style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ color: '#fffafa', marginBottom: '0.25rem' }}>Catalog</h1>
        <p style={{ color: 'rgba(203, 189, 147, 0.9)', marginTop: 0, marginBottom: '1.25rem' }}>Browse all paintings in our collection.</p>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {artworks.map((a) => (
            <article key={a.id} onClick={() => setSelected(a)} style={{ background: 'rgba(0,16,38,0.8)', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(203,189,147,0.08)', cursor: 'pointer', transition: 'transform 200ms ease' }}>
              <div style={{ width: '100%', height: 180, overflow: 'hidden' }}>
                <img src={a.image} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: '0.75rem' }}>
                <h3 style={{ margin: '0 0 6px 0', color: '#cbbd93', fontSize: '1.05rem' }}>{a.title}</h3>
                <p style={{ margin: '0 0 8px 0', color: '#e0c1a2', fontSize: '0.92rem' }}>{a.artist} • {a.year}</p>
                <p style={{ margin: 0, color: '#fffafa', backgroundColor: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: 8, fontSize: '0.9rem', lineHeight: 1.4 }}>{a.description}</p>
              </div>
            </article>
          ))}
        </section>

        {/* Modal / lightbox for selected artwork */}
        {selected && (
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setSelected(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}
          >
            <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(900px, 95%)', maxHeight: '90vh', background: 'rgba(0,16,38,0.95)', borderRadius: 12, overflow: 'auto', boxShadow: '0 10px 40px rgba(0,0,0,0.6)', border: '1px solid rgba(203,189,147,0.08)' }}>
              <div style={{ position: 'relative' }}>
                <img src={selected.image} alt={selected.title} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px 12px 0 0' }} />
                <button onClick={() => setSelected(null)} aria-label="Close" style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', padding: '8px 10px', borderRadius: 8, cursor: 'pointer' }}>Close</button>
              </div>
              <div style={{ padding: '1rem' }}>
                <h2 style={{ margin: '0 0 8px 0', color: '#cbbd93' }}>{selected.title}</h2>
                <p style={{ margin: '0 0 12px 0', color: '#e0c1a2' }}>{selected.artist} • {selected.year}</p>
                <p style={{ color: '#cbbd93', backgroundColor: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: 8 }}>{selected.description}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* subtle gradient background */}
      <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(to bottom, rgba(203, 189, 147, 0.03), rgba(0,16,38,1))', pointerEvents: 'none', zIndex: -1 }} />
    </div>
  );
}
