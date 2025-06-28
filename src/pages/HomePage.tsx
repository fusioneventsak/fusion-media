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
      <section className="min-h-screen relative overflow-hidden pointer-events-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
              Event Engagement{' '}
              <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Technology
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Interactive experiences that captivate audiences and create unforgettable moments
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Enhanced Device Showcase */}
            <motion.div 
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative perspective-1000">
                {/* Laptop Mockup */}
                <motion.div 
                  className="relative z-20 mb-8"
                  whileHover={{ 
                    rotateY: 5, 
                    rotateX: -2,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 shadow-2xl border border-gray-700">
                    {/* Laptop Screen */}
                    <div className="bg-black rounded-lg overflow-hidden relative">
                      {/* Browser Chrome */}
                      <div className="h-8 bg-gray-800 flex items-center px-4 border-b border-gray-600">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-1 text-center">
                          <div className="bg-gray-700 rounded px-3 py-1 text-xs text-gray-300 inline-block">
                            selfieholosphere.com
                          </div>
                        </div>
                      </div>
                      
                      {/* Screen Content */}
                      <div className="aspect-video bg-gradient-to-br from-purple-900 via-blue-900 to-black relative overflow-hidden">
                        {/* Animated Background */}
                        <motion.div
                          className="absolute inset-0 opacity-30"
                          animate={{
                            background: [
                              'radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
                              'radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                              'radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
                              'radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)'
                            ]
                          }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                        
                        {/* UI Elements */}
                        <div className="absolute inset-4 flex flex-col">
                          <div className="text-center mb-4">
                            <motion.h3 
                              className="text-white text-lg font-bold mb-2"
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              SELFIE HOLOSPHERE
                            </motion.h3>
                            <div className="text-purple-300 text-sm">Interactive Photo Experience</div>
                          </div>
                          
                          {/* Feature Cards */}
                          <div className="grid grid-cols-2 gap-2 flex-1">
                            {[
                              { icon: '📸', label: 'Live Photos' },
                              { icon: '🎨', label: 'Custom Effects' },
                              { icon: '📊', label: 'Analytics' },
                              { icon: '🔗', label: 'Social Share' }
                            ].map((item, idx) => (
                              <motion.div
                                key={idx}
                                className="bg-white/10 backdrop-blur-sm rounded p-2 text-center"
                                animate={{ 
                                  scale: [1, 1.05, 1],
                                  opacity: [0.8, 1, 0.8]
                                }}
                                transition={{ 
                                  duration: 3, 
                                  repeat: Infinity, 
                                  delay: idx * 0.5 
                                }}
                              >
                                <div className="text-lg mb-1">{item.icon}</div>
                                <div className="text-white text-xs">{item.label}</div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Laptop Base */}
                    <div className="h-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-xl"></div>
                  </div>
                </motion.div>

                {/* Phone Mockup */}
                <motion.div 
                  className="absolute -bottom-4 -right-8 z-30"
                  initial={{ opacity: 0, x: 50, rotateZ: 15 }}
                  whileInView={{ opacity: 1, x: 0, rotateZ: 12 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  whileHover={{ 
                    rotateZ: 8,
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="w-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-2 shadow-xl border border-gray-700">
                    {/* Phone Screen */}
                    <div className="bg-black rounded-xl overflow-hidden">
                      {/* Status Bar */}
                      <div className="h-6 bg-black flex items-center justify-between px-3 text-white text-xs">
                        <span>9:41</span>
                        <div className="flex space-x-1">
                          <span>📶</span>
                          <span>🔋</span>
                        </div>
                      </div>
                      
                      {/* App Content */}
                      <div className="aspect-[9/16] bg-gradient-to-br from-purple-900 to-blue-900 relative">
                        <div className="absolute inset-2 flex flex-col items-center justify-center text-center">
                          <motion.div
                            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2"
                            animate={{ 
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                            <span className="text-2xl">📱</span>
                          </motion.div>
                          <div className="text-white text-xs font-bold">Mobile App</div>
                          <div className="text-purple-300 text-xs">Touch to Engage</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-8 -left-8 w-16 h-16 bg-purple-500/20 rounded-full backdrop-blur-sm border border-purple-400/30 flex items-center justify-center"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-purple-300 text-xl">✨</span>
                </motion.div>

                <motion.div
                  className="absolute top-1/4 -right-12 w-12 h-12 bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-400/30 flex items-center justify-center"
                  animate={{ 
                    x: [0, 10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <span className="text-blue-300 text-lg">🎪</span>
                </motion.div>

                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 blur-3xl -z-10 scale-150"></div>
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div 
              className="space-y-6 order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="space-y-4">
                {[
                  { icon: '🎪', text: 'Trade shows and corporate events with real-time engagement' },
                  { icon: '🎵', text: 'Festivals and concerts with social media integration' },
                  { icon: '🏪', text: 'Retail locations and brand activations' },
                  { icon: '⚡', text: 'Real-time photo processing and customizable animations' },
                  { icon: '📊', text: 'Custom branding, analytics, and lead generation' }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="text-2xl flex-shrink-0">{feature.icon}</div>
                    <span className="text-white font-medium leading-relaxed">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              >
                <motion.button
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium shadow-lg"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://selfieholosphere.com/collage/1lr9qn', '_blank')}
                >
                  View Live Demo
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.button>
                
                <motion.button
                  className="inline-flex items-center px-6 py-3 border border-purple-400/50 text-purple-300 rounded-full font-medium hover:bg-purple-400/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

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