import React from 'react';
import { motion } from 'framer-motion';
import FullWidthLaptopShowcase from '../components/Laptop';

export default function HomePage() {
  return (
    <div className="relative pointer-events-none">
      {/* Hero Section - Transparent to show WebGL background */}
      <section className="relative min-h-screen flex items-center justify-center px-8 pt-20 pointer-events-none">
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl pointer-events-auto">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium text-white">AI-Assisted Digital Agency</span>
            </div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 text-white leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            We use the{' '}
            <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              best tools
            </span>
            <br />
            of our time
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-white mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            What once took months to produce—high-end websites with animations, 
            multiple pages, and complex functionality—we now deliver in weeks. 
            AI-powered productivity meets 25+ years of expertise in events, 
            entertainment, and technology.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button 
              className="px-10 py-4 bg-white text-gray-900 rounded-full font-medium text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See Our Work
            </motion.button>
            <motion.button 
              className="px-10 py-4 border border-white/30 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Project
            </motion.button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
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
                whileHover={{ scale: 1.05 }}
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
      <div className="pointer-events-auto">
        <FullWidthLaptopShowcase
          url="https://selfieholosphere.com/collage/1lr9qn"
          title="Event Engagement Technology"
          description="Interactive experiences that captivate audiences and create unforgettable moments. From trade shows to festivals, retail activations to corporate events—our engagement platforms drive participation and generate valuable data insights."
          features={[
            'Trade shows and corporate events with real-time engagement',
            'Festivals and concerts with social media integration',
            'Retail locations and brand activations',
            'Real-time photo processing and customizable animations',
            'Custom branding, analytics, and lead generation'
          ]}
          backgroundColor="transparent"
          textColor="text-white"
          accentColor="text-purple-600"
        />
      </div>

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
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
    <LegalModals>
      {(openModal) => (
        <footer className="relative pointer-events-auto">
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent"></div>
          
          <div className="relative z-10">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-8 py-20">
              <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
                
                {/* Company Info */}
                <motion.div
                  className="lg:col-span-1"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-light text-white">FUSION</div>
                      <div className="text-xs font-light text-gray-400 -mt-1 tracking-wider">INTERACTIVE</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Transforming businesses with AI-powered development and 25+ years of expertise 
                    in events, entertainment, and cutting-edge technology solutions.
                  </p>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span>AI-Assisted Development</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Star className="w-4 h-4 text-blue-400" />
                    <span>25+ Years Experience</span>
                  </div>
                </motion.div>

                {/* Services */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-6">Our Services</h3>
                  <ul className="space-y-3">
                    {services.map((service, index) => (
                      <motion.li
                        key={index}
                        className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer flex items-center group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        {service}
                      </motion.li>
                    ))}
                  </ul>
              </motion.div>

              {/* Social Links & Stats */}
              <motion.div
                className="mt-12 pt-8 border-t border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                  
                  {/* Social Links */}
                  <div className="flex items-center space-x-6">
                    <span className="text-gray-400 text-sm">Follow us:</span>
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">500+</div>
                      <div className="text-xs text-gray-400">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">150+</div>
                      <div className="text-xs text-gray-400">Clients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">25+</div>
                      <div className="text-xs text-gray-400">Years</div>
                    </div>
                  </div>

                  {/* Back to Top */}
                  <motion.button
                    onClick={scrollToTop}
                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Back to top"
                  >
                    <ArrowUp className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Bottom Bar */}
            <motion.div
              className="border-t border-white/10 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="max-w-7xl mx-auto px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-gray-400 text-sm">
                    © {currentYear} Fusion Interactive. All rights reserved.
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <button 
                      onClick={() => openModal('privacy')}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                    <button 
                      onClick={() => openModal('terms')}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Terms of Service
                    </button>
                    <button 
                      onClick={() => openModal('cookies')}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Cookies
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>Made with</span>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-red-400"
                    >
                      ❤️
                    </motion.div>
                    <span>in Canada</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </footer>
      )}
    </LegalModals>
  );
}