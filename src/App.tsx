import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Navigation from './components/Navigation';
import Scene from './components/Scene';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ContactPage from './pages/ContactPage';

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
      {/* Enhanced 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ 
            position: [0, 0, 10], 
            fov: 75,
            near: 0.1,
            far: 1000
          }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false
          }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          onCreated={({ gl, camera }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.2;
            gl.outputColorSpace = THREE.SRGBColorSpace;
            console.log('🌌 Milky Way canvas created');
          }}
          performance={{
            current: 1,
            min: 0.5,
            max: 1,
            debounce: 200
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
    </div>
  );
}