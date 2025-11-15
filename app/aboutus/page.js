'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

function Header({ router }) {
  return (
    <nav className="d-flex align-items-center justify-content-between" style={{
      background: 'rgba(203, 189, 147, 0.05)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(203, 189, 147, 0.2)',
      height: '120px',
      padding: '0 1rem'
    }}>
      <div className="d-flex align-items-center">
        <img src="/images/logo.png" alt="Galerium" style={{ height: '100px', width: '100px', objectFit: 'contain', filter: 'brightness(0) saturate(100%) invert(83%) sepia(12%) saturate(488%) hue-rotate(358deg) brightness(90%) contrast(90%)' }} />
      </div>

      <div>
        <button className="btn" onClick={() => router.push('/login')} style={{ borderRadius: 6, padding: '6px 12px', border: '2px solid #cbbd93', color: '#cbbd93', backgroundColor: 'transparent', marginRight: 8 }}>Login</button>
        <button className="btn" onClick={() => router.push('/signup')} style={{ borderRadius: 6, padding: '6px 12px', backgroundColor: '#e0c1a2ff', color: '#fff', border: 'none' }}>Register</button>
      </div>
    </nav>
  );
}

function TeamMember({ idx }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 10, padding: '0.75rem' }}>
      <div style={{ height: 140, background: 'rgba(203,189,147,0.06)', borderRadius: 8, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbbd93' }}>
        <img src={`/images/team-${idx}.jpg`} alt={`Team ${idx}`} style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: 6 }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        {!false && <span>Team Member {idx}</span>}
      </div>
      <p style={{ margin: 0, color: '#cbbd93' }}>Role Title</p>
      <p style={{ margin: '4px 0 0 0', color: 'rgba(203,189,147,0.9)', fontSize: '0.9rem' }}>Short bio goes here.</p>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ padding: '24px 1rem', marginTop: 24, borderTop: '1px solid rgba(255,255,255,0.03)', color: '#9aa3ab' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div>© {new Date().getFullYear()} Galerium. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="/privacy" style={{ color: '#cbbd93', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="/terms" style={{ color: '#cbbd93', textDecoration: 'none' }}>Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}

export default function AboutUsPage() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#001026',
      color: '#ffffff',
      fontFamily: "'Inter', sans-serif",
      position: 'relative'
    }}>

      <Header router={router} />

      <main style={{ padding: '2rem', maxWidth: 1100, margin: '0 auto' }}>
        {/* Hero */}
        <section style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#cbbd93', margin: 0 }}>About Galerium</h1>
          <p style={{ color: 'rgba(203, 189, 147, 0.9)', marginTop: 8 }}>Celebrating art, artists, and the stories behind timeless works.</p>
        </section>

        {/* Mission */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(0,16,38,0.8)', border: '1px solid rgba(203,189,147,0.12)', borderRadius: 12, padding: '1rem' }}>
            <h3 style={{ color: '#cbbd93', marginTop: 0, marginBottom: 6 }}>Our Mission</h3>
            <p style={{ margin: 0, color: '#fffafa', backgroundColor: 'rgba(255,255,255,0.02)', padding: 10, borderRadius: 8 }}>
              We curate and share artworks that inspire, educate, and connect people worldwide—bridging
              classic masterpieces and contemporary voices.
            </p>
          </div>
          <div style={{ background: 'rgba(0,16,38,0.8)', border: '1px solid rgba(203,189,147,0.12)', borderRadius: 12, padding: '1rem' }}>
            <h3 style={{ color: '#cbbd93', marginTop: 0, marginBottom: 6 }}>What We Do</h3>
            <p style={{ margin: 0, color: '#fffafa', backgroundColor: 'rgba(255,255,255,0.02)', padding: 10, borderRadius: 8 }}>
              From curated collections to artist spotlights, Galerium brings the gallery experience online
              with immersive visuals and thoughtful storytelling.
            </p>
          </div>
          <div style={{ background: 'rgba(0,16,38,0.8)', border: '1px solid rgba(203,189,147,0.12)', borderRadius: 12, padding: '1rem' }}>
            <h3 style={{ color: '#cbbd93', marginTop: 0, marginBottom: 6 }}>Values</h3>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#cbbd93' }}>
              <li>Accessibility</li>
              <li>Authenticity</li>
              <li>Education</li>
              <li>Community</li>
            </ul>
          </div>
        </section>

        {/* Team preview */}
        <section style={{ background: 'rgba(0,16,38,0.8)', border: '1px solid rgba(203,189,147,0.12)', borderRadius: 12, padding: '1rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#cbbd93', marginTop: 0 }}>Our Team</h2>
          <p style={{ color: '#e0c1a2', marginTop: 6 }}>
            We’re a small team of curators, designers, and engineers who care deeply about art and the
            experience around it.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {[1, 2, 3].map((i) => <TeamMember key={i} idx={i} />)}
          </div>
        </section>
        {/* CTA */}
        <section style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#cbbd93', marginBottom: 8 }}>Get in Touch</h2>
          <p style={{ color: 'rgba(203, 189, 147, 0.9)', marginTop: 0 }}>Interested in partnerships or featuring your collection?</p>
          <button
            className="btn"
            onClick={() => router.push('/catalog')}
            style={{
              borderRadius: 8,
              padding: '10px 16px',
              border: 'none',
              fontWeight: 600,
              backgroundColor: '#cc7722',
              color: '#ffffff',
              boxShadow: '0 4px 15px rgba(204, 119, 34, 0.25)'
            }}
          >
            Explore the Catalog
          </button>
        </section>
      </main>

      <Footer />

      {/* Subtle gradient overlay */}
      <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(to bottom, rgba(203, 189, 147, 0.03), rgba(0,16,38,1))', pointerEvents: 'none', zIndex: -1 }} />
    </div>
  );
}

