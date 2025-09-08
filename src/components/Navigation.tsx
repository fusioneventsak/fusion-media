import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  isTransitioning: boolean;
  onGetStartedClick?: () => void;
}

export default function Navigation({ currentPage, isTransitioning, onGetStartedClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const location = useLocation();
  const servicesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu and services dropdown on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
  }, [location.pathname]);

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'why-us', label: 'Why Us', path: '/why-us' },
    { id: 'packages', label: 'Packages', path: '/packages' },
    { id: 'blog', label: 'Blog', path: '/blog' },
    { id: 'contact', label: 'Contact', path: '/contact' }
  ];

  const serviceItems = [
    { 
      label: 'Mobile-First Web Design', 
      path: '/services/mobile-first-web-design',
      description: 'Responsive websites optimized for mobile devices'
    },
    { 
      label: 'App Development', 
      path: '/services/app-development',
      description: 'Custom iOS, Android & cross-platform apps'
    }
  ];

  // Check if current page is a service page
  const isServicesActive = currentPage === 'services';
  
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
            {navItems.slice(0, 4).map((item) => (
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

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`relative px-4 py-2 font-medium transition-all duration-300 group flex items-center space-x-1 ${
                  isServicesActive
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                } ${isTransitioning ? 'opacity-50' : ''}`}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  isServicesOpen ? 'rotate-180' : ''
                }`} />
                {/* Active indicator */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ${
                  isServicesActive 
                    ? 'opacity-100 scale-x-100' 
                    : 'opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-100'
                }`} />
              </button>

              {/* Services Dropdown Menu */}
              <div className={`absolute top-full left-0 mt-2 w-80 bg-black/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 ${
                isServicesOpen 
                  ? 'opacity-100 visible transform translate-y-0' 
                  : 'opacity-0 invisible transform -translate-y-2'
              }`}>
                <div className="p-4">
                  {serviceItems.map((service, index) => (
                    <Link
                      key={index}
                      to={service.path}
                      className="block p-4 rounded-xl hover:bg-white/5 transition-all duration-200 group"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      <div className="font-medium text-white group-hover:text-blue-400 transition-colors">
                        {service.label}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {service.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navItems.slice(4).map((item) => (
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
        
        {/* Full Screen Mobile Menu */}
        <div className={`md:hidden fixed inset-0 z-[998] transition-all duration-500 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />
          
          {/* Menu Content */}
          <div className="relative h-full flex flex-col">
            {/* Header with Logo and Close */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <img 
                  src="/logos/FI LOGO 6.png" 
                  alt="Fusion Interactive Logo" 
                  className="h-10 w-auto"
                />
              </Link>
              
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <span className="sr-only">Close menu</span>
                <div className="relative w-6 h-6">
                  <span className="absolute block w-full h-0.5 bg-white top-3 rotate-45" />
                  <span className="absolute block w-full h-0.5 bg-white top-3 -rotate-45" />
                </div>
              </button>
            </div>
            
            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="space-y-6">
                {/* Main Navigation Items (first 4) */}
                {navItems.slice(0, 4).map((item, index) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-2xl font-semibold transition-all duration-300 group ${
                      currentPage === item.id
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    } ${isTransitioning ? 'opacity-50 pointer-events-none' : ''}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between py-4 border-b border-white/10">
                      <span>{item.label}</span>
                      {currentPage === item.id && (
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                      )}
                    </div>
                  </Link>
                ))}

                {/* Services Dropdown */}
                <div className="py-4 border-b border-white/10">
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className={`flex items-center justify-between w-full text-2xl font-semibold transition-all duration-300 ${
                      isServicesActive
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    } ${isTransitioning ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    <span>Services</span>
                    <div className="flex items-center space-x-3">
                      {isServicesActive && (
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                      )}
                      <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${
                        isMobileServicesOpen ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </button>
                  
                  {/* Services Submenu */}
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isMobileServicesOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="pl-6 space-y-4">
                      {serviceItems.map((service, index) => (
                        <Link
                          key={index}
                          to={service.path}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileServicesOpen(false);
                          }}
                          className="block group transition-all duration-300"
                        >
                          <div className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
                            {service.label}
                          </div>
                          <div className="text-sm text-gray-400 mt-1 leading-relaxed">
                            {service.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Remaining Navigation Items */}
                {navItems.slice(4).map((item, index) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-2xl font-semibold transition-all duration-300 group ${
                      currentPage === item.id
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    } ${isTransitioning ? 'opacity-50 pointer-events-none' : ''}`}
                    style={{ animationDelay: `${(index + 5) * 100}ms` }}
                  >
                    <div className="flex items-center justify-between py-4 border-b border-white/10">
                      <span>{item.label}</span>
                      {currentPage === item.id && (
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Bottom Section with CTA */}
            <div className="p-6 border-t border-white/10 bg-gradient-to-t from-black/50 to-transparent">
              <button 
                className={`w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl font-semibold text-white text-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 ${
                  isTransitioning ? 'opacity-50 pointer-events-none' : ''
                }`}
                disabled={isTransitioning}
                onClick={() => {
                  setIsMenuOpen(false);
                  onGetStartedClick?.();
                }}
              >
                Get Started
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-gray-400 text-sm">
                  Ready to transform your digital presence?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}