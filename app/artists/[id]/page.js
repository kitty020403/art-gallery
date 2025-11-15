'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ArtistDetailPage({ params }) {
  const router = useRouter();
  const [artist, setArtist] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = params;

  useEffect(() => {
    if (id) {
      fetchArtistData();
    }
  }, [id]);

  const fetchArtistData = async () => {
    try {
      const [artistRes, artworksRes] = await Promise.all([
        fetch(`/api/artists/${id}`),
        fetch('/api/artworks')
      ]);

      const artistData = await artistRes.json();
      const artworksData = await artworksRes.json();

      if (artistData.success) {
        setArtist(artistData.data);
        // Filter artworks by this artist
        if (artworksData.success) {
          const filtered = artworksData.data.filter(
            a => a.artist?.toLowerCase() === artistData.data.name?.toLowerCase()
          );
          setArtworks(filtered);
        }
      }
    } catch (error) {
      console.error('Error fetching artist:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex min-vh-100 align-items-center justify-content-center" style={{ background: '#001026' }}>
        <div style={{ color: '#cbbd93', fontSize: '1.5rem' }}>Loading artist...</div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="d-flex min-vh-100 align-items-center justify-content-center" style={{ background: '#001026' }}>
        <div className="text-center">
          <h3 style={{ color: '#cbbd93' }}>Artist not found</h3>
          <button onClick={() => router.push('/artists')} className="btn mt-3" style={{ background: '#cbbd93', color: '#001026' }}>
            Back to Artists
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#001026', padding: '3rem 0' }}>
      <div className="container">
        {/* Artist Header */}
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto">
            <div 
              className="card border-0"
              style={{ background: 'rgba(255,255,255,0.95)' }}
            >
              <div className="card-body p-5">
                <div className="d-flex align-items-center mb-4">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-4"
                    style={{
                      width: '100px',
                      height: '100px',
                      background: 'rgba(203,189,147,0.2)',
                      color: '#bea173',
                      fontSize: '2.5rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {artist.name?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <div>
                    <h1 className="display-5 mb-2" style={{ color: '#39395e' }}>
                      {artist.name}
                    </h1>
                    <p className="text-muted lead mb-0">
                      {artist.years} • {artist.country}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <span 
                    className="badge"
                    style={{ 
                      background: 'rgba(203,189,147,0.2)', 
                      color: '#001026',
                      padding: '0.5rem 1rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    {artist.period}
                  </span>
                </div>

                <div className="mb-4">
                  <h5 style={{ color: '#39395e', marginBottom: '1rem' }}>Biography</h5>
                  <p className="text-muted" style={{ lineHeight: '1.8' }}>
                    {artist.name} was a renowned {artist.period} artist from {artist.country}. 
                    Active during {artist.years}, their work has influenced generations of artists 
                    and continues to be celebrated in museums and galleries worldwide.
                  </p>
                </div>

                <div className="d-flex gap-3">
                  <button 
                    className="btn"
                    onClick={() => router.push('/artists')}
                    style={{
                      background: 'rgba(203,189,147,0.1)',
                      color: '#001026',
                      border: '1px solid rgba(203,189,147,0.3)'
                    }}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Artists
                  </button>
                  <button 
                    className="btn"
                    onClick={() => router.push(`/artists/${id}/about`)}
                    style={{
                      background: '#cbbd93',
                      color: '#001026',
                      border: 'none'
                    }}
                  >
                    <i className="fas fa-info-circle me-2"></i>
                    About Artist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Artist's Artworks */}
        <div className="row">
          <div className="col-12">
            <h3 className="mb-4" style={{ color: '#cbbd93', fontFamily: "'Playfair Display', serif" }}>
              Works by {artist.name}
            </h3>
            
            {artworks.length === 0 ? (
              <div className="text-center" style={{ color: '#cbbd93', padding: '3rem' }}>
                <i className="fas fa-palette fa-3x mb-3" style={{ opacity: 0.5 }}></i>
                <p>No artworks available in the gallery</p>
              </div>
            ) : (
              <div className="row g-4">
                {artworks.map(artwork => (
                  <div key={artwork._id} className="col-sm-6 col-md-4 col-lg-3">
                    <div 
                      className="card h-100"
                      style={{
                        background: 'rgba(255,255,255,0.95)',
                        border: '1px solid rgba(203,189,147,0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                      onClick={() => router.push('/catalog')}
                    >
                      <img 
                        src={artwork.image} 
                        alt={artwork.title}
                        className="card-img-top"
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <h6 className="card-title" style={{ color: '#39395e' }}>
                          {artwork.title}
                        </h6>
                        <p className="card-text small text-muted">
                          {artwork.year}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
