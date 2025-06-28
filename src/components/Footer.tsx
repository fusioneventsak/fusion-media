import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Zap, 
  Star, 
  ArrowUp, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import LegalModals from './LegalModals';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    'Web Development',
    'Event Technology',
    'Mobile Applications',
    'AI/ML Solutions',
    'VR/AR Experiences',
    'Custom Software'
  ];

  const industries = [
    'Events & Entertainment',
    'Corporate Solutions',
    'E-commerce',
    'Healthcare',
    'Education',
    'Manufacturing'
  ];

  const company = [
    'About Us',
    'Case Studies',
    'Our Process',
    'Careers',
    'Blog',
    'Contact'
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LegalModals>
      {(openModal) => (
        <footer className="relative">
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

                {/* Industries */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-6">Industries</h3>
                  <ul className="space-y-3">
                    {industries.map((industry, index) => (
                      <motion.li
                        key={index}
                        className="text-gray-300 hover:text-purple-400 transition-colors cursor-pointer flex items-center group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        {industry}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Contact & Company */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-6">Get In Touch</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm">hello@fusioninteractive.ca</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Phone className="w-4 h-4 text-green-400" />
                      <span className="text-sm">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <MapPin className="w-4 h-4 text-red-400" />
                      <span className="text-sm">Toronto, Ontario, Canada</span>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
                  <ul className="space-y-3">
                    {company.map((item, index) => (
                      <motion.li
                        key={index}
                        className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer flex items-center group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>

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
              className="border-t border-white/10 bg-black/70"
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