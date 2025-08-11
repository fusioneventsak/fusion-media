import React, { useState, useEffect, useRef } from 'react';
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
  
  // Get page info and transition type
  const getPageInfo = (from: string, to: string) => {
    const pages = ['home', 'about', 'case-studies', 'contact'];
    const pageColors = {
      'home': '#461467',       // Purple
      'about': '#ffba57',      // Orange
      'case-studies': '#ff9d70', // Light orange
      'contact': '#00bab0'     // Teal
    };
    
    const pageTransitions = {
      'home': 'slide',
      'about': 'slideUp', 
      'case-studies': 'zoom',
      'contact': 'flipX'
    };
    
    const fromIndex = pages.indexOf(from);
    const toIndex = pages.indexOf(to);
    const direction = toIndex > fromIndex ? 'forward' : 'backward';
    
    return {
      direction,
      fromColor: pageColors[from as keyof typeof pageColors] || pageColors.home,
      toColor: pageColors[to as keyof typeof pageColors] || pageColors.home,
      transition: pageTransitions[to as keyof typeof pageTransitions] || 'slide'
    };
  };

  // Handle page changes
  useEffect(() => {
    if (currentPage !== displayPage) {
      const pageInfo = getPageInfo(displayPage, currentPage);
      setTransitionType(pageInfo.transition as any);
      setIsTransitioning(true);
      onTransitionChange?.(true);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'auto' });
      
      // Page switches at 600ms (middle of transition)
      setTimeout(() => {
        setDisplayPage(currentPage);
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, 600);
      
      // Total transition ends at 1200ms
      setTimeout(() => {
        setIsTransitioning(false);
        onTransitionChange?.(false);
      }, 1200);
    }
  }, [currentPage, displayPage, onTransitionChange]);

  const pageInfo = getPageInfo(displayPage, currentPage);

  // Transition variants based on type
  const getTransitionVariants = () => {
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    switch (transitionType) {
      case 'slide':
        return {
          initial: {
            x: pageInfo.direction === 'forward' ? windowWidth * 1.5 : -windowWidth * 1.5,
            scale: 0.8,
            opacity: 0.8
          },
          animate: {
            x: [
              pageInfo.direction === 'forward' ? windowWidth * 1.5 : -windowWidth * 1.5,
              0,
              0
            ],
            scale: [0.8, 0.9, 1],
            opacity: [0.8, 0.9, 1]
          },
          exit: {
            x: pageInfo.direction === 'forward' ? -windowWidth * 1.5 : windowWidth * 1.5,
            scale: 0.8,
            opacity: 0
          },
          transition: {
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.6, 1]
          }
        };
        
      case 'slideUp':
        return {
          initial: {
            y: windowHeight * 1.5,
            scale: 0.8,
            opacity: 0.9
          },
          animate: {
            y: [windowHeight * 1.5, 0, 0],
            scale: [0.8, 0.9, 1],
            opacity: [0.9, 0.95, 1]
          },
          exit: {
            y: -windowHeight * 1.5,
            scale: 0.9,
            opacity: 0
          },
          transition: {
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.6, 1]
          }
        };
        
      case 'zoom':
        return {
          initial: {
            scale: 2,
            opacity: 0,
            filter: 'blur(10px)'
          },
          animate: {
            scale: [2, 1.1, 1],
            opacity: [0, 0.8, 1],
            filter: ['blur(10px)', 'blur(2px)', 'blur(0px)']
          },
          exit: {
            scale: 0,
            opacity: 0,
            filter: 'blur(5px)'
          },
          transition: {
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.7, 1]
          }
        };
        
      case 'flipX':
        return {
          initial: {
            rotateX: 90,
            opacity: 0,
            scale: 0.8
          },
          animate: {
            rotateX: [90, -5, 0],
            opacity: [0, 0.8, 1],
            scale: [0.8, 1.05, 1]
          },
          exit: {
            rotateX: -90,
            opacity: 0,
            scale: 0.8
          },
          transition: {
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.7, 1]
          }
        };
        
      case 'flipY':
        return {
          initial: {
            rotateY: 90,
            opacity: 0,
            scale: 0.8
          },
          animate: {
            rotateY: [90, -5, 0],
            opacity: [0, 0.8, 1],
            scale: [0.8, 1.05, 1]
          },
          exit: {
            rotateY: -90,
            opacity: 0,
            scale: 0.8
          },
          transition: {
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.7, 1]
          }
        };
        
      default: // fade
        return {
          initial: {
            opacity: 0,
            scale: 1.5,
            filter: 'blur(5px)'
          },
          animate: {
            opacity: [0, 0.8, 1],
            scale: [1.5, 1.1, 1],
            filter: ['blur(5px)', 'blur(1px)', 'blur(0px)']
          },
          exit: {
            opacity: 0,
            scale: 0.8,
            filter: 'blur(3px)'
          },
          transition: {
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.7, 1]
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
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: `linear-gradient(135deg, ${pageInfo.toColor}dd 0%, ${pageInfo.toColor}bb 100%)`,
            zIndex: isTransitioning ? 9999 : 1,
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={variants.transition}
        >
          {/* Page Content Container */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              textAlign: 'center',
              color: 'white',
              zIndex: 10
            }}
          >
            {/* FUSION INTERACTIVE Logo */}
            <motion.div
              style={{
                marginBottom: '40px'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {/* F Logo */}
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(255,255,255,0.3)',
                  margin: '0 auto 20px auto',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}
              >
                <span
                  style={{
                    color: 'white',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    fontFamily: '"Inter", sans-serif'
                  }}
                >
                  F
                </span>
              </div>

              {/* FUSION Text */}
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: '300',
                  color: 'white',
                  letterSpacing: '4px',
                  marginBottom: '8px',
                  textShadow: '0 0 20px rgba(255,255,255,0.5)',
                  fontFamily: '"Inter", sans-serif'
                }}
              >
                FUSION
              </div>

              {/* INTERACTIVE Text */}
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: '300',
                  color: 'rgba(255,255,255,0.9)',
                  letterSpacing: '4px',
                  textShadow: '0 0 10px rgba(255,255,255,0.3)',
                  fontFamily: '"Inter", sans-serif'
                }}
              >
                INTERACTIVE
              </div>
            </motion.div>

            {/* Page Name */}
            <motion.div
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '50px',
                padding: '12px 24px',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'inline-block',
                marginBottom: '20px'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <span
                style={{
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '500',
                  fontFamily: '"Inter", sans-serif',
                  textTransform: 'capitalize'
                }}
              >
                {currentPage === 'case-studies' ? 'Case Studies' : currentPage}
              </span>
            </motion.div>

            {/* Transition Type Indicator */}
            <motion.div
              style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: '"Inter", sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              {transitionType} Transition
            </motion.div>
          </div>

          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
              pointerEvents: 'none'
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Original content (hidden during transition) */}
      <div 
        style={{ 
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}
      >
        {children}
      </div>
    </div>
  );
}