import { Suspense } from 'react';
import SearchClient from './SearchClient';

export default function Page() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#001026', color: '#cbbd93', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading search…</div>}>
      <SearchClient />
    </Suspense>
  );
}

