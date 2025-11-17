'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ArtistsPage() {
  const router = useRouter();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setUser(data.data);
          } else {
            router.push('/login');
          }
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/login');
      }
    }
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!user) return;
    
    async function fetchArtists() {
      try {
        const res = await fetch('/api/artists');
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        if (data.success) {
          setArtists(data.data || []);
        } else {
          console.error('Failed to fetch artists:', data.error);
          setArtists([]);
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
        setArtists([]);
      } finally {
        setLoading(false);
      }
    }
    fetchArtists();
  }, [user]);

  const handleNavigate = (path) => {
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    }
    router.push('/login');
  };

  const filteredArtists = artists.filter(artist => 
    (artist.name && artist.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (artist.bio && artist.bio.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading || !user) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#001026', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: '#cbbd93' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '3px solid rgba(203, 189, 147, 0.3)',
            borderTop: '3px solid #cbbd93',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <p>Loading artists...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#001026',
      position: 'relative',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Background Image with Opacity */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: "url('/images/1 (2).png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.6,
        filter: 'blur(15px) saturate(1.2)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* Overlay gradient for better readability */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(0,16,38,0.7) 0%, rgba(0,16,38,0.85) 100%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Navigation */}
        <nav style={{
          background: 'rgba(10, 25, 43, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(203, 189, 147, 0.15)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          padding: '20px 40px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src="/images/logo.png" 
                alt="Galerium" 
                onClick={() => handleNavigate('/home')}
                style={{
                  height: '48px',
                  width: '140px',
                  objectFit: 'contain',
                  filter: 'brightness(0) saturate(100%) invert(83%) sepia(12%) saturate(488%) hue-rotate(358deg) brightness(90%) contrast(90%)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>

            {/* Center Navigation Links */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '32px'
            }}>
              <a 
                onClick={() => handleNavigate('/home')}
                style={{
                  fontSize: '16px',
                  fontWeight: '400',
                  color: '#BEA173',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  padding: '8px 12px',
                  borderRadius: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#cbbd93';
                  e.currentTarget.style.backgroundColor = 'rgba(203, 189, 147, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#BEA173';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <i className="fas fa-home" style={{ fontSize: '16px' }}></i>
                Home
              </a>

              <a 
                onClick={() => handleNavigate('/artworks')}
                style={{
                  fontSize: '16px',
                  fontWeight: '400',
                  color: '#BEA173',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  padding: '8px 12px',
                  borderRadius: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#cbbd93';
                  e.currentTarget.style.backgroundColor = 'rgba(203, 189, 147, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#BEA173';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <i className="fas fa-palette" style={{ fontSize: '16px' }}></i>
                Artworks
              </a>

              <a 
                onClick={() => handleNavigate('/artists')}
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#cbbd93',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(203, 189, 147, 0.15)',
                  borderBottom: '2px solid #cbbd93'
                }}
              >
                <i className="fas fa-user" style={{ fontSize: '16px' }}></i>
                Artists
              </a>

              <a 
                onClick={() => handleNavigate('/aboutus')}
                style={{
                  fontSize: '16px',
                  fontWeight: '400',
                  color: '#BEA173',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  padding: '8px 12px',
                  borderRadius: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#cbbd93';
                  e.currentTarget.style.backgroundColor = 'rgba(203, 189, 147, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#BEA173';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <i className="fas fa-info-circle" style={{ fontSize: '16px' }}></i>
                About
              </a>
            </div>

            {/* Right Side Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => handleNavigate('/myaccount')}
                style={{
                  borderRadius: '10px',
                  padding: '10px 20px',
                  border: '1.5px solid #BEA173',
                  backgroundColor: 'rgba(190, 161, 115, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontWeight: '500',
                  color: '#BEA173',
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#BEA173';
                  e.currentTarget.style.color = '#001026';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(190, 161, 115, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(190, 161, 115, 0.2)';
                  e.currentTarget.style.color = '#BEA173';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <i className="fas fa-user" style={{ fontSize: '14px' }}></i>
                <span>My Account</span>
              </button>

              <button
                onClick={handleLogout}
                style={{
                  borderRadius: '10px',
                  padding: '10px 20px',
                  border: '1.5px solid #dc262699',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontWeight: '500',
                  color: 'rgba(220, 38, 38, 0.8)',
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.8)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'rgba(220, 38, 38, 0.8)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <i className="fas fa-sign-out-alt" style={{ fontSize: '14px' }}></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Search Bar Section */}
        <div style={{ 
          background: 'rgba(10, 25, 43, 0.6)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(203, 189, 147, 0.1)',
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for artists by name or description..." 
              style={{
                padding: '14px 50px 14px 24px',
                borderRadius: '50px',
                fontSize: '16px',
                border: '1.5px solid rgba(190, 161, 115, 0.3)',
                outline: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#BEA173',
                width: '100%',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#BEA173';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(190, 161, 115, 0.3)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
            />
            <i className="fas fa-search" style={{
              fontSize: '18px',
              position: 'absolute',
              right: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#BEA173',
              pointerEvents: 'none'
            }}></i>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 40px', flex: 1, width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h1 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: '3rem', 
              color: '#BEA173', 
              marginBottom: '12px',
              fontWeight: '600',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              animation: 'fadeInDown 0.8s ease-out'
            }}>
              Featured Artists
            </h1>
            <p style={{ 
              color: 'rgba(203, 189, 147, 0.7)', 
              fontSize: '1.1rem',
              maxWidth: '600px',
              margin: '0 auto',
              animation: 'fadeInUp 0.8s ease-out 0.2s backwards'
            }}>
              Discover the masterminds behind timeless artworks
            </p>
          </div>

          {filteredArtists.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '80px 20px', 
              background: 'rgba(10, 25, 47, 0.6)',
              borderRadius: '20px',
              border: '1px solid rgba(203, 189, 147, 0.1)',
              backdropFilter: 'blur(10px)',
              animation: 'fadeIn 0.6s ease-out'
            }}>
              <i className="fas fa-search" style={{ 
                fontSize: '3rem', 
                color: 'rgba(203, 189, 147, 0.3)',
                marginBottom: '20px',
                animation: 'pulse 2s infinite'
              }}></i>
              <p style={{ color: 'rgba(203, 189, 147, 0.6)', fontSize: '1.2rem' }}>
                {searchQuery ? 'No artists found matching your search' : 'No artists found'}
              </p>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: '32px' 
            }}>
              {filteredArtists.map((artist, index) => (
                <div 
                  key={artist._id || index}
                  onClick={() => handleNavigate(`/artists/${artist._id}`)}
                  style={{
                    background: 'linear-gradient(145deg, rgba(10, 25, 47, 0.8) 0%, rgba(15, 35, 60, 0.7) 100%)',
                    border: '1px solid rgba(190, 161, 115, 0.2)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(190, 161, 115, 0.4), 0 0 30px rgba(190, 161, 115, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(190, 161, 115, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.borderColor = 'rgba(190, 161, 115, 0.2)';
                  }}
                >
                  <div style={{ 
                    height: '320px', 
                    background: 'linear-gradient(135deg, rgba(203,189,147,0.15) 0%, rgba(203,189,147,0.3) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {artist.image ? (
                      <img 
                        src={artist.image} 
                        alt={artist.name || 'Artist'}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          transition: 'transform 0.4s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    ) : (
                      <i className="fas fa-user" style={{ fontSize: '4rem', color: 'rgba(190,161,115,0.4)' }}></i>
                    )}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '100px',
                      background: 'linear-gradient(to top, rgba(0,16,38,0.9), transparent)'
                    }} />
                  </div>
                  <div style={{ padding: '28px' }}>
                    <h3 style={{ 
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.6rem', 
                      color: '#fffafa', 
                      marginBottom: '10px',
                      fontWeight: '600'
                    }}>
                      {artist.name || 'Unknown Artist'}
                    </h3>
                    {artist.period && (
                      <p style={{ 
                        color: 'rgba(190, 161, 115, 0.8)', 
                        fontSize: '0.9rem', 
                        marginBottom: '12px', 
                        fontStyle: 'italic',
                        fontWeight: '300'
                      }}>
                        {artist.period}
                      </p>
                    )}
                    <p style={{ 
                      color: 'rgba(203, 189, 147, 0.7)', 
                      fontSize: '0.95rem', 
                      marginBottom: '16px',
                      lineHeight: '1.6'
                    }}>
                      {artist.bio ? (artist.bio.length > 120 ? `${artist.bio.substring(0, 120)}...` : artist.bio) : 'Visual Artist'}
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      gap: '20px', 
                      color: 'rgba(203, 189, 147, 0.5)', 
                      fontSize: '0.85rem',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(203, 189, 147, 0.1)'
                    }}>
                      {artist.years && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <i className="fas fa-calendar"></i>
                          {artist.years}
                        </span>
                      )}
                      {artist.country && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <i className="fas fa-map-marker-alt"></i>
                          {artist.country}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer style={{
          background: 'rgba(10, 25, 43, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(203, 189, 147, 0.15)',
          padding: '40px 40px 30px',
          marginTop: '80px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ 
            maxWidth: '1400px', 
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{ 
              color: 'rgba(203, 189, 147, 0.7)', 
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="fas fa-copyright" style={{ fontSize: '12px' }}></i>
              <span>2025 galerium. All rights reserved.</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '32px',
              alignItems: 'center'
            }}>
              <a 
                onClick={() => handleNavigate('/explore')}
                style={{
                  color: 'rgba(203, 189, 147, 0.7)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#BEA173'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(203, 189, 147, 0.7)'}
              >
                Explore More
              </a>
              <a 
                onClick={() => handleNavigate('/details')}
                style={{
                  color: 'rgba(203, 189, 147, 0.7)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#BEA173'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(203, 189, 147, 0.7)'}
              >
                View Details
              </a>
              <a 
                onClick={() => handleNavigate('/learn')}
                style={{
                  color: 'rgba(203, 189, 147, 0.7)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#BEA173'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(203, 189, 147, 0.7)'}
              >
                Learn More
              </a>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '20px',
              alignItems: 'center'
            }}>
              <a 
                onClick={() => handleNavigate('/privacy')}
                style={{
                  color: 'rgba(203, 189, 147, 0.7)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#BEA173'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(203, 189, 147, 0.7)'}
              >
                Privacy Policy
              </a>
              <span style={{ color: 'rgba(203, 189, 147, 0.3)' }}>|</span>
              <a 
                onClick={() => handleNavigate('/terms')}
                style={{
                  color: 'rgba(203, 189, 147, 0.7)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#BEA173'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(203, 189, 147, 0.7)'}
              >
                Terms of Use
              </a>
            </div>
          </div>
        </footer>

        {/* CSS Animations */}
        <style>{`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.5;
              transform: scale(1.05);
            }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}