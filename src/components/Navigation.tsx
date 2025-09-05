import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  currentPage: string;
  isTransitioning: boolean;
  onGetStartedClick?: () => void;
}

export default function Navigation({ currentPage, isTransitioning, onGetStartedClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'why-us', label: 'Why Us', path: '/why-us' },
    { id: 'blog', label: 'Blog', path: '/blog' },
    { id: 'contact', label: 'Contact', path: '/contact' }
  ];
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/95 border-b border-white/10 shadow-2xl' 
        : 'bg-transparent'
    } ${isTransitioning ? 'pointer-events-none' : ''}`}>
      
      {/* Hologram effect during transition */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-400/10 to-purple-400/5 backdrop-blur-sm animate-pulse" />
      )}
      
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="cursor-pointer">
            <div className="flex items-center">
              <img 
                src="/logos/FI LOGO 6.png" 
                alt="Fusion Interactive Logo" 
                className="h-12 w-auto"
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`relative px-4 py-2 font-medium transition-all duration-300 group ${
                  currentPage === item.id
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                } ${isTransitioning ? 'opacity-50' : ''}`}
              >
                {item.label}
                {/* Active indicator */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ${
                  currentPage === item.id 
                    ? 'opacity-100 scale-x-100' 
                    : 'opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}
            
            {/* CTA Button */}
            <button 
              className={`px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium text-white hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 ${
                isTransitioning ? 'opacity-50 pointer-events-none' : ''
              }`}
              disabled={isTransitioning}
              onClick={onGetStartedClick}
            >
              Get Started
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            disabled={isTransitioning}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute block w-full h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen 
                  ? 'top-3 rotate-45' 
                  : 'top-1 group-hover:top-2'
              }`} />
              <span className={`absolute block w-full h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen 
                  ? 'opacity-0' 
                  : 'top-3 opacity-100'
              }`} />
              <span className={`absolute block w-full h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen 
                  ? 'top-3 -rotate-45' 
                  : 'top-5 group-hover:top-4'
              }`} />
            </div>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-6 pb-4 border-t border-white/10 mt-4 bg-black/95 backdrop-blur-md rounded-lg mx-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`block text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-blue-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  } ${isTransitioning ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
              
              <button 
                className={`mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium text-white hover:scale-105 transition-all duration-300 ${
                  isTransitioning ? 'opacity-50 pointer-events-none' : ''
                }`}
                disabled={isTransitioning}
                onClick={onGetStartedClick}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}