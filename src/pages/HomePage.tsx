import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Scene from '../components/Scene';
import FullWidthLaptopShowcase from '../components/Laptop';

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section with 3D Background */}
      <section className="relative min-h-screen flex items-center justify-center px-8 pt-20 bg-gradient-to-br from-gray-900 via-black to-blue-900">
        {/* 3D Canvas Background - Only for Hero */}
        <div className="absolute inset-0 z-0">
          <Canvas 
            camera={{ position: [0, 1, 8], fov: 75 }}
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: "high-performance"
            }}
            style={{ background: 'transparent' }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <Scene scrollY={0} currentPage="home" />
            </Suspense>
          </Canvas>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium text-white">AI-Assisted Digital Agency</span>
            </div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 text-white leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            We use the{' '}
            <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              best tools
            </span>
            <br />
            of our time
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            What once took months to produce—high-end websites with animations, 
            multiple pages, and complex functionality—we now deliver in weeks. 
            AI-powered productivity meets 25+ years of expertise in events, 
            entertainment, and technology.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button 
              className="px-10 py-4 bg-white text-gray-900 rounded-full font-medium text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See Our Work
            </motion.button>
            <motion.button 
              className="px-10 py-4 border border-white/30 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Project
            </motion.button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {[
              { number: '10x', label: 'Faster Delivery', description: 'AI-powered development' },
              { number: '25+', label: 'Years Experience', description: 'Events & entertainment' },
              { number: '500+', label: 'Projects Delivered', description: 'Across all industries' },
              { number: '98%', label: 'Client Satisfaction', description: 'Proven track record' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl md:text-4xl font-light text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300 font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Test Section - Simple colored section to verify rendering */}
      <section className="min-h-screen bg-red-500 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Test Section 1</h2>
          <p className="text-xl">If you can see this red section, basic rendering is working</p>
        </div>
      </section>

      {/* Test Section 2 */}
      <section className="min-h-screen bg-blue-500 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Test Section 2</h2>
          <p className="text-xl">If you can see this blue section, scrolling is working</p>
        </div>
      </section>

      {/* Test Section 3 */}
      <section className="min-h-screen bg-green-500 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Test Section 3</h2>
          <p className="text-xl">If you can see this green section, multiple sections work</p>
        </div>
      </section>

      {/* Simple Laptop Showcase Test */}
      <section className="min-h-screen bg-purple-100 flex items-center justify-center px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Simple Laptop Test</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="bg-white rounded aspect-video flex items-center justify-center">
                <p className="text-gray-600">Laptop Screen Placeholder</p>
              </div>
            </div>
            <p className="text-gray-600">Testing basic laptop showcase structure</p>
          </div>
        </div>
      </section>

      {/* Footer Test */}
      <section className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Footer Section</h2>
          <p className="text-xl">This should be the last section you see</p>
        </div>
      </section>
    </div>
  );
}