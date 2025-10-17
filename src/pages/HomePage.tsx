import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Maximize2, Play, Code, Zap, Globe } from 'lucide-react';
import AnimatedHeroTitle from '../components/AnimatedHeroTitle';
import ContactModal from '../components/ContactModal';
import SEOHead from '../components/SEOHead';

// Portfolio projects data for horizontal scroll
const horizontalPortfolioProjects = [
  {
    id: 1,
    title: "Custom Business Applications",
    subtitle: "Internal Tools & CRM Systems",
    url: "https://capable-alfajores-d0dff2.netlify.app/",
    category: "Web Applications",
    technologies: ["Front End", "Back End", "DataBase", "Hosting"],
    description: "Tailored internal tools and CRM systems built specifically for your organization's workflow. Streamline operations, improve efficiency, and gain valuable insights with applications designed around your unique business needs and processes.",
    features: [
      'Custom CRM and database management systems',
      'Workflow automation and comprehensive reporting',
      'Team collaboration tools and project management',
      'Advanced data visualization and business analytics',
      'Secure cloud-based architecture with enterprise-grade security'
    ],
    gradient: "from-blue-500 to-cyan-500",
    accentColor: "#3B82F6",
    bgPattern: "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)"
  },
  {
    id: 2,
    title: "Audience Engagement Platforms",
    subtitle: "Real-time Interactive Tools",
    url: "http://urequestsongs.com",
    category: "Event Technology",
    technologies: ["React", "WebSocket", "Social APIs", "Real-time", "Analytics"],
    description: "Real-time interaction tools that connect performers with their audience in meaningful ways. From song requests to live polling, these platforms create deeper engagement and memorable experiences for bands, DJs, and entertainers of all kinds.",
    features: [
      'Live song request systems for bands, DJs, and performers',
      'Real-time audience voting, polls, and interactive features',
      'Social media integration and viral sharing capabilities',
      'Custom branding for artists, venues, and event organizers',
      'Comprehensive analytics and audience engagement insights'
    ],
    gradient: "from-cyan-500 to-blue-500",
    accentColor: "#06B6D4",
    bgPattern: "radial-gradient(circle at 20% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)"
  },
  {
    id: 3,
    title: "Interactive Widgets & Components",
    subtitle: "Gamified Experiences",
    url: "https://bespoke-semifreddo-acdc93.netlify.app/",
    category: "Interactive Media",
    technologies: ["React", "Three.js", "WebGL", "Game Logic", "Animation"],
    description: "Gamified experiences and interactive elements that boost engagement on websites and at live events. From custom game shows to educational tools, we create interactive components that entertain, inform, and drive meaningful user participation.",
    features: [
      'Custom game shows, trivia platforms, and interactive competitions',
      'Interactive website widgets and embedded components',
      'Educational modules and training platforms',
      'Leaderboards, scoring systems, and competition management',
      'Multi-device compatibility and responsive design'
    ],
    gradient: "from-purple-500 to-pink-500",
    accentColor: "#8B5CF6",
    bgPattern: "radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)"
  },
  {
    id: 4,
    title: "Professional Website Development",
    subtitle: "High-Performance Websites",
    url: "https://www.fusion-events.ca",
    category: "Web Development",
    technologies: ["React", "SEO", "CMS", "Analytics", "Performance"],
    description: "Beautiful, high-performance websites that drive real business results. Built with modern HTML, CSS, and JavaScript, optimized for speed, SEO, and conversions. Perfect for service businesses, corporate brands, and growing organizations.",
    features: [
      'Modern, responsive design with mobile-first approach',
      'SEO optimization and lightning-fast loading speeds',
      'Content management systems and easy updates',
      'E-commerce integration and payment processing',
      'Advanced analytics, conversion tracking, and performance monitoring'
    ],
    gradient: "from-emerald-500 to-green-500",
    accentColor: "#10B981",
    bgPattern: "radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),radial-gradient(circle at 60% 40%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)"
  }
];

