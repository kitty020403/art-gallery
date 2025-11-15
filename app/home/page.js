'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

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

  const artworks = [
    {
      id: 1,
      title: '  Blue',
      artist: 'Ismail Bahri',
      year: '2020',
      description: '"The white of the walls, the blue of the doors, the suspended flowers and the scent of jasmine in the wind."',
      image: '/images/6.png',
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
      <main className="position-relative" style={{ 
        minHeight: '100vh',
        padding: '2rem',
        overflowX: 'hidden',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
         
        {/* Gallery Section */}
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '90vh', paddingTop: '30px' }}>
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

  <button
  style={{
    borderRadius: '8px',
    padding: '12px 32px',
    fontWeight: '400',
    backgroundColor: 'rgba(0,16,38,0.1)',
    color: '#bea173',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 15px rgba(204, 119, 34, 0.3)',
    fontSize: '1.05rem',
    border: '#BEA173 1.5px solid'
  }}
  onMouseEnter={(e) => e.target.style.backgroundColor = '#cbbd93'}
  onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0,16,38,0.1)'}
>
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

          <div className="position-relative" style={{ width: '100%', maxWidth: '1200px' }}>
            {/* Art Cards Stack */}
            <div
              className="d-flex justify-content-center"
              style={{ 
                perspective: '2000px',
                height: '400px',
                marginBottom: '30px',
                position: 'relative'
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {[-2, -1, 0, 1, 2].map((position) => {
                // Calcul de l'index avec boucle circulaire
                const index = (currentSlide + position + artworks.length) % artworks.length;
                const artwork = artworks[index];
                const isActive = position === 0;
                
                // Disposition en anneau (cercle) - 5 cartes visibles en boucle
                const angle = position * 30; // Angle entre chaque carte
                const radius = 320; // Rayon du cercle
                const translateX = Math.sin((angle * Math.PI) / 180) * radius;
                const translateZ = Math.cos((angle * Math.PI) / 180) * radius - radius;
                const rotateY = -angle;
                
                return (
                  <div
                    key={`${artwork.id}-${position}`}
                    style={{
                      position: 'absolute',
                      transform: `
                        translateX(${translateX}px) 
                        translateZ(${translateZ}px)
                        rotateY(${rotateY}deg)
                        scale(${isActive ? 1.1 : 0.8})
                      `,
                      opacity: isActive ? 1 : 0.5,
                      transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      zIndex: isActive ? 100 : 50 - Math.abs(position),
                      width: '400px',
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      borderRadius: '20px',
                      backdropFilter: 'blur(6px)',
                      border: '2px solid rgba(203, 189, 147, 0.3)',
                      boxShadow: isActive 
                        ? '0 30px 60px -15px rgba(0, 0, 0, 0.6)' 
                        : '0 20px 40px -10px rgba(0, 0, 0, 0.4)',
                      overflow: 'hidden',
                      transformStyle: 'preserve-3d',
                      pointerEvents: isActive ? 'auto' : 'none'
                    }}
                  >
                    
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '20px 20px 0 0'
                      }}
                    />
                    <div className="p-4" style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderTop: '2px solid rgba(203, 189, 147, 0.3)',
                      color: '#cbbd93',
                      textAlign: 'left',
                      borderRadius: '0 0 20px 20px',
                      backdropFilter: 'blur(5px)'
                    }}>
                      <h3 style={{ 
                        color: '#001026', 
                        fontWeight: '500',
                        fontSize: '1.25rem',
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
                        fontSize: '0.88rem',
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

            <div style={{ display: 'flex', justifyContent: 'center', zIndex: 50 }}>
              <div
                role="group"
                aria-label="Active artist"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(255, 255, 255, 0.3)',
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
                  style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.06)' }}
                />

               <div style={{ color: '#ffffff', textAlign: 'left' }}>
  <div style={{ color: '#cbbd93', fontSize: '0.98rem', fontWeight: 600 }}>{artworks[currentSlide].artist}</div>
  <div style={{ color: 'rgba(203,189,147,0.9)', fontSize: '0.9rem', marginTop: '2px' }}>{artworks[currentSlide].year} &nbsp; {artworks[currentSlide].title}</div>
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
                    width: '60px',
                    height: '60px',
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