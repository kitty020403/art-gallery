'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function OurTeamPage() {
const router = useRouter();

  const [user, setUser] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Nour Gaida',
      image: '/images/nour.png'
    },
    {
      id: 2,
      name: 'Malak Ben jemaa',
      image: '/images/malak.png'
    },
    {
      id: 3,
      name: 'Rihem ben Souissi',
      image: '/images/rihem.png'
    },
    {
      id: 4,
      name: 'Lina Mrad',
      image: '/images/lina.png'
    }
  ];

  return (
    <div style={{ 
      zoom: '0.75',
      minHeight: '100vh', 
      background: '#001026',
      color: '#ffffff',
      fontFamily: "'Lato', sans-serif",
      fontWeight: '300',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Lato:wght@300;400;500&display=swap');
        
        .nav-link {
          color: #cbbd93;
          text-decoration: none;
          fontSize: 60px;
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: opacity 0.3s ease;
          opacity: 0.8;
        }
        
        .nav-link:hover {
          opacity: 1;
        }
        
        .team-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .team-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(190, 161, 115, 0.2);
        }
      `}</style>

      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/images/1 (2).png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.08,
          zIndex: 0,
        }}
      />

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
    href="home"
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
          {user && ['artist','admin'].includes(user.role) && (
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
        padding: '80px 60px',
        minHeight: 'calc(100vh - 140px)'
      }}>
        {/* Title */}
        <div className="text-center mb-5" style={{ marginBottom: '80px' }}>
          <h1 style={{ 
            color: '#cbbd93',
            fontFamily: "'Playfair Display', serif",
            fontWeight: '400',
            letterSpacing: '2px',
            fontSize: '3.5rem',
            marginBottom: '20px'
          }}>
            Our Team
          </h1>
        </div>

        {/* Team Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="team-card"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: '1px solid rgba(203, 189, 147, 0.2)',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '100%',
                height: '350px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{
                padding: '25px',
                textAlign: 'center',
                background: 'rgba(10, 25, 47, 0.6)'
              }}>
                <h3 style={{
                  color: '#CBBD93',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.5rem',
                  fontWeight: '400',
                  margin: 0
                }}>
                  {member.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Links */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '50px',
          marginTop: '100px'
        }}>
        
        </div>
        <div 
          className="text-center mt-5 p-5"
          style={{ 
            background: 'rgba(203,189,147,0.1)', 
            borderRadius: '15px',
            border: '1px solid rgba(203,189,147,0.2)'
          }}
        >
          <h4 style={{ color: '#cbbd93', marginBottom: '1rem' }}>
            Want to Join Our Team?
          </h4>
          <p style={{ color: 'rgba(203,189,147,0.8)', marginBottom: '1.5rem' }}>
            We&apos;re always looking for passionate art professionals to join our gallery
          </p>
          <button 
            className="btn btn-lg"
            onClick={() => router.push('/contact')}
            style={{
              background: '#cbbd93',
              color: '#001026',
              border: 'none',
              padding: '0.8rem 2rem',
              fontWeight: '600'
            }}
          >
            <i className="fas fa-paper-plane me-2"></i>
            Get in Touch
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: '#0A192B',
        borderTop: '1px solid rgba(203,189,147,0.08)',
        color: '#cbbd93',
        padding: '40px 2rem',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1300px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          {/* Left: logo + copyright */}
            <div style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.95)',position: 'absolute', bottom:'10px' , left: '50px'}}>© 2025 galerium. All rights reserved.</div>

          {/* Center: nav links */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a href="#" style={{ color: '#cbbd93', textDecoration: 'none', fontSize: '1.2rem', position: 'absolute', bottom:'40px' ,right:'1200px'  }}>Explore More</a>
            <a href="#" style={{ color: '#cbbd93', textDecoration: 'none', fontSize: '1.2rem',position: 'absolute', bottom:'40px' ,right:'1000px' }}>View Details</a>
            <a href="#" style={{ color: '#cbbd93', textDecoration: 'none', fontSize: '1.2rem',position: 'absolute', bottom:'40px' ,right:'800px' }}>Learn More</a>
          </div>

          {/* Right: legal links */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <a href="/privacy" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none', fontSize: '1.1rem',position: 'absolute', bottom:'10px' , right: '200px' }}>Privacy Policy</a>
            <span style={{ color: 'rgba(203,189,147,0.45)',position: 'absolute', bottom:'10px' , right: '180px' }}>|</span>
            <a href="/terms" style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none', fontSize: '1.1rem',position: 'absolute', bottom:'10px' , right: '70px' }}>Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

