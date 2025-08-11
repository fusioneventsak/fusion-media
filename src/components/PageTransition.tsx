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
  const [showContent, setShowContent] = useState(true);
  
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
    if (currentPage !== displayPage) {
      setIsTransitioning(true);
      setShowContent(false); // Hide content immediately
      onTransitionChange?.(true);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'auto' });
      
      // Switch page content in the middle of transition
      setTimeout(() => {
        setDisplayPage(currentPage);
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, 600);
      
      // Start revealing content
      setTimeout(() => {
        setShowContent(true);
      }, 1000);
      
      // End transition
      setTimeout(() => {
        setIsTransitioning(false);
        onTransitionChange?.(false);
      }, 1400);
    }
  }, [currentPage, displayPage, onTransitionChange]);

  const pageInfo = getPageInfo(currentPage);

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
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {children}
      </motion.div>

      {/* Transition Stinger Frame */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9999,
              background: `linear-gradient(135deg, ${pageInfo.color}ee 0%, ${pageInfo.color}dd 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none'
            }}
            initial={{ 
              clipPath: 'circle(0% at 50% 50%)',
              opacity: 0
            }}
            animate={{ 
              clipPath: [
                'circle(0% at 50% 50%)',      // Start: invisible
                'circle(100% at 50% 50%)',    // Cover everything
                'circle(100% at 50% 50%)',    // Hold
                'circle(0% at 50% 50%)'       // Reveal content
              ],
              opacity: [0, 1, 1, 0]
            }}
            exit={{ 
              clipPath: 'circle(0% at 50% 50%)',
              opacity: 0
            }}
            transition={{
              duration: 1.4,
              ease: [0.25, 0.46, 0.45, 0.94],
              times: [0, 0.3, 0.7, 1]
            }}
          >
            {/* Logo Content */}
            <motion.div
              style={{ textAlign: 'center', color: 'white' }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ 
                opacity: [0, 1, 1, 1, 0],
                scale: [0.8, 1.1, 1, 1, 0.8],
                y: [20, 0, 0, 0, -20]
              }}
              transition={{
                duration: 1.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                times: [0, 0.25, 0.5, 0.75, 1]
              }}
            >
              {/* F Logo */}
              <motion.div
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(255,255,255,0.3)',
                  margin: '0 auto 16px auto',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}
                initial={{ scale: 0, rotate: -10 }}
                animate={{
                  scale: [0, 1.2, 1, 1, 0],
                  rotate: [-10, 5, 0, 0, 10]
                }}
                transition={{
                  duration: 1.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.25, 0.5, 0.75, 1]
                }}
              >
                <span
                  style={{
                    color: 'white',
                    fontSize: '36px',
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
                  fontSize: '32px',
                  fontWeight: '300',
                  color: 'white',
                  letterSpacing: '3px',
                  marginBottom: '4px',
                  textShadow: '0 0 20px rgba(255,255,255,0.5)',
                  fontFamily: '"Inter", sans-serif'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: [0, 1, 1, 1, 0],
                  y: [10, 0, 0, 0, -10],
                  letterSpacing: ['3px', '4px', '3px', '3px', '2px']
                }}
                transition={{
                  duration: 1.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.2, 0.5, 0.8, 1]
                }}
              >
                FUSION
              </motion.div>

              {/* INTERACTIVE Text */}
              <motion.div
                style={{
                  fontSize: '10px',
                  fontWeight: '300',
                  color: 'rgba(255,255,255,0.9)',
                  letterSpacing: '3px',
                  marginBottom: '20px',
                  textShadow: '0 0 10px rgba(255,255,255,0.3)',
                  fontFamily: '"Inter", sans-serif'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: [0, 1, 1, 1, 0],
                  y: [10, 0, 0, 0, -10]
                }}
                transition={{
                  duration: 1.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.25, 0.5, 0.75, 1],
                  delay: 0.05
                }}
              >
                INTERACTIVE
              </motion.div>

              {/* Page Name - DESTINATION */}
              <motion.div
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '12px 24px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'inline-block',
                  marginTop: '8px'
                }}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ 
                  opacity: [0, 1, 1, 1, 0],
                  y: [10, 0, 0, 0, -10],
                  scale: [0.9, 1, 1, 1, 0.9]
                }}
                transition={{ 
                  duration: 1.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.3, 0.5, 0.7, 1],
                  delay: 0.1
                }}
              >
                <span
                  style={{
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 0 10px rgba(255,255,255,0.3)'
                  }}
                >
                  {pageInfo.name}
                </span>
              </motion.div>
            </motion.div>

            {/* Subtle Background Pattern */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
                pointerEvents: 'none'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}