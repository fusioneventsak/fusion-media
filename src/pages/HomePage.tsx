import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import FullWidthLaptopShowcase from '../components/Laptop';
import AnimatedHeroTitle from '../components/AnimatedHeroTitle';

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero parallax effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [-50, -150]);

  // Event section parallax effects
  const eventOpacity = useTransform(scrollYProgress, [0.15, 0.45], [1, 0]);
  const eventScale = useTransform(scrollYProgress, [0.15, 0.45], [1, 0.95]);
  const eventY = useTransform(scrollYProgress, [0.15, 0.45], [0, -100]);

  // Smooth spring animations
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Services section in view detection
  const servicesInView = useInView(servicesRef, { 
    once: true, 
    margin: "-20% 0px -20% 0px" 
  });

  // CTA section mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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

  return (
    <div ref={containerRef} className="relative pointer-events-none">
      {/* Scroll Progress Indicator */}
      <div className="fixed bottom-8 left-8 z-50 pointer-events-none">
        <div className="w-2 h-32 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/30">
          <motion.div
            className="w-full bg-gradient-to-t from-cyan-400 via-blue-500 to-purple-600 rounded-full origin-bottom"
            style={{ scaleY: smoothScrollProgress }}
          />
        </div>
      </div>

      {/* Hero Section with Parallax */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-8 pt-32 pb-16 pointer-events-none"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
          willChange: 'transform, opacity, filter'
        }}
      >
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl pointer-events-auto">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium text-white">AI-Assisted Digital Agency</span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.4, 
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <AnimatedHeroTitle />
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-white mb-8 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            What once took months to produce—high-end websites with animations, 
            multiple pages, and complex functionality—we now deliver in weeks. 
            AI-powered productivity meets 25+ years of expertise in events, 
            entertainment, and technology.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <motion.button 
              className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255,255,255,0.2)",
                transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
            >
              See Our Work
            </motion.button>
            <motion.button 
              className="px-8 py-3 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255,255,255,0.1)",
                transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
            >
              Start a Project
            </motion.button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 1.0,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {[
              { number: '10x', label: 'Faster Delivery', description: 'AI-powered development' },
              { number: '25+', label: 'Years Experience', description: 'Events & entertainment' },
              { number: '500+', label: 'Projects Delivered', description: 'Across all industries' },
              { number: '98%', label: 'Client Satisfaction', description: 'Proven track record' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center group"
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
              >
                <div className="text-2xl md:text-3xl font-light text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {stat.number}
                </div>
                <div className="text-sm text-white font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-gray-300">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Event Engagement Technology Section */}
      <motion.section 
        className="min-h-screen relative overflow-hidden pointer-events-auto"
        style={{
          opacity: eventOpacity,
          scale: eventScale,
          y: eventY,
          willChange: 'transform, opacity'
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
              viewport={{ once: true, amount: 0.3 }}
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
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.1,
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
                  onClick={() => window.open('https://selfieholosphere.com/collage/1lr9qn', '_blank')}
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
              viewport={{ once: true, amount: 0.3 }}
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

      {/* Laptop Showcases */}
      <>
        <motion.div 
          className="pointer-events-auto"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ 
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <FullWidthLaptopShowcase
            url="https://splendid-cannoli-324007.netlify.app/"
            title="Custom Business Applications"
            description="Tailored internal tools and CRM systems built specifically for your organization's workflow. Streamline operations, improve efficiency, and gain valuable insights with applications designed around your unique business needs and processes."
            features={[
              'Custom CRM and database management systems',
              'Workflow automation and comprehensive reporting',
              'Team collaboration tools and project management',
              'Advanced data visualization and business analytics',
              'Secure cloud-based architecture with enterprise-grade security'
            ]}
            backgroundColor="transparent"
            textColor="text-white"
            accentColor="text-blue-600"
          />
        </motion.div>

        <motion.div 
          className="pointer-events-auto"
          initial={{ opacity: 0, x: -100, rotate: -2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ 
            duration: 1.4,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2
          }}
        >
          <FullWidthLaptopShowcase
            url="http://urequestsongs.com"
            title="Audience Engagement Platforms"
            description="Real-time interaction tools that connect performers with their audience in meaningful ways. From song requests to live polling, these platforms create deeper engagement and memorable experiences for bands, DJs, and entertainers of all kinds."
            features={[
              'Live song request systems for bands, DJs, and performers',
              'Real-time audience voting, polls, and interactive features',
              'Social media integration and viral sharing capabilities',
              'Custom branding for artists, venues, and event organizers',
              'Comprehensive analytics and audience engagement insights'
            ]}
            backgroundColor="transparent"
            textColor="text-white"
            accentColor="text-cyan-400"
          />
        </motion.div>

        <motion.div 
          className="pointer-events-auto"
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ 
            duration: 1.3,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.1
          }}
        >
          <FullWidthLaptopShowcase
            url="https://capable-alfajores-d0dff2.netlify.app/"
            title="Interactive Widgets & Components"
            description="Gamified experiences and interactive elements that boost engagement on websites and at live events. From custom game shows to educational tools, we create interactive components that entertain, inform, and drive meaningful user participation."
            features={[
              'Custom game shows, trivia platforms, and interactive competitions',
              'Interactive website widgets and embedded components',
              'Educational modules and training platforms',
              'Leaderboards, scoring systems, and competition management',
              'Multi-device compatibility and responsive design'
            ]}
            backgroundColor="transparent"
            textColor="text-white"
            accentColor="text-indigo-600"
          />
        </motion.div>

        <motion.div 
          className="pointer-events-auto"
          initial={{ opacity: 0, y: 80, rotate: 1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ 
            duration: 1.5,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.3
          }}
        >
          <FullWidthLaptopShowcase
            url="https://www.fusion-events.ca"
            title="Professional Website Development"
            description="Beautiful, high-performance websites that drive real business results. Built with modern HTML, CSS, and JavaScript, optimized for speed, SEO, and conversions. Perfect for service businesses, corporate brands, and growing organizations."
            features={[
              'Modern, responsive design with mobile-first approach',
              'SEO optimization and lightning-fast loading speeds',
              'Content management systems and easy updates',
              'E-commerce integration and payment processing',
              'Advanced analytics, conversion tracking, and performance monitoring'
            ]}
            backgroundColor="transparent"
            textColor="text-white"
            accentColor="text-green-600"
          />
        </motion.div>
      </>

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
            transition={{ 
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
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
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.1 + index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
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
                  <div className={`text-2xl font-light ${item.color === 'blue' ? 'text-blue-400' : item.color === 'purple' ? 'text-purple-400' : 'text-cyan-400'} mb-2`}>
                    {item.title}
                  </div>
                  <p className="text-white text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}