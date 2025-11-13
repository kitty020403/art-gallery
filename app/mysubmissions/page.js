'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MySubmissionsPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      // ensure logged in
      const me = await fetch('/api/auth/me');
      if (!me.ok) { router.push('/login'); return; }
      const meJson = await me.json();
      if (!meJson.success) { router.push('/login'); return; }

      // fetch only artworks submitted by current user; include pending/approved/rejected
      try {
        const res = await fetch('/api/artworks?status=all');
        const data = await res.json();
        if (res.ok && data.success) {
          const list = (data.data || []).filter(a => a.submittedBy && (a.submittedBy._id === meJson.data.userId || a.submittedBy === meJson.data.userId));
          setItems(list);
        }
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', background: '#001026', color: '#fff', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ color: '#cbbd93', marginBottom: '1rem' }}>My Submissions</h1>
      {loading ? (
        <p style={{ color: '#cbbd93' }}>Loading...</p>
      ) : items.length === 0 ? (
  <p style={{ color: '#cbbd93' }}>You haven&apos;t submitted any artworks yet.</p>
      ) : (
        <div className='row g-3'>
          {items.map(a => (
            <div key={a._id} className='col-md-6 col-lg-4'>
              <div style={{ background: 'rgba(203,189,147,0.05)', border: '1px solid rgba(203,189,147,0.2)', borderRadius: 10, overflow: 'hidden' }}>
                <img src={a.image} alt={a.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                <div style={{ padding: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 style={{ color: '#cbbd93', margin: 0 }}>{a.title}</h4>
                    <StatusBadge status={a.status} />
                  </div>
                  <p style={{ color: 'rgba(203,189,147,0.8)' }}>{a.artist} • {a.year}</p>
                  {a.status === 'rejected' && a.rejectionReason && (
                    <p style={{ color: 'rgba(220, 53, 69, 0.9)' }}>Reason: {a.rejectionReason}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending: { bg: 'rgba(255, 193, 7, 0.2)', color: '#ffc107', label: 'Pending' },
    approved: { bg: 'rgba(40,167,69,0.2)', color: '#28a745', label: 'Approved' },
    rejected: { bg: 'rgba(220,53,69,0.2)', color: '#dc3545', label: 'Rejected' },
  };
  const s = map[status] || map.pending;
  return (
    <span style={{ background: s.bg, color: s.color, padding: '4px 8px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{s.label}</span>
  );
}
