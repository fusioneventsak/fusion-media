import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HologramTransitionProps {
  currentPage: string;
  children: React.ReactNode;
}

// Scan Lines Component - Updated with site colors
const ScanLines: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        style={{ top: `${i * 3.33}%` }}
        initial={{ opacity: 0, scaleX: 0, x: '-100%' }}
        animate={isActive ? {
          opacity: [0, 1, 0.8, 1, 0.6, 0.9, 0],
          scaleX: [0, 1.2, 1, 1.1, 0.9, 1, 0],
          x: ['-100%', '0%', '0%', '0%', '0%', '0%', '100%']
        } : { opacity: 0, scaleX: 0 }}
        transition={{ 
          duration: 1.8, 
          delay: i * 0.02,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      />
    ))}
  </div>
);

// Holographic Grid - Updated with site colors
const HolographicGrid: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <motion.div
    className="absolute inset-0 pointer-events-none z-40 hologram-layer"
    style={{
      backgroundImage: `
        linear-gradient(rgba(59, 130, 246, 0.8) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.8) 1px, transparent 1px),
        linear-gradient(rgba(147, 51, 234, 0.6) 1px, transparent 1px),
        linear-gradient(90deg, rgba(147, 51, 234, 0.6) 1px, transparent 1px)
      `,
      backgroundSize: '30px 30px, 30px 30px, 60px 60px, 60px 60px',
      backgroundPosition: '0 0, 0 0, 15px 15px, 15px 15px'
    }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={isActive ? {
      opacity: [0, 0.9, 1, 0.8, 1, 0.7, 0],
      scale: [0.8, 1.1, 1, 1.05, 0.95, 1.02, 0.9]
    } : { opacity: 0, scale: 0.8 }}
    transition={{ 
      duration: 2.2, 
      ease: [0.25, 0.46, 0.45, 0.94],
      times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1]
    }}
  />
);

// Interference Patterns - Updated with site colors
const InterferencePattern: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <>
    {/* Vertical sweep - Blue */}
    <motion.div
      className="absolute top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent pointer-events-none z-45 hologram-layer"
      style={{ width: '120px', height: '100vh', left: '-120px' }}
      animate={isActive ? {
        x: [0, window.innerWidth + 240],
        opacity: [0, 1, 1, 0.9, 0]
      } : { x: 0, opacity: 0 }}
      transition={{ 
        duration: 1.4, 
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    />
    
    {/* Horizontal sweep - Purple */}
    <motion.div
      className="absolute left-0 bg-gradient-to-b from-transparent via-purple-500 to-transparent pointer-events-none z-45 hologram-layer"
      style={{ height: '100px', width: '100vw', top: '-100px' }}
      animate={isActive ? {
        y: [0, window.innerHeight + 200],
        opacity: [0, 0.8, 1, 0.7, 0]
      } : { y: 0, opacity: 0 }}
      transition={{ 
        duration: 1.8, 
        delay: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    />

    {/* Diagonal interference - Purple gradient */}
    <motion.div
      className="absolute inset-0 pointer-events-none z-44 hologram-layer"
      style={{
        background: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 2px,
          rgba(147, 51, 234, 0.4) 2px,
          rgba(147, 51, 234, 0.4) 4px
        )`
      }}
      animate={isActive ? {
        opacity: [0, 0.6, 0.8, 0.5, 0.7, 0],
        x: [0, 20, 40, 60, 80, 100],
        y: [0, 20, 40, 60, 80, 100]
      } : { opacity: 0 }}
      transition={{ 
        duration: 2, 
        ease: "linear"
      }}
    />
  </>
);

// Hologram Particles - Updated with site colors
const HologramParticles: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className="absolute inset-0 pointer-events-none z-46 overflow-hidden">
    {[...Array(25)].map((_, i) => {
      const colors = ['bg-blue-400', 'bg-purple-400', 'bg-cyan-400'];
      const colorClass = colors[i % colors.length];
      
      return (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 ${colorClass} rounded-full`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? {
            opacity: [0, 1, 0.9, 0.8, 1, 0],
            scale: [0, 1.5, 1, 1.2, 0.8, 0],
            y: [0, -20, -40, -60, -80, -100],
            x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 80]
          } : { opacity: 0, scale: 0 }}
          transition={{
            duration: 2,
            delay: i * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
      );
    })}
  </div>
);

