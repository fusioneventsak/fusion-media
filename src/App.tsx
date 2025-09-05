import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import SplashCursor from './components/SplashCursor';
import Navigation from './components/Navigation';
import Scene from './components/Scene';
import PageTransition from './components/PageTransition';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WhyUsPage from './pages/WhyUsPage';
import Blog from './pages/Blog';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import TechnicalSEOGuide2024 from './blog-posts/technical-seo-guide-2024';
import LLMWebAppsOptimization from './blog-posts/llm-web-apps-optimization';
import InteractiveWebExperiences from './blog-posts/interactive-web-experiences';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  // Mobile detection for performance optimizations
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Scroll to top when page changes - Enhanced
  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    // Also set scroll position after a small delay to ensure it sticks
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 100);

    return () => clearTimeout(scrollTimeout);
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStartedClick = () => {
    setIsContactModalOpen(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'why-us':
        return <WhyUsPage onNavigate={setCurrentPage} onOpenContactModal={handleGetStartedClick} />;
      case 'blog':
        return <Blog onNavigate={setCurrentPage} />;
      case 'blog/technical-seo-guide-2024':
        return <TechnicalSEOGuide2024 onNavigate={setCurrentPage} />;
      case 'blog/llm-web-apps-optimization':
        return <LLMWebAppsOptimization onNavigate={setCurrentPage} />;
      case 'blog/interactive-web-experiences':
        return <InteractiveWebExperiences onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Enhanced 3D Background - Behind cursor but visible */}
      <div 
        className="fixed inset-0" 
        style={{ 
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
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
            powerPreference: isIOS ? "low-power" : "high-performance",
            preserveDrawingBuffer: false,
            stencil: false,
            depth: true
          }}
          dpr={isIOS ? [1, 1] : [1, 2]}
          onCreated={({ gl, camera }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.0;
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.setPixelRatio(isIOS ? 1 : Math.min(window.devicePixelRatio, 2));
            
            // iOS-specific optimizations
            if (isIOS) {
              gl.shadowMap.enabled = false;
              gl.physicallyCorrectLights = false;
            }
            
            console.log(`🌌 Canvas created - iOS: ${isIOS}, Mobile: ${isMobile}`);
          }}
          performance={{
            current: isIOS ? 0.5 : 1,
            min: isIOS ? 0.3 : 0.5,
            max: 1,
            debounce: isIOS ? 500 : 200
          }}
          frameloop={isIOS ? "demand" : "always"}
          style={{ 
            background: 'transparent',
            imageRendering: isIOS ? 'auto' : 'pixelated'
          }}
        >
          <Scene currentPage={currentPage} />
        </Canvas>
      </div>

      {/* Fluid Cursor Effect - Above 3D background */}
      <div 
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          pointerEvents: 'none'
        }}
      >
        <SplashCursor 
          SIM_RESOLUTION={32}
          DYE_RESOLUTION={256}
          DENSITY_DISSIPATION={15.0}
          VELOCITY_DISSIPATION={12.0}
          SPLAT_RADIUS={0.02}
          SPLAT_FORCE={800}
          COLOR_UPDATE_SPEED={0}
          CURL={0.5}
          STABLE_COLORS={true}
        />
      </div>

      {/* Navigation - Above backgrounds */}
      <div style={{ position: 'relative', zIndex: 200 }}>
        <Navigation 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          isTransitioning={isTransitioning}
          onGetStartedClick={handleGetStartedClick}
        />
      </div>

      {/* Page Content with Simplified Transition */}
      <div className="relative z-[100]">
        <PageTransition 
          currentPage={currentPage}
          onTransitionChange={setIsTransitioning}
        >
          {renderPage()}
        </PageTransition>
      </div>

      {/* Global Footer */}
      <div style={{ position: 'relative', zIndex: 200 }}>
        <Footer />
      </div>

      {/* Global Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Get Started"
        subtitle="Ready to transform your vision into reality? Let's discuss your project and how we can help."
      />
    </div>
  );
}