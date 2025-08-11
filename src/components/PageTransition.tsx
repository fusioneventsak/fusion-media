import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  currentPage: string;
  children: React.ReactNode;
  onTransitionChange?: (isTransitioning: boolean) => void;
}

export default function PageTransition({ currentPage, children, onTransitionChange }: PageTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPage, setDisplayPage] = useState(currentPage);
  const [transitionType, setTransitionType] = useState<'slide' | 'slideUp' | 'zoom' | 'flipX' | 'flipY' | 'fade'>('slide');
  
  // Get transition type based on destination page
  const getTransitionType = (to: string) => {
    const pageTransitions = {
      'home': 'slide',
      'about': 'slideUp', 
      'case-studies': 'zoom',
      'contact': 'flipX'
    };
    return pageTransitions[to as keyof typeof pageTransitions] || 'slide';
  };

  // Get direction for slide transitions
  const getDirection = (from: string, to: string) => {
    const pages = ['home', 'about', 'case-studies', 'contact'];
    const fromIndex = pages.indexOf(from);
    const toIndex = pages.indexOf(to);
    return toIndex > fromIndex ? 'forward' : 'backward';
  };

  // Handle page changes
  useEffect(() => {
    if (currentPage !== displayPage) {
      setTransitionType(getTransitionType(currentPage) as any);
      setIsTransitioning(true);
      onTransitionChange?.(true);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'auto' });
      
      // Page switches immediately (let animation handle the timing)
      setTimeout(() => {
        setDisplayPage(currentPage);
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, 50);
      
      // Transition ends
      setTimeout(() => {
        setIsTransitioning(false);
        onTransitionChange?.(false);
      }, 800);
    }
  }, [currentPage, displayPage, onTransitionChange]);

  // Get transition variants
  const getTransitionVariants = () => {
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const direction = getDirection(displayPage, currentPage);
    
    switch (transitionType) {
      case 'slide':
        return {
          initial: {
            x: direction === 'forward' ? windowWidth : -windowWidth,
            opacity: 0.8
          },
          animate: {
            x: 0,
            opacity: 1
          },
          exit: {
            x: direction === 'forward' ? -windowWidth : windowWidth,
            opacity: 0.8
          },
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        };
        
      case 'slideUp':
        return {
          initial: {
            y: windowHeight,
            opacity: 0.9
          },
          animate: {
            y: 0,
            opacity: 1
          },
          exit: {
            y: -windowHeight,
            opacity: 0.8
          },
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        };
        
      case 'zoom':
        return {
          initial: {
            scale: 1.5,
            opacity: 0
          },
          animate: {
            scale: 1,
            opacity: 1
          },
          exit: {
            scale: 0.8,
            opacity: 0
          },
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        };
        
      case 'flipX':
        return {
          initial: {
            rotateX: 90,
            opacity: 0,
            transformOrigin: '50% 50%'
          },
          animate: {
            rotateX: 0,
            opacity: 1
          },
          exit: {
            rotateX: -90,
            opacity: 0
          },
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        };
        
      case 'flipY':
        return {
          initial: {
            rotateY: 90,
            opacity: 0,
            transformOrigin: '50% 50%'
          },
          animate: {
            rotateY: 0,
            opacity: 1
          },
          exit: {
            rotateY: -90,
            opacity: 0
          },
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        };
        
      default: // fade
        return {
          initial: {
            opacity: 0,
            scale: 1.1
          },
          animate: {
            opacity: 1,
            scale: 1
          },
          exit: {
            opacity: 0,
            scale: 0.95
          },
          transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        };
    }
  };

  const variants = getTransitionVariants();

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={displayPage}
          style={{
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d'
          }}
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={variants.transition}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}