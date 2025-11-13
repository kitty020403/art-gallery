 'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CatalogPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [interactions, setInteractions] = useState({});
  const [stats, setStats] = useState({});

  useEffect(() => {
    async function fetchArtworks() {
      try {
        const res = await fetch('/api/artworks');
        const data = await res.json();
        if (data.success) {
          setArtworks(data.data);
          // Fetch stats for all artworks
          data.data.forEach(artwork => fetchStats(artwork._id));
        }
      } catch (error) {
        console.error('Error fetching artworks:', error);
      } finally {
        setLoading(false);
      }
    }
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.success) setUser(data.data);
        }
      } catch (e) {
        // silently ignore
      }
    }
    fetchArtworks();
    checkAuth();
  }, []);

  const fetchStats = async (artworkId) => {
    try {
      const res = await fetch(`/api/interactions/stats/${artworkId}`);
      const data = await res.json();
      if (data.success) {
        setStats(prev => ({ ...prev, [artworkId]: data.data }));
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchUserInteractions = async (artworkId) => {
    if (!user) return;
    try {
      const res = await fetch(`/api/interactions/${artworkId}`);
      const data = await res.json();
      if (data.success) {
        setInteractions(prev => ({ ...prev, [artworkId]: data.data }));
      }
    } catch (error) {
      console.error('Error fetching interactions:', error);
    }
  };

  const handleInteraction = async (artworkId, type) => {
    if (!user) {
      alert('Please login to interact with artworks');
      router.push('/login');
      return;
    }

    try {
      const res = await fetch(`/api/interactions/${artworkId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ type })
      });
      const data = await res.json();
      if (data.success) {
        setStats(prev => ({ ...prev, [artworkId]: data.data.counts }));
        fetchUserInteractions(artworkId);
      }
    } catch (error) {
      console.error('Error handling interaction:', error);
    }
  };

  useEffect(() => {
    if (user && artworks.length > 0) {
      artworks.forEach(artwork => fetchUserInteractions(artwork._id));
    }
  }, [user, artworks.length]);

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

        <div className="d-flex align-items-center gap-3">
          {user && ['artist','admin'].includes(user.role) && (
            <button className="btn" onClick={() => router.push('/submit')} style={{ borderRadius: 6, padding: '6px 12px', border: '2px solid #cbbd93', color: '#cbbd93', backgroundColor: 'transparent', marginRight: 8 }}>Submit Artwork</button>
          )}
          <button className="btn" onClick={() => router.push('/login')} style={{ borderRadius: 6, padding: '6px 12px', border: '2px solid #cbbd93', color: '#cbbd93', backgroundColor: 'transparent', marginRight: 8 }}>Login</button>
          <button className="btn" onClick={() => router.push('/signup')} style={{ borderRadius: 6, padding: '6px 12px', backgroundColor: '#e0c1a2ff', color: '#fff', border: 'none' }}>Register</button>
        </div>
      </nav>

      <main style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ color: '#fffafa', marginBottom: '0.25rem' }}>Catalog</h1>
        <p style={{ color: 'rgba(203, 189, 147, 0.9)', marginTop: 0, marginBottom: '1.25rem' }}>Browse all paintings in our collection.</p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#cbbd93' }}>Loading artworks...</div>
        ) : (
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {artworks.map((a) => (
            <article key={a._id} style={{ background: 'rgba(0,16,38,0.8)', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(203,189,147,0.08)', transition: 'transform 200ms ease' }}>
              <div onClick={() => setSelected(a)} style={{ width: '100%', height: 180, overflow: 'hidden', cursor: 'pointer' }}>
                <img src={a.image} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: '0.75rem' }}>
                <h3 style={{ margin: '0 0 6px 0', color: '#cbbd93', fontSize: '1.05rem' }}>{a.title}</h3>
                <p style={{ margin: '0 0 8px 0', color: '#e0c1a2', fontSize: '0.92rem' }}>{a.artist} • {a.year}</p>
                <p style={{ margin: '0 0 10px 0', color: '#fffafa', backgroundColor: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: 8, fontSize: '0.9rem', lineHeight: 1.4 }}>{a.description}</p>
                
                {/* Interaction Buttons */}
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', marginTop: '10px' }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleInteraction(a._id, 'like'); }}
                    style={{
                      flex: 1,
                      background: interactions[a._id]?.liked ? '#dc3545' : 'rgba(203,189,147,0.1)',
                      color: interactions[a._id]?.liked ? '#fff' : '#cbbd93',
                      border: '1px solid rgba(203,189,147,0.3)',
                      padding: '6px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    ❤️ {stats[a._id]?.likes || 0}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleInteraction(a._id, 'favorite'); }}
                    style={{
                      flex: 1,
                      background: interactions[a._id]?.favorited ? '#ffc107' : 'rgba(203,189,147,0.1)',
                      color: interactions[a._id]?.favorited ? '#000' : '#cbbd93',
                      border: '1px solid rgba(203,189,147,0.3)',
                      padding: '6px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    ⭐ {stats[a._id]?.favorites || 0}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleInteraction(a._id, 'share'); }}
                    style={{
                      flex: 1,
                      background: interactions[a._id]?.shared ? '#28a745' : 'rgba(203,189,147,0.1)',
                      color: interactions[a._id]?.shared ? '#fff' : '#cbbd93',
                      border: '1px solid rgba(203,189,147,0.3)',
                      padding: '6px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    🔗 {stats[a._id]?.shares || 0}
                  </button>
                </div>
              </div>
            </article>
            ))}
          </section>
        )}

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
