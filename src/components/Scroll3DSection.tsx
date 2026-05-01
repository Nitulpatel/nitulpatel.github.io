import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Zap, Shield, Layers, Globe } from 'lucide-react';

const Scroll3DSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-32 bg-bg-alt overflow-hidden perspective-1000">
      <motion.div 
        style={{ rotateX, scale, opacity }}
        className="max-w-7xl mx-auto px-6 text-center preserve-3d"
      >
        <h2 className="text-6xl md:text-9xl font-black text-gradient tracking-tighter mb-12">
          Future Proof<br />Solutions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Zap />, label: "Performance" },
            { icon: <Shield />, label: "Security" },
            { icon: <Layers />, label: "Scalability" },
            { icon: <Globe />, label: "Global Reach" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              className="bg-white dark:bg-black p-10 rounded-[40px] shadow-2xl border border-border flex flex-col items-center gap-4"
              style={{ translateZ: 50 + i * 20 }}
            >
              <div className="text-accent">{item.icon}</div>
              <span className="font-black text-xs uppercase tracking-widest">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Scroll3DSection;
