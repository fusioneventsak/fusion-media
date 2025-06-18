import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Twitter, 
  Github, 
  Instagram,
  ArrowUp,
  Zap,
  Star,
  Rocket
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const services = [
    'Web Development',
    'Event Technology',
    'Mobile Applications',
    'AI/ML Solutions',
    'VR/AR Experiences',
    'Custom Software'
  ];

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
    { name: 'Blog', href: '#blog' },
    { name: 'Careers', href: '#careers' }
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
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

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    className="text-gray-300 hover:text-purple-400 transition-colors cursor-pointer flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <a href={link.href}>{link.name}</a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-white mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-gray-300">hello@fusioninteractive.ca</div>
                    <div className="text-sm text-gray-400">General inquiries</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-gray-300">+1 (555) 123-4567</div>
                    <div className="text-sm text-gray-400">Mon-Fri 9AM-6PM EST</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-gray-300">Toronto, Ontario</div>
                    <div className="text-sm text-gray-400">Canada</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-gray-300">fusioninteractive.ca</div>
                    <div className="text-sm text-gray-400">Visit our website</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Newsletter Signup */}
          <motion.div
            className="mt-16 pt-12 border-t border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-semibold text-white mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-6">
                Get the latest insights on AI development, event technology trends, and exclusive project showcases.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                />
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
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
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
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
  );
}