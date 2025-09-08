import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import CaseStudiesPage from './pages/CaseStudiesPage';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import TechnicalSEOGuide2024 from './blog-posts/technical-seo-guide-2024';
import LLMWebAppsOptimization from './blog-posts/llm-web-apps-optimization';
import InteractiveWebExperiences from './blog-posts/interactive-web-experiences';
import MobileFirstWebDesignPage from './pages/services/MobileFirstWebDesignPage';
import AppDevelopmentPage from './pages/services/AppDevelopmentPage';
import PackagesPage from './pages/PackagesPage';

export default function App() {
  const location = useLocation();
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
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStartedClick = () => {
    setIsContactModalOpen(true);
  };

  // Get current page for 3D scene
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/about') return 'about';
    if (path === '/why-us') return 'why-us';
    if (path === '/blog') return 'blog';
    if (path.startsWith('/blog/')) return 'blog';
    if (path.startsWith('/services/')) return 'services';
    if (path === '/packages') return 'packages';
    if (path === '/contact') return 'contact';
    if (path === '/case-studies') return 'case-studies';
    return 'home';
  };

  const currentPage = getCurrentPage();

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

      {/* Fluid Cursor Effect - Above 3D background - Home page only */}
      {currentPage === 'home' && (
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
            DENSITY_DISSIPATION={50.0}
            VELOCITY_DISSIPATION={40.0}
            SPLAT_RADIUS={0.012}
            SPLAT_FORCE={400}
            COLOR_UPDATE_SPEED={0}
            CURL={0.1}
            STABLE_COLORS={true}
            PRESSURE={0.02}
            PRESSURE_ITERATIONS={5}
          />
        </div>
      )}

      {/* Navigation - Above backgrounds */}
      <div style={{ position: 'relative', zIndex: 200 }}>
        <Navigation 
          currentPage={currentPage} 
          isTransitioning={isTransitioning}
          onGetStartedClick={handleGetStartedClick}
        />
      </div>

      {/* Page Content with Routes */}
      <div className="relative z-[100]">
        <PageTransition 
          currentPage={currentPage}
          onTransitionChange={setIsTransitioning}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/why-us" element={<WhyUsPage onOpenContactModal={handleGetStartedClick} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/technical-seo-guide-2024" element={<TechnicalSEOGuide2024 />} />
            <Route path="/blog/llm-web-apps-optimization" element={<LLMWebAppsOptimization />} />
            <Route path="/blog/interactive-web-experiences" element={<InteractiveWebExperiences />} />
            <Route path="/services/mobile-first-web-design" element={<MobileFirstWebDesignPage onOpenContactModal={handleGetStartedClick} />} />
            <Route path="/services/app-development" element={<AppDevelopmentPage onOpenContactModal={handleGetStartedClick} />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/mobile-first-web-design-toronto" element={<MobileFirstWebDesignPage onOpenContactModal={handleGetStartedClick} />} />
            <Route path="/app-developers-toronto" element={<AppDevelopmentPage onOpenContactModal={handleGetStartedClick} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
          </Routes>
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