const HorizontalProjectCard = ({ project, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const iconMap = {
    "Web Applications": Code,
    "Event Technology": Zap,
    "Interactive Media": Play,
    "Web Development": Globe
  };

  const Icon = iconMap[project.category] || Code;

  return (
    <div className="w-screen h-full flex items-center justify-center flex-shrink-0 relative z-[105]">
      {/* Static gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`}
      />

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 items-center min-h-screen px-6 py-4">
        
        {/* Content Side */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2
          }}
        >
          {/* Category Badge */}
          <motion.div
            className="inline-flex items-center space-x-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div 
              className={`w-10 h-10 bg-gradient-to-br ${project.gradient} rounded-lg flex items-center justify-center shadow-lg`}
              style={{ 
                boxShadow: `0 0 20px ${project.accentColor}30` 
              }}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium tracking-wider uppercase" style={{ color: project.accentColor }}>
              {project.category}
            </span>
          </motion.div>

          {/* Title */}
          <div>
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-2 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {project.title}
            </motion.h2>
            <motion.p 
              className="text-base md:text-lg opacity-70 text-white font-light mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {project.subtitle}
            </motion.p>
          </div>

          {/* Description */}
          <motion.p
            className="text-sm md:text-base text-white opacity-70 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {project.description}
          </motion.p>

          {/* Features */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {project.features.slice(0, 3).map((feature, i) => (
              <motion.div
                key={i}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.7 + i * 0.1
                }}
              >
                <div 
                  className={`w-5 h-5 bg-gradient-to-br ${project.gradient} rounded-md flex items-center justify-center mt-0.5 shadow-lg flex-shrink-0`}
                >
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white opacity-90 font-medium leading-relaxed text-sm">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Technology Tags */}
          <motion.div 
            className="flex flex-wrap gap-1.5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/20"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-2 pt-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.button
              className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${project.gradient} text-white rounded-full font-medium shadow-lg hover:opacity-90 transition-all duration-300 text-sm`}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 15px 30px ${project.accentColor}30`
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(project.url, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Live Demo
            </motion.button>
            
            <motion.button
              className="inline-flex items-center px-6 py-3 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 text-sm"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(project.url, '_blank')}
            >
              <Maximize2 className="w-4 h-4 mr-2" />
              Full Screen
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Website Preview Side */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.4
          }}
        >
          {/* Raw Images Only - No Containers */}
          <div className="relative w-full flex items-center justify-center">
            <motion.div
              whileHover={{ 
                scale: 1.05
              }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%', maxWidth: '600px' }}
            >
              {/* Raw Images Only - Full Size */}
              {project.id === 1 ? (
                <img
                  src="/Website Images/Custom-business-applications.png"
                  alt="Custom Business Applications"
                  style={{ 
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    border: 'none'
                  }}
                  onLoad={() => setIsLoaded(true)}
                />
              ) : project.id === 2 ? (
                <img
                  src="/Website Images/urequestsongs.com.png"
                  alt="Audience Engagement Platform"
                  style={{ 
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    border: 'none'
                  }}
                  onLoad={() => setIsLoaded(true)}
                />
              ) : project.id === 3 ? (
                <img
                  src="/Website Images/Hero.png"
                  alt="Interactive Widgets & Components - AI PhotoBooth Interface"
                  style={{ 
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    border: 'none'
                  }}
                  onLoad={() => setIsLoaded(true)}
                />
              ) : project.id === 4 ? (
                <img
                  src="/Website Images/anthonywrightmusic.com.png"
                  alt="Professional Website Development"
                  style={{ 
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    border: 'none'
                  }}
                  onLoad={() => setIsLoaded(true)}
                />
              ) : (
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                  <iframe
                    src={project.url}
                    style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '100%',
                      border: 'none'
                    }}
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                  />
                </div>
              )}
              
              {/* Loading overlay */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                  <div className={`w-6 h-6 border-2 border-t-transparent rounded-full animate-spin`} 
                       style={{ borderColor: project.accentColor, borderTopColor: 'transparent' }}>
                  </div>
                </div>
              )}

            </motion.div>

            {/* Floating UI Elements - Smaller */}
            <motion.div
              className={`absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br ${project.gradient} opacity-20 rounded-xl backdrop-blur-sm border border-white/10`}
              animate={{
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div
              className={`absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-br ${project.gradient} opacity-15 rounded-lg backdrop-blur-sm border border-white/10`}
              animate={{
                x: [0, 8, 0],
                scale: [1, 1.2, 1],
                rotate: [0, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </div>

          {/* Enhanced Background Effects */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-purple-500 to-transparent opacity-30 blur-3xl pointer-events-none"
            style={{
              transform: `scale(1.6)`,
              zIndex: -1
            }}
          ></div>
         
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)`,
              transform: `scale(2.0)`,
              zIndex: -2
            }}
          ></div>
        </motion.div>
      </div>
    </div>
  );
};

// Mobile-Optimized Project Card Component for horizontal layout
const MobileProjectCard = ({ project, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const iconMap = {
    "Web Applications": Code,
    "Event Technology": Zap,
    "Interactive Media": Play,
    "Web Development": Globe
  };

  const Icon = iconMap[project.category] || Code;

  return (
    <div className="w-full h-screen flex items-center justify-center relative z-[105] overflow-hidden">
      {/* Static gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`} />

      {/* Mobile-optimized layout - Better viewport utilization with top padding */}
      <div className="relative z-10 w-full px-4 pt-24 pb-4 flex flex-col justify-start items-center h-full max-w-sm mx-auto">
        
        {/* Content Section - Mobile Optimized with better spacing */}
        <motion.div
          className="space-y-2 text-center w-full flex-shrink-0"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2
          }}
        >
          {/* Category Badge */}
          <motion.div
            className="flex items-center justify-center space-x-2 mb-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div 
              className={`w-8 h-8 bg-gradient-to-br ${project.gradient} rounded-lg flex items-center justify-center shadow-lg`}
              style={{ boxShadow: `0 0 20px ${project.accentColor}30` }}
            >
              <Icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium tracking-wider uppercase" style={{ color: project.accentColor }}>
              {project.category}
            </span>
          </motion.div>

          {/* Title - Smaller for better fit */}
          <motion.h2 
            className="text-xl font-light text-white mb-2 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {project.title}
          </motion.h2>
          <motion.p 
            className="text-sm opacity-70 text-white font-light mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {project.subtitle}
          </motion.p>

          {/* Description - More condensed for mobile viewport */}
          <motion.p
            className="text-xs text-white opacity-70 leading-relaxed font-light mb-3 line-clamp-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {project.description}
          </motion.p>

          {/* Key Features - Compact for mobile */}
          <motion.div 
            className="space-y-1 mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {project.features.slice(0, 2).map((feature, i) => (
              <motion.div
                key={i}
                className="flex items-center space-x-2 justify-center"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.7 + i * 0.1
                }}
              >
                <div className={`w-3 h-3 bg-gradient-to-br ${project.gradient} rounded-md flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <svg className="w-1.5 h-1.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white opacity-90 font-medium leading-relaxed text-xs">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons - Compact mobile version */}
          <motion.div 
            className="flex flex-row gap-2 mb-2 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.button
              className={`inline-flex items-center justify-center px-3 py-1.5 bg-gradient-to-r ${project.gradient} text-white rounded-full font-medium shadow-lg hover:opacity-90 transition-all duration-300 text-xs flex-1`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(project.url, '_blank')}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Demo
            </motion.button>
            
            <motion.button
              className="inline-flex items-center justify-center px-3 py-1.5 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 text-xs flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(project.url, '_blank')}
            >
              <Maximize2 className="w-3 h-3 mr-1" />
              Full
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Image Section - Optimized for mobile viewport with more height */}
        <motion.div
          className="relative flex items-center justify-center w-full flex-1 min-h-0 mt-2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.4
          }}
        >
          <div className="relative w-full max-w-sm max-h-64 overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {project.id === 1 ? (
                <img
                  src="/Website Images/Custom-business-applications.png"
                  alt="Custom Business Applications"
                  className="w-full h-auto max-h-full object-contain rounded-lg shadow-xl"
                  style={{ 
                    filter: `drop-shadow(0 15px 40px ${project.accentColor}30)`
                  }}
                  onLoad={() => setIsLoaded(true)}
                />
              ) : project.id === 2 ? (
                <img
                  src="/Website Images/urequestsongs.com.png"
                  alt="Audience Engagement Platform"
                  className="w-full h-auto max-h-full object-contain rounded-lg shadow-xl"
                  style={{ 
                    filter: `drop-shadow(0 15px 40px ${project.accentColor}30)`
                  }}
                  onLoad={() => setIsLoaded(true)}
                />
              ) : project.id === 3 ? (
                <img
                  src="/Website Images/Hero.png"
                  alt="Interactive Widgets & Components"
                  className="w-full h-auto max-h-full object-contain rounded-lg shadow-xl"
                  style={{ 
                    filter: `drop-shadow(0 15px 40px ${project.accentColor}30)`
                  }}
                  onLoad={() => setIsLoaded(true)}
                />
              ) : project.id === 4 ? (
                <img
                  src="/Website Images/anthonywrightmusic.com.png"
                  alt="Professional Website Development"
                  className="w-full h-auto max-h-full object-contain rounded-lg shadow-xl"
                  style={{ 
                    filter: `drop-shadow(0 15px 40px ${project.accentColor}30)`
                  }}
                  onLoad={() => setIsLoaded(true)}
                />
              ) : null}
              
              {!isLoaded && (
                <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center rounded-lg">
                  <div className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin`} 
                       style={{ borderColor: project.accentColor, borderTopColor: 'transparent' }}>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Main Horizontal Portfolio Section
