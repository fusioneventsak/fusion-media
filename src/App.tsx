import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import SplashCursor from './components/SplashCursor';
import Navigation from './components/Navigation';
import Scene from './components/Scene';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrollY, setScrollY] = useState(0);

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
        DENSITY_DISSIPATION={6.0}
        VELOCITY_DISSIPATION={4.5}
        SPLAT_RADIUS={0.08}
        SPLAT_FORCE={3000}
        COLOR_UPDATE_SPEED={8}
        CURL={1}
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
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
            stencil: false,
            depth: true
          }}
          dpr={[1, 2]}
          onCreated={({ gl, camera }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.0;
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            // CRITICAL: Disable texture filtering for sharp particles
            gl.getContext().disable(gl.getContext().SAMPLE_ALPHA_TO_COVERAGE);
            
            console.log('🌌 Milky Way canvas created');
          }}
          performance={{
            current: 1,
            min: 0.5,
            max: 1,
            debounce: 200
          }}
          frameloop="always"
          style={{ 
            background: 'transparent',
            imageRendering: 'pixelated' // CRITICAL for sharp particles
          }}
        >
          <Scene scrollY={scrollY} currentPage={currentPage} />
        </Canvas>
      </div>

      {/* Navigation */}
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Page Content */}
      <main className="relative z-10">
        {renderPage()}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}