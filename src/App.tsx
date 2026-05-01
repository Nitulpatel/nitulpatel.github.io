/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * App.tsx — Application shell
 * Responsibilities:
 *   1. Detect the dynamic tenant basename (subpath OR subdomain)
 *   2. Provide RouteCtx so any component can read { tenant, strategy }
 *   3. Mount BrowserRouter with the detected basename
 *   4. Render global chrome: Navbar, Footer, scroll bar, cursor, back-to-top
 *   5. Route to the correct page component
 *   6. Own shared state: activeSection, testimonials
 */

import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Testimonial } from './types';

// ── Global chrome ────────────────────────────────────────────────────────────
import Preloader    from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import BackToTop    from './components/BackToTop';
import Navbar       from './components/Navbar';
import Footer       from './components/Footer';

// ── Pages ────────────────────────────────────────────────────────────────────
import HomePage       from './pages/HomePage';
import ProjectsPage   from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage    from './pages/ContactPage';
import AdminPage      from './pages/AdminPage';

// ─── Types ───────────────────────────────────────────────────────────────────

type Page         = 'home' | 'projects' | 'experience' | 'contact' | 'admin';
type RouteStrategy = 'subdomain' | 'subpath';

interface RouteContext {
  tenant:   string | null; // "nitul", "john", or null when at root
  basename: string;        // "/" or "/nitul/"
  strategy: RouteStrategy;
}

// ─── Route detection (runs ONCE at module load) ───────────────────────────────
//
// Known "leaf" page segments — everything in the URL BEFORE these is the tenant prefix.
const PAGE_ROUTES: string[] = ['projects', 'experience', 'contact', 'admin'];

/**
 * detectRouteContext()
 *
 * Strategy A — Subdomain   (nitul.yoursite.com)
 *   → tenant = "nitul", basename = "/"
 *
 * Strategy B — Subpath     (yoursite.com/nitul/projects)
 *   → tenant = "nitul", basename = "/nitul/"
 *
 * Works with localhost, plain domains, and fully-qualified subdomains.
 * Nothing is ever hardcoded.
 */
function detectRouteContext(): RouteContext {
  const { hostname, pathname } = window.location;

  // ── A: Subdomain ──────────────────────────────────────────────────────────
  const hostParts = hostname.split('.');
  const isSubdomain =
    hostParts.length >= 3 &&
    hostParts[0] !== 'www' &&
    !hostname.startsWith('localhost');

  if (isSubdomain) {
    return { tenant: hostParts[0], basename: '/', strategy: 'subdomain' };
  }

  // ── B: Subpath ────────────────────────────────────────────────────────────
  const segments  = pathname.split('/').filter(Boolean);
  const routeIdx  = segments.findIndex(seg => PAGE_ROUTES.includes(seg));

  if (routeIdx === -1) {
    // No page route in path → the whole path is the basename  (e.g. /nitul/)
    const tenant   = segments.length > 0 ? segments[segments.length - 1] : null;
    const basename = segments.length > 0 ? '/' + segments.join('/') + '/' : '/';
    return { tenant, basename, strategy: 'subpath' };
  }

  // Segments before the first page route form the tenant prefix
  const baseSegs = segments.slice(0, routeIdx);
  const tenant   = baseSegs.length > 0 ? baseSegs[baseSegs.length - 1] : null;
  const basename = baseSegs.length > 0 ? '/' + baseSegs.join('/') + '/' : '/';
  return { tenant, basename, strategy: 'subpath' };
}

const ROUTE_CTX = detectRouteContext();

// ─── Context ──────────────────────────────────────────────────────────────────

const RouteCtxContext = createContext<RouteContext>({
  tenant:   null,
  basename: '/',
  strategy: 'subpath',
});

/**
 * useTenant()
 * Call from any component to read { tenant, basename, strategy }.
 *
 * @example
 *   const { tenant } = useTenant();
 *   // tenant === "nitul"
 */
export const useTenant = () => useContext(RouteCtxContext);

// ─── AppContent ───────────────────────────────────────────────────────────────
// Must live inside <BrowserRouter> to use Router hooks.

function AppContent() {
  const location = useLocation();
  const navigate  = useNavigate();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [activeSection, setActiveSection] = useState<string>('home');
  const [testimonials,  setTestimonials]  = useState<Testimonial[]>([]);

  // BrowserRouter strips basename → pathname is relative (e.g. "/projects")
  const routePath = location.pathname.replace(/^\//, '').replace(/\/$/, '');
  const page: Page = (PAGE_ROUTES.includes(routePath) ? routePath : 'home') as Page;

  // ── Data ────────────────────────────────────────────────────────────────────

  const fetchTestimonials = useCallback(async () => {
    try {
      const res  = await fetch('/api/testimonials', { credentials: 'same-origin' });
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error('Failed to fetch testimonials', err);
    }
  }, []);

  useEffect(() => { fetchTestimonials(); }, [fetchTestimonials]);

  // ── Scroll-to-top on route change ──────────────────────────────────────────

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setActiveSection(page === 'home' ? 'home' : page);
  }, [location.pathname, page]);

  // ── Navigation ─────────────────────────────────────────────────────────────
  // ALWAYS relative — BrowserRouter prepends basename automatically.
  //   navigate('projects')  →  /nitul/projects  ✅
  //   navigate('..')        →  /nitul/          ✅  (up from a sub-page)

  const handleNavigate = useCallback((target: string) => {
    if (PAGE_ROUTES.includes(target)) {
      navigate(target);   // relative page navigation
      return;
    }

    if (page !== 'home') {
      navigate('..');     // back to basename root, then scroll
      setActiveSection(target);
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 350);  // 350ms: enough time for home page to mount & render
      return;
    }

    // Already on home → just scroll
    setActiveSection(target);
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [navigate, page]);

  // ── Active-section observer (home only) ─────────────────────────────────────

  useEffect(() => {
    if (page !== 'home') return;
    const ids = ['home', 'about', 'skills'];
    const observers: IntersectionObserver[] = [];

    const timer = setTimeout(() => {
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const obs = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
          { threshold: 0.45, rootMargin: '-60px 0px' },
        );
        obs.observe(el);
        observers.push(obs);
      });
    }, 200);

    return () => { clearTimeout(timer); observers.forEach(o => o.disconnect()); };
  }, [page]);

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* Pre-loader (home only) */}
      {page === 'home' && <Preloader />}

      {/* Global chrome */}
      <CustomCursor />
      <BackToTop />

      {/* Scroll progress bar */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(to right, #ff4747, #ff8080)',
          transformOrigin: 'left', scaleX, zIndex: 200,
        }}
      />

      {/* Navigation */}
      <Navbar
        activePage={page}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* ── Routes ──
           path=""         → /nitul/
           path="projects" → /nitul/projects
           All paths are RELATIVE to the basename BrowserRouter was given.
      */}
      <Routes>
        <Route path="/"           element={<HomePage      onNavigate={handleNavigate} />} />
        <Route path="/projects"   element={<ProjectsPage  />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/contact"    element={<ContactPage   onSubmissionSuccess={fetchTestimonials} />} />
        {/* Admin — not linked in UI, only accessible by direct URL */}
        <Route path="/admin"      element={<AdminPage />} />
        {/* 404 → fall back to home */}
        <Route path="*"           element={<HomePage      onNavigate={handleNavigate} />} />
      </Routes>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <RouteCtxContext.Provider value={ROUTE_CTX}>
      <BrowserRouter basename={ROUTE_CTX.basename}>
        <AppContent />
      </BrowserRouter>
    </RouteCtxContext.Provider>
  );
}
