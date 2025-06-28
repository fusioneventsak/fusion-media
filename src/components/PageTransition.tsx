import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  currentPage: string;
  children: React.ReactNode;
}

type TransitionDirection = 'rtl' | 'ltr' | 'ttb' | 'btt';

export default function PageTransition({ currentPage, children }: PageTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPage, setDisplayPage] = useState(currentPage);
  const [transitionDirection, setTransitionDirection] = useState<TransitionDirection>('rtl');
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Determine transition direction based on page navigation
  const getTransitionDirection = (from: string, to: string): TransitionDirection => {
    const pages = ['home', 'about', 'case-studies', 'contact'];
    const fromIndex = pages.indexOf(from);
    const toIndex = pages.indexOf(to);
    
    if (fromIndex === -1 || toIndex === -1) return 'rtl';
    
    // Horizontal transitions for adjacent pages
    if (Math.abs(fromIndex - toIndex) === 1) {
      return fromIndex < toIndex ? 'rtl' : 'ltr';
    }
    
    // Vertical transitions for non-adjacent pages
    return fromIndex < toIndex ? 'ttb' : 'btt';
  };

  // 3D Transition Variants
  const transitionVariants = {
    rtl: {
      initial: { 
        opacity: 1,
        rotateY: 0,
        z: 0,
        scale: 1
      },
      animate: {
        opacity: [1, 0, 1],
        rotateY: [0, 180, 360],
        z: [0, -1800, 0],
        scale: [1, 0.8, 1]
      },
      transition: {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
        times: [0, 0.5, 1]
      }
    },
    ltr: {
      initial: { 
        opacity: 1,
        rotateY: 0,
        z: 0,
        scale: 1
      },
      animate: {
        opacity: [1, 0, 1],
        rotateY: [0, -180, -360],
        z: [0, -1800, 0],
        scale: [1, 0.8, 1]
      },
      transition: {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
        times: [0, 0.5, 1]
      }
    },
    ttb: {
      initial: { 
        opacity: 1,
        rotateX: 0,
        z: 0,
        scale: 1
      },
      animate: {
        opacity: [1, 0, 1],
        rotateX: [0, 180, 360],
        z: [0, -1800, 0],
        scale: [1, 0.8, 1]
      },
      transition: {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
        times: [0, 0.5, 1]
      }
    },
    btt: {
      initial: { 
        opacity: 1,
        rotateX: 0,
        z: 0,
        scale: 1
      },
      animate: {
        opacity: [1, 0, 1],
        rotateX: [0, -180, -360],
        z: [0, -1800, 0],
        scale: [1, 0.8, 1]
      },
      transition: {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
        times: [0, 0.5, 1]
      }
    }
  };

  // Reduced motion variant
  const reducedMotionVariant = {
    initial: { opacity: 1 },
    animate: { opacity: [1, 0.3, 1] },
    transition: { duration: 1, ease: "easeInOut" }
  };

  // Trigger transition when page changes
  useEffect(() => {
    if (currentPage !== displayPage) {
      const direction = getTransitionDirection(displayPage, currentPage);
      setTransitionDirection(direction);
      setIsTransitioning(true);
      
      // Switch page content at transition midpoint (when opacity is 0)
      const switchDelay = prefersReducedMotion ? 500 : 1000;
      const endDelay = prefersReducedMotion ? 1000 : 2000;
      
      setTimeout(() => setDisplayPage(currentPage), switchDelay);
      setTimeout(() => setIsTransitioning(false), endDelay);
    }
  }, [currentPage, displayPage, prefersReducedMotion]);

  return (
    <div 
      className="relative w-full h-full"
      style={{
        perspective: '2000px',
        perspectiveOrigin: '50% 50%'
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          willChange: isTransitioning ? 'transform, opacity' : 'auto'
        }}
        initial={prefersReducedMotion ? reducedMotionVariant.initial : transitionVariants[transitionDirection].initial}
        animate={isTransitioning ? 
          (prefersReducedMotion ? reducedMotionVariant.animate : transitionVariants[transitionDirection].animate) 
          : (prefersReducedMotion ? reducedMotionVariant.initial : transitionVariants[transitionDirection].initial)
        }
        transition={prefersReducedMotion ? reducedMotionVariant.transition : transitionVariants[transitionDirection].transition}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={displayPage}
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Optional: Subtle background effect during transition */}
      <AnimatePresence>
        {isTransitioning && !prefersReducedMotion && (
          <motion.div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.03) 50%, transparent 100%)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}