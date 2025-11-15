'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // all, artworks, artists

  useEffect(() => {
    if (query.length >= 2) {
      performSearch();
    } else {
      setResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filter]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const [artworksRes, artistsRes] = await Promise.all([
        fetch('/api/artworks'),
        fetch('/api/artists')
      ]);

      const artworksData = await artworksRes.json();
      const artistsData = await artistsRes.json();

      const artworks = (artworksData.data || []).filter(a => 
        a.title?.toLowerCase().includes(query.toLowerCase()) ||
        a.artist?.toLowerCase().includes(query.toLowerCase()) ||
        a.description?.toLowerCase().includes(query.toLowerCase())
      );

      const artists = (artistsData.data || []).filter(a =>
        a.name?.toLowerCase().includes(query.toLowerCase()) ||
        a.period?.toLowerCase().includes(query.toLowerCase())
      );

      if (filter === 'artworks') {
        setResults(artworks.map(a => ({ ...a, type: 'artwork' })));
      } else if (filter === 'artists') {
        setResults(artists.map(a => ({ ...a, type: 'artist' })));
      } else {
        setResults([
          ...artworks.map(a => ({ ...a, type: 'artwork' })),
          ...artists.map(a => ({ ...a, type: 'artist' }))
        ]);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      performSearch();
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#001026', padding: '2rem' }}>
      <div className="container">
        {/* Search Header */}
        <div className="mb-5">
          <h1 className="display-5 mb-4" style={{ color: '#cbbd93', fontFamily: "'Playfair Display', serif" }}>
            Search Gallery
          </h1>
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="input-group" style={{ maxWidth: '600px' }}>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search artworks, artists, styles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ 
                  background: 'rgba(255,255,255,0.9)',
                  border: '1px solid rgba(203,189,147,0.3)'
                }}
              />
              <button 
                type="submit" 
                className="btn btn-lg"
                style={{ 
                  background: '#cbbd93', 
                  color: '#001026',
                  border: 'none',
                  fontWeight: '500'
                }}
              >
                <i className="fas fa-search"></i> Search
              </button>
            </div>
          </form>

          {/* Filter Tabs */}
          <div className="btn-group" role="group">
            <button 
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-light'}`}
              onClick={() => setFilter('all')}
              style={{ 
                background: filter === 'all' ? '#cbbd93' : 'transparent',
                color: filter === 'all' ? '#001026' : '#cbbd93',
                border: '1px solid #cbbd93'
              }}
            >
              All Results
            </button>
            <button 
              className={`btn ${filter === 'artworks' ? 'btn-primary' : 'btn-outline-light'}`}
              onClick={() => setFilter('artworks')}
              style={{ 
                background: filter === 'artworks' ? '#cbbd93' : 'transparent',
                color: filter === 'artworks' ? '#001026' : '#cbbd93',
                border: '1px solid #cbbd93'
              }}
            >
              Artworks
            </button>
            <button 
              className={`btn ${filter === 'artists' ? 'btn-primary' : 'btn-outline-light'}`}
              onClick={() => setFilter('artists')}
              style={{ 
                background: filter === 'artists' ? '#cbbd93' : 'transparent',
                color: filter === 'artists' ? '#001026' : '#cbbd93',
                border: '1px solid #cbbd93'
              }}
            >
              Artists
            </button>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center" style={{ color: '#cbbd93', padding: '3rem' }}>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Searching...</p>
          </div>
        ) : results.length === 0 && query ? (
          <div className="text-center" style={{ color: '#cbbd93', padding: '3rem' }}>
            <i className="fas fa-search fa-3x mb-3" style={{ opacity: 0.5 }}></i>
            <h4>No results found for &quot;{query}&quot;</h4>
            <p>Try different keywords or browse our <a href="/catalog" style={{ color: '#bea173' }}>catalog</a></p>
          </div>
        ) : (
          <div>
            <p style={{ color: '#cbbd93', marginBottom: '2rem' }}>
              Found {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
            </p>
            <div className="row g-4">
              {results.map((item) => (
                <div key={item._id} className="col-md-6 col-lg-4">
                  {item.type === 'artwork' ? (
                    <div 
                      className="card h-100"
                      style={{ 
                        background: 'rgba(255,255,255,0.95)',
                        border: '1px solid rgba(203,189,147,0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                      onClick={() => router.push(`/catalog`)}
                    >
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="card-img-top"
                        style={{ height: '220px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <span 
                          className="badge mb-2" 
                          style={{ background: 'rgba(203,189,147,0.2)', color: '#001026' }}
                        >
                          Artwork
                        </span>
                        <h5 className="card-title" style={{ color: '#39395e' }}>{item.title}</h5>
                        <p className="card-text text-muted">{item.artist} • {item.year}</p>
                        <p className="card-text small">{item.description?.substring(0, 100)}...</p>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="card h-100"
                      style={{ 
                        background: 'rgba(255,255,255,0.95)',
                        border: '1px solid rgba(203,189,147,0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                      onClick={() => router.push(`/artists/${item._id}`)}
                    >
                      <div className="card-body">
                        <span 
                          className="badge mb-2" 
                          style={{ background: 'rgba(185,87,151,0.2)', color: '#001026' }}
                        >
                          Artist
                        </span>
                        <h5 className="card-title" style={{ color: '#39395e' }}>{item.name}</h5>
                        <p className="card-text text-muted">{item.period}</p>
                        <p className="card-text small">{item.years} • {item.country}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}