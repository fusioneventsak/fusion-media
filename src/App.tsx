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
      {/* 3D Background - Fixed Canvas with NEGATIVE z-index */}
      <div 
        className="fixed inset-0" 
        style={{ 
          zIndex: -1,  // NEGATIVE z-index puts it behind everything
          pointerEvents: 'none' 
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 75 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          style={{ 
            background: 'transparent',
            pointerEvents: 'none' 
          }}
        >
          <Scene scrollY={scrollY} currentPage={currentPage} />
        </Canvas>
      </div>

      {/* Navigation - High z-index */}
      <div style={{ position: 'relative', zIndex: 50 }}>
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>

      {/* Page Content - High z-index */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        {renderPage()}
      </main>
    </div>
  );
}