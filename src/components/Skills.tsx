import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type TabType = 'frontend' | 'backend' | 'wordpress' | 'tools';

const TAB_CONTENT = {
  frontend: {
    title: 'Front End Work',
    skills: [
      { name: 'React / Next.js', icon: '⚛️' },
      { name: 'JavaScript / ES6+', icon: '✨' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'CSS 3 Animations', icon: '🎬' },
      { name: 'Responsive Design', icon: '📱' },
      { name: 'Figma / UI Design', icon: '🖌️' },
      { name: 'Web Performance', icon: '⚡' },
    ],
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Vite', 'Webpack'],
  },
  backend: {
    title: 'Backend Work',
    skills: [
      { name: 'PHP 8+', icon: '🐘' },
      { name: 'MySQL', icon: '🗄️' },
      { name: 'REST API Design', icon: '🔌' },
      { name: 'Server Architecture', icon: '🏗️' },
      { name: 'Database Optimization', icon: '⚙️' },
      { name: 'Authentication & Security', icon: '🔐' },
      { name: 'Caching Strategies', icon: '💾' },
      { name: 'API Integration', icon: '🔗' },
    ],
    tags: ['PHP 8+', 'MySQL', 'REST API', 'GraphQL', 'Laravel', 'Database Design', 'Scalability', 'Security'],
  },
  wordpress: {
    title: 'WordPress Work',
    skills: [
      { name: 'WordPress Core', icon: '📌' },
      { name: 'WooCommerce', icon: '🛒' },
      { name: 'Custom Themes', icon: '🎭' },
      { name: 'Plugin Development', icon: '🔧' },
      { name: 'Performance Optimization', icon: '🚀' },
      { name: 'ACF Pro', icon: '📝' },
      { name: 'Payment Gateways', icon: '💳' },
      { name: 'Headless WordPress', icon: '🧠' },
    ],
    tags: ['WordPress', 'WooCommerce', 'ACF Pro', 'Custom Themes', 'Plugin Dev', 'Elementor', 'WPML', 'REST API'],
  },
  tools: {
    title: 'Tools & Workflow',
    skills: [
      { name: 'Git / Version Control', icon: '🌳' },
      { name: 'Docker', icon: '🐳' },
      { name: 'DevOps / cPanel', icon: '⚙️' },
      { name: 'Figma', icon: '🎨' },
      { name: 'CLI Tools', icon: '💻' },
      { name: 'Build Tools', icon: '🛠️' },
      { name: 'Testing & Debugging', icon: '🐛' },
      { name: 'CI/CD Pipelines', icon: '🔄' },
    ],
    tags: ['Git', 'GitHub', 'Docker', 'cPanel', 'Figma', 'VS Code', 'npm/yarn', 'Webpack', 'Vite', 'Postman'],
  },
};

