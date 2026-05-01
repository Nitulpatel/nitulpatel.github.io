import React from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Code } from 'lucide-react';

const SkillCard = ({ skill }: { skill: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  function handleMouse(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className="preserve-3d perspective-1000"
    >
      <div className="glass p-8 rounded-3xl text-center font-black text-accent shadow-sm hover:shadow-2xl transition-all border border-white/20 group cursor-default">
        <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          <Code size={24} />
        </div>
        <span className="text-lg tracking-tight">{skill}</span>
      </div>
    </motion.div>
  );
};

export default SkillCard;
