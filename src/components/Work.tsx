import React from 'react';
import { motion } from 'motion/react';
import { Layout as LayoutIcon, ShoppingCart, Shield } from 'lucide-react';

const Work = () => {
  return (
    <div id="work" className="py-32 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
          <h2 className="text-5xl md:text-8xl font-black text-gradient tracking-tighter">How I Work</h2>
          <p className="text-text-dim max-w-xs font-medium">Tailored solutions for every business need, from startups to enterprises.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: <LayoutIcon size={32} />, title: 'Corporate Sites', desc: 'Professional, fast, and secure business presence.' },
            { icon: <ShoppingCart size={32} />, title: 'E-Commerce', desc: 'Custom stores built for high conversions.' },
            { icon: <Shield size={32} />, title: 'Security', desc: 'Hardened WordPress setups for peace of mind.' }
          ].map((item, idx) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-black p-12 rounded-[50px] shadow-xl border border-border group hover:bg-accent transition-all duration-500"
            >
              <div className="text-accent mb-8 group-hover:text-white transition-colors group-hover:scale-110">{item.icon}</div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors">{item.title}</h3>
              <p className="text-text-dim group-hover:text-white/80 transition-colors leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
