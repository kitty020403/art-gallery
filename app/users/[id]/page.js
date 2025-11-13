'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PublicUserPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [user, setUser] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [userRes, artsRes] = await Promise.all([
          fetch(`/api/users/${id}`),
          fetch(`/api/artworks?submittedBy=${id}`),
        ]);

        const userJson = await userRes.json();
        if (!userRes.ok || !userJson.success) {
          setError(userJson.error || 'User not found');
          setLoading(false);
          return;
        }
        setUser(userJson.data);

        const artsJson = await artsRes.json();
        if (artsRes.ok && artsJson.success) {
          setArtworks(artsJson.data || []);
        }
      } catch (e) {
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex min-vh-100 align-items-center justify-content-center" style={{ background: '#001026' }}>
        <div style={{ color: '#cbbd93', fontSize: '1.5rem' }}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex min-vh-100 align-items-center justify-content-center" style={{ background: '#001026' }}>
        <div className="text-center">
          <div style={{ color: '#cbbd93', fontSize: '1.1rem' }}>{error}</div>
          <button className="btn mt-3" onClick={() => router.push('/catalog')} style={{ background: '#cbbd93', color: '#001026', border: 'none' }}>Back to Catalog</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#001026', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header */}
            <div className="card border-0 shadow-sm mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
              <div className="card-body d-flex align-items-center gap-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 72, height: 72, background: 'rgba(203,189,147,0.2)', color: '#bea173', fontWeight: 'bold', fontSize: 24 }}>
                  {(user?.name?.[0] || 'U').toUpperCase()}
                </div>
                <div>
                  <h3 className="mb-1" style={{ color: '#39395e' }}>{user?.name || 'User'}</h3>
                  <div>
                    <span className="badge" style={{ background: user?.role === 'admin' ? '#dc3545' : user?.role === 'artist' ? '#28a745' : '#6c757d' }}>
                      {user?.role}
                    </span>
                    <span className="ms-3 text-muted">Member since {new Date(user?.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Artworks grid */}
            <div className="card border-0 shadow-sm" style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
              <div className="card-header bg-transparent border-0">
                <h5 className="mb-0" style={{ color: '#39395e' }}>Artworks by {user?.name || 'this user'}</h5>
              </div>
              <div className="card-body">
                {artworks.length === 0 ? (
                  <div className="text-center text-muted">No artworks to display.</div>
                ) : (
                  <div className="row g-4">
                    {artworks.map((a) => (
                      <div key={a._id} className="col-12 col-sm-6 col-lg-4">
                        <div className="card h-100 border-0" style={{ background: 'rgba(255,255,255,0.9)' }}>
                          <img src={a.image} alt={a.title} className="card-img-top" style={{ height: 220, objectFit: 'cover' }} />
                          <div className="card-body">
                            <h6 className="card-title" style={{ color: '#39395e' }}>{a.title}</h6>
                            <div className="text-muted small">{a.artist} • {a.year}</div>
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
      </div>
    </div>
  );
}
