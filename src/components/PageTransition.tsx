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
      'home': '#3B82F6',       // Blue
      'about': '#8B5CF6',      // Purple
      'case-studies': '#06B6D4', // Cyan
      'contact': '#10B981'     // Green
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
    
    // Start revealing content - immediately when squares finish animating out
    setTimeout(() => {
      setShowContent(true);
    }, 4200); // Reduced from 4500ms - content appears right as squares finish
    
    // End transition - slightly after content appears for smooth handoff
    setTimeout(() => {
      setIsTransitioning(false);
      onTransitionChange?.(false);
    }, 4300); // Reduced from 5200ms - quicker cleanup
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

  // Get animation delays for staggered effect - INCREASED delays for slower animation
  const getSquareDelay = (index: number) => {
    const delayMap = [
      0,     // square 1
      0.15,  // square 2, 6 (increased from 0.1)
      0.3,   // square 3, 7, 11 (increased from 0.2)
      0.45,  // square 4, 8, 10, 12 (increased from 0.3)
      0.6,   // square 5, 9, 13, 15 (increased from 0.4)
      0.15,  // square 6 (same as 2)
      0.3,   // square 7 (same as 3)
      0.45,  // square 8 (same as 4)
      0.6,   // square 9 (center)
      0.45,  // square 10 (same as 4)
      0.3,   // square 11 (same as 3)
      0.45,  // square 12 (same as 4)
      0.6,   // square 13 (same as 5)
      0.75,  // square 14 (increased from 0.5)
      0.6    // square 15 (same as 5)
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
                    background: pageInfo.color,
                    position: 'relative',
                    transformOrigin: square.direction === 'from-right' ? '100% 50% 0' :
                                    square.direction === 'from-left' ? '0% 50% 0' :
                                    square.direction === 'from-bottom' ? '50% 100% 0' : '50% 50% 0',
                    backfaceVisibility: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
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
                    duration: 3.5, // Total animation duration
                    times: [0, 0.2, 0.5, 0.8, 1], // Animate in (0-0.2), hold (0.2-0.8), animate out (0.8-1)
                    delay: getSquareDelay(index),
                    ease: 'easeInOut'
                  }}
                >
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
                      {/* F Logo */}
                      <motion.div
                        style={{
                          width: '50px',
                          height: '50px',
                          background: 'linear-gradient(to right, #3B82F6, #8B5CF6)', // Blue to purple gradient
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid rgba(255,255,255,0.4)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                        }}
                        animate={{
                          scale: [0.8, 1.05, 1],
                          rotate: [0, 3, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          times: [0, 0.6, 1],
                          delay: getSquareDelay(index) + 0.5
                        }}
                      >
                        <span
                          style={{
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            fontFamily: '"Inter", sans-serif'
                          }}
                        >
                          F
                        </span>
                      </motion.div>
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
                          background: 'rgba(255,255,255,0.15)',
                          backdropFilter: 'blur(15px)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          border: '1px solid rgba(255,255,255,0.3)',
                          display: 'inline-block'
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
                        <motion.div
                          style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: 'white',
                            letterSpacing: '1px',
                            textShadow: '0 0 8px rgba(255,255,255,0.4)',
                            fontFamily: '"Inter", sans-serif'
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
                            fontFamily: '"Inter", sans-serif'
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

                {/* Square Overlay */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    background: '#000',
                    pointerEvents: 'none'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.6, 0.6, 0.6, 0]
                  }}
                  transition={{
                    duration: 3.5, // Match square animation duration
                    times: [0, 0.2, 0.5, 0.8, 1], // Sync with square timing
                    delay: getSquareDelay(index),
                    ease: 'easeInOut'
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}