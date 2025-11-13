'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function MonProfil() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          router.push('/login');
          return;
        }
        const data = await res.json();
        if (data.success && data.data) {
          setUser(data.data);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  const [formData, setFormData] = useState({
    name: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implémenter la mise à jour du profil via API
    setIsEditing(false);
    alert("Profil mis à jour avec succès!");
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="d-flex min-vh-100 align-items-center justify-content-center" style={{ background: '#001026' }}>
        <div style={{ color: '#cbbd93', fontSize: '1.5rem' }}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="d-flex min-vh-100" style={{
      background: '#001026',
      padding: '2rem 0'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Carte Profil */}
            <div className="card shadow-lg border-0 mb-4" style={{
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}>
              <div className="card-header border-0 bg-transparent">
                <h2 className="mb-0 text-center fw-bold" style={{ color: '#39395e' }}>
                  My Profile
                </h2>
              </div>
              
              <div className="card-body">
                <div className="row">
                  {/* Colonne Photo */}
                  <div className="col-md-4 text-center mb-4 mb-md-0">
                    <div 
                      className="rounded-circle mb-3 border d-flex align-items-center justify-content-center mx-auto" 
                      style={{ 
                        width: '150px',
                        height: '150px',
                        borderColor: 'rgba(203, 189, 147, 0.5)',
                        backgroundColor: 'rgba(203, 189, 147, 0.1)',
                        fontSize: '3rem',
                        color: '#cbbd93',
                        fontWeight: 'bold'
                      }}
                    >
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="mt-3">
                      <span className="badge" style={{ 
                        backgroundColor: user.role === 'admin' ? '#dc3545' : user.role === 'artist' ? '#28a745' : '#6c757d',
                        fontSize: '0.9rem',
                        padding: '8px 16px'
                      }}>
                        {user.role === 'admin' ? 'Administrator' : user.role === 'artist' ? 'Artist' : 'User'}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="border-bottom py-2">
                        <small className="text-muted">Member since</small>
                        <div className="fw-bold">{new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                      </div>
                    </div>
                  </div>

                  {/* Colonne Informations */}
                  <div className="col-md-8">
                    {isEditing ? (
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label className="form-label fw-bold" style={{ color: '#39395e' }}>Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ borderColor: 'rgba(203, 189, 147, 0.3)' }}
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-bold" style={{ color: '#39395e' }}>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={user.email}
                            disabled
                            style={{ borderColor: 'rgba(203, 189, 147, 0.3)', backgroundColor: '#f5f5f5' }}
                          />
                          <small className="text-muted">Email cannot be changed</small>
                        </div>

                        <div className="d-flex justify-content-end gap-2">
                          <button 
                            type="button" 
                            className="btn btn-sm"
                            style={{ 
                              backgroundColor: 'rgba(203, 189, 147, 0.1)',
                              color: '#39395e',
                              border: 'none'
                            }}
                            onClick={() => {
                              setIsEditing(false);
                              setFormData({ name: user.name });
                            }}
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit" 
                            className="btn btn-sm"
                            style={{ 
                              background: '#cbbd93',
                              color: '#001026',
                              border: 'none'
                            }}
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div>
                        <div className="mb-4">
                          <h5 style={{ color: '#39395e', marginBottom: '20px' }}>{user.name || 'User'}</h5>
                          <div className="mb-3">
                            <small className="text-muted d-block">Email</small>
                            <div style={{ color: '#39395e' }}>{user.email || 'N/A'}</div>
                          </div>
                          <div className="mb-3">
                            <small className="text-muted d-block">Account Type</small>
                            <div style={{ color: '#39395e' }}>
                              {user.role === 'admin' ? 'Administrator' : user.role === 'artist' ? 'Artist' : 'Standard User'}
                            </div>
                          </div>
                        </div>

                        <div className="d-flex flex-wrap gap-2">
                          <button 
                            className="btn btn-sm"
                            style={{ 
                              background: '#cbbd93',
                              color: '#001026',
                              border: 'none'
                            }}
                            onClick={() => setIsEditing(true)}
                          >
                            <i className="bi bi-pencil-square me-2"></i>
                            Edit Profile
                          </button>

                          {(user.role === 'artist' || user.role === 'admin') && (
                            <button 
                              className="btn btn-sm"
                              style={{ 
                                background: '#001026',
                                color: '#cbbd93',
                                border: '1px solid #cbbd93'
                              }}
                              onClick={() => router.push('/submit')}
                            >
                              <i className="bi bi-upload me-2"></i>
                              Submit Artwork
                            </button>
                          )}

                          {(user.role === 'artist' || user.role === 'admin') && (
                            <button 
                              className="btn btn-sm"
                              style={{ 
                                background: 'transparent',
                                color: '#001026',
                                border: '1px solid rgba(203, 189, 147, 0.5)'
                              }}
                              onClick={() => router.push('/mysubmissions')}
                            >
                              <i className="bi bi-folder me-2"></i>
                              My Submissions
                            </button>
                          )}

                          <button 
                            className="btn btn-sm"
                            style={{ 
                              backgroundColor: 'rgba(220, 53, 69, 0.1)',
                              color: '#dc3545',
                              border: '1px solid rgba(220, 53, 69, 0.3)'
                            }}
                            onClick={handleLogout}
                          >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}