import React from 'react';
import { motion } from 'motion/react';

const Stats = () => {
  const stats = [
    { value: '5+', label: 'Years of Experience' },
    { value: '120+', label: 'Projects Completed' },
    { value: '3', label: 'Countries Served' },
    { value: '30+', label: 'Custom Plugins' },
  ];

  return (
    <section style={{ padding: '48px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }} className="stats-grid">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{ textAlign: 'center', padding: '24px 16px' }}
            >
              <div style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 900,
                color: '#ff4747',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                marginBottom: '10px',
              }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: '#666', fontWeight: 500, letterSpacing: '0.02em' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </section>
  );
};

export default Stats;
