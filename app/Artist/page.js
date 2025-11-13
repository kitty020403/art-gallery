'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap');
        
        .nav-link {
          color: #cbbd93;
          text-decoration: none;
          fontSize: 14px;
          font-weight: 300;
          letter-spacing: 0.5px;
          transition: opacity 0.3s ease;
          opacity: 0.8;
        }
        
        .nav-link:hover {
          opacity: 1;
        }
        
        .btn-hover-effect {
          transition: all 0.3s ease;
        }
        
        .btn-hover-effect:hover {
          transform: translateY(-1px);
        }
      `}</style>

      {/* Header */}
      <nav className="d-flex align-items-center justify-content-between px-5" style={{
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(203, 189, 147, 0.15)',
        height: '80px',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div className="d-flex align-items-center">
          <img 
            src="/images/logo.png" 
            alt="Galerium" 
            onClick={() => router.push('/')}
            style={{
              height: '1200px',
              width: '150px',
              objectFit: 'contain',
              filter: 'brightness(0) saturate(100%) invert(83%) sepia(12%) saturate(488%) hue-rotate(358deg) brightness(90%) contrast(90%)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </div>

        <div className="d-flex align-items-center gap-4">

          <a href="#gallery" className="nav-link">Gallery</a>
          <a href="#about" className="nav-link">Artists</a>
          <a href="#explore" className="nav-link">Explore</a>
          <a href="#contact" className="nav-link">Connect</a>
          {user && ['artist','admin'].includes(user.role) && (
            <a onClick={() => router.push('/submit')} className="nav-link" style={{ cursor: 'pointer' }}>Submit Artwork</a>
          )}

          <a href="#home" className="nav-link">Home</a>
          <a href="#artworks" className="nav-link">Artworks</a>
          <a href="#artists" className="nav-link">Artists</a>
          <a href="#about" className="nav-link">About</a>
  

        </div>

        <div className="d-flex align-items-center gap-2">
          <button 
            className="btn" 
            onClick={() => router.push('/login')}
            style={{ 
              borderRadius: '4px', 
              padding: '8px 20px',
              border: 'none',
              color: '#cbbd93',
              backgroundColor: 'transparent',
              transition: 'all 0.3s ease',
              fontSize: '14px',
              fontWeight: '300',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(203, 189, 147, 0.1)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Login
          </button>
          <button 
            className="btn btn-hover-effect" 
            onClick={() => router.push('/signup')}
            style={{ 
              borderRadius: '4px', 
              padding: '8px 20px',
              border: 'none',
              fontWeight: '300',
              backgroundColor: '#bea173',
              color: '#001026',
              fontSize: '14px',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#cbbd93'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#bea173'}
          >
            Sign Up
          </button>
        </div>
      </nav>

const ARTISTS = {
  'ismail-bahri': {
    name: 'Ismail Bahri',
    role: 'Visual Artist',
    image: '/images/iismail.png',
    paragraphs: [
      "Born in 1978 in Tunis, studied at the Institut Supérieur des Beaux-Arts de Tunis and Le Fresnoy - Studio National des Arts Contemporains in France.",
      "His work has been featured in numerous international exhibitions, including the Venice Biennale, Sharjah Biennial and Centre Pompidou. He is known for a minimalist approach and a poetic engagement with materials and time.",
      "Bahri's films and installations explore simple everyday actions transformed into profound meditations on perception and existence."
    ],
    stats: [
      { key: 'featured', label: 'Featured', icon: '★' },
      { key: 'location', label: 'Location', icon: '📍' },
      { key: 'style', label: 'Style', icon: '▦' }
    ]
  }
};

export default function ArtistPage({ params }) {
  const router = useRouter();
  const slug = params?.slug ?? 'ismail-bahri';
  const artist = ARTISTS[slug] ?? ARTISTS['ismail-bahri'];

  // Définition temporaire de l'utilisateur pour tester
  const user = { role: 'artist' }; // remplacer par auth réel plus tard

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logoRow}>
          <div style={styles.brand}>galerium.</div>
          <nav style={styles.nav}>
            <button onClick={() => router.push('/')} style={styles.navBtn}>Home</button>
            <button onClick={() => router.push('/catalog')} style={styles.navBtn}>Artworks</button>
            <button onClick={() => router.push('/artists')} style={styles.navBtn}>Artists</button>
            <button onClick={() => router.push('/aboutus')} style={styles.navBtn}>About</button>

            {/* Bouton conditionnel Submit Artwork */}
            {user?.role && ['artist','admin'].includes(user.role) && (
              <button onClick={() => router.push('/submit')} style={styles.navBtn}>Submit Artwork</button>
            )}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main style={styles.container}>
        <aside style={styles.card}>
          <div style={styles.photoWrap}>
            <img src={artist.image} alt={artist.name} style={styles.photo} />
          </div>
        </aside>

        <section style={styles.content}>
          <div style={styles.role}>{artist.role.toUpperCase()}</div>
          <h1 style={styles.name}>{artist.name}</h1>
          {artist.paragraphs.map((p, i) => (
            <p key={i} style={styles.paragraph}>{p}</p>
          ))}
          <div style={styles.stats}>
            {artist.stats.map(s => (
              <div key={s.key} style={styles.statItem}>
                <div style={styles.statIcon}>{s.icon}</div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#9aa3ab' }}>
          <small>© {new Date().getFullYear()} {artist.name}. All rights reserved.</small>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="/privacy" style={styles.footerLink}>Privacy Policy</a>
            <a href="/terms" style={styles.footerLink}>Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#07182a',
    color: '#e6e6e6',
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: '20px 40px',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
    background: '#031524'
  },
  logoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 1100,
    margin: '0 auto'
  },
  brand: {
    fontSize: 32,
    color: '#cbbd93',
    fontWeight: 600,
    letterSpacing: 1
  },
  nav: {
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  },
  navBtn: {
    background: 'transparent',
    border: 'none',
    color: '#cfd6d9',
    cursor: 'pointer',
    padding: '6px 10px',
    fontSize: 14,
    fontWeight: 300
  },
  container: {
    display: 'flex',
    gap: 40,
    padding: '48px 24px',
    maxWidth: 1100,
    margin: '0 auto',
    alignItems: 'flex-start'
  },
  card: {
    width: 360,
    background: 'rgba(255,255,255,0.02)',
    borderRadius: 18,
    padding: 20,
    boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
  },
  photoWrap: {
    background: '#fff',
    borderRadius: 14,
    padding: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width: '100%',
    height: 'auto',
    borderRadius: 10,
    objectFit: 'cover'
  },
  content: {
    flex: 1,
    maxWidth: 780
  },
  role: {
    color: '#cfc7b0',
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 6
  },
  name: {
    fontSize: 48,
    margin: '6px 0 18px 0',
    color: '#ffffff',
    fontWeight: 600
  },
  paragraph: {
    color: '#cfd6d9',
    lineHeight: 1.6,
    marginBottom: 12
  },
  stats: {
    marginTop: 22,
    display: 'flex',
    gap: 24
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    color: '#f7dca3'
  },
  statIcon: {
    background: 'rgba(255,255,255,0.03)',
    padding: 10,
    borderRadius: 10,
    fontSize: 16
  },
  statLabel: {
    fontSize: 13,
    color: '#f3e8c9'
  },
  footer: {
    marginTop: 'auto',
    background: '#031421',
    borderTop: '1px solid rgba(255,255,255,0.03)'
  },
  footerLink: {
    color: '#cbbd93',
    textDecoration: 'none'
  }
};
