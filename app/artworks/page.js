"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ArtworksPage() {
  const router = useRouter();

  useEffect(() => {
    // This route now simply points users to the Catalog
    router.replace('/catalog');
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#001026',
      color: '#cbbd93',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      Redirecting to Catalog…
    </div>
  );
}
