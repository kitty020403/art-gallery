'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    
    const timer = setTimeout(() => {
      router.push('/login');
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);
<div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: "url('/images/1 (2).png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.3,
      zIndex: 0,
    }}
  ></div>
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div className="card shadow p-4 border-0" style={{ borderRadius: 16 }}>
        <h2 className="mb-3" style={{ color: '#001026' }}>Déconnexion</h2>
        <p className="mb-0">Vous avez été déconnecté.<br />Redirection vers la page de connexion...</p>
      </div>
    </div>
  );
}