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
  const laptopRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
      if (!laptopRef.current) return;
      
      const rect = laptopRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      
      setMousePosition({ x, y });
    };

    if (isInView) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isInView]);

  // Create website preview content
  const createWebsitePreview = () => {
    if (url.includes('selfieholosphere.com')) {
      return (
        <div className="h-full bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
          {/* Browser chrome */}
          <div className="h-8 bg-gray-800 flex items-center px-3 border-b border-gray-600">
            <div className="flex space-x-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-xs text-gray-300 font-medium">{url}</div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 h-full relative">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">SELFIE HOLOSPHERE</h1>
              <p className="text-purple-300 text-sm">Interactive Photo Experiences</p>
            </div>
            
            {/* Holographic circles */}
            <div className="flex justify-center space-x-4 mb-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-12 h-12 rounded-full border-2 border-purple-400 
                    animate-pulse bg-purple-500/20 ${i === 1 ? 'scale-110' : ''}`}
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: '2s'
                  }}
                />
              ))}
            </div>
            
            {/* Features grid */}
            <div className="grid grid-cols-2 gap-2 text-xs text-white">
              <div className="bg-white/10 rounded p-2">
                <div className="text-purple-300">✨ Real-time processing</div>
              </div>
              <div className="bg-white/10 rounded p-2">
                <div className="text-purple-300">📱 Social integration</div>
              </div>
              <div className="bg-white/10 rounded p-2">
                <div className="text-purple-300">🎪 Event technology</div>
              </div>
              <div className="bg-white/10 rounded p-2">
                <div className="text-purple-300">📊 Analytics</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Generic website preview
    const headerColor = accentColor.includes('purple') ? 'bg-purple-600' :
                       accentColor.includes('cyan') ? 'bg-cyan-600' :
                       accentColor.includes('indigo') ? 'bg-indigo-600' :
                       accentColor.includes('green') ? 'bg-green-600' : 'bg-blue-600';

    return (
      <div className="h-full bg-white relative overflow-hidden">
        {/* Browser chrome */}
        <div className="h-8 bg-gray-100 flex items-center px-3 border-b border-gray-200">
          <div className="flex space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-xs text-gray-600 font-medium">{url}</div>
          </div>
          <div className="text-xs text-green-500 flex items-center">
            <span className="w-1 h-1 bg-green-500 rounded-full mr-1 animate-pulse"></span>
            LIVE
          </div>
        </div>
        
        {/* Header */}
        <div className={`${headerColor} text-white p-4`}>
          <h1 className="text-lg font-bold">{title.substring(0, 30)}</h1>
          <p className="text-sm opacity-90">{description.substring(0, 60)}...</p>
        </div>
        
        {/* Content cards */}
        <div className="p-4 space-y-3">
          {features.slice(0, 3).map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <div className={`w-1.5 h-1.5 rounded-full ${headerColor} mt-1.5 flex-shrink-0`}></div>
                <span className="text-xs text-gray-700 leading-relaxed">
                  {feature.substring(0, 50)}{feature.length > 50 ? '...' : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className={`${headerColor} text-white text-center py-2 rounded-lg text-sm font-medium`}>
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

          {/* 3D CSS Laptop Side */}
          <motion.div 
            className="relative lg:pl-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div 
              ref={laptopRef}
              className="relative w-full max-w-4xl mx-auto"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 10}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              {/* Laptop Container with 3D transforms */}
              <motion.div 
                className="relative"
                animate={{
                  rotateY: [0, 2, -2, 0],
                  rotateX: [0, 1, -1, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Laptop Base */}
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 p-4 md:p-6 lg:p-8">
                  
                  {/* Laptop Screen */}
                  <div 
                    className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-gray-700 shadow-xl mb-4"
                    style={{
                      aspectRatio: '16/10',
                      transform: 'rotateX(-10deg)',
                      transformOrigin: 'bottom'
                    }}
                  >
                    {/* Screen Bezel */}
                    <div className="absolute inset-4 bg-black rounded-lg border border-gray-600 overflow-hidden">
                      {createWebsitePreview()}
                      
                      {/* Screen Reflection */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                    
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
                          className="aspect-square bg-gray-600 rounded-sm border border-gray-500"
                          style={{
                            transform: `translateZ(${Math.random() * 2}px)`,
                            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)'
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    {/* Spacebar */}
                    <div className="mx-auto w-24 h-2 bg-gray-600 rounded border border-gray-500 mb-2 shadow-inner"></div>
                    
                    {/* Trackpad */}
                    <div className="mx-auto w-16 h-10 bg-gray-600 rounded border border-gray-500 shadow-inner"></div>
                  </div>
                  
                  {/* Brand Logo */}
                  <div className="absolute bottom-3 right-4 text-xs text-gray-400 font-mono opacity-60">FUSION</div>
                  
                  {/* Power LED */}
                  <div className="absolute top-3 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                </div>
              </motion.div>
              
              {/* Ambient glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getAccentFromColor()} to-transparent opacity-20 blur-3xl scale-110 pointer-events-none`}></div>
              
              {/* Interactive hint */}
              <motion.div 
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
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