// Glitch Effect - Updated with site colors
const GlitchEffect: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <motion.div
    className="absolute inset-0 pointer-events-none z-48 hologram-layer"
    style={{
      background: `
        linear-gradient(90deg, transparent 98%, rgba(59, 130, 246, 0.8) 100%),
        linear-gradient(90deg, transparent 70%, rgba(147, 51, 234, 0.6) 71%, rgba(147, 51, 234, 0.6) 72%, transparent 73%)
      `,
      backgroundSize: '100px 100%, 50px 100%'
    }}
    animate={isActive ? {
      opacity: [0, 0.9, 0, 0.7, 0, 1, 0],
      x: [0, -2, 2, -1, 1, -3, 0]
    } : { opacity: 0 }}
    transition={{
      duration: 0.8,
      delay: 0.3,
      ease: "easeInOut"
    }}
  />
);

// Solid Transition Background - Completely opaque
const SolidTransitionBackground: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <AnimatePresence>
    {isActive && (
      <motion.div
        className="fixed inset-0 z-35 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.7, 1, 1, 1, 0.7, 0],
          background: [
            'linear-gradient(135deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)',
            'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.7) 100%)',
            'linear-gradient(135deg, rgba(15, 23, 42, 1) 0%, rgba(30, 41, 59, 1) 100%)',
            'linear-gradient(135deg, rgba(15, 23, 42, 1) 0%, rgba(30, 41, 59, 1) 100%)',
            'linear-gradient(135deg, rgba(15, 23, 42, 1) 0%, rgba(30, 41, 59, 1) 100%)',
            'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.7) 100%)',
            'linear-gradient(135deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)'
          ]
        }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 2.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          times: [0, 0.15, 0.35, 0.5, 0.65, 0.85, 1]
        }}
      />
    )}
  </AnimatePresence>
);

// Hologram Energy Field - Additional solid layer
const HologramEnergyField: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <AnimatePresence>
    {isActive && (
      <motion.div
        className="fixed inset-0 z-36 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.4, 0.8, 1, 0.8, 0.4, 0],
          background: [
            'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0) 0%, rgba(147, 51, 234, 0) 100%)',
            'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.1) 100%)',
            'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.3) 100%)',
            'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.6) 0%, rgba(147, 51, 234, 0.5) 100%)',
            'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.3) 100%)',
            'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.1) 100%)',
            'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0) 0%, rgba(147, 51, 234, 0) 100%)'
          ]
        }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 2.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          times: [0, 0.15, 0.35, 0.5, 0.65, 0.85, 1]
        }}
      />
    )}
  </AnimatePresence>
);

