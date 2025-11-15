'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ArtistsPage() {
  const router = useRouter();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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
    
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.success) setUser(data.data);
        }
      } catch {}
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    router.push('/login');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#001026', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbbd93' }}>
        Loading artists...
      </div>
    );
  }

  return (
    
    <div style={{ minHeight: '100vh', background: '#001026', color: '#ffffff' }}>
      <nav className="d-flex align-items-center justify-content-between px-5" style={{
        zoom: '0.75',
        background: '#0A192B',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(203, 189, 147, 0.15)',
        height: '140px',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
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
    }}
  >
    
  </div>
        <div className="d-flex align-items-center">
          <img 
            src="/images/logo.png" 
            alt="Galerium" 
            onClick={() => router.push('/')}
            style={{
              height: '2500px',
              width: '350px',
              objectFit: 'contain',
              filter: 'brightness(0) saturate(100%) invert(83%) sepia(12%) saturate(488%) hue-rotate(358deg) brightness(90%) contrast(90%)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </div>
        
        {/* Nav Links + Search */}
<div className="d-flex align-items-center gap-4">
  {/* Home */}
  <a 
    style={{
      position: 'absolute',
      bottom: '70px',
      right: '1200px',
      transform: 'translateY(-80%)',
      fontSize: '20px',
      fontWeight: '350',
      color: '#BEA173',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}
    href="home"
    className="nav-link"
  >
    <i className="fas fa-home" style={{ fontSize: '20px' }}></i>
    Home
  </a>

  {/* Artworks */}
  <a 
    style={{
      position: 'absolute',
      bottom: '70px',
      right: '1050px',
      transform: 'translateY(-80%)',
      fontSize: '20px',
      fontWeight: '350',
      color: '#BEA173',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}
    href="artworks"
    className="nav-link"
  >
    <i className="fas fa-palette" style={{ fontSize: '20px' }}></i>
    Artworks
  </a>

  {/* Artists */}
  <a 
    style={{
      position: 'absolute',
      bottom: '70px',
      right: '925px',
      transform: 'translateY(-80%)',
      fontSize: '20px',
      fontWeight: '350',
      color: '#BEA173',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}
    href="artists"
    className="nav-link"
  >
    <i className="fas fa-user" style={{ fontSize: '20px' }}></i>
    Artists
  </a>

  {/* About */}
  <a 
    style={{
      position: 'absolute',
      bottom: '70px',
      right: '820px',
      transform: 'translateY(-80%)',
      fontSize: '20px',
      fontWeight: '350',
      color: '#BEA173',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}
    href="aboutus"
    className="nav-link"
  >
    <i className="fas fa-info-circle" style={{ fontSize: '20px' }}></i>
    About
  </a>


    {/* Search Bar */}
    <div style={{ position: 'absolute', top: '110px' , right:'850px' ,transform: 'translateY(-80%)'}}>
      <input 
        type="text" 
        placeholder="          Search for a specific painting" 
        style={{
          padding: '8px 32px 8px 12px',
          borderRadius: '60px',
          fontSize:'22px',
          border: '1.5px solid #BEA173',
          outline: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          color: '#fff',
          width: '400px'
        }}
      />
      <i className="fas fa-search" style={{
        fontSize: '25px',
        position: 'absolute',
        right: '360px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#BEA173'
      }}></i>
    </div>
  </div>

        <div className="d-flex align-items-center gap-4">
          {user && ['artist','admin'].includes(user.role) && (
            <a onClick={() => router.push('/submit')} className="nav-link" style={{ cursor: 'pointer' }}>Submit Artwork</a>
          )}

        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-hover-effect"
            onClick={() => router.push('/myaccount')}
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
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#cbbd93';
              e.currentTarget.style.color = '#001026';
            }}
            onMouseLeave={(e) => {
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
              <i className="fas fa-user" style={{ color: '#001026', fontSize: '16px' }}></i>
            </span>
            <span style={{ display: 'inline-block' }}>My Account</span>
            
          </button>
          <button
            className="btn btn-hover-effect"
            onClick={() => router.push('/signup')}
            style={{
              borderRadius: '12px',
              padding: '8px 18px',
              border: '1.5px solid #BEA173',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontWeight: '300',
              color: '#BEA173',
              fontSize: '18px',
              letterSpacing: '0.5px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#cbbd93';
              e.currentTarget.style.color = '#001026';
            }}
            onMouseLeave={(e) => {
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
              <i className="fas fa-user-plus" style={{ color: '#BEA173', fontSize: '16px' }}></i>
            </span>
            <span style={{ display: 'inline-block' }}>Sign Up</span>
            
          </button>
          <button
            className="btn btn-hover-effect"
            onClick={() => router.push('/login')}
            style={{
              borderRadius: '12px',
              padding: '8px 18px',
              border: '1.5px solid #BEA173',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontWeight: '300',
              color: '#BEA173',
              fontSize: '18px',
              letterSpacing: '0.5px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#cbbd93';
              e.currentTarget.style.color = '#001026';
            }}
            onMouseLeave={(e) => {
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
              <i className="fas fa-sign-in-alt" style={{ color: '#BEA173', fontSize: '16px' }}></i>
            </span>
            <span style={{ display: 'inline-block' }}>login</span>
            
          </button>
          
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 32px' }}>
        
        <h1 style={{ 
          fontFamily: "'Playfair Display', serif", 
          fontSize: '2.5rem', 
          color: '#BEA173', 
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          Featured Artists
        </h1>

        {artists.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'rgba(203, 189, 147, 0.6)' }}>
            No artists found
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '32px' 
          }}>
            {artists.map((artist) => (
              <div 
                key={artist._id}
                onClick={() => router.push(`/artists/${artist._id}`)}
                style={{
                  background: 'rgba(10, 25, 47, 0.5)',
                  border: '1px solid rgba(190, 161, 115, 0.2)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(190, 161, 115, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ 
                  height: '300px', 
                  background: 'linear-gradient(135deg, rgba(203,189,147,0.2) 0%, rgba(203,189,147,0.4) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {artist.image ? (
                    <img 
                      src={artist.image} 
                      alt={artist.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <i className="fas fa-user" style={{ fontSize: '4rem', color: 'rgba(190,161,115,0.5)' }}></i>
                  )}
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ 
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.5rem', 
                    color: '#BEA173', 
                    marginBottom: '8px',
                    fontWeight: '400'
                  }}>
                    {artist.name}
                  </h3>
                  {artist.period && (
                    <p style={{ color: 'rgba(190, 161, 115, 0.8)', fontSize: '0.85rem', marginBottom: '8px', fontStyle: 'italic' }}>
                      {artist.period}
                    </p>
                  )}
                  <p style={{ color: 'rgba(203, 189, 147, 0.7)', fontSize: '0.9rem', marginBottom: '12px' }}>
                    {artist.bio ? (artist.bio.length > 100 ? `${artist.bio.substring(0, 100)}...` : artist.bio) : 'Visual Artist'}
                  </p>
                  <div style={{ display: 'flex', gap: '16px', color: 'rgba(203, 189, 147, 0.5)', fontSize: '0.85rem' }}>
                    {artist.years && (
                      <span>
                        <i className="fas fa-calendar" style={{ marginRight: '6px' }}></i>
                        {artist.years}
                      </span>
                    )}
                    {artist.country && (
                      <span>
                        <i className="fas fa-map-marker-alt" style={{ marginRight: '6px' }}></i>
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
    </div>
  );
}
