'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

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
    setTouchEndX(null); // otherwise the swipe is fired even with usual touch
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => setTouchEndX(e.touches[0].clientX);

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minDistance = 50; // required min distance for swipe
    if (distance > minDistance) {
      // swiped left -> next
      setCurrentSlide(current => (current < artworks.length - 1 ? current + 1 : 0));
    } else if (distance < -minDistance) {
      // swiped right -> prev
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
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Header */}
      <nav className="d-flex align-items-center justify-content-between" style={{
        background: 'rgba(203, 189, 147, 0.05)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(203, 189, 147, 0.2)',
        height: '150px'
      }}>
        <div className="d-flex align-items-center ms-4">
          <img 
            src="/images/logo.png" 
            alt="Galerium" 
            style={{
              height: '150px',
              width: '150px',
              objectFit: 'contain',
              filter: 'brightness(0) saturate(100%) invert(83%) sepia(12%) saturate(488%) hue-rotate(358deg) brightness(90%) contrast(90%)'
            }}
          />
        </div>

        <div className="me-4">
          <button 
            className="btn" 
            onClick={() => router.push('/login')}
            style={{ 
              borderRadius: '6px', 
              padding: '6px 12px',
              border: '2px solid #cbbd93',
              color: '#cbbd93',
              backgroundColor: 'transparent',
              transition: 'all 0.3s ease',
              hover: {
                backgroundColor: '#cbbd93',
                color: '#001026'
              }
            }}
          >
            Login
          </button>
          <button 
            className="btn ms-2" 
            onClick={() => router.push('/signup')}
            style={{ 
              borderRadius: '6px', 
              padding: '6px 12px',
              border: 'none',
              fontWeight: '600',
              backgroundColor: '#bea173',
              color: '#ffffff',
              transition: 'all 0.3s ease'
            }}
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
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
          <div className="position-relative" style={{ width: '100%', maxWidth: '1200px' }}>
            {/* Art Cards Stack */}
            <div
              className="d-flex justify-content-center"
              style={{ 
                perspective: '1000px',
                height: '500px',
                marginBottom: '20px'
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
                        fontWeight: '600',
                        fontSize: '1.2rem',
                        marginBottom: '8px'
                      }}>{artwork.title}</h3>
                      <p style={{ 
                        color: '#e0c1a2', 
                        fontSize: '0.95rem',
                        marginBottom: '8px' 
                      }}>{artwork.artist}, {artwork.year}</p>
                      <p style={{ 
                        color: 'rgba(203, 189, 147, 0.8)',
                        fontStyle: 'italic',
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                        margin: 0
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
                left: '20px',
                top: '50%',
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
                zIndex: artworks.length + 1
              }}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              onClick={() => setCurrentSlide(current => (current < artworks.length - 1 ? current + 1 : 0))}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
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
                zIndex: artworks.length + 1
              }}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          {/* Artwork Info - Moved outside the gallery container */}
          <div className="text-center" style={{ marginTop: '20px', position: 'relative', zIndex: '1' }}>
            <h1 className="display-4 mb-3" style={{ color: '#cbbd93' }}>
              Discover Masterpieces
            </h1>
            <p className="lead" style={{ color: 'rgba(203, 189, 147, 0.9)' }}>
              Explore our curated collection of timeless artworks
            </p>
            <button 
              className="btn btn-lg px-4 mt-3"
              onClick={() => router.push('/signup')}
              style={{ 
                borderRadius: '8px',
                border: 'none',
                padding: '12px 24px',
                fontWeight: '600',
                backgroundColor: '#bea173',
                color: '#ffffff',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(204, 119, 34, 0.3)'
              }}
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
