'use client';

import { useState } from 'react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    alert('Signup form submitted!');
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
                    style={{
                      background: '#001026',
                      border: 'none',
                      transition: 'all 0.3s',
                      boxShadow: '0 4px 15px rgba(185, 87, 151, 0.3)'
                    }}
                    onMouseOver={(e) => e.target.style.opacity = '0.9'}
                    onMouseOut={(e) => e.target.style.opacity = '1'}
                  >
                    Sign Up
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