import React, { useRef, useEffect, useState } from 'react';
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
  const screenRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [canEmbed, setCanEmbed] = useState(true);

  const getAccentBgColor = () => {
    if (accentColor.includes('purple')) return 'bg-purple-600';
    if (accentColor.includes('blue')) return 'bg-blue-600';
    if (accentColor.includes('cyan')) return 'bg-cyan-600';
    if (accentColor.includes('indigo')) return 'bg-indigo-600';
    if (accentColor.includes('green')) return 'bg-green-600';
    return 'bg-blue-600';
  };

  const getAccentFromColor = () => {
    if (accentColor.includes('purple')) return 'from-purple-500';
    if (accentColor.includes('blue')) return 'from-blue-500';
    if (accentColor.includes('cyan')) return 'from-cyan-500';
    if (accentColor.includes('indigo')) return 'from-indigo-500';
    if (accentColor.includes('green')) return 'from-green-500';
    return 'from-blue-500';
  };

  // Handle mouse movement for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!screenRef.current) return;
      
      const rect = screenRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      
      setMousePosition({ x: x * 0.5, y: y * 0.5 }); // Reduced sensitivity
    };

    if (isInView) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isInView]);

  // Handle iframe loading and errors
  const handleIframeLoad = () => {
    setIsLoaded(true);
    setCanEmbed(true);
  };

  const handleIframeError = () => {
    console.log('Website blocking iframe embedding, showing fallback');
    setCanEmbed(false);
    setIsLoaded(true);
  };

  // Create fallback content for sites that block embedding
  const createFallbackContent = () => {
    if (url.includes('selfieholosphere.com')) {
      return (
        <div className="h-full bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
          {/* Animated background particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          {/* Content */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-center">
            <div className="text-center mb-8">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-white mb-4"
                animate={{ 
                  textShadow: ['0 0 20px rgba(124, 58, 237, 0.5)', '0 0 30px rgba(124, 58, 237, 0.8)', '0 0 20px rgba(124, 58, 237, 0.5)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                SELFIE HOLOSPHERE
              </motion.h1>
              <p className="text-purple-300 text-xl">Interactive Photo Experiences</p>
            </div>
            
            {/* Holographic display */}
            <div className="flex justify-center space-x-8 mb-8">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="relative"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                >
                  <div className={`w-16 h-16 rounded-full border-2 border-purple-400 bg-purple-500/20`} />
                  <div className={`absolute inset-2 rounded-full border border-purple-300 bg-purple-400/10`} />
                </motion.div>
              ))}
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
              {[
                { icon: '✨', text: 'Real-time Processing' },
                { icon: '📱', text: 'Social Integration' },
                { icon: '🎪', text: 'Event Technology' },
                { icon: '📊', text: 'Analytics & Insights' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="text-sm">{feature.text}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Generic fallback for other sites
    const headerColor = accentColor.includes('purple') ? 'from-purple-600 to-purple-800' :
                       accentColor.includes('cyan') ? 'from-cyan-600 to-cyan-800' :
                       accentColor.includes('indigo') ? 'from-indigo-600 to-indigo-800' :
                       accentColor.includes('green') ? 'from-green-600 to-green-800' : 'from-blue-600 to-blue-800';

    return (
      <div className="h-full bg-white relative overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${headerColor} text-white p-8 text-center`}>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-4xl mx-auto">{description}</p>
        </div>
        
        {/* Features showcase */}
        <div className="p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-lg"
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getAccentBgColor()} mt-2 flex-shrink-0`}></div>
                    <p className="text-gray-700 leading-relaxed">{feature}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className={`bg-gradient-to-r ${headerColor} text-white p-8 text-center`}>
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <div className={`inline-block px-8 py-3 bg-white text-gray-800 rounded-full font-medium hover:bg-gray-100 transition-colors cursor-pointer`}>
            View Live Site
          </div>
        </div>
      </div>
    );
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

          {/* Floating Screen Side */}
          <motion.div 
            className="relative lg:pl-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div 
              ref={screenRef}
              className="relative w-full max-w-4xl mx-auto"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 5}deg)`,
                transition: 'transform 0.2s ease-out'
              }}
            >
              {/* Floating Screen Container */}
              <motion.div 
                className="relative"
                animate={{
                  rotateY: [0, 1, -1, 0],
                  y: [0, -10, 0, 10, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Screen Frame */}
                <div 
                  className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border-4 border-gray-700 overflow-hidden"
                  style={{
                    aspectRatio: '16/9',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)'
                  }}
                >
                  {/* Screen Content */}
                  <div className="absolute inset-3 bg-black rounded-lg overflow-hidden">
                    {/* Browser Chrome */}
                    <div className="h-10 bg-gray-800 flex items-center px-4 border-b border-gray-600">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="max-w-md mx-auto bg-gray-700 rounded px-3 py-1">
                          <span className="text-xs text-gray-300">{url}</span>
                        </div>
                      </div>
                      <div className="text-xs text-green-400 flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                        LIVE
                      </div>
                    </div>
                    
                    {/* Website Content Area */}
                    <div className="relative" style={{ height: 'calc(100% - 40px)' }}>
                      {!isLoaded && (
                        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-20">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                            <div className="text-white">Loading website...</div>
                          </div>
                        </div>
                      )}
                      
                      {canEmbed ? (
                        <iframe
                          ref={iframeRef}
                          src={url}
                          className="w-full h-full border-none"
                          title={title}
                          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation"
                          onLoad={handleIframeLoad}
                          onError={handleIframeError}
                          loading="lazy"
                        />
                      ) : (
                        createFallbackContent()
                      )}
                    </div>
                  </div>
                  
                  {/* Screen Reflection */}
                  <div 
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.05) 100%)'
                    }}
                  ></div>
                  
                  {/* Screen Glow */}
                  <div 
                    className="absolute -inset-1 pointer-events-none rounded-2xl"
                    style={{
                      background: `linear-gradient(45deg, ${getAccentFromColor().replace('from-', '')} 0%, transparent 50%, transparent 100%)`,
                      opacity: 0.2,
                      filter: 'blur(20px)'
                    }}
                  ></div>
                </div>
              </motion.div>
              
              {/* Enhanced Ambient glow effect */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${getAccentFromColor()} to-transparent opacity-30 blur-3xl scale-110 pointer-events-none`}
              ></div>
              
              {/* Floor Shadow */}
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8"
                style={{
                  width: '80%',
                  height: '40px',
                  background: 'radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)',
                  filter: 'blur(15px)'
                }}
              ></div>
              
              {/* Interactive hint */}
              <motion.div 
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <span className={`text-sm ${textColor} opacity-60`}>
                  Move your mouse to interact ✨
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}