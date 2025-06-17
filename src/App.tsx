import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Navigation from './components/Navigation';
import Scene from './components/Scene';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ContactPage from './pages/ContactPage';

export default function FusionInteractiveWebsite() {
  const [scrollY, setScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll when changing pages
  useEffect(() => {
    window.scrollTo(0, 0);
    setScrollY(0);
  }, [currentPage]);
  
  const renderCurrentPage = () => {
    switch(currentPage) {
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
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* Fixed WebGL Canvas Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
          <Scene scrollY={scrollY} currentPage={currentPage} />
        </Canvas>
      </div>
      
      {/* Page Content */}
      {renderCurrentPage()}
    </div>
  );
}