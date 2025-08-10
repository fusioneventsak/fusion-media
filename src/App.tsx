import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import SplashCursor from './components/SplashCursor';
import Navigation from './components/Navigation';
import Scene from './components/Scene';
import PageTransition from './components/PageTransition';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  
  // Mobile detection for performance optimizations
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'case-studies':
        return <CaseStudiesPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Fluid Cursor Effect */}
      <SplashCursor 
        SIM_RESOLUTION={64}
        DYE_RESOLUTION={512}
        DENSITY_DISSIPATION={8.0}
        VELOCITY_DISSIPATION={7.0}
        SPLAT_RADIUS={0.04}
        SPLAT_FORCE={1500}
        COLOR_UPDATE_SPEED={0}
        CURL={1}
        STABLE_COLORS={true}
      />
      
      {/* Enhanced 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ 
            position: [15, 3, 15], 
            fov: 45,
            near: 0.1,
            far: 200
          }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: isIOS ? "low-power" : "high-performance", // Use low-power on iOS
            preserveDrawingBuffer: false,
            stencil: false,
            depth: true
          }}
          dpr={isIOS ? [1, 1] : [1, 2]} // Force 1x pixel ratio on iOS
          onCreated={({ gl, camera }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.0;
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.setPixelRatio(isIOS ? 1 : Math.min(window.devicePixelRatio, 2)); // Force 1x on iOS
            
            // iOS-specific optimizations
            if (isIOS) {
              gl.shadowMap.enabled = false;
              gl.physicallyCorrectLights = false;
            }
            
            console.log(`🌌 Canvas created - iOS: ${isIOS}, Mobile: ${isMobile}`);
          }}
          performance={{
            current: isIOS ? 0.5 : 1, // Lower performance target on iOS
            min: isIOS ? 0.3 : 0.5,
            max: 1,
            debounce: isIOS ? 500 : 200 // Longer debounce on iOS
          }}
          frameloop={isIOS ? "demand" : "always"} // Use demand mode on iOS to save battery
          style={{ 
            background: 'transparent',
            imageRendering: isIOS ? 'auto' : 'pixelated' // Auto rendering on iOS
          }}
        >
          <Scene currentPage={currentPage} />
        </Canvas>
      </div>

      {/* Navigation */}
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Page Content */}
      <PageTransition currentPage={currentPage}>
        <main className="relative z-[100]">
          {renderPage()}
        </main>
      </PageTransition>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}