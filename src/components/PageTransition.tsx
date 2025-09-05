import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  currentPage: string;
  children: React.ReactNode;
  onTransitionChange?: (isTransitioning: boolean) => void;
}

export default function PageTransition({ currentPage, children, onTransitionChange }: PageTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [transitionKey, setTransitionKey] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [previousPage, setPreviousPage] = useState(currentPage);
  
  // Get page info
  const getPageInfo = (to: string) => {
    const pageColors = {
      'home': '#1E40AF',       // Deeper Blue
      'about': '#6D28D9',      // Deeper Purple
      'case-studies': '#0369A1', // Deeper Cyan
      'contact': '#047857'     // Deeper Green
    };
    
    const pageNames = {
      'home': 'Home',
      'about': 'About',
      'case-studies': 'Case Studies',
      'contact': 'Contact'
    };
    
    return {
      color: pageColors[to as keyof typeof pageColors] || pageColors.home,
      name: pageNames[to as keyof typeof pageNames] || 'Home'
    };
  };

  // Handle page changes
  useEffect(() => {
    // Skip transition on first load if we're on home page
    if (isFirstLoad && currentPage === 'home') {
      setIsFirstLoad(false);
      return;
    }
    
    // Only trigger transition if page actually changed
    if (currentPage === previousPage && !isFirstLoad) {
      return;
    }
    
    if (isTransitioning) return; // Prevent multiple triggers
    
    setIsFirstLoad(false);
    setPreviousPage(currentPage);
    setIsTransitioning(true);
    setShowContent(false); // Hide content immediately when transition starts
    setTransitionKey(prev => prev + 1); // Force new animation
    onTransitionChange?.(true);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    // Start revealing content - faster timing
    setTimeout(() => {
      setShowContent(true);
    }, 2800); // Much faster - content appears quicker
    
    // End transition - faster cleanup
    setTimeout(() => {
      setIsTransitioning(false);
      onTransitionChange?.(false);
    }, 2900); // Much faster cleanup
  }, [currentPage]);

  const pageInfo = getPageInfo(currentPage);

  // Grid square configuration (5x3 = 15 squares) - alternating logo and title
  const squares = [
    { id: 1, direction: 'from-right', type: 'logo' },
    { id: 2, direction: 'from-right', type: 'title' },
    { id: 3, direction: 'from-right', type: 'logo' },
    { id: 4, direction: 'from-bottom', type: 'title' },
    { id: 5, direction: 'from-left', type: 'logo' },
    { id: 6, direction: 'from-right', type: 'title' },
    { id: 7, direction: 'from-right', type: 'logo' },
    { id: 8, direction: 'from-right', type: 'title' },
    { id: 9, direction: 'from-bottom', type: 'logo' },
    { id: 10, direction: 'from-left', type: 'title' },
    { id: 11, direction: 'from-right', type: 'logo' },
    { id: 12, direction: 'from-right', type: 'title' },
    { id: 13, direction: 'from-right', type: 'logo' },
    { id: 14, direction: 'from-bottom', type: 'title' },
    { id: 15, direction: 'from-left', type: 'logo' }
  ];

  // Get animation delays for staggered effect - FASTER delays for quicker animation
  const getSquareDelay = (index: number) => {
    const delayMap = [
      0,     // square 1
      0.08,  // square 2, 6 (much faster)
      0.16,  // square 3, 7, 11 (much faster)
      0.24,  // square 4, 8, 10, 12 (much faster)
      0.32,  // square 5, 9, 13, 15 (much faster)
      0.08,  // square 6 (same as 2)
      0.16,  // square 7 (same as 3)
      0.24,  // square 8 (same as 4)
      0.32,  // square 9 (center)
      0.24,  // square 10 (same as 4)
      0.16,  // square 11 (same as 3)
      0.24,  // square 12 (same as 4)
      0.32,  // square 13 (same as 5)
      0.4,   // square 14 (faster)
      0.32   // square 15 (same as 5)
    ];
    return delayMap[index] || 0;
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Page Content */}
      <motion.div
        style={{ 
          width: '100%', 
          height: '100%',
          opacity: showContent ? 1 : 0,
          visibility: showContent ? 'visible' : 'hidden' // Prevent content flashing
        }}
        animate={{ 
          opacity: showContent ? 1 : 0,
          scale: showContent ? 1 : 0.98
        }}
        transition={{ 
          duration: 0.4, // Faster content fade in
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {children}
      </motion.div>

      {/* Grid Transition */}
      <AnimatePresence>
        {isTransitioning && (
          <div
            key={`transition-${transitionKey}`}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9999,
              pointerEvents: 'none',
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)'
            }}
          >
            {squares.map((square, index) => (
              <motion.div
                key={square.id}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  perspective: '600px',
                  perspectiveOrigin: square.direction === 'from-right' ? '100% 50%' :
                                   square.direction === 'from-left' ? '0% 50%' :
                                   square.direction === 'from-bottom' ? '50% 100%' : '50% 50%'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                {/* Square Inner */}
                <motion.div
                  style={{
                    width: '101%',
                    height: '100%',
                    marginRight: '-1px',
                    background: `linear-gradient(135deg, 
                      ${pageInfo.color}ff 0%, 
                      #ffffff44 15%, 
                      ${pageInfo.color}ee 30%, 
                      #ffffff33 45%, 
                      ${pageInfo.color}ff 60%, 
                      #ffffff44 75%, 
                      ${pageInfo.color}ff 100%)`,
                    backdropFilter: 'blur(10px) saturate(180%) brightness(120%)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    boxShadow: '0 0 20px rgba(255,255,255,0.3), inset 0 0 15px rgba(255,255,255,0.15)',
                    position: 'relative',
                    transformOrigin: square.direction === 'from-right' ? '100% 50% 0' :
                                    square.direction === 'from-left' ? '0% 50% 0' :
                                    square.direction === 'from-bottom' ? '50% 100% 0' : '50% 50% 0',
                    backfaceVisibility: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}
                  initial={{
                    rotateY: square.direction.includes('right') ? -92 : 
                            square.direction.includes('left') ? 92 : 0,
                    rotateX: square.direction.includes('bottom') ? 92 : 0
                  }}
                  animate={{
                    rotateY: [
                      square.direction.includes('right') ? -92 : 
                      square.direction.includes('left') ? 92 : 0,
                      0,
                      0,
                      0,
                      square.direction.includes('right') ? -92 : 
                      square.direction.includes('left') ? 92 : 0
                    ],
                    rotateX: [
                      square.direction.includes('bottom') ? 92 : 0,
                      0,
                      0,
                      0,
                      square.direction.includes('bottom') ? 92 : 0
                    ]
                  }}
                  transition={{
                    duration: 2.2, // Much faster total animation duration
                    times: [0, 0.25, 0.5, 0.75, 1], // Animate in (0-0.25), hold (0.25-0.75), animate out (0.75-1)
                    delay: getSquareDelay(index),
                    ease: 'easeInOut'
                  }}
                >
                  {/* Bright metallic particles */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '20%',
                      left: '15%',
                      width: '8px',
                      height: '8px',
                      background: 'radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.8) 100%)',
                      borderRadius: '50%',
                      filter: 'blur(0.5px)',
                      boxShadow: '0 0 15px rgba(255,255,255,0.9), inset 0 0 8px rgba(255,255,255,0.6)'
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: getSquareDelay(index) + Math.random() * 2
                    }}
                  />
                  
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '70%',
                      right: '25%',
                      width: '6px',
                      height: '6px',
                      background: 'radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                      borderRadius: '50%',
                      filter: 'blur(0.3px)',
                      boxShadow: '0 0 12px rgba(255,255,255,0.8), inset 0 0 6px rgba(255,255,255,0.5)'
                    }}
                    animate={{
                      y: [0, 8, 0],
                      x: [0, 3, 0],
                      opacity: [0.2, 0.6, 0.2]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: getSquareDelay(index) + Math.random() * 2
                    }}
                  />

                  {/* Bright metallic ripple effects */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '40px',
                      height: '40px',
                      border: '2px solid rgba(255,255,255,0.7)',
                      borderRadius: '50%',
                      transform: 'translate(-50%, -50%)',
                      boxShadow: '0 0 20px rgba(255,255,255,0.6), inset 0 0 10px rgba(255,255,255,0.3)'
                    }}
                    animate={{
                      scale: [0.5, 2, 0.5],
                      opacity: [0, 0.4, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: getSquareDelay(index) + 1
                    }}
                  />

                  {/* Bright metallic sweep overlay */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '200%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.3) 70%, transparent 100%)',
                      transform: 'skewX(-20deg)',
                      filter: 'blur(0.5px)'
                    }}
                    animate={{
                      x: ['0%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: getSquareDelay(index) + 0.5,
                      ease: 'easeInOut'
                    }}
                  />

                  {/* Logo or Title content - step and repeat pattern */}
                  {square.type === 'logo' && (
                    <motion.div
                      style={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center', 
                        color: 'white',
                        opacity: 0,
                        zIndex: 10,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      animate={{
                        opacity: [0, 0, 1, 1, 1, 0]
                      }}
                      transition={{
                        duration: 3.5,
                        times: [0, 0.15, 0.25, 0.5, 0.75, 1],
                        delay: getSquareDelay(index) + 0.3
                      }}
                    >
                      {/* Fusion Interactive Logo */}
                      <motion.img 
                        src="/logos/FI LOGO 6.png" 
                        alt="Fusion Interactive Logo" 
                        style={{
                          height: '36px',
                          width: 'auto',
                          filter: 'brightness(1.3) contrast(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.5))'
                        }}
                        animate={{
                          scale: [0.8, 1.05, 1],
                          rotate: [0, 2, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          times: [0, 0.6, 1],
                          delay: getSquareDelay(index) + 0.5
                        }}
                      />
                    </motion.div>
                  )}

                  {square.type === 'title' && (
                    <motion.div
                      style={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center', 
                        color: 'white',
                        opacity: 0,
                        zIndex: 10,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      animate={{
                        opacity: [0, 0, 1, 1, 1, 0]
                      }}
                      transition={{
                        duration: 3.5,
                        times: [0, 0.15, 0.25, 0.5, 0.75, 1],
                        delay: getSquareDelay(index) + 0.3
                      }}
                    >
                      {/* Title Text */}
                      <motion.div
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.2) 100%)',
                          backdropFilter: 'blur(10px) saturate(180%) brightness(120%)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          border: '1px solid rgba(255,255,255,0.4)',
                          display: 'inline-block',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: '0 0 20px rgba(255,255,255,0.3), 0 8px 32px rgba(31, 38, 135, 0.37), inset 0 0 12px rgba(255,255,255,0.15)'
                        }}
                        animate={{
                          scale: [0.9, 1.05, 1]
                        }}
                        transition={{
                          duration: 1.2,
                          times: [0, 0.7, 1],
                          delay: getSquareDelay(index) + 0.5
                        }}
                      >
                        {/* Bright metallic shimmer on title container */}
                        <motion.div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '200%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 60%, transparent 100%)',
                            transform: 'skewX(-15deg)',
                            filter: 'blur(0.5px)'
                          }}
                          animate={{
                            x: ['0%', '100%']
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: getSquareDelay(index) + 1.2,
                            ease: 'easeInOut'
                          }}
                        />
                        
                        <motion.div
                          style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: 'white',
                            letterSpacing: '1px',
                            textShadow: '0 0 8px rgba(255,255,255,0.4)',
                            fontFamily: '"Inter", sans-serif',
                            position: 'relative',
                            zIndex: 2
                          }}
                          animate={{
                            letterSpacing: ['1px', '1.5px', '1px']
                          }}
                          transition={{
                            duration: 2.0,
                            delay: getSquareDelay(index) + 0.7
                          }}
                        >
                          FUSION
                        </motion.div>
                        
                        <motion.div
                          style={{
                            fontSize: '8px',
                            fontWeight: '400',
                            color: 'rgba(255,255,255,0.8)',
                            letterSpacing: '2px',
                            marginTop: '2px',
                            textShadow: '0 0 6px rgba(255,255,255,0.3)',
                            fontFamily: '"Inter", sans-serif',
                            position: 'relative',
                            zIndex: 2
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: getSquareDelay(index) + 0.9 }}
                        >
                          INTERACTIVE
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Removed dark overlay for brighter effect */}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}