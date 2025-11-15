'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FeaturedPage() {
  const router = useRouter();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [interactions, setInteractions] = useState({});

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchFeaturedArtworks();
    }
  }, [user]);

  const checkAuth = async () => {
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
      console.error('Auth check failed:', error);
      router.push('/login');
    }
  };

  const fetchFeaturedArtworks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/artworks');
      const data = await response.json();

      if (data.success) {
        // Filter featured artworks or display all with featured badge
        const artworkData = data.data || [];
        setArtworks(artworkData);
        
        // Fetch interactions for each artwork
        for (const artwork of artworkData) {
          if (artwork._id) {
            fetchUserInteractions(artwork._id);
          }
        }
      } else {
        setError(data.error || 'Failed to load featured artworks');
      }
    } catch (err) {
      console.error('Error fetching featured artworks:', err);
      setError('Unable to load featured artworks');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserInteractions = async (artworkId) => {
    if (!user) return;
    try {
      const res = await fetch(`/api/interactions/${artworkId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setInteractions(prev => ({
            ...prev,
            [artworkId]: data.data
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching interactions:', error);
    }
  };

  const handleInteraction = async (artworkId, type) => {
    if (!user) return;
    
    try {
      const res = await fetch(`/api/interactions/${artworkId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          // Refresh interactions
          fetchUserInteractions(artworkId);
        }
      }
    } catch (error) {
      console.error('Error updating interaction:', error);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const handleArtworkClick = (id) => {
    // Navigate to artwork detail page when implemented
    console.log('Navigate to artwork:', id);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#001026', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <div className="spinner-border" style={{ color: '#cbbd93', width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ color: '#cbbd93', marginTop: '1rem' }}>Loading featured artworks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: '#001026', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <i className="fas fa-exclamation-circle" style={{ fontSize: '4rem', color: '#cbbd93', marginBottom: '1rem' }}></i>
          <h3 style={{ color: '#cbbd93' }}>Error Loading Artworks</h3>
          <p style={{ color: 'rgba(203,189,147,0.7)' }}>{error}</p>
          <button 
            className="btn mt-3"
            onClick={fetchFeaturedArtworks}
            style={{ background: '#cbbd93', color: '#001026', border: 'none', padding: '0.6rem 2rem' }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#001026' }}>
      {/* Navigation Bar */}
      <nav style={{
        background: 'rgba(10, 25, 47, 0.95)',
        borderBottom: '1px solid rgba(203, 189, 147, 0.1)',
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <img 
            src="/images/logo.jpg"
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
          <a onClick={() => router.push('/artists')} style={{ color: '#CBBD93', cursor: 'pointer', textDecoration: 'none' }}>Artists</a>
          <a onClick={() => router.push('/featured')} style={{ color: '#BEA173', cursor: 'pointer', textDecoration: 'none', fontWeight: '500' }}>Featured</a>
          <a onClick={() => router.push('/search')} style={{ color: '#CBBD93', cursor: 'pointer', textDecoration: 'none' }}>Search</a>
          <a onClick={() => router.push('/myaccount')} style={{ color: '#CBBD93', cursor: 'pointer', textDecoration: 'none' }}>My Account</a>
        </div>
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
      </nav>

      <div style={{ padding: '3rem 0' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <span 
            className="badge mb-3"
            style={{ 
              background: 'rgba(203,189,147,0.2)', 
              color: '#cbbd93',
              fontSize: '1rem',
              padding: '0.6rem 1.2rem',
              fontWeight: '400'
            }}
          >
            <i className="fas fa-star me-2"></i>
            Curated Collection
          </span>
          <h1 className="display-4 mb-3" style={{ 
            color: '#cbbd93', 
            fontFamily: "'Playfair Display', serif",
            fontWeight: '400'
          }}>
            Featured Artworks
          </h1>
          <p style={{ color: 'rgba(203,189,147,0.8)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
            Discover our handpicked selection of exceptional artworks from talented artists around the world
          </p>
        </div>

        {/* Stats Bar */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div 
              className="text-center p-4"
              style={{ 
                background: 'rgba(203,189,147,0.1)', 
                borderRadius: '15px',
                border: '1px solid rgba(203,189,147,0.2)'
              }}
            >
              <h3 style={{ color: '#cbbd93', marginBottom: '0.5rem' }}>{artworks.length}</h3>
              <p style={{ color: 'rgba(203,189,147,0.7)', marginBottom: 0, fontSize: '0.9rem' }}>Total Artworks</p>
            </div>
          </div>
          <div className="col-md-4">
            <div 
              className="text-center p-4"
              style={{ 
                background: 'rgba(203,189,147,0.1)', 
                borderRadius: '15px',
                border: '1px solid rgba(203,189,147,0.2)'
              }}
            >
              <h3 style={{ color: '#cbbd93', marginBottom: '0.5rem' }}>
                {new Set(artworks.map(a => a.artistName)).size}
              </h3>
              <p style={{ color: 'rgba(203,189,147,0.7)', marginBottom: 0, fontSize: '0.9rem' }}>Featured Artists</p>
            </div>
          </div>
          <div className="col-md-4">
            <div 
              className="text-center p-4"
              style={{ 
                background: 'rgba(203,189,147,0.1)', 
                borderRadius: '15px',
                border: '1px solid rgba(203,189,147,0.2)'
              }}
            >
              <h3 style={{ color: '#cbbd93', marginBottom: '0.5rem' }}>
                {new Set(artworks.map(a => a.period)).size}
              </h3>
              <p style={{ color: 'rgba(203,189,147,0.7)', marginBottom: 0, fontSize: '0.9rem' }}>Art Movements</p>
            </div>
          </div>
        </div>

        {/* Artworks Grid */}
        {artworks.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-image" style={{ fontSize: '4rem', color: 'rgba(203,189,147,0.3)', marginBottom: '1rem' }}></i>
            <h4 style={{ color: '#cbbd93' }}>No Featured Artworks Yet</h4>
            <p style={{ color: 'rgba(203,189,147,0.6)' }}>Check back soon for our curated collection</p>
            <button 
              className="btn mt-3"
              onClick={() => router.push('/catalog')}
              style={{ background: '#cbbd93', color: '#001026', border: 'none', padding: '0.6rem 2rem' }}
            >
              <i className="fas fa-palette me-2"></i>
              Browse All Artworks
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {artworks.map((artwork) => (
              <div key={artwork._id} className="col-md-6 col-lg-4">
                <div 
                  className="card h-100"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    border: '1px solid rgba(203,189,147,0.2)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    overflow: 'hidden'
                  }}
                  onClick={() => handleArtworkClick(artwork._id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(203,189,147,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Image Placeholder */}
                  <div 
                    style={{
                      height: '300px',
                      background: `linear-gradient(135deg, rgba(203,189,147,0.2) 0%, rgba(203,189,147,0.4) 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'rgba(203,189,147,0.9)',
                      color: '#001026',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}>
                      <i className="fas fa-star"></i>
                      Featured
                    </div>
                    <i className="fas fa-image" style={{ fontSize: '3rem', color: 'rgba(190,161,115,0.5)' }}></i>
                  </div>

                  <div className="card-body p-4">
                    {/* Title */}
                    <h5 className="card-title mb-2" style={{ color: '#39395e', fontWeight: '600' }}>
                      {artwork.title}
                    </h5>

                    {/* Artist */}
                    <p className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>
                      <i className="fas fa-user-circle me-1"></i>
                      {artwork.artistName}
                    </p>

                    {/* Period Badge */}
                    {artwork.period && (
                      <span 
                        className="badge mb-3"
                        style={{ 
                          background: 'rgba(203,189,147,0.2)', 
                          color: '#001026',
                          fontSize: '0.75rem',
                          padding: '0.4rem 0.8rem'
                        }}
                      >
                        {artwork.period}
                      </span>
                    )}

                    {/* Description */}
                    <p className="card-text text-muted small" style={{ lineHeight: '1.6' }}>
                      {artwork.description?.length > 120 
                        ? `${artwork.description.substring(0, 120)}...` 
                        : artwork.description || 'No description available'}
                    </p>

                    {/* Interaction Buttons */}
                    <div className="d-flex gap-2 mb-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInteraction(artwork._id, 'like');
                        }}
                        style={{
                          background: interactions[artwork._id]?.isLiked ? '#cbbd93' : 'transparent',
                          border: '1px solid #cbbd93',
                          color: interactions[artwork._id]?.isLiked ? '#001026' : '#cbbd93',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '20px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          transition: 'all 0.3s'
                        }}
                      >
                        <i className={`fa${interactions[artwork._id]?.isLiked ? 's' : 'r'} fa-heart me-1`}></i>
                        Like
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInteraction(artwork._id, 'favorite');
                        }}
                        style={{
                          background: interactions[artwork._id]?.isFavorited ? '#cbbd93' : 'transparent',
                          border: '1px solid #cbbd93',
                          color: interactions[artwork._id]?.isFavorited ? '#001026' : '#cbbd93',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '20px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          transition: 'all 0.3s'
                        }}
                      >
                        <i className={`fa${interactions[artwork._id]?.isFavorited ? 's' : 'r'} fa-star me-1`}></i>
                        Favorite
                      </button>
                    </div>

                    {/* Footer Info */}
                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3" style={{ borderTop: '1px solid rgba(203,189,147,0.2)' }}>
                      <div className="text-muted small">
                        <i className="fas fa-calendar me-1" style={{ color: '#bea173' }}></i>
                        {artwork.year || 'Unknown'}
                      </div>
                      <div className="text-muted small">
                        <i className="fas fa-eye me-1" style={{ color: '#bea173' }}></i>
                        View Details
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div 
          className="text-center mt-5 p-5"
          style={{ 
            background: 'rgba(203,189,147,0.1)', 
            borderRadius: '15px',
            border: '1px solid rgba(203,189,147,0.2)'
          }}
        >
          <h4 style={{ color: '#cbbd93', marginBottom: '1rem' }}>
            Explore Our Complete Collection
          </h4>
          <p style={{ color: 'rgba(203,189,147,0.8)', marginBottom: '1.5rem' }}>
            Discover thousands of artworks spanning centuries of artistic excellence
          </p>
          <button 
            className="btn btn-lg me-3"
            onClick={() => router.push('/catalog')}
            style={{
              background: '#cbbd93',
              color: '#001026',
              border: 'none',
              padding: '0.8rem 2rem',
              fontWeight: '600'
            }}
          >
            <i className="fas fa-th me-2"></i>
            Full Catalog
          </button>
          <button 
            className="btn btn-lg"
            onClick={() => router.push('/artists')}
            style={{
              background: 'transparent',
              color: '#cbbd93',
              border: '2px solid #cbbd93',
              padding: '0.8rem 2rem',
              fontWeight: '600'
            }}
          >
            <i className="fas fa-users me-2"></i>
            Meet Artists
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
