import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Tablet, Monitor, Zap, Globe, Users, CheckCircle, ArrowRight, Star } from 'lucide-react';
import SEOHead from '../components/SEOHead';

interface MobileFirstWebDesignPageProps {
  onOpenContactModal?: () => void;
}

const MobileFirstWebDesignPage: React.FC<MobileFirstWebDesignPageProps> = ({ onOpenContactModal }) => {
  const mobileFirstBenefits = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile-Optimized Performance",
      description: "Lightning-fast loading speeds on mobile devices with optimized images and streamlined code"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Enhanced User Experience", 
      description: "Intuitive touch-friendly interfaces designed specifically for mobile interaction patterns"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Superior SEO Rankings",
      description: "Google's mobile-first indexing prioritizes mobile-optimized sites in search results"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Faster Development Cycles",
      description: "Streamlined development process starting with mobile constraints for efficient scaling"
    }
  ];

  const designProcess = [
    {
      step: "01",
      title: "Mobile Strategy Analysis",
      description: "Comprehensive analysis of your Toronto market audience mobile behavior and competitor mobile experiences"
    },
    {
      step: "02", 
      title: "Mobile-First Design System",
      description: "Creation of responsive design system starting with mobile breakpoints and scaling up to desktop"
    },
    {
      step: "03",
      title: "Progressive Enhancement",
      description: "Layer additional features for tablet and desktop while maintaining core mobile functionality"
    },
    {
      step: "04",
      title: "Performance Optimization",
      description: "Advanced optimization techniques for Core Web Vitals and mobile loading speeds"
    }
  ];

  const mobileStats = [
    { number: "73%", label: "of users will be mobile-only by 2025", source: "https://www.statista.com/statistics/277125/share-of-website-traffic-coming-from-mobile-devices/" },
    { number: "53%", label: "of users abandon slow-loading mobile sites", source: "https://developers.google.com/web/tools/lighthouse" },
    { number: "3x", label: "higher conversion rates with mobile-first design" },
    { number: "67%", label: "of Toronto searches happen on mobile" }
  ];

  const serviceFeatures = [
    "Responsive design optimized for all Toronto mobile carriers",
    "Touch-friendly navigation and interaction patterns", 
    "Progressive Web App (PWA) capabilities for app-like experience",
    "Mobile-specific SEO optimization for local Toronto searches",
    "Cross-device testing on real devices and emulators",
    "Advanced mobile analytics and user behavior tracking",
    "Integration with Toronto-based payment processors",
    "Accessibility compliance for mobile screen readers"
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Mobile-First Web Design Toronto",
    "description": "Professional mobile-first web design services in Toronto. Responsive, fast-loading websites optimized for mobile devices and local Toronto market.",
    "provider": {
      "@type": "WebDesignCompany",
      "name": "Fusion Interactive",
      "url": "https://fusioninteractive.agency"
    },
    "areaServed": {
      "@type": "City",
      "name": "Toronto",
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Ontario"
      }
    },
    "offers": {
      "@type": "Offer",
      "priceRange": "$2500-$15000",
      "availability": "InStock"
    },
    "serviceType": "Mobile-First Web Design",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mobile-First Design Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Responsive Web Design",
            "description": "Mobile-optimized responsive design for all device sizes"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Progressive Web Apps",
            "description": "App-like mobile experiences with offline capabilities"
          }
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Mobile-First Web Design Toronto | Responsive Design Agency | Fusion Interactive"
        description="Expert mobile-first web design services in Toronto. Responsive, fast-loading websites optimized for mobile devices. Professional Toronto web designers specializing in mobile UX and performance."
        keywords="mobile first web design toronto, responsive web design toronto, mobile web design, toronto mobile website design, mobile optimized websites toronto, progressive web apps toronto, mobile UX design"
        canonicalUrl="https://fusioninteractive.agency/mobile-first-web-design-toronto"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-black relative">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 text-white py-20 z-10">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Mobile-First Web Design
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  Toronto
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Professional mobile-first web design services optimized for Toronto's mobile-first audience. 
                Lightning-fast, responsive websites that convert on every device.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onOpenContactModal}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Mobile Optimization Quote
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </motion.button>
                <motion.a
                  href="/case-studies"
                  whileHover={{ scale: 1.05 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 inline-block text-center"
                >
                  View Mobile Portfolio
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-16 bg-white z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {mobileStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="relative py-20 bg-gray-50 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Mobile-First Design Matters in Toronto
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Toronto's tech-savvy population demands fast, intuitive mobile experiences. 
                Mobile-first design ensures your website performs flawlessly on every device.
                Learn more about our <a href="/blog/technical-seo-guide-2024" className="text-blue-600 hover:text-blue-700 underline">technical SEO optimization</a> and <a href="/app-developers-toronto" className="text-blue-600 hover:text-blue-700 underline">app development services</a>.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {mobileFirstBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-3 w-fit mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="relative py-20 bg-white z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Mobile-First Design Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Proven methodology for creating mobile-optimized websites that perform 
                exceptionally across all devices and deliver results for Toronto businesses.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {designProcess.map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl p-6 h-full">
                    <div className="text-4xl font-bold mb-4 opacity-80">
                      {process.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {process.title}
                    </h3>
                    <p className="text-blue-100">
                      {process.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-20 bg-gray-50 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Comprehensive Mobile-First Features
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Every mobile-first website we design for Toronto businesses includes 
                  these essential features to ensure maximum performance and user engagement.
                </p>

                <div className="space-y-4">
                  {serviceFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-8 text-white">
                  <div className="flex items-center space-x-4 mb-6">
                    <Smartphone className="w-12 h-12" />
                    <Tablet className="w-12 h-12 opacity-75" />
                    <Monitor className="w-12 h-12 opacity-50" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">
                    Responsive Across All Devices
                  </h3>
                  
                  <p className="text-blue-100 mb-6">
                    Our mobile-first approach ensures your Toronto business website 
                    looks and performs perfectly on smartphones, tablets, and desktops.
                  </p>

                  <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </div>
                    <p className="text-sm text-blue-100">
                      "Exceptional mobile design work! Our Toronto customers love 
                      the new mobile experience." - Sarah K., Local Business Owner
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Go Mobile-First?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join Toronto businesses that have improved their mobile conversion rates 
                by up to 300% with professional mobile-first web design.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onOpenContactModal}
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Your Mobile Project
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={onOpenContactModal}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Schedule Consultation
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MobileFirstWebDesignPage;