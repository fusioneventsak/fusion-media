import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
  };

  return (
    <div className="relative z-10 pointer-events-none">
      <section className="min-h-screen px-8 pt-24">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <motion.h1 
            className="text-6xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Let's Build Something Amazing
          </motion.h1>
          <motion.p 
            className="text-xl text-center text-gray-300 mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to transform your digital presence? Get in touch and let's discuss how we can bring 
            your vision to life with cutting-edge technology and innovative solutions.
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div 
              className="bg-black/30 rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-white">Start Your Project</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="Your Company Name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Project Type</label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                    >
                      <option value="">Select Project Type</option>
                      <option value="web-development">Web Development</option>
                      <option value="mobile-app">Mobile Application</option>
                      <option value="event-technology">Event Technology</option>
                      <option value="ai-ml">AI/ML Solutions</option>
                      <option value="vr-ar">VR/AR Experience</option>
                      <option value="custom-solution">Custom Solution</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                    >
                      <option value="">Select Budget Range</option>
                      <option value="10k-25k">$10K - $25K</option>
                      <option value="25k-50k">$25K - $50K</option>
                      <option value="50k-100k">$50K - $100K</option>
                      <option value="100k+">$100K+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Timeline</label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  >
                    <option value="">Select Timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3-months">1-3 Months</option>
                    <option value="3-6-months">3-6 Months</option>
                    <option value="6-12-months">6-12 Months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Project Details *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project goals, requirements, and any specific features you have in mind..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Project Inquiry
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <div className="space-y-8">
              <motion.div 
                className="bg-gradient-to-br from-cyan-900/60 to-blue-900/60 bg-black/40 rounded-2xl p-8 border border-cyan-500/30"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-cyan-300">Get In Touch</h2>
                <div className="space-y-6">
                  {[
                    { icon: '📧', title: 'Email Us', detail: 'hello@fusioninteractive.ca' },
                    { icon: '📱', title: 'Call Us', detail: '+1 (555) 123-4567' },
                    { icon: '📍', title: 'Visit Us', detail: 'Toronto, Ontario, Canada' },
                    { icon: '🌐', title: 'Website', detail: 'www.fusioninteractive.ca' }
                  ].map((contact, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    >
                      <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-cyan-400 text-xl">{contact.icon}</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">{contact.title}</div>
                        <div className="text-gray-300">{contact.detail}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="bg-black/30 rounded-xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <h3 className="text-xl font-bold mb-4 text-purple-400">Why Choose Us?</h3>
                <ul className="space-y-3">
                  {[
                    "Free consultation & project assessment",
                    "48-hour response guarantee",
                    "100% custom solutions, no templates",
                    "Dedicated project manager",
                    "Ongoing support & maintenance",
                    "Transparent pricing & timeline"
                  ].map((benefit, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-2">24hrs</div>
                  <div className="text-sm text-gray-400">Response Time</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4 border border-white/10 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">500+</div>
                  <div className="text-sm text-gray-400">Projects Delivered</div>
                </div>
                </>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}