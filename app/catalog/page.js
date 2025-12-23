'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CatalogPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [search, setSearch] = useState('');
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

  // Filter artworks when search or artworks change
  useEffect(() => {
    if (!search) {
      setFilteredArtworks(artworks);
    } else {
      const s = search.toLowerCase();
      setFilteredArtworks(
        artworks.filter(a =>
          (a.title && a.title.toLowerCase().includes(s)) ||
          (a.artist && a.artist.toLowerCase().includes(s)) ||
          (a.year && String(a.year).toLowerCase().includes(s))
        )
      );
    }
  }, [search, artworks]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    router.push('/login');
  };

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
      zoom: '0.75',
      minHeight: '100vh',
      background: '#001026',
      color: '#ffffff',
      fontFamily: "'Lato', sans-serif",
      fontWeight: '300',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap');
        .nav-link {
          color: #cbbd93;
          text-decoration: none;
          font-size: 20px;
          font-weight: 500;
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
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/images/1 (2).png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.08,
          zIndex: 0,
          pointerEvents: 'none', 
        }}
      ></div>
      {/* Header */}
      <nav className="d-flex align-items-center justify-content-between px-5" style={{
        background: '#0A192B',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(203, 189, 147, 0.15)',
        height: '140px',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div className="d-flex align-items-center">
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 32 }}>
            <img
              src="/images/logo.png"
              alt="Galerium"
              onClick={() => router.push('/home')}
              style={{
                height: '200px',
                width: 'auto',
                objectFit: 'contain',
                filter: 'brightness(0) saturate(100%) invert(83%) sepia(12%) saturate(488%) hue-rotate(358deg) brightness(90%) contrast(90%)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                display: 'block',
                marginLeft: 0,
                marginRight: 0
              }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            />
          </div>
        </div>
        {/* Nav Links and Search Bar (flex layout) */}
        <div className="d-flex align-items-center justify-content-between" style={{ flex: 1, marginLeft: 40 }}>
          <div className="d-flex align-items-center gap-4">
            <a
              style={{
                fontSize: '20px',
                fontWeight: '350',
                color: '#BEA173',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginRight: '18px',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
              href="#"
              onClick={e => { e.preventDefault(); router.push('/home'); }}
              className="nav-link"
            >
              <i className="fas fa-home" style={{ fontSize: '20px' }}></i>
              Home
            </a>
            <a
              style={{
                fontSize: '20px',
                fontWeight: '350',
                color: '#BEA173',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginRight: '18px',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
              href="#"
              onClick={e => { e.preventDefault(); router.push('/catalog'); }}
              className="nav-link"
            >
              <i className="fas fa-palette" style={{ fontSize: '20px' }}></i>
              Artworks
            </a>
            <a
              style={{
                fontSize: '20px',
                fontWeight: '350',
                color: '#BEA173',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginRight: '18px',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
              href="#"
              onClick={e => { e.preventDefault(); router.push('/artists'); }}
              className="nav-link"
            >
              <i className="fas fa-user" style={{ fontSize: '20px' }}></i>
              Artists
            </a>
            <a
              style={{
                fontSize: '20px',
                fontWeight: '350',
                color: '#BEA173',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginRight: '18px',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
              href="aboutus"
              className="nav-link"
            >
              <i className="fas fa-info-circle" style={{ fontSize: '20px' }}></i>
              About
            </a>
          </div>
          {/* My Account and Logout buttons next to each other */}
          <div className="d-flex align-items-center gap-2" style={{ marginLeft: 24 }}>
            {user && (
              <a
                style={{
                  fontSize: '20px',
                  fontWeight: '350',
                  color: '#BEA173',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  border: '1.5px solid #BEA173',
                  borderRadius: '10px',
                  padding: '6px 18px',
                  background: 'rgba(203,189,147,0.08)'
                }}
                href="#"
                onClick={e => { e.preventDefault(); router.push('/myaccount'); }}
                className="nav-link"
              >
                <i className="fas fa-user-circle" style={{ fontSize: '20px' }}></i>
                My Account
              </a>
            )}
            <button
              className="btn btn-hover-effect"
              onClick={handleLogout}
              style={{
                borderRadius: '12px',
                padding: '8px 18px',
                border: '1.5px solid #BEA173',
                backgroundColor: '#BEA173',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontWeight: '400',
                color: '#001026',
                fontSize: '18px',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                marginLeft: user ? '0' : '12px'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#cbbd93';
                e.currentTarget.style.color = '#001026';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#BEA173';
              }}
            >
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent'
                }}
              >
                <i className="fas fa-sign-out-alt" style={{ color: '#001026', fontSize: '16px' }}></i>
              </span>
              <span style={{ display: 'inline-block' }}>Logout</span>
            </button>
          </div>
          {/* Search bar right-aligned and transparent */}
          <div className="d-flex align-items-center" style={{ marginLeft: '24px', position: 'relative' }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for a specific painting"
              style={{
                padding: '8px 38px 8px 14px',
                borderRadius: '60px',
                fontSize: '20px',
                border: '1.5px solid #BEA173',
                outline: 'none',
                backgroundColor: 'transparent',
                color: '#fff',
                width: '320px',
                marginRight: '8px'
              }}
            />
            <i className="fas fa-search" style={{
              fontSize: '22px',
              position: 'absolute',
              right: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#BEA173'
            }}></i>
          </div>
        </div>
        {/* Submit Artwork button remains, but moved if needed */}
        <div className="d-flex align-items-center gap-4">
          {user && ['artist', 'admin'].includes(user.role) && (
            <a onClick={() => router.push('/submit')} className="nav-link" style={{ cursor: 'pointer' }}>Submit Artwork</a>
          )}
        </div>
      </nav>

      <main style={{ padding: '2rem 3rem', width: '100%' }}>
        
        

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#cbbd93' }}>Loading artworks...</div>
        ) : (
          <section style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2.5rem',
            width: '100%',
            justifyItems: 'center',
            alignItems: 'stretch',
          }}>
            {filteredArtworks.map((a, idx) => (
              <article key={a._id} style={{ background: 'rgba(0,16,38,0.8)', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(203,189,147,0.08)', transition: 'transform 200ms ease', width: '370px', minHeight: '340px', display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    width: '100%',
                    height: '230px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: '#001026',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={a.image}
                    alt={a.title}
                    style={{
                      width: '360px',
                      height: '220px',
                      objectFit: 'cover',
                      display: 'block',
                      borderRadius: '8px',
                      boxShadow: idx === 0 ? '0 0 0 2px #BEA173' : 'none', // highlight/fix first image
                      background: '#001026',
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      setSelected(a);
                    }}
                  />
                </div>
                <div style={{ padding: '0.75rem', flex: 1 }}>
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
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        cursor: 'pointer',
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
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        cursor: 'pointer',
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
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        cursor: 'pointer',
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

        {/* Modal / lightbox for selected artwork with zoom effect */}
        {selected && (
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
              animation: 'fadeIn 0.3s',
            }}
          >
            <style>{`
              @keyframes zoomIn {
                from { transform: scale(0.7); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
              }
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
            `}</style>
            <div
              onClick={e => e.stopPropagation()}
              style={{
                width: 'min(1100px, 98vw)',
                maxHeight: '92vh',
                background: 'rgba(0,16,38,0.97)',
                borderRadius: 16,
                overflow: 'auto',
                boxShadow: '0 10px 40px rgba(0,0,0,0.7)',
                border: '1px solid rgba(203,189,147,0.12)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                animation: 'zoomIn 0.35s cubic-bezier(0.4,0.2,0.2,1)',
                transition: 'transform 0.3s',
              }}
            >
              <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '2rem' }}>
                <img
                  src={selected.image}
                  alt={selected.title}
                  style={{
                    width: '900px',
                    maxWidth: '95vw',
                    height: 'auto',
                    maxHeight: '70vh',
                    display: 'block',
                    borderRadius: '14px',
                    boxShadow: '0 2px 24px rgba(203,189,147,0.12)',
                    background: '#001026',
                    objectFit: 'contain',
                  }}
                />
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  style={{
                    position: 'absolute',
                    top: 18,
                    right: 18,
                    background: 'rgba(255,255,255,0.09)',
                    border: 'none',
                    color: '#fff',
                    padding: '10px 14px',
                    borderRadius: 10,
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                  }}
                >Close</button>
              </div>
              <div style={{ padding: '1.5rem', width: '100%', maxWidth: '900px' }}>
                <h2 style={{ margin: '0 0 12px 0', color: '#cbbd93', fontSize: '2rem' }}>{selected.title}</h2>
                <p style={{ margin: '0 0 18px 0', color: '#e0c1a2', fontSize: '1.2rem' }}>{selected.artist} • {selected.year}</p>
                <p style={{ color: '#cbbd93', backgroundColor: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 10, fontSize: '1.1rem' }}>{selected.description}</p>
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
