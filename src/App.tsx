import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
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
    window.addEventListener('scroll', handleScroll);
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
      {/* 3D Background - Fixed Canvas but with positive z-index */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 75 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.0;
            console.log('🎨 Canvas created successfully');
          }}
        >
          <Scene scrollY={scrollY} currentPage={currentPage} />
        </Canvas>
      </div>

      {/* Navigation - Higher z-index */}
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Page Content - Pointer events enabled, higher z-index */}
      <main className="relative z-10">
        {renderPage()}
      </main>
    </div>
  );
}