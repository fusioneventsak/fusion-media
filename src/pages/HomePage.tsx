import React from 'react';

export default function HomePage() {
  return (
    <div className="relative z-10 pointer-events-none">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-8 pt-20">
        <div className="text-center max-w-6xl pointer-events-auto">
          {/* Main Hero Content with Professional Typography */}
          <div className="relative z-20">
            {/* Elegant backdrop for text readability */}
            <div className="absolute -inset-12 bg-gradient-radial from-black/40 via-black/20 to-transparent blur-2xl"></div>
            <div className="absolute -inset-8 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-transparent blur-xl"></div>
            
            <div className="relative">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight">
                <span className="block font-extralight text-white/90 mb-2">FUSION</span>
                <span className="block font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
                  INTERACTIVE
                </span>
              </h1>
              
              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed mb-6">
                  Transforming businesses through cutting-edge technology and immersive digital experiences
                </p>
                <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
                  Custom web applications • AI-powered solutions • Interactive event technology • Virtual production
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
                <button className="group px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                  <span className="flex items-center justify-center">
                    Explore Our Work
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
                <button className="px-10 py-4 border-2 border-white/20 rounded-full font-medium text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  Start Your Project
                </button>
              </div>
              
              {/* Professional Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {[
                  { number: '500+', label: 'Projects Delivered', accent: 'from-cyan-400 to-blue-500' },
                  { number: '150+', label: 'Happy Clients', accent: 'from-purple-400 to-violet-500' },
                  { number: '10+', label: 'Years Experience', accent: 'from-green-400 to-emerald-500' },
                  { number: '24/7', label: 'Support Available', accent: 'from-orange-400 to-red-500' }
                ].map((stat, index) => (
                  <div key={index} className="group">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent mb-2`}>
                        {stat.number}
                      </div>
                      <div className="text-gray-300 text-sm md:text-base font-light">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Portfolio Preview Section */}
      <section className="min-h-screen flex items-center justify-center px-8 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-7xl w-full text-center pointer-events-auto">
          <div className="relative z-20">
            <div className="absolute -inset-8 bg-gradient-radial from-purple-900/20 via-blue-900/10 to-transparent blur-2xl"></div>
            
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-light mb-8 text-white">
                Experience Our Work
                <span className="block text-2xl md:text-3xl font-light text-purple-300 mt-4">
                  in Interactive 3D Space
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
                Explore our live projects in immersive 3D. These aren't mockups—they're real, 
                functioning applications you can interact with directly.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {[
                  {
                    icon: '🎯',
                    title: 'Interactive Controls',
                    description: 'Click and drag to rotate the 3D scene. Hover over devices to see them respond.'
                  },
                  {
                    icon: '💻',
                    title: 'Live Applications',
                    description: 'Each device displays a real, functioning website you can interact with.'
                  },
                  {
                    icon: '📱',
                    title: 'Responsive Showcase',
                    description: 'See how our applications adapt perfectly across all device types.'
                  }
                ].map((feature, index) => (
                  <div key={index} className="group">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                      <p className="text-gray-300 font-light leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20">
                <h3 className="text-2xl font-semibold text-blue-300 mb-4">🎮 Interactive Guide</h3>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Desktop Controls</h4>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• <strong>Click + Drag:</strong> Rotate the 3D scene</li>
                      <li>• <strong>Scroll:</strong> Zoom in and out</li>
                      <li>• <strong>Hover:</strong> Highlight devices</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Touch Controls</h4>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• <strong>Touch + Drag:</strong> Rotate the scene</li>
                      <li>• <strong>Pinch:</strong> Zoom in and out</li>
                      <li>• <strong>Tap:</strong> Interact with content</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise Section */}
      <section className="min-h-screen flex items-center justify-center px-8 bg-gradient-to-b from-black/20 to-black/40">
        <div className="max-w-7xl w-full pointer-events-auto">
          <div className="relative z-20">
            <div className="absolute -inset-8 bg-gradient-radial from-cyan-900/20 via-blue-900/10 to-transparent blur-2xl"></div>
            
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-light text-center mb-8 text-white">
                Our Expertise
              </h2>
              <p className="text-xl md:text-2xl text-center text-gray-300 mb-16 max-w-4xl mx-auto font-light">
                We don't just build applications—we create digital experiences that transform businesses 
                and captivate audiences across every industry.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Custom Web Development',
                    icon: '🌐',
                    description: 'Enterprise-grade React, Vue, and Angular applications with cutting-edge performance.',
                    features: ['Progressive Web Apps', 'API Development', 'Cloud Integration', 'Microservices'],
                    gradient: 'from-blue-500 to-cyan-400'
                  },
                  {
                    title: 'AI & Machine Learning',
                    icon: '🤖',
                    description: 'Intelligent systems that add real business value through automation and insights.',
                    features: ['Chatbot Development', 'Predictive Analytics', 'Computer Vision', 'NLP Solutions'],
                    gradient: 'from-purple-500 to-pink-400'
                  },
                  {
                    title: 'Event Technology',
                    icon: '🎪',
                    description: 'Immersive event experiences with real-time interaction and seamless integration.',
                    features: ['Interactive Installations', 'Live Streaming', 'Virtual Events', 'Registration Systems'],
                    gradient: 'from-green-500 to-emerald-400'
                  },
                  {
                    title: 'Mobile Applications',
                    icon: '📱',
                    description: 'Native performance with cross-platform efficiency for iOS and Android.',
                    features: ['React Native', 'Flutter Development', 'Native iOS/Android', 'Mobile-First Design'],
                    gradient: 'from-orange-500 to-red-400'
                  },
                  {
                    title: 'WebGL & 3D Experiences',
                    icon: '🎮',
                    description: 'Immersive 3D web experiences that push the boundaries of what\'s possible.',
                    features: ['Three.js Development', 'WebGL Applications', 'VR/AR Integration', 'Interactive Games'],
                    gradient: 'from-violet-500 to-purple-400'
                  },
                  {
                    title: 'Performance & Security',
                    icon: '⚡',
                    description: 'Lightning-fast, secure applications built to scale with your business.',
                    features: ['Performance Optimization', 'Security Audits', 'Load Testing', 'SEO Implementation'],
                    gradient: 'from-teal-500 to-cyan-400'
                  }
                ].map((service, index) => (
                  <div key={index} className="group h-full">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 h-full flex flex-col">
                      <div className="text-4xl mb-6">{service.icon}</div>
                      <h3 className={`text-2xl font-semibold mb-4 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                        {service.title}
                      </h3>
                      <p className="text-gray-300 mb-6 font-light leading-relaxed flex-grow">
                        {service.description}
                      </p>
                      <div className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-400">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-3`}></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="min-h-screen flex items-center justify-center px-8 bg-gradient-to-b from-black/40 to-black/60">
        <div className="max-w-7xl w-full pointer-events-auto">
          <div className="relative z-20">
            <div className="absolute -inset-8 bg-gradient-radial from-indigo-900/20 via-purple-900/10 to-transparent blur-2xl"></div>
            
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-light text-center mb-8 text-white">
                Why Choose Fusion Interactive?
              </h2>
              <p className="text-xl md:text-2xl text-center text-gray-300 mb-16 max-w-4xl mx-auto font-light">
                We combine technical excellence with creative innovation to deliver solutions 
                that don't just meet expectations—they exceed them.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: '🚀',
                    title: 'Innovation First',
                    description: 'We stay ahead of technology trends, implementing cutting-edge solutions that give you a competitive advantage.'
                  },
                  {
                    icon: '🎯',
                    title: 'Results Driven',
                    description: 'Every project is measured by its impact on your business goals, user engagement, and bottom line.'
                  },
                  {
                    icon: '🤝',
                    title: 'True Partnership',
                    description: 'We work as an extension of your team, ensuring transparent communication and collaborative success.'
                  },
                  {
                    icon: '⚡',
                    title: 'Performance Obsessed',
                    description: 'We optimize every aspect of your application for speed, scalability, and exceptional user experience.'
                  },
                  {
                    icon: '🔧',
                    title: 'End-to-End Service',
                    description: 'From concept to launch and beyond, we handle the entire development lifecycle with expertise.'
                  },
                  {
                    icon: '🌟',
                    title: 'Quality Guaranteed',
                    description: 'Rigorous testing, code reviews, and quality assurance ensure your project exceeds industry standards.'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="group">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center">
                      <div className="text-5xl mb-6">{benefit.icon}</div>
                      <h3 className="text-xl font-semibold text-white mb-4">{benefit.title}</h3>
                      <p className="text-gray-300 font-light leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 text-center">
                <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-sm rounded-3xl p-12 border border-blue-500/20">
                  <h3 className="text-3xl font-semibold text-white mb-6">Ready to Transform Your Digital Presence?</h3>
                  <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-light">
                    Let's discuss how we can bring your vision to life with innovative technology 
                    and exceptional craftsmanship.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                      Start Your Project
                    </button>
                    <button className="px-8 py-4 border-2 border-white/20 rounded-full font-medium text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                      View Case Studies
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}