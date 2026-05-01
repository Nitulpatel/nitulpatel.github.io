import React from 'react';
import { motion } from 'motion/react';

const SKILLS = [
  { name: 'WordPress', level: 98 },
  { name: 'PHP 8+', level: 92 },
  { name: 'WooCommerce', level: 95 },
  { name: 'React / Next.js', level: 85 },
  { name: 'JavaScript / ES6+', level: 90 },
  { name: 'MySQL', level: 88 },
  { name: 'Tailwind CSS', level: 92 },
  { name: 'Figma / UI Design', level: 80 },
  { name: 'REST API / GraphQL', level: 84 },
  { name: 'DevOps / cPanel', level: 78 },
];

const TOOLS = ['WordPress', 'PHP', 'WooCommerce', 'React', 'Next.js', 'Tailwind CSS', 'MySQL', 'JavaScript', 'TypeScript', 'Figma', 'Git', 'Docker', 'REST API', 'GraphQL', 'Elementor', 'ACF Pro'];

const Skills = () => {
  return (
    <section id="skills" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Dark bg */}
      <div style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }} />
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label"
          style={{ marginBottom: '16px' }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff4747', display: 'inline-block' }} />
          My Skills
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: '#fff',
            margin: '0 0 24px',
            lineHeight: 1.05,
          }}
        >
          Technical <span style={{ color: '#ff4747' }}>Arsenal</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: '16px', color: '#666', marginBottom: '56px', maxWidth: '480px', lineHeight: 1.7 }}
        >
          Equipped with the latest technologies to build robust, scalable, and beautiful digital products.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }} className="skills-grid">
          {/* Skill bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#ccc' }}>{skill.name}</span>
                  <span style={{ fontSize: '13px', color: '#ff4747', fontWeight: 700 }}>{skill.level}%</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 + 0.3, duration: 0.8, ease: 'easeOut' }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(to right, #ff4747, #ff8080)',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tool tags */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '28px', letterSpacing: '0.02em' }}>
              Tools & Technologies
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {TOOLS.map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.08, borderColor: '#ff4747', color: '#ff4747' }}
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#888',
                    cursor: 'default',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>

            {/* Info card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-card"
              style={{ marginTop: '40px', borderRadius: '20px', padding: '28px', borderColor: 'rgba(255,71,71,0.2)' }}
            >
              <div style={{ fontSize: '13px', color: '#ff4747', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>✦ Always Learning</div>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7, margin: 0 }}>
                Staying ahead of the curve — continuously exploring new tools, frameworks, and best practices to deliver cutting-edge solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 767px) {
          .skills-grid { gap: 40px !important; }
        }
      `}</style>
    </section>
  );
};

export default Skills;
