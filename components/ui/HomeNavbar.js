'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function HomeNavbar() {
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

  function requireAuthAndGo(path) {
    if (user) {
      router.push(path);
    } else {
      router.push('/login');
    }
  }

  return (
    <nav style={{
      background: '#0A192B',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(203, 189, 147, 0.15)',
      height: '80px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', 'Lato', sans-serif",
      fontSize: '15px',
      fontWeight: 400
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px', width: '100%', maxWidth: 1100, justifyContent: 'center' }}>
        <img
          src="/images/logo.png"
          alt="Galerium"
          onClick={() => router.push('/home')}
          style={{
            height: '48px',
            width: 'auto',
            objectFit: 'contain',
            filter: 'brightness(0) saturate(100%) invert(83%) sepia(12%) saturate(488%) hue-rotate(358deg) brightness(90%) contrast(90%)',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            marginRight: 18
          }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
        <a className="nav-link" style={{ color: '#BEA173', textDecoration: 'none', fontSize: '15px', fontWeight: 400, margin: '0 8px', cursor: 'pointer' }} onClick={e => { e.preventDefault(); router.push('/home'); }}>Home</a>
        <a className="nav-link" style={{ color: '#BEA173', textDecoration: 'none', fontSize: '15px', fontWeight: 400, margin: '0 8px', cursor: 'pointer' }} onClick={e => { e.preventDefault(); requireAuthAndGo('/catalog'); }}>Artworks</a>
        <a className="nav-link" style={{ color: '#BEA173', textDecoration: 'none', fontSize: '15px', fontWeight: 400, margin: '0 8px', cursor: 'pointer' }} onClick={e => { e.preventDefault(); requireAuthAndGo('/artists'); }}>Artists</a>
        <a className="nav-link" style={{ color: '#BEA173', textDecoration: 'none', fontSize: '15px', fontWeight: 400, margin: '0 8px', cursor: 'pointer' }} href="aboutus">About</a>
        <input
          type="text"
          placeholder="Search for a painting"
          style={{
            padding: '4px 24px 4px 10px',
            borderRadius: '30px',
            fontSize: '14px',
            border: '1px solid #BEA173',
            outline: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            color: '#001026',
            width: '180px',
            margin: '0 8px'
          }}
        />
        {user && ['artist','admin'].includes(user.role) && (
          <a onClick={() => router.push('/submit')} className="nav-link" style={{ color: '#BEA173', textDecoration: 'none', fontSize: '15px', fontWeight: 400, margin: '0 8px', cursor: 'pointer' }}>Submit Artwork</a>
        )}
        <button
          className="btn btn-hover-effect"
          onClick={() => router.push('/myaccount')}
          style={{
            borderRadius: '8px',
            padding: '4px 12px',
            border: '1px solid #BEA173',
            backgroundColor: '#BEA173',
            color: '#001026',
            fontSize: '14px',
            fontWeight: 400,
            margin: '0 4px',
            cursor: 'pointer'
          }}
        >My Account</button>
        <button
          className="btn btn-hover-effect"
          onClick={() => router.push('/signup')}
          style={{
            borderRadius: '8px',
            padding: '4px 12px',
            border: '1px solid #BEA173',
            backgroundColor: 'transparent',
            color: '#BEA173',
            fontSize: '14px',
            fontWeight: 400,
            margin: '0 4px',
            cursor: 'pointer'
          }}
        >Sign Up</button>
        <button
          className="btn btn-hover-effect"
          onClick={() => router.push('/login')}
          style={{
            borderRadius: '8px',
            padding: '4px 12px',
            border: '1px solid #BEA173',
            backgroundColor: 'transparent',
            color: '#BEA173',
            fontSize: '14px',
            fontWeight: 400,
            margin: '0 4px',
            cursor: 'pointer'
          }}
        >Login</button>
      </div>
    </nav>
  );
}
