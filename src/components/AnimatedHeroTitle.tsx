import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ['Quick App MVPs', 'Websites', 'Digital Experiences', 'Custom Solutions'];

export default function AnimatedHeroTitle() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000); // Slower word changes for smoother experience

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 text-white leading-tight text-center">
      We Make{' '}
      <span className="font-semibold text-white">
        Kick-Ass
      </span>
      <br />
      <div className="overflow-hidden py-4 flex justify-center" style={{ minHeight: '1.2em' }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentWordIndex}
            className="font-semibold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent inline-block leading-relaxed"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ 
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94] // Custom cubic-bezier for ultra-smooth motion
            }}
            style={{ paddingBottom: '0.1em' }}
          >
            {words[currentWordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </h1>
  );
}