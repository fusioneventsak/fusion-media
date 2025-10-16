import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phrases = [
  'websites & app builds',
  'AI features that feel natural',
  'interactive brand moments'
];

export default function AnimatedHeroTitle() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % phrases.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <span
      className="relative inline-grid min-h-[1.2em] items-center overflow-hidden"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[activeIndex]}
          className="inline-flex items-center whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-semibold text-white/80 shadow-[0_10px_25px_rgba(15,23,42,0.35)] backdrop-blur"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {phrases[activeIndex]}
          </span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
