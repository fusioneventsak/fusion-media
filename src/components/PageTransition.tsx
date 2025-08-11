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
      const switchDelay = prefersReducedMotion ? 300 : 600;  // Switch at peak coverage
      const endDelay = prefersReducedMotion ? 600 : 1200;    // Full stinger duration
      
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
                duration: prefersReducedMotion ? 0.6 : 1.2,
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
                      duration: 1.2,
                      ease: "easeOut",
                      delay: Math.random() * 0.3
                    }}
                  />
                ))}
              </>
            )}

            {/* Central Logo/Page Indicator */}
            <motion.div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ 
                scale: 0,
                opacity: 0,
                rotate: -180
              }}
              animate={{ 
                scale: [0, 1.2, 1, 0],
                opacity: [0, 1, 1, 0],
                rotate: [
                  transitionDirection === 'forward' ? -180 : 180,
                  0,
                  0,
                  transitionDirection === 'forward' ? 180 : -180
                ]
              }}
              transition={{ 
                duration: prefersReducedMotion ? 0.6 : 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
                times: [0, 0.3, 0.7, 1]
              }}
            >
              <div className="text-center">
                {/* Company Logo */}
                <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30 shadow-2xl">
                  <span className="text-white font-bold text-3xl">F</span>
                </div>
                
                {/* Page Name */}
                <div className="bg-black/30 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
                  <motion.span 
                    className="text-white text-lg font-medium"
                    style={{ color: pageInfo.toColor }}
                    animate={{ 
                      textShadow: [
                        `0 0 0px ${pageInfo.toColor}`,
                        `0 0 20px ${pageInfo.toColor}80`,
                        `0 0 0px ${pageInfo.toColor}`
                      ]
                    }}
                    transition={{ 
                      duration: 0.8,
                      repeat: 1,
                      ease: "easeInOut"
                    }}
                  >
                    {pageInfo.toName}
                  </motion.span>
                </div>
              </div>
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