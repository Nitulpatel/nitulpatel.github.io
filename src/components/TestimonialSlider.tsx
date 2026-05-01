import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

const TestimonialSlider = ({ testimonials }: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-[var(--bg-alt)] overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 text-accent text-xs font-black uppercase tracking-widest mb-6"
        >
          <MessageSquare size={16} />
          Client Testimonials
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-black mb-12 text-gradient"
        >
          What People Say
        </motion.h2>
        
        <div className="relative glass p-10 md:p-16 rounded-[40px] shadow-2xl border border-white/20">
          <Quote className="absolute top-8 left-8 text-accent/10" size={80} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -10 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 relative z-10"
            >
              <p className="text-xl md:text-2xl italic text-text leading-relaxed font-medium">
                "{testimonials[currentIndex].message}"
              </p>
              <div className="flex flex-col items-center">
                <div className="w-12 h-1 bg-accent/20 rounded-full mb-4" />
                <h4 className="text-lg font-bold text-accent">{testimonials[currentIndex].name}</h4>
                <p className="text-[10px] text-text-dim uppercase tracking-widest mt-1 font-black">
                  {new Date(testimonials[currentIndex].date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-6 mt-12">
            <button onClick={prev} className="p-3 rounded-full border border-border hover:bg-accent hover:text-white hover:scale-110 transition-all shadow-sm">
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${currentIndex === idx ? 'bg-accent w-6' : 'bg-accent/20'}`}
                />
              ))}
            </div>
            <button onClick={next} className="p-3 rounded-full border border-border hover:bg-accent hover:text-white hover:scale-110 transition-all shadow-sm">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
