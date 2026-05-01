import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, XCircle, Loader } from 'lucide-react';
import { hasSupabaseConfig, supabase } from '../lib/supabase';

interface ContactProps {
  onSubmissionSuccess: () => void;
  standalone?: boolean;
}

const contactInfo = [
  { Icon: Mail,   label: 'Email',    val: 'nitulpatel504@gmail.com', href: 'mailto:nitulpatel504@gmail.com' },
  { Icon: Phone,  label: 'Phone',    val: '+91 83209 23282',         href: 'tel:+918320923282' },
  { Icon: MapPin, label: 'Location', val: 'Ahmedabad, India',        href: 'https://maps.google.com/?q=Ahmedabad,India' },
];

// Email notification relay (optional after Supabase insert)
const FALLBACK_CONTACT = import.meta.env.VITE_CONTACT_FALLBACK_URL
  || 'https://formsubmit.co/ajax/nitulpatel504@gmail.com';

const Contact = ({ onSubmissionSuccess, standalone }: ContactProps) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status,   setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errMsg,   setErrMsg]   = useState('');
  const [focused,  setFocused]  = useState<string | null>(null);

  const sectionRef   = useRef<HTMLDivElement>(null);
  const formRef      = useRef<HTMLDivElement>(null);
  const isFormInView = useInView(formRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY         = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const glowScale   = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.2, 0.8]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.15, 0]);

  // ── Submit handler ─────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrMsg('');

    if (!hasSupabaseConfig || !supabase) {
      setErrMsg('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    try {
      const { error } = await supabase.from('submissions').insert({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        date: new Date().toISOString(),
      });

      if (error) {
        setErrMsg(error.message || 'Unable to save submission');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
        return;
      }

      // Optional notification email. Do not fail the submission if this fails.
      try {
        await fetch(FALLBACK_CONTACT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject || 'Portfolio Contact Form',
            message: formData.message,
            _subject: `Portfolio inquiry from ${formData.name}`,
            _captcha: 'false',
            _template: 'table',
          }),
        });
      } catch { /* no-op */ }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      onSubmissionSuccess();
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setErrMsg('Network error — please try again');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const fieldStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    background: focused === name ? 'rgba(255,71,71,0.04)' : 'rgba(255,255,255,0.03)',
    border: `1px solid ${focused === name ? 'rgba(255,71,71,0.55)' : 'rgba(255,255,255,0.07)'}`,
    borderRadius: '14px', padding: '14px 18px', fontSize: '15px',
    color: '#fff', outline: 'none', fontFamily: 'Outfit, sans-serif',
    transition: 'all 0.3s ease', boxSizing: 'border-box',
    boxShadow: focused === name ? '0 0 0 3px rgba(255,71,71,0.1)' : 'none',
  });

  const labelStyle: React.CSSProperties = {
    fontSize: '11px', fontWeight: 700, color: '#555',
    letterSpacing: '0.12em', textTransform: 'uppercase',
    display: 'block', marginBottom: '8px', transition: 'color 0.2s ease',
  };

  return (
    <section ref={sectionRef} id="contact" className="section" style={{ position: 'relative', overflow: 'hidden' }}>

      <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#050505', y: bgY }} />
      <div className="grid-bg" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.18 }} />

      <motion.div style={{
        position: 'absolute', bottom: '-100px', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255,71,71,0.18) 0%, transparent 70%)',
        scale: glowScale, opacity: glowOpacity, pointerEvents: 'none',
      }} />

      <motion.div animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '12%', right: '6%', width: 120, height: 120, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,71,71,0.08) 0%, transparent 70%)',
          border: '1px solid rgba(255,71,71,0.12)', pointerEvents: 'none' }} />
      <motion.div animate={{ y: [0, 14, 0], rotate: [0, -6, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ position: 'absolute', bottom: '18%', left: '4%', width: 80, height: 80, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,71,71,0.06) 0%, transparent 70%)',
          border: '1px solid rgba(255,71,71,0.08)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="section-label" style={{ marginBottom: '16px' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff4747', display: 'inline-block' }} />
          Get in Touch
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', margin: '0 0 48px', lineHeight: 1.05 }}
        >
          Let's Start a <span style={{ color: '#ff4747' }}>Project</span>
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '64px', alignItems: 'start' }} className="contact-grid">

          {/* Left */}
          <div>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ fontSize: '16px', color: '#555', lineHeight: 1.85, marginBottom: '48px' }}>
              I'm currently available for freelance work. Send me a message and I'll get back to you within 24 hours.
            </motion.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {contactInfo.map(({ Icon, label, val, href }, i) => (
                <motion.a key={label} href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 6 }} className="glass-card"
                  style={{ borderRadius: '18px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '18px', textDecoration: 'none' }}>
                  <motion.div whileHover={{ rotate: [0, -12, 12, 0], scale: 1.1 }} transition={{ duration: 0.4 }}
                    style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(255,71,71,0.1)',
                      border: '1px solid rgba(255,71,71,0.2)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: '#ff4747', flexShrink: 0 }}>
                    <Icon size={18} />
                  </motion.div>
                  <div>
                    <p style={{ fontSize: '10px', color: '#444', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 3px' }}>{label}</p>
                    <p style={{ fontSize: '14px', color: '#ccc', fontWeight: 600, margin: 0 }}>{val}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              style={{ marginTop: '32px', display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '10px 20px', borderRadius: '9999px',
                background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.2)' }}>
              <motion.div animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: '#00e676', boxShadow: '0 0 8px rgba(0,230,118,0.6)' }} />
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#00e676' }}>Available for new projects</span>
            </motion.div>
          </div>

          {/* Right — form */}
          <div ref={formRef}>
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={isFormInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card"
              style={{ borderRadius: '28px', padding: '44px', position: 'relative', overflow: 'hidden' }}>

              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', top: -60, right: -60, width: 160, height: 160, borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, rgba(255,71,71,0.12), transparent 40%, rgba(255,71,71,0.06) 80%, transparent)',
                  pointerEvents: 'none' }} />

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }} className="form-two-col">
                  <div>
                    <label style={{ ...labelStyle, color: focused === 'name' ? '#ff4747' : '#555' }}>Name</label>
                    <input required type="text" value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe" style={fieldStyle('name')}
                      onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
                  </div>
                  <div>
                    <label style={{ ...labelStyle, color: focused === 'email' ? '#ff4747' : '#555' }}>Email</label>
                    <input required type="email" value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com" style={fieldStyle('email')}
                      onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
                  </div>
                </div>

                <div>
                  <label style={{ ...labelStyle, color: focused === 'subject' ? '#ff4747' : '#555' }}>Subject</label>
                  <input type="text" value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry" style={fieldStyle('subject')}
                    onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)} />
                </div>

                <div>
                  <label style={{ ...labelStyle, color: focused === 'message' ? '#ff4747' : '#555' }}>Message</label>
                  <textarea required rows={5} value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    style={{ ...fieldStyle('message'), resize: 'none' } as React.CSSProperties}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} />
                </div>

                {status === 'error' && errMsg && (
                  <p style={{ fontSize: 13, color: '#ff4747', margin: 0, textAlign: 'center' }}>{errMsg}</p>
                )}

                <motion.button type="submit" disabled={status === 'loading'}
                  whileHover={status === 'idle' ? { scale: 1.02, boxShadow: '0 10px 36px rgba(255,71,71,0.4)' } : {}}
                  whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                  style={{
                    background: status === 'success' ? 'linear-gradient(135deg, #00c853, #00e676)'
                      : status === 'error' ? 'linear-gradient(135deg, #c62828, #ff4747)'
                      : 'linear-gradient(135deg, #cc2e2e, #ff4747)',
                    color: '#fff', border: 'none', borderRadius: '14px',
                    padding: '15px 28px', fontSize: '15px', fontWeight: 700,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    fontFamily: 'Outfit, sans-serif', transition: 'background 0.4s ease',
                    position: 'relative', overflow: 'hidden',
                  }}>
                  {status === 'idle' && (
                    <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      style={{ position: 'absolute', top: 0, bottom: 0, width: '40%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', pointerEvents: 'none' }} />
                  )}
                  <AnimatePresence mode="wait">
                    {status === 'loading' && (
                      <motion.span key="loading" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                        style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-flex' }}>
                          <Loader size={16} />
                        </motion.span>
                        Sending…
                      </motion.span>
                    )}
                    {status === 'success' && (
                      <motion.span key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <CheckCircle size={16} /> Sent successfully!
                      </motion.span>
                    )}
                    {status === 'error' && (
                      <motion.span key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <XCircle size={16} /> Failed — try again
                      </motion.span>
                    )}
                    {status === 'idle' && (
                      <motion.span key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Send size={16} /> Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 768px) {
          .form-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
