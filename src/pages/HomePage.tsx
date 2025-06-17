import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Monitor, Smartphone, Globe, Zap, Star, AlertCircle } from 'lucide-react';

export default function HomePage() {
  const [activeProject, setActiveProject] = useState(0);
  const [iframeErrors, setIframeErrors] = useState<{[key: string]: boolean}>({});

  const projects = [
    {
      id: 'selfie-holosphere',
      title: "Selfie Holosphere",
      description: "Interactive 3D photo collage experience with real-time processing and immersive visualization",
      url: "https://selfieholosphere.com/collage/1lr9qn",
      category: "Interactive Experience",
      tech: ["WebGL", "Real-time Processing", "3D Animation", "Computer Vision"],
      color: "from-cyan-500 to-blue-600",
      icon: "📸",
      featured: true,
      embedSafe: true
    },
    {
      id: 'u-request-songs',
      title: "Song Request App - uRequest Live",
      description: "Interactive DJ platform with crowd engagement, real-time voting, and live music streaming",
      url: "http://urequestsongs.com",
      category: "Entertainment Platform",
      tech: ["React", "WebSockets", "Audio Processing", "Real-time Voting"],
      color: "from-purple-500 to-pink-600",
      icon: "🎵",
      featured: true,
      embedSafe: false // This site blocks iframe embedding
    },
    {
      id: 'fusion-events',
      title: "Fusion Events Website",
      description: "Professional event services platform with integrated booking, portfolio showcase, and client management",
      url: "https://www.fusion-events.ca",
      category: "Business Platform",
      tech: ["Next.js", "CRM Integration", "Performance Optimization", "SEO"],
      color: "from-emerald-500 to-teal-600",
      icon: "🎪",
      featured: true,
      embedSafe: true
    },
    {
      id: 'game-show',
      title: "Interactive Game Show Platform",
      description: "Engaging game show application with real-time scoring, audience participation, and interactive elements",
      url: "https://splendid-cannoli-324007.netlify.app/",
      category: "Entertainment Platform",
      tech: ["React", "Real-time Updates", "Interactive UI", "Game Logic"],
      color: "from-orange-500 to-red-600",
      icon: "🎮",
      featured: false,
      embedSafe: true
    },
    {
      id: 'crm-platform',
      title: "CRM Management System",
      description: "Comprehensive customer relationship management platform with advanced analytics and automation",
      url: "https://capable-alfajores-d0dff2.netlify.app/",
      category: "Business Solution",
      tech: ["React", "Data Analytics", "CRM Integration", "Automation"],
      color: "from-indigo-500 to-purple-600",
      icon: "📊",
      featured: false,
      embedSafe: true
    },
    {
      id: 'music-studio',
      title: "Music Studio Application",
      description: "Professional music studio management app with booking, project tracking, and client communication",
      url: "https://lucky-centaur-ce715c.netlify.app/",
      category: "Creative Platform",
      tech: ["React", "Audio Processing", "Project Management", "Client Portal"],
      color: "from-rose-500 to-pink-600",
      icon: "🎼",
      featured: false,
      embedSafe: true
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const allProjects = projects;

  const handleIframeError = (projectId: string) => {
    setIframeErrors(prev => ({ ...prev, [projectId]: true }));
  };

  const IframeEmbed = ({ project, isFeatured = false }: { 
    project: typeof projects[0], 
    isFeatured?: boolean
  }) => {
    const hasError = iframeErrors[project.id];
    
    // 16:9 aspect ratio classes
    const aspectRatioClass = isFeatured ? "aspect-video" : "aspect-video";
    
    if (!project.embedSafe || hasError) {
      return (
        <div className={`${aspectRatioClass} bg-gradient-to-br ${project.color} rounded-xl flex flex-col items-center justify-center text-white p-6`}>
          <AlertCircle className="w-12 h-12 mb-4 opacity-80" />
          <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
          <p className="text-sm opacity-90 text-center mb-4">
            {!project.embedSafe 
              ? "This site doesn't allow embedding for security reasons" 
              : "Unable to load preview"}
          </p>
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Visit Live Site
          </a>
        </div>
      );
    }

    return (
      <div className={`relative overflow-hidden rounded-xl bg-white ${aspectRatioClass}`}>
        <iframe
          src={project.url}
          className="absolute inset-0 w-full h-full border-0"
          title={project.title}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
          loading="lazy"
          onError={() => handleIframeError(project.id)}
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/5 to-transparent"></div>
      </div>
    );
  };

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
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-5 h-5" />
              View Our Portfolio
            </motion.button>
            <motion.button 
              className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold hover:bg-white/10 transition-colors duration-200 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="w-5 h-5" />
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

      {/* Featured Portfolio Section */}
      <section className="min-h-screen flex items-center justify-center px-8 py-20">
        <div className="max-w-7xl w-full pointer-events-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
              Live Portfolio Showcase
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Experience our work firsthand. These are live, fully functional applications you can interact with right here. 
              No mockups, no screenshots – just real applications in action.
            </p>
          </motion.div>

          {/* Featured Project Spotlight */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">{featuredProjects[activeProject].icon}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-yellow-400 font-medium">Featured Project</span>
                      </div>
                      <h3 className="text-3xl font-bold text-white">{featuredProjects[activeProject].title}</h3>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${featuredProjects[activeProject].color} text-white`}>
                      {featuredProjects[activeProject].category}
                    </span>
                  </div>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {featuredProjects[activeProject].description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredProjects[activeProject].tech.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-sm border border-white/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 mb-6">
                    {featuredProjects.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveProject(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          idx === activeProject 
                            ? 'bg-white scale-125' 
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                  <a 
                    href={featuredProjects[activeProject].url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Full Application
                  </a>
                </div>
                <div className="relative">
                  <div className="bg-black/40 rounded-2xl p-4 border border-white/20 shadow-2xl">
                    <div className="flex items-center gap-2 mb-3 px-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex-1 bg-white/10 rounded-lg px-3 py-1 text-sm text-gray-400 flex items-center gap-2">
                        <Globe className="w-3 h-3" />
                        {featuredProjects[activeProject].url}
                      </div>
                      <a 
                        href={featuredProjects[activeProject].url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </a>
                    </div>
                    <IframeEmbed project={featuredProjects[activeProject]} isFeatured={true} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* All Projects Grid */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-center mb-12 text-white">Complete Portfolio</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProjects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Project Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{project.icon}</div>
                      <div>
                        <h4 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {project.title}
                        </h4>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${project.color} text-white`}>
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-white/10 text-gray-400 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-0.5 bg-white/10 text-gray-400 rounded text-xs">
                          +{project.tech.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Embedded Application */}
                  <div className="px-6 pb-6">
                    <div className="bg-black/40 rounded-xl p-3 border border-white/20">
                      <div className="flex items-center gap-2 mb-2 px-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-1 bg-white/10 rounded px-2 py-0.5 text-xs text-gray-400 flex items-center gap-1">
                          <Globe className="w-2 h-2" />
                          {project.embedSafe ? 'Live Preview' : 'External Link'}
                        </div>
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-0.5 hover:bg-white/10 rounded transition-colors"
                        >
                          <ExternalLink className="w-3 h-3 text-gray-400" />
                        </a>
                      </div>
                      <IframeEmbed project={project} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Features */}
          <motion.div 
            className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-blue-300 text-center">🎯 Interactive Portfolio Features</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <Monitor className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-cyan-400 font-semibold mb-2">Live Applications</div>
                <p className="text-gray-400">Every project is a real, functioning application you can interact with directly in your browser.</p>
              </div>
              <div className="text-center">
                <Smartphone className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-purple-400 font-semibold mb-2">16:9 Desktop View</div>
                <p className="text-gray-400">All embeds are optimized for desktop viewing with proper aspect ratios for the best experience.</p>
              </div>
              <div className="text-center">
                <ExternalLink className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <div className="text-pink-400 font-semibold mb-2">Full Experience</div>
                <p className="text-gray-400">Click the external link icon to open any application in a new tab for the complete experience.</p>
              </div>
            </div>
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
    </div>
  );
}