// Main Hologram Overlay Component
const HologramOverlay: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <AnimatePresence>
    {isActive && (
      <motion.div
        className="fixed inset-0 z-40 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ScanLines isActive={isActive} />
        <HolographicGrid isActive={isActive} />
        <InterferencePattern isActive={isActive} />
        <HologramParticles isActive={isActive} />
        <GlitchEffect isActive={isActive} />
        
        {/* Hologram border effect - Updated colors */}
        <motion.div
          className="absolute inset-4 border-2 border-blue-400 pointer-events-none z-47"
          animate={isActive ? {
            opacity: [0, 1, 0.7, 1, 0.5, 0.8, 0],
            borderWidth: [2, 3, 1, 4, 2, 3, 1],
            borderColor: [
              'rgba(59, 130, 246, 0)',
              'rgba(59, 130, 246, 1)',
              'rgba(147, 51, 234, 0.7)',
              'rgba(59, 130, 246, 1)',
              'rgba(147, 51, 234, 0.5)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(59, 130, 246, 0)'
            ]
          } : { opacity: 0 }}
          transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Additional corner accents */}
        {[
          { top: '20px', left: '20px' },
          { top: '20px', right: '20px' },
          { bottom: '20px', left: '20px' },
          { bottom: '20px', right: '20px' }
        ].map((position, index) => (
          <motion.div
            key={index}
            className="absolute w-8 h-8 border-l-2 border-t-2 border-purple-400 pointer-events-none z-47"
            style={{
              ...position,
              transform: `rotate(${index * 90}deg)`,
              transformOrigin: 'center'
            }}
            animate={isActive ? {
              opacity: [0, 1, 0.8, 1, 0.6, 0.9, 0],
              scale: [0.5, 1.2, 1, 1.1, 0.9, 1, 0.5]
            } : { opacity: 0 }}
            transition={{ 
              duration: 2, 
              delay: index * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
          />
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

// Content Animation Presets
const hologramContentAnimation = {
  opacity: [1, 0.3, 0.7, 0.4, 0.9, 0.2, 0.8, 1],
  scale: [1, 1.02, 0.98, 1.01, 0.99, 1.01, 0.995, 1],
  filter: [
    'brightness(1) contrast(1) hue-rotate(0deg)',
    'brightness(1.2) contrast(1.1) hue-rotate(10deg)',
    'brightness(0.9) contrast(0.95) hue-rotate(-5deg)',
    'brightness(1.1) contrast(1.05) hue-rotate(15deg)',
    'brightness(0.95) contrast(0.98) hue-rotate(-10deg)',
    'brightness(1.15) contrast(1.08) hue-rotate(5deg)',
    'brightness(1.05) contrast(1.02) hue-rotate(-2deg)',
    'brightness(1) contrast(1) hue-rotate(0deg)'
  ]
};

const hologramTransition = {
  duration: 2.2,
  times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
  ease: [0.25, 0.46, 0.45, 0.94]
};

// Main Hologram Transition Component
export default function HologramTransition({ currentPage, children }: HologramTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPage, setDisplayPage] = useState(currentPage);
  const [showNewContent, setShowNewContent] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Reduced motion animation
  const reducedMotionAnimation = {
    opacity: [1, 0.7, 1],
    scale: [1, 1.01, 1]
  };

  const reducedMotionTransition = {
    duration: 1,
    ease: "easeInOut"
  };

  // Trigger transition when page changes
  useEffect(() => {
    if (currentPage !== displayPage) {
      setIsTransitioning(true);
      setShowNewContent(false); // Hide new content immediately
      
      // Play hologram sound effect (optional)
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.2;
          audioRef.current.play().catch(() => {
            // Ignore autoplay restrictions
          });
        }
      } catch (error) {
        // Ignore audio errors
      }
      
      // Switch page content at transition midpoint (when background is solid)
      const switchDelay = prefersReducedMotion ? 500 : 1100;
      const showContentDelay = prefersReducedMotion ? 700 : 1600; // Show content after background starts fading
      const endDelay = prefersReducedMotion ? 1000 : 2200;
      
      setTimeout(() => setDisplayPage(currentPage), switchDelay);
      setTimeout(() => setShowNewContent(true), showContentDelay);
      setTimeout(() => setIsTransitioning(false), endDelay);
    }
  }, [currentPage, displayPage, prefersReducedMotion]);

  return (
    <div className="relative">
      {/* Solid Transition Background - Completely opaque */}
      {!prefersReducedMotion && <SolidTransitionBackground isActive={isTransitioning} />}
      
      {/* Hologram Energy Field - Additional solid layer */}
      {!prefersReducedMotion && <HologramEnergyField isActive={isTransitioning} />}
      
      {/* Hologram Overlay Effects */}
      {!prefersReducedMotion && <HologramOverlay isActive={isTransitioning} />}
      
      {/* Page Content */}
      <motion.div
        className="relative z-10 hologram-layer"
        animate={isTransitioning ? (prefersReducedMotion ? reducedMotionAnimation : hologramContentAnimation) : {}}
        transition={prefersReducedMotion ? reducedMotionTransition : hologramTransition}
        style={{
          willChange: isTransitioning ? 'transform, opacity, filter' : 'auto',
          opacity: showNewContent ? 1 : 0,
          visibility: showNewContent ? 'visible' : 'hidden'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={displayPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: showNewContent ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Optional: Audio element for hologram sound */}
      <audio
        ref={audioRef}
        preload="none"
        style={{ display: 'none' }}
      >
        {/* You can add a hologram sound file here if desired */}
        {/* <source src="/hologram-sound.mp3" type="audio/mpeg" /> */}
      </audio>
    </div>
  );
}