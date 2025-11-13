'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        // Store user data
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        // Redirect to catalog
        router.push('/catalog');
      } else {
        setError(data.error || 'Registration failed');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid bg-gradient-primary" style={{ 
      background: '#001026',
      minHeight: '100vh'
    }}>
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-lg o-hidden border-0">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold" style={{ color: '#39395e' }}>Create Your Account</h2>
                <p className="text-muted">Fill in your details to get started</p>
              </div>

              {error && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label fw-medium">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fas fa-user text-muted"></i>
                    </span>
                    <input
                      type="text"
                      id="name"
                      className="form-control form-control-lg"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-medium">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fas fa-envelope text-muted"></i>
                    </span>
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-medium">Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fas fa-lock text-muted"></i>
                    </span>
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      placeholder="At least 6 characters"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength="6"
                    />
                  </div>
                </div>

                <div className="d-grid mb-3">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg fw-bold py-3"
                    disabled={isLoading}
                    style={{
                      background: '#001026',
                      border: 'none',
                      transition: 'all 0.3s',
                      boxShadow: '0 4px 15px rgba(185, 87, 151, 0.3)'
                    }}
                    onMouseOver={(e) => e.target.style.opacity = '0.9'}
                    onMouseOut={(e) => e.target.style.opacity = '1'}
                  >
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                  </button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-muted">
                    Already have an account?{' '}
                    <a 
                      href="/login" 
                      className="text-decoration-none fw-bold"
                      style={{ color: '#1a1a2e ' }}
                    >
                      Log in
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}