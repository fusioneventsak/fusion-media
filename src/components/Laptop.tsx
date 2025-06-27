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

  // Optimized mouse movement with mobile-friendly touch handling
  const [targetMouse, setTargetMouse] = useState({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });

  // Smooth interpolation animation loop (separate from event handling)
  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      setSmoothMouse(prev => ({
        x: prev.x + (targetMouse.x - prev.x) * 0.04, // Much smoother interpolation
        y: prev.y + (targetMouse.y - prev.y) * 0.04
      }));
      animationId = requestAnimationFrame(animate);
    };

    if (isInView) {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isInView, targetMouse.x, targetMouse.y]);

  // Mouse/touch event handlers - only on screen element
  useEffect(() => {
    if (!screenRef.current || !isInView) return;

    const screenElement = screenRef.current;
    let lastTime = 0;
    
    const updateMousePosition = (clientX: number, clientY: number) => {
      const currentTime = performance.now();
      if (currentTime - lastTime < 32) return; // Throttle to ~30fps for smoother motion
      lastTime = currentTime;
      
      const rect = screenElement.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((clientY - rect.top) / rect.height - 0.5) * 2;
      
      setTargetMouse({ x: x * 0.15, y: y * 0.15 }); // Reduced mouse influence for smoother motion
    };

    // Mouse events (desktop)
    const handleMouseMove = (e: MouseEvent) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      // Smoothly return to center when mouse leaves
      setTargetMouse({ x: 0, y: 0 });
    };

    // Touch events (mobile) - only for the screen interaction
    const handleTouchMove = (e: TouchEvent) => {
      // Don't prevent default to allow scrolling
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        updateMousePosition(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      // Return to center when touch ends
      setTargetMouse({ x: 0, y: 0 });
    };

    // Add events only to the screen element, not document
    screenElement.addEventListener('mousemove', handleMouseMove, { passive: true });
    screenElement.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    screenElement.addEventListener('touchmove', handleTouchMove, { passive: true });
    screenElement.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      screenElement.removeEventListener('mousemove', handleMouseMove);
      screenElement.removeEventListener('mouseleave', handleMouseLeave);
      screenElement.removeEventListener('touchmove', handleTouchMove);
      screenElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isInView]);

  // Handle iframe loading 
  const handleIframeLoad = () => {
    setIsLoaded(true);
    setCanEmbed(true);
  };

  const handleIframeError = () => {
    console.log('Website blocking iframe embedding, showing fallback');
    setCanEmbed(false);
    setIsLoaded(true);
  };

  // Enhanced desktop URL manipulation
  const getDesktopUrl = (originalUrl: string) => {
    try {
      const urlObj = new URL(originalUrl);
      
      // Add common desktop view parameters
      urlObj.searchParams.set('desktop', '1');
      urlObj.searchParams.set('mobile', '0');
      urlObj.searchParams.set('view', 'desktop');
      urlObj.searchParams.set('force_desktop', '1');
      
      // For specific sites that have desktop parameters
      if (urlObj.hostname.includes('youtube.com')) {
        urlObj.searchParams.set('app', 'desktop');
      }
      
      if (urlObj.hostname.includes('facebook.com') || urlObj.hostname.includes('twitter.com')) {
        urlObj.searchParams.set('_fb_noscript', '1');
      }
      
      // For Netlify apps and custom sites
      if (urlObj.hostname.includes('netlify.app') || urlObj.hostname.includes('fusion-events.ca')) {
        urlObj.searchParams.set('viewport', 'desktop');
        urlObj.searchParams.set('width', '1200');
      }
      
      return urlObj.toString();
    } catch {
      return originalUrl;
    }
  };

  // Enhanced iframe post-load processing
  useEffect(() => {
    if (iframeRef.current && isLoaded && canEmbed) {
      const iframe = iframeRef.current;
      
      // Wait for iframe to fully load, then try to force desktop view
      const timer = setTimeout(() => {
        try {
          // Try to access and modify iframe content
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          
          if (iframeDoc) {
            console.log('Modifying iframe content for desktop view');
            
            // Force desktop viewport
            let viewport = iframeDoc.querySelector('meta[name="viewport"]');
            if (viewport) {
              viewport.setAttribute('content', 'width=1200, initial-scale=1.0, user-scalable=yes');
            } else {
              viewport = iframeDoc.createElement('meta');
              viewport.setAttribute('name', 'viewport');
              viewport.setAttribute('content', 'width=1200, initial-scale=1.0, user-scalable=yes');
              if (iframeDoc.head) {
                iframeDoc.head.appendChild(viewport);
              }
            }
            
            // Inject desktop-forcing CSS
            const style = iframeDoc.createElement('style');
            style.textContent = `
              html, body {
                width: 1200px !important;
                min-width: 1200px !important;
                max-width: none !important;
                transform-origin: 0 0 !important;
              }
              
              /* Force desktop layouts */
              @media (max-width: 1199px) {
                html, body {
                  width: 1200px !important;
                  min-width: 1200px !important;
                }
                
                /* Hide mobile navigation if it exists */
                .mobile-nav, .mobile-menu, .hamburger, .nav-toggle {
                  display: none !important;
                }
                
                /* Show desktop navigation */
                .desktop-nav, .desktop-menu {
                  display: block !important;
                }
                
                /* Force desktop grid layouts */
                .container, .wrapper, main, .content {
                  max-width: 1200px !important;
                  width: 100% !important;
                }
              }
              
              /* Disable responsive behavior */
              * {
                max-width: none !important;
              }
              
              /* Force desktop header/navigation */
              header, nav, .header, .navigation {
                width: 100% !important;
                min-width: 1200px !important;
              }
            `;
            
            if (iframeDoc.head) {
              iframeDoc.head.appendChild(style);
            }
            
            // Try to trigger a resize event to force layout recalculation
            if (iframe.contentWindow) {
              iframe.contentWindow.dispatchEvent(new Event('resize'));
            }
            
          }
        } catch (error) {
          console.log('Cross-origin restrictions prevent iframe modification, using alternative method');
          
          // Alternative: Use CSS transform to scale up mobile content
          if (iframe) {
            iframe.style.width = '1200px';
            iframe.style.height = '675px'; // 16:9 ratio
            iframe.style.transform = 'scale(0.75)';
            iframe.style.transformOrigin = '0 0';
          }
        }
      }, 1000); // Wait 1 second for content to load
      
      return () => clearTimeout(timer);
    }
  }, [isLoaded, canEmbed]);

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
      {/* Removed overlay - transparent background for better particle visibility */}
      
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center min-h-[70vh] lg:min-h-[80vh]">
          
          {/* Content Side - Responsive */}
          <motion.div 
            className="space-y-6 lg:space-y-8 lg:pr-2 xl:pr-6 2xl:pr-8 max-w-4xl lg:max-w-none order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            onViewportEnter={() => setIsInView(true)}
          >
            <div>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light ${textColor} mb-4 lg:mb-6 leading-tight`}>
                {title}
              </h2>
              <p className={`text-base sm:text-lg lg:text-xl ${textColor} opacity-70 leading-relaxed font-light mb-6 lg:mb-8`}>
                {description}
              </p>
            </div>

            <div className="space-y-4 lg:space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3 lg:space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <div className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full ${getAccentBgColor()} mt-2 lg:mt-3 flex-shrink-0`}></div>
                  <span className={`text-sm sm:text-base ${textColor} opacity-80 font-medium leading-relaxed`}>{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              className={`inline-flex items-center px-6 lg:px-8 py-3 lg:py-4 ${getAccentBgColor()} text-white rounded-full font-medium hover:opacity-90 transition-all duration-300 shadow-lg text-sm lg:text-base`}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
              onClick={() => window.open(url, '_blank')}
            >
              View Live Site
              <svg className="ml-2 w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Screen Side */}
          <motion.div 
            className="relative lg:pl-2 xl:pl-6 2xl:pl-8 order-1 lg:order-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <div 
              ref={screenRef}
              className="relative w-full mx-auto"
              style={{
                transform: `perspective(1200px) rotateX(${smoothMouse.y * 1}deg) rotateY(${smoothMouse.x * 1.5}deg)`, // Reduced rotation for smoother effect
                transition: 'none',
                maxWidth: '100%',
                willChange: 'transform'
              }}
            >
              {/* Screen Container */}
              <motion.div 
                className="relative"
                animate={{
                  rotateY: [0, 0.2, -0.2, 0],
                  y: [0, -2, 0, 2, 0] // Further reduced floating amplitude
                }}
                transition={{
                  duration: 20, // Even slower floating animation
                  repeat: Infinity,
                  ease: "linear" // Simpler easing for better performance
                }}
                style={{
                  willChange: 'transform'
                }}
              >
                {/* Responsive Screen Frame */}
                <div 
                  className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl border-2 lg:border-4 border-gray-700 overflow-hidden"
                  style={{
                    aspectRatio: '16/9',
                    width: '100%',
                    maxWidth: '1200px',
                    minWidth: '100%',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
                    willChange: 'auto',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)'
                  }}
                >
                  {/* Screen Content Container */}
                  <div className="absolute inset-2 lg:inset-3 bg-black rounded-lg overflow-hidden">
                    {/* Browser Chrome */}
                    <div className="h-8 lg:h-12 bg-gray-800 flex items-center px-3 lg:px-6 border-b border-gray-600 flex-shrink-0">
                      <div className="flex space-x-1 lg:space-x-2">
                        <div className="w-2 h-2 lg:w-4 lg:h-4 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 lg:w-4 lg:h-4 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 lg:w-4 lg:h-4 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="max-w-xs lg:max-w-lg mx-auto bg-gray-700 rounded px-2 lg:px-4 py-1 lg:py-2">
                          <span className="text-xs lg:text-sm text-gray-300 truncate block">{url}</span>
                        </div>
                      </div>
                      <div className="text-xs lg:text-sm text-green-400 flex items-center">
                        <span className="w-1 h-1 lg:w-2 lg:h-2 bg-green-400 rounded-full mr-1 lg:mr-2 animate-pulse"></span>
                        <span className="hidden sm:inline">LIVE</span>
                      </div>
                    </div>
                    
                    {/* Content Area */}
                    <div 
                      className="relative overflow-hidden bg-white"
                      style={{ 
                        height: 'calc(100% - 32px)',
                        width: '100%'
                      }}
                    >
                      {!isLoaded && (
                        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-20">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 lg:h-16 lg:w-16 border-b-2 border-white mx-auto mb-3 lg:mb-6"></div>
                            <div className="text-white text-sm lg:text-lg">Loading website...</div>
                          </div>
                        </div>
                      )}
                      
                      {canEmbed ? (
                        <div 
                          className="w-full h-full relative overflow-hidden"
                          style={{
                            willChange: 'auto',
                            backfaceVisibility: 'hidden'
                          }}
                        >
                          <iframe
                            ref={iframeRef}
                            src={getDesktopUrl(url)}
                            className="absolute inset-0 border-none"
                            title={title}
                            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-presentation"
                            onLoad={handleIframeLoad}
                            onError={handleIframeError}
                            loading="lazy"
                            style={{
                              width: '1400px',
                              height: '787px',
                              transform: 'scale(0.85) translateZ(0)',
                              transformOrigin: '0 0',
                              border: 'none',
                              overflow: 'hidden',
                              willChange: 'auto',
                              backfaceVisibility: 'hidden'
                            }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          />
                        </div>
                      ) : (
                        createFallbackContent()
                      )}
                    </div>
                  </div>

                  {/* Screen Effects */}
                  <div 
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.05) 100%)'
                    }}
                  ></div>
                  
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
              
              {/* Enhanced Effects */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${getAccentFromColor()} to-transparent opacity-30 blur-3xl scale-110 pointer-events-none`}
                style={{
                  willChange: 'auto',
                  backfaceVisibility: 'hidden'
                }}
              ></div>
              
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 pointer-events-none"
                style={{
                  width: '80%',
                  height: '40px',
                  background: 'radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)',
                  filter: 'blur(15px)',
                  willChange: 'auto'
                }}
              ></div>
              
              {/* Interactive hint */}
              <motion.div 
                className="absolute bottom-2 lg:bottom-4 left-1/2 transform -translate-x-1/2 text-center z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ 
                  duration: 1.8, 
                  delay: 3, 
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                style={{
                  willChange: 'opacity, transform'
                }}
              >
                <span className={`text-xs lg:text-sm ${textColor} opacity-60`}>
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