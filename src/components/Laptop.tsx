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
    if (accentColor.includes('purple')) return 'bg-purple-600';
    if (accentColor.includes('blue')) return 'bg-blue-600';
    if (accentColor.includes('cyan')) return 'bg-cyan-600';
    if (accentColor.includes('indigo')) return 'bg-indigo-600';
    if (accentColor.includes('green')) return 'bg-green-600';
    return 'bg-blue-600';
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Transparent background with subtle backdrop blur for readability */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
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
              onClick={() => window.open(url, '_blank')}
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
            <div className="relative">
              <motion.div
                className="transform transition-all duration-1000"
                animate={isInView ? {
                  rotateY: [0, 3, -3, 0],
                  rotateX: [0, 1, -1, 0]
                } : {}}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Laptop Container */}
                <div className="relative w-full max-w-4xl mx-auto">
                  {/* Laptop Base */}
                  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 p-4 md:p-6 lg:p-8">
                    
                    {/* Laptop Screen */}
                    <div 
                      className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-gray-700 shadow-xl mb-4"
                      style={{
                        aspectRatio: '16/10'
                      }}
                    >
                      {/* Screen Bezel */}
                      <div className="absolute inset-4 bg-black rounded-lg border border-gray-600 overflow-hidden">
                        
                        {/* Browser Chrome */}
                        <div className="h-8 bg-gray-800 flex items-center px-4 border-b border-gray-600 relative z-10">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="flex-1 text-center">
                            <div className="text-xs text-gray-300 font-medium truncate px-4">{title}</div>
                          </div>
                          <div className="text-xs text-green-400 flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                            LIVE
                          </div>
                        </div>
                        
                        {/* Website Content */}
                        <div className="relative overflow-hidden bg-white" style={{ height: 'calc(100% - 32px)' }}>
                          {!isLoaded && (
                            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                              <div className="text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                                <div className="text-xs text-gray-600">Loading...</div>
                              </div>
                            </div>
                          )}
                          
                          <iframe
                            src={url}
                            className="w-full h-full border-none"
                            title={title}
                            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                            onLoad={() => setIsLoaded(true)}
                            loading="lazy"
                          />
                        </div>
                      </div>
                      
                      {/* Screen Reflection */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-xl pointer-events-none"></div>
                      
                      {/* Camera */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rounded-full border border-gray-600">
                        <div className="w-1 h-1 bg-gray-700 rounded-full absolute top-0.5 left-0.5"></div>
                      </div>
                    </div>
                    
                    {/* Keyboard Area */}
                    <div className="bg-gray-700 rounded-lg shadow-inner p-3">
                      {/* Simplified Keyboard */}
                      <div className="grid grid-cols-12 gap-0.5 mb-2">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="aspect-square bg-gray-600 rounded-sm border border-gray-500 text-xs"
                          ></div>
                        ))}
                      </div>
                      
                      {/* Spacebar */}
                      <div className="mx-auto w-24 h-2 bg-gray-600 rounded border border-gray-500 mb-2"></div>
                      
                      {/* Trackpad */}
                      <div className="mx-auto w-16 h-10 bg-gray-600 rounded border border-gray-500"></div>
                    </div>
                    
                    {/* Brand Logo */}
                    <div className="absolute bottom-3 right-4 text-xs text-gray-400 font-mono opacity-60">FUSION</div>
                    
                    {/* Power LED */}
                    <div className="absolute top-3 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}