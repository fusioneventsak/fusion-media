import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SEOHead from '../components/SEOHead';

interface WhyUsPageProps {
  onNavigate?: (page: string) => void;
  onOpenContactModal?: () => void;
}

export default function WhyUsPage({ onNavigate, onOpenContactModal }: WhyUsPageProps = {}) {
  const whyUsStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Why Choose Fusion Interactive - Toronto Web Design & Development Agency",
    "description": "Discover why Toronto businesses choose Fusion Interactive for web design, app development, and AI integration. Premium quality, fast delivery, and affordable pricing.",
    "url": "https://fusioninteractive.agency/why-us",
    "mainEntity": {
      "@type": "Organization",
      "name": "Fusion Interactive",
      "url": "https://fusioninteractive.agency",
      "telephone": "416-825-4938",
      "email": "info@fusion-events.ca",
      "priceRange": "$100-149 per hour",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Toronto",
        "addressRegion": "ON",
        "addressCountry": "CA"
      },
      "description": "Toronto's premier web design and AI consulting agency specializing in custom React applications, mobile-first design, and AI integration.",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "150"
      }
    }
  };

  const heroRef = useRef(null);
  const reasonsRef = useRef(null);
  const processRef = useRef(null);
  const statsRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const reasonsInView = useInView(reasonsRef, { once: true, amount: 0.2 });
  const processInView = useInView(processRef, { once: true, amount: 0.2 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className="relative z-10 pointer-events-none">
      <SEOHead
        title="Why Choose Us | Toronto Web Design & App Development | Fusion Interactive"
        description="Discover why Toronto businesses choose Fusion Interactive for web design, app development, and AI integration. Premium quality, fast delivery, affordable pricing. $100-149/hr. Free consultation."
        keywords="web design toronto, app development toronto, toronto web development, why choose fusion interactive, web design agency toronto, mobile app development, AI consulting toronto, custom web design"
        canonicalUrl="https://fusioninteractive.agency/why-us"
        structuredData={whyUsStructuredData}
      />
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center px-8 pt-24 relative pointer-events-auto">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent"
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="max-w-6xl mx-auto text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-sm font-medium text-blue-300 mb-6">
              Why Choose Fusion Interactive
            </span>
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white"
            variants={itemVariants}
          >
            Toronto Web Design & App Development.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Lightning Fast.
            </span>
            <br />
            Surprisingly Affordable.
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
            variants={itemVariants}
          >
            Toronto's premier web design and app development agency. We don't just build websites and apps — we craft <a href="/services/mobile-first-web-design" className="text-blue-400 hover:text-blue-300 underline">custom digital experiences</a> that captivate your audience,
            drive real business results, and get delivered faster than you thought possible. <a href="/packages" className="text-purple-400 hover:text-purple-300 underline">View our packages</a>.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={itemVariants}
          >
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
              See Our Work
            </button>
            <button 
              className="px-8 py-4 border border-white/20 rounded-full font-semibold text-lg text-white hover:bg-white/5 transition-all duration-300"
              onClick={onOpenContactModal}
            >
              Get Quote in 24hrs
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Reasons Section */}
      <section ref={reasonsRef} className="py-32 px-8 relative pointer-events-auto">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={reasonsInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              variants={itemVariants}
            >
              Why Toronto Businesses Choose Fusion Interactive
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              What sets our Toronto web design and app development agency apart
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={reasonsInView ? "visible" : "hidden"}
          >
            {/* Creative Development */}
            <motion.div
              className="group bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-500"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Creative Toronto Web Development</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We don't build cookie-cutter websites. Every Toronto web design project gets custom design thinking,
                innovative interactions, and creative solutions that make your brand unforgettable.
                From 3D animations to <a href="/services/ai-powered-web-solutions" className="text-blue-400 hover:text-blue-300 underline">AI-powered features</a> — we push boundaries.
              </p>
              <ul className="space-y-3">
                {[
                  'Custom animations & micro-interactions',
                  '3D visualizations & immersive experiences',
                  'AI/ML integration for smart functionality',
                  'Cutting-edge web technologies'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Bespoke Business Solutions */}
            <motion.div
              className="group bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-500"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Custom App Development for Toronto Businesses</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Your business is unique, so your technology should be too. Our <a href="/services/app-development" className="text-purple-400 hover:text-purple-300 underline">Toronto app development team</a> analyzes your workflow,
                understands your challenges, and builds custom web and mobile solutions that fit like a glove.
                No forcing square pegs into round holes.
              </p>
              <ul className="space-y-3">
                {[
                  'Custom CRM & business management tools',
                  'Workflow automation & process optimization',
                  'Integration with existing systems',
                  'Scalable architecture for future growth'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Turnaround */}
            <motion.div
              className="group bg-gradient-to-br from-green-500/5 to-emerald-500/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-green-500/30 transition-all duration-500"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Lightning-Fast Delivery</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Time is money, and we respect both. Our streamlined development process, 
                experienced team, and proven frameworks mean you get premium results in weeks, 
                not months. Speed without sacrifice.
              </p>
              <ul className="space-y-3">
                {[
                  'MVP in 2-4 weeks, full projects in 6-12 weeks',
                  'Agile development with weekly updates',
                  'Pre-built components & proven frameworks',
                  '24-48 hour response time guarantee'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Elevated Design & Affordability */}
            <motion.div
              className="group bg-gradient-to-br from-orange-500/5 to-red-500/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-orange-500/30 transition-all duration-500"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Premium Quality, Smart Pricing</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Enterprise-level design and functionality at startup-friendly prices. We use smart 
                development practices and efficiency tools to deliver premium results without the 
                premium price tag. Beautiful doesn't have to mean expensive.
              </p>
              <ul className="space-y-3">
                {[
                  'Transparent pricing with no hidden fees',
                  'Flexible payment plans & project packages',
                  '50-70% less than traditional agencies',
                  'Free consultations & detailed quotes'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-32 px-8 bg-gradient-to-br from-blue-500/5 to-purple-500/5 relative pointer-events-auto">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              variants={itemVariants}
            >
              Our Toronto Web Design Process
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300"
              variants={itemVariants}
            >
              From concept to launch — Toronto's fastest web development process
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
          >
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Deep dive into your business, goals, and target audience",
                color: "from-blue-500 to-cyan-600"
              },
              {
                step: "02", 
                title: "Design",
                description: "Create stunning mockups and user experience flows",
                color: "from-purple-500 to-pink-600"
              },
              {
                step: "03",
                title: "Develop",
                description: "Build with cutting-edge tech and rigorous testing",
                color: "from-green-500 to-emerald-600"
              },
              {
                step: "04",
                title: "Deploy",
                description: "Launch, optimize, and provide ongoing support",
                color: "from-orange-500 to-red-600"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={cardVariants}
                whileHover={{ y: -10 }}
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-32 px-8 pointer-events-auto">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              variants={itemVariants}
            >
              Proven Results
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
          >
            {[
              { number: "500+", label: "Projects Delivered", color: "text-blue-400" },
              { number: "150+", label: "Happy Clients", color: "text-purple-400" },
              { number: "25+", label: "Years Experience", color: "text-cyan-400" },
              { number: "98%", label: "Client Satisfaction", color: "text-green-400" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`text-5xl md:text-6xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 bg-gradient-to-r from-blue-600 to-purple-700 pointer-events-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
            Ready to Start Your Toronto Web Design Project?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-blue-100">
            Let's turn your vision into a digital reality that drives real results. <a href="/case-studies" className="text-blue-200 hover:text-white underline">View our case studies</a> or <a href="/contact" className="text-blue-200 hover:text-white underline">contact our Toronto team</a>.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button 
              className="px-10 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenContactModal}
            >
              Start Your Project Today
            </motion.button>
            <motion.button 
              className="px-10 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate?.('home')}
            >
              View Our Portfolio
            </motion.button>
          </div>
          
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-blue-200">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free Consultation
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              24-Hour Response
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              No Hidden Fees
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}