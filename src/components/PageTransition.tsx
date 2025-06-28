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

  // Enhanced easing curves for smoother transitions
  const smoothEasing = [0.23, 1, 0.32, 1]; // Custom cubic-bezier for ultra-smooth motion
  const homeEasing = [0.19, 1, 0.22, 1]; // Even smoother for home page

  // Determine if we're transitioning from/to home for special handling
  const isHomeTransition = displayPage === 'home' || currentPage === 'home';

  // 3D Transition Variants
  const transitionVariants = {
    rtl: {
      initial: { 
        opacity: 1,
        rotateY: 0,
        z: 0,
        scale: 1,
        filter: 'blur(0px)'
      },
      animate: {
        opacity: isHomeTransition ? [1, 0.1, 1] : [1, 0, 1],
        rotateY: isHomeTransition ? [0, 120, 360] : [0, 180, 360],
        z: isHomeTransition ? [0, -1200, 0] : [0, -1800, 0],
        scale: isHomeTransition ? [1, 0.9, 1] : [1, 0.8, 1],
        filter: isHomeTransition ? ['blur(0px)', 'blur(2px)', 'blur(0px)'] : ['blur(0px)', 'blur(4px)', 'blur(0px)']
      },
      transition: {
        duration: isHomeTransition ? 1.8 : 2,
        ease: isHomeTransition ? homeEasing : smoothEasing,
        times: isHomeTransition ? [0, 0.45, 1] : [0, 0.5, 1]
      }
    },
    ltr: {
      initial: { 
        opacity: 1,
        rotateY: 0,
        z: 0,
        scale: 1,
        filter: 'blur(0px)'
      },
      animate: {
        opacity: isHomeTransition ? [1, 0.1, 1] : [1, 0, 1],
        rotateY: isHomeTransition ? [0, -120, -360] : [0, -180, -360],
        z: isHomeTransition ? [0, -1200, 0] : [0, -1800, 0],
        scale: isHomeTransition ? [1, 0.9, 1] : [1, 0.8, 1],
        filter: isHomeTransition ? ['blur(0px)', 'blur(2px)', 'blur(0px)'] : ['blur(0px)', 'blur(4px)', 'blur(0px)']
      },
      transition: {
        duration: isHomeTransition ? 1.8 : 2,
        ease: isHomeTransition ? homeEasing : smoothEasing,
        times: isHomeTransition ? [0, 0.45, 1] : [0, 0.5, 1]
      }
    },
    ttb: {
      initial: { 
        opacity: 1,
        rotateX: 0,
        z: 0,
        scale: 1,
        filter: 'blur(0px)'
      },
      animate: {
        opacity: isHomeTransition ? [1, 0.1, 1] : [1, 0, 1],
        rotateX: isHomeTransition ? [0, 120, 360] : [0, 180, 360],
        z: isHomeTransition ? [0, -1200, 0] : [0, -1800, 0],
        scale: isHomeTransition ? [1, 0.9, 1] : [1, 0.8, 1],
        filter: isHomeTransition ? ['blur(0px)', 'blur(2px)', 'blur(0px)'] : ['blur(0px)', 'blur(4px)', 'blur(0px)']
      },
      transition: {
        duration: isHomeTransition ? 1.8 : 2,
        ease: isHomeTransition ? homeEasing : smoothEasing,
        times: isHomeTransition ? [0, 0.45, 1] : [0, 0.5, 1]
      }
    },
    btt: {
      initial: { 
        opacity: 1,
        rotateX: 0,
        z: 0,
        scale: 1,
        filter: 'blur(0px)'
      },
      animate: {
        opacity: isHomeTransition ? [1, 0.1, 1] : [1, 0, 1],
        rotateX: isHomeTransition ? [0, -120, -360] : [0, -180, -360],
        z: isHomeTransition ? [0, -1200, 0] : [0, -1800, 0],
        scale: isHomeTransition ? [1, 0.9, 1] : [1, 0.8, 1],
        filter: isHomeTransition ? ['blur(0px)', 'blur(2px)', 'blur(0px)'] : ['blur(0px)', 'blur(4px)', 'blur(0px)']
      },
      transition: {
        duration: isHomeTransition ? 1.8 : 2,
        ease: isHomeTransition ? homeEasing : smoothEasing,
        times: isHomeTransition ? [0, 0.45, 1] : [0, 0.5, 1]
      }
    }
  };

  // Reduced motion variant
  const reducedMotionVariant = {
    initial: { opacity: 1 },
    animate: { opacity: [1, 0.5, 1] },
    transition: { duration: 0.8, ease: "easeInOut" }
  };

  // Trigger transition when page changes
  useEffect(() => {
    if (currentPage !== displayPage) {
      const direction = getTransitionDirection(displayPage, currentPage);
      setTransitionDirection(direction);
      setIsTransitioning(true);
      
      // Switch page content at transition midpoint (when opacity is 0)
      const switchDelay = prefersReducedMotion ? 400 : (isHomeTransition ? 810 : 1000); // 45% of 1.8s = 810ms
      const endDelay = prefersReducedMotion ? 800 : (isHomeTransition ? 1800 : 2000);
      
      setTimeout(() => setDisplayPage(currentPage), switchDelay);
      setTimeout(() => setIsTransitioning(false), endDelay);
    }
  }, [currentPage, displayPage, prefersReducedMotion, isHomeTransition]);

  return (
    <div 
      className="relative w-full h-full"
      style={{
        perspective: '2000px',
        perspectiveOrigin: '50% 50%'
      }}
    >
      <motion.div
        className={`relative w-full h-full ${isHomeTransition ? 'transition-home' : 'transition-standard'}`}
        style={{
          transformStyle: 'preserve-3d',
          willChange: isTransitioning ? 'transform, opacity, filter' : 'auto',
          backfaceVisibility: 'hidden'
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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ 
              duration: isHomeTransition ? 0.4 : 0.3,
              ease: isHomeTransition ? homeEasing : smoothEasing
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Enhanced background effect during home transitions */}
      <AnimatePresence>
        {isTransitioning && !prefersReducedMotion && (
          <motion.div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              background: isHomeTransition 
                ? 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.05) 30%, rgba(6, 182, 212, 0.03) 60%, transparent 100%)'
                : 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.03) 50%, transparent 100%)'
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isHomeTransition ? [0, 0.8, 0] : [0, 1, 0],
              scale: isHomeTransition ? [1, 1.1, 1] : [1, 1, 1]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: isHomeTransition ? 1.8 : 2, 
              ease: isHomeTransition ? homeEasing : "easeInOut" 
            }}
          />
        )}
      </AnimatePresence>

      {/* Subtle particle effect for home transitions */}
      <AnimatePresence>
        {isTransitioning && isHomeTransition && !prefersReducedMotion && (
          <motion.div
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: homeEasing }}
          >
            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                style={{
                  left: `${10 + (i * 7)}%`,
                  top: `${20 + (i * 5)}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.sin(i) * 50, 0],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 1.8,
                  delay: i * 0.1,
                  ease: homeEasing
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}