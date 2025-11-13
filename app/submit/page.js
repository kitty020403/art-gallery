'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitArtworkPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', artist: '', year: '', image: '', description: '', period: '', price: '' });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) { router.push('/login'); return; }
        const data = await res.json();
        if (!data.success) { router.push('/login'); return; }
        if (!['admin','artist'].includes(data.data.role)) {
          setForbidden(true);
        }
        setUser(data.data);
      } catch(err) {
        router.push('/login');
      }
    }
    fetchMe();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/artworks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ type: 'success', text: 'Artwork submitted! Pending approval.' });
        setForm({ title: '', artist: '', year: '', image: '', description: '', period: '', price: '' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Submission failed.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#001026', color: '#fff', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ color: '#cbbd93', marginBottom: '1rem' }}>Submit Artwork</h1>
      {forbidden ? (
        <p style={{ color: 'rgba(203,189,147,0.8)', marginBottom: '2rem' }}>Your account is not allowed to submit artworks. Ask an admin to upgrade your role to artist.</p>
      ) : (
        <p style={{ color: 'rgba(203,189,147,0.8)', marginBottom: '2rem' }}>Fill the form below. Your submission will be reviewed by an admin.</p>
      )}
      {!forbidden && (
      <form onSubmit={handleSubmit} style={{ maxWidth: 700 }}>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <input name='title' value={form.title} onChange={handleChange} required placeholder='Title' style={inputStyle} />
          <input name='artist' value={form.artist} onChange={handleChange} required placeholder='Artist (your name)' style={inputStyle} />
          <input name='year' value={form.year} onChange={handleChange} required placeholder='Year' style={inputStyle} />
          <input name='image' value={form.image} onChange={handleChange} required placeholder='Image URL or /images/local.jpg' style={inputStyle} />
          <textarea name='description' value={form.description} onChange={handleChange} required placeholder='Description' rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
          <input name='period' value={form.period} onChange={handleChange} placeholder='Period (optional)' style={inputStyle} />
          <input name='price' value={form.price} onChange={handleChange} placeholder='Price (optional)' style={inputStyle} />
          <button disabled={loading} type='submit' style={buttonStyle}>{loading ? 'Submitting...' : 'Submit'}</button>
        </div>
      </form>
      )}
      {message && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: 8, background: message.type === 'success' ? 'rgba(0,180,0,0.15)' : 'rgba(180,0,0,0.15)', color: '#cbbd93' }}>
          {message.text}
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  backgroundColor: 'rgba(0,16,38,0.6)',
  border: '1px solid rgba(203,189,147,0.3)',
  borderRadius: 6,
  color: '#cbbd93'
};

const buttonStyle = {
  backgroundColor: '#cbbd93',
  color: '#001026',
  padding: '12px 18px',
  border: 'none',
  borderRadius: 6,
  fontWeight: '600',
  cursor: 'pointer'
};
