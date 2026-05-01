import React from 'react';
import { motion } from 'motion/react';
import { Building, ShoppingCart, HeartPulse, GraduationCap, Briefcase, Wrench } from 'lucide-react';

const Work = () => {
  return (
    <div id="work" className="py-32 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
          <h2 className="text-5xl md:text-8xl font-black text-gradient tracking-tighter">How I Build It</h2>
          <p className="text-text-dim max-w-xs font-medium">Crafting polished sites with custom WordPress, WooCommerce, and high-converting interfaces.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: <Building size={32} />, title: 'Corporate / Business', desc: 'Brand-first WordPress sites with smooth transitions, custom themes, and SEO-ready performance.' },
            { icon: <ShoppingCart size={32} />, title: 'E-Commerce Stores', desc: 'WooCommerce builds with custom checkout, payment gateways, inventory, and conversion-focused UX.' },
            { icon: <HeartPulse size={32} />, title: 'Healthcare & Medical', desc: 'Accessible appointment booking, secure patient forms, and schema-rich pages for strong rankings.' },
            { icon: <GraduationCap size={32} />, title: 'Conference & Education', desc: 'Event-driven sites with schedules, registration flows, countdowns, and stage-managed rollouts.' },
            { icon: <Briefcase size={32} />, title: 'Investment & Finance', desc: 'Trustworthy layouts with secure forms, portfolio presentation, PDF downloads, and access control.' },
            { icon: <Wrench size={32} />, title: 'Technology & IT', desc: 'Service-rich sites with animated showcases, live chat, and fast, modern delivery pipelines.' },
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
