import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';

interface PageTransitionProps {
  currentPage: string;
  children: React.ReactNode;
  onTransitionChange?: (isTransitioning: boolean) => void;
}

export default function PageTransition({ currentPage, children, onTransitionChange }: PageTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPage, setDisplayPage] = useState(currentPage);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Smooth spring for organic movement
  const springConfig = { 
    type: "spring", 
    stiffness: 180, 
    damping: 25, 
    mass: 0.8 
  };

  // Get navigation direction and page info
  const getPageInfo = (from: string, to: string) => {
    const pages = ['home', 'about', 'case-studies', 'contact'];
    const pageColors = {
      'home': '#3B82F6',         // Blue
      'about': '#8B5CF6',        // Purple  
      'case-studies': '#06B6D4', // Cyan
      'contact': '#10B981'       // Green
    };
    
    const fromIndex = pages.indexOf(from);
    const toIndex = pages.indexOf(to);
    const direction = toIndex > fromIndex ? 'forward' : 'backward';
    
    return {
      direction,
      fromColor: pageColors[from as keyof typeof pageColors] || pageColors.home,
      toColor: pageColors[to as keyof typeof pageColors] || pageColors.home,
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
      
      // Page switch timing
      const switchDelay = prefersReducedMotion ? 200 : 400;
      const endDelay = prefersReducedMotion ? 500 : 900;
      
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

  // Modern fluid transition variants
  const fluidTransition = {
    initial: { 
      scale: 1,
      opacity: 1,
      filter: 'blur(0px) brightness(1)',
      rotateX: 0,
      y: 0
    },
    animate: {
      scale: [1, 0.98, 1.02, 1],
      opacity: [1, 0.4, 0.6, 1],
      filter: [
        'blur(0px) brightness(1)', 
        'blur(3px) brightness(1.1)', 
        'blur(2px) brightness(1.05)', 
        'blur(0px) brightness(1)'
      ],
      rotateX: [0, -2, 1, 0],
      y: [0, -8, 4, 0]
    },
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
      times: [0, 0.35, 0.65, 1]
    }
  };

  // Reduced motion fallback
  const simpleTransition = {
    initial: { opacity: 1 },
    animate: { opacity: [1, 0.8, 1] },
    transition: { duration: 0.5, ease: "easeInOut" }
  };

  const currentTransition = prefersReducedMotion ? simpleTransition : fluidTransition;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full"
    >
      {/* Main content - always visible, no AnimatePresence */}
      <div className="w-full h-full">
        {/* Enhanced background effects during transition */}
        {!prefersReducedMotion && isTransitioning && (
          <>
            {/* Color morphing background */}
            <motion.div
              className="fixed inset-0 pointer-events-none z-10"
              style={{
                background: `radial-gradient(ellipse at center, 
                  ${pageInfo.fromColor}15 0%, 
                  ${pageInfo.toColor}10 40%, 
                  transparent 70%)`
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            {/* Elegant particle flow */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="fixed w-2 h-2 rounded-full pointer-events-none z-15"
                style={{
                  background: `linear-gradient(45deg, ${pageInfo.fromColor}, ${pageInfo.toColor})`,
                  left: `${20 + (i * 8) % 60}%`,
                  top: `${30 + (i * 5) % 40}%`,
                  boxShadow: `0 0 20px ${i % 2 === 0 ? pageInfo.fromColor : pageInfo.toColor}60`
                }}
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  x: transitionDirection === 'forward' ? -50 : 50
                }}
                animate={{
                  opacity: [0, 1, 0.6, 0],
                  scale: [0, 1.5, 1, 0],
                  x: [
                    transitionDirection === 'forward' ? -50 : 50,
                    0,
                    transitionDirection === 'forward' ? 50 : -50
                  ]
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: i * 0.05
                }}
              />
            ))}

            {/* Gradient sweep */}
            <motion.div
              className="fixed inset-0 pointer-events-none z-12"
              style={{
                background: `linear-gradient(${transitionDirection === 'forward' ? '120deg' : '240deg'}, 
                  transparent 0%, 
                  ${pageInfo.fromColor}20 30%,
                  ${pageInfo.toColor}25 50%,
                  ${pageInfo.fromColor}20 70%,
                  transparent 100%)`
              }}
              initial={{ 
                x: transitionDirection === 'forward' ? '-100%' : '100%',
                opacity: 0
              }}
              animate={{ 
                x: [
                  transitionDirection === 'forward' ? '-100%' : '100%',
                  '0%',
                  transitionDirection === 'forward' ? '100%' : '-100%'
                ],
                opacity: [0, 0.7, 0.4, 0]
              }}
              transition={{ 
                duration: 0.8,
                ease: "easeInOut"
              }}
            />
          </>
        )}
        
        {/* Loading indicator */}
        {isTransitioning && (
          <motion.div
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-black/50 backdrop-blur-md rounded-full px-6 py-3 border border-white/30">
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: pageInfo.toColor }}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ 
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-white text-sm font-medium">
                  Loading {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}...
                </span>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Content stays mounted - no AnimatePresence */}
        {children}
      </div>

      {/* Dynamic color morphing background */}
      <AnimatePresence>
        {isTransitioning && !prefersReducedMotion && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, 
                ${pageInfo.fromColor}08 0%, 
                ${pageInfo.toColor}06 40%, 
                transparent 70%)`
            }}
            initial={{ 
              opacity: 0,
              scale: 0.8,
              filter: 'blur(20px)'
            }}
            animate={{ 
              opacity: [0, 0.8, 0.4, 0],
              scale: [0.8, 1.4, 1.1, 0.9],
              filter: [
                'blur(20px)', 
                'blur(10px)', 
                'blur(15px)', 
                'blur(25px)'
              ]
            }}
            exit={{ 
              opacity: 0,
              scale: 0.7,
              filter: 'blur(30px)'
            }}
            transition={{ 
              duration: 0.9,
              ease: [0.25, 0.46, 0.45, 0.94],
              times: [0, 0.3, 0.7, 1]
            }}
          />
        )}
      </AnimatePresence>

      {/* Elegant particle flow */}
      <AnimatePresence>
        {isTransitioning && !prefersReducedMotion && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="fixed w-1 h-1 rounded-full pointer-events-none"
                style={{
                  background: `linear-gradient(45deg, ${pageInfo.fromColor}80, ${pageInfo.toColor}60)`,
                  left: `${20 + (i * 5) % 60}%`,
                  top: `${30 + (i * 3) % 40}%`,
                  boxShadow: `0 0 10px ${i % 2 === 0 ? pageInfo.fromColor : pageInfo.toColor}40`
                }}
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  x: transitionDirection === 'forward' ? -100 : 100,
                  y: Math.random() * 50 - 25
                }}
                animate={{
                  opacity: [0, 0.9, 0.6, 0],
                  scale: [0, 1.5, 1, 0],
                  x: [
                    transitionDirection === 'forward' ? -100 : 100,
                    0,
                    transitionDirection === 'forward' ? 100 : -100
                  ],
                  y: [
                    Math.random() * 50 - 25,
                    Math.random() * 30 - 15,
                    Math.random() * 40 - 20
                  ]
                }}
                exit={{ 
                  opacity: 0,
                  scale: 0
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: i * 0.03,
                  times: [0, 0.2, 0.8, 1]
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Sophisticated gradient sweep */}
      <AnimatePresence>
        {isTransitioning && !prefersReducedMotion && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(${transitionDirection === 'forward' ? '120deg' : '240deg'}, 
                transparent 0%, 
                ${pageInfo.fromColor}08 20%,
                ${pageInfo.toColor}12 50%,
                ${pageInfo.fromColor}08 80%,
                transparent 100%)`
            }}
            initial={{ 
              x: transitionDirection === 'forward' ? '-100%' : '100%',
              opacity: 0
            }}
            animate={{ 
              x: [
                transitionDirection === 'forward' ? '-100%' : '100%',
                '0%',
                transitionDirection === 'forward' ? '100%' : '-100%'
              ],
              opacity: [0, 0.6, 0.3, 0]
            }}
            transition={{ 
              duration: 0.9,
              ease: [0.25, 0.46, 0.45, 0.94],
              times: [0, 0.3, 0.7, 1]
            }}
          />
        )}
      </AnimatePresence>

      {/* Subtle glow effect */}
      <AnimatePresence>
        {isTransitioning && !prefersReducedMotion && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, 
                transparent 0deg,
                ${pageInfo.toColor}04 90deg,
                transparent 180deg,
                ${pageInfo.fromColor}04 270deg,
                transparent 360deg)`,
              filter: 'blur(40px)'
            }}
            initial={{ 
              opacity: 0,
              rotate: 0,
              scale: 0.5
            }}
            animate={{ 
              opacity: [0, 0.4, 0],
              rotate: [0, transitionDirection === 'forward' ? 180 : -180],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{ 
              duration: 0.9,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          />
        )}
      </AnimatePresence>

      {/* Loading progress indicator */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-black/30 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: pageInfo.toColor }}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ 
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-white text-sm font-medium">
                  Transitioning...
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}