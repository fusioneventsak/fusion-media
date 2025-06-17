import React from 'react';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="relative z-10 pointer-events-none">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-8 pt-20">
        <div className="text-center max-w-5xl pointer-events-auto">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            FUSION INTERACTIVE
          </motion.h1>
          <motion.h2 
            className="text-2xl md:text-3xl mb-4 text-cyan-400 font-semibold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Custom Web Development & Event Technology Specialists
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Transform your digital presence with cutting-edge custom applications, AI-powered solutions, 
            immersive event technology, and virtual production that captivates audiences and drives results. 
            From interactive trade show experiences to enterprise-grade web platforms, we build the impossible.
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button 
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Portfolio
            </motion.button>
            <motion.button 
              className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold hover:bg-white/10 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.button>
          </motion.div>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {[
              { number: '500+', label: 'Projects Delivered', color: 'text-cyan-400' },
              { number: '98%', label: 'Client Satisfaction', color: 'text-purple-400' },
              { number: '24/7', label: 'Support Available', color: 'text-pink-400' },
              { number: '10+', label: 'Years Experience', color: 'text-green-400' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-3"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-7xl w-full pointer-events-auto">
          <motion.h2 
            className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Why Choose Fusion Interactive?
          </motion.h2>
          <motion.p 
            className="text-xl text-center text-gray-300 mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We don't just build applications – we create digital experiences that transform businesses and captivate audiences.
          </motion.p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🚀', title: 'Cutting-Edge Technology', description: 'WebGL, AI, machine learning, and the latest frameworks for unparalleled performance.' },
              { icon: '🎯', title: 'Custom Solutions Only', description: 'No templates, no shortcuts. Every project is built from scratch to your exact specifications.' },
              { icon: '⚡', title: 'Performance Obsessed', description: 'Lightning-fast load times, smooth animations, and optimized user experiences.' },
              { icon: '🤖', title: 'AI-Powered Innovation', description: 'Intelligent chatbots, automation, and machine learning that adds real value.' },
              { icon: '📊', title: 'Data-Driven Results', description: 'Comprehensive analytics and insights that inform every design decision.' },
              { icon: '🔧', title: 'End-to-End Service', description: 'From concept to launch and beyond, we handle the entire development lifecycle.' },
              { icon: '🎪', title: 'Event Technology Experts', description: 'Interactive installations, virtual production, and immersive experiences.' },
              { icon: '🌐', title: 'Scalable Architecture', description: 'Built to grow with your business, from startup to enterprise scale.' },
              { icon: '🔒', title: 'Enterprise Security', description: 'Bank-level security protocols and GDPR/HIPAA compliance built-in.' }
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-white">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-7xl w-full pointer-events-auto">
          <motion.h2 
            className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Expertise & Services
          </motion.h2>
          <motion.p 
            className="text-xl text-center text-gray-300 mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From concept to launch, we deliver comprehensive digital solutions that drive business growth and create unforgettable user experiences.
          </motion.p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "🌐 Custom Web Development",
                description: "React, Vue, Angular, PWAs, APIs - Enterprise-grade applications built with cutting-edge frameworks.",
                features: ["Progressive Web Apps", "API Development", "Microservices Architecture", "Cloud Integration"]
              },
              {
                title: "🤖 AI & Machine Learning",
                description: "Intelligent chatbots, predictive analytics, computer vision - AI that adds real business value.",
                features: ["Chatbot Development", "Predictive Analytics", "Computer Vision", "Natural Language Processing"]
              },
              {
                title: "🎬 Virtual Production & Streaming",
                description: "Multi-camera setups, live streaming, virtual events - Professional-grade video solutions.",
                features: ["Live Event Streaming", "Virtual Event Platforms", "Multi-Camera Production", "Interactive Webinars"]
              },
              {
                title: "📱 Mobile & Cross-Platform Apps",
                description: "iOS, Android, React Native - Native performance with cross-platform efficiency.",
                features: ["Native iOS/Android", "React Native", "Flutter Development", "Mobile-First Design"]
              },
              {
                title: "🎮 Interactive & 3D Experiences",
                description: "WebGL, VR/AR, gamification - Immersive experiences that captivate and engage.",
                features: ["WebGL Development", "VR/AR Applications", "3D Visualization", "Interactive Games"]
              },
              {
                title: "⚡ Performance & Optimization",
                description: "Speed optimization, SEO, security - Technical excellence that drives results.",
                features: ["Performance Optimization", "SEO Implementation", "Security Audits", "Load Testing"]
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-cyan-400 flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-7xl w-full text-center pointer-events-auto">
          <motion.h2 
            className="text-5xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Interactive Portfolio Experience
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore our live projects in immersive 3D space. These aren't just mockups – they're real, 
            functioning applications you can interact with. Rotate the view and experience the quality of our work firsthand.
          </motion.p>
          
          <motion.div 
            className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-300">🎯 How to Explore</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-cyan-400 font-semibold mb-2">🖱️ Interactive Controls</div>
                <p className="text-gray-400">Click and drag to rotate the 3D scene. Hover over devices to see them scale up.</p>
              </div>
              <div>
                <div className="text-purple-400 font-semibold mb-2">💻 Live Applications</div>
                <p className="text-gray-400">Each laptop and phone displays a real, functioning website you can interact with.</p>
              </div>
              <div>
                <div className="text-pink-400 font-semibold mb-2">📱 Responsive Design</div>
                <p className="text-gray-400">See how our applications adapt perfectly to different screen sizes and devices.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}