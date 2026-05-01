import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const CustomCursor = () => {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Dot — snappy
  const dotX = useSpring(rawX, { stiffness: 900, damping: 45, mass: 0.3 });
  const dotY = useSpring(rawY, { stiffness: 900, damping: 45, mass: 0.3 });

  // Ring — laggy / magnetic
  const ringX = useSpring(rawX, { stiffness: 180, damping: 26, mass: 0.9 });
  const ringY = useSpring(rawY, { stiffness: 180, damping: 26, mass: 0.9 });

  // Trail
  const MAX_TRAILS = 10;
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const trailIdRef = useRef(0);
  const frameRef   = useRef(0);
  const rippleIdRef = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setHidden(false);

      frameRef.current++;
      if (frameRef.current % 2 === 0) {
        setTrails(prev => [
          { x: e.clientX, y: e.clientY, id: trailIdRef.current++ },
          ...prev.slice(0, MAX_TRAILS - 1),
        ]);
      }
    };

    const onEnter = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, [data-cursor-hover]');
      setHovering(!!el);
    };

    const onDown = (e: MouseEvent) => {
      setClicking(true);
      // spawn ripple at click position
      setRipples(prev => [
        ...prev,
        { id: rippleIdRef.current++, x: e.clientX, y: e.clientY },
      ]);
    };

    const onUp    = () => setClicking(false);
    const onLeave = () => setHidden(true);
    const onBack  = () => setHidden(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onEnter);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onBack);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onEnter);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onBack);
    };
  }, [rawX, rawY]);

  // Decay trail
  useEffect(() => {
    const t = setInterval(() => setTrails(p => p.slice(0, -1)), 55);
    return () => clearInterval(t);
  }, []);

  // Remove old ripples
  const removeRipple = (id: number) =>
    setRipples(prev => prev.filter(r => r.id !== id));

  return (
    <div style={{ pointerEvents: 'none', display: window.innerWidth >= 1024 ? 'block' : 'none' }}>

      {/* Trail particles */}
      {trails.map((t, i) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0.55, scale: 1 }}
          animate={{ opacity: 0, scale: 0.15 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            left: t.x - 3,
            top:  t.y - 3,
            width: 6, height: 6,
            borderRadius: '50%',
            background: `rgba(255, ${Math.min(255, 71 + i * 9)}, 71, ${Math.max(0, 0.55 - i * 0.05)})`,
            zIndex: 9984 - i,
          }}
        />
      ))}

      {/* Click ripples — multiple simultaneous */}
      {ripples.map(r => (
        <motion.div
          key={r.id}
          initial={{ scale: 0, opacity: 0.7 }}
          animate={{ scale: 5,  opacity: 0   }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          onAnimationComplete={() => removeRipple(r.id)}
          style={{
            position: 'fixed',
            left: r.x - 10,
            top:  r.y - 10,
            width: 20, height: 20,
            borderRadius: '50%',
            border: '1.5px solid rgba(255,71,71,0.8)',
            zIndex: 9986,
          }}
        />
      ))}

      {/* Outer ring */}
      <motion.div
        style={{
          position: 'fixed',
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9990,
          opacity: hidden ? 0 : 1,
          transition: 'opacity 0.2s',
          border: '1.5px solid rgba(255,71,71,0.45)',
          borderRadius: '50%',
        }}
        animate={{
          width:        hovering ? 54 : clicking ? 18 : 38,
          height:       hovering ? 54 : clicking ? 18 : 38,
          borderRadius: hovering ? '10px' : '50%',
          borderColor:  hovering ? 'rgba(255,71,71,0.9)' : 'rgba(255,71,71,0.45)',
          background:   hovering ? 'rgba(255,71,71,0.07)' : 'transparent',
          rotate:       hovering ? 45 : 0,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      />

      {/* Inner dot */}
      <motion.div
        style={{
          position: 'fixed',
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          zIndex: 9999,
          opacity: hidden ? 0 : 1,
          transition: 'opacity 0.2s',
        }}
        animate={{
          width:     hovering ? 5 : clicking ? 4 : 8,
          height:    hovering ? 5 : clicking ? 4 : 8,
          background: hovering ? '#ffffff' : '#ff4747',
          scale:     clicking ? 0.5 : 1,
          boxShadow: hovering
            ? '0 0 10px rgba(255,255,255,0.5)'
            : clicking
              ? '0 0 18px rgba(255,71,71,0.9)'
              : '0 0 7px rgba(255,71,71,0.5)',
        }}
        transition={{ type: 'spring', stiffness: 700, damping: 32 }}
      />
    </div>
  );
};

export default CustomCursor;
