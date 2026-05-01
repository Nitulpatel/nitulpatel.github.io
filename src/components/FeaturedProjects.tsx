import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface FeaturedProjectsProps { standalone?: boolean; }

type Category = 'All' | 'WordPress' | 'Custom' | 'Shopify';

interface Project {
  id: number;
  num: string;
  title: string;
  category: Exclude<Category, 'All'>;
  desc: string;
  img: string;
  link: string;
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    num: '01',
    title: 'E-Commerce Redesign',
    category: 'Custom' as any,
    desc: 'Full storefront overhaul with blazing performance and conversion-first UX — from product pages to streamlined checkout.',
    img: 'https://picsum.photos/seed/ecom2024/800/500',
    link: '#',
    tags: ['WooCommerce', 'PHP', 'React'],
  },
  {
    id: 2,
    num: '02',
    title: 'Corporate Portal',
    category: 'Custom',
    desc: 'Enterprise-grade intranet portal with role-based dashboards, real-time notifications, and pixel-perfect design system.',
    img: 'https://picsum.photos/seed/corp2024/800/500',
    link: '#',
    tags: ['WordPress', 'REST API', 'MySQL'],
  },
  {
    id: 3,
    num: '03',
    title: 'Artist Portfolio',
    category: 'WordPress',
    desc: 'Immersive gallery experience with cinematic transitions, zero-distraction layout and fullscreen gallery viewer.',
    img: 'https://picsum.photos/seed/artist2024/800/500',
    link: '#',
    tags: ['WordPress', 'ACF', 'GSAP'],
  },
  {
    id: 4,
    num: '04',
    title: 'Real Estate Platform',
    category: 'Custom',
    desc: 'Dynamic property search with interactive map integration, advanced smart filters and mortgage calculator.',
    img: 'https://picsum.photos/seed/realty2024/800/500',
    link: '#',
    tags: ['Next.js', 'API', 'Maps'],
  },
  {
    id: 5,
    num: '05',
    title: 'Shopify Fashion Store',
    category: 'Shopify',
    desc: 'High-converting fashion storefront with custom Shopify theme, lookbook pages and seamless mobile checkout.',
    img: 'https://picsum.photos/seed/fashion2024/800/500',
    link: '#',
    tags: ['Shopify', 'Liquid', 'JS'],
  },
  {
    id: 6,
    num: '06',
    title: 'Restaurant Website',
    category: 'WordPress',
    desc: 'Elegant restaurant site with online reservations, animated menu reveals and mouth-watering image-first layout.',
    img: 'https://picsum.photos/seed/resto2024/800/500',
    link: '#',
    tags: ['WordPress', 'OpenTable', 'CSS'],
  },
];

const FILTERS: Category[] = ['All', 'WordPress', 'Custom', 'Shopify'];

const FeaturedProjects = ({ standalone }: FeaturedProjectsProps) => {
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = PROJECTS.filter(p => activeFilter === 'All' || p.category === activeFilter);

  return (
    <section
      id="projects"
      className="section"
      style={{ position: 'relative', overflow: 'hidden', background: '#050505' }}
    >
      {/* Grid background */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.25 }} />

      {/* Top glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '80vw', height: '300px',
        background: 'radial-gradient(ellipse at top, rgba(255,71,71,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

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
          Selected Work
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', gap: '32px', flexWrap: 'wrap' }}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(36px, 5.5vw, 70px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: '#fff',
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            My <span style={{ color: '#ff4747' }}>Projects</span>
          </motion.h2>

          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ color: '#fff', borderColor: '#fff' }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              color: '#666', border: '1px solid rgba(255,255,255,0.15)',
              padding: '10px 22px', borderRadius: '9999px',
              fontWeight: 600, fontSize: '13px', letterSpacing: '0.04em',
              textDecoration: 'none', transition: 'all 0.25s ease',
            }}
          >
            View All <ArrowUpRight size={14} />
          </motion.a>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '48px' }}
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`pill-btn ${activeFilter === f ? 'active' : ''}`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 520px), 1fr))',
              gap: '32px',
            }}
          >
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onHoverStart={() => setHovered(project.id)}
                onHoverEnd={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Image */}
                <div style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  aspectRatio: '16/10',
                  marginBottom: '20px',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <motion.img
                    src={project.img}
                    alt={project.title}
                    animate={{ scale: hovered === project.id ? 1.06 : 1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />

                  {/* Hover Overlay */}
                  <AnimatePresence>
                    {hovered === project.id && (
                      <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          position: 'absolute', inset: 0,
                          background: 'rgba(0,0,0,0.6)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        <motion.a
                          href={project.link}
                          initial={{ scale: 0.85, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.85, opacity: 0 }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            background: '#ff4747', color: '#fff',
                            padding: '12px 26px', borderRadius: '9999px',
                            fontWeight: 700, fontSize: '13px',
                            letterSpacing: '0.04em', textDecoration: 'none',
                          }}
                        >
                          View Project <ArrowUpRight size={14} />
                        </motion.a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Badges */}
                  <span style={{
                    position: 'absolute', top: '14px', left: '14px',
                    fontSize: '11px', fontWeight: 700,
                    color: 'rgba(255,255,255,0.5)',
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(8px)',
                    padding: '4px 12px', borderRadius: '9999px',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    {project.num}
                  </span>
                  <span style={{
                    position: 'absolute', top: '14px', right: '14px',
                    fontSize: '10px', fontWeight: 700,
                    color: '#ff4747',
                    background: 'rgba(255,71,71,0.12)',
                    backdropFilter: 'blur(8px)',
                    padding: '4px 12px', borderRadius: '9999px',
                    border: '1px solid rgba(255,71,71,0.25)',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '0 4px' }}>
                  <h3 style={{
                    fontSize: 'clamp(18px, 2vw, 22px)',
                    fontWeight: 800, color: '#fff',
                    margin: '0 0 10px', letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#666', margin: '0 0 16px' }}>
                    {project.desc}
                  </p>
                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {project.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '11px', fontWeight: 600,
                        color: '#555', background: 'rgba(255,255,255,0.04)',
                        padding: '3px 10px', borderRadius: '9999px',
                        border: '1px solid rgba(255,255,255,0.07)',
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card"
          style={{
            marginTop: '64px',
            borderRadius: '28px',
            padding: 'clamp(40px, 5vw, 72px) clamp(28px, 4vw, 64px)',
            textAlign: 'center',
            position: 'relative', overflow: 'hidden',
            borderColor: 'rgba(255,71,71,0.12)',
          }}
        >
          <div style={{
            position: 'absolute', bottom: '-30%', left: '50%', transform: 'translateX(-50%)',
            width: '60%', height: '100%',
            background: 'radial-gradient(ellipse, rgba(255,71,71,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <p className="section-label" style={{ justifyContent: 'center', marginBottom: '20px' }}>
            ✦ Open to Work
          </p>
          <h3 style={{
            fontSize: 'clamp(26px, 4vw, 50px)',
            fontWeight: 900, letterSpacing: '-0.03em',
            color: '#fff', margin: '0 0 16px', lineHeight: 1.1,
          }}>
            Let's Build Something <span style={{ color: '#ff4747' }}>Extraordinary</span>
          </h3>
          <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.75, marginBottom: '40px', maxWidth: '440px', marginInline: 'auto' }}>
            Ready to start your next project? Let's create something unforgettable together.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(255,71,71,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: '#ff4747', color: '#fff', textDecoration: 'none',
              padding: '14px 36px', borderRadius: '9999px',
              fontWeight: 800, fontSize: '14px', letterSpacing: '0.04em',
              boxShadow: '0 0 30px rgba(255,71,71,0.25)',
            }}
          >
            Contact Me <ArrowUpRight size={15} />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturedProjects;
