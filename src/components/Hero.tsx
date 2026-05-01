import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { Section } from '../types';

interface HeroProps {
  onNavigate: (s: string) => void;
}

// ── Typewriter hook ────────────────────────────────
const ROLES = [
  'WordPress Developer',
  'React Developer',
  'PHP Expert',
  'WooCommerce Specialist',
  'Full-Stack Dev',
  'UI/UX Enthusiast',
];

function useTypewriter(words: string[], typingSpeed = 80, pauseMs = 1800, deleteSpeed = 40) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');
  const charIdx = useRef(0);

  useEffect(() => {
    const word = words[wordIdx];

    if (phase === 'typing') {
      if (charIdx.current < word.length) {
        const t = setTimeout(() => {
          setDisplayed(word.slice(0, charIdx.current + 1));
          charIdx.current++;
        }, typingSpeed + Math.random() * 30);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('pausing'), pauseMs);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'pausing') {
      setPhase('deleting');
    }

    if (phase === 'deleting') {
      if (charIdx.current > 0) {
        const t = setTimeout(() => {
          charIdx.current--;
          setDisplayed(word.slice(0, charIdx.current));
        }, deleteSpeed);
        return () => clearTimeout(t);
      } else {
        setWordIdx((prev) => (prev + 1) % words.length);
        setPhase('typing');
      }
    }
  }, [phase, displayed, wordIdx, words, typingSpeed, pauseMs, deleteSpeed]);

  return displayed;
}

// ── Hero ───────────────────────────────────────────
const Hero = ({ onNavigate }: HeroProps) => {
  const role = useTypewriter(ROLES);

  return (
    <section
      id="home"
      className="section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid BG */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      {/* Red glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(255,71,71,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ width: '100%', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="hero-grid">

          {/* ── LEFT ── */}
          <div>
            {/* Open badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              style={{ marginBottom: '28px' }}
            >
              <span className="open-badge">Open to Work</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(42px, 6vw, 80px)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.0,
                color: '#fff',
                margin: '0 0 12px',
              }}
            >
              Hi, I'm<br />
              <span style={{ color: '#ff4747' }}>Nitul Patel</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.7 }}
              style={{
                fontSize: 'clamp(18px, 2.5vw, 28px)',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.55)',
                marginBottom: '24px',
                minHeight: '42px',
                display: 'flex',
                alignItems: 'center',
                gap: '0',
              }}
            >
              <span style={{ color: '#ff4747', marginRight: '6px' }}>&gt;</span>
              <span>{role}</span>
              {/* blinking cursor */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                style={{ display: 'inline-block', width: '2px', height: '1.1em', background: '#ff4747', marginLeft: '3px', borderRadius: '1px', verticalAlign: 'middle' }}
              />
            </motion.div>

            {/* Sub-description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.7 }}
              style={{
                fontSize: 'clamp(14px, 1.6vw, 17px)',
                fontWeight: 400,
                color: '#666',
                marginBottom: '36px',
                lineHeight: 1.75,
                maxWidth: '440px',
              }}
            >
              Full-Stack WordPress Developer crafting high-performance websites,
              custom themes &amp; WooCommerce solutions that convert.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.95, duration: 0.7 }}
              style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}
            >
              <button
                onClick={() => onNavigate('projects')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: '#ff4747', color: '#fff', border: 'none',
                  borderRadius: '9999px', padding: '13px 28px',
                  fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                  fontFamily: 'Outfit, sans-serif', transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#cc2e2e';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(255,71,71,0.35)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#ff4747';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                }}
              >
                View My Work <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                style={{
                  background: 'transparent', color: '#fff',
                  border: '1.5px solid rgba(255,255,255,0.22)',
                  borderRadius: '9999px', padding: '13px 28px',
                  fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                  fontFamily: 'Outfit, sans-serif', transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#fff';
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.22)';
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                }}
              >
                Let's Talk
              </button>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.1, duration: 0.7 }}
              style={{ display: 'flex', gap: '12px', alignItems: 'center' }}
            >
              {[
                { Icon: Github, href: '#', label: 'GitHub' },
                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  title={label}
                  style={{
                    width: '38px', height: '38px', borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#666', transition: 'all 0.25s ease', textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget).style.borderColor = '#ff4747';
                    (e.currentTarget).style.color = '#ff4747';
                    (e.currentTarget).style.background = 'rgba(255,71,71,0.08)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.12)';
                    (e.currentTarget).style.color = '#666';
                    (e.currentTarget).style.background = 'transparent';
                  }}
                >
                  <Icon size={17} />
                </a>
              ))}
              <span style={{ fontSize: '12px', color: '#3a3a3a', fontWeight: 500, marginLeft: '4px' }}>nitulpatel504@gmail.com</span>
            </motion.div>
          </div>

          {/* ── RIGHT — Profile Card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
              {/* Card */}
              <div
                className="glass-card"
                style={{ borderRadius: '28px', padding: '36px', position: 'relative', overflow: 'hidden' }}
              >
                {/* Avatar */}
                <div style={{
                  width: '76px', height: '76px', borderRadius: '20px',
                  background: 'linear-gradient(135deg, #ff4747 0%, #ff8080 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '34px', fontWeight: 900, color: '#fff',
                  marginBottom: '20px', boxShadow: '0 8px 30px rgba(255,71,71,0.28)',
                }}>N</div>

                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', margin: '0 0 5px' }}>Nitul Patel</h3>
                  <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>WordPress &amp; Full-Stack Developer</p>
                </div>

                {/* Stats row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                  {[
                    { val: '5+', label: 'Years' },
                    { val: '120+', label: 'Projects' },
                    { val: '85+', label: 'Clients' },
                  ].map(({ val, label }) => (
                    <div key={label} style={{
                      textAlign: 'center', padding: '12px 6px',
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      <div style={{ fontSize: '20px', fontWeight: 800, color: '#ff4747', lineHeight: 1 }}>{val}</div>
                      <div style={{ fontSize: '10px', color: '#555', marginTop: '4px', fontWeight: 500 }}>{label}</div>
                    </div>
                  ))}
                </div>

                {/* Live tech tags — cycles with typing animation */}
                <div style={{ marginBottom: '4px' }}>
                  <div style={{ fontSize: '11px', color: '#444', marginBottom: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Currently working with</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {['WordPress', 'React', 'PHP', 'WooCommerce', 'Next.js'].map(tag => (
                      <span key={tag} style={{
                        fontSize: '11px', fontWeight: 600,
                        background: 'rgba(255,71,71,0.1)', color: '#ff4747',
                        padding: '4px 10px', borderRadius: '9999px',
                        border: '1px solid rgba(255,71,71,0.2)',
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Available badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="glass-card"
                style={{
                  position: 'absolute', bottom: '-18px', right: '-16px',
                  padding: '12px 18px', borderRadius: '16px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00e676', boxShadow: '0 0 8px #00e676', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>Available</div>
                  <div style={{ fontSize: '10px', color: '#555' }}>for new projects</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.3, duration: 0.7 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: '#3a3a3a', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Scroll Down</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, rgba(255,71,71,0.6), transparent)' }}
            />
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 767px) {
          .hero-grid { gap: 32px !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
