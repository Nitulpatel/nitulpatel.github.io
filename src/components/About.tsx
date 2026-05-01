import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Code2, Cpu, Globe, Layers } from 'lucide-react';

interface AboutProps {
  onNavigate: (s: string) => void;
}

const About = ({ onNavigate }: AboutProps) => {
  const highlights = [
    { icon: <Code2 size={20} />, text: 'Custom theme & plugin development' },
    { icon: <Globe size={20} />, text: 'Headless WordPress with React' },
    { icon: <Layers size={20} />, text: 'Complex WooCommerce ecosystems' },
    { icon: <Cpu size={20} />, text: 'Performance optimization & SEO' },
  ];

  return (
    <section id="about" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* subtle grid */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label"
          style={{ marginBottom: '16px', justifyContent: 'center' }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff4747', display: 'inline-block' }} />
          About Me
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="about-grid">
          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: '#fff',
                margin: '0 0 24px',
              }}
            >
              Passionate about building <span style={{ color: '#ff4747' }}>digital experiences</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
              style={{ fontSize: '16px', lineHeight: 1.8, color: '#888', marginBottom: '20px', textAlign: 'center' }}
            >
              I'm a dedicated Full-Stack WordPress Developer with over 5 years of experience building high-performance, pixel-perfect websites that help businesses grow online.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              style={{ fontSize: '16px', lineHeight: 1.8, color: '#888', marginBottom: '40px', textAlign: 'center' }}
            >
              My approach combines technical excellence with a deep focus on user experience. From custom theme development to complex WooCommerce integrations, I deliver solutions that are both beautiful and functional.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              onClick={() => onNavigate('contact')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#ff4747',
                color: '#fff',
                border: 'none',
                borderRadius: '9999px',
                padding: '12px 28px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                fontFamily: 'Outfit, sans-serif',
                transition: 'all 0.3s ease',
              }}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(255,71,71,0.3)' }}
            >
              Get in Touch <ArrowRight size={16} />
            </motion.button>
          </div>

          {/* Right — highlights */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="highlights-grid">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="glass-card"
                  style={{ padding: '24px', borderRadius: '20px', transition: 'all 0.3s ease', cursor: 'default', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,71,71,0.3)';
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,71,71,0.06)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(17,17,17,0.85)';
                  }}
                >
                  <div style={{ color: '#ff4747', marginBottom: '14px', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                  <p style={{ fontSize: '14px', color: '#ccc', fontWeight: 500, lineHeight: 1.5, margin: 0 }}>{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Location & experience row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-card about-info-row"
              style={{ marginTop: '16px', borderRadius: '20px', padding: '24px', display: 'flex', gap: '24px', alignItems: 'center' }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Location</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>Ahmedabad, India</div>
              </div>
              <div className="info-divider" style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Experience</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>5+ Years</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; text-align: center; }
          .about-grid > div:first-child { display: flex; flex-direction: column; align-items: center; }
          .about-grid p { margin-left: auto; margin-right: auto; }
        }
        @media (max-width: 767px) {
          .about-grid { gap: 40px !important; }
        }
        @media (max-width: 640px) {
          .highlights-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .about-info-row { flex-direction: column !important; text-align: center !important; gap: 16px !important; }
          .info-divider { width: 40px !important; height: 1px !important; margin: 0 auto !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
