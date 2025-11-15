'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AboutPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.success) setUser(data.data);
        }
      } catch (e) {
        // silently ignore
      }
    }
    checkAuth();
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#001026',
      color: '#ffffff',
      fontFamily: "'Lato', sans-serif",
      fontWeight: '300',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600&display=swap');
        
        .nav-link {
          color: #BEA173;
          text-decoration: none;
          fontSize: 20px;
          font-weight: 350;
          letter-spacing: 0.5px;
          transition: opacity 0.3s ease;
          opacity: 0.8;
        }
        
        .nav-link:hover {
          opacity: 1;
        }
        
        .btn-hover-effect {
          transition: all 0.3s ease;
        }
        
        .btn-hover-effect:hover {
          transform: translateY(-1px);
        }

        .animate-in {
          animation: fadeInUp 0.6s ease forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Background Image */}
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

      {/* Gradient Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(203, 189, 147, 0.15) 0%, rgba(0, 16, 38, 1) 100%)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

{/* Header */}
      <nav className="d-flex align-items-center justify-content-between px-5" style={{
        zoom: '0.75',
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

      {/* Main Content - About Section */}
      <main style={{ 
        position: 'relative', 
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          padding: '3rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(203, 189, 147, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
        }}>
          <h1 className="animate-in" style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            marginBottom: '2rem',
            fontWeight: '300',
            color: '#ffffff',
            fontFamily: "'Playfair Display', serif"
          }}>
            About <span style={{ fontWeight: '600', color: '#BEA173' }}>galerium.</span>
          </h1>
          
          <p className="animate-in" style={{
            lineHeight: '1.8',
            color: '#c0c0c0',
            marginBottom: '1.5rem',
            fontSize: '1.1rem',
            animationDelay: '0.1s'
          }}>
            Welcome to Galerium, an interactive digital gallery dedicated to showcasing the richness and diversity of Tunisian painting. 
            Here, you are invited to explore a cultural space designed not only to display art, but to honor the artistic who shape Tunisia's visual identity.
          </p>

          <p className="animate-in" style={{
            lineHeight: '1.8',
            color: '#c0c0c0',
            marginBottom: '2rem',
            fontSize: '1.1rem',
            animationDelay: '0.2s'
          }}>
            This platform unites art lovers with <span style={{ color: '#BEA173', fontWeight: '500' }}>Tunisian painters</span> — promoting, valorizing, or established creators—by bringing their work with the visibility they deserve.
          </p>

          <ul style={{ 
            listStyle: 'none', 
            margin: '2rem 0',
            padding: 0
          }}>
            <li className="animate-in" style={{
              padding: '0.8rem 0',
              paddingLeft: '2rem',
              position: 'relative',
              color: '#c0c0c0',
              lineHeight: '1.6',
              fontSize: '1.05rem',
              animationDelay: '0.3s'
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                color: '#BEA173',
                fontWeight: 'bold'
              }}>→</span>
              A meaningful alternative to social media, where the fast-paced trend often overshadows artistic quality and work.
            </li>
            <li className="animate-in" style={{
              padding: '0.8rem 0',
              paddingLeft: '2rem',
              position: 'relative',
              color: '#c0c0c0',
              lineHeight: '1.6',
              fontSize: '1.05rem',
              animationDelay: '0.4s'
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                color: '#BEA173',
                fontWeight: 'bold'
              }}>→</span>
              An intuitive, visionary experience that allows visitors to navigate artifacts in a distilled, thematic, and bookmarked manner.
            </li>
            <li className="animate-in" style={{
              padding: '0.8rem 0',
              paddingLeft: '2rem',
              position: 'relative',
              color: '#c0c0c0',
              lineHeight: '1.6',
              fontSize: '1.05rem',
              animationDelay: '0.5s'
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                color: '#BEA173',
                fontWeight: 'bold'
              }}>→</span>
              An online gallery that believes that <span style={{ color: '#BEA173', fontWeight: '500' }}>every painting tells a story</span>—a story of memory, expression, and the master faces of Tunisia.
            </li>
          </ul>

          <p className="animate-in" style={{
            lineHeight: '1.8',
            color: '#c0c0c0',
            marginBottom: '1rem',
            fontSize: '1.1rem',
            animationDelay: '0.6s'
          }}>
            For this reason, the platform is built to:
          </p>

          <ul style={{ 
            listStyle: 'none', 
            margin: '2rem 0',
            padding: 0
          }}>
            <li className="animate-in" style={{
              padding: '0.8rem 0',
              paddingLeft: '2rem',
              position: 'relative',
              color: '#c0c0c0',
              lineHeight: '1.6',
              fontSize: '1.05rem',
              animationDelay: '0.7s'
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                color: '#BEA173',
                fontWeight: 'bold'
              }}>→</span>
              Highlight artworks through an immersive viewing experience.
            </li>
            <li className="animate-in" style={{
              padding: '0.8rem 0',
              paddingLeft: '2rem',
              position: 'relative',
              color: '#c0c0c0',
              lineHeight: '1.6',
              fontSize: '1.05rem',
              animationDelay: '0.8s'
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                color: '#BEA173',
                fontWeight: 'bold'
              }}>→</span>
              Facilitate communication between artists and patrons.
            </li>
            <li className="animate-in" style={{
              padding: '0.8rem 0',
              paddingLeft: '2rem',
              position: 'relative',
              color: '#c0c0c0',
              lineHeight: '1.6',
              fontSize: '1.05rem',
              animationDelay: '0.9s'
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                color: '#BEA173',
                fontWeight: 'bold'
              }}>→</span>
              Promote local artist and cultural heritage.
            </li>
            <li className="animate-in" style={{
              padding: '0.8rem 0',
              paddingLeft: '2rem',
              position: 'relative',
              color: '#c0c0c0',
              lineHeight: '1.6',
              fontSize: '1.05rem',
              animationDelay: '1s'
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                color: '#BEA173',
                fontWeight: 'bold'
              }}>→</span>
              Connect people, art lovers, and collectors.
            </li>
          </ul>

          <p className="animate-in" style={{
            lineHeight: '1.8',
            color: '#c0c0c0',
            marginBottom: '3rem',
            fontSize: '1.1rem',
            animationDelay: '1.1s'
          }}>
            Thank you for being here, for exploring, and for supporting Tunisian art.
            Your presence brings Galerium to life — a space created to elevate, learn, and feel.
          </p>

          <div className="animate-in" style={{ 
            textAlign: 'center',
            animationDelay: '1.2s'
          }}>
            <button
              onClick={() => router.push('/ourteam')}
              style={{
                borderRadius: '8px',
                padding: '12px 32px',
                fontWeight: '400',
                backgroundColor: '#BEA173',
                color: '#ffffff',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 15px rgba(204, 119, 34, 0.3)',
                fontSize: '1.05rem',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#cbbd93';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(204, 119, 34, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#BEA173';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(204, 119, 34, 0.3)';
              }}
            >
              <i className="fas fa-users"></i>
              Contact Us
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
   {/* Footer */}
      <footer style={{
        zoom: '0.75',
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