const TABS: { key: TabType; label: string }[] = [
  { key: 'frontend', label: 'Front End' },
  { key: 'backend', label: 'Backend' },
  { key: 'wordpress', label: 'WordPress' },
  { key: 'tools', label: 'Tools & Workflow' },
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState<TabType>('frontend');
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const handleTabClick = (tab: TabType, element: HTMLButtonElement) => {
    setActiveTab(tab);
    updateUnderline(element);
  };

  const updateUnderline = (element: HTMLButtonElement) => {
    const { offsetLeft, offsetWidth } = element;
    setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
  };

  return (
    <section id="skills" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Dark bg */}
      <div style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }} />
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label"
          style={{ marginBottom: '16px' }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff4747', display: 'inline-block' }} />
          My Skills
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: '#fff',
            margin: '0 0 12px',
            lineHeight: 1.05,
          }}
        >
          Technical <span style={{ color: '#ff4747' }}>Arsenal</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: '16px', color: '#666', marginBottom: '48px', maxWidth: '520px', lineHeight: 1.7 }}
        >
          Specialized expertise across front-end, back-end, WordPress, and modern development tools.
        </motion.p>

        {/* Tab Buttons - Modern Design */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '0',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              position: 'relative',
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollBehavior: 'smooth',
            }}
            className="tabs-container"
          >
            {TABS.map((tab, index) => (
              <button
                key={tab.key}
                ref={el => { tabsRef.current[tab.key] = el; }}
                onClick={(e) => {
                  handleTabClick(tab.key, e.currentTarget as HTMLButtonElement);
                }}
                onMouseEnter={(e) => {
                  updateUnderline(e.currentTarget as HTMLButtonElement);
                }}
                onMouseLeave={() => {
                  if (tabsRef.current[activeTab]) {
                    updateUnderline(tabsRef.current[activeTab]!);
                  }
                }}
                style={{
                  padding: '16px 28px',
                  fontSize: '14px',
                  fontWeight: activeTab === tab.key ? 700 : 600,
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: activeTab === tab.key ? '#ff4747' : '#666',
                  letterSpacing: '0.02em',
                  fontFamily: 'Outfit, sans-serif',
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {tab.label}
              </button>
            ))}
            
            {/* Animated underline indicator */}
            <motion.div
              animate={underlineStyle}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'absolute',
                bottom: '-1px',
                height: '2px',
                background: 'linear-gradient(90deg, #ff4747, #ff8080)',
                borderRadius: '2px',
              }}
            />
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '64px',
              paddingTop: '24px',
            }}
            className="skills-content"
          >
            {/* Skill cards with icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
              }}
            >
              {TAB_CONTENT[activeTab].skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="glass-card skill-card"
                  whileHover={{
                    y: -8,
                    boxShadow: '0 24px 60px rgba(255,71,71,0.18)',
                    borderColor: 'rgba(255,71,71,0.3)',
                  }}
                  style={{
                    borderRadius: '16px',
                    padding: '28px 24px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,71,71,0.02) 100%)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {/* Animated background blur */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle at 50% 50%, rgba(255,71,71,0.1), transparent)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      pointerEvents: 'none',
                    }}
                    className="card-blur"
                  />

                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '14px',
                      display: 'grid',
                      placeItems: 'center',
                      background: 'rgba(255,71,71,0.1)',
                      border: '1.5px solid rgba(255,71,71,0.2)',
                      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.12)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <span style={{ fontSize: '24px', color: '#ff6f6f', lineHeight: 1 }}>{skill.icon}</span>
                  </motion.div>

                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 800,
                      color: '#fff',
                      position: 'relative',
                      zIndex: 1,
                      lineHeight: 1.35,
                      maxWidth: '140px',
                    }}
                  >
                    {skill.name}
                  </div>
                  <div
                    style={{
                      width: '38px',
                      height: '3px',
                      borderRadius: '9999px',
                      background: 'linear-gradient(90deg, #ff4747, #ff8080)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Right Panel - Tags and description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {/* Category Header */}
              <div style={{ marginBottom: '36px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#ff4747',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}
                >
                  ✦ {TAB_CONTENT[activeTab].title}
                </div>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#fff',
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  Key <span style={{ color: '#ff4747' }}>Technologies</span> & Skills
                </h3>
              </div>

              {/* Tags */}
              <div style={{ marginBottom: '40px' }}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  {TAB_CONTENT[activeTab].tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      whileHover={{
                        scale: 1.08,
                        borderColor: '#ff4747',
                        color: '#ff4747',
                        boxShadow: '0 0 12px rgba(255,71,71,0.2)',
                      }}
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#888',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background: 'rgba(255,255,255,0.02)',
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Info card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card"
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(255,71,71,0.1)' }}
                style={{
                  borderRadius: '16px',
                  padding: '32px',
                  border: '1px solid rgba(255,71,71,0.15)',
                  background: 'linear-gradient(135deg, rgba(255,71,71,0.08) 0%, rgba(255,71,71,0.02) 100%)',
                  transition: 'all 0.3s ease',
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    color: '#ff4747',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  ✦ Expert Level
                </div>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#aaa',
                    lineHeight: 1.8,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {activeTab === 'frontend' && 'Modern front-end frameworks with pixel-perfect implementations and smooth animations. Expertise in React, Next.js, and cutting-edge CSS technologies.'}
                  {activeTab === 'backend' && 'Scalable server architecture with optimized databases and secure API design. Proven experience building high-performance backend systems.'}
                  {activeTab === 'wordpress' && 'Full WordPress ecosystem mastery from core to complex WooCommerce builds. Custom plugin development and theme optimization.'}
                  {activeTab === 'tools' && 'Professional workflows with version control, deployment, and developer tools. Streamlined processes for efficient team collaboration.'}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        .tabs-container {
          scrollbar-width: none;
        }
        .tabs-container::-webkit-scrollbar {
          display: none;
        }

        .skill-card:hover .card-blur {
          opacity: 1 !important;
        }

        @media (max-width: 1024px) {
          .skills-content {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            padding-top: 20px;
          }
          .skill-card {
            padding: 24px 20px !important;
          }
        }

        @media (max-width: 767px) {
          .skills-content {
            gap: 40px !important;
          }
          .skill-card {
            padding: 20px 16px !important;
            border-radius: 12px !important;
          }
          .tabs-container {
            gap: 0 !important;
            padding-bottom: 12px;
          }
          .tabs-container button {
            padding: 14px 20px !important;
            font-size: 13px !important;
          }
        }

        @media (max-width: 560px) {
          .skill-card {
            font-size: 12px !important;
            padding: 16px 12px !important;
          }
          .tabs-container button {
            padding: 12px 16px !important;
            font-size: 12px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
