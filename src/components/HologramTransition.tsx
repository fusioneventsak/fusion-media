import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HologramTransitionProps {
  currentPage: string;
  children: React.ReactNode;
}

// Scan Lines Component
const ScanLines: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
        style={{ top: `${i * 3.33}%` }}
        initial={{ opacity: 0, scaleX: 0, x: '-100%' }}
        animate={isActive ? {
          opacity: [0, 0.9, 0.4, 0.8, 0.2, 0.6, 0],
          scaleX: [0, 1.2, 1, 1.1, 0.9, 1, 0],
          x: ['-100%', '0%', '0%', '0%', '0%', '0%', '100%'],
          filter: [
            "blur(0px) brightness(1)",
            "blur(1px) brightness(1.5)",
            "blur(0px) brightness(1.2)",
            "blur(0.5px) brightness(1.3)",
            "blur(0px) brightness(1)",
            "blur(1px) brightness(1.4)",
            "blur(0px) brightness(1)"
          ]
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

// Holographic Grid
const HolographicGrid: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <motion.div
    className="absolute inset-0 pointer-events-none z-40 hologram-layer"
    style={{
      backgroundImage: `
        linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px),
        linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px),
        linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: '30px 30px, 30px 30px, 60px 60px, 60px 60px',
      backgroundPosition: '0 0, 0 0, 15px 15px, 15px 15px'
    }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={isActive ? {
      opacity: [0, 0.7, 0.9, 0.5, 0.8, 0.3, 0],
      scale: [0.8, 1.1, 1, 1.05, 0.95, 1.02, 0.9],
      filter: [
        "hue-rotate(0deg) brightness(1)",
        "hue-rotate(30deg) brightness(1.3)",
        "hue-rotate(60deg) brightness(1.1)",
        "hue-rotate(90deg) brightness(1.2)",
        "hue-rotate(45deg) brightness(1)",
        "hue-rotate(15deg) brightness(1.1)",
        "hue-rotate(0deg) brightness(1)"
      ]
    } : { opacity: 0, scale: 0.8 }}
    transition={{ 
      duration: 2.2, 
      ease: [0.25, 0.46, 0.45, 0.94],
      times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1]
    }}
  />
);

// Interference Patterns
const InterferencePattern: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <>
    {/* Vertical sweep */}
    <motion.div
      className="absolute top-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none z-45 hologram-layer"
      style={{ width: '120px', height: '100vh', left: '-120px' }}
      animate={isActive ? {
        x: ['0px', 'calc(100vw + 240px)'],
        opacity: [0, 0.8, 0.9, 0.7, 0]
      } : { x: '0px', opacity: 0 }}
      transition={{ 
        duration: 1.4, 
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    />
    
    {/* Horizontal sweep */}
    <motion.div
      className="absolute left-0 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent pointer-events-none z-45 hologram-layer"
      style={{ height: '100px', width: '100vw', top: '-100px' }}
      animate={isActive ? {
        y: ['0px', 'calc(100vh + 200px)'],
        opacity: [0, 0.6, 0.8, 0.5, 0]
      } : { y: '0px', opacity: 0 }}
      transition={{ 
        duration: 1.8, 
        delay: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    />

    {/* Diagonal interference */}
    <motion.div
      className="absolute inset-0 pointer-events-none z-44 hologram-layer"
      style={{
        background: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 2px,
          rgba(139, 92, 246, 0.1) 2px,
          rgba(139, 92, 246, 0.1) 4px
        )`
      }}
      animate={isActive ? {
        opacity: [0, 0.4, 0.6, 0.3, 0.5, 0],
        backgroundPosition: ['0px 0px', '20px 20px', '40px 40px', '60px 60px', '80px 80px', '100px 100px']
      } : { opacity: 0 }}
      transition={{ 
        duration: 2, 
        ease: "linear"
      }}
    />
  </>
);

// Hologram Particles
const HologramParticles: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className="absolute inset-0 pointer-events-none z-46 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={isActive ? {
          opacity: [0, 1, 0.8, 0.6, 0.9, 0],
          scale: [0, 1.5, 1, 1.2, 0.8, 0],
          y: [0, -20, -40, -60, -80, -100],
          x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 80]
        } : { opacity: 0, scale: 0 }}
        transition={{
          duration: 2,
          delay: i * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      />
    ))}
  </div>
);

