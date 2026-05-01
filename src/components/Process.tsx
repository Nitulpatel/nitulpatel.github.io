import React from 'react';
import { motion } from 'motion/react';
import { Globe, Layout as LayoutIcon, Code, Zap } from 'lucide-react';

const Process = () => {
  const steps = [
    { title: 'Discovery', desc: 'Understanding your goals, target audience, and project requirements deeply.', icon: <Globe size={22} />, num: '01' },
    { title: 'Design', desc: 'Crafting pixel-perfect layouts and user-centric interfaces in Figma.', icon: <LayoutIcon size={22} />, num: '02' },
    { title: 'Development', desc: 'Writing clean, efficient code and building custom WordPress solutions.', icon: <Code size={22} />, num: '03' },
    { title: 'Launch', desc: 'Rigorous testing, optimization, and deploying your site to the world.', icon: <Zap size={22} />, num: '04' },
  ];

  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }} />
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label"
          style={{ marginBottom: '16px' }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff4747', display: 'inline-block' }} />
          My Workflow
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 900, letterSpacing: '-0.04em',
            color: '#fff', margin: '0 0 48px', lineHeight: 1.05,
          }}
        >
          The <span style={{ color: '#ff4747' }}>Process</span>
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="process-grid">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card"
              style={{
                borderRadius: '24px', padding: '32px 28px',
                position: 'relative', overflow: 'hidden',
                cursor: 'default', transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,71,71,0.3)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,71,71,0.05)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(17,17,17,0.85)';
              }}
            >
              {/* Step num */}
              <div style={{
                position: 'absolute', top: '20px', right: '24px',
                fontSize: '36px', fontWeight: 900, color: 'rgba(255,255,255,0.04)',
                lineHeight: 1, userSelect: 'none',
              }}>{step.num}</div>

              <div style={{
                width: '48px', height: '48px',
                background: 'rgba(255,71,71,0.1)',
                border: '1px solid rgba(255,71,71,0.2)',
                borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#ff4747', marginBottom: '24px',
              }}>
                {step.icon}
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.02em' }}>{step.title}</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .process-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Process;
