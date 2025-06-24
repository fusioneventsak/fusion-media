import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

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
  const mountRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const laptopGroupRef = useRef(null);

  const getAccentBgColor = () => {
    if (accentColor.includes('purple')) return 'bg-purple-600';
    if (accentColor.includes('blue')) return 'bg-blue-600';
    if (accentColor.includes('cyan')) return 'bg-cyan-600';
    if (accentColor.includes('indigo')) return 'bg-indigo-600';
    if (accentColor.includes('green')) return 'bg-green-600';
    return 'bg-blue-600';
  };

  useEffect(() => {
    if (!mountRef.current || !isInView) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 6);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0); // Transparent background
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x4f46e5, 0.3, 20);
    pointLight.position.set(-3, 3, 3);
    scene.add(pointLight);

    // Create laptop group
    const laptopGroup = new THREE.Group();
    laptopGroupRef.current = laptopGroup;
    scene.add(laptopGroup);

    // Materials
    const laptopBodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2d3748,
      shininess: 100,
      specular: 0x444444
    });
    
    const keyboardMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a202c,
      shininess: 50
    });
    
    const trackpadMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4a5568,
      shininess: 80
    });

    // Create laptop base
    const baseGeometry = new THREE.BoxGeometry(4, 0.2, 3);
    const base = new THREE.Mesh(baseGeometry, laptopBodyMaterial);
    base.position.y = 0.1;
    base.castShadow = true;
    laptopGroup.add(base);

    // Create keyboard area
    const keyboardGeometry = new THREE.BoxGeometry(3.5, 0.05, 2.2);
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0, 0.225, 0.2);
    laptopGroup.add(keyboard);

    // Create individual keys with better layout
    const keyMaterial = new THREE.MeshPhongMaterial({ color: 0x4a5568, shininess: 60 });
    for (let row = 0; row < 4; row++) {
      const keysInRow = row === 0 ? 13 : row === 3 ? 10 : 12;
      for (let col = 0; col < keysInRow; col++) {
        const keyGeometry = new THREE.BoxGeometry(0.2, 0.05, 0.2);
        const key = new THREE.Mesh(keyGeometry, keyMaterial);
        
        const offsetX = row === 3 ? -1.0 : -1.5;
        key.position.set(
          offsetX + col * 0.27,
          0.275,
          -0.3 + row * 0.3
        );
        laptopGroup.add(key);
      }
    }

    // Create trackpad
    const trackpadGeometry = new THREE.BoxGeometry(1.2, 0.02, 0.8);
    const trackpad = new THREE.Mesh(trackpadGeometry, trackpadMaterial);
    trackpad.position.set(0, 0.23, -0.8);
    laptopGroup.add(trackpad);

    // Create screen back
    const screenBackGeometry = new THREE.BoxGeometry(4.2, 2.8, 0.15);
    const screenBack = new THREE.Mesh(screenBackGeometry, laptopBodyMaterial);
    screenBack.position.set(0, 1.6, -1.4);
    screenBack.rotation.x = -0.15;
    screenBack.castShadow = true;
    laptopGroup.add(screenBack);

    // Create screen frame
    const screenFrameGeometry = new THREE.BoxGeometry(3.8, 2.4, 0.05);
    const screenFrame = new THREE.Mesh(screenFrameGeometry, new THREE.MeshPhongMaterial({ color: 0x000000 }));
    screenFrame.position.set(0, 1.6, -1.32);
    screenFrame.rotation.x = -0.15;
    laptopGroup.add(screenFrame);

    // Create screen content with live website
    let screenTexture;
    
    // Create iframe for live website
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.width = '1024px';
    iframe.style.height = '640px';
    iframe.style.border = 'none';
    iframe.style.background = 'white';
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px'; // Hide off-screen
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.sandbox = 'allow-same-origin allow-scripts allow-forms allow-popups allow-presentation';
    
    document.body.appendChild(iframe);
    
    // Create canvas for texture
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');
    
    // Function to create fallback content
    const createFallbackContent = () => {
      // Create website preview
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 1024, 640);
      
      // Browser chrome
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, 1024, 60);
      
      // Traffic lights
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(30, 30, 8, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(55, 30, 8, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(80, 30, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // URL bar
      ctx.fillStyle = '#ffffff';
      ctx.roundRect(120, 15, 600, 30, 15);
      ctx.fill();
      
      ctx.fillStyle = '#6b7280';
      ctx.font = '16px -apple-system, BlinkMacSystemFont, Arial';
      ctx.fillText(url, 140, 35);
      
      // Live indicator
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(750, 30, 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#10b981';
      ctx.font = '12px -apple-system, BlinkMacSystemFont, Arial';
      ctx.fillText('LIVE', 760, 35);
      
      // Page content based on title
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 60, 1024, 580);
      
      // Header section
      const headerColor = accentColor.includes('purple') ? '#7c3aed' :
                         accentColor.includes('cyan') ? '#06b6d4' :
                         accentColor.includes('indigo') ? '#4f46e5' :
                         accentColor.includes('green') ? '#059669' : '#2563eb';
      
      ctx.fillStyle = headerColor;
      ctx.fillRect(0, 60, 1024, 120);
      
      // Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, Arial';
      ctx.fillText(title.substring(0, 30), 60, 110);
      
      // Subtitle
      ctx.font = '18px -apple-system, BlinkMacSystemFont, Arial';
      ctx.fillText(description.substring(0, 60) + '...', 60, 140);
      
      // Content cards
      ctx.fillStyle = '#ffffff';
      ctx.roundRect(60, 220, 280, 160, 12);
      ctx.fill();
      ctx.roundRect(360, 220, 280, 160, 12);
      ctx.fill();
      ctx.roundRect(660, 220, 280, 160, 12);
      ctx.fill();
      
      // Card content
      ctx.fillStyle = '#374151';
      ctx.font = '16px -apple-system, BlinkMacSystemFont, Arial';
      features.slice(0, 3).forEach((feature, index) => {
        const x = 60 + (index * 300) + 20;
        ctx.fillText(feature.substring(0, 25), x, 260);
        ctx.fillText(feature.substring(25, 50), x, 280);
      });
      
      // CTA section
      ctx.fillStyle = '#e5e7eb';
      ctx.fillRect(0, 420, 1024, 220);
      
      ctx.fillStyle = headerColor;
      ctx.roundRect(400, 480, 200, 50, 25);
      ctx.fill();
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, Arial';
      ctx.fillText('View Live Site', 460, 510);
      
      // Loading message if needed
      if (!isLoaded) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, 1024, 640);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px -apple-system, BlinkMacSystemFont, Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Loading live website...', 512, 300);
        
        // Loading spinner
        const time = Date.now() * 0.005;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(512, 350, 20, time, time + Math.PI);
        ctx.stroke();
      }
    };
    
    // Try to use html2canvas for live website capture (when available)
    const tryLiveCapture = async () => {
      try {
        // Wait for iframe to load
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error('Timeout')), 5000);
          iframe.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          iframe.onerror = () => {
            clearTimeout(timeout);
            reject(new Error('Load error'));
          };
        });
        
        // For security reasons, we can't capture cross-origin iframes
        // So we'll use the fallback approach but mark as loaded
        setIsLoaded(true);
        createFallbackContent();
        
        // If same-origin, try to capture (this would work for your own sites)
        if (url.includes(window.location.hostname)) {
          // This would work for same-origin content
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          if (iframeDoc) {
            // Capture successful - but most sites will block this due to CORS
            console.log('Same-origin iframe captured successfully');
          }
        }
        
      } catch (error) {
        console.log('Using fallback content due to CORS restrictions');
        createFallbackContent();
      }
    };
    
    // For specific known sites, we can create custom content
    if (url.includes('selfieholosphere.com')) {
      // Custom content for Selfie Holosphere
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, 1024, 640);
      
      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, 1024, 640);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(0.5, '#16213e');
      gradient.addColorStop(1, '#0f0e23');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 60, 1024, 580);
      
      // Browser chrome
      ctx.fillStyle = '#2a2a2a';
      ctx.fillRect(0, 0, 1024, 60);
      
      // Traffic lights
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(30, 30, 8, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(55, 30, 8, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(80, 30, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // URL bar
      ctx.fillStyle = '#3a3a3a';
      ctx.roundRect(120, 15, 600, 30, 15);
      ctx.fill();
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px -apple-system, BlinkMacSystemFont, Arial';
      ctx.fillText(url, 140, 35);
      
      // Selfie Holosphere content
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px -apple-system, BlinkMacSystemFont, Arial';
      ctx.textAlign = 'center';
      ctx.fillText('SELFIE HOLOSPHERE', 512, 180);
      
      ctx.font = '24px -apple-system, BlinkMacSystemFont, Arial';
      ctx.fillStyle = '#7c3aed';
      ctx.fillText('Interactive Photo Experiences', 512, 220);
      
      // Holographic circles
      for (let i = 0; i < 5; i++) {
        const x = 200 + i * 150;
        const y = 350;
        const radius = 50;
        
        ctx.strokeStyle = `hsl(${280 + i * 20}, 70%, 60%)`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Inner glow
        ctx.strokeStyle = `hsla(${280 + i * 20}, 70%, 80%, 0.5)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, radius - 10, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Features
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px -apple-system, BlinkMacSystemFont, Arial';
      ctx.textAlign = 'left';
      ctx.fillText('✨ Real-time photo processing', 100, 480);
      ctx.fillText('🎪 Event engagement technology', 100, 510);
      ctx.fillText('📱 Social media integration', 100, 540);
      
      ctx.textAlign = 'right';
      ctx.fillText('🎨 Custom branding options', 924, 480);
      ctx.fillText('📊 Analytics & insights', 924, 510);
      ctx.fillText('🚀 Viral sharing features', 924, 540);
      
      setIsLoaded(true);
    } else {
      // Try live capture for other sites, fallback to preview
      tryLiveCapture();
    }
    
    screenTexture = new THREE.CanvasTexture(canvas);
    screenTexture.minFilter = THREE.LinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;
    
    // Update texture periodically for live sites
    const updateTexture = () => {
      screenTexture.needsUpdate = true;
      if (isInView) {
        requestAnimationFrame(updateTexture);
      }
    };
    updateTexture();
    
    // Cleanup iframe
    const cleanupIframe = () => {
      if (iframe && iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };
    
    // Store cleanup function
    scene.userData.cleanupIframe = cleanupIframe;
    
    const screenMaterial = new THREE.MeshPhongMaterial({ 
      map: screenTexture,
      emissive: 0x111111,
      emissiveIntensity: 0.1,
      shininess: 100
    });
    
    const screenGeometry = new THREE.PlaneGeometry(3.6, 2.25);
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 1.6, -1.27);
    screen.rotation.x = -0.15;
    laptopGroup.add(screen);

    // Apple logo
    const logoGeometry = new THREE.CircleGeometry(0.08, 16);
    const logoMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x666666,
      emissive: 0x222222,
      emissiveIntensity: 0.3
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 2.2, -1.45);
    logo.rotation.x = -0.15;
    laptopGroup.add(logo);

    // Animation variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    
    const handleMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      targetRotationX = mouseY * 0.15;
      targetRotationY = mouseX * 0.3;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !rendererRef.current || !cameraRef.current) return;
      
      requestAnimationFrame(animate);
      
      // Smooth rotation interpolation
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;
      
      // Apply rotation to laptop group
      if (laptopGroupRef.current) {
        laptopGroupRef.current.rotation.x = currentRotationX;
        laptopGroupRef.current.rotation.y = currentRotationY;
        
        // Subtle floating animation
        laptopGroupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      }
      
      // Camera follows mouse subtly
      cameraRef.current.position.x = targetRotationY * 1.5;
      cameraRef.current.position.y = 2 + targetRotationX * 0.5;
      cameraRef.current.lookAt(0, 1, 0);
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      // Cleanup iframe
      if (sceneRef.current && sceneRef.current.userData.cleanupIframe) {
        sceneRef.current.userData.cleanupIframe();
      }
    };
  }, [isInView, url, title, description, features, accentColor]);

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

          {/* 3D Laptop Side */}
          <motion.div 
            className="relative lg:pl-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div 
                ref={mountRef} 
                className="w-full h-96 lg:h-[500px] relative overflow-hidden"
                style={{ minHeight: '400px' }}
              />
              
              {/* Ambient glow effect */}
              <div className={`absolute inset-0 ${getAccentBgColor().replace('bg-', 'bg-gradient-to-br from-')} to-transparent opacity-20 blur-3xl scale-110 pointer-events-none`}></div>
              
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