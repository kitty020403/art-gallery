'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ArtistDetailPage({ params }) {
  const router = useRouter();
  const [artist, setArtist] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [artistId, setArtistId] = useState(null);

  // Unwrap params Promise
  useEffect(() => {
    params.then(p => setArtistId(p.id));
  }, [params]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.success) setUser(data.data);
        }
      } catch (error) {
        console.error('Auth error:', error);
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    if (!artistId) return;

    async function fetchArtistData() {
      try {
        const artistRes = await fetch(`/api/artists/${artistId}`);
        const artistData = await artistRes.json();
        
        if (artistData.success && artistData.data) {
          setArtist(artistData.data);
          
          const artworksRes = await fetch(`/api/artworks`);
          const artworksData = await artworksRes.json();
          
          if (artworksData.success && artworksData.data) {
            const artistArtworks = artworksData.data.filter(
              artwork => artwork.artist?.toLowerCase() === artistData.data.name?.toLowerCase()
            );
            setArtworks(artistArtworks);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchArtistData();
  }, [artistId]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {}
    router.push('/login');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0F1D2E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#BEA173' }}>
        <div style={{ width: '50px', height: '50px', border: '3px solid rgba(190,161,115,0.3)', borderTop: '3px solid #BEA173', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (!artist) {
    return (
      <div style={{ minHeight: '100vh', background: '#0F1D2E', color: '#BEA173', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h3>Artist not found</h3>
          <button onClick={() => router.push('/artists')} style={{ marginTop: '20px', padding: '10px 20px', background: '#BEA173', color: '#0F1D2E', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Back to Artists
          </button>
        </div>
      </div>
    );
  }

  const opacity = Math.min(scrollY / 300, 1);
  const scale = 1 + (scrollY / 2000);
  const translateY = Math.min(scrollY / 3, 100);

  return (
    <div style={{ minHeight: '100vh', background: '#0F1D2E', color: '#fff', overflow: 'hidden' }}>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>

      <div style={{ position: 'fixed', inset: 0, backgroundImage: "url('/images/1 (2).png')", backgroundSize: 'cover', opacity: 0.05, zIndex: 0, pointerEvents: 'none' }} />

      {/* Nav */}
      <nav style={{
        background: `rgba(15,29,46,${0.5 + opacity * 0.5})`,
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(190,161,115,0.1)',
        padding: '1rem 3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000
      }}>
        <div onClick={() => router.push('/home')} style={{ fontSize: '2rem', fontFamily: "'Cormorant Garamond', serif", color: '#BEA173', cursor: 'pointer', fontWeight: '300', letterSpacing: '2px' }}>
          galerium.
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', flex: 1, justifyContent: 'center', marginLeft: '3rem' }}>
          {[
            { name: 'Home', icon: 'home', path: '/home', active: false },
            { name: 'Artworks', icon: 'palette', path: '/catalog', active: false },
            { name: 'Artists', icon: 'user', path: '/artists', active: true },
            { name: 'About', icon: 'info-circle', path: '/aboutus', active: false }
          ].map(link => (
            <a key={link.name} href="#" onClick={(e) => { e.preventDefault(); router.push(link.path); }}
              style={{ fontSize: '1rem', fontWeight: '300', color: link.active ? '#BEA173' : 'rgba(190,161,115,0.7)', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#BEA173'}
              onMouseLeave={(e) => e.currentTarget.style.color = link.active ? '#BEA173' : 'rgba(190,161,115,0.7)'}>
              <i className={`fas fa-${link.icon}`} style={{ fontSize: '1rem' }}></i>
              {link.name}
            </a>
          ))}

          <div style={{ position: 'relative', marginLeft: '1rem' }}>
            <input type="text" placeholder="Search for a specific painting" style={{ padding: '10px 40px 10px 16px', borderRadius: '25px', fontSize: '0.95rem', border: '1px solid rgba(190,161,115,0.2)', outline: 'none', backgroundColor: 'rgba(190,161,115,0.05)', color: '#BEA173', width: '280px' }} />
            <i className="fas fa-search" style={{ fontSize: '0.9rem', position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(190,161,115,0.5)' }}></i>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => router.push('/myaccount')} style={{ borderRadius: '8px', padding: '10px 20px', border: '1px solid rgba(190,161,115,0.3)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '300', color: '#BEA173', fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(190,161,115,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            <i className="fas fa-user" style={{ fontSize: '0.9rem' }}></i>
            My Account
          </button>
          <button onClick={handleLogout} style={{ borderRadius: '8px', padding: '10px 20px', border: 'none', backgroundColor: '#BEA173', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '400', color: '#0F1D2E', fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D4C19A'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#BEA173'}>
            <i className="fas fa-sign-out-alt" style={{ fontSize: '0.9rem' }}></i>
            Logout
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '5%', top: '50%', transform: `translateY(-50%) scale(${scale})`, zIndex: 2 }}>
          <div style={{ width: '400px', height: '500px', borderRadius: '20px', overflow: 'hidden', border: '3px solid rgba(190,161,115,0.3)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
            {artist.image ? (
              <img src={artist.image} alt={artist.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(190,161,115,0.2), rgba(190,161,115,0.4))' }}>
                <i className="fas fa-user" style={{ fontSize: '5rem', color: 'rgba(190,161,115,0.5)' }}></i>
              </div>
            )}
          </div>
        </div>

        <div style={{ position: 'absolute', right: '5%', top: '50%', transform: `translateY(calc(-50% + ${translateY}px))`, maxWidth: '600px', zIndex: 3 }}>
          <p style={{ fontSize: '0.9rem', color: 'rgba(190,161,115,0.7)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px', fontWeight: '300' }}>VISUAL ARTIST</p>
          <h1 style={{ fontSize: '4rem', fontFamily: "'Playfair Display', serif", color: '#fff', marginBottom: '30px', fontWeight: '600', lineHeight: '1.2' }}>{artist.name}</h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', marginBottom: '20px' }}>
            {artist.name} was a renowned {artist.period} artist from {artist.country}. Active during {artist.years}, their work has influenced generations of artists and continues to be celebrated in museums and galleries worldwide.
          </p>
          
          <div style={{ display: 'flex', gap: '40px', marginTop: '40px' }}>
            {[
              { icon: 'star', label: 'Featured', value: artist.featured },
              { icon: 'map-marker-alt', label: artist.country || 'Tunisia', value: artist.country },
              { icon: 'palette', label: artist.period || 'Contemporary', value: artist.style }
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', margin: '0 auto 10px', borderRadius: '50%', border: '2px solid rgba(190,161,115,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(190,161,115,0.1)' }}>
                  <i className={`fas fa-${item.icon}`} style={{ fontSize: '1.5rem', color: '#BEA173' }}></i>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'rgba(190,161,115,0.7)' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Works */}
      <div style={{ position: 'relative', zIndex: 4, background: 'rgba(15,29,46,0.95)', padding: '100px 5%', opacity: scrollY > 200 ? 1 : 0, transform: scrollY > 200 ? 'translateY(0)' : 'translateY(50px)', transition: 'all 0.8s' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '60px' }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.85rem', color: 'rgba(190,161,115,0.6)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Featured</p>
            <h2 style={{ fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", color: '#fff', marginBottom: '30px', fontWeight: '500' }}>Latest Work of {artist.name}</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '40px' }}>
              {artworks.length > 0 ? (
                artworks.slice(0, 4).map((art, i) => (
                  <div key={art._id} onClick={() => router.push(`/catalog`)} style={{ borderRadius: '15px', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(190,161,115,0.2)', opacity: scrollY > 400 + (i * 100) ? 1 : 0, transform: scrollY > 400 + (i * 100) ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ${i * 0.1}s` }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}>
                    <img src={art.image} alt={art.title} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                    <div style={{ padding: '15px', background: 'rgba(20,35,55,0.8)', backdropFilter: 'blur(10px)' }}>
                      <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '5px', fontWeight: '500' }}>{art.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'rgba(190,161,115,0.7)', margin: 0 }}>{art.year}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'rgba(190,161,115,0.5)' }}>
                  <i className="fas fa-palette" style={{ fontSize: '3rem', marginBottom: '20px', opacity: 0.3 }}></i>
                  <p>No artworks available for this artist yet.</p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '40px', opacity: scrollY > 600 ? 1 : 0, transition: 'all 0.6s' }}>
              {[
                { icon: 'star', text: 'Add to Favorites', bg: '#BEA173', color: '#0F1D2E' },
                { icon: 'bookmark', text: 'Save Collection', bg: 'transparent', color: '#BEA173' },
                { icon: 'share', text: 'Share Gallery', bg: 'transparent', color: '#BEA173' }
              ].map((btn, i) => (
                <button key={i} style={{ padding: '12px 30px', borderRadius: '8px', border: i === 0 ? 'none' : '1px solid rgba(190,161,115,0.3)', background: btn.bg, color: btn.color, fontSize: '0.95rem', fontWeight: i === 0 ? '500' : '400', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = i === 0 ? '#D4C19A' : 'rgba(190,161,115,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = btn.bg}>
                  <i className={`fas fa-${btn.icon}`}></i>
                  {btn.text}
                </button>
              ))}
            </div>
          </div>

          {artworks[0]?.image && (
            <div style={{ width: '400px', flexShrink: 0, opacity: scrollY > 400 ? 1 : 0, transform: scrollY > 400 ? 'translateX(0)' : 'translateX(50px)', transition: 'all 0.8s' }}>
              <img src={artworks[0].image} alt="Featured" style={{ width: '100%', height: 'auto', borderRadius: '15px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }} />
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '50px', opacity: scrollY > 700 ? 1 : 0, transition: 'opacity 0.6s' }}>
          <button onClick={() => router.push('/catalog')} style={{ color: '#BEA173', background: 'transparent', border: 'none', fontSize: '1rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: '400' }}>
            view all
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* About - DONNÉES DYNAMIQUES */}
      <div style={{ position: 'relative', zIndex: 4, background: 'rgba(20,35,55,0.95)', padding: '100px 5%', opacity: scrollY > 900 ? 1 : 0, transform: scrollY > 900 ? 'translateY(0)' : 'translateY(50px)', transition: 'all 0.8s' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(190,161,115,0.6)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>About</p>
            
            {/* Exhibitions dynamiques */}
            {artist.exhibitions && artist.exhibitions.length > 0 && (
              <>
                <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", color: '#fff', marginBottom: '30px', fontWeight: '500' }}>Recent Exhibitions</h2>
                <ul style={{ listStyle: 'none', padding: 0, color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: '2' }}>
                  {artist.exhibitions.map((exhibition, i) => (
                    <li key={i}>{exhibition}</li>
                  ))}
                </ul>
              </>
            )}
            
            {/* Awards dynamiques */}
            {artist.awards && artist.awards.length > 0 && (
              <>
                <h3 style={{ fontSize: '1.5rem', fontFamily: "'Playfair Display', serif", color: '#fff', marginTop: '50px', marginBottom: '20px', fontWeight: '500' }}>Awards</h3>
                <ul style={{ listStyle: 'none', padding: 0, color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: '2' }}>
                  {artist.awards.map((award, i) => (
                    <li key={i}>{award}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Si pas d'exhibitions ni awards, afficher la bio complète */}
            {(!artist.exhibitions || artist.exhibitions.length === 0) && (!artist.awards || artist.awards.length === 0) && artist.bio && (
              <>
                <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", color: '#fff', marginBottom: '30px', fontWeight: '500' }}>Biography</h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: '1.8' }}>{artist.bio}</p>
              </>
            )}
          </div>

          <div>
            {/* Education dynamique */}
            {artist.education && artist.education.length > 0 && (
              <>
                <p style={{ fontSize: '0.85rem', color: 'rgba(190,161,115,0.6)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Education</p>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: '2', marginBottom: '40px' }}>
                  {artist.education.map((edu, i) => (
                    <p key={i}>{edu}</p>
                  ))}
                </div>
              </>
            )}
            
            {/* Image de l'artwork ou de l'artiste */}
            {artworks[1]?.image ? (
              <img src={artworks[1].image} alt="Artwork" style={{ width: '100%', height: 'auto', borderRadius: '15px', marginTop: artist.education?.length > 0 ? '30px' : '0', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }} />
            ) : artist.image && (
              <img src={artist.image} alt={artist.name} style={{ width: '100%', height: 'auto', borderRadius: '15px', marginTop: artist.education?.length > 0 ? '30px' : '0', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }} />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: 'rgba(15,29,46,0.98)', borderTop: '1px solid rgba(190,161,115,0.15)', padding: '40px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ color: 'rgba(190,161,115,0.7)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-copyright" style={{ fontSize: '12px' }}></i>
            <span>2025 galerium. All rights reserved.</span>
          </div>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {['Explore More', 'View Details', 'Learn More'].map(link => (
              <a key={link} style={{ color: 'rgba(190,161,115,0.7)', fontSize: '14px', cursor: 'pointer', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#BEA173'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(190,161,115,0.7)'}>{link}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a style={{ color: 'rgba(190,161,115,0.7)', fontSize: '14px', cursor: 'pointer', textDecoration: 'none' }}>Privacy Policy</a>
            <span style={{ color: 'rgba(190,161,115,0.3)' }}>|</span>
            <a style={{ color: 'rgba(190,161,115,0.7)', fontSize: '14px', cursor: 'pointer', textDecoration: 'none' }}>Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
}