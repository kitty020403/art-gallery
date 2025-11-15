'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MyAccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('my');

  const userProfile = {
    name: 'Daniel Kordan',
    role: 'Art Collector & Influencer',
    email: 'daniel.kordan@artview.net',
    avatar: '/images/profile.jpg',
    coverImage: '/images/123.jpg',
    stats: {
      favorites: 156,
      shared: 42,
      artworks: 28,
      followers: '1.2k'
    },
    bio: "Hi! My name is Daniel. I'm a creative geek from Prague. I enjoy discovering and collecting contemporary art. Passionate about supporting emerging artists and exploring new artistic movements."
  };

  const artworks = [
    { id: 1, image: '/images/6.png', title: 'Blue Doors' },
    { id: 2, image: '/images/7.jpg', title: 'Mediterranean' },
    { id: 3, image: '/images/111.jpg', title: 'Street Scene' },
    { id: 4, image: '/images/123.jpg', title: 'Architecture' },
    { id: 5, image: '/images/122.jpg', title: 'Courtyard' },
    { id: 6, image: '/images/8.jpg', title: 'Ancient City' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#001026',
      color: '#ffffff',
      fontFamily: "'Lato', sans-serif",
      position: 'relative'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600&display=swap');
        
        .nav-link {
          color: #cbbd93;
          text-decoration: none;
          font-size: 18px;
          font-weight: 400;
          transition: opacity 0.3s ease;
          opacity: 0.9;
        }
        
        .nav-link:hover {
          opacity: 1;
        }
        
        .tab-button {
          background: transparent;
          border: none;
          color: rgba(203, 189, 147, 0.6);
          padding: 12px 24px;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s ease;
          border-bottom: 2px solid transparent;
        }
        
        .tab-button.active {
          color: #cbbd93;
          border-bottom: 2px solid #cbbd93;
        }
        
        .artwork-card {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        
        .artwork-card:hover {
          transform: translateY(-5px);
        }
      `}</style>

      {/* Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: "url('/images/1 (2).png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.05,
        zIndex: 0
      }} />

      {/* Header Navigation */}
       {/* Header */}
      <nav className="d-flex align-items-center justify-content-between px-5" style={{
        background: '#0A192B',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(203, 189, 147, 0.15)',
        height: '140px',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div className="d-flex align-items-center">
          <img 
            src="/images/logo.png" 
            alt="Galerium" 
            onClick={() => router.push('/')}
            style={{
              height: '2500px',
              width: '350px',
              objectFit: 'contain',
              filter: 'brightness(0) saturate(100%) invert(83%) sepia(12%) saturate(488%) hue-rotate(358deg) brightness(90%) contrast(90%)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </div>
        {/* Nav Links + Search */}
<div className="d-flex align-items-center gap-4">
  {/* Home */}
  <a 
    style={{
      position: 'absolute',
      bottom: '70px',
      right: '1200px',
      transform: 'translateY(-80%)',
      fontSize: '20px',
      fontWeight: '350',
      color: '#BEA173',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}
    href="#home"
    className="nav-link"
  >
    <i className="fas fa-home" style={{ fontSize: '20px' }}></i>
    Home
  </a>

  {/* Artworks */}
  <a 
    style={{
      position: 'absolute',
      bottom: '70px',
      right: '1050px',
      transform: 'translateY(-80%)',
      fontSize: '20px',
      fontWeight: '350',
      color: '#BEA173',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}
    href="artworks"
    className="nav-link"
  >
    <i className="fas fa-palette" style={{ fontSize: '20px' }}></i>
    Artworks
  </a>

  {/* Artists */}
  <a 
    style={{
      position: 'absolute',
      bottom: '70px',
      right: '925px',
      transform: 'translateY(-80%)',
      fontSize: '20px',
      fontWeight: '350',
      color: '#BEA173',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}
    href="artists"
    className="nav-link"
  >
    <i className="fas fa-user" style={{ fontSize: '20px' }}></i>
    Artists
  </a>

  {/* About */}
  <a 
    style={{
      position: 'absolute',
      bottom: '70px',
      right: '820px',
      transform: 'translateY(-80%)',
      fontSize: '20px',
      fontWeight: '350',
      color: '#BEA173',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}
    href="aboutus"
    className="nav-link"
  >
    <i className="fas fa-info-circle" style={{ fontSize: '20px' }}></i>
    About
  </a>


    {/* Search Bar */}
    <div style={{ position: 'absolute', top: '110px' , right:'850px' ,transform: 'translateY(-80%)'}}>
      <input 
        type="text" 
        placeholder="          Search for a specific painting" 
        style={{
          padding: '8px 32px 8px 12px',
          borderRadius: '60px',
          fontSize:'22px',
          border: '1.5px solid #BEA173',
          outline: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          color: '#fff',
          width: '400px'
        }}
      />
      <i className="fas fa-search" style={{
        fontSize: '25px',
        position: 'absolute',
        right: '360px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#BEA173'
      }}></i>
    </div>
  </div>

        <div className="d-flex align-items-center gap-4">
          {userProfile && ['artist','admin'].includes(userProfile.role) && (
  <a onClick={() => router.push('/submit')} className="nav-link" style={{ cursor: 'pointer' }}>Submit Artwork</a>
)}


        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-hover-effect"
            onClick={() => router.push('/myaccount')}
            style={{
              borderRadius: '12px',
              padding: '8px 18px',
              border: '1.5px solid #BEA173',
              backgroundColor: '#BEA173',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontWeight: '400',
              color: '#001026',
              fontSize: '18px',
              letterSpacing: '0.5px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#cbbd93';
              e.currentTarget.style.color = '#001026';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#BEA173';
            }}
          >
            <span
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent'
              }}
            >
              <i className="fas fa-user" style={{ color: '#001026', fontSize: '16px' }}></i>
            </span>
            <span style={{ display: 'inline-block' }}>My Account</span>
            
          </button>
          <button
            className="btn btn-hover-effect"
            onClick={() => router.push('/signup')}
            style={{
              borderRadius: '12px',
              padding: '8px 18px',
              border: '1.5px solid #BEA173',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontWeight: '300',
              color: '#BEA173',
              fontSize: '18px',
              letterSpacing: '0.5px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#cbbd93';
              e.currentTarget.style.color = '#001026';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#BEA173';
            }}
          >
            <span
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent'
              }}
            >
              <i className="fas fa-user-plus" style={{ color: '#BEA173', fontSize: '16px' }}></i>
            </span>
            <span style={{ display: 'inline-block' }}>Sign Up</span>
            
          </button>
          <button
            className="btn btn-hover-effect"
            onClick={() => router.push('/login')}
            style={{
              borderRadius: '12px',
              padding: '8px 18px',
              border: '1.5px solid #BEA173',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontWeight: '300',
              color: '#BEA173',
              fontSize: '18px',
              letterSpacing: '0.5px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#cbbd93';
              e.currentTarget.style.color = '#001026';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#BEA173';
            }}
          >
            <span
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent'
              }}
            >
              <i className="fas fa-sign-in-alt" style={{ color: '#BEA173', fontSize: '16px' }}></i>
            </span>
            <span style={{ display: 'inline-block' }}>login</span>
            
          </button>
          
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ 
        position: 'relative', 
        zIndex: 1,
        maxWidth: '1200px',
        margin: '40px auto',
        padding: '0 40px'
      }}>
        {/* Page Title */}
        <div className="text-center mb-5" style={{ position: 'relative', zIndex: '1' }}></div>
         <h1 className="display-4 mb-3" style={{ 
              color: '#cbbd93',
              fontFamily: "'Playfair Display', serif",
              fontWeight: '400',
              letterSpacing: '1px',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)'
            }}>
              My Account
            </h1>
        

        {/* Profile Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: '1px solid rgba(203, 189, 147, 0.2)',
          overflow: 'hidden',
          marginBottom: '40px'
        }}>
          {/* Cover Image */}
          <div style={{
            height: '200px',
            background: `url('${userProfile.coverImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}>
            {/* Avatar */}
            <div style={{
              position: 'absolute',
              bottom: '-60px',
              left: '40px',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              border: '5px solid #0A192B',
              background: `url('${userProfile.avatar}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />
          </div>

          {/* Profile Info */}
          <div style={{ padding: '70px 40px 30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: '600', color: '#cbbd93', margin: 0 }}>
                  {userProfile.name}
                </h2>
                <p style={{ color: 'rgba(203, 189, 147, 0.8)', fontSize: '1.1rem', margin: '5px 0' }}>
                  {userProfile.role}
                </p>
                <p style={{ color: 'rgba(203, 189, 147, 0.6)', fontSize: '0.95rem' }}>
                  {userProfile.email}
                </p>
              </div>
              
              <button style={{
                padding: '12px 28px',
                borderRadius: '8px',
                border: 'none',
                background: '#BEA173',
                color: '#001026',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '16px'
              }}>
                Edit Profile
              </button>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px',
              marginTop: '30px',
              paddingTop: '30px',
              borderTop: '1px solid rgba(203, 189, 147, 0.2)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '600', color: '#BEA173' }}>
                  {userProfile.stats.favorites}
                </div>
                <div style={{ color: 'rgba(203, 189, 147, 0.7)', fontSize: '0.9rem', marginTop: '5px' }}>
                  Favorites
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '600', color: '#BEA173' }}>
                  {userProfile.stats.shared}
                </div>
                <div style={{ color: 'rgba(203, 189, 147, 0.7)', fontSize: '0.9rem', marginTop: '5px' }}>
                  Shared
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '600', color: '#BEA173' }}>
                  {userProfile.stats.artworks}
                </div>
                <div style={{ color: 'rgba(203, 189, 147, 0.7)', fontSize: '0.9rem', marginTop: '5px' }}>
                  Artworks Following
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '600', color: '#BEA173' }}>
                  {userProfile.stats.followers}
                </div>
                <div style={{ color: 'rgba(203, 189, 147, 0.7)', fontSize: '0.9rem', marginTop: '5px' }}>
                  Profile Views
                </div>
              </div>
            </div>

            {/* Bio */}
            <p style={{
              marginTop: '30px',
              color: 'rgba(203, 189, 147, 0.8)',
              lineHeight: '1.6',
              fontSize: '1rem'
            }}>
              {userProfile.bio}
            </p>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            borderTop: '1px solid rgba(203, 189, 147, 0.2)',
            padding: '0 40px'
          }}>
            <button 
              className={`tab-button ${activeTab === 'my' ? 'active' : ''}`}
              onClick={() => setActiveTab('my')}
            >
              My Collection
            </button>
            <button 
              className={`tab-button ${activeTab === 'shared' ? 'active' : ''}`}
              onClick={() => setActiveTab('shared')}
            >
              Shared
            </button>
            <button 
              className={`tab-button ${activeTab === 'artists' ? 'active' : ''}`}
              onClick={() => setActiveTab('artists')}
            >
              Artists
            </button>
            <button 
              className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              Activity
            </button>
          </div>

          {/* Artworks Grid */}
          <div style={{
            padding: '30px 40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px'
          }}>
            {artworks.map(artwork => (
              <div key={artwork.id} className="artwork-card">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: '12px'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: '#0A192B',
        borderTop: '1px solid rgba(203,189,147,0.08)',
        padding: '30px 60px',
        marginTop: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ color: 'rgba(203, 189, 147, 0.6)' }}>
          © 2025 galerium. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '30px' }}>
          <a href="#" style={{ color: '#cbbd93', textDecoration: 'none' }}>Explore More</a>
          <a href="#" style={{ color: '#cbbd93', textDecoration: 'none' }}>View Details</a>
          <a href="#" style={{ color: '#cbbd93', textDecoration: 'none' }}>Learn More</a>
        </div>
        <div style={{ display: 'flex', gap: '15px', color: 'rgba(203, 189, 147, 0.6)' }}>
          <a href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
          <span>|</span>
          <a href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Use</a>
        </div>
      </footer>
    </div>
  );
}