import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (s: string) => void;
}

const Footer = ({ onNavigate }: FooterProps) => {
  const links = [
    { label: 'Home',       id: 'home'       },
    { label: 'About',      id: 'about'      },
    { label: 'Projects',   id: 'projects'   },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact',    id: 'contact'    },
  ];

  const socials = [
    { Icon: Github, href: '#', label: 'GitHub' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Mail, href: 'mailto:nitulpatel504@gmail.com', label: 'Email' },
  ];

  return (
    <footer style={{
      padding: '56px 0 40px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: '#050505',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60vw', height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(255,71,71,0.3), transparent)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }} className="footer-grid">

          {/* Brand */}
          <div>
            <div
              onClick={() => onNavigate('home')}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '16px' }}
            >
              <span style={{ width: '32px', height: '32px', background: '#ff4747', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '16px', color: '#fff' }}>N</span>
              <span style={{ fontWeight: 800, fontSize: '18px', color: '#fff' }}>Nitul<span style={{ color: '#ff4747' }}>.</span></span>
            </div>
            <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.7, margin: 0, maxWidth: '220px' }}>
              Crafting high-performance WordPress ecosystems with pixel-perfect precision.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px', marginTop: 0 }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {links.map(link => (
                <a
                  key={link.id}
                  href="#"
                  onClick={(e) => { e.preventDefault(); onNavigate(link.id); }}
                  style={{
                    textDecoration: 'none',
                    fontSize: '14px', color: '#666', display: 'block',
                    fontFamily: 'Outfit, sans-serif', transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ff4747')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#666')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px', marginTop: 0 }}>Connect</h4>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  title={label}
                  style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#555', transition: 'all 0.25s ease', textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = '#ff4747';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#ff4747';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,71,71,0.08)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#555';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p style={{ fontSize: '13px', color: '#555', margin: 0 }}>nitulpatel504@gmail.com</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{ fontSize: '13px', color: '#444', margin: 0 }}>
            © 2025 Nitul Patel. All rights reserved.
          </p>
          <p style={{ fontSize: '13px', color: '#444', margin: 0 }}>
            Built with <span style={{ color: '#ff4747' }}>♥</span> using React & TypeScript
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .footer-bottom { flex-direction: column !important; text-align: center; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
