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
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Get navigation direction and page info
  const getPageInfo = (from: string, to: string) => {
    const pages = ['home', 'about', 'case-studies', 'contact'];
    const pageColors = {
      'home': '#3B82F6',         // Blue
      'about': '#8B5CF6',        // Purple  
      'case-studies': '#06B6D4', // Cyan
      'contact': '#10B981'       // Green
    };
    
    const pageNames = {
      'home': 'Home',
      'about': 'About',
      'case-studies': 'Case Studies',
      'contact': 'Contact'
    };
    
    const fromIndex = pages.indexOf(from);
    const toIndex = pages.indexOf(to);
    const direction = toIndex > fromIndex ? 'forward' : 'backward';
    
    return {
      direction,
      fromColor: pageColors[from as keyof typeof pageColors] || pageColors.home,
      toColor: pageColors[to as keyof typeof pageColors] || pageColors.home,
      fromName: pageNames[from as keyof typeof pageNames] || 'Home',
      toName: pageNames[to as keyof typeof pageNames] || 'Home',
      fromIndex,
      toIndex
    };
  };

  // Trigger transition when page changes
  useEffect(() => {
    if (currentPage !== displayPage) {
      const pageInfo = getPageInfo(displayPage, currentPage);
      setTransitionDirection(pageInfo.direction);
      setIsTransitioning(true);
      onTransitionChange?.(true);
      
      // Force scroll to top immediately when transition starts
      window.scrollTo({ top: 0, behavior: 'auto' });
      
      // Page switch timing - longer for full stinger effect
      const switchDelay = prefersReducedMotion ? 500 : 1000;  // Switch at peak coverage
      const endDelay = prefersReducedMotion ? 1000 : 2000;    // Full stinger duration - much longer
      
      setTimeout(() => {
        setDisplayPage(currentPage);
        // Ensure scroll to top when content switches
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, switchDelay);
      
      setTimeout(() => {
        setIsTransitioning(false);
        onTransitionChange?.(false);
        // Final scroll to top to ensure it sticks
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, endDelay);
    }
  }, [currentPage, displayPage, prefersReducedMotion, onTransitionChange]);

  const pageInfo = getPageInfo(displayPage, currentPage);

  return (
    <div className="relative w-full h-full">
      {/* Content stays mounted - no AnimatePresence */}
      {children}

      {/* Full-Screen Stinger Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Main Stinger Shape - Diagonal Wipe */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, 
                  ${pageInfo.fromColor} 0%, 
                  ${pageInfo.toColor} 50%,
                  ${pageInfo.fromColor} 100%)`,
                clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
              }}
              initial={{ 
                clipPath: transitionDirection === 'forward' 
                  ? 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                  : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
              }}
              animate={{ 
                clipPath: [
                  transitionDirection === 'forward' 
                    ? 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                    : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
                  'polygon(0 0, 100% 0, 100% 100%, 0 100%)',  // Full cover
                  transitionDirection === 'forward'
                    ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
                    : 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                ]
              }}
              transition={{ 
                duration: prefersReducedMotion ? 1.0 : 2.0,  // Much slower
                ease: [0.25, 0.46, 0.45, 0.94],
                times: [0, 0.5, 1]
              }}
            />

            {/* Animated Geometric Patterns */}
            {!prefersReducedMotion && (
              <>
                {/* Rotating Rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`ring-${i}`}
                    className="absolute border rounded-full"
                    style={{
                      width: `${200 + i * 100}px`,
                      height: `${200 + i * 100}px`,
                      borderColor: `${pageInfo.toColor}40`,
                      borderWidth: '2px',
                      left: '50%',
                      top: '50%',
                      marginLeft: `-${100 + i * 50}px`,
                      marginTop: `-${100 + i * 50}px`
                    }}
                    initial={{ 
                      scale: 0,
                      rotate: 0,
                      opacity: 0
                    }}
                    animate={{ 
                      scale: [0, 1.2, 0],
                      rotate: [0, 180, 360],
                      opacity: [0, 0.6, 0]
                    }}
                    transition={{ 
                      duration: 1.2,
                      ease: "easeInOut",
                      delay: i * 0.1
                    }}
                  />
                ))}

                {/* Flowing Particles */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      background: `linear-gradient(45deg, ${pageInfo.fromColor}, ${pageInfo.toColor})`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      boxShadow: `0 0 20px ${pageInfo.toColor}80`
                    }}
                    initial={{ 
                      scale: 0,
                      opacity: 0,
                      x: transitionDirection === 'forward' ? -100 : 100,
                      y: Math.random() * 200 - 100
                    }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0],
                      x: [
                        transitionDirection === 'forward' ? -100 : 100,
                        0,
                        transitionDirection === 'forward' ? 100 : -100
                      ],
                      y: [
                        Math.random() * 200 - 100,
                        Math.random() * 100 - 50,
                        Math.random() * 200 - 100
                      ]
                    }}
                    transition={{ 
                      duration: 2.0,  // Slower particles
                      ease: "easeOut",
                      delay: Math.random() * 0.5
                    }}
                  />
                ))}
              </>
            )}

            {/* Central Logo/Brand - FUSION INTERACTIVE */}
            <motion.div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
              initial={{ 
                scale: 0,
                opacity: 0,
                rotate: -10
              }}
              animate={{ 
                scale: [0, 1.1, 1, 1, 0],
                opacity: [0, 1, 1, 1, 0],
                rotate: [
                  transitionDirection === 'forward' ? -10 : 10,
                  0,
                  0,
                  0,
                  transitionDirection === 'forward' ? 10 : -10
                ]
              }}
              transition={{ 
                duration: prefersReducedMotion ? 1.0 : 2.0,
                ease: [0.25, 0.46, 0.45, 0.94],
                times: [0, 0.2, 0.4, 0.8, 1]
              }}
            >
              {/* Large FI Logo */}
              <motion.div 
                className="relative mb-6"
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: [0.8, 1.2, 1.1, 1.1, 0.8],
                  rotateY: [0, 0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2.0,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.4, 0.6, 1]
                }}
              >
                {/* Glowing Background */}
                <div 
                  className="absolute inset-0 rounded-3xl blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${pageInfo.fromColor}60, ${pageInfo.toColor}60)`,
                    transform: 'scale(1.3)'
                  }}
                />
                
                {/* Main Logo Container */}
                <div className="relative w-32 h-32 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl flex items-center justify-center border-2 border-white/30 shadow-2xl">
                  {/* FI Text */}
                  <motion.div
                    className="text-center"
                    animate={{
                      textShadow: [
                        `0 0 20px ${pageInfo.toColor}80`,
                        `0 0 40px ${pageInfo.toColor}ff`,
                        `0 0 20px ${pageInfo.toColor}80`
                      ]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="text-white font-bold text-5xl tracking-tight">F</span>
                    <span className="text-white font-light text-3xl tracking-tight">I</span>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* FUSION INTERACTIVE Text */}
              <motion.div
                className="space-y-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ 
                  y: [20, 0, 0, 0, -20],
                  opacity: [0, 1, 1, 1, 0]
                }}
                transition={{ 
                  duration: 2.0,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.2, 0.4, 0.8, 1]
                }}
              >
                {/* FUSION */}
                <motion.div
                  className="text-6xl font-light text-white tracking-wider"
                  style={{ 
                    textShadow: `0 0 30px ${pageInfo.toColor}80`,
                    fontFamily: '"Inter", sans-serif'
                  }}
                  animate={{
                    letterSpacing: ['0.1em', '0.15em', '0.1em']
                  }}
                  transition={{ 
                    duration: 2.0,
                    ease: "easeInOut"
                  }}
                >
                  FUSION
                </motion.div>
                
                {/* INTERACTIVE */}
                <motion.div
                  className="text-lg font-light tracking-[0.3em] text-white/90"
                  style={{ 
                    textShadow: `0 0 20px ${pageInfo.toColor}60`,
                    fontFamily: '"Inter", sans-serif'
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: [0, 1, 1, 1, 0],
                    scale: [0.9, 1, 1, 1, 0.9]
                  }}
                  transition={{ 
                    duration: 2.0,
                    ease: "easeInOut",
                    times: [0, 0.3, 0.5, 0.7, 1],
                    delay: 0.2
                  }}
                >
                  INTERACTIVE
                </motion.div>
              </motion.div>

              {/* Destination Page Indicator */}
              <motion.div
                className="mt-8 bg-black/40 backdrop-blur-md rounded-full px-8 py-3 border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0, 1, 1, 1, 0],
                  scale: [0.8, 1, 1, 1, 0.8]
                }}
                transition={{ 
                  duration: 2.0,
                  ease: "easeInOut",
                  times: [0, 0.4, 0.6, 0.8, 1],
                  delay: 0.5
                }}
              >
                <motion.span 
                  className="text-white text-xl font-medium"
                  style={{ color: pageInfo.toColor }}
                  animate={{ 
                    textShadow: [
                      `0 0 0px ${pageInfo.toColor}`,
                      `0 0 20px ${pageInfo.toColor}80`,
                      `0 0 30px ${pageInfo.toColor}ff`,
                      `0 0 20px ${pageInfo.toColor}80`,
                      `0 0 0px ${pageInfo.toColor}`
                    ]
                  }}
                  transition={{ 
                    duration: 2.0,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1]
                  }}
                >
                  {pageInfo.toName}
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Progress Bar */}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${pageInfo.fromColor}, ${pageInfo.toColor})`
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ 
                    duration: 1.2,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            )}

            {/* Scan Lines Effect */}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `repeating-linear-gradient(
                    0deg,
                    transparent 0px,
                    transparent 2px,
                    ${pageInfo.toColor}10 2px,
                    ${pageInfo.toColor}10 4px
                  )`
                }}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.3, 0],
                  y: ['-100%', '0%', '100%']
                }}
                transition={{ 
                  duration: 1.2,
                  ease: "linear"
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}