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
    if (isTransitioning) return; // Prevent multiple triggers
    
    setIsTransitioning(true);
    setShowContent(false);
    setTransitionKey(prev => prev + 1); // Force new animation
    onTransitionChange?.(true);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    // Start revealing content
    setTimeout(() => {
      setShowContent(true);
    }, 1800);
    
    // End transition
    setTimeout(() => {
      setIsTransitioning(false);
      onTransitionChange?.(false);
    }, 2400);
  }, [currentPage]);

  const pageInfo = getPageInfo(currentPage);

  // Grid square configuration (5x3 = 15 squares)
  const squares = [
    { id: 1, direction: 'from-right', hasLogo: false },
    { id: 2, direction: 'from-right', hasLogo: false },
    { id: 3, direction: 'from-right', hasLogo: false },
    { id: 4, direction: 'from-bottom', hasLogo: false },
    { id: 5, direction: 'from-left', hasLogo: false },
    { id: 6, direction: 'from-right', hasLogo: false },
    { id: 7, direction: 'from-right', hasLogo: false },
    { id: 8, direction: 'from-right', hasLogo: false },
    { id: 9, direction: 'from-bottom', hasLogo: true }, // Center square with logo
    { id: 10, direction: 'from-left', hasLogo: false },
    { id: 11, direction: 'from-right', hasLogo: false },
    { id: 12, direction: 'from-right', hasLogo: false },
    { id: 13, direction: 'from-right', hasLogo: false },
    { id: 14, direction: 'from-bottom', hasLogo: false },
    { id: 15, direction: 'from-left', hasLogo: false }
  ];

  // Get animation delays for staggered effect
  const getSquareDelay = (index: number) => {
    const delayMap = [
      0,     // square 1
      0.1,   // square 2, 6
      0.2,   // square 3, 7, 11
      0.3,   // square 4, 8, 10, 12
      0.4,   // square 5, 9, 13, 15
      0.1,   // square 6 (same as 2)
      0.2,   // square 7 (same as 3)
      0.3,   // square 8 (same as 4)
      0.4,   // square 9 (center)
      0.3,   // square 10 (same as 4)
      0.2,   // square 11 (same as 3)
      0.3,   // square 12 (same as 4)
      0.4,   // square 13 (same as 5)
      0.5,   // square 14
      0.4    // square 15 (same as 5)
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
          opacity: showContent ? 1 : 0
        }}
        animate={{ 
          opacity: showContent ? 1 : 0,
          scale: showContent ? 1 : 0.95
        }}
        transition={{ 
          duration: 0.6,
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
                      square.direction.includes('right') ? -92 : 
                      square.direction.includes('left') ? 92 : 0
                    ],
                    rotateX: [
                      square.direction.includes('bottom') ? 92 : 0,
                      0,
                      0,
                      square.direction.includes('bottom') ? 92 : 0
                    ]
                  }}
                  transition={{
                    duration: 0.3,
                    times: [0, 0.3, 0.7, 1],
                    delay: getSquareDelay(index),
                    ease: 'linear'
                  }}
                >
                  {/* Logo in center square */}
                  {square.hasLogo && (
                    <motion.div
                      style={{ 
                        textAlign: 'center', 
                        color: 'white',
                        opacity: 0
                      }}
                      animate={{
                        opacity: [0, 1, 1, 0]
                      }}
                      transition={{
                        duration: 1.2,
                        times: [0, 0.3, 0.7, 1],
                        delay: 0.4
                      }}
                    >
                      {/* F Logo */}
                      <motion.div
                        style={{
                          width: '60px',
                          height: '60px',
                          background: 'rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(20px)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '2px solid rgba(255,255,255,0.3)',
                          margin: '0 auto 12px auto',
                          boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                        }}
                        animate={{
                          scale: [0.8, 1.1, 1],
                          rotate: [0, 5, 0]
                        }}
                        transition={{
                          duration: 1.2,
                          times: [0, 0.5, 1],
                          delay: 0.6
                        }}
                      >
                        <span
                          style={{
                            color: 'white',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            fontFamily: '"Inter", sans-serif'
                          }}
                        >
                          F
                        </span>
                      </motion.div>

                      {/* FUSION Text */}
                      <motion.div
                        style={{
                          fontSize: '20px',
                          fontWeight: '300',
                          color: 'white',
                          letterSpacing: '2px',
                          marginBottom: '2px',
                          textShadow: '0 0 10px rgba(255,255,255,0.5)',
                          fontFamily: '"Inter", sans-serif'
                        }}
                        animate={{
                          letterSpacing: ['2px', '3px', '2px']
                        }}
                        transition={{
                          duration: 1.5,
                          delay: 0.8
                        }}
                      >
                        FUSION
                      </motion.div>

                      {/* INTERACTIVE Text */}
                      <motion.div
                        style={{
                          fontSize: '8px',
                          fontWeight: '300',
                          color: 'rgba(255,255,255,0.9)',
                          letterSpacing: '2px',
                          marginBottom: '8px',
                          textShadow: '0 0 8px rgba(255,255,255,0.3)',
                          fontFamily: '"Inter", sans-serif'
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.0 }}
                      >
                        INTERACTIVE
                      </motion.div>

                      {/* Page Name */}
                      <motion.div
                        style={{
                          background: 'rgba(255,255,255,0.15)',
                          backdropFilter: 'blur(20px)',
                          borderRadius: '12px',
                          padding: '6px 12px',
                          border: '1px solid rgba(255,255,255,0.2)',
                          display: 'inline-block'
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, duration: 0.4 }}
                      >
                        <span
                          style={{
                            color: 'white',
                            fontSize: '10px',
                            fontWeight: '500',
                            fontFamily: '"Inter", sans-serif'
                          }}
                        >
                          {pageInfo.name}
                        </span>
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
                    opacity: [0, 0.6, 0.6, 0]
                  }}
                  transition={{
                    duration: 0.3,
                    times: [0, 0.3, 0.7, 1],
                    delay: getSquareDelay(index),
                    ease: 'linear'
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