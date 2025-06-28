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

  // Simple, fast transition variants
  const transitionVariants = {
    initial: { 
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)'
    },
    animate: {
      opacity: [1, 0.7, 1], // Never goes below 70% opacity
      scale: [1, 0.98, 1], // Minimal scale change
      filter: ['blur(0px)', 'blur(1px)', 'blur(0px)'] // Very light blur
    },
    transition: {
      duration: 0.8, // Much faster - 0.8 seconds total
      ease: [0.25, 0.46, 0.45, 0.94], // Smooth easing
      times: [0, 0.4, 1] // Content switches at 40%
    }
  };

  // Even simpler for reduced motion
  const reducedMotionVariant = {
    initial: { opacity: 1 },
    animate: { opacity: [1, 0.8, 1] }, // Minimal opacity change
    transition: { duration: 0.4, ease: "easeInOut" }
  };

  // Trigger transition when page changes
  useEffect(() => {
    if (currentPage !== displayPage) {
      setIsTransitioning(true);
      
      // Switch page content at 40% of transition (when opacity is lowest)
      const switchDelay = prefersReducedMotion ? 160 : 320; // 40% of 0.8s = 320ms
      const endDelay = prefersReducedMotion ? 400 : 800; // Total duration
      
      setTimeout(() => setDisplayPage(currentPage), switchDelay);
      setTimeout(() => setIsTransitioning(false), endDelay);
    }
  }, [currentPage, displayPage, prefersReducedMotion]);

  return (
    <div className="relative w-full h-full">
      <motion.div
        className="relative w-full h-full"
        style={{
          willChange: isTransitioning ? 'transform, opacity, filter' : 'auto'
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
            initial={{ opacity: 0.8 }} // Start at 80% opacity
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ 
              duration: 0.2, // Very quick content fade
              ease: "easeOut"
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Subtle background effect */}
      <AnimatePresence>
        {isTransitioning && !prefersReducedMotion && (
          <motion.div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.03) 0%, rgba(147, 51, 234, 0.02) 50%, transparent 100%)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeInOut" 
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}