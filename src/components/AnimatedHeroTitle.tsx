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
      <div className="relative flex justify-center items-center min-h-[1.2em] w-full">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentWordIndex}
            className="font-semibold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ 
              opacity: 0, 
              y: 50,
              rotateX: -90,
              scale: 0.8
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              rotateX: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0, 
              y: -50,
              rotateX: 90,
              scale: 0.8
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: { duration: 0.4 },
              scale: { duration: 0.5 }
            }}
            style={{
              transformOrigin: 'center center',
              perspective: '1000px'
            }}
          >
            {words[currentWordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </h1>
  );
}