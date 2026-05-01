import React from 'react';
import { motion } from 'motion/react';
import { Building, ShoppingCart, HeartPulse, GraduationCap, Briefcase, Wrench } from 'lucide-react';

interface FeaturedProjectsProps { standalone?: boolean; }

const CARDS = [
  {
    title: 'Corporate & Business Sites',
    subtitle: 'How I Build It',
    description: 'Brand audit and sitemap first. Custom WordPress pixel‑by‑pixel — smooth transitions, contact forms, WPML multi‑language, and Core Web Vitals as standard.',
    icon: <Building size={28} />,
    chips: ['Custom Theme', 'WPML', 'SEO', 'Performance'],
  },
  {
    title: 'E-Commerce Stores',
    subtitle: 'How I Build It',
    description: 'WooCommerce from scratch — custom checkout, payment gateways (Razorpay, Stripe, PayPal), inventory, and conversion‑optimised product pages. Every cart interaction AJAX‑powered.',
    icon: <ShoppingCart size={28} />,
    chips: ['WooCommerce', 'Stripe', 'AJAX Cart', 'Razorpay'],
  },
  {
    title: 'Healthcare & Medical Sites',
    subtitle: 'How I Build It',
    description: 'Accessibility (WCAG 2.1) is non‑negotiable. Custom CPTs for doctor directories, appointment booking, secure patient forms, and schema markup for strong Google rankings.',
    icon: <HeartPulse size={28} />,
    chips: ['WCAG 2.1', 'Custom CPT', 'Schema', 'Booking'],
  },
  {
    title: 'Conference & Education Sites',
    subtitle: 'How I Build It',
    description: 'Event‑driven sites with speaker/schedule CPTs, registration flows, countdown timers, abstract portals, and tight deadline deployments with staging environments and rollback plans.',
    icon: <GraduationCap size={28} />,
    chips: ['Event CPT', 'Registration', 'Staging', 'Countdown'],
  },
  {
    title: 'Investment & Finance Sites',
    subtitle: 'How I Build It',
    description: 'Trust drives every decision. Clean layouts with secure forms, portfolio CPTs, PDF downloads, SSL, 2FA, and role‑based access control for sensitive client data.',
    icon: <Briefcase size={28} />,
    chips: ['Security', 'Custom CPT', 'PDF', '2FA'],
  },
  {
    title: 'Technology & IT Firms',
    subtitle: 'How I Build It',
    description: 'Service‑rich sites with animated showcases, live chat, and case study templates. Technical audiences expect speed — lazy loading, minification, and CDN delivery always in scope.',
    icon: <Wrench size={28} />,
    chips: ['Performance', 'CDN', 'Animations', 'Case Studies'],
  },
];

const FeaturedProjects = ({ standalone }: FeaturedProjectsProps) => {
  return (
    <section
      id="projects"
      className="section"
      style={{ position: 'relative', overflow: 'hidden', background: '#050505' }}
    >
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.18 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label"
          style={{ marginBottom: '16px' }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff4747', display: 'inline-block' }} />
          Industry experience
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '20px', maxWidth: '720px' }}
        >
          <h2 style={{
            fontSize: 'clamp(36px, 5.5vw, 70px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: '#fff',
            margin: 0,
            lineHeight: 1.05,
          }}>
            How I Build It
          </h2>
          <p style={{ color: '#666', fontSize: '16px', lineHeight: 1.8, marginTop: '18px' }}>
            Tailored solutions for the kind of sites shown here: business, ecommerce, healthcare, events, finance, and technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="featured-cards"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(260px, 1fr))',
            gap: '32px',
          }}
        >
          {CARDS.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card featured-card"
              style={{
                borderRadius: '32px',
                padding: '36px',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              <div>
                <div style={{
                  width: '44px',
                  height: '44px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '16px',
                  background: 'rgba(255,71,71,0.12)',
                  color: '#ff4747',
                  marginBottom: '18px',
                }}>
                  {card.icon}
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <div style={{
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#999',
                    marginBottom: '10px',
                  }}>
                    {card.subtitle}
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: 800,
                    color: '#fff',
                    margin: 0,
                    lineHeight: 1.2,
                  }}>
                    {card.title}
                  </h3>
                </div>
                <p style={{ color: '#b0b0b0', fontSize: '15px', lineHeight: 1.8, margin: 0 }}>
                  {card.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '28px' }}>
                {card.chips.map(chip => (
                  <span key={chip} style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#999',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .featured-cards {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 768px) {
          .featured-cards {
            grid-template-columns: 1fr !important;
          }

          .featured-card {
            padding: 28px !important;
            min-height: auto !important;
          }
        }

        @media (max-width: 560px) {
          .featured-card {
            padding: 22px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedProjects;
