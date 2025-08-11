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
  const [logoComplete, setLogoComplete] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');
  
  // Page info
  const getPageInfo = (from: string, to: string) => {
    const pages = ['home', 'about', 'case-studies', 'contact'];
    const pageColors = {
      'home': '#3B82F6',
      'about': '#8B5CF6',
      'case-studies': '#06B6D4',
      'contact': '#10B981'
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
      toName: pageNames[to as keyof typeof pageNames] || 'Home'
    };
  };

  // Handle page changes
  useEffect(() => {
    if (currentPage !== displayPage) {
      const pageInfo = getPageInfo(displayPage, currentPage);
      setTransitionDirection(pageInfo.direction);
      setIsTransitioning(true);
      setLogoComplete(false);
      onTransitionChange?.(true);
      
      window.scrollTo({ top: 0, behavior: 'auto' });
      
      // Logo completes at 1.2 seconds
      setTimeout(() => setLogoComplete(true), 1200);
      
      // Page switches at 600ms
      setTimeout(() => {
        setDisplayPage(currentPage);
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, 600);
      
      // Total transition ends at 1.8 seconds
      setTimeout(() => {
        setIsTransitioning(false);
        onTransitionChange?.(false);
      }, 1800);
    }
  }, [currentPage, displayPage, onTransitionChange]);

  const pageInfo = getPageInfo(displayPage, currentPage);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Content stays mounted */}
      {children}

      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            {/* Background Wipe */}
            <motion.div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9998,
                background: `linear-gradient(135deg, ${pageInfo.fromColor} 0%, ${pageInfo.toColor} 50%, ${pageInfo.fromColor} 100%)`,
                clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
              }}
              initial={{ 
                clipPath: transitionDirection === 'forward' 
                  ? 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                  : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
              }}
              animate={{ 
                clipPath: logoComplete 
                  ? (transitionDirection === 'forward'
                      ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
                      : 'polygon(0 0, 0 0, 0 100%, 0 100%)')
                  : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
              }}
              transition={{ 
                duration: logoComplete ? 0.6 : 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            />

            {/* Logo Overlay - COMPLETELY SEPARATE */}
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 9999,
                pointerEvents: 'none'
              }}
            >
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: logoComplete ? 0 : 1,
                  scale: logoComplete ? 0 : 1
                }}
                transition={{ 
                  duration: logoComplete ? 0.3 : 0.6,
                  ease: 'easeInOut'
                }}
              >
                {/* F Logo */}
                <motion.div
                  style={{
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255,255,255,0.3)',
                    margin: '0 auto 24px auto',
                    boxShadow: `0 25px 50px ${pageInfo.toColor}30`
                  }}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ 
                    scale: logoComplete ? 0 : [0, 1.1, 1],
                    rotate: logoComplete ? 15 : [transitionDirection === 'forward' ? -10 : 10, 0]
                  }}
                  transition={{ duration: logoComplete ? 0.3 : 1.0 }}
                >
                  <span
                    style={{
                      color: 'white',
                      fontSize: '64px',
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
                    fontSize: '64px',
                    fontWeight: '300',
                    color: 'white',
                    letterSpacing: '6px',
                    marginBottom: '8px',
                    textShadow: `0 0 30px ${pageInfo.toColor}80`,
                    fontFamily: '"Inter", sans-serif'
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: logoComplete ? -20 : 0,
                    opacity: logoComplete ? 0 : 1
                  }}
                  transition={{ 
                    duration: logoComplete ? 0.3 : 0.8,
                    delay: logoComplete ? 0 : 0.2
                  }}
                >
                  FUSION
                </motion.div>

                {/* INTERACTIVE Text */}
                <motion.div
                  style={{
                    fontSize: '16px',
                    fontWeight: '300',
                    color: 'rgba(255,255,255,0.9)',
                    letterSpacing: '6px',
                    marginBottom: '32px',
                    textShadow: `0 0 20px ${pageInfo.toColor}60`,
                    fontFamily: '"Inter", sans-serif'
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: logoComplete ? -20 : 0,
                    opacity: logoComplete ? 0 : 1
                  }}
                  transition={{ 
                    duration: logoComplete ? 0.3 : 0.8,
                    delay: logoComplete ? 0 : 0.4
                  }}
                >
                  INTERACTIVE
                </motion.div>

                {/* Page Name */}
                <motion.div
                  style={{
                    background: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '50px',
                    padding: '12px 24px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'inline-block'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: logoComplete ? 0 : 1,
                    scale: logoComplete ? 0.7 : 1
                  }}
                  transition={{ 
                    duration: logoComplete ? 0.3 : 0.8,
                    delay: logoComplete ? 0 : 0.6
                  }}
                >
                  <span
                    style={{
                      color: pageInfo.toColor,
                      fontSize: '18px',
                      fontWeight: '500',
                      fontFamily: '"Inter", sans-serif'
                    }}
                  >
                    {pageInfo.toName}
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}