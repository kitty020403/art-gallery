'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AboutArtistPage({ params }) {
  const router = useRouter();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = params;

  useEffect(() => {
    if (id) {
      fetchArtist();
    }
  }, [id]);

  const fetchArtist = async () => {
    try {
      const res = await fetch(`/api/artists/${id}`);
      const data = await res.json();
      if (data.success) {
        setArtist(data.data);
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
        <div style={{ color: '#cbbd93', fontSize: '1.5rem' }}>Loading...</div>
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
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="display-4 mb-3" style={{ 
                color: '#cbbd93', 
                fontFamily: "'Playfair Display', serif" 
              }}>
                About {artist.name}
              </h1>
              <p style={{ color: 'rgba(203,189,147,0.8)', fontSize: '1.1rem' }}>
                {artist.period} • {artist.years}
              </p>
            </div>

            {/* Main Content Card */}
            <div 
              className="card border-0 mb-4"
              style={{ background: 'rgba(255,255,255,0.95)' }}
            >
              <div className="card-body p-5">
                {/* Overview */}
                <section className="mb-5">
                  <h3 style={{ color: '#39395e', marginBottom: '1.5rem' }}>
                    <i className="fas fa-user-circle me-2"></i>
                    Overview
                  </h3>
                  <p className="text-muted" style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>
                    <strong>{artist.name}</strong> ({artist.years}) was a {artist.period} artist 
                    from {artist.country}. Known for their innovative approach and unique style, 
                    {artist.name} made significant contributions to the art world during their lifetime.
                  </p>
                </section>

                {/* Career Highlights */}
                <section className="mb-5">
                  <h3 style={{ color: '#39395e', marginBottom: '1.5rem' }}>
                    <i className="fas fa-star me-2"></i>
                    Career Highlights
                  </h3>
                  <ul className="text-muted" style={{ lineHeight: '2' }}>
                    <li>Pioneer of the {artist.period} movement</li>
                    <li>Exhibited in major galleries across {artist.country}</li>
                    <li>Influenced generations of contemporary artists</li>
                    <li>Works featured in prestigious museum collections worldwide</li>
                  </ul>
                </section>

                {/* Artistic Style */}
                <section className="mb-5">
                  <h3 style={{ color: '#39395e', marginBottom: '1.5rem' }}>
                    <i className="fas fa-palette me-2"></i>
                    Artistic Style
                  </h3>
                  <div 
                    className="p-4"
                    style={{ 
                      background: 'rgba(203,189,147,0.1)', 
                      borderRadius: '10px',
                      borderLeft: '4px solid #cbbd93'
                    }}
                  >
                    <p className="text-muted mb-0" style={{ lineHeight: '1.8' }}>
                      {artist.name}&apos;s work is characterized by the distinctive elements of {artist.period}, 
                      combining technical mastery with innovative expression. Their pieces demonstrate 
                      a deep understanding of {artist.period.toLowerCase()} principles while pushing 
                      artistic boundaries.
                    </p>
                  </div>
                </section>

                {/* Legacy */}
                <section className="mb-4">
                  <h3 style={{ color: '#39395e', marginBottom: '1.5rem' }}>
                    <i className="fas fa-landmark me-2"></i>
                    Legacy
                  </h3>
                  <p className="text-muted" style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>
                    Today, {artist.name}&apos;s influence continues to resonate in the art world. 
                    Their innovative techniques and unique perspective have inspired countless artists 
                    and remain celebrated in museums and galleries around the globe.
                  </p>
                </section>

                {/* Action Buttons */}
                <div className="d-flex gap-3 mt-4 pt-4 border-top">
                  <button 
                    className="btn"
                    onClick={() => router.push(`/artists/${id}`)}
                    style={{
                      background: '#cbbd93',
                      color: '#001026',
                      border: 'none'
                    }}
                  >
                    <i className="fas fa-user me-2"></i>
                    View Profile
                  </button>
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
                    All Artists
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="row g-3">
              <div className="col-md-4">
                <div 
                  className="text-center p-3"
                  style={{ 
                    background: 'rgba(203,189,147,0.1)', 
                    borderRadius: '10px',
                    border: '1px solid rgba(203,189,147,0.2)'
                  }}
                >
                  <h6 style={{ color: '#cbbd93', marginBottom: '0.5rem' }}>Period</h6>
                  <p style={{ color: 'rgba(203,189,147,0.8)', margin: 0 }}>{artist.period}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div 
                  className="text-center p-3"
                  style={{ 
                    background: 'rgba(203,189,147,0.1)', 
                    borderRadius: '10px',
                    border: '1px solid rgba(203,189,147,0.2)'
                  }}
                >
                  <h6 style={{ color: '#cbbd93', marginBottom: '0.5rem' }}>Origin</h6>
                  <p style={{ color: 'rgba(203,189,147,0.8)', margin: 0 }}>{artist.country}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div 
                  className="text-center p-3"
                  style={{ 
                    background: 'rgba(203,189,147,0.1)', 
                    borderRadius: '10px',
                    border: '1px solid rgba(203,189,147,0.2)'
                  }}
                >
                  <h6 style={{ color: '#cbbd93', marginBottom: '0.5rem' }}>Years Active</h6>
                  <p style={{ color: 'rgba(203,189,147,0.8)', margin: 0 }}>{artist.years}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
