'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const artworks = [
    {
      id: 6,
      title: "The Starry Night",
      artist: "Vincent van Gogh",
      year: "1889",
      image: "/images/6.jpg",
      description: "I look at the stars and with all my being feel that I am a part of these stars."
    },
    {
      id: 7,
      title: "Water Lilies",
      artist: "Claude Monet",
      year: "1919",
      image: "/images/7.jpg",
      description: "Every day I discover more and more beautiful things."
    },
    {
      id: 8,
      title: "The Persistence of Memory",
      artist: "Salvador Dalí",
      year: "1931",
      image: "/images/8.jpg",
      description: "Intelligence without ambition is a bird without wings."
    },
    {
      id: 9,
      title: "The Persistence of Memory",
      artist: "Salvador Dalí",
      year: "1931",
      image: "/images/9.jpg",
      description: "Intelligence without ambition is a bird without wings."
    },
    {
      id: 10,
      title: "The Persistence of Memory",
      artist: "Salvador Dalí",
      year: "1931",
      image: "/images/10.jpg",
      description: "Intelligence without ambition is a bird without wings."
    },
  ];

  const handleTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => setTouchEndX(e.touches[0].clientX);

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minDistance = 50;
    if (distance > minDistance) {
      setCurrentSlide(current => (current < artworks.length - 1 ? current + 1 : 0));
    } else if (distance < -minDistance) {
      setCurrentSlide(current => (current > 0 ? current - 1 : artworks.length - 1));
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

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
          fontSize: 14px;
          font-weight: 300;
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

      {/* Header */}
      <nav className="d-flex align-items-center justify-content-between px-5" style={{
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(203, 189, 147, 0.15)',
        height: '80px',
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
              height: '1200px',
              width: '150px',
              objectFit: 'contain',
              filter: 'brightness(0) saturate(100%) invert(83%) sepia(12%) saturate(488%) hue-rotate(358deg) brightness(90%) contrast(90%)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </div>

        <div className="d-flex align-items-center gap-4">
          <a href="#gallery" className="nav-link">Gallery</a>
          <a href="#about" className="nav-link">Artists</a>
          <a href="#explore" className="nav-link">Explore</a>
          <a href="#contact" className="nav-link">Connect</a>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button 
            className="btn" 
            onClick={() => router.push('/login')}
            style={{ 
              borderRadius: '4px', 
              padding: '8px 20px',
              border: 'none',
              color: '#cbbd93',
              backgroundColor: 'transparent',
              transition: 'all 0.3s ease',
              fontSize: '14px',
              fontWeight: '300',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(203, 189, 147, 0.1)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Login
          </button>
          <button 
            className="btn btn-hover-effect" 
            onClick={() => router.push('/signup')}
            style={{ 
              borderRadius: '4px', 
              padding: '8px 20px',
              border: 'none',
              fontWeight: '300',
              backgroundColor: '#bea173',
              color: '#001026',
              fontSize: '14px',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#cbbd93'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#bea173'}
          >
            Register
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
              Discover Masterpieces
            </h1>
            <p className="lead" style={{ 
              color: 'rgba(203, 189, 147, 0.9)',
              fontWeight: '300',
              fontSize: '1.1rem',
              marginBottom: '0'
            }}>
              Explore our curated collection of timeless artworks
            </p>
          </div>

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
                        translateX(${offset * 40}%) 
                        translateZ(${isActive ? 0 : -150}px) 
                        rotateY(${offset * 8}deg)
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
                      color: '#cbbd93',
                      textAlign: 'center',
                      borderRadius: '0 0 15px 15px',
                      backdropFilter: 'blur(3px)'
                    }}>
                      <h3 style={{ 
                        color: '#cbbd93', 
                        fontWeight: '400',
                        fontSize: '1.3rem',
                        marginBottom: '8px',
                        fontFamily: "'Playfair Display', serif",
                        letterSpacing: '0.5px'
                      }}>{artwork.title}</h3>
                      <p style={{ 
                        color: '#e0c1a2', 
                        fontSize: '0.95rem',
                        marginBottom: '8px',
                        fontWeight: '300'
                      }}>{artwork.artist}, {artwork.year}</p>
                      <p style={{ 
                        color: 'rgba(203, 189, 147, 0.8)',
                        fontStyle: 'italic',
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                        margin: 0,
                        fontWeight: '300'
                      }}>
                        "{artwork.description}"
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentSlide(current => (current > 0 ? current - 1 : artworks.length - 1))}
              style={{
                position: 'absolute',
                left: 'max(10px, calc(50% - 620px))',
                top: '40%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(203, 189, 147, 0.1)',
                border: '1px solid rgba(203, 189, 147, 0.2)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#cbbd93',
                backdropFilter: 'blur(5px)',
                zIndex: artworks.length + 1,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(203, 189, 147, 0.2)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(203, 189, 147, 0.1)'}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              onClick={() => setCurrentSlide(current => (current < artworks.length - 1 ? current + 1 : 0))}
              style={{
                position: 'absolute',
                right: 'max(10px, calc(50% - 620px))',
                top: '40%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(203, 189, 147, 0.1)',
                border: '1px solid rgba(203, 189, 147, 0.2)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#cbbd93',
                backdropFilter: 'blur(5px)',
                zIndex: artworks.length + 1,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(203, 189, 147, 0.2)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(203, 189, 147, 0.1)'}
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            {/* Slide Indicators */}
            <div className="d-flex justify-content-center gap-2 mt-4">
              {artworks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: currentSlide === index ? '32px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: currentSlide === index ? '#bea173' : 'rgba(203, 189, 147, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0
                  }}
                  onMouseEnter={(e) => {
                    if (currentSlide !== index) {
                      e.target.style.backgroundColor = 'rgba(203, 189, 147, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentSlide !== index) {
                      e.target.style.backgroundColor = 'rgba(203, 189, 147, 0.3)';
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-5">
            <button 
              className="btn btn-lg px-4 btn-hover-effect"
              onClick={() => router.push('/signup')}
              style={{ 
                borderRadius: '8px',
                border: 'none',
                padding: '12px 32px',
                fontWeight: '300',
                backgroundColor: '#bea173',
                color: '#ffffff',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 15px rgba(204, 119, 34, 0.3)',
                fontSize: '1.05rem'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#cbbd93'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#bea173'}
            >
              Start Exploring
            </button>
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
    </div>
  );
}