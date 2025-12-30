"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Home, Palette, Users, Info, Star, MapPin, Grid3x3, User, LogIn, UserPlus } from "lucide-react";

export default function ArtistPage() {
  const router = useRouter();
  const [logoHover, setLogoHover] = useState(false);
  
  const artist = {
    name: "Ismail Bahri",
    role: "VISUAL ARTIST",
    image: "/images/iismail.png",
    paragraphs: [
      "Born in 1978 in Tunis, Ismail Bahri studied at the Institut Supérieur des Beaux-Arts de Tunis and Le Fresnoy - Studio National des Arts Contemporains in France.",
      "His work has been featured in numerous international exhibitions, including the Venice Biennale, Sharjah Biennial, and Centre Pompidou. He is known for his minimalist approach and poetic engagement with materials and time.",
      "Bahri's films and installations have received critical acclaim for their ability to transform simple, everyday actions into profound explorations of perception and existence."
    ]
  };

  return (
    <div className="min-h-screen bg-[#041b2d] text-gray-100 font-sans">
      {/* HEADER - Exactly like the image */}
      <nav className="d-flex align-items-center justify-content-between px-5" style={{
        zoom:'75%',
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
      {/* PAGE TITLE - Centered with gold color */}
      <div style={{
        textAlign: 'center',
        padding: '60px 0 80px',
        position: 'relative'
      }}>
        <h1 style={{
          color: '#CBBD93',
          fontFamily: "'Playfair Display', serif",
          fontWeight: '400',
          fontSize: '48px',
          letterSpacing: '3px',
          margin: 0
        }}>
          Artists
        </h1>
      </div>

      {/* MAIN CONTENT - Exact layout from image */}
      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 80px 100px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '400px 1fr',
          gap: '100px',
          alignItems: 'start'
        }}>
          {/* LEFT: Image Card with shadow effect */}
          <div style={{ position: 'relative' }}>
            {/* Shadow layer behind */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '30px',
              width: '100%',
              height: '100%',
              background: '#1A2B44',
              borderRadius: '24px',
              zIndex: 0
            }}></div>
            
            {/* White frame with image */}
            <div style={{
              position: 'relative',
              background: 'white',
              padding: '20px',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              zIndex: 1
            }}>
              <img
                src={artist.image}
                alt={artist.name}
                style={{
                  width: '100%',
                  height: '550px',
                  objectFit: 'cover',
                  borderRadius: '16px'
                }}
              />
            </div>
          </div>

          {/* RIGHT: Content */}
          <div>
            {/* Role label */}
            <div style={{
              fontSize: '11px',
              letterSpacing: '3px',
              color: '#CBBD93',
              fontWeight: '500',
              marginBottom: '20px'
            }}>
              {artist.role}
            </div>

            {/* Name with gold border */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '40px'
            }}>
              <div style={{
                width: '4px',
                height: '60px',
                background: '#CBBD93',
                borderRadius: '2px'
              }}></div>
              <h2 style={{
                fontSize: '52px',
                fontWeight: '300',
                color: 'white',
                margin: 0,
                lineHeight: '1.1'
              }}>
                {artist.name}
              </h2>
            </div>

            {/* Biography paragraphs */}
            <div style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#B8C5D6',
              marginBottom: '60px'
            }}>
              {artist.paragraphs.map((p, i) => (
                <p key={i} style={{ marginBottom: '20px' }}>
                  {p}
                </p>
              ))}
            </div>

            {/* Stats Icons - Exact style from image */}
            <div style={{
              display: 'flex',
              gap: '80px'
            }}>
              <IconStat icon={<Star size={24} />} label="Featured" />
              <IconStat icon={<MapPin size={24} />} label="Location" />
              <IconStat icon={<Grid3x3 size={24} />} label="Style" />
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER - Exact style from image */}
      <footer style={{
        background: '#001933',
        borderTop: '1px solid rgba(203,189,147,0.1)',
        padding: '30px 80px',
        marginTop: '80px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Left: Copyright */}
          <div style={{
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            © 2024 Ismail Bahri. All rights reserved.
          </div>

          {/* Center: Links */}
          <div style={{
            display: 'flex',
            gap: '40px'
          }}>
            <FooterLink text="Explore More" />
            <FooterLink text="View Details" />
            <FooterLink text="Learn More" />
          </div>

          {/* Right: Legal */}
          <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            fontSize: '13px'
          }}>
            <FooterLink text="Privacy Policy" />
            <span style={{ color: 'rgba(203,189,147,0.3)' }}>|</span>
            <FooterLink text="Terms of Use" />
          </div>
        </div>
      </footer>
    </div>
  );
}

// Reusable Components
function NavLink({ icon, label, active, onClick }) {
  return (
    <a
      onClick={(e) => { e.preventDefault(); onClick && onClick(); }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: active ? '#CBBD93' : 'rgba(203, 189, 147, 0.7)',
        fontSize: '14px',
        fontWeight: active ? '500' : '400',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'color 0.3s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.color = '#CBBD93'}
      onMouseLeave={(e) => e.currentTarget.style.color = active ? '#CBBD93' : 'rgba(203, 189, 147, 0.7)'}
    >
      {icon}
      {label}
    </a>
  );
}

function AuthButton({ icon, label, filled, onClick }) {
  const [hover, setHover] = React.useState(false);
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid #BEA173',
        background: filled ? '#BEA173' : (hover ? '#BEA173' : 'transparent'),
        color: (filled || hover) ? '#001026' : '#BEA173',
        fontSize: '13px',
        fontWeight: '400',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function IconStat({ icon, label }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px'
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'rgba(203, 189, 147, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#CBBD93'
      }}>
        {icon}
      </div>
      <span style={{
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: '400'
      }}>
        {label}
      </span>
    </div>
  );
}

function FooterLink({ text }) {
  return (
    <a
      href="#"
      style={{
        color: '#CBBD93',
        textDecoration: 'none',
        fontSize: '13px',
        transition: 'opacity 0.3s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
    >
      {text}
    </a>
  );
}