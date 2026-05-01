import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail, Calendar, MessageSquare, User, Lock,
  RefreshCw, Inbox, Download, LogOut,
} from 'lucide-react';

interface Submission {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  ip?: string;
}

// ── PHP API endpoints ─────────────────────────────────────────────────────────
const REMOTE_API_ORIGIN = import.meta.env.VITE_API_URL
  || (typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')
    ? 'https://nitul.infinityfreeapp.com'
    : '');
const API_BASE = REMOTE_API_ORIGIN ? `${REMOTE_API_ORIGIN}/api` : '/api';
const USING_REMOTE_API = Boolean(REMOTE_API_ORIGIN);
const IS_GITHUB_PAGES = typeof window !== 'undefined' && window.location.hostname.endsWith('github.io');
const SUBMISSIONS_ENDPOINT = REMOTE_API_ORIGIN ? `${API_BASE}/submissions.php` : `${API_BASE}/submissions`;

const AdminPage = () => {
  const [key,         setKey]         = useState('');
  const [authed,      setAuthed]      = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [total,       setTotal]       = useState(0);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');
  const [selected,    setSelected]    = useState<Submission | null>(null);

  // ── Fetch all submissions from PHP API ──────────────────────────────────
  const fetchSubmissions = async (adminKey: string) => {
    setLoading(true);
    setError('');
    try {
      const res  = await fetch(`${SUBMISSIONS_ENDPOINT}?key=${encodeURIComponent(adminKey)}`, {
        credentials: 'same-origin'
      });
      if (res.status === 401) {
        setError('Invalid admin key.');
        setAuthed(false);
        return;
      }
      const data = await res.json();
      setSubmissions(data.submissions ?? []);
      setTotal(data.total ?? 0);
      setAuthed(true);
    } catch {
      if (IS_GITHUB_PAGES && !USING_REMOTE_API) {
        setError('Backend not connected. Set VITE_API_URL to your hosted PHP API domain.');
      } else {
        setError('Failed to connect to the server.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSubmissions(key);
  };

  // ── CSV export — triggers PHP download ──────────────────────────────────
  const handleExportCSV = () => {
    // PHP sends file as attachment → open in new tab so browser downloads it
    window.open(`${SUBMISSIONS_ENDPOINT}?key=${encodeURIComponent(key)}&export=csv`, '_blank');
  };

  // ── Export JSON in-browser ───────────────────────────────────────────────
  const handleExportJSON = () => {
    const blob = new Blob(
      [JSON.stringify(submissions, null, 2)],
      { type: 'application/json' },
    );
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href     = url;
    a.download = `submissions_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  // ── Shared styles ────────────────────────────────────────────────────────
  const btnBase: React.CSSProperties = {
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10, padding: '8px 16px', color: '#888', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 6, fontSize: 13,
    fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s ease',
  };

  return (
    <div style={{ background: '#050505', minHeight: '100vh', fontFamily: 'Outfit, sans-serif', padding: '120px 24px 60px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
          <div style={{
            width: 40, height: 40, background: '#ff4747', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 18, color: '#fff',
          }}>N</div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>
              Submissions <span style={{ color: '#ff4747' }}>Admin</span>
            </h1>
            <p style={{ fontSize: 12, color: '#444', margin: 0 }}>Contact form entries — private view</p>
          </div>
        </motion.div>

        {/* ── Login gate ─────────────────────────────────────────────────── */}
        {!authed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'rgba(17,17,17,0.9)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 24, padding: '48px 40px', maxWidth: 420, margin: '0 auto',
            }}>
            <Lock size={28} color="#ff4747" style={{ marginBottom: 20 }} />
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>Admin Access</h2>
            <p style={{ fontSize: 14, color: '#555', margin: '0 0 28px' }}>
              Enter the admin key set in <code style={{ color: '#ff4747' }}>submissions.php</code> to view entries.
            </p>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input
                type="password" placeholder="Admin key…"
                value={key} onChange={e => setKey(e.target.value)}
                style={{
                  width: '100%', padding: '13px 16px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff', fontSize: 15, fontFamily: 'Outfit, sans-serif',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
              {error && <p style={{ color: '#ff4747', fontSize: 13, margin: 0 }}>{error}</p>}
              <button type="submit" disabled={loading}
                style={{
                  background: '#ff4747', color: '#fff', border: 'none', borderRadius: 12,
                  padding: '13px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'Outfit, sans-serif',
                }}>
                {loading ? 'Verifying…' : 'Login'}
              </button>
            </form>
          </motion.div>
        )}

        {/* ── Submissions list ────────────────────────────────────────────── */}
        {authed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Inbox size={18} color="#ff4747" />
                <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>
                  {total} submission{total !== 1 ? 's' : ''}
                </span>
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {/* Refresh */}
                <button onClick={() => fetchSubmissions(key)} style={btnBase}>
                  <RefreshCw size={13} /> Refresh
                </button>

                {/* Export CSV — PHP generates the file */}
                <button onClick={handleExportCSV}
                  style={{ ...btnBase, color: '#00e676', borderColor: 'rgba(0,230,118,0.25)', background: 'rgba(0,230,118,0.06)' }}>
                  <Download size={13} /> Export CSV
                </button>

                {/* Export JSON — client-side blob */}
                <button onClick={handleExportJSON}
                  style={{ ...btnBase, color: '#6ec6ff', borderColor: 'rgba(110,198,255,0.25)', background: 'rgba(110,198,255,0.06)' }}>
                  <Download size={13} /> Export JSON
                </button>

                {/* Logout */}
                <button onClick={() => { setAuthed(false); setKey(''); setSubmissions([]); }}
                  style={{ ...btnBase, color: '#ff4747', borderColor: 'rgba(255,71,71,0.25)', background: 'rgba(255,71,71,0.06)' }}>
                  <LogOut size={13} /> Logout
                </button>
              </div>
            </div>

            {/* Empty state */}
            {submissions.length === 0 && (
              <div style={{ textAlign: 'center', padding: '64px 0', color: '#444' }}>
                <MessageSquare size={36} style={{ marginBottom: 12, opacity: 0.4 }} />
                <p>No submissions yet.</p>
              </div>
            )}

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {submissions.map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  onClick={() => setSelected(selected?.date === s.date ? null : s)}
                  style={{
                    background: 'rgba(17,17,17,0.85)',
                    border: `1px solid ${selected?.date === s.date ? 'rgba(255,71,71,0.35)' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 18, padding: '20px 24px', cursor: 'pointer',
                    transition: 'border-color 0.2s ease',
                  }}>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'rgba(255,71,71,0.1)', border: '1px solid rgba(255,71,71,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff4747',
                      }}>
                        <User size={16} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: 0, wordBreak: 'break-word' }}>{s.name}</p>
                        <a href={`mailto:${s.email}`} style={{ fontSize: 12, color: '#ff4747', textDecoration: 'none', wordBreak: 'break-word' }}>{s.email}</a>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#444' }}>
                      <Calendar size={11} /> {fmt(s.date)}
                    </div>
                  </div>

                  {s.subject && (
                    <p style={{ fontSize: 13, color: '#666', margin: '12px 0 0 48px', fontWeight: 600, wordBreak: 'break-word' }}>{s.subject}</p>
                  )}

                  <AnimatePresence>
                    {selected?.date === s.date && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>

                        <p style={{
                          fontSize: 14, color: '#888', lineHeight: 1.75,
                          margin: '16px 0 0 48px', padding: '16px',
                          background: 'rgba(255,255,255,0.03)', borderRadius: 12,
                          borderLeft: '2px solid rgba(255,71,71,0.3)',
                          whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                        }}>
                          {s.message}
                        </p>

                        {/* IP tag */}
                        {s.ip && (
                          <p style={{ fontSize: 11, color: '#333', margin: '8px 0 0 48px' }}>IP: {s.ip}</p>
                        )}

                        <a href={`mailto:${s.email}?subject=Re: ${encodeURIComponent(s.subject || 'Your message')}`}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            margin: '12px 0 0 48px', padding: '8px 18px', borderRadius: 9999,
                            background: 'rgba(255,71,71,0.1)', border: '1px solid rgba(255,71,71,0.2)',
                            color: '#ff4747', fontSize: 12, fontWeight: 700, textDecoration: 'none',
                          }}>
                          <Mail size={12} /> Reply via Email
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
