import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Zap, Smartphone, Globe, Rocket } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import ContactModal from '../components/ContactModal';

const packages = [
  {
    id: 1,
    title: "Stunning One Page",
    subtitle: "Perfect for startups & small businesses",
    price: "$1,500",
    timeline: "7 days",
    revisions: "1 revision included",
    description: "A beautiful, responsive one-page website that makes a powerful first impression",
    icon: Smartphone,
    features: [
      "Modern responsive design",
      "Mobile-first approach",
      "SEO optimization",
      "Contact form integration",
      "Fast loading performance",
      "Social media links",
      "Professional copywriting",
      "1 revision included"
    ],
    gradient: "from-blue-500 to-cyan-500",
    accentColor: "#3B82F6",
    popular: false
  },
  {
    id: 2,
    title: "Multi-Page Enterprise",
    subtitle: "Full-featured business website",
    price: "$3,500",
    timeline: "2-4 weeks",
    revisions: "3 revisions included",
    description: "Complete 5-7 page website with advanced SEO and LLM optimization",
    icon: Globe,
    features: [
      "5-7 custom pages",
      "Advanced SEO optimization",
      "LLM content optimization",
      "Content management system",
      "E-commerce ready",
      "Analytics integration",
      "Performance monitoring",
      "Advanced contact forms",
      "Blog functionality",
      "Social media integration"
    ],
    gradient: "from-purple-500 to-pink-500",
    accentColor: "#8B5CF6",
    popular: true
  },
  {
    id: 3,
    title: "App MVP",
    subtitle: "Turn your idea into reality",
    price: "$5,000",
    timeline: "4-6 weeks",
    revisions: "Multiple iterations",
    description: "A working prototype of your app idea with core functionality",
    icon: Rocket,
    features: [
      "iOS & Android compatible",
      "Core feature development",
      "User authentication",
      "Database integration",
      "API development",
      "Admin dashboard",
      "Testing & QA",
      "Deployment assistance",
      "Technical documentation",
      "Post-launch support"
    ],
    gradient: "from-emerald-500 to-green-500",
    accentColor: "#10B981",
    popular: false
  }
];

const PackageCard = ({ pkg, index, onGetStarted }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = pkg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popular Badge */}
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            Most Popular
          </div>
        </div>
      )}

      <div className={`relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 h-full transition-all duration-500 ${
        isHovered ? 'border-white/20 bg-black/50' : ''
      } ${pkg.popular ? 'ring-2 ring-purple-500/50' : ''}`}>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${pkg.gradient} mb-4`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2">{pkg.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{pkg.subtitle}</p>
          <div className="text-4xl font-bold text-white mb-2">{pkg.price}</div>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{pkg.timeline}</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <span>{pkg.revisions}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-center mb-8">{pkg.description}</p>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {pkg.features.map((feature, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onGetStarted(pkg.title)}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg ${
            pkg.popular
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/25'
              : `bg-gradient-to-r ${pkg.gradient} hover:shadow-blue-500/25`
          }`}
        >
          Get Started
        </button>

        {/* Hover Effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${pkg.gradient} opacity-0 transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-5' : ''
        }`} />
      </div>
    </motion.div>
  );
};

export default function PackagesPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  const handleGetStarted = (packageName: string) => {
    setSelectedPackage(packageName);
    setIsContactModalOpen(true);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Web Development Packages - Fusion Interactive",
    "description": "Professional web development packages including one-page websites, multi-page enterprise sites, and app MVP development in Toronto.",
    "provider": {
      "@type": "WebDesignCompany",
      "name": "Fusion Interactive",
      "url": "https://fusioninteractive.agency",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Toronto",
        "addressRegion": "ON",
        "addressCountry": "CA"
      }
    },
    "serviceArea": ["Toronto", "GTA", "Ontario", "Canada"],
    "offers": packages.map(pkg => ({
      "@type": "Offer",
      "name": pkg.title,
      "description": pkg.description,
      "price": pkg.price.replace('$', '').replace(',', ''),
      "priceCurrency": "CAD"
    }))
  };

  return (
    <>
      <SEOHead
        title="Web Development Packages | Custom Websites & Apps | Fusion Interactive"
        description="Professional web development packages starting at $1,500. One-page websites, multi-page enterprise sites, and app MVP development in Toronto. Rush jobs available."
        keywords="web development packages, website packages toronto, app development, mvp development, custom websites, web design packages"
        canonicalUrl="https://fusioninteractive.agency/packages"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* WebGL Background Pattern */}
        <div className="fixed inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Choose Your{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Package
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                Professional web development solutions tailored to your needs. From stunning one-page sites to complete app MVPs.
              </p>
              
              {/* Rush Jobs Notice */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full px-6 py-3"
              >
                <Zap className="w-5 h-5 text-orange-400" />
                <span className="text-orange-200 font-medium">
                  Rush jobs available - pricing quoted based on scope
                </span>
              </motion.div>
            </motion.div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {packages.map((pkg, index) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  index={index}
                  onGetStarted={handleGetStarted}
                />
              ))}
            </div>

            {/* Bottom CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Need Something Custom?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Have a unique project in mind? We love working on custom solutions. 
                Get in touch and let's discuss how we can bring your vision to life.
              </p>
              <button
                onClick={() => handleGetStarted('Custom Project')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Discuss Custom Project
              </button>
            </motion.div>

          </div>
        </div>

        {/* Contact Modal */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => {
            setIsContactModalOpen(false);
            setSelectedPackage('');
          }}
          initialMessage={selectedPackage ? `Hi! I'm interested in the ${selectedPackage} package. Could you provide more details?` : ''}
        />
      </div>
    </>
  );
}