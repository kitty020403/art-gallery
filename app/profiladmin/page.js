'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPanel() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('artworks');
  const [artworks, setArtworks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    checkAuth();
    fetchArtworks();
    fetchArtists();
    fetchUsers();
  }, []);

  const checkAuth = async () => {
    try {
      console.log('Checking auth...');
      const res = await fetch('/api/auth/me');
      console.log('Auth response status:', res.status);
      
      if (!res.ok) {
        console.log('Not authenticated, redirecting to login');
        router.push('/login');
        return;
      }
      const response = await res.json();
      console.log('Auth response:', response);
      
      if (!response.success || !response.data) {
        console.log('Invalid response, redirecting to login');
        router.push('/login');
        return;
      }
      
      const userData = response.data;
      console.log('User data:', userData);
      
      if (userData.role !== 'admin') {
        console.log('User is not admin, redirecting to home');
        router.push('/');
        return;
      }
      console.log('User is admin, setting user state');
      setUser(userData);
    } catch (error) {
      console.error('Auth error:', error);
      router.push('/login');
    }
  };

  const fetchArtworks = async (opts = {}) => {
    try {
      console.log('Fetching artworks...');
      const res = await fetch(`/api/artworks?status=all`);
      console.log('Artworks response status:', res.status);
      const response = await res.json();
      console.log('Artworks response:', response);
      
      // L'API retourne { success: true, data: [...] }
      const data = response.success && response.data ? response.data : [];
      console.log('Artworks array:', data);
      console.log('Is array?', Array.isArray(data));
      setArtworks(Array.isArray(data) ? data : []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching artworks:', error);
      setArtworks([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchArtists = async () => {
    try {
  const res = await fetch('/api/artists');
      const response = await res.json();
      const data = response.success && response.data ? response.data : [];
      setArtists(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching artists:', error);
      setArtists([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const response = await res.json();
      const data = response.success && response.data ? response.data : [];
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleSubmitArtwork = async (e) => {
    e.preventDefault();
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem ? `/api/artworks/${editingItem._id}` : '/api/artworks';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setEditingItem(null);
        setFormData({});
        fetchArtworks();
      }
    } catch (error) {
      console.error('Error saving artwork:', error);
    }
  };

  const handleSubmitArtist = async (e) => {
    e.preventDefault();
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem ? `/api/artists/${editingItem._id}` : '/api/artists';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setEditingItem(null);
        setFormData({});
        fetchArtists();
      }
    } catch (error) {
      console.error('Error saving artist:', error);
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const url = type === 'artwork' ? `/api/artworks/${id}` : `/api/artists/${id}`;
      const res = await fetch(url, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) {
        let errText = 'Delete failed';
        try { const j = await res.json(); if (j && j.error) errText = j.error; } catch {}
        alert(errText);
        return;
      }
      
      if (type === 'artwork') fetchArtworks();
      else fetchArtists();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setFormData({});
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#001026' }}>
        <div style={{ color: '#cbbd93', fontSize: '1.5rem' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#001026', paddingTop: '80px', paddingBottom: '40px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', gap: '20px', flexWrap: 'wrap' }}>
          <h1 style={{ color: '#cbbd93', fontSize: '2.5rem', marginBottom: 0 }}>Admin Panel</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => { setLoading(true); fetchArtworks(); }}
                style={{
                  backgroundColor: 'transparent',
                  color: '#cbbd93',
                  border: '1px dashed #cbbd93',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >Refresh</button>
            </div>
            <span style={{ color: 'rgba(203,189,147,0.6)', fontSize: '0.7rem', textAlign: 'right' }}>
              {lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : 'Not loaded yet'}
            </span>
          </div>
          <button 
            onClick={handleLogout}
            style={{ 
              backgroundColor: '#cbbd93', 
              color: '#001026', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div style={{ marginBottom: '30px', borderBottom: '1px solid rgba(203, 189, 147, 0.3)' }}>
          <button
            onClick={() => setActiveTab('artworks')}
            style={{
              backgroundColor: 'transparent',
              color: activeTab === 'artworks' ? '#cbbd93' : 'rgba(203, 189, 147, 0.6)',
              border: 'none',
              padding: '10px 30px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              borderBottom: activeTab === 'artworks' ? '2px solid #cbbd93' : 'none'
            }}
          >
            Artworks
          </button>
          <button
            onClick={() => setActiveTab('artists')}
            style={{
              backgroundColor: 'transparent',
              color: activeTab === 'artists' ? '#cbbd93' : 'rgba(203, 189, 147, 0.6)',
              border: 'none',
              padding: '10px 30px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              borderBottom: activeTab === 'artists' ? '2px solid #cbbd93' : 'none'
            }}
          >
            Artists
          </button>
          <button
            onClick={() => setActiveTab('users')}
            style={{
              backgroundColor: 'transparent',
              color: activeTab === 'users' ? '#cbbd93' : 'rgba(203, 189, 147, 0.6)',
              border: 'none',
              padding: '10px 30px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              borderBottom: activeTab === 'users' ? '2px solid #cbbd93' : 'none'
            }}
          >
            Users
          </button>
        </div>

        {/* Artworks Tab */}
        {activeTab === 'artworks' && (
          <div>
            {/* Add/Edit Form */}
            <div style={{ 
              backgroundColor: 'rgba(203, 189, 147, 0.05)', 
              padding: '30px', 
              borderRadius: '10px', 
              marginBottom: '30px',
              border: '1px solid rgba(203, 189, 147, 0.2)'
            }}>
              <h3 style={{ color: '#cbbd93', marginBottom: '20px' }}>
                {editingItem ? 'Edit Artwork' : 'Add New Artwork'}
              </h3>
              <form onSubmit={handleSubmitArtwork}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Title"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'rgba(0, 16, 38, 0.5)',
                        border: '1px solid rgba(203, 189, 147, 0.3)',
                        borderRadius: '5px',
                        color: '#cbbd93'
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Artist"
                      value={formData.artist || ''}
                      onChange={(e) => setFormData({...formData, artist: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'rgba(0, 16, 38, 0.5)',
                        border: '1px solid rgba(203, 189, 147, 0.3)',
                        borderRadius: '5px',
                        color: '#cbbd93'
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      placeholder="Year"
                      value={formData.year || ''}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'rgba(0, 16, 38, 0.5)',
                        border: '1px solid rgba(203, 189, 147, 0.3)',
                        borderRadius: '5px',
                        color: '#cbbd93'
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      placeholder="Period"
                      value={formData.period || ''}
                      onChange={(e) => setFormData({...formData, period: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'rgba(0, 16, 38, 0.5)',
                        border: '1px solid rgba(203, 189, 147, 0.3)',
                        borderRadius: '5px',
                        color: '#cbbd93'
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      placeholder="Price"
                      value={formData.price || ''}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'rgba(0, 16, 38, 0.5)',
                        border: '1px solid rgba(203, 189, 147, 0.3)',
                        borderRadius: '5px',
                        color: '#cbbd93'
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={formData.image || ''}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'rgba(0, 16, 38, 0.5)',
                        border: '1px solid rgba(203, 189, 147, 0.3)',
                        borderRadius: '5px',
                        color: '#cbbd93'
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      placeholder="Description"
                      value={formData.description || ''}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'rgba(0, 16, 38, 0.5)',
                        border: '1px solid rgba(203, 189, 147, 0.3)',
                        borderRadius: '5px',
                        color: '#cbbd93'
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <label style={{ color: '#cbbd93', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="checkbox"
                        checked={formData.featured || false}
                        onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      />
                      Featured
                    </label>
                  </div>
                  <div className="col-12" style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      type="submit"
                      style={{
                        backgroundColor: '#cbbd93',
                        color: '#001026',
                        border: 'none',
                        padding: '10px 30px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      {editingItem ? 'Update' : 'Add'} Artwork
                    </button>
                    {editingItem && (
                      <button 
                        type="button"
                        onClick={cancelEdit}
                        style={{
                          backgroundColor: 'transparent',
                          color: '#cbbd93',
                          border: '1px solid #cbbd93',
                          padding: '10px 30px',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Artworks List with status/moderation */}
            <div className="row g-4">
              {artworks && artworks.length > 0 ? 
                artworks.map(artwork => (
                  <div key={artwork._id} className="col-md-6 col-lg-4">
                    <div style={{
                      backgroundColor: 'rgba(203, 189, 147, 0.05)',
                      border: '1px solid rgba(203, 189, 147, 0.2)',
                      borderRadius: '10px',
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={artwork.image} 
                        alt={artwork.title}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                      />
                      <div style={{ padding: '15px' }}>
                        <h5 style={{ color: '#cbbd93', marginBottom: '5px' }}>{artwork.title}</h5>
                        <p style={{ color: 'rgba(203, 189, 147, 0.7)', marginBottom: '10px', fontSize: '0.9rem' }}>
                          {artwork.artist} - {artwork.year}
                        </p>
                        {artwork.submittedBy && (
                          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 8 }}>
                            <span style={{ fontSize: 12, color: 'rgba(203,189,147,0.8)' }}>By: {artwork.submittedBy?.name || artwork.submittedBy?.email || 'user'}</span>
                          </div>
                        )}
                        {/* Status and rejection reason hidden */}
                        {/* Action buttons temporarily removed */}
                      </div>
                    </div>
                  </div>
                ))
              :
                <div className="col-12">
                  <p style={{ color: '#cbbd93', textAlign: 'center', padding: '20px' }}>
                    No artworks yet. Add your first artwork above!
                  </p>
                </div>
              }
            </div>
          </div>
        )}

        {/* Artists Tab */}
        {activeTab === 'artists' && (
          <div>
            {/* Add/Edit Form */}
            <div style={{ 
              backgroundColor: 'rgba(203, 189, 147, 0.05)', 
              padding: '30px', 
              borderRadius: '10px', 
              marginBottom: '30px',
              border: '1px solid rgba(203, 189, 147, 0.2)'
            }}>
              <h3 style={{ color: '#cbbd93', marginBottom: '20px' }}>
                {editingItem ? 'Edit Artist' : 'Add New Artist'}
              </h3>
              <form onSubmit={handleSubmitArtist}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Name"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'rgba(0, 16, 38, 0.5)',
                        border: '1px solid rgba(203, 189, 147, 0.3)',
                        borderRadius: '5px',
                        color: '#cbbd93'
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Period"
                      value={formData.period || ''}
                      onChange={(e) => setFormData({...formData, period: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'rgba(0, 16, 38, 0.5)',
                        border: '1px solid rgba(203, 189, 147, 0.3)',
                        borderRadius: '5px',
                        color: '#cbbd93'
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Years (e.g., 1853-1890)"
                      value={formData.years || ''}
                      onChange={(e) => setFormData({...formData, years: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'rgba(0, 16, 38, 0.5)',
                        border: '1px solid rgba(203, 189, 147, 0.3)',
                        borderRadius: '5px',
                        color: '#cbbd93'
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Country"
                      value={formData.country || ''}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'rgba(0, 16, 38, 0.5)',
                        border: '1px solid rgba(203, 189, 147, 0.3)',
                        borderRadius: '5px',
                        color: '#cbbd93'
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={formData.image || ''}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'rgba(0, 16, 38, 0.5)',
                        border: '1px solid rgba(203, 189, 147, 0.3)',
                        borderRadius: '5px',
                        color: '#cbbd93'
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      placeholder="Bio"
                      value={formData.bio || ''}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: 'rgba(0, 16, 38, 0.5)',
                        border: '1px solid rgba(203, 189, 147, 0.3)',
                        borderRadius: '5px',
                        color: '#cbbd93'
                      }}
                    />
                  </div>
                  <div className="col-12" style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      type="submit"
                      style={{
                        backgroundColor: '#cbbd93',
                        color: '#001026',
                        border: 'none',
                        padding: '10px 30px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      {editingItem ? 'Update' : 'Add'} Artist
                    </button>
                    {editingItem && (
                      <button 
                        type="button"
                        onClick={cancelEdit}
                        style={{
                          backgroundColor: 'transparent',
                          color: '#cbbd93',
                          border: '1px solid #cbbd93',
                          padding: '10px 30px',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Artists List */}
            <div className="row g-4">
              {artists && artists.length > 0 ?
                artists.map(artist => (
                  <div key={artist._id} className="col-md-6 col-lg-4">
                    <div style={{
                      backgroundColor: 'rgba(203, 189, 147, 0.05)',
                      border: '1px solid rgba(203, 189, 147, 0.2)',
                      borderRadius: '10px',
                      padding: '20px'
                    }}>
                      <h5 style={{ color: '#cbbd93', marginBottom: '10px' }}>{artist.name}</h5>
                      <p style={{ color: 'rgba(203, 189, 147, 0.7)', marginBottom: '5px', fontSize: '0.9rem' }}>
                        {artist.period && `${artist.period} | `}{artist.years}
                      </p>
                      <p style={{ color: 'rgba(203, 189, 147, 0.7)', marginBottom: '15px', fontSize: '0.9rem' }}>
                        {artist.country}
                      </p>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => startEdit(artist)}
                          style={{
                            flex: 1,
                            backgroundColor: '#cbbd93',
                            color: '#001026',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete('artist', artist._id)}
                          style={{
                            flex: 1,
                            backgroundColor: 'rgba(220, 53, 69, 0.8)',
                            color: 'white',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              :
                <div className="col-12">
                  <p style={{ color: '#cbbd93', textAlign: 'center', padding: '20px' }}>
                    No artists yet. Add your first artist above!
                  </p>
                </div>
              }
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h3 style={{ color: '#cbbd93', marginBottom: '20px' }}>User Management</h3>
            <p style={{ color: 'rgba(203, 189, 147, 0.8)', marginBottom: '30px' }}>
              Promote users to artist role to allow them to submit artworks.
            </p>

            <div className="row g-4">
              {users && users.length > 0 ?
                users.map(u => (
                  <div key={u._id} className="col-md-6 col-lg-4">
                    <div style={{
                      backgroundColor: 'rgba(203, 189, 147, 0.05)',
                      border: '1px solid rgba(203, 189, 147, 0.2)',
                      borderRadius: '10px',
                      padding: '20px'
                    }}>
                      <h5 style={{ color: '#cbbd93', marginBottom: '5px' }}>{u.name}</h5>
                      <p style={{ color: 'rgba(203, 189, 147, 0.7)', marginBottom: '5px', fontSize: '0.9rem' }}>
                        {u.email}
                      </p>
                      <div style={{ 
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        marginTop: '8px',
                        marginBottom: '15px',
                        backgroundColor: u.role === 'admin' ? 'rgba(220,53,69,0.2)' : u.role === 'artist' ? 'rgba(40,167,69,0.2)' : 'rgba(108,117,125,0.2)',
                        color: u.role === 'admin' ? '#dc3545' : u.role === 'artist' ? '#28a745' : '#6c757d'
                      }}>
                        {u.role.toUpperCase()}
                      </div>

                      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                        {u.role !== 'artist' && u.role !== 'admin' && (
                          <button
                            onClick={async () => {
                              try {
                                const res = await fetch(`/api/users/${u._id}`, {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  credentials: 'include',
                                  body: JSON.stringify({ role: 'artist' })
                                });
                                if (res.ok) {
                                  fetchUsers();
                                  alert(`${u.name} promoted to artist!`);
                                } else {
                                  const data = await res.json();
                                  alert(data.error || 'Failed to promote user');
                                }
                              } catch (e) {
                                alert('Network error');
                              }
                            }}
                            style={{
                              flex: 1,
                              backgroundColor: 'rgba(40,167,69,0.8)',
                              color: 'white',
                              border: 'none',
                              padding: '8px',
                              borderRadius: '5px',
                              cursor: 'pointer',
                              fontSize: '0.9rem'
                            }}
                          >
                            Make Artist
                          </button>
                        )}
                        {u.role === 'artist' && (
                          <button
                            onClick={async () => {
                              try {
                                const res = await fetch(`/api/users/${u._id}`, {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  credentials: 'include',
                                  body: JSON.stringify({ role: 'user' })
                                });
                                if (res.ok) {
                                  fetchUsers();
                                  alert(`${u.name} demoted to user`);
                                } else {
                                  const data = await res.json();
                                  alert(data.error || 'Failed to demote user');
                                }
                              } catch (e) {
                                alert('Network error');
                              }
                            }}
                            style={{
                              flex: 1,
                              backgroundColor: 'rgba(108,117,125,0.8)',
                              color: 'white',
                              border: 'none',
                              padding: '8px',
                              borderRadius: '5px',
                              cursor: 'pointer',
                              fontSize: '0.9rem'
                            }}
                          >
                            Remove Artist
                          </button>
                        )}
                        {u.role === 'admin' && (
                          <span style={{ 
                            flex: 1, 
                            textAlign: 'center', 
                            color: 'rgba(203, 189, 147, 0.6)', 
                            fontSize: '0.85rem',
                            padding: '8px'
                          }}>
                            Administrator
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              :
                <div className="col-12">
                  <p style={{ color: '#cbbd93', textAlign: 'center', padding: '20px' }}>
                    No users found.
                  </p>
                </div>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
