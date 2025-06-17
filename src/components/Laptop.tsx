import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FullWidthLaptopShowcaseProps {
  url: string;
  title: string;
  description: string;
  features: string[];
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export default function FullWidthLaptopShowcase({
  url,
  title,
  description,
  features,
  backgroundColor = 'bg-white',
  textColor = 'text-gray-900',
  accentColor = 'text-blue-600'
}: FullWidthLaptopShowcaseProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const getAccentBgColor = () => {
    return accentColor.replace('text-', 'bg-');
  };

  return (
    <section className={`min-h-screen ${backgroundColor} relative overflow-hidden pointer-events-auto`}>
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          
          {/* Content Side */}
          <motion.div 
            className="space-y-8 lg:pr-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            onViewportEnter={() => setIsInView(true)}
          >
            <div>
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-light ${textColor} mb-6 leading-tight`}>
                {title}
              </h2>
              <p className={`text-lg md:text-xl ${textColor} opacity-70 leading-relaxed font-light mb-8`}>
                {description}
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={`w-2 h-2 rounded-full ${getAccentBgColor()} mt-3 flex-shrink-0`}></div>
                  <span className={`${textColor} opacity-80 font-medium leading-relaxed`}>{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              className={`inline-flex items-center px-8 py-4 ${getAccentBgColor()} text-white rounded-full font-medium hover:opacity-90 transition-all duration-300 shadow-lg`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Live Site
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Laptop Showcase Side */}
          <motion.div 
            className="relative lg:pl-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative" style={{ perspective: '1000px' }}>
              <motion.div
                className="transform transition-all duration-1000"
                animate={isInView ? {
                  rotateY: [0, 8, -8, 0],
                  rotateX: [0, 2, -2, 0]
                } : {}}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Large Interactive Laptop */}
                <div className="relative w-full max-w-5xl mx-auto">
                  {/* Laptop Base */}
                  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 p-6 md:p-8 lg:p-12">
                    
                    {/* Laptop Screen */}
                    <div 
                      className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border-4 border-gray-700 shadow-xl mb-6"
                      style={{
                        aspectRatio: '16/10',
                        transform: 'rotateX(-8deg)',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {/* Screen Bezel */}
                      <div className="absolute inset-6 bg-black rounded-xl border border-gray-600 overflow-hidden">
                        
                        {/* Browser Chrome */}
                        <div className="h-12 bg-gray-800 flex items-center px-6 border-b border-gray-600 relative z-10">
                          <div className="flex space-x-3">
                            <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm"></div>
                            <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-sm"></div>
                            <div className="w-4 h-4 rounded-full bg-green-500 shadow-sm"></div>
                          </div>
                          <div className="flex-1 text-center">
                            <div className="text-sm text-gray-300 font-medium truncate px-4">{title}</div>
                          </div>
                          <div className="text-xs text-green-400 flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                            LIVE
                          </div>
                        </div>
                        
                        {/* Website Content - Large and Interactive */}
                        <div className="relative overflow-hidden" style={{ height: 'calc(100% - 48px)' }}>
                          {!isLoaded && (
                            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
                              <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                                <div className="text-sm text-gray-400">Loading {title}...</div>
                              </div>
                            </div>
                          )}
                          
                          <iframe
                            src={url}
                            className="w-full h-full border-none bg-white"
                            title={title}
                            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-pointer-lock"
                            onLoad={() => setIsLoaded(true)}
                            style={{
                              pointerEvents: 'auto',
                              userSelect: 'auto',
                              minHeight: '400px'
                            }}
                          />
                        </div>
                      </div>
                      
                      {/* Screen Reflection Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl opacity-40 pointer-events-none"></div>
                      
                      {/* Camera */}
                      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full border border-gray-600 shadow-inner">
                        <div className="w-2 h-2 bg-gray-700 rounded-full absolute top-1 left-1"></div>
                      </div>
                    </div>
                    
                    {/* Keyboard Area */}
                    <div className="bg-gray-700 rounded-xl shadow-inner p-6">
                      {/* Keyboard Keys */}
                      <div className="grid grid-cols-14 gap-1 mb-4">
                        {Array.from({ length: 56 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="aspect-square bg-gray-600 rounded border border-gray-500 shadow-sm hover:bg-gray-500 transition-colors"
                            style={{ minWidth: '8px', minHeight: '8px' }}
                          ></div>
                        ))}
                      </div>
                      
                      {/* Spacebar */}
                      <div className="mx-auto w-48 h-5 bg-gray-600 rounded border border-gray-500 shadow-sm mb-4"></div>
                      
                      {/* Trackpad */}
                      <div className="mx-auto w-32 h-20 bg-gray-600 rounded-lg border border-gray-500 shadow-inner"></div>
                    </div>
                    
                    {/* Brand Logo */}
                    <div className="absolute bottom-6 right-8 text-sm text-gray-400 font-mono opacity-60">FUSION</div>
                    
                    {/* Power LED */}
                    <div className="absolute top-6 right-8 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    
                    {/* Laptop Shadow */}
                    <div className="absolute -bottom-6 left-6 right-6 h-12 bg-black/30 rounded-full blur-2xl"></div>
                  </div>

                  {/* Additional 3D depth shadow */}
                  <div className="absolute inset-0 bg-black/20 rounded-3xl transform translate-x-4 translate-y-4 -z-10 blur-sm"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}