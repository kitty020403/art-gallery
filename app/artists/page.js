'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ArtistsPage() {
  const router = useRouter();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArtists() {
      try {
        const res = await fetch('/api/artists');
        const data = await res.json();
        if (data.success) {
          setArtists(data.data);
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArtists();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#001026',
      color: '#ffffff',
      fontFamily: "'Inter', sans-serif",
      position: 'relative'
    }}>

      {/* Header */}
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
        <h1 style={{ color: '#cbbd93', marginBottom: '0.25rem' }}>Artists</h1>
        <p style={{ color: 'rgba(203, 189, 147, 0.9)', marginTop: 0, marginBottom: '1.5rem' }}>Discover the masters behind the masterpieces.</p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#cbbd93' }}>Loading artists...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {artists.map((artist) => (
            <article key={artist._id} style={{ 
              background: 'rgba(0,16,38,0.8)', 
              borderRadius: 12, 
              padding: '1rem', 
              border: '1px solid rgba(203,189,147,0.12)',
              cursor: 'pointer',
              transition: 'transform 200ms ease, border-color 200ms ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'rgba(203,189,147,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(203,189,147,0.12)';
            }}
            >
              <h3 style={{ margin: '0 0 8px 0', color: '#cbbd93', fontSize: '1.1rem' }}>{artist.name}</h3>
              <div style={{ 
                backgroundColor: 'rgba(255,255,255,0.02)', 
                padding: '8px', 
                borderRadius: 8,
                marginBottom: 8
              }}>
                <p style={{ margin: '0 0 4px 0', color: '#e0c1a2', fontSize: '0.9rem' }}>
                  <strong>Period:</strong> {artist.period}
                </p>
                <p style={{ margin: '0 0 4px 0', color: '#e0c1a2', fontSize: '0.9rem' }}>
                  <strong>Years:</strong> {artist.years}
                </p>
                <p style={{ margin: 0, color: '#e0c1a2', fontSize: '0.9rem' }}>
                  <strong>Country:</strong> {artist.country}
                </p>
              </div>
            </article>
          ))}
        </div>
        )}
      </main>

      {/* Gradient overlay */}
      <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(to bottom, rgba(203, 189, 147, 0.03), rgba(0,16,38,1))', pointerEvents: 'none', zIndex: -1 }} />
    </div>
  );
}
