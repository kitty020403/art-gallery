'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate sending message (replace with actual API call)
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#001026', padding: '3rem 0' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="display-4 mb-3" style={{ 
                color: '#cbbd93', 
                fontFamily: "'Playfair Display', serif" 
              }}>
                Contact Us
              </h1>
              <p style={{ color: 'rgba(203,189,147,0.8)', fontSize: '1.1rem' }}>
                We&apos;d love to hear from you
              </p>
            </div>

            {submitted ? (
              <div 
                className="card text-center" 
                style={{ 
                  background: 'rgba(255,255,255,0.95)', 
                  border: 'none',
                  padding: '3rem'
                }}
              >
                <i 
                  className="fas fa-check-circle mb-4" 
                  style={{ fontSize: '4rem', color: '#28a745' }}
                ></i>
                <h3 style={{ color: '#39395e', marginBottom: '1rem' }}>
                  Message Sent Successfully!
                </h3>
                <p className="text-muted">
                  Thank you for contacting us. We&apos;ll get back to you soon.
                </p>
                <p className="text-muted small">
                  Redirecting to home page...
                </p>
              </div>
            ) : (
              <div 
                className="card" 
                style={{ 
                  background: 'rgba(255,255,255,0.95)', 
                  border: 'none' 
                }}
              >
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold" style={{ color: '#39395e' }}>
                          Your Name *
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          style={{ border: '1px solid rgba(203,189,147,0.3)' }}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold" style={{ color: '#39395e' }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          style={{ border: '1px solid rgba(203,189,147,0.3)' }}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold" style={{ color: '#39395e' }}>
                        Subject *
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="How can we help you?"
                        style={{ border: '1px solid rgba(203,189,147,0.3)' }}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold" style={{ color: '#39395e' }}>
                        Message *
                      </label>
                      <textarea
                        className="form-control form-control-lg"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        placeholder="Tell us more about your inquiry..."
                        style={{ border: '1px solid rgba(203,189,147,0.3)' }}
                      ></textarea>
                    </div>

                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-lg"
                        disabled={loading}
                        style={{
                          background: '#cbbd93',
                          color: '#001026',
                          border: 'none',
                          fontWeight: '600',
                          padding: '1rem'
                        }}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane me-2"></i>
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="row mt-5 g-4">
              <div className="col-md-4">
                <div 
                  className="text-center p-4"
                  style={{ 
                    background: 'rgba(203,189,147,0.1)', 
                    borderRadius: '10px',
                    border: '1px solid rgba(203,189,147,0.2)'
                  }}
                >
                  <i className="fas fa-map-marker-alt fa-2x mb-3" style={{ color: '#cbbd93' }}></i>
                  <h6 style={{ color: '#cbbd93', fontWeight: '600' }}>Location</h6>
                  <p style={{ color: 'rgba(203,189,147,0.8)', margin: 0, fontSize: '0.9rem' }}>
                    123 Art Street<br />
                    Gallery District, City
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div 
                  className="text-center p-4"
                  style={{ 
                    background: 'rgba(203,189,147,0.1)', 
                    borderRadius: '10px',
                    border: '1px solid rgba(203,189,147,0.2)'
                  }}
                >
                  <i className="fas fa-envelope fa-2x mb-3" style={{ color: '#cbbd93' }}></i>
                  <h6 style={{ color: '#cbbd93', fontWeight: '600' }}>Email</h6>
                  <p style={{ color: 'rgba(203,189,147,0.8)', margin: 0, fontSize: '0.9rem' }}>
                    contact@artgallery.com
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div 
                  className="text-center p-4"
                  style={{ 
                    background: 'rgba(203,189,147,0.1)', 
                    borderRadius: '10px',
                    border: '1px solid rgba(203,189,147,0.2)'
                  }}
                >
                  <i className="fas fa-phone fa-2x mb-3" style={{ color: '#cbbd93' }}></i>
                  <h6 style={{ color: '#cbbd93', fontWeight: '600' }}>Phone</h6>
                  <p style={{ color: 'rgba(203,189,147,0.8)', margin: 0, fontSize: '0.9rem' }}>
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
