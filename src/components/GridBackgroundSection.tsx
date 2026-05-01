import React from 'react';
import { motion } from 'motion/react';
import { Layers } from 'lucide-react';

const GridBackgroundSection = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-[var(--bg)]">
      <div className="absolute inset-0 grid-pattern" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 text-accent text-xs font-black uppercase tracking-widest mb-6"
            >
              <Layers size={16} />
              Creative Architecture
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-gradient tracking-tighter mb-8"
            >
              Structured for Success
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-dim leading-relaxed text-lg"
            >
              Every project starts with a solid foundation. I use a grid-based approach to ensure perfect alignment, visual hierarchy, and a seamless user experience across all devices.
            </motion.p>
          </div>

          <div className="relative h-[400px]">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute bg-accent/5 border border-accent/10 rounded-3xl p-8 shadow-sm backdrop-blur-sm"
                style={{
                  width: 200 + i * 20,
                  height: 150 + i * 10,
                  left: i * 10 + '%',
                  top: i * 10 + '%',
                  zIndex: i
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, i % 2 === 0 ? 5 : -5, 0]
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-8 h-1 bg-accent/20 rounded-full mb-4" />
                <div className="w-full h-2 bg-accent/10 rounded-full mb-2" />
                <div className="w-2/3 h-2 bg-accent/10 rounded-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GridBackgroundSection;
