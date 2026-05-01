import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialGridProps {
  testimonials: Testimonial[];
}

const TestimonialGrid = ({ testimonials }: TestimonialGridProps) => {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto bg-[var(--bg)]">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-black text-gradient tracking-tighter">All Submissions</h2>
          <p className="text-text-dim mt-4 max-w-md">Browse through all the messages and feedback shared by clients and visitors.</p>
        </div>
        <div className="bg-accent/5 px-6 py-3 rounded-2xl border border-accent/10">
          <span className="text-accent font-black text-2xl">{testimonials.length}</span>
          <span className="text-text-dim text-xs uppercase tracking-widest ml-2 font-bold">Total Entries</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white p-8 rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all group"
          >
            <Quote className="text-accent/10 mb-6 group-hover:text-accent/20 transition-colors" size={40} />
            <p className="text-text leading-relaxed mb-8 italic">"{t.message}"</p>
            <div className="pt-6 border-t border-border flex items-center justify-between">
              <div>
                <h4 className="font-bold text-accent">{t.name}</h4>
                <p className="text-[9px] text-text-dim uppercase tracking-widest mt-0.5">
                  {t.email.replace(/(.{2}).*(@.*)/, '$1***$2')}
                </p>
              </div>
              <p className="text-[9px] text-text-dim font-bold">{new Date(t.date).toLocaleDateString()}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialGrid;
