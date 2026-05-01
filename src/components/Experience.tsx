import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';

interface ExperienceProps { standalone?: boolean; }

const experiences = [
  {
    year: '2023 – Present',
    role: 'Senior WordPress Architect',
    company: 'Freelance / Global Clients',
    desc: 'Leading high-end WordPress projects, focusing on headless architectures and complex WooCommerce ecosystems for international clients.',
    tags: ['WordPress', 'React', 'WooCommerce', 'Headless'],
    icon: '🚀',
  },
  {
    year: '2021 – 2023',
    role: 'Full-Stack Developer',
    company: 'Tech Solutions Inc.',
    desc: 'Developed custom plugins and themes for enterprise-level clients, improving site performance by 40% across all deliverables.',
    tags: ['PHP', 'JavaScript', 'MySQL', 'REST API'],
    icon: '⚡',
  },
  {
    year: '2019 – 2021',
    role: 'Junior Web Developer',
    company: 'Creative Agency',
    desc: 'Started the journey with WordPress, mastering theme customization, PHP fundamentals, and front-end development.',
    tags: ['HTML', 'CSS', 'PHP', 'WordPress'],
    icon: '🌱',
  },
];

/* ── Card content ─────────────────────────────────────────────────────────── */
function CardContent({ exp, align }: { exp: typeof experiences[0]; align: 'left' | 'right' }) {
  return (
    <motion.div
      className="glass-card"
      whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,71,71,0.2)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ borderRadius: '24px', padding: '32px', textAlign: align }}
    >
      <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
        {exp.role}
      </h3>
      <p style={{ fontSize: '13px', color: '#ff4747', fontWeight: 600, margin: '0 0 16px' }}>
        {exp.company}
      </p>
      <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.75, margin: '0 0 20px' }}>
        {exp.desc}
      </p>
      <div style={{
        display: 'flex', gap: '8px', flexWrap: 'wrap',
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      }}>
        {exp.tags.map(tag => (
          <span key={tag} style={{
            fontSize: '11px', fontWeight: 600,
            padding: '4px 12px', borderRadius: '9999px',
            background: 'rgba(255,71,71,0.08)',
            border: '1px solid rgba(255,71,71,0.18)',
            color: '#ff4747',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Individual row ───────────────────────────────────────────────────────── */
function ExperienceCard({ exp, index }: { exp: typeof experiences[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;

  const yearLabel = (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? 24 : -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        fontSize: '11px', fontWeight: 700,
        color: 'rgba(255,71,71,0.6)',
        letterSpacing: '0.2em', textTransform: 'uppercase',
        paddingTop: '14px',
      }}
    >
      {exp.year}
    </motion.div>
  );

  return (
    <div
      ref={ref}
      className={`exp-row ${isLeft ? 'exp-left' : 'exp-right'}`}
      style={{
        display: 'grid',
        alignItems: 'start',
        marginBottom: '56px',
        position: 'relative',
        gap: '24px',
      }}
    >
      {/* Center — icon + connector (moves to left on mobile) */}
      <div className="exp-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15, type: 'spring', stiffness: 400 }}
          style={{
            width: 48, height: 48, borderRadius: '14px',
            background: 'linear-gradient(135deg, #ff4747, #ff8080)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px',
            boxShadow: '0 0 24px rgba(255,71,71,0.45)',
            flexShrink: 0, position: 'relative', zIndex: 2,
          }}
        >
          {exp.icon}
          {/* Pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.65], opacity: [0.45, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'absolute', inset: -2,
              borderRadius: '16px',
              border: '1.5px solid rgba(255,71,71,0.6)',
            }}
          />
        </motion.div>

        {/* Connector */}
        {index < experiences.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: 'easeInOut' }}
            style={{
              width: 2, flexGrow: 1, minHeight: 80,
              background: 'linear-gradient(to bottom, rgba(255,71,71,0.6), rgba(255,71,71,0.04))',
              transformOrigin: 'top', marginTop: 6,
            }}
          />
        )}
      </div>

      <div className="mobile-year-label">
        {exp.year}
      </div>

      {/* Content wrapper */}
      <div className="exp-content">
        <CardContent exp={exp} align={isLeft ? 'right' : 'left'} />
      </div>

      {/* Desktop Year label */}
      <div className="exp-year desktop-only">
        {yearLabel}
      </div>
    </div>
  );
}

/* ── Main section ─────────────────────────────────────────────────────────── */
const Experience = ({ standalone }: ExperienceProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const glowO  = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.16, 0]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Parallax bg layer */}
      <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#080808', y: bgY }} />
      <div className="grid-bg" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.18 }} />

      {/* Scroll-driven glow */}
      <motion.div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          marginLeft: '-350px',
          width: '700px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,71,71,0.15) 0%, transparent 70%)',
          opacity: glowO,
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label"
          style={{ marginBottom: '16px' }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff4747', display: 'inline-block' }} />
          My Journey
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 900, letterSpacing: '-0.04em',
            color: '#fff', margin: '0 0 48px', lineHeight: 1.05,
          }}
        >
          Work <span style={{ color: '#ff4747' }}>Experience</span>
        </motion.h2>

        {experiences.map((exp, i) => (
          <ExperienceCard key={i} exp={exp} index={i} />
        ))}

      </div>

      <style>{`
        .exp-row { grid-template-columns: 1fr 56px 1fr; }
        .exp-left .exp-content { grid-column: 1; grid-row: 1; padding-right: 16px; text-align: right; }
        .exp-left .exp-center { grid-column: 2; grid-row: 1; }
        .exp-left .exp-year { grid-column: 3; grid-row: 1; padding-left: 16px; text-align: left; }

        .exp-right .exp-content { grid-column: 3; grid-row: 1; padding-left: 16px; text-align: left; }
        .exp-right .exp-center { grid-column: 2; grid-row: 1; }
        .exp-right .exp-year { grid-column: 1; grid-row: 1; padding-right: 16px; text-align: right; }

        .mobile-year-label { display: none; }

        @media (max-width: 992px) {
          .exp-row { grid-template-columns: 48px 1fr !important; gap: 0 20px !important; margin-bottom: 40px !important; }
          
          .mobile-year-label {
            display: block;
            grid-column: 2;
            grid-row: 1;
            font-size: 11px; font-weight: 700;
            color: rgba(255,71,71,0.6);
            letter-spacing: 0.2em; text-transform: uppercase;
            margin-bottom: 12px;
            padding-top: 4px;
          }
          
          .exp-left .exp-content, .exp-right .exp-content {
            grid-column: 2 !important; grid-row: 2 !important;
            padding: 0 !important; text-align: left !important;
          }
          
          .exp-left .exp-center, .exp-right .exp-center {
            grid-column: 1 !important; grid-row: 2 !important;
          }
          
          .desktop-only { display: none !important; }

          .glass-card { text-align: left !important; padding: 24px !important; }
          .glass-card > div { justify-content: flex-start !important; }
        }
      `}</style>
    </section>
  );
};

export default Experience;