// Glitch Effect
const GlitchEffect: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <motion.div
    className="absolute inset-0 pointer-events-none z-48 hologram-layer"
    style={{
      background: `
        linear-gradient(90deg, transparent 98%, rgba(255, 0, 100, 0.3) 100%),
        linear-gradient(90deg, transparent 70%, rgba(0, 255, 255, 0.2) 71%, rgba(0, 255, 255, 0.2) 72%, transparent 73%)
      `,
      backgroundSize: '100px 100%, 50px 100%'
    }}
    animate={isActive ? {
      opacity: [0, 0.7, 0, 0.5, 0, 0.8, 0],
      x: [0, -2, 2, -1, 1, -3, 0],
      backgroundPosition: ['0% 0%', '100% 0%', '0% 0%', '50% 0%', '0% 0%', '75% 0%', '0% 0%']
    } : { opacity: 0 }}
    transition={{
      duration: 0.8,
      delay: 0.3,
      ease: "easeInOut"
    }}
  />
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
        
        {/* Hologram border effect */}
        <motion.div
          className="absolute inset-4 border-2 border-cyan-400/30 pointer-events-none z-47"
          style={{
            borderImage: 'linear-gradient(45deg, rgba(6, 182, 212, 0.5), rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.4)) 1'
          }}
          animate={isActive ? {
            opacity: [0, 0.8, 0.4, 0.9, 0.2, 0.6, 0],
            borderWidth: ['2px', '3px', '1px', '4px', '2px', '3px', '1px']
          } : { opacity: 0 }}
          transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </motion.div>
    )}
  </AnimatePresence>
);

// Content Animation Presets
const hologramContentAnimation = {
  opacity: [1, 0.3, 0.7, 0.4, 0.9, 0.2, 0.8, 1],
  scale: [1, 1.02, 0.98, 1.01, 0.99, 1.01, 0.995, 1],
  filter: [
    "brightness(1) contrast(1) saturate(1)",
    "brightness(1.3) contrast(1.2) saturate(1.1)",
    "brightness(0.8) contrast(0.9) saturate(0.9)",
    "brightness(1.1) contrast(1.1) saturate(1.05)",
    "brightness(0.9) contrast(0.95) saturate(0.95)",
    "brightness(1.2) contrast(1.1) saturate(1.1)",
    "brightness(1.05) contrast(1.02) saturate(1.02)",
    "brightness(1) contrast(1) saturate(1)"
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
      
      // Switch page content at transition midpoint
      const switchDelay = prefersReducedMotion ? 500 : 1100;
      const endDelay = prefersReducedMotion ? 1000 : 2200;
      
      setTimeout(() => setDisplayPage(currentPage), switchDelay);
      setTimeout(() => setIsTransitioning(false), endDelay);
    }
  }, [currentPage, displayPage, prefersReducedMotion]);

  return (
    <div className="relative">
      {/* Hologram Overlay Effects */}
      {!prefersReducedMotion && <HologramOverlay isActive={isTransitioning} />}
      
      {/* Page Content */}
      <motion.div
        className="relative z-10 hologram-layer"
        animate={isTransitioning ? (prefersReducedMotion ? reducedMotionAnimation : hologramContentAnimation) : {}}
        transition={prefersReducedMotion ? reducedMotionTransition : hologramTransition}
        style={{
          willChange: isTransitioning ? 'transform, opacity, filter' : 'auto'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={displayPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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