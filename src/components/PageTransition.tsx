import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  currentPage: string;
  children: React.ReactNode;
}

export default function PageTransition({ currentPage, children }: PageTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPage, setDisplayPage] = useState(currentPage);
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Get rotation direction based on page navigation
  const getRotationDirection = (from: string, to: string) => {
    const pages = ['home', 'about', 'case-studies', 'contact'];
    const fromIndex = pages.indexOf(from);
    const toIndex = pages.indexOf(to);
    
    // Determine if we're going forward or backward
    if (toIndex > fromIndex) {
      return 'forward'; // Rotate right
    } else {
      return 'backward'; // Rotate left
    }
  };

  // 3D perspective transition variants
  const get3DTransitionVariants = (direction: 'forward' | 'backward') => {
    const rotateY = direction === 'forward' ? 90 : -90;
    
    return {
      initial: { 
        opacity: 1,
        rotateY: 0,
        scale: 1,
        z: 0
      },
      animate: {
        opacity: [1, 0.3, 1], // Dip to 30% opacity at midpoint
        rotateY: [0, rotateY, 0], // Single clean rotation
        scale: [1, 0.95, 1], // Slight scale for depth
        z: [0, -200, 0] // Move back in 3D space
      },
      transition: {
        duration: 1.0, // 1 second for smooth 3D effect
        ease: [0.25, 0.46, 0.45, 0.94],
        times: [0, 0.5, 1] // Content switches at exact midpoint
      }
    };
  };

  // Reduced motion fallback
  const reducedMotionVariant = {
    initial: { opacity: 1 },
    animate: { opacity: [1, 0.7, 1] },
    transition: { duration: 0.6, ease: "easeInOut" }
  };

  // Trigger transition when page changes
  useEffect(() => {
    if (currentPage !== displayPage) {
      setIsTransitioning(true);
      
      const switchDelay = prefersReducedMotion ? 300 : 500; // Switch at midpoint
      const endDelay = prefersReducedMotion ? 600 : 1000; // Total duration
      
      setTimeout(() => setDisplayPage(currentPage), switchDelay);
      setTimeout(() => setIsTransitioning(false), endDelay);
    }
  }, [currentPage, displayPage, prefersReducedMotion]);

  const direction = getRotationDirection(displayPage, currentPage);
  const transitionVariants = get3DTransitionVariants(direction);

  return (
    <div className="relative w-full h-full perspective-container">
      <motion.div
        className="relative w-full h-full preserve-3d transition-layer"
        style={{
          willChange: isTransitioning ? 'transform, opacity' : 'auto',
          transformStyle: 'preserve-3d',
          perspective: '2000px'
        }}
        initial={prefersReducedMotion ? reducedMotionVariant.initial : transitionVariants.initial}
        animate={isTransitioning ? 
          (prefersReducedMotion ? reducedMotionVariant.animate : transitionVariants.animate) 
          : (prefersReducedMotion ? reducedMotionVariant.initial : transitionVariants.initial)
        }
        transition={prefersReducedMotion ? reducedMotionVariant.transition : transitionVariants.transition}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={displayPage}
            className="w-full h-full"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.7 }}
            transition={{ 
              duration: 0.3,
              ease: "easeOut"
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* 3D ambient lighting effect */}
      <AnimatePresence>
        {isTransitioning && !prefersReducedMotion && (
          <motion.div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, 
                rgba(59, 130, 246, 0.08) 0%, 
                rgba(147, 51, 234, 0.05) 30%, 
                rgba(6, 182, 212, 0.03) 60%, 
                transparent 100%)`
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.0,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          />
        )}
      </AnimatePresence>

      {/* Holographic scan lines during transition */}
      <AnimatePresence>
        {isTransitioning && !prefersReducedMotion && (
          <motion.div
            className="fixed inset-0 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(0, 255, 255, 0.03) 25%, 
                rgba(255, 0, 255, 0.03) 50%, 
                rgba(0, 255, 255, 0.03) 75%, 
                transparent 100%)`
            }}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ 
              x: ['100%', '200%'],
              opacity: [0, 0.6, 0]
            }}
            transition={{ 
              duration: 1.0,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}