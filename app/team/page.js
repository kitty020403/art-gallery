'use client';
import { useRouter } from 'next/navigation';

export default function TeamPage() {
  const router = useRouter();

  const team = [
    {
      id: 1,
      name: 'Sophie Laurent',
      role: 'Gallery Director',
      bio: 'Over 20 years of experience in art curation and gallery management.',
      image: '/images/team1.jpg',
      email: 'sophie@artgallery.com',
      specialty: 'Contemporary Art'
    },
    {
      id: 2,
      name: 'Marcus Chen',
      role: 'Chief Curator',
      bio: 'Expert in Renaissance and Baroque art with a PhD in Art History.',
      image: '/images/team2.jpg',
      email: 'marcus@artgallery.com',
      specialty: 'Classical Art'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Assistant Curator',
      bio: 'Specializes in Latin American and modernist movements.',
      image: '/images/team3.jpg',
      email: 'elena@artgallery.com',
      specialty: 'Modern Art'
    },
    {
      id: 4,
      name: 'James Anderson',
      role: 'Collections Manager',
      bio: 'Ensures the preservation and documentation of all gallery works.',
      image: '/images/team4.jpg',
      email: 'james@artgallery.com',
      specialty: 'Conservation'
    },
    {
      id: 5,
      name: 'Yuki Tanaka',
      role: 'Education Coordinator',
      bio: 'Develops programs to engage visitors with art and culture.',
      image: '/images/team5.jpg',
      email: 'yuki@artgallery.com',
      specialty: 'Art Education'
    },
    {
      id: 6,
      name: 'Amara Okonkwo',
      role: 'Digital Media Manager',
      bio: 'Brings the gallery experience online through innovative digital solutions.',
      image: '/images/team6.jpg',
      email: 'amara@artgallery.com',
      specialty: 'Digital Strategy'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#001026', padding: '3rem 0' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 mb-3" style={{ 
            color: '#cbbd93', 
            fontFamily: "'Playfair Display', serif",
            fontWeight: '400'
          }}>
            Meet Our Team
          </h1>
          <p style={{ color: 'rgba(203,189,147,0.8)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
            Passionate art professionals dedicated to bringing you the finest collection 
            of artworks from around the world
          </p>
        </div>

        {/* Team Grid */}
        <div className="row g-4">
          {team.map((member) => (
            <div key={member.id} className="col-md-6 col-lg-4">
              <div 
                className="card h-100"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(203,189,147,0.2)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(203,189,147,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Profile Image */}
                <div 
                  style={{
                    height: '280px',
                    background: 'rgba(203,189,147,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    color: '#bea173',
                    fontWeight: 'bold'
                  }}
                >
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="card-body p-4">
                  {/* Name & Role */}
                  <h5 className="card-title mb-1" style={{ color: '#39395e', fontWeight: '600' }}>
                    {member.name}
                  </h5>
                  <p className="text-muted mb-2" style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                    {member.role}
                  </p>

                  {/* Specialty Badge */}
                  <span 
                    className="badge mb-3"
                    style={{ 
                      background: 'rgba(203,189,147,0.2)', 
                      color: '#001026',
                      fontSize: '0.75rem',
                      padding: '0.4rem 0.8rem'
                    }}
                  >
                    {member.specialty}
                  </span>

                  {/* Bio */}
                  <p className="card-text text-muted small mb-3" style={{ lineHeight: '1.6' }}>
                    {member.bio}
                  </p>

                  {/* Contact */}
                  <div className="d-flex align-items-center text-muted small">
                    <i className="fas fa-envelope me-2" style={{ color: '#bea173' }}></i>
                    <a 
                      href={`mailto:${member.email}`}
                      style={{ 
                        color: '#6c757d', 
                        textDecoration: 'none',
                        fontSize: '0.85rem'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#bea173'}
                      onMouseLeave={(e) => e.target.style.color = '#6c757d'}
                    >
                      {member.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
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
      </div>
    </div>
  );
}