const HorizontalPortfolioSection = () => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const mobileScrollRef = useRef(null);
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const wheelCountRef = useRef(0);
  const wheelTimeoutRef = useRef(null);
  const lastWheelTimeRef = useRef(0);
  const scrollTriggerRef = useRef(null);
  const accumulatedDeltaRef = useRef(0);
  const isScrollingRef = useRef(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Remove conflicting mobile touch handling - GSAP ScrollTrigger handles all scrolling

  useEffect(() => {
    // Load GSAP and ScrollTrigger
    const loadGSAP = async () => {
      // Load main GSAP
      if (!window.gsap) {
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        gsapScript.async = true;
        document.head.appendChild(gsapScript);
        
        await new Promise((resolve) => {
          gsapScript.onload = resolve;
        });
      }

      // Load ScrollTrigger
      if (!window.ScrollTrigger) {
        const scrollTriggerScript = document.createElement('script');
        scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        scrollTriggerScript.async = true;
        document.head.appendChild(scrollTriggerScript);
        
        await new Promise((resolve) => {
          scrollTriggerScript.onload = resolve;
        });
      }

      setGsapLoaded(true);
    };

    loadGSAP();
  }, []);

  // Function to navigate to specific project
  const navigateToProject = useCallback((projectIndex) => {
    if (!gsapLoaded || isTransitioning || !scrollTriggerRef.current) return;
    
    const targetProgress = projectIndex / (horizontalPortfolioProjects.length - 1);
    const gsap = window.gsap;
    
    setIsTransitioning(true);
    setCurrentProject(projectIndex);
    
    gsap.to(scrollTriggerRef.current, {
      progress: targetProgress,
      duration: 0.4, // Faster navigation for better UX
      ease: "power2.out",
      onComplete: () => {
        setIsTransitioning(false);
      }
    });
  }, [gsapLoaded, isTransitioning, horizontalPortfolioProjects.length]);

  // Enhanced ScrollTrigger configuration with better snap sensitivity
  useEffect(() => {
    if (!containerRef.current || !gsapLoaded) return;

    // Optional: Add a passive wheel listener for debugging if needed
    const handleWheel = (e) => {
      // Let GSAP ScrollTrigger handle the scrolling naturally
      // This is just for potential debugging/tracking
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [gsapLoaded, currentProject, horizontalPortfolioProjects.length]);

  // Handle touch events for mobile - Simplified to work with GSAP ScrollTrigger
  useEffect(() => {
    if (!containerRef.current || !gsapLoaded || !isMobile) return;

    let startY = 0;
    let isScrolling = false;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      isScrolling = false;
    };

    const handleTouchMove = (e) => {
      if (!isScrolling) {
        const deltaY = Math.abs(e.touches[0].clientY - startY);
        
        // If significant vertical movement, allow ScrollTrigger to handle
        if (deltaY > 10) {
          isScrolling = true;
        }
      }
      
      // Let GSAP ScrollTrigger handle all scrolling naturally
      // Don't prevent default - let the scroll trigger work
    };

    const container = containerRef.current;
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [gsapLoaded, isMobile]);

  useEffect(() => {
    if (!gsapLoaded || !containerRef.current || !scrollContainerRef.current) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    gsap.registerPlugin(ScrollTrigger);

    const scrollContainer = scrollContainerRef.current;
    const container = containerRef.current;
    
    // Calculate the total scroll distance needed
    const totalScrollDistance = (horizontalPortfolioProjects.length - 1) * window.innerWidth;

    // Different configuration for mobile vs desktop
    const scrollTriggerConfig = isMobile ? {
      trigger: container,
      start: "top top",
      end: () => `+=${totalScrollDistance * 4}`, // Even longer scroll distance to ensure proper pinning
      scrub: 1, // Slower, more controlled for mobile to prevent clash
      pin: true,
      pinSpacing: true, // Keep spacing to prevent section clash
      anticipatePin: 1,
      invalidateOnRefresh: true,
      refreshPriority: -1,
      preventOverlaps: true,
      fastScrollEnd: false,
      markers: false, // Remove any debug markers
      snap: {
        snapTo: (() => {
          const totalProjects = horizontalPortfolioProjects.length;
          const snapPoints = [];
          for (let i = 0; i < totalProjects; i++) {
            snapPoints.push(i / (totalProjects - 1));
          }
          return snapPoints;
        })(),
        duration: 1.0, // Even slower for mobile to ensure completion
        delay: 0.2, // More delay to prevent premature snapping
        ease: "power2.out",
        directional: true,
        inertia: false
      },
      // Track progress for current project indicator
      onUpdate: (self) => {
        const progress = self.progress;
        const totalProjects = horizontalPortfolioProjects.length;
        const newProject = Math.min(Math.round(progress * (totalProjects - 1)), totalProjects - 1);
        if (!isTransitioning) {
          setCurrentProject(newProject);
        }
      },
      animation: gsap.to(scrollContainer, {
        x: -totalScrollDistance,
        ease: "none"
      })
    } : {
      // Desktop configuration (original)
      trigger: container,
      start: "top top",
      end: () => `+=${totalScrollDistance}`,
      scrub: 0.1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      refreshPriority: -1,
      snap: {
        snapTo: (() => {
          const totalProjects = horizontalPortfolioProjects.length;
          const snapPoints = [];
          for (let i = 0; i < totalProjects; i++) {
            snapPoints.push(i / (totalProjects - 1));
          }
          return snapPoints;
        })(),
        duration: 0.4,
        delay: 0.01,
        ease: "power1.out",
        directional: false,
        inertia: false
      },
      fastScrollEnd: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalProjects = horizontalPortfolioProjects.length;
        const newProject = Math.min(Math.round(progress * (totalProjects - 1)), totalProjects - 1);
        if (!isTransitioning) {
          setCurrentProject(newProject);
        }
      },
      animation: gsap.to(scrollContainer, {
        x: -totalScrollDistance,
        ease: "none"
      })
    };

    // Create the scroll trigger with device-specific config
    const scrollTrigger = ScrollTrigger.create(scrollTriggerConfig);

    // Store reference for custom navigation
    scrollTriggerRef.current = scrollTrigger;

    // iOS-specific fixes for mobile
    if (isMobile) {
      // Prevent momentum scrolling on iOS that can cause issues
      document.body.style.webkitOverflowScrolling = 'auto';
      
      // Force ScrollTrigger to refresh after a small delay on mobile
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      scrollTriggerRef.current = null;
      window.removeEventListener('resize', handleResize);
    };
  }, [gsapLoaded, isMobile, horizontalPortfolioProjects.length]);

  // Mobile rendering - use GSAP with mobile optimizations
  if (isMobile) {
    if (!gsapLoaded) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    return (
      <div className="relative">
        {/* Mobile Horizontal Scrolling Container with GSAP */}
        <div 
          ref={containerRef} 
          className="relative"
          style={{ 
            minHeight: '100vh', 
            overflow: 'hidden',
            background: 'transparent',
            zIndex: 100,
            position: 'relative',
            pointerEvents: 'auto',
            // Ensure this section takes up full viewport and blocks vertical scroll
            width: '100vw',
            left: '50%',
            marginLeft: '-50vw'
          }}
        >
          <div 
            ref={scrollContainerRef}
            className="flex h-full relative"
            style={{ 
              width: `${horizontalPortfolioProjects.length * 100}vw`,
              willChange: 'transform',
              zIndex: 101
            }}
          >
            {horizontalPortfolioProjects.map((project, index) => (
              <div 
                key={project.id}
                className="w-screen h-full flex-shrink-0"
              >
                <MobileProjectCard
                  project={project}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile indicators removed for cleaner interface */}
      </div>
    );
  }

  // Desktop rendering - horizontal scroll (existing logic)
  if (!gsapLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Horizontal Scrolling Container - Ensure it's above WebGL */}
      <div 
        ref={containerRef} 
        className="relative"
        style={{ 
          minHeight: '100vh', 
          overflow: 'hidden',
          background: 'transparent',
          zIndex: 100, // Increased z-index to be above WebGL
          position: 'relative',
          pointerEvents: 'auto' // Ensure pointer events work
        }}
      >
        <div 
          ref={scrollContainerRef}
          className="flex h-full relative"
          style={{ 
            width: `${horizontalPortfolioProjects.length * 100}vw`,
            willChange: 'transform',
            zIndex: 101
          }}
        >
          {horizontalPortfolioProjects.map((project, index) => (
            <HorizontalProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[110]">
          <div className="flex space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            {horizontalPortfolioProjects.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentProject 
                    ? 'bg-white w-8' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>


        {/* Project Counter */}
        <div className="fixed top-8 right-8 z-[110] bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
          <span className="text-white text-sm font-medium">
            {String(currentProject + 1).padStart(2, '0')} / {String(horizontalPortfolioProjects.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};

interface HomePageProps {
  onNavigate?: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactModalConfig, setContactModalConfig] = useState({
    title: "Schedule Consultation",
    subtitle: "Let's discuss your project and how we can help bring your vision to life."
  });
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Hero parallax effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [-50, -150]);
  
  const heroPills = [
    'Strategy & planning',
    'Design & build',
    'AI features that make sense'
  ];

  // Event section parallax effects - Mobile-aware fade ranges
  const eventOpacity = useTransform(
    scrollYProgress, 
    isMobile ? [0.35, 0.75] : [0.25, 0.65], 
    [1, 0]
  );
  const eventScale = useTransform(
    scrollYProgress, 
    isMobile ? [0.35, 0.75] : [0.25, 0.65], 
    [1, 0.98]
  );
  const eventY = useTransform(
    scrollYProgress, 
    isMobile ? [0.35, 0.75] : [0.25, 0.65], 
    [0, isMobile ? -25 : -50]
  );
  
  // Smooth spring animations
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Services section in view detection - More mobile-friendly
  const servicesInView = useInView(servicesRef, {
    once: true,
    margin: "-10% 0px -10% 0px"
  });
  
  // CTA section mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };
    const ctaElement = ctaRef.current;
    if (ctaElement) {
      ctaElement.addEventListener('mousemove', handleMouseMove);
      ctaElement.addEventListener('mouseleave', () => setMousePosition({ x: 0, y: 0 }));
    }
    return () => {
      if (ctaElement) {
        ctaElement.removeEventListener('mousemove', handleMouseMove);
        ctaElement.removeEventListener('mouseleave', () => setMousePosition({ x: 0, y: 0 }));
      }
    };
  }, []);

  // Navigation helpers
  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleSeeOurWork = () => {
    // Scroll to horizontal portfolio section
    const portfolioSection = document.querySelector('[data-section="portfolio"]');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleStartProject = () => {
    if (onNavigate) {
      onNavigate('contact');
    }
  };

  const handleScheduleConsultation = () => {
    setContactModalConfig({
      title: "Schedule Consultation",
      subtitle: "Let's discuss your project and how we can help bring your vision to life."
    });
    setIsContactModalOpen(true);
  };

  const handleGetQuote = () => {
    setContactModalConfig({
      title: "Get Project Quote",
      subtitle: "Tell us about your project and we'll provide a detailed quote within 24 hours."
    });
    setIsContactModalOpen(true);
  };

  const handleGetStarted = () => {
    setContactModalConfig({
      title: "Get Started",
      subtitle: "Let's discuss your project requirements and get started on your digital transformation."
    });
    setIsContactModalOpen(true);
  };
  
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Toronto Web Development Agency | AI-Powered Custom Applications",
    "description": "Leading Toronto web development agency specializing in AI-powered applications, interactive experiences, and performance optimization.",
    "url": "https://fusioninteractive.agency",
    "mainEntity": {
      "@type": "WebDesignCompany",
      "name": "Fusion Interactive",
      "description": "AI-powered web development agency in Toronto specializing in custom applications and interactive experiences",
      "url": "https://fusioninteractive.agency",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Toronto",
        "addressRegion": "ON",
        "addressCountry": "CA"
      },
      "telephone": "416-825-4938",
      "email": "info@fusion-events.ca",
      "serviceArea": ["Toronto", "GTA", "Ontario", "Canada"],
      "offers": [
        {
          "@type": "Service",
          "name": "Custom Web Development",
          "description": "Custom web applications built with React, Node.js, and modern technologies"
        },
        {
          "@type": "Service", 
          "name": "AI Integration Services",
          "description": "AI-powered web applications with LLM integration and machine learning solutions"
        },
        {
          "@type": "Service",
          "name": "Interactive Event Technology",
          "description": "Real-time audience engagement platforms and interactive event solutions"
        }
      ]
    }
  };

  return (
    <div ref={containerRef} className="relative pointer-events-none">
      <SEOHead 
        title="Toronto Web Development Agency | AI-Powered Custom Applications"
        description="Leading Toronto web development agency specializing in AI-powered applications, interactive experiences, and performance optimization. Custom React development, event technology, and machine learning solutions."
        keywords="Toronto web development agency, AI development services, custom web development Toronto, React development services, machine learning consulting, interactive web experiences, event technology solutions"
        canonicalUrl="https://fusioninteractive.agency"
        ogImage="https://fusioninteractive.agency/Website%20Images/hero-og-image.png"
        structuredData={homeStructuredData}
      />

      {/* Hero Section with Parallax */}
      <motion.section
        ref={heroRef}
        className="relative min-h-[100svh] overflow-hidden px-6 sm:px-8 pt-32 sm:pt-40 pb-16 pointer-events-none"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
          willChange: 'transform, opacity, filter'
        }}
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-[18rem] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.23),_transparent_65%)] blur-3xl" />
          <div className="absolute bottom-[-6rem] right-[-4rem] h-[24rem] w-[24rem] bg-[radial-gradient(circle_at_bottom,_rgba(168,85,247,0.2),_transparent_70%)] blur-3xl" />
          <div className="absolute inset-0 rounded-[3rem] border border-white/10 opacity-40 mix-blend-screen" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center pointer-events-auto">
          <div className="grid items-center gap-y-1 sm:gap-y-1.5 lg:gap-y-4 lg:gap-x-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">

            <div className="order-2 lg:order-2 lg:col-start-1 mt-4 sm:mt-6 lg:mt-0 flex flex-col gap-3 sm:gap-4 text-center lg:text-left">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-[3.25rem] lg:text-[3.75rem] font-light leading-tight text-white"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                AI-powered websites and apps that feel effortless for your team and your audience.
              </motion.h1>
              <motion.div
                className="flex flex-col items-center gap-4 lg:hidden"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs sm:text-sm backdrop-blur"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 shadow-[0_0_10px_rgba(34,197,94,0.55)]" />
                  <span className="font-semibold tracking-[0.28em] uppercase text-white/70">
                    AI & Digital Agency
                  </span>
                </motion.div>

                <motion.img
                  src="/Website Images/Hero.png"
                  alt="AI-enabled interactive experience interface"
                  className="w-full max-w-sm rounded-[1.75rem]"
                  style={{ filter: 'drop-shadow(0 20px 55px rgba(96, 165, 250, 0.35))' }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                />
              </motion.div>


              <motion.div
                className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/70 lg:justify-start"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span>We help ship</span>
                <AnimatedHeroTitle />
                <span>with clear steps and calm guidance.</span>
              </motion.div>

              <motion.p
                className="max-w-2xl text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                We plan the roadmap, design every screen, weave in the right AI touches, and build the whole experience with you. No jargon. No guesswork. Just a friendly team that keeps you in the loop from kickoff to launch.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row sm:items-center gap-3 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.button
                  className="w-full sm:w-auto rounded-full bg-white px-8 py-3 text-base font-semibold text-gray-900 shadow-[0_20px_45px_rgba(255,255,255,0.25)] transition-all duration-300 hover:bg-gray-100"
                  whileHover={{
                    scale: 1.04,
                    boxShadow: '0 28px 70px rgba(255,255,255,0.32)'
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleStartProject}
                >
                  Start a project
                </motion.button>
                <motion.button
                  className="w-full sm:w-auto rounded-full border border-white/25 px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10"
                  whileHover={{
                    scale: 1.04,
                    boxShadow: '0 24px 60px rgba(148,163,184,0.3)'
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSeeOurWork}
                >
                  See recent work
                </motion.button>
              </motion.div>

              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-2"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {heroPills.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>
            <motion.div
              className="order-3 lg:order-2 lg:col-start-2 relative hidden lg:flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.85, x: 120 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs sm:text-sm backdrop-blur"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 shadow-[0_0_10px_rgba(34,197,94,0.55)]" />
                <span className="font-semibold tracking-[0.28em] uppercase text-white/70">
                  AI & Digital Agency
                </span>
              </motion.div>

              <div className="relative">
                <div className="absolute inset-0 -z-10 scale-[1.24] rounded-[3.5rem] bg-[radial-gradient(circle_at_center,_rgba(96,165,250,0.42),_transparent_70%)] blur-[130px]" />
                <motion.img
                  src="/Website Images/Hero.png"
                  alt="AI-enabled interactive experience interface"
                  className="relative z-10 mx-auto h-auto w-full max-w-3xl lg:max-w-[46rem]"
                  style={{
                    filter: 'drop-shadow(0 25px 80px rgba(96, 165, 250, 0.45))'
                  }}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.4 }
                  }}
                />

                <motion.div
                  className="absolute left-1/2 bottom-[-4.5rem] sm:bottom-[-5rem] z-20 w-64 sm:w-80 -translate-x-1/2 rounded-2xl border border-white/10 bg-black/70 p-5 text-left shadow-[0_18px_50px_rgba(15,23,42,0.45)] backdrop-blur-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Project playbook</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      Roadmap &amp; sprint planning
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                      Design systems ready to scale
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      AI features tested with real users
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section Introduction */}
      <motion.section
        className="min-h-screen flex items-center justify-center px-8 py-32 pointer-events-auto relative overflow-visible"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-cyan-900/10" />
        
        <div className="relative z-10 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }} // Reduced delay
          >
            <div className="relative">
              <motion.h2 
                className="text-5xl md:text-7xl font-light text-white mb-8 leading-tight relative z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.1 }} // Appears after logos cascade
              >
                Our <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Work</span>
              </motion.h2>
              
              {/* Semi-Circle Tool Logos Above Title */}
              {[
                {
                  name: 'GitHub',
                  logo: '/logos/git4.webp',
                  x: { mobile: -80, desktop: -510 },
                  y: { mobile: -100, desktop: -120 },
                  delay: 0.0,
                  color: '#333333'
                },
                {
                  name: 'WordPress',
                  logo: '/logos/wordpress.webp',
                  x: { mobile: 0, desktop: -350 },
                  y: { mobile: -100, desktop: -220 },
                  delay: 0.15,
                  color: '#21759B'
                },
                {
                  name: 'Claude',
                  logo: '/logos/claude.png',
                  x: { mobile: -50, desktop: -190 },
                  y: { mobile: -180, desktop: -280 },
                  delay: 0.3,
                  color: '#FF6B35'
                },
                {
                  name: 'ChatGPT',
                  logo: '/logos/openai.jpg',
                  x: { mobile: 20, desktop: -30 },
                  y: { mobile: -240, desktop: -320 },
                  delay: 0.45,
                  color: '#10A37F'
                },
                {
                  name: 'Supabase',
                  logo: '/logos/Supabase.webp',
                  x: { mobile: 90, desktop: 130 },
                  y: { mobile: -180, desktop: -280 },
                  delay: 0.6,
                  color: '#3ECF8E'
                },
                {
                  name: 'Netlify',
                  logo: '/logos/netlify-logo.webp',
                  x: { mobile: 80, desktop: 290 },
                  y: { mobile: -100, desktop: -220 },
                  delay: 0.75,
                  color: '#00C7B7'
                },
                {
                  name: 'Bolt.new',
                  logo: '/logos/Bolt.jpg',
                  x: { mobile: 160, desktop: 450 },
                  y: { mobile: -100, desktop: -120 },
                  delay: 0.9,
                  color: '#FFD700'
                }
              ].map((tool, index) => {
                return (
                  <>
                    {/* Mobile Version - No animation, just show immediately */}
                    <div
                      key={`${tool.name}-mobile`}
                      className="absolute block lg:hidden pointer-events-none"
                      style={{
                        left: `calc(50% + ${tool.x.mobile}px)`,
                        top: `calc(50% + ${tool.y.mobile}px)`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-xl border border-white/20 backdrop-blur-md p-2 bg-white/5">
                        <img
                          src={tool.logo}
                          alt={`${tool.name} logo`}
                          className="w-full h-full object-contain rounded-xl filter drop-shadow-lg"
                          loading="lazy"
                          style={{
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                          }}
                          onError={(e) => {
                            // Fallback to a generic icon if image fails to load
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div
                          className="w-full h-full items-center justify-center text-lg font-bold rounded-xl"
                          style={{
                            display: 'none',
                            color: tool.color,
                            backgroundColor: `${tool.color}20`
                          }}
                        >
                          {tool.name.charAt(0)}
                        </div>
                      </div>
                    </div>

                    {/* Desktop Version */}
                    <motion.div
                      key={`${tool.name}-desktop`}
                      className="absolute hidden lg:block pointer-events-none"
                      style={{
                        left: `calc(50% + ${tool.x.desktop}px)`,
                        top: `calc(50% + ${tool.y.desktop}px)`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      initial={{ opacity: 0, x: -100, scale: 0.6 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      viewport={{ once: false, amount: 0.1, margin: "0px 0px -200px 0px" }}
                      transition={{
                        duration: 0.6,
                        delay: tool.delay,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                    >
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl border border-white/20 backdrop-blur-md p-2 bg-white/5">
                        <img
                          src={tool.logo}
                          alt={`${tool.name} logo`}
                          className="w-full h-full object-contain rounded-xl filter drop-shadow-lg"
                          loading="lazy"
                          style={{
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                          }}
                          onError={(e) => {
                            // Fallback to a generic icon if image fails to load
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        {/* Fallback content */}
                        <div 
                          className="w-full h-full items-center justify-center text-lg font-bold rounded-xl"
                          style={{ 
                            display: 'none',
                          color: tool.color,
                          backgroundColor: `${tool.color}20`
                        }}
                      >
                          {tool.name.charAt(0)}
                        </div>
                      </div>
                    </motion.div>
                  </>
                );
              })}
            </div>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transforming ideas into powerful digital experiences with AI-assisted development
            </motion.p>
            <motion.button
              className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const eventSection = document.querySelector('[data-section="event-engagement"]');
                if (eventSection) {
                  eventSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
            >
              <span className="text-white mr-3">Scroll to explore</span>
              <svg className="w-4 h-4 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.button>
          </motion.div>
        </div>

      </motion.section>

      {/* Event Engagement Technology Section */}
      <motion.section
        data-section="event-engagement"
        className="min-h-screen relative overflow-hidden pointer-events-auto"
        style={{
          opacity: eventOpacity,
          scale: eventScale,
          y: eventY,
          willChange: 'transform, opacity',
          marginBottom: 0 // Ensure no gap
        }}
      >
        <div className="absolute inset-0 bg-black/5"></div>
       
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
           
            {/* Content Side */}
            <motion.div
              className="space-y-8 lg:pr-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
                  <span className="inline-flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-green-400 tracking-wider uppercase">Event Technology</span>
                  </span>
                  <br />
                  Interactive Engagement
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                    Experiences
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-white opacity-70 leading-relaxed font-light mb-8">
                  Transform any event into an interactive experience that captivates audiences and creates lasting memories.
                  Our cutting-edge engagement platforms combine real-time photo processing, social media integration,
                  and advanced analytics to drive meaningful participation and generate valuable business insights.
                </p>
              </div>
              <div className="space-y-6">
                {[
                  {
                    text: 'Real-time photo processing with AI-powered effects and customizable animations',
                    icon: (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    )
                  },
                  {
                    text: 'Social media integration with viral sharing and hashtag campaigns',
                    icon: (
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                    )
                  },
                  {
                    text: 'Trade shows, festivals, retail activations, and corporate events',
                    icon: (
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    )
                  },
                  {
                    text: 'Advanced analytics dashboard with engagement metrics and lead capture',
                    icon: (
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    )
                  },
                  {
                    text: 'Custom branding, white-label solutions, and enterprise integrations',
                    icon: (
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                      </div>
                    )
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.05,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    {feature.icon}
                    <span className="text-white opacity-90 font-medium leading-relaxed">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:opacity-90 transition-all duration-300 shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
                    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
                  }}
                  onClick={() => window.open('https://selfieholosphere.com/', '_blank')}
                >
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mr-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  View Live Demo
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.button>
               
                <motion.button
                  className="inline-flex items-center px-8 py-4 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(255,255,255,0.1)",
                    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
                  }}
                  onClick={handleGetQuote}
                >
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mr-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  Get Quote
                </motion.button>
              </div>
            </motion.div>
            {/* Vector Image Side with Enhanced Animations */}
            <motion.div
              className="relative lg:pl-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="relative">
                {/* Main Vector Image with Enhanced Animations */}
                <motion.div
                  className="transform relative z-10"
                  animate={{
                    rotateY: [0, 0.2, -0.2, 0],
                    y: [0, -2, 0, 2, 0] // Reduced floating amplitude
                  }}
                  transition={{
                    duration: 20, // Slower floating animation
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  whileHover={{
                    scale: 1.02,
                    rotateY: 2,
                    transition: { duration: 0.3 }
                  }}
                >
                  <img
                    src="https://www.fusion-events.ca/wp-content/uploads/2025/06/Untitled-512-x-512-px-3.png"
                    alt="Selfie Holosphere - Interactive Photo Experience Platform"
                    className="w-full max-w-6xl mx-auto drop-shadow-2xl relative z-10 transform scale-150"
                    style={{
                      filter: `drop-shadow(0 25px 60px rgba(147, 51, 234, 0.3))`
                    }}
                  />
                </motion.div>
                {/* Floating UI Elements */}
                <motion.div
                  className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl backdrop-blur-sm border border-purple-400/30 flex items-center justify-center z-20 shadow-lg"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg className="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>
                <motion.div
                  className="absolute top-1/4 -right-12 w-12 h-12 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-xl backdrop-blur-sm border border-blue-400/30 flex items-center justify-center z-20 shadow-lg"
                  animate={{
                    x: [0, 10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                {/* Interactive Feature Badges */}
                <motion.div
                  className="absolute bottom-8 left-4 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 z-20 shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white text-sm font-bold">Live Processing</div>
                      <div className="text-green-300 text-xs">Real-time AI effects</div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="absolute top-8 right-4 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 z-20 shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white text-sm font-bold">Analytics</div>
                      <div className="text-orange-300 text-xs">Live insights</div>
                    </div>
                  </div>
                </motion.div>
                {/* Enhanced Background Effects */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500 to-transparent opacity-30 blur-3xl pointer-events-none"
                  style={{
                    transform: `scale(1.6)`,
                    zIndex: -1
                  }}
                ></div>
               
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)`,
                    transform: `scale(2.0)`,
                    zIndex: -2
                  }}
                ></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>


      {/* HORIZONTAL SCROLLING PORTFOLIO SECTION */}
      <div data-section="portfolio">
        <HorizontalPortfolioSection />
      </div>

      {/* Technology & Process Section with Clip Path Reveal */}
      <section
        ref={servicesRef}
        className="min-h-screen flex items-center justify-center px-8 py-32 pointer-events-auto relative overflow-hidden"
      >
        {/* Clip Path Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm"
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={servicesInView ? { clipPath: 'circle(150% at 50% 50%)' } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <div className="relative z-10 max-w-7xl w-full">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <h2 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">
              How we{' '}
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                work faster
              </span>
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed font-light">
              Our AI-assisted approach combines cutting-edge tools with decades of experience
              to deliver exceptional results in record time.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            {[
              {
                number: '01',
                title: 'AI-Powered Development',
                description: 'We leverage the latest AI tools for rapid prototyping, code generation, and design iteration, reducing development time by 10x.',
                icon: '🤖'
              },
              {
                number: '02',
                title: '25+ Years of Expertise',
                description: 'Deep industry knowledge in events, entertainment, and technology ensures we understand your unique challenges and opportunities.',
                icon: '🎯'
              },
              {
                number: '03',
                title: 'Proven Methodologies',
                description: 'Our battle-tested processes and frameworks mean faster delivery without compromising quality or functionality.',
                icon: '⚡'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                initial={{ x: 200, rotate: 5, opacity: 0 }}
                animate={servicesInView ? { x: 0, rotate: 0, opacity: 1 } : {}}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                  delay: index * 0.2
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  rotate: -1,
                  boxShadow: "0 25px 50px rgba(255,255,255,0.1)",
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-6xl mb-6">{item.icon}</div>
                <div className="text-sm font-mono text-gray-300 mb-3">{item.number}</div>
                <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-white leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <div className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20">
              <span className="text-white mr-4">Ready to experience the difference?</span>
              <motion.button
                className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                onClick={handleGetStarted}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action Section with Magnetic Interactions */}
      <section
        ref={ctaRef}
        className="min-h-screen flex items-center justify-center px-8 py-32 pointer-events-auto relative overflow-hidden"
      >
        {/* Gradient Overlay that responds to mouse */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10"
          animate={{
            background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(6, 182, 212, 0.05) 100%)`
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20
          }}
        />
        <div className="relative z-10 max-w-5xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{
              x: mousePosition.x * 10,
              y: mousePosition.y * 10,
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 15
            }}
          >
            <h2 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">
              Ready to transform{' '}
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                your vision
              </span>
              <br />
              into reality?
            </h2>
           
            <p className="text-xl text-white mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Let's discuss how our AI-assisted approach can deliver exceptional
              results for your next project—faster and more efficiently than ever before.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <motion.button
                className="px-12 py-4 bg-white text-gray-900 rounded-full font-medium text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(255,255,255,0.2)",
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                animate={{
                  x: mousePosition.x * 15,
                  y: mousePosition.y * 15,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                onClick={handleStartProject}
              >
                Start Your Project
              </motion.button>
              <motion.button
                className="px-12 py-4 border border-white/30 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(255,255,255,0.1)",
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                animate={{
                  x: mousePosition.x * 12,
                  y: mousePosition.y * 12,
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 18
                }}
                onClick={handleScheduleConsultation}
              >
                Schedule Consultation
              </motion.button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  title: 'Events & Entertainment',
                  description: '25+ years of industry expertise and proven results',
                  color: 'blue'
                },
                {
                  title: 'AI-Powered Development',
                  description: '10x faster project delivery with cutting-edge tools',
                  color: 'purple'
                },
                {
                  title: 'Custom Solutions',
                  description: 'Tailored specifically to your unique business needs',
                  color: 'cyan'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 20px 40px rgba(255,255,255,0.1)",
                    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                  }}
                  animate={{
                    x: mousePosition.x * (5 + index * 2),
                    y: mousePosition.y * (5 + index * 2),
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100 + index * 20,
                    damping: 15 + index * 2
                  }}
                >
                  <div className={"text-2xl font-light " + (item.color === 'blue' ? 'text-blue-400' : item.color === 'purple' ? 'text-purple-400' : 'text-cyan-400') + " mb-2"}>
                    {item.title}
                  </div>
                  <p className="text-white text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title={contactModalConfig.title}
        subtitle={contactModalConfig.subtitle}
      />
    </div>
  );
}


