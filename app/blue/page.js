'use client';

import { useRouter } from 'next/navigation';
import { Heart, Bookmark, Share2, Eye } from 'lucide-react';
export default function HomePage() {
  const router = useRouter();

  return (
    <div style={styles.page}>
      {/* ===== HEADER ===== */}
      <nav className="d-flex align-items-center justify-content-between px-5" style={{
        zoom: '75%',
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
            onClick={() => router.push('/home')}
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
    href="#"
    onClick={(e) => { e.preventDefault(); router.push('/home'); }}
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
    href="#"
    onClick={(e) => { e.preventDefault(); requireAuthAndGo('/catalog'); }}
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
    href="#"
    onClick={(e) => { e.preventDefault(); requireAuthAndGo('/artists'); }}
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

      {/* ===== MAIN CONTENT ===== */}
      <main style={styles.main}>
        <h1 style={styles.title}>Blue</h1>

        <section style={styles.artSection}>
          {/* Artwork Image */}
          <div style={styles.imageWrapper}>
            <img
              src="/images/6.jpg"
              alt="Blue"
              style={styles.artImage}
            />
            <p style={styles.quote}>
              "The white of the walls, the blue of the doors, the suspended
              flowers and the scent of jasmine in the wind."
            </p>
          </div>

          {/* Artwork Info */}
          <div style={styles.infoPanel}>
            <p style={styles.description}>
              Painted by Ismail Bahri on July 5th, 2000, this oil on canvas
              captures the quiet charm of a Tunisian summer scene. Soft whites
              and deep blues evoke traditional village architecture, while
              delicate flowers seem to sway in an unseen breeze. The faint
              presence of jasmine brings a sense of calm and familiarity to the
              composition.
            </p>

            <p style={styles.dimensions}>
              Oil on canvas — 29 × 36
            </p>

           <div style={styles.actions}>
  <Action icon={Heart} label="Favorite" />
  <Action icon={Bookmark} label="Save" />
  <Action icon={Share2} label="Share" />
  <Action icon={Eye} label="View" />
</div>

            <div style={styles.artistCard}>
              <img
                src="/images/la.png"
                alt="Ismail Bahri"
                style={styles.artistAvatar}
              />
              <div>
                <div style={styles.artistName}>Ismail Bahri</div>
                <div style={styles.artistMeta}>1990 · Djerba, Tunisia</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
          <footer style={{
        zoom: '75%',
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

/* ===== COMPONENTS ===== */

function NavItem({ icon, label }) {
  return (
    <a style={styles.navItem}>
      <i className={`fas ${icon}`} />
      {label}
    </a>
  );
}

function HeaderButton({ label, filled }) {
  return (
    <button
      style={{
        ...styles.headerButton,
        background: filled ? '#BEA173' : 'transparent',
        color: filled ? '#001026' : '#BEA173',
      }}
    >
      {label}
    </button>
  );
}

function Action({ icon: Icon, label }) {
  return (
    <div style={styles.actionBox}>
      <div style={styles.actionIcon}>
        <Icon size={35
        } strokeWidth={1.5} />
      </div>
      <div style={styles.actionLabel}>{label}</div>
    </div>
  );
}

/* ===== STYLES ===== */

const styles = {
  page: {
    minHeight: '100vh',
    background: '#001026',
    color: '#fff',
    fontFamily: 'Lato, sans-serif',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 48px',
    background: '#0A192B',
    borderBottom: '1px solid rgba(203,189,147,0.15)',
  },

  logo: {
    height: 60,
    cursor: 'pointer',
    filter:
      'brightness(0) saturate(100%) invert(83%) sepia(12%) saturate(488%) hue-rotate(358deg)',
  },

  nav: {
    display: 'flex',
    gap: 28,
    color: '#BEA173',
  },

  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
    opacity: 0.85,
  },

  searchContainer: {
    position: 'relative',
  },

  searchInput: {
    padding: '10px 16px 10px 40px',
    borderRadius: 999,
    border: '1.5px solid #BEA173',
    background: 'rgba(255,255,255,0.2)',
    color: '#fff',
    width: 320,
  },

  searchIcon: {
    position: 'absolute',
    left: 14,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#BEA173',
  },

  headerButtons: {
    display: 'flex',
    gap: 12,
  },

  headerButton: {
    borderRadius: 10,
    padding: '8px 16px',
    border: '1.5px solid #BEA173',
    cursor: 'pointer',
  },

  main: {
    padding: '60px 80px',
  },

  title: {
    textAlign: 'center',
    color: '#CBBd93',
    fontSize: '48px',
    marginBottom: 20,
    fontFamily: 'Playfair Display, serif',
  },

  artSection: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 48,
    alignItems: 'center',
  },


  artImage: {
    width: '100%',
    borderRadius: 20,
  },

  quote: {
    marginTop: 19,
    fontStyle: 'italic',
    color: '#fafafaff',
    textAlign: 'center',
  },

  infoPanel: {
    color: '#fff',
  },

  description: {
    lineHeight: 2.3,
    opacity: 0.9,
  },

  dimensions: {
    marginTop: 12,
    color: '#cbbd93',
  },

  actions: {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '25px',
  marginTop: 16,
  marginBottom: 16,
},

actionBox: {
  backgroundColor: '#001026',
  border: '1px solid rgba(190, 173, 115, 0.2)',
  borderRadius: '16px',
  padding: '10px 1px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '120px',
},

actionIcon: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#CC7722',
  marginBottom: '10px',
  width: '100%',
},

actionLabel: {
  color: '#CC7722',
  fontSize: '15px',
  fontWeight: '400',
  textAlign: 'center',
},
  artistCard: {
    display: 'flex',
    gap: 14,
    alignItems: 'center',
    marginTop: 32,
    padding: 14,
    borderRadius: 999,
    background: 'rgba(255,255,255,0.08)',
  },

  artistAvatar: {
    width: 52,
    height: 52,
    borderRadius: '50%',
  },

  artistName: {
    fontWeight: 600,
    color: '#CBBd93',
  },

  artistMeta: {
    fontSize: 14,
    opacity: 0.8,
  },

  footer: {
    marginTop: 80,
    padding: '32px 48px',
    background: '#0A192B',
    borderTop: '1px solid rgba(203,189,147,0.15)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#cbbd93',
  },

  footerLinks: {
    display: 'flex',
    gap: 24,
  },

  footerLegal: {
    display: 'flex',
    gap: 10,
  },
};
