'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import CoverflowCarousel from "./CoverflowCarousel";

export default function LandingPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
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

  // 🖼️ === DÉCLARATION DES DONNÉES MANQUANTES ===
  const artworks = [
    {
      id: 1,
      title: 'Les Couleurs de Carthage',
      artist: 'Ismail Bahri',
      year: '2020',
      description: 'Une exploration poétique de la lumière et du mouvement.',
      image: '/images/8.jpg',
    },
    {
      id: 2,
      title: 'Reflets du Sud',
      artist: 'Amina Ben Salem',
      year: '2019',
      description: 'Un hommage vibrant à la culture tunisienne contemporaine.',
      image: '/images/6.png',
    },
    {
      id: 3,
      title: 'Horizons Méditerranéens',
      artist: 'Nidhal Chamekh',
      year: '2021',
      description: 'Entre mémoire et modernité, un voyage à travers les identités.',
      image: '/images/7.jpg',
    },
    {
      id: 4,
      title: 'Horizons Méditerranéens',
      artist: 'Nidhal Chamekh',
      year: '2021',
      description: 'Entre mémoire et modernité, un voyage à travers les identités.',
      image: '/images/111.jpg',
    },
    {
      id: 5,
      title: 'Horizons Méditerranéens',
      artist: 'Nidhal Chamekh',
      year: '2021',
      description: 'Entre mémoire et modernité, un voyage à travers les identités.',
      image: '/images/123.jpg',
    },
    {
      id: 6,
      title: 'Horizons Méditerranéens',
      artist: 'Nidhal Chamekh',
      year: '2021',
      description: 'Entre mémoire et modernité, un voyage à travers les identités.',
      image: '/images/122.jpg',
    },
    
  ];
  // =============================================

  function handleTouchStart(e) {
    setTouchStartX(e.touches[0].clientX);
  }

  function handleTouchMove(e) {
    setTouchEndX(e.touches[0].clientX);
  }

  function handleTouchEnd() {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;

    if (distance > 50) {
      setCurrentSlide((prev) => (prev < artworks.length - 1 ? prev + 1 : 0));
    } else if (distance < -50) {
      setCurrentSlide((prev) => (prev > 0 ? prev - 1 : artworks.length - 1));
    }

    setTouchStartX(null);
    setTouchEndX(null);
  }

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
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap');
        
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
        
        .btn-hover-effect {
          transition: all 0.3s ease;
        }
        
        .btn-hover-effect:hover {
          transform: translateY(-1px);
        }
      `}</style>
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
  >
    
  </div>
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
      right: '1300px',
      transform: 'translateY(-80%)',
      fontSize: '20px',           // Taille du texte
      fontWeight: '300',
      color: '#E9D8B4',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}
    href="#home"
    className="nav-link"
  >
    <i className="fas fa-home" style={{ fontSize: '22px' }}></i> {/* Icon plus grande */}
    Home
  </a>

  {/* Artworks */}
  <a 
    style={{
      position: 'absolute',
      bottom: '70px',
      right: '1150px',
      transform: 'translateY(-80%)',
      fontSize: '20px',
      fontWeight: '300',
      color: '#E9D8B4',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}
    href="#artworks"
    className="nav-link"
  >
    <i className="fas fa-palette" style={{ fontSize: '22px' }}></i>
    Artworks
  </a>

  {/* Artists */}
  <a 
    style={{
      position: 'absolute',
      bottom: '70px',
      right: '1025px',
      transform: 'translateY(-80%)',
      fontSize: '20px',
      fontWeight: '300',
      color: '#E9D8B4',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}
    href="#artists"
    className="nav-link"
  >
    <i className="fas fa-user" style={{ fontSize: '22px' }}></i>
    Artists
  </a>

  {/* About */}
  <a 
    style={{
      position: 'absolute',
      bottom: '70px',
      right: '900px',
      transform: 'translateY(-80%)',
      fontSize: '20px',
      fontWeight: '300',
      color: '#E9D8B4',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}
    href="#about"
    className="nav-link"
  >
    <i className="fas fa-info-circle" style={{ fontSize: '22px' }}></i>
    About
  </a>


    {/* Search Bar */}
    <div style={{ position: 'absolute', top: '110px' , right:'950px' ,transform: 'translateY(-80%)'}}>
      <input 
        type="text" 
        placeholder="Search for a painting..." 
        style={{
          padding: '8px 32px 8px 12px',
          borderRadius: '60px',
          border: '1.5px solid #BEA173',
          outline: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          color: '#fff',
          width: '400px'
        }}
      />
      <i className="fas fa-search" style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#fffeffff'
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
            {/* Icon container (framed) */}
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
              <i className="fas fa-user-plus" style={{ color: '#001026', fontSize: '16px' }}></i>
            </span>

            {/* Label */}
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
            {/* Icon container (framed) */}
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

            {/* Label */}
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
            {/* Icon container (framed) */}
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

            {/* Label */}
            <span style={{ display: 'inline-block' }}>login</span>
            
          </button>
          
        </div>
      </nav>

      {/* Main Content */}
      <main className="position-relative" style={{ 
        minHeight: '100vh',
        padding: '2rem',
        overflowX: 'hidden',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
         
        {/* Gallery Section */}
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '90vh', paddingTop: '60px' }}>
          {/* Title Section */}
          <div className="text-center mb-5" style={{ position: 'relative', zIndex: '1' }}>
            <h1 className="display-4 mb-3" style={{ 
              color: '#cbbd93',
              fontFamily: "'Playfair Display', serif",
              fontWeight: '400',
              letterSpacing: '1px',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)'
            }}>
              Discover Tunisia's artistic heritage
            </h1>
            
            <div
  className="flex flex-col md:flex-row gap-4 justify-center items-center"
  style={{ position: 'relative', zIndex: 1 }}
>
  <button className="px-6 py-3 bg-[#C6B47E] text-black rounded-lg flex items-center gap-2 font-medium hover:bg-[#b7a56f] transition "
   style={{ 
                borderRadius: '8px',
                border: 'none',
                padding: '12px 32px',
                fontWeight: '400',
                backgroundColor: '#bea173',
                color: '#ffffff',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 15px rgba(204, 119, 34, 0.3)',
                fontSize: '1.05rem'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#cbbd93'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#bea173'}>
    Explore Gallery
    <span>→</span>
  </button>

  <button className="px-6 py-3 border border-[#C6B47E] text-[#C6B47E] rounded-lg font-medium hover:bg-[#C6B47E]/10 transition"
   style={{ 
                borderRadius: '8px',
                border: 'none',
                padding: '12px 32px',
                fontWeight: '400',
                backgroundColor: 'rgba(190, 161, 115, 0.1)',
                color: '#ffffff',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 15px rgba(204, 119, 34, 0.3)',
                fontSize: '1.05rem'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#cbbd93'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#bea173'}>
    Learn More
  </button>
</div>


          </div>
{/* === BARRE FLOTTANTE GAUCHE === */}
<div
  style={{
    position: 'absolute',
    left: '400px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
  }}
>
  {/* Pill container matching image */}
  <div
    role="toolbar"
    aria-label="Artwork actions"
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      alignItems: 'center',
      padding: '30px',
      width: '70px',
      background: 'rgba(254, 255, 255, 0.1)',
      border: '1px solid rgba(190,161,115,0.14)',
      borderRadius: '999px',
      backdropFilter: 'blur(6px)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.35)',
    }}
  >
    {/* Button: like */}
    <button
      aria-label="Add to favorites"
      title="Add to favorites"
      onClick={() => alert('❤️ Ajouté aux favoris !')}
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        color: '#BEA173',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(203,189,147,0.12)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <i className="fas fa-heart" style={{ fontSize: '16px' }}></i>
    </button>

    {/* Button: view */}
    <button
      aria-label="View stats"
      title="View stats"
      onClick={() => alert('👁️ 50 vues sur cette œuvre !')}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        color: '#BEA173',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(203,189,147,0.12)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <i className="fas fa-eye" style={{ fontSize: '16px' }}></i>
    </button>

    {/* Button: share */}
    <button
      aria-label="Share"
      title="Share"
      onClick={() => alert('🔗 Lien copié pour partage !')}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        color: '#BEA173',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(203,189,147,0.12)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <i className="fas fa-share-alt" style={{ fontSize: '15px' }}></i>
    </button>
  </div>
</div>

{/* === TON CAROUSEL COMMENCE ICI === */}

          <div className="position-relative" style={{ width: '100%', maxWidth: '1200px' }}>
            {/* Art Cards Stack */}
            <div
              className="d-flex justify-content-center"
              style={{ 
                perspective: '1000px',
                height: '520px',
                marginBottom: '30px'
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {artworks.map((artwork, index) => {
                const isActive = index === currentSlide;
                const offset = index - currentSlide;
                return (
                  <div
                    key={artwork.id}
                    style={{
                      position: 'absolute',
                      transform: `
                        translateX(${offset * 30}%) 
                        translateZ(${isActive ? 0 : -150}px) 
                        rotateY(${offset * 0.1}deg)
                      `,
                      opacity: isActive ? 1 : 0.5,
                      transition: 'all 0.5s ease-out',
                      zIndex: artworks.length - Math.abs(offset),
                      width: 'min(450px, 80vw)',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '15px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(203, 189, 147, 0.2)',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                      overflow: 'hidden'
                    }}
                  >
                    
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      style={{
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover',
                        borderRadius: '15px 15px 0 0'
                      }}
                    />
                    <div className="p-4" style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      borderTop: '1px solid rgba(203, 189, 147, 0.2)',
                      color: '#9893cbff',
                      textAlign: 'left',
                      borderRadius: '0 0 15px 15px',
                      backdropFilter: 'blur(3px)'
                    }}>
                      <h3 style={{ 
                        color: '#001026', 
                        fontWeight: '400',
                        fontSize: '1.3rem',
                        marginBottom: '8px',
                        fontFamily: "'Playfair Display', serif",
                        letterSpacing: '0.5px'
                      }}>{artwork.title}</h3>
                      <p style={{ 
                        color: '#001026', 
                        fontSize: '0.95rem',
                        marginBottom: '8px',
                        fontWeight: '400'
                      }}>{artwork.artist}, {artwork.year}</p>
                      <p style={{ 
                        color: '#001026',
                        fontStyle: 'italic',
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                        margin: 0,
                        fontWeight: '300'
                      }}>
                        &quot;{artwork.description}&quot;
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            

            
            {/* Profile pill (centered under indicators) */}
            <div style={{ display: 'flex', justifyContent: 'center', zIndex: 50 }}>
              <div
                role="group"
                aria-label="Active artist"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(253, 253, 253, 0.3)',
                  border: '1px solid rgba(203,189,147,0.14)',
                  padding: '12px 10px',
                  borderRadius: '999px',
                  minWidth: '450px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.35)'
                }}
              >
                <button
                  aria-label="Previous"
                  onClick={() => setCurrentSlide((c) => (c > 0 ? c - 1 : artworks.length - 1))}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '(255,255,255,0.4)',
                    border: '1px solid rgba(203,189,147,0.08)',
                    color: '#cbbd93',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(203,189,147,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>

                <img
                  src="/images/ismail.jpg"
                  alt="Artist avatar"
                  style={{ width: '55px', height: '55px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.06)' }}
                />

                <div style={{ color: '#ffffff', textAlign: 'left' }}>
                  <div style={{ color: '#cbbd93', fontSize: '0.98rem', fontWeight: 600 }}>Ismail Bahri</div>
                  <div style={{ color: 'rgba(203,189,147,0.9)', fontSize: '0.9rem', marginTop: '2px' }}>1990 &nbsp; Djerba, Tunisia</div>
                </div>

                <button
                  aria-label="Search artist"
                  title="Search"
                  onClick={() => alert('Search artist')}
                  style={{
                    marginLeft: '6px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    border: '1px solid rgba(203,189,147,0.08)',
                    color: '#cbbd93',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(203,189,147,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <i className="fas fa-search"></i>
                </button>

                <button
                  aria-label="Next"
                  onClick={() => setCurrentSlide((c) => (c < artworks.length - 1 ? c + 1 : 0))}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    border: '1px solid rgba(203,189,147,0.08)',
                    color: '#cbbd93',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(203,189,147,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Gradient Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(203, 189, 147, 0.15) 0%, rgba(0, 16, 38, 1) 100%)',
        pointerEvents: 'none',
        zIndex: -1
      }}></div>




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