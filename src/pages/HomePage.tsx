import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FullWidthLaptopShowcase from '../components/Laptop';
import AnimatedHeroTitle from '../components/AnimatedHeroTitle';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative pointer-events-none">
      {/* Hero Section - Transparent to show WebGL background */}
      <section className="relative min-h-screen flex items-start justify-center px-8 pt-32 pointer-events-none">
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl pointer-events-auto mt-8">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
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
            className="text-xl md:text-2xl text-white mb-10 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            From quick app MVPs to complex digital experiences—what once took months 
            to develop, we now deliver in weeks. AI-powered productivity meets 25+ years 
            of expertise in events, entertainment, and cutting-edge technology solutions.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <motion.button 
              className="px-10 py-4 bg-white text-gray-900 rounded-full font-medium text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
              whileHover={{ 
                scale: 1.05,
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
              className="px-10 py-4 border border-white/30 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
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
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
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
                  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
              >
                <div className="text-3xl md:text-4xl font-light text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {stat.number}
                </div>
                <div className="text-sm text-white font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-gray-300">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Use Case Showcases - Semi-transparent to show particles behind */}
      
      {/* 1. Event Engagement Technology */}
      <section className="min-h-screen relative overflow-hidden pointer-events-auto">
        {/* Minimal background for readability */}
        <div className="absolute inset-0 bg-black/5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            
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
                  Event Engagement Technology
                </h2>
                <p className="text-lg md:text-xl text-white opacity-70 leading-relaxed font-light mb-8">
                  Interactive experiences that captivate audiences and create unforgettable moments. From trade shows to festivals, retail activations to corporate events—our engagement platforms drive participation and generate valuable data insights.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  'Trade shows and corporate events with real-time engagement',
                  'Festivals and concerts with social media integration',
                  'Retail locations and brand activations',
                  'Real-time photo processing and customizable animations',
                  'Custom branding, analytics, and lead generation'
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.15,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-3 flex-shrink-0"></div>
                    <span className="text-white opacity-80 font-medium leading-relaxed">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-full font-medium hover:opacity-90 transition-all duration-300 shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                onClick={() => window.open('https://selfieholosphere.com/collage/1lr9qn', '_blank')}
              >
                View Live Site
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.button>
            </motion.div>

            {/* Vector Image Side */}
            <motion.div 
              className="relative lg:pl-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="relative">
                <motion.div
                  className="transform"
                  animate={{
                    rotateY: [0, 1, -1, 0],
                    rotateX: [0, 0.3, -0.3, 0],
                    y: [0, -4, 0, 4, 0]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {/* Enhanced glow effect - BEHIND the vector */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-500 to-transparent blur-3xl pointer-events-none"
                    style={{
                      opacity: 0.3,
                      transform: `scale(1.6)`,
                      zIndex: -1
                    }}
                  ></div>
                  
                  {/* Additional floating particles effect - BEHIND */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)`,
                      transform: `scale(2.0)`,
                      zIndex: -2
                    }}
                  ></div>
                  
                  <img 
                    src="https://www.fusion-events.ca/wp-content/uploads/2025/06/Untitled-512-x-512-px-3.png" 
                    alt="Selfie Holosphere - Interactive Photo Experience Platform"
                    className="w-full max-w-6xl mx-auto drop-shadow-2xl relative z-10 transform scale-150"
                    style={{
                      filter: `drop-shadow(0 25px 60px rgba(147, 51, 234, 0.3))`
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Custom Business Applications */}
      <div className="pointer-events-auto">
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
      </div>

      {/* 3. Audience Engagement Platforms */}
      <div className="pointer-events-auto">
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
      </div>

      {/* 4. Interactive Widgets & Components */}
      <div className="pointer-events-auto">
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
      </div>

      {/* 5. Professional Website Development */}
      <div className="pointer-events-auto">
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
      </div>

      {/* Technology & Process Section */}
      <section className="min-h-screen flex items-center justify-center px-8 py-32 pointer-events-auto">
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
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
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

      {/* Call to Action Section */}
      <section className="min-h-screen flex items-center justify-center px-8 py-32 pointer-events-auto">
        <div className="relative z-10 max-w-5xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94]
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
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
              >
                Start Your Project
              </motion.button>
              <motion.button
                className="px-12 py-4 border border-white/30 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
              >
                Schedule Consultation
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div
                className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
              >
                <div className="text-2xl font-light text-blue-400 mb-2">Events & Entertainment</div>
                <p className="text-white text-sm">25+ years of industry expertise and proven results</p>
              </motion.div>
              
              <motion.div
                className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
              >
                <div className="text-2xl font-light text-purple-400 mb-2">AI-Powered Development</div>
                <p className="text-white text-sm">10x faster project delivery with cutting-edge tools</p>
              </motion.div>
              
              <motion.div
                className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
              >
                <div className="text-2xl font-light text-cyan-400 mb-2">Custom Solutions</div>
                <p className="text-white text-sm">Tailored specifically to your unique business needs</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}