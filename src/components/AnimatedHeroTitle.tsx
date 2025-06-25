import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ['Apps', 'Websites', 'Activations', 'Experiences'];

export default function AnimatedHeroTitle() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2500); // Change word every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 text-white leading-tight text-center">
      We Make{' '}
      <span className="font-semibold text-white">
        Kick-Ass
      </span>
      <br />
      <div className="overflow-hidden py-2 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentWordIndex}
            className="font-semibold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent inline-block"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ 
              duration: 0.25, 
              ease: "easeOut" 
            }}
          >
            {words[currentWordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </h1>
  );
}