import React from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  // Much simpler animation variants focused on readability
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4, // Faster container animation
        staggerChildren: 0.05, // Quicker stagger
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 15 // Smaller movement
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3, // Much faster
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.98, // Minimal scale
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3, // Faster
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04, // Even quicker stagger
        delayChildren: 0.05
      }
    }
  };

  return (
    <div className="relative z-10 pointer-events-none">
      <section className="min-h-screen flex items-center justify-center px-8 pt-24">
        <motion.div 
          className="max-w-7xl w-full pointer-events-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-6xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            About Fusion Interactive
          </motion.h1>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold mb-6 text-white">Pioneering Digital Excellence Since 2014</h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Fusion Interactive was born from a simple belief: technology should transform businesses, 
                not complicate them. We've spent over a decade pushing the boundaries of what's possible 
                in web development, event technology, and immersive digital experiences.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Our team of visionary developers, designers, and strategists doesn't just build applications – 
                we craft digital experiences that captivate audiences, drive engagement, and deliver 
                measurable business results.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-blue-900/60 to-purple-900/60 bg-black/40 rounded-2xl p-8 border border-blue-500/30"
              variants={cardVariants}
            >
              <h3 className="text-2xl font-bold mb-6 text-blue-300">Our Mission</h3>
              <p className="text-gray-300 mb-6">
                To empower businesses with cutting-edge technology that transforms their digital presence 
                and creates unforgettable experiences for their audiences.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">500+</div>
                  <div className="text-sm text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">150+</div>
                  <div className="text-sm text-gray-400">Happy Clients</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Team Section */}
          <motion.div 
            className="mb-16"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2 
              className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Meet Our Expert Team
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Arthur Kerekes",
                  role: "Chief Technology Officer",
                  bio: "15+ years in full-stack development. Expert in React, Node.js, and emerging technologies like WebGL and AI integration.",
                  image: "/team/Arthur Kerekes.png"
                },
                {
                  name: "Sarah Rodriguez",
                  role: "Creative Director",
                  bio: "Award-winning designer specializing in immersive user experiences and interactive installations for events.",
                  image: "/team/Sarah Rodriguez.png"
                },
                {
                  name: "Michael Thompson",
                  role: "Event Technology Lead",
                  bio: "Pioneer in event tech solutions. Has designed interactive experiences for Fortune 500 companies and major events.",
                  image: "/team/Michael Thompson.png"
                }
              ].map((member, index) => (
                <motion.div 
                  key={index}
                  className="bg-black/30 rounded-xl p-6 border border-white/10 hover:bg-black/40 transition-all duration-200 text-center"
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.02,
                    y: -3,
                    transition: { duration: 0.15 }
                  }}
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-purple-700 p-1">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{member.name}</h3>
                  <div className="text-cyan-400 font-medium mb-4">{member.role}</div>
                  <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div 
            className="mb-16"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2 
              className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Our Core Values
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🚀",
                  title: "Innovation First",
                  description: "We constantly explore new technologies and methodologies to stay ahead of the curve."
                },
                {
                  icon: "🎯",
                  title: "Results Driven",
                  description: "Every project is measured by its impact on your business goals and user engagement."
                },
                {
                  icon: "🤝",
                  title: "Client Partnership",
                  description: "We work as an extension of your team, ensuring clear communication and collaboration."
                },
                {
                  icon: "⚡",
                  title: "Performance Obsessed",
                  description: "We optimize every aspect of your application for speed, scalability, and user experience."
                }
              ].map((value, index) => (
                <motion.div 
                  key={index}
                  className="bg-black/30 rounded-lg p-6 border border-white/10 text-center"
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.02,
                    y: -2,
                    transition: { duration: 0.15 }
                  }}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-lg font-semibold mb-3 text-white">{value.title}</h3>
                  <p className="text-gray-300 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technology Stack */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2 
              className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Our Technology Stack
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  category: "Frontend",
                  technologies: ["React", "Vue.js", "Three.js", "WebGL", "TypeScript", "Tailwind CSS"]
                },
                {
                  category: "Backend",
                  technologies: ["Node.js", "Python", "PHP", "GraphQL", "REST APIs", "Microservices"]
                },
                {
                  category: "AI & ML",
                  technologies: ["TensorFlow", "OpenAI GPT", "Computer Vision", "NLP", "Chatbots", "Automation"]
                },
                {
                  category: "Event Tech",
                  technologies: ["Live Streaming", "AR/VR", "QR Systems", "CRM Integration", "Analytics", "Gamification"]
                }
              ].map((stack, index) => (
                <motion.div 
                  key={index}
                  className="bg-black/30 rounded-lg p-6 border border-white/10"
                  variants={cardVariants}
                >
                  <h3 className="text-lg font-semibold mb-4 text-yellow-400">{stack.category}</h3>
                  <ul className="space-y-2">
                    {stack.technologies.map((tech, idx) => (
                      <motion.li 
                        key={idx} 
                        className="text-gray-300 text-sm flex items-center"
                        initial={{ opacity: 0, x: -5 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.2, 
                          delay: idx * 0.03,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      >
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                        {tech}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}