'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StyleBrowsePage() {
  const router = useRouter();
  const [artworks, setArtworks] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [loading, setLoading] = useState(true);

  const styles = [
    { id: 'all', name: 'All Styles', icon: '🎨' },
    { id: 'Renaissance', name: 'Renaissance', icon: '🏛️' },
    { id: 'Baroque', name: 'Baroque', icon: '👑' },
    { id: 'Impressionism', name: 'Impressionism', icon: '🌅' },
    { id: 'Post-Impressionism', name: 'Post-Impressionism', icon: '🌟' },
    { id: 'Expressionism', name: 'Expressionism', icon: '😱' },
    { id: 'Cubism', name: 'Cubism', icon: '📐' },
    { id: 'Surrealism', name: 'Surrealism', icon: '🌙' },
    { id: 'Abstract', name: 'Abstract', icon: '🎭' },
    { id: 'Contemporary', name: 'Contemporary', icon: '💫' },
  ];

  useEffect(() => {
    fetchArtworks();
  }, [selectedStyle]);

  const fetchArtworks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/artworks');
      const data = await res.json();
      if (data.success) {
        const filtered = selectedStyle === 'all' 
          ? data.data 
          : data.data.filter(a => a.period === selectedStyle);
        setArtworks(filtered);
      }
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#001026', padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 mb-3" style={{ 
            color: '#cbbd93', 
            fontFamily: "'Playfair Display', serif",
            fontWeight: '400'
          }}>
            Browse by Style
          </h1>
          <p style={{ color: 'rgba(203,189,147,0.8)', fontSize: '1.1rem' }}>
            Explore artworks from different periods and movements
          </p>
        </div>

        {/* Style Filter Pills */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {styles.map(style => (
            <button
              key={style.id}
              className="btn"
              onClick={() => setSelectedStyle(style.id)}
              style={{
                background: selectedStyle === style.id ? '#cbbd93' : 'rgba(203,189,147,0.1)',
                color: selectedStyle === style.id ? '#001026' : '#cbbd93',
                border: '1px solid rgba(203,189,147,0.3)',
                padding: '0.6rem 1.2rem',
                borderRadius: '25px',
                transition: 'all 0.3s',
                fontWeight: selectedStyle === style.id ? '600' : '400'
              }}
              onMouseEnter={(e) => {
                if (selectedStyle !== style.id) {
                  e.target.style.background = 'rgba(203,189,147,0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedStyle !== style.id) {
                  e.target.style.background = 'rgba(203,189,147,0.1)';
                }
              }}
            >
              <span className="me-2">{style.icon}</span>
              {style.name}
            </button>
          ))}
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center" style={{ padding: '4rem' }}>
            <div className="spinner-border" style={{ color: '#cbbd93' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : artworks.length === 0 ? (
          <div className="text-center" style={{ color: '#cbbd93', padding: '3rem' }}>
            <i className="fas fa-palette fa-3x mb-3" style={{ opacity: 0.5 }}></i>
            <h4>No artworks found in this style</h4>
            <p>Try selecting a different period</p>
          </div>
        ) : (
          <>
            <div className="mb-4" style={{ color: '#cbbd93' }}>
              <h5>{artworks.length} artwork{artworks.length !== 1 ? 's' : ''} found</h5>
            </div>
            
            <div className="row g-4">
              {artworks.map(artwork => (
                <div key={artwork._id} className="col-sm-6 col-md-4 col-lg-3">
                  <div 
                    className="card h-100"
                    style={{
                      background: 'rgba(255,255,255,0.95)',
                      border: '1px solid rgba(203,189,147,0.2)',
                      cursor: 'pointer',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(203,189,147,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    onClick={() => router.push('/catalog')}
                  >
                    <img 
                      src={artwork.image} 
                      alt={artwork.title}
                      className="card-img-top"
                      style={{ height: '220px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      {artwork.period && (
                        <span 
                          className="badge mb-2"
                          style={{ 
                            background: 'rgba(203,189,147,0.2)', 
                            color: '#001026',
                            fontSize: '0.7rem'
                          }}
                        >
                          {artwork.period}
                        </span>
                      )}
                      <h6 className="card-title" style={{ color: '#39395e', fontSize: '0.95rem' }}>
                        {artwork.title}
                      </h6>
                      <p className="card-text small text-muted mb-0">
                        {artwork.artist}
                      </p>
                      <p className="card-text small text-muted">
                        {artwork.year}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
