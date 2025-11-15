'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  useEffect(() => {
    // Load Bootstrap JavaScript
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        console.log('User role:', data.data.user.role);
        console.log('Full user data:', data.data.user);
        
        // Redirect based on role
        if (data.data.user.role === 'admin') {
          console.log('Redirecting to admin panel');
          // Use window.location for a full page redirect to ensure cookies are set
          window.location.href = '/profiladmin';
        } else {
          console.log('Redirecting to catalog');
          window.location.href = '/catalog';
        }
      } else {
        setError(data.error || 'Login failed');
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
      <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: "url('/images/1 (2).png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.2,
      zIndex: 0,
    }}
  ></div>
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-lg o-hidden border-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold" style={{ color: '#CC7722' }}>Welcome Back</h2>
                <p className="text-muted">Sign in to your account</p>
              </div>

              {error && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="form-label fw-medium">Username</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fas fa-user text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Your username"
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
                      className="form-control form-control-lg"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="remember" />
                    <label className="form-check-label" htmlFor="remember">
                      Remember me
                    </label>
                  </div>
                  <a href="/forgotpassword" className="text-sm hover:underline" style={{ color: '#39395e ' }}>
                    Forgot password?
                  </a>
                </div>

                <div className="d-grid mb-3">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg fw-bold py-3"
                    style={{
                      background: '#001026',
                      border: 'none',
                      transition: 'all 0.3s',
                      boxShadow: '0 4px 15px rgba(26, 26, 46, 0.3)'
                    }}
                    onMouseOver={(e) => e.target.style.opacity = '0.9'}
                    onMouseOut={(e) => e.target.style.opacity = '1'}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </div>
              </form>

              <div className="text-center mt-4">
                <p className="text-muted">
                  Don&apos;t have an account?{' '}
                  <a 
                    href="/signup" 
                    className="text-decoration-none fw-bold"
                    style={{ color: '#39395e ' }}
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}