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
      <nav style={{
        background: 'rgba(10, 25, 47, 0.95)',
        borderBottom: '1px solid rgba(203, 189, 147, 0.1)',
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <img 
            src="/images/logo.png"
            alt="Galerium"
            onClick={() => router.push('/catalog')}
            style={{
              height: '60px',
              width: '150px',
              objectFit: 'contain',
              filter: 'brightness(0) saturate(100%) invert(83%) sepia(12%) saturate(488%) hue-rotate(358deg) brightness(90%) contrast(90%)',
              cursor: 'pointer'
            }}
          />
          <a onClick={() => router.push('/catalog')} style={{ color: '#CBBD93', cursor: 'pointer', textDecoration: 'none' }}>Catalog</a>
          <a onClick={() => router.push('/artists')} style={{ color: '#BEA173', cursor: 'pointer', textDecoration: 'none', fontWeight: '500' }}>Artists</a>
          <a onClick={() => router.push('/featured')} style={{ color: '#CBBD93', cursor: 'pointer', textDecoration: 'none' }}>Featured</a>
          <a onClick={() => router.push('/search')} style={{ color: '#CBBD93', cursor: 'pointer', textDecoration: 'none' }}>Search</a>
          <a onClick={() => router.push('/myaccount')} style={{ color: '#CBBD93', cursor: 'pointer', textDecoration: 'none' }}>My Account</a>
        </div>
        {user && (
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid #CBBD93',
              color: '#CBBD93',
              padding: '8px 20px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        )}
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
