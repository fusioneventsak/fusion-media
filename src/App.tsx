import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Navigation from './components/Navigation';
import Scene from './components/Scene';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ContactPage from './pages/ContactPage';

// Loading component for 3D scene
const SceneLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
    <div className="text-white text-lg font-light flex items-center space-x-2">
      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span>Loading Experience...</span>
    </div>
  </div>
);

export default function FusionInteractiveWebsite() {
  const [scrollY, setScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll when changing pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScrollY(0);
  }, [currentPage]);

  // Handle initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
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
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white overflow-x-hidden">
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <div className="text-2xl font-light text-white mb-2">FUSION INTERACTIVE</div>
            <div className="text-gray-400 font-light">Preparing your experience...</div>
          </div>
        </div>
      )}
      
      {/* Navigation */}
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* Global WebGL Canvas Background */}
      <div className="fixed inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 1, 8], fov: 75 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          style={{ background: 'transparent' }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Scene scrollY={scrollY} currentPage={currentPage} />
          </Suspense>
        </Canvas>
        
        {/* Canvas Loading Fallback */}
        {isLoading && <SceneLoader />}
      </div>
      
      {/* Page Content */}
      <div className="relative z-10">
        {renderCurrentPage()}
      </div>
      
      {/* Enhanced CSS for additional effects */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: #000;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
        }
        
        /* Performance optimizations */
        .pointer-events-none {
          pointer-events: none;
        }
        
        .pointer-events-auto {
          pointer-events: auto;
        }
        
        /* Animation utilities */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        /* Enhanced focus states */
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        
        /* Ensure sections with backgrounds are properly layered */
        section {
          position: relative;
          z-index: 1;
        }
        
        /* Make content sections semi-transparent to show particles */
        .bg-white {
          background-color: rgba(255, 255, 255, 0.95);
        }
        
        .bg-gray-100 {
          background-color: rgba(243, 244, 246, 0.95);
        }
        
        .bg-gray-900 {
          background-color: rgba(17, 24, 39, 0.95);
        }
        
        /* Keep gradient backgrounds opaque but slightly transparent */
        .bg-gradient-to-br {
          position: relative;
        }
        
        .bg-gradient-to-br::before {
          content: '';
          position: absolute;
          inset: 0;
          background: inherit;
          opacity: 0.95;
          z-index: -1;
        }
      `}</style>
    </div>
  );
}