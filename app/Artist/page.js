'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const ARTISTS = {
  'ismail-bahri': {
    name: 'Ismail Bahri',
    role: 'Visual Artist',
    image: '/images/artist-ismail.jpg', // place image in public/images/
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

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logoRow}>
          <div style={styles.brand}>galerium.</div>
          <nav style={styles.nav}>
            <button onClick={() => router.push('/')} style={styles.navBtn}>Home</button>
            <button onClick={() => router.push('/catalog')} style={styles.navBtn}>Artworks</button>
            <button onClick={() => router.push('/artists')} style={styles.navBtn}>Artists</button>
            <button onClick={() => router.push('/aboutus')} style={styles.navBtn}>About</button>
          </nav>
        </div>
      </header>

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

      <footer style={styles.footer}>
        <div style={{maxWidth:1100, margin:'0 auto', padding:'16px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', color:'#9aa3ab'}}>
          <small>© {new Date().getFullYear()} {artist.name}. All rights reserved.</small>
          <div style={{display:'flex', gap:16}}>
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
    gap: 12
  },
  navBtn: {
    background: 'transparent',
    border: 'none',
    color: '#cfd6d9',
    cursor: 'pointer',
    padding: '6px 10px'
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