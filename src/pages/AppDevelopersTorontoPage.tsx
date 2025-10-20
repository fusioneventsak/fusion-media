import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Code, Zap, Users, Globe, Shield, CheckCircle, ArrowRight, Star, Cpu } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import FAQSection from '../components/FAQSection';

interface AppDevelopersTorontoPageProps {
  onOpenContactModal?: () => void;
}

const AppDevelopersTorontoPage: React.FC<AppDevelopersTorontoPageProps> = ({ onOpenContactModal }) => {
  const appDevelopmentServices = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Native Mobile Apps",
      description: "iOS and Android native apps built with Swift, Kotlin, and platform-specific optimizations for maximum performance",
      features: ["iOS Development", "Android Development", "App Store Optimization", "Performance Monitoring"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Cross-Platform Development", 
      description: "React Native and Flutter apps that work seamlessly across multiple platforms with shared codebase",
      features: ["React Native", "Flutter Development", "Code Reusability", "Faster Time-to-Market"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Progressive Web Apps",
      description: "Fast, reliable web applications that provide native app experience through the browser",
      features: ["Offline Functionality", "Push Notifications", "App-like Experience", "Cross-Platform Compatibility"]
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "AI-Powered Apps",
      description: "Intelligent applications with machine learning capabilities and AI integration for enhanced user experiences",
      features: ["Machine Learning Integration", "AI Chatbots", "Predictive Analytics", "Natural Language Processing"]
    }
  ];

  const developmentProcess = [
    {
      phase: "Discovery & Strategy",
      description: "Comprehensive analysis of your Toronto market, target audience, and business objectives to create a winning app strategy",
      deliverables: ["Market Research", "User Personas", "Technical Architecture", "Project Roadmap"]
    },
    {
      phase: "Design & Prototyping",
      description: "User-centric design approach with wireframes, mockups, and interactive prototypes optimized for Toronto users",
      deliverables: ["UI/UX Design", "Interactive Prototypes", "Design System", "User Testing"]
    },
    {
      phase: "Development & Testing", 
      description: "Agile development process with regular testing, quality assurance, and client feedback integration",
      deliverables: ["App Development", "Quality Assurance", "Beta Testing", "Performance Optimization"]
    },
    {
      phase: "Launch & Support",
      description: "App store deployment, post-launch monitoring, ongoing maintenance, and feature updates",
      deliverables: ["App Store Launch", "Analytics Setup", "Ongoing Support", "Feature Updates"]
    }
  ];

  const torontoMarketStats = [
    { number: "2.8M", label: "Toronto metro area smartphone users" },
    { number: "87%", label: "of Canadians use mobile apps daily", source: "https://www.statista.com/topics/2711/mobile-internet-usage-in-canada/" },
    { number: "4.2hrs", label: "average daily app usage in Toronto" },
    { number: "$2.1B", label: "Canadian mobile app market size", source: "https://www.statista.com/outlook/dmo/app/canada" }
  ];

  const clientResults = [
    {
      client: "Toronto Fintech Startup",
      result: "300% increase in user engagement",
      metric: "50K+ downloads in first month"
    },
    {
      client: "Local E-commerce Business", 
      result: "250% boost in mobile sales",
      metric: "40% improvement in conversion rates"
    },
    {
      client: "Healthcare Provider",
      result: "500+ daily active users",
      metric: "95% user satisfaction rating"
    }
  ];

  const technologies = [
    "React Native", "Flutter", "Swift (iOS)", "Kotlin (Android)", 
    "Node.js", "Python", "Firebase", "AWS", "MongoDB", "PostgreSQL",
    "TensorFlow", "GraphQL", "Redux", "TypeScript"
  ];

  const faqs = [
    {
      question: "How long does it take to develop a mobile app in Toronto?",
      answer: "The timeline varies based on app complexity. Simple apps typically take 3-4 months, while complex enterprise applications can take 6-12 months. We provide detailed project timelines during the initial consultation and keep you updated throughout the development process."
    },
    {
      question: "What's the cost of app development in Toronto?",
      answer: "App development costs range from $15,000 for simple apps to $150,000+ for complex enterprise solutions. Factors affecting cost include features, platforms, design complexity, and third-party integrations. We provide transparent pricing with detailed project estimates."
    },
    {
      question: "Do you develop both iOS and Android apps?",
      answer: "Yes, we develop native iOS and Android apps, as well as cross-platform solutions using React Native and Flutter. We help you choose the best approach based on your target audience, budget, and timeline requirements."
    },
    {
      question: "Can you help with app store submission and approval?",
      answer: "Absolutely! We handle the entire app store submission process for both Apple App Store and Google Play Store, including app optimization, metadata creation, and compliance with store guidelines. We also provide ongoing support for app updates."
    },
    {
      question: "Do you provide ongoing app maintenance and support?",
      answer: "Yes, we offer comprehensive post-launch support including bug fixes, feature updates, performance monitoring, security patches, and compatibility updates for new OS versions. Our Toronto-based team provides reliable ongoing maintenance."
    },
    {
      question: "What industries do you serve in Toronto?",
      answer: "We serve diverse Toronto industries including fintech, healthcare, e-commerce, real estate, education, food delivery, logistics, and professional services. Our team has experience with industry-specific requirements and regulations."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "App Developers Toronto - Fusion Interactive",
    "description": "Professional mobile app development services in Toronto. Custom iOS and Android app development, React Native, Flutter, and AI-powered applications for Toronto businesses.",
    "url": "https://fusioninteractive.agency/app-developers-toronto",
    "provider": {
      "@type": "WebDesignCompany",
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
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Toronto",
      "containedInPlace": {
        "@type": "AdministrativeArea", 
        "name": "Ontario"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "App Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "iOS App Development",
            "description": "Native iOS app development using Swift and latest iOS frameworks"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Android App Development",
            "description": "Native Android app development using Kotlin and Android SDK"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cross-Platform App Development",
            "description": "React Native and Flutter apps for multiple platforms"
          }
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="App Developers Toronto | Mobile App Development Services | Fusion Interactive"
        description="Leading app developers in Toronto specializing in iOS, Android, React Native, and Flutter development. Custom mobile apps for Toronto businesses with proven results. $100-149/hr. Free consultation."
        keywords="app developers toronto, mobile app development toronto, app development toronto, ios developers toronto, android developers toronto, react native developers, flutter development toronto, toronto app development company, custom mobile apps"
        canonicalUrl="https://fusioninteractive.agency/app-developers-toronto"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-black relative">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-20 z-10">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Top App Developers in
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  Toronto
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
                Custom mobile app development for iOS, Android, and cross-platform solutions.
                Toronto's trusted app development team with proven results and ongoing support. <a href="/why-us" className="text-yellow-300 hover:text-yellow-200 underline">Why choose us?</a>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onOpenContactModal}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Your App Project
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </motion.button>
                <motion.a
                  href="/case-studies"
                  whileHover={{ scale: 1.05 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 inline-block text-center"
                >
                  View App Portfolio
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Toronto Market Stats */}
        <section className="relative py-16 bg-white z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Toronto's Mobile App Market
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {torontoMarketStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
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

        {/* Services Section */}
        <section className="relative py-20 bg-gray-50 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Toronto App Development Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive mobile app development services tailored for Toronto businesses.
                From concept to launch and beyond. We also specialize in{' '}
                <a href="/services/mobile-first-web-design" className="text-indigo-600 hover:text-indigo-700 underline">mobile-first web design</a>
                {' '}and{' '}
                <a href="/packages" className="text-indigo-600 hover:text-indigo-700 underline">fixed-price packages</a>.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {appDevelopmentServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-4 w-fit mb-6">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Development Process */}
        <section className="relative py-20 bg-white z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our App Development Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Proven methodology that has delivered successful apps for Toronto businesses 
                across various industries.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {developmentProcess.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-2xl p-6 h-full">
                    <div className="text-3xl font-bold mb-4 opacity-80">
                      0{index + 1}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">
                      {phase.phase}
                    </h3>
                    
                    <p className="text-indigo-100 mb-4 text-sm">
                      {phase.description}
                    </p>

                    <div className="space-y-1">
                      {phase.deliverables.map((deliverable, delIndex) => (
                        <div key={delIndex} className="text-xs text-indigo-200">
                          • {deliverable}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Results */}
        <section className="relative py-20 bg-gray-50 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Proven Results for Toronto Businesses
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {clientResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {result.client}
                  </h3>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">
                    {result.result}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {result.metric}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="relative py-20 bg-white z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Technologies We Use
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cutting-edge technologies and frameworks to build robust, scalable apps
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-100 hover:text-indigo-800 transition-colors duration-200"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection 
          faqs={faqs}
          title="App Development FAQ"
          description="Common questions about mobile app development services in Toronto"
        />

        {/* CTA Section */}
        <section className="relative py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Build Your App?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join successful Toronto businesses that have transformed their operations
                with custom mobile applications. <a href="/contact" className="text-yellow-300 hover:text-yellow-200 underline">Contact our Toronto team</a> or <a href="/case-studies" className="text-yellow-300 hover:text-yellow-200 underline">view our portfolio</a>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onOpenContactModal}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Free App Consultation
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </motion.button>
                <motion.a
                  href="/case-studies"
                  whileHover={{ scale: 1.05 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 inline-block text-center"
                >
                  View Our Portfolio
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AppDevelopersTorontoPage;