import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData
        }).toString()
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            projectType: '',
            budget: '',
            message: ''
          });
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Fusion Interactive - Toronto Web Design & AI Consulting",
    "description": "Get in touch with Toronto's premier web design and AI consulting agency. Free consultation, custom quotes, and expert advice. $100-149/hr. 24hr response time.",
    "url": "https://fusioninteractive.agency/contact",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "Fusion Interactive",
      "alternateName": "Fusion Interactive Agency",
      "url": "https://fusioninteractive.agency",
      "logo": "https://fusioninteractive.agency/logos/Fusion-Interactive-Logo.png",
      "image": "https://fusioninteractive.agency/Website%20Images/Open%20Graph.png",
      "telephone": "416-825-4938",
      "email": "info@fusion-events.ca",
      "priceRange": "$100-149 per hour",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Toronto",
        "addressRegion": "ON",
        "addressCountry": "CA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "43.6532",
        "longitude": "-79.3832"
      },
      "openingHours": "Mo-Fr 09:00-17:00",
      "areaServed": [
        {
          "@type": "City",
          "name": "Toronto"
        },
        {
          "@type": "State",
          "name": "Ontario"
        },
        {
          "@type": "Country",
          "name": "Canada"
        }
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "416-825-4938",
          "contactType": "customer service",
          "email": "info@fusion-events.ca",
          "areaServed": "CA",
          "availableLanguage": ["English"],
          "contactOption": "TollFree"
        },
        {
          "@type": "ContactPoint",
          "contactType": "sales",
          "email": "info@fusion-events.ca",
          "areaServed": "CA",
          "availableLanguage": ["English"]
        }
      ]
    }
  };

  return (
    <div className="relative z-10 pointer-events-none">
      <SEOHead
        title="Contact Us | Toronto Web Design & AI Consulting | Fusion Interactive"
        description="Get in touch with Toronto's premier web design and AI consulting agency. Free consultation, custom quotes, and expert advice. $100-149/hr. 24hr response time. Contact us today."
        keywords="contact web design toronto, web design quote toronto, toronto web development contact, free consultation web design, AI consulting contact, app development quote toronto, react developer contact"
        canonicalUrl="https://fusioninteractive.agency/contact"
        structuredData={contactStructuredData}
      />
      <section className="min-h-screen px-8 pt-24">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <motion.h1
            className="text-6xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Contact Toronto's Leading Web Design & App Development Agency
          </motion.h1>
          <motion.p
            className="text-xl text-center text-gray-300 mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to transform your digital presence? Get in touch with our Toronto web design and app development team. Free consultation. <a href="/packages" className="text-blue-400 hover:text-blue-300 underline">View our packages</a> or <a href="/case-studies" className="text-purple-400 hover:text-purple-300 underline">see our work</a>. $100-149/hr. 24hr response.
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              className="bg-black/30 rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-white">Start Your Toronto Web Design Project Today</h2>
              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/70">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
              <form
                onSubmit={handleSubmit}
                name="contact"
                netlify-honeypot="bot-field"
                data-netlify="true"
                className="space-y-6"
              >
                {/* Hidden fields for Netlify */}
                <input type="hidden" name="form-name" value="contact" />
                <div className="hidden">
                  <input name="bot-field" />
                </div>
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

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                      placeholder="(416) 123-4567"
                    />
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
                </div>


                <div>
                  <label className="block text-gray-300 mb-2">Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors [&>option]:bg-gray-800 [&>option]:text-white"
                  >
                    <option value="" className="bg-gray-800 text-white">Select project type</option>
                    <option value="website" className="bg-gray-800 text-white">Website Development</option>
                    <option value="webapp" className="bg-gray-800 text-white">Web Application</option>
                    <option value="engagement" className="bg-gray-800 text-white">Event Engagement Platform</option>
                    <option value="custom" className="bg-gray-800 text-white">Custom Solution</option>
                    <option value="consultation" className="bg-gray-800 text-white">Consultation Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors [&>option]:bg-gray-800 [&>option]:text-white"
                  >
                    <option value="" className="bg-gray-800 text-white">Select budget range</option>
                    <option value="1500-2500" className="bg-gray-800 text-white">$1,500 - $2,500</option>
                    <option value="2500-5000" className="bg-gray-800 text-white">$2,500 - $5,000</option>
                    <option value="5000-8000" className="bg-gray-800 text-white">$5,000 - $8,000</option>
                    <option value="8000-10000" className="bg-gray-800 text-white">$8,000 - $10,000</option>
                    <option value="10000-plus" className="bg-gray-800 text-white">$10,000+</option>
                    <option value="discuss" className="bg-gray-800 text-white">Let's discuss</option>
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
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    'Send Project Inquiry'
                  )}
                </motion.button>
              </form>
              )}
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
                    { icon: '📧', title: 'Email Us', detail: 'info@fusion-events.ca', link: 'mailto:info@fusion-events.ca' },
                    { icon: '📱', title: 'Call Us', detail: '416-825-4938', link: 'tel:416-825-4938' },
                    { icon: '📍', title: 'Visit Us', detail: 'Toronto, Ontario, Canada' },
                    { icon: '🌐', title: 'Website', detail: 'fusioninteractive.agency', link: 'https://fusioninteractive.agency' }
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
                        {contact.link ? (
                          <a
                            href={contact.link}
                            className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                            target={contact.link.startsWith('http') ? '_blank' : undefined}
                            rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            {contact.detail}
                          </a>
                        ) : (
                          <div className="text-gray-300">{contact.detail}</div>
                        )}
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
                <h3 className="text-xl font-bold mb-4 text-purple-400">Why Choose Our Toronto Web Design Agency?</h3>
                <ul className="space-y-3">
                  {[
                    "Free consultation & project assessment",
                    "24-48 hour response guarantee",
                    "100% custom web & mobile solutions",
                    "Dedicated Toronto-based project team",
                    "Ongoing support & maintenance",
                    "Transparent pricing $100-149/hr"
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
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-2">24hrs</div>
                  <div className="text-sm text-gray-400">Response Time</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4 border border-white/10 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">500+</div>
                  <div className="text-sm text-gray-400">Projects Delivered</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}