import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Preloader = () => {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  // Animate counter 0 → 100 over ~1.8s
  useEffect(() => {
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = 100 / (duration / step);

    let timer: ReturnType<typeof setInterval>;
    timer = setInterval(() => {
      start += increment;
      if (start >= 100) {
        setCount(100);
        clearInterval(timer);
        setTimeout(() => setDone(true), 400);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(12px)',
          }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9000,
            background: '#050505',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '40px',
            overflow: 'hidden',
          }}
        >
          {/* Ambient red glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,71,71,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Logo mark */}
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }}
          >
            {/* Spinning ring around logo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                left: '-8px', top: '-8px',
                width: '64px', height: '64px',
                borderRadius: '16px',
                border: '1.5px solid transparent',
                background: 'linear-gradient(#050505, #050505) padding-box, conic-gradient(from 0deg, #ff4747, transparent 40%, #ff4747) border-box',
              }}
            />

            <div style={{
              width: '48px', height: '48px',
              background: 'linear-gradient(135deg, #ff4747, #ff8080)',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: '24px', color: '#fff',
              boxShadow: '0 8px 32px rgba(255,71,71,0.4)',
              position: 'relative', zIndex: 1,
            }}>N</div>

            <span style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 900,
              fontSize: '32px',
              color: '#fff',
              letterSpacing: '-0.04em',
            }}>
              Nitul<span style={{ color: '#ff4747' }}>.</span>
            </span>
          </motion.div>

          {/* Counter + progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '220px' }}
          >
            {/* Numeric counter */}
            <div style={{
              fontSize: '13px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.12em',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {String(count).padStart(3, '0')}
            </div>

            {/* Progress bar */}
            <div style={{
              width: '100%', height: '1.5px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '2px',
              overflow: 'hidden',
              position: 'relative',
            }}>
              <motion.div
                style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  background: 'linear-gradient(90deg, #cc2e2e, #ff4747, #ff8080)',
                  borderRadius: '2px',
                  width: `${count}%`,
                }}
              />
              {/* Shimmer on fill */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: 0, bottom: 0,
                  width: '40%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  borderRadius: '2px',
                }}
              />
            </div>
          </motion.div>

          {/* Horizontal scan lines */}
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 0.06, 0] }}
              transition={{ duration: 1.8, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                left: 0, right: 0,
                top: `${30 + i * 20}%`,
                height: '1px',
                background: 'rgba(255,71,71,0.5)',
                transformOrigin: 'left',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
