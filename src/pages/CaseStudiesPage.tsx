import React from 'react';
import { motion } from 'framer-motion';

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: "Global Tech Conference - Interactive Event Platform",
      client: "TechWorld 2024",
      category: "Event Technology",
      image: "🎪",
      challenge: "Create an immersive virtual event platform for 50,000+ attendees with real-time networking, interactive booths, and seamless live streaming.",
      solution: "Built a comprehensive platform with 3D virtual environments, AI-powered matchmaking, real-time chat, and integrated CRM for lead capture.",
      results: ["300% increase in attendee engagement", "15,000+ qualified leads captured", "99.8% platform uptime", "4.9/5 attendee satisfaction"],
      technologies: ["React", "WebGL", "WebRTC", "AI/ML", "Real-time Database"]
    },
    {
      title: "E-commerce Revolution - AI-Powered Shopping Platform",
      client: "RetailMax Inc.",
      category: "Web Development",
      image: "🛒",
      challenge: "Transform traditional e-commerce with AI-driven personalization, AR product visualization, and predictive inventory management.",
      solution: "Developed a cutting-edge platform with machine learning recommendations, WebAR try-on features, and intelligent inventory optimization.",
      results: ["250% increase in conversion rates", "40% reduction in cart abandonment", "$2M+ additional revenue in 6 months", "60% faster checkout process"],
      technologies: ["React", "AI/ML", "WebAR", "Node.js", "Predictive Analytics"]
    },
    {
      title: "Interactive Trade Show Experience",
      client: "Manufacturing Expo 2024",
      category: "Event Technology",
      image: "🏭",
      challenge: "Create engaging booth experiences with product configurators, lead capture games, and real-time analytics for 200+ exhibitors.",
      solution: "Built custom interactive kiosks with 3D product visualization, gamified lead capture, and comprehensive analytics dashboard.",
      results: ["500% increase in booth engagement", "80% lead qualification improvement", "200+ exhibitor sign-ups", "Real-time insights dashboard"],
      technologies: ["Three.js", "Touch Interfaces", "CRM Integration", "Analytics", "Gamification"]
    },
    {
      title: "Healthcare Platform - Telemedicine Solution",
      client: "MedConnect Pro",
      category: "Web Application",
      image: "🏥",
      challenge: "Develop HIPAA-compliant telemedicine platform with AI diagnosis assistance, appointment scheduling, and patient management.",
      solution: "Created secure, scalable platform with video consultations, AI-powered symptom analysis, and integrated EHR systems.",
      results: ["10,000+ patients onboarded", "95% consultation completion rate", "HIPAA compliance certified", "50% reduction in no-shows"],
      technologies: ["React", "WebRTC", "AI Diagnosis", "Encryption", "HIPAA Compliance"]
    },
    {
      title: "Smart City Dashboard - IoT Integration",
      client: "City of Innovation",
      category: "Data Visualization",
      image: "🏙️",
      challenge: "Build real-time city management dashboard integrating traffic, utilities, emergency services, and citizen feedback systems.",
      solution: "Developed comprehensive IoT dashboard with predictive analytics, real-time monitoring, and citizen engagement features.",
      results: ["30% improvement in response times", "Real-time monitoring of 1000+ sensors", "Citizen satisfaction up 45%", "Data-driven city planning"],
      technologies: ["IoT Integration", "Real-time Analytics", "Predictive AI", "Data Visualization", "Mobile Apps"]
    },
    {
      title: "Virtual Reality Training Platform",
      client: "SafetyFirst Corp",
      category: "VR/AR Development",
      image: "🥽",
      challenge: "Create immersive VR training modules for hazardous work environments with progress tracking and certification management.",
      solution: "Built comprehensive VR platform with realistic simulations, performance analytics, and automated certification tracking.",
      results: ["90% reduction in training accidents", "70% faster skill acquisition", "Cost savings of $500K annually", "Industry certification achieved"],
      technologies: ["WebXR", "VR Development", "3D Modeling", "Progress Tracking", "Certification Systems"]
    }
  ];

  return (
    <div className="relative z-10 pointer-events-none">
      <section className="min-h-screen px-8 pt-24">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <motion.h1 
            className="text-6xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Case Studies
          </motion.h1>
          <motion.p 
            className="text-xl text-center text-gray-300 mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover how we've transformed businesses across industries with innovative technology solutions 
            that drive engagement, increase conversions, and deliver measurable results.
          </motion.p>

          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <motion.div 
                key={index}
                className="bg-black/30 rounded-2xl p-8 border border-white/10 hover:bg-black/40 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center mb-4">
                      <div className="text-4xl mr-4">{study.image}</div>
                      <div>
                        <div className="text-sm text-cyan-400 font-medium">{study.category}</div>
                        <h2 className="text-2xl font-bold text-white">{study.title}</h2>
                        <div className="text-gray-400">{study.client}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-red-400 mb-2">Challenge</h3>
                        <p className="text-gray-300">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-green-400 mb-2">Solution</h3>
                        <p className="text-gray-300">{study.solution}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-400 mb-4">Key Results</h3>
                      <ul className="space-y-2">
                        {study.results.map((result, idx) => (
                          <li key={idx} className="text-gray-300 text-sm flex items-start">
                            <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-4">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-yellow-400/20 text-yellow-300 rounded-full text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
            <div className="bg-gradient-to-r from-blue-900/60 to-purple-900/60 bg-black/40 rounded-2xl p-8 border border-blue-500/30">
              <h2 className="text-3xl font-bold mb-4 text-blue-300">Ready to Create Your Success Story?</h2>
              <p className="text-gray-300 mb-6 text-lg">
                Join these successful companies and transform your business with our innovative technology solutions.
              </p>
              <motion.button 
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project Today
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}