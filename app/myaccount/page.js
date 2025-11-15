'use client';
import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";
import {
  LogIn,
  UserPlus,
  User,
  Heart,
  Eye,
  Grid,
  List,
  Filter,
  SortAsc,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  ArrowRight,
  Star,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  Home,
  Search,
  Palette,
  Users,
  Info
} from "lucide-react";
import { useRouter } from 'next/navigation';

export default function MyAccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('buyer');
  const [accountType, setAccountType] = useState('buyer');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    instagram: '',
    website: '',
    joinDate: ''
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          router.push('/login');
          return;
        }
        const me = await res.json();
        if (!me.success) {
          router.push('/login');
          return;
        }

        setUser(me.data); // { userId, email, role }

        // Fetch profile document for additional fields
        const profileRes = await fetch(`/api/users/${me.data.userId}`);
        if (profileRes.ok) {
          const profile = await profileRes.json();
          if (profile.success && profile.data) {
            const fullName = profile.data.name || '';
            const parts = fullName.trim().split(' ');
            const first = parts.shift() || '';
            const last = parts.join(' ');
            setUserData({
              firstName: first,
              lastName: last,
              email: me.data.email || '',
              phone: profile.data.phone || '',
              bio: profile.data.bio || '',
              location: profile.data.location || '',
              instagram: profile.data.instagram || '',
              website: profile.data.website || '',
              joinDate: profile.data.createdAt ? new Date(profile.data.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''
            });
            setAccountType(profile.data.role || 'user');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [router]);

  const [artworks, setArtworks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [artworksLoading, setArtworksLoading] = useState(false);

  useEffect(() => {
    async function fetchUserContent() {
      if (!user) return;
      
      setArtworksLoading(true);
      try {
        // Fetch user's submitted artworks
        const artworksRes = await fetch('/api/artworks');
        if (artworksRes.ok) {
          const artworksData = await artworksRes.json();
          if (artworksData.success) {
            // Filter artworks submitted by this user
            const userArtworks = artworksData.data.filter(
              artwork => artwork.artistId?._id === user._id || artwork.artistId === user._id
            );
            setArtworks(userArtworks);
          }
        }

        // Fetch user's favorites
        const favoritesRes = await fetch('/api/artworks');
        if (favoritesRes.ok) {
          const allArtworks = await favoritesRes.json();
          if (allArtworks.success) {
            // Fetch interaction states for all artworks to find favorites
            const favoriteArtworks = [];
            for (const artwork of allArtworks.data) {
              const interactionRes = await fetch(`/api/interactions/${artwork._id}`);
              if (interactionRes.ok) {
                const interactionData = await interactionRes.json();
                if (interactionData.success && interactionData.data?.isFavorited) {
                  favoriteArtworks.push({
                    ...artwork,
                    id: artwork._id,
                    title: artwork.title,
                    artist: artwork.artistId?.name || 'Unknown Artist',
                    image: artwork.imageUrl
                  });
                }
              }
            }
            setFavorites(favoriteArtworks);
          }
        }
      } catch (error) {
        console.error('Error fetching user content:', error);
      } finally {
        setArtworksLoading(false);
      }
    }
    
    fetchUserContent();
  }, [user]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  // Save profile information to database
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });
  const handleSaveProfile = async () => {
    if (!user?.userId) return;
    setSaveStatus({ type: '', message: '' });
    try {
      const payload = {
        name: `${userData.firstName} ${userData.lastName}`.trim(),
        phone: userData.phone,
        bio: userData.bio,
        location: userData.location,
        instagram: userData.instagram,
        website: userData.website,
      };
      const res = await fetch(`/api/users/${user.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save profile');
      }
      // Reflect saved values
      const fullName = data.data.name || '';
      const parts = fullName.trim().split(' ');
      const first = parts.shift() || '';
      const last = parts.join(' ');
      setUserData((prev) => ({
        ...prev,
        firstName: first,
        lastName: last,
        phone: data.data.phone || '',
        bio: data.data.bio || '',
        location: data.data.location || '',
        instagram: data.data.instagram || '',
        website: data.data.website || '',
      }));
      setIsEditing(false);
      setSaveStatus({ type: 'success', message: 'Profile updated successfully.' });
    } catch (e) {
      console.error(e);
      setSaveStatus({ type: 'error', message: e.message || 'Unable to save profile.' });
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#001026',
      color: '#ffffff',
      fontFamily: "'Lato', sans-serif",
      fontWeight: '300'
    }}>
      <style>{`
        /* Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Lato:wght@300;400;500&display=swap');

        :root {
          --brand-head: 'Playfair Display', serif;
          --brand-body: 'Lato', sans-serif;
        }

        body, .root {
          font-family: var(--brand-body);
          letter-spacing: 0.2px;
        }

        h1,h2,h3,h4 {
          font-family: var(--brand-head);
          letter-spacing: 0.3px;
        }

        .nav-link-account {
          color: #CBBD93;
          text-decoration: none;
          font-size: 14px;
          font-weight: 300;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          opacity: 0.9;
          padding: 8px 12px;
          border-radius: 4px;
        }
        
        .nav-link-account:hover {
          opacity: 1;
          background: rgba(203, 189, 147, 0.05);
        }

        .tab-button-account {
          background: transparent;
          border: none;
          color: rgba(203, 189, 147, 0.55);
          padding: 12px 22px;
          cursor: pointer;
          transition: all 0.25s ease;
          border-bottom: 3px solid transparent;
          font-weight: 300;
          letter-spacing: 0.8px;
          font-size: 14px;
        }

        .tab-button-account.active {
          color: #BEA173;
          border-bottom-color: #BEA173;
        }

        .tab-button-account:hover {
          color: #CBBD93;
          background: rgba(203, 189, 147, 0.03);
        }

        .input-field-account {
          background: rgba(10, 25, 47, 0.4);
          border: 1px solid rgba(203, 189, 147, 0.15);
          border-radius: 6px;
          padding: 12px 16px;
          color: #CBBD93;
          width: 100%;
          font-family: var(--brand-body);
          font-weight: 300;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .input-field-account:focus {
          outline: none;
          border-color: #BEA173;
          background: rgba(10, 25, 47, 0.6);
        }

        .card-artwork {
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .card-artwork:hover {
          transform: translateY(-8px);
        }

        .stats-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(10, 25, 47, 0.6);
          border: 1px solid rgba(203, 189, 147, 0.15);
          border-radius: 20px;
          font-size: 13px;
          color: rgba(203, 189, 147, 0.8);
        }

        .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
      `}</style>

      {/* Header */}
      <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: "url('/images/1 (2).png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.05,
      zIndex: 0,
    }}
  ></div>
      <nav style={{
        background: 'rgba(10, 25, 47, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(190, 161, 115, 0.1)',
        padding: '12px 40px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <img 
              src="/images/logo.png" 
              alt="Galerium" 
              onClick={() => router.push('/landingpage')}
              style={{
                height: '48px',
                width: '120px',
                objectFit: 'contain',
                filter: 'brightness(0) saturate(100%) invert(83%) sepia(12%) saturate(488%) hue-rotate(358deg) brightness(90%) contrast(90%)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
          </div>

          <div style={{ display: 'flex', gap: '24px' }} className="hidden md:flex">
            <a 
              href="/landingpage" 
              className="nav-link-account"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Home className="h-4 w-4 opacity-80" strokeWidth={1.5} />
              Home
            </a>
            <a href="/artworks" className="nav-link-account">
              Artworks
            </a>
            <a href="/artists" className="nav-link-account">
              Artists
            </a>
            <a href="/about" className="nav-link-account">
              About
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Button 
            variant="ghost" 
            className="text-[#CBBD93] hover:bg-[#BEAD73]/10 transition-colors duration-200" 
            onClick={handleLogout}
          >
            <LogIn className="mr-1.5 h-4 w-4 opacity-80" strokeWidth={1.5} />
            Sign Out
          </Button>
        </div>
      </nav>
      
      {/* Account Type Indicator */}
      <div style={{
        background: 'rgba(190, 161, 115, 0.08)',
        borderBottom: '1px solid rgba(190, 161, 115, 0.1)',
        padding: '8px 40px',
        textAlign: 'right',
        color: '#CBBD93',
        fontSize: '14px',
        fontFamily: "'Lato', sans-serif"
      }}>
        Account Type: <span style={{ color: '#BEA173', fontWeight: 500 }}>{accountType.charAt(0).toUpperCase() + accountType.slice(1)}</span>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px 32px' }}>
        {saveStatus.message && (
          <div style={{
            marginBottom: '16px',
            padding: '10px 14px',
            borderRadius: 8,
            border: `1px solid ${saveStatus.type === 'success' ? 'rgba(125, 200, 125, 0.4)' : 'rgba(255, 120, 120, 0.4)'}`,
            background: saveStatus.type === 'success' ? 'rgba(40, 180, 110, 0.15)' : 'rgba(255, 80, 80, 0.12)',
            color: saveStatus.type === 'success' ? '#b4f6d2' : '#ffd2d2'
          }}>
            {saveStatus.message}
          </div>
        )}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#CBBD93' }}>
            <div style={{ fontSize: '18px', opacity: 0.7 }}>Loading your account...</div>
          </div>
        ) : (
          <>
        {/* Profile Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(10, 25, 47, 0.35) 0%, rgba(10, 25, 47, 0.18) 100%)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(190, 161, 115, 0.12)',
          borderRadius: '18px',
          padding: '42px',
          marginBottom: '36px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: -20,
            right: -80,
            width: '360px',
            height: '360px',
            background: 'radial-gradient(circle, rgba(190, 161, 115, 0.06) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', position: 'relative', zIndex: 1 }}>
            <div style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #BEA173 0%, #CBBD93 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.6rem',
              fontFamily: "var(--brand-head)",
              color: '#001026',
              border: '4px solid rgba(190, 161, 115, 0.18)',
              boxShadow: '0 10px 36px rgba(190, 161, 115, 0.14)'
            }}>
              {userData.firstName && userData.lastName ? `${userData.firstName[0]}${userData.lastName[0]}` : 'U'}
            </div>
            
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontFamily: "var(--brand-head)",
                fontSize: '2.2rem',
                color: '#BEA173',
                marginBottom: '8px',
                fontWeight: '400',
                letterSpacing: '0.6px'
              }}>
                {userData.firstName} {userData.lastName}
              </h1>
              <p style={{ 
                color: 'rgba(203, 189, 147, 0.72)', 
                marginBottom: '18px',
                fontSize: '14px',
                letterSpacing: '0.4px'
              }}>
                Member since {userData.joinDate} • {userData.location}
              </p>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <Button
                  onClick={() => {
                    setAccountType('buyer');
                    setActiveTab('buyer');
                  }}
                  className=""
                  style={{
                    background: accountType === 'buyer' ? 'rgba(190, 161, 115, 0.18)' : 'transparent',
                    border: `1px solid ${accountType === 'buyer' ? '#BEA173' : 'rgba(190, 161, 115, 0.14)'}`,
                    color: accountType === 'buyer' ? '#BEA173' : 'rgba(203, 189, 147, 0.75)',
                    padding: '8px 20px',
                    borderRadius: '22px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '300'
                  }}
                >
                  👤 Buyer
                </Button>

                <Button
                  onClick={() => {
                    setAccountType('artist');
                    setActiveTab('artist');
                  }}
                  className=""
                  style={{
                    background: accountType === 'artist' ? 'rgba(190, 161, 115, 0.18)' : 'transparent',
                    border: `1px solid ${accountType === 'artist' ? '#BEA173' : 'rgba(190, 161, 115, 0.14)'}`,
                    color: accountType === 'artist' ? '#BEA173' : 'rgba(203, 189, 147, 0.75)',
                    padding: '8px 20px',
                    borderRadius: '22px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '300'
                  }}
                >
                  🎨 Artist
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div style={{
          borderBottom: '1px solid rgba(190, 161, 115, 0.08)',
          marginBottom: '34px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          {accountType === 'buyer' ? (
            <>
              <button 
                className={`tab-button-account ${activeTab === 'buyer' ? 'active' : ''}`}
                onClick={() => setActiveTab('buyer')}
              >
                PROFILE
              </button>
              <button 
                className={`tab-button-account ${activeTab === 'favorites' ? 'active' : ''}`}
                onClick={() => setActiveTab('favorites')}
              >
                MY FAVORITES
              </button>
              <button 
                className={`tab-button-account ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                SETTINGS
              </button>
            </>
          ) : (
            <>
              <button 
                className={`tab-button-account ${activeTab === 'artist' ? 'active' : ''}`}
                onClick={() => setActiveTab('artist')}
              >
                ARTIST PROFILE
              </button>
              <button 
                className={`tab-button-account ${activeTab === 'artworks' ? 'active' : ''}`}
                onClick={() => setActiveTab('artworks')}
              >
                MY ARTWORKS
              </button>
              <button 
                className={`tab-button-account ${activeTab === 'statistics' ? 'active' : ''}`}
                onClick={() => setActiveTab('statistics')}
              >
                STATISTICS
              </button>
              <button 
                className={`tab-button-account ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                SETTINGS
              </button>
            </>
          )}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'buyer' && (
            <div style={{
              background: 'rgba(10, 25, 47, 0.28)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(190, 161, 115, 0.12)',
              borderRadius: '12px',
              padding: '34px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <h2 style={{
                  fontFamily: "var(--brand-head)",
                  fontSize: '1.6rem',
                  color: '#BEA173',
                  margin: 0,
                  fontWeight: '400'
                }}>
                  Personal Information
                </h2>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} className="bg-transparent" style={{ border: '1px solid #BEA173', color:'#BEA173' }}>
                    Edit Profile
                  </Button>
                ) : (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button className="bg-[#BEA173] text-[#001026]" onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#CBBD93', fontSize: '13px' }}>FIRST NAME</label>
                  <input 
                    type="text"
                    className="input-field-account"
                    value={userData.firstName}
                    disabled={!isEditing}
                    onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#CBBD93', fontSize: '13px' }}>LAST NAME</label>
                  <input 
                    type="text"
                    className="input-field-account"
                    value={userData.lastName}
                    disabled={!isEditing}
                    onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#CBBD93', fontSize: '13px' }}>EMAIL</label>
                  <input 
                    type="email"
                    className="input-field-account"
                    value={userData.email}
                    disabled={!isEditing}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#CBBD93', fontSize: '13px' }}>PHONE</label>
                  <input 
                    type="tel"
                    className="input-field-account"
                    value={userData.phone}
                    disabled={!isEditing}
                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#CBBD93', fontSize: '13px' }}>LOCATION</label>
                  <input 
                    type="text"
                    className="input-field-account"
                    value={userData.location}
                    disabled={!isEditing}
                    onChange={(e) => setUserData({...userData, location: e.target.value})}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#CBBD93', fontSize: '13px' }}>BIO</label>
                  <textarea 
                    className="input-field-account"
                    value={userData.bio}
                    disabled={!isEditing}
                    onChange={(e) => setUserData({...userData, bio: e.target.value})}
                    rows={4}
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div>
              <h2 style={{
                fontFamily: "var(--brand-head)",
                fontSize: '1.6rem',
                color: '#BEA173',
                marginBottom: '22px',
                fontWeight: '400'
              }}>
                My Favorite Artworks
              </h2>
              {artworksLoading ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'rgba(203, 189, 147, 0.6)' }}>
                  Loading favorites...
                </div>
              ) : favorites.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '80px 20px',
                  background: 'rgba(10, 25, 47, 0.28)',
                  border: '1px solid rgba(190, 161, 115, 0.12)',
                  borderRadius: '12px'
                }}>
                  <Heart className="h-12 w-12 mx-auto mb-4 opacity-30" strokeWidth={1.5} style={{ color: '#CBBD93' }} />
                  <p style={{ color: 'rgba(203, 189, 147, 0.6)', fontSize: '16px' }}>
                    You haven't favorited any artworks yet.
                  </p>
                  <Button 
                    className="mt-4 bg-[#BEA173] text-[#001026]"
                    onClick={() => router.push('/catalog')}
                  >
                    Explore Artworks
                  </Button>
                </div>
              ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                {favorites.map((artwork) => (
                  <div key={artwork._id || artwork.id} className="card-artwork" style={{
                    background: 'rgba(10, 25, 47, 0.28)',
                    border: '1px solid rgba(190, 161, 115, 0.12)',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                      <img 
                        src={artwork.imageUrl || artwork.image || '/images/placeholder.jpg'}
                        alt={artwork.title}
                        style={{
                          width: '100%',
                          height: '240px',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    </div>
                    <div style={{ padding: '18px' }}>
                      <h3 style={{
                        fontFamily: "var(--brand-head)",
                        fontSize: '1.15rem',
                        color: '#BEA173',
                        marginBottom: '6px',
                        fontWeight: '400'
                      }}>
                        {artwork.title}
                      </h3>
                      <p style={{ color: 'rgba(203, 189, 147, 0.7)', margin: 0, fontSize: '13px' }}>
                        by {artwork.artist || artwork.artistId?.name || 'Unknown Artist'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </div>
          )}

          {activeTab === 'artist' && (
            <div style={{
              background: 'rgba(10, 25, 47, 0.28)',
              border: '1px solid rgba(190, 161, 115, 0.12)',
              borderRadius: '12px',
              padding: '34px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                <h2 style={{
                  fontFamily: "var(--brand-head)",
                  fontSize: '1.6rem',
                  color: '#BEA173',
                  margin: 0,
                  fontWeight: '400'
                }}>
                  Artist Profile
                </h2>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} className="bg-transparent" style={{ border: '1px solid #BEA173', color:'#BEA173' }}>
                    Edit Profile
                  </Button>
                ) : (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button className="bg-[#BEA173] text-[#001026]" onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '18px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#CBBD93', fontSize: '13px' }}>ARTIST BIO</label>
                  <textarea 
                    className="input-field-account"
                    value={userData.bio}
                    disabled={!isEditing}
                    onChange={(e) => setUserData({...userData, bio: e.target.value})}
                    rows={5}
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#CBBD93', fontSize: '13px' }}>INSTAGRAM</label>
                  <input 
                    type="text"
                    className="input-field-account"
                    value={userData.instagram}
                    disabled={!isEditing}
                    onChange={(e) => setUserData({...userData, instagram: e.target.value})}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#CBBD93', fontSize: '13px' }}>WEBSITE</label>
                  <input 
                    type="text"
                    className="input-field-account"
                    value={userData.website}
                    disabled={!isEditing}
                    onChange={(e) => setUserData({...userData, website: e.target.value})}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#CBBD93', fontSize: '13px' }}>LOCATION</label>
                  <input 
                    type="text"
                    className="input-field-account"
                    value={userData.location}
                    disabled={!isEditing}
                    onChange={(e) => setUserData({...userData, location: e.target.value})}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#CBBD93', fontSize: '13px' }}>EMAIL</label>
                  <input 
                    type="email"
                    className="input-field-account"
                    value={userData.email}
                    disabled={!isEditing}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'artworks' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                <h2 style={{
                  fontFamily: "var(--brand-head)",
                  fontSize: '1.6rem',
                  color: '#BEA173',
                  margin: 0,
                  fontWeight: '400'
                }}>
                  My Artworks
                </h2>
                <Button 
                  className="bg-[#BEA173] text-[#001026] hover:bg-[#CBBD93] transition-colors duration-200" 
                  onClick={() => router.push('/submit')}
                >
                  <Upload className="mr-2 h-4 w-4 opacity-90" strokeWidth={2} />
                  Upload New Artwork
                </Button>
              </div>
              
              {artworksLoading ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'rgba(203, 189, 147, 0.6)' }}>
                  Loading your artworks...
                </div>
              ) : artworks.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '80px 20px',
                  background: 'rgba(10, 25, 47, 0.28)',
                  border: '1px solid rgba(190, 161, 115, 0.12)',
                  borderRadius: '12px'
                }}>
                  <p style={{ color: 'rgba(203, 189, 147, 0.6)', fontSize: '16px' }}>
                    You haven't submitted any artworks yet.
                  </p>
                  <Button 
                    className="mt-4 bg-[#BEA173] text-[#001026]"
                    onClick={() => router.push('/submit')}
                  >
                    Submit Your First Artwork
                  </Button>
                </div>
              ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {artworks.map((artwork) => (
                  <div key={artwork._id || artwork.id} className="card-artwork" style={{
                    background: 'rgba(10, 25, 47, 0.28)',
                    border: '1px solid rgba(190, 161, 115, 0.12)',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ position: 'relative' }}>
                      <img 
                        src={artwork.imageUrl || artwork.image || '/images/placeholder.jpg'}
                        alt={artwork.title}
                        style={{
                          width: '100%',
                          height: '240px',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                    <div style={{ padding: '18px' }}>
                      <h3 style={{
                        fontFamily: "var(--brand-head)",
                        fontSize: '1.15rem',
                        color: '#BEA173',
                        marginBottom: '8px',
                        fontWeight: '400'
                      }}>
                        {artwork.title}
                      </h3>
                      <p style={{ color: 'rgba(203, 189, 147, 0.72)', margin: 0, fontSize: '13px', marginBottom: '12px' }}>
                        {artwork.style} • {artwork.year}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <span className="stats-badge">
                            <Eye className="h-3.5 w-3.5 opacity-70" strokeWidth={1.5} />
                            {artwork.views}
                          </span>
                          <span className="stats-badge">
                            <Heart className="h-3.5 w-3.5 opacity-70" strokeWidth={1.5} />
                            {artwork.likes}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Button size="sm" variant="ghost" className="text-[#CBBD93] border-transparent hover:bg-[#CBBD93]/5" onClick={() => { /* edit */ }}>
                            <Edit className="mr-1.5 h-3.5 w-3.5 opacity-80" strokeWidth={1.5} />
                            Edit
                          </Button>
                          <Button size="sm" variant="ghost" className="text-[#FF6B6B] hover:bg-[#FF6B6B]/5" onClick={() => { /* delete */ }}>
                            <Trash2 className="mr-1.5 h-3.5 w-3.5 opacity-80" strokeWidth={1.5} />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </div>
          )}

          {activeTab === 'statistics' && (
            <div style={{
              background: 'rgba(10, 25, 47, 0.28)',
              border: '1px solid rgba(190, 161, 115, 0.12)',
              borderRadius: '12px',
              padding: '28px'
            }}>
              <h2 style={{
                fontFamily: "var(--brand-head)",
                fontSize: '1.6rem',
                color: '#BEA173',
                marginBottom: '18px',
                fontWeight: '400'
              }}>
                Statistics Overview
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div style={{ padding: '14px', borderRadius: 10, background: 'rgba(0,16,38,0.35)', border: '1px solid rgba(190,161,115,0.08)' }}>
                  <div style={{ color: '#CBBD93', fontSize: 13, marginBottom: 6 }}>Total Artworks</div>
                  <div style={{ fontSize: 24, color: '#fff' }}>{artworks.length}</div>
                </div>

                <div style={{ padding: '14px', borderRadius: 10, background: 'rgba(0,16,38,0.35)', border: '1px solid rgba(190,161,115,0.08)' }}>
                  <div style={{ color: '#CBBD93', fontSize: 13, marginBottom: 6 }}>Total Views</div>
                  <div style={{ fontSize: 24, color: '#fff' }}>{artworks.reduce((s, a) => s + (a.views || 0), 0)}</div>
                </div>

                <div style={{ padding: '14px', borderRadius: 10, background: 'rgba(0,16,38,0.35)', border: '1px solid rgba(190,161,115,0.08)' }}>
                  <div style={{ color: '#CBBD93', fontSize: 13, marginBottom: 6 }}>Total Likes</div>
                  <div style={{ fontSize: 24, color: '#fff' }}>{artworks.reduce((s, a) => s + (a.likes || 0), 0)}</div>
                </div>

                <div style={{ padding: '14px', borderRadius: 10, background: 'rgba(0,16,38,0.35)', border: '1px solid rgba(190,161,115,0.08)' }}>
                  <div style={{ color: '#CBBD93', fontSize: 13, marginBottom: 6 }}>Favorites</div>
                  <div style={{ fontSize: 24, color: '#fff' }}>{favorites.length}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div style={{
              background: 'rgba(10, 25, 47, 0.28)',
              border: '1px solid rgba(190, 161, 115, 0.12)',
              borderRadius: '12px',
              padding: '28px'
            }}>
              <h2 style={{
                fontFamily: "var(--brand-head)",
                fontSize: '1.6rem',
                color: '#BEA173',
                marginBottom: '14px',
                fontWeight: '400'
              }}>
                Account Settings
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#CBBD93', fontSize: 13 }}>Change Password</label>
                  <input type="password" placeholder="Current password" className="input-field-account" style={{ marginBottom: 10 }} />
                  <input type="password" placeholder="New password" className="input-field-account" style={{ marginBottom: 10 }} />
                  <input type="password" placeholder="Confirm new password" className="input-field-account" />
                  <div style={{ marginTop: 12 }}>
                    <Button className="bg-[#BEA173] text-[#001026]">Update Password</Button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#CBBD93', fontSize: 13 }}>Danger Zone</label>
                  <p style={{ color: 'rgba(255,120,120,0.9)', marginTop: 0 }}>Delete your account permanently. This action cannot be undone.</p>
                  <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
                    <Button variant="ghost" className="text-[#CBBD93] border-[#BEA173]/20">Cancel</Button>
                    <Button className="bg-[#FF5C5C] text-white">Delete Account</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        </>
        )}
      </div>
    </div>
  );
}