import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

type Page = 'home' | 'projects' | 'experience' | 'contact';

interface NavbarProps {
  activePage: Page;
  activeSection: string;
  onNavigate: (target: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  isPage: boolean;
}

// No hardcoded hrefs — all navigation is handled by onNavigate + BrowserRouter
const navItems: NavItem[] = [
  { id: 'home',       label: 'Home',       isPage: false },
  { id: 'about',      label: 'About',      isPage: false },
  { id: 'skills',     label: 'Skills',     isPage: false },
  { id: 'projects',   label: 'Projects',   isPage: true  },
  { id: 'experience', label: 'Experience', isPage: true  },
  { id: 'contact',    label: 'Contact',    isPage: true  },
];

const Navbar = ({ activePage, activeSection, onNavigate }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => { setMobileOpen(false); }, [activePage]);

  const isActive = (item: NavItem) => {
    if (item.isPage) return activePage === item.id;
    if (item.id === 'home') return activePage === 'home' && activeSection === 'home';
    return activePage === 'home' && activeSection === item.id;
  };

  const handleClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(id);
    setMobileOpen(false);
  };

  const linkStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
    color: active ? '#ff4747' : '#888',
    transition: 'color 0.2s ease',
    position: 'relative',
    padding: '4px 0',
    fontFamily: 'Outfit, sans-serif',
    cursor: 'pointer',
  });

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        ...(scrolled
          ? {
              background: 'rgba(5,5,5,0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '14px 0',
            }
          : { background: 'transparent', padding: '24px 0' }
        ),
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* ── Logo ── */}
        <motion.a
          href="#"
          onClick={(e) => handleClick('home', e)}
          whileHover={{ scale: 1.04 }}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
        >
          <span style={{
            width: '32px', height: '32px', background: '#ff4747',
            borderRadius: '8px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontWeight: 900, fontSize: '16px', color: '#fff',
          }}>N</span>
          <span style={{ fontWeight: 800, fontSize: '18px', color: '#fff', letterSpacing: '-0.02em' }}>
            Nitul<span style={{ color: '#ff4747' }}>.</span>
          </span>
        </motion.a>

        {/* ── Desktop Links ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="nav-desktop">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <a
                key={item.id}
                href="#"
                onClick={(e) => handleClick(item.id, e)}
                style={linkStyle(active)}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#888'; }}
              >
                {item.label}
                {item.isPage && (
                  <span style={{ fontSize: '9px', opacity: 0.45, lineHeight: 1, marginTop: '-2px' }}>↗</span>
                )}
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    style={{
                      position: 'absolute', bottom: '-2px', left: 0, right: 0,
                      height: '1.5px', background: '#ff4747', borderRadius: '2px',
                      display: 'block',
                    }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* ── Hire Me + Hamburger ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a
            className="hire-btn"
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
            style={{
              background: '#ff4747', color: '#fff',
              borderRadius: '9999px', padding: '10px 24px',
              fontWeight: 700, fontSize: '13px', cursor: 'pointer',
              transition: 'background 0.25s ease', fontFamily: 'Outfit, sans-serif',
              textDecoration: 'none', display: 'inline-block',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#cc2e2e')}
            onMouseLeave={e => (e.currentTarget.style.background = '#ff4747')}
          >
            Hire Me
          </a>
          <button
            className="hamburger-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center' }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              overflow: 'hidden',
              background: 'rgba(5,5,5,0.97)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href="#"
                  onClick={(e) => handleClick(item.id, e)}
                  style={{
                    textDecoration: 'none',
                    fontSize: '16px', fontWeight: 600,
                    color: isActive(item) ? '#ff4747' : '#888',
                    fontFamily: 'Outfit, sans-serif',
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}
                >
                  {item.label}
                  {item.isPage && <span style={{ fontSize: '10px', opacity: 0.45 }}>↗</span>}
                </a>
              ))}

              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate('contact'); setMobileOpen(false); }}
                style={{
                  background: '#ff4747', color: '#fff',
                  borderRadius: '9999px', padding: '12px 24px',
                  fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                  textAlign: 'center', fontFamily: 'Outfit, sans-serif',
                  textDecoration: 'none', display: 'block',
                }}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop  { display: none !important; }
          .hire-btn     { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-desktop   { display: flex !important; }
          .hire-btn      { display: inline-block !important; }
          .hamburger-btn { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
