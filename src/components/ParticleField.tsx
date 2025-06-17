import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField() {
  const mainParticlesRef = useRef<THREE.Points>(null);
  const focalParticlesRef = useRef<THREE.Points>(null);
  const dustParticlesRef = useRef<THREE.Points>(null);
  
  // Custom shader material for realistic glowing particles
  const particleShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
      },
      vertexShader: `
        uniform float time;
        uniform float pixelRatio;
        attribute float size;
        attribute float alpha;
        varying vec3 vColor;
        varying float vAlpha;
        varying float vGlow;
        
        void main() {
          vColor = color;
          vAlpha = alpha;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Distance-based size with perspective
          float distance = length(mvPosition.xyz);
          float perspectiveSize = size * (300.0 / distance);
          
          // Add subtle pulsing based on time and position
          float pulse = 1.0 + sin(time * 2.0 + position.x * 0.5 + position.y * 0.3) * 0.15;
          perspectiveSize *= pulse;
          
          // Glow intensity based on distance
          vGlow = 1.0 - smoothstep(5.0, 80.0, distance);
          vGlow = max(vGlow, 0.3); // Ensure minimum visibility
          
          gl_PointSize = perspectiveSize * pixelRatio;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        varying float vGlow;
        
        void main() {
          // Create circular particle with soft edges
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          // Soft circular falloff
          float circle = 1.0 - smoothstep(0.0, 0.5, dist);
          
          // Inner bright core
          float core = 1.0 - smoothstep(0.0, 0.25, dist);
          
          // Outer glow
          float glow = 1.0 - smoothstep(0.25, 0.5, dist);
          
          // Combine core and glow with enhanced brightness
          float intensity = core * 1.0 + glow * 0.6;
          
          // Final color with enhanced visibility
          vec3 finalColor = vColor * intensity * max(vGlow, 0.4);
          float finalAlpha = vAlpha * intensity * max(vGlow, 0.3);
          
          gl_FragColor = vec4(finalColor, finalAlpha);
        }
      `
    });
  }, []);

  const dustShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        uniform float time;
        attribute float size;
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          vColor = color;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Enhanced visibility for dust particles
          float distance = length(mvPosition.xyz);
          vOpacity = 0.6 * (1.0 - smoothstep(10.0, 120.0, distance));
          vOpacity = max(vOpacity, 0.2); // Minimum visibility
          
          gl_PointSize = size * (150.0 / distance);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          float alpha = (1.0 - dist * 2.0) * vOpacity;
          gl_FragColor = vec4(vColor, alpha * 0.3);
        }
      `
    });
  }, []);
  
  const particleData = useMemo(() => {
    // Main cosmic particles - increased count for better coverage
    const mainCount = 1200;
    const mainPositions = new Float32Array(mainCount * 3);
    const mainColors = new Float32Array(mainCount * 3);
    const mainSizes = new Float32Array(mainCount);
    const mainAlphas = new Float32Array(mainCount);
    const mainVelocities = new Float32Array(mainCount * 3);
    
    for (let i = 0; i < mainCount; i++) {
      // Wider distribution for better coverage
      const radius = Math.random() * 100 + 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      mainPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      mainPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      mainPositions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Very slow movement to maintain position
      mainVelocities[i * 3] = (Math.random() - 0.5) * 0.005;
      mainVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      mainVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
      
      // Enhanced star colors with better visibility
      const colorType = Math.random();
      if (colorType < 0.3) {
        // Bright blue stars
        mainColors[i * 3] = 0.8 + Math.random() * 0.2;
        mainColors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        mainColors[i * 3 + 2] = 1.0;
      } else if (colorType < 0.6) {
        // Bright white stars
        const intensity = 0.9 + Math.random() * 0.1;
        mainColors[i * 3] = intensity;
        mainColors[i * 3 + 1] = intensity;
        mainColors[i * 3 + 2] = intensity;
      } else {
        // Bright purple/cyan accents
        mainColors[i * 3] = 0.7 + Math.random() * 0.3;
        mainColors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        mainColors[i * 3 + 2] = 1.0;
      }
      
      // Enhanced sizes and brightness
      mainSizes[i] = Math.random() * 4 + 1.5;
      mainAlphas[i] = 0.8 + Math.random() * 0.2;
    }
    
    // More focal bright stars
    const focalCount = 400;
    const focalPositions = new Float32Array(focalCount * 3);
    const focalColors = new Float32Array(focalCount * 3);
    const focalSizes = new Float32Array(focalCount);
    const focalAlphas = new Float32Array(focalCount);
    
    for (let i = 0; i < focalCount; i++) {
      const radius = Math.random() * 25 + 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      focalPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      focalPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      focalPositions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Bright colors
      const intensity = 0.95 + Math.random() * 0.05;
      focalColors[i * 3] = intensity;
      focalColors[i * 3 + 1] = intensity;
      focalColors[i * 3 + 2] = intensity;
      
      focalSizes[i] = Math.random() * 5 + 2.5;
      focalAlphas[i] = 0.9 + Math.random() * 0.1;
    }
    
    // Enhanced dust and nebula effect
    const dustCount = 2000;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    const dustSizes = new Float32Array(dustCount);
    const dustVelocities = new Float32Array(dustCount * 3);
    
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 300;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 300;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 300;
      
      dustVelocities[i * 3] = (Math.random() - 0.5) * 0.003;
      dustVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      dustVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
      
      // Enhanced nebula colors
      const nebulaType = Math.random();
      if (nebulaType < 0.4) {
        // Blue nebula
        dustColors[i * 3] = 0.4 + Math.random() * 0.3;
        dustColors[i * 3 + 1] = 0.6 + Math.random() * 0.3;
        dustColors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
      } else if (nebulaType < 0.7) {
        // Purple nebula
        dustColors[i * 3] = 0.6 + Math.random() * 0.3;
        dustColors[i * 3 + 1] = 0.4 + Math.random() * 0.3;
        dustColors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
      } else {
        // White/cyan nebula
        dustColors[i * 3] = 0.7 + Math.random() * 0.3;
        dustColors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        dustColors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
      }
      
      dustSizes[i] = Math.random() * 3 + 1;
    }
    
    return {
      main: { 
        positions: mainPositions, 
        colors: mainColors, 
        sizes: mainSizes, 
        alphas: mainAlphas,
        velocities: mainVelocities,
        count: mainCount 
      },
      focal: { 
        positions: focalPositions, 
        colors: focalColors, 
        sizes: focalSizes,
        alphas: focalAlphas,
        count: focalCount 
      },
      dust: { 
        positions: dustPositions, 
        colors: dustColors, 
        sizes: dustSizes,
        velocities: dustVelocities,
        count: dustCount 
      }
    };
  }, []);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Update shader uniforms
    if (particleShaderMaterial) {
      particleShaderMaterial.uniforms.time.value = time;
    }
    if (dustShaderMaterial) {
      dustShaderMaterial.uniforms.time.value = time;
    }
    
    // Animate main particles with boundary wrapping
    if (mainParticlesRef.current) {
      const positions = mainParticlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleData.main.count; i++) {
        const i3 = i * 3;
        
        // Update positions
        positions[i3] += particleData.main.velocities[i3];
        positions[i3 + 1] += particleData.main.velocities[i3 + 1];
        positions[i3 + 2] += particleData.main.velocities[i3 + 2];
        
        // Wrap around boundaries to keep particles in view
        const maxDistance = 120;
        if (Math.abs(positions[i3]) > maxDistance) {
          positions[i3] = -positions[i3] * 0.8;
        }
        if (Math.abs(positions[i3 + 1]) > maxDistance) {
          positions[i3 + 1] = -positions[i3 + 1] * 0.8;
        }
        if (Math.abs(positions[i3 + 2]) > maxDistance) {
          positions[i3 + 2] = -positions[i3 + 2] * 0.8;
        }
        
        // Gentle floating motion
        const floatFreq = time * 0.08 + i * 0.01;
        positions[i3] += Math.sin(floatFreq) * 0.002;
        positions[i3 + 1] += Math.cos(floatFreq * 0.7) * 0.002;
      }
      
      mainParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      mainParticlesRef.current.rotation.y = time * 0.0008;
    }
    
    // Animate focal particles
    if (focalParticlesRef.current) {
      focalParticlesRef.current.rotation.x = Math.sin(time * 0.015) * 0.03;
      focalParticlesRef.current.rotation.y = time * 0.003;
      focalParticlesRef.current.rotation.z = Math.sin(time * 0.02) * 0.02;
    }
    
    // Animate dust with boundary wrapping
    if (dustParticlesRef.current) {
      const positions = dustParticlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleData.dust.count; i++) {
        const i3 = i * 3;
        positions[i3] += particleData.dust.velocities[i3];
        positions[i3 + 1] += particleData.dust.velocities[i3 + 1];
        positions[i3 + 2] += particleData.dust.velocities[i3 + 2];
        
        // Wrap around boundaries
        const maxDistance = 150;
        if (Math.abs(positions[i3]) > maxDistance) {
          positions[i3] = -positions[i3] * 0.7;
        }
        if (Math.abs(positions[i3 + 1]) > maxDistance) {
          positions[i3 + 1] = -positions[i3 + 1] * 0.7;
        }
        if (Math.abs(positions[i3 + 2]) > maxDistance) {
          positions[i3 + 2] = -positions[i3 + 2] * 0.7;
        }
      }
      
      dustParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      dustParticlesRef.current.rotation.y = time * 0.0003;
    }
  });
  
  return (
    <>
      {/* Main star field */}
      <points ref={mainParticlesRef} material={particleShaderMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleData.main.count}
            array={particleData.main.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleData.main.count}
            array={particleData.main.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particleData.main.count}
            array={particleData.main.sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-alpha"
            count={particleData.main.count}
            array={particleData.main.alphas}
            itemSize={1}
          />
        </bufferGeometry>
      </points>
      
      {/* Focal bright stars */}
      <points ref={focalParticlesRef} material={particleShaderMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleData.focal.count}
            array={particleData.focal.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleData.focal.count}
            array={particleData.focal.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particleData.focal.count}
            array={particleData.focal.sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-alpha"
            count={particleData.focal.count}
            array={particleData.focal.alphas}
            itemSize={1}
          />
        </bufferGeometry>
      </points>
      
      {/* Nebula dust */}
      <points ref={dustParticlesRef} material={dustShaderMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleData.dust.count}
            array={particleData.dust.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleData.dust.count}
            array={particleData.dust.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particleData.dust.count}
            array={particleData.dust.sizes}
            itemSize={1}
          />
        </bufferGeometry>
      </points>
    </>
  );
}import React from 'react';
import { motion } from 'framer-motion';
import FullWidthLaptopShowcase from '../components/Laptop';

export default function HomePage() {
  return (
    <div className="relative pointer-events-none">
      {/* Hero Section - Transparent to show WebGL background */}
      <section className="relative min-h-screen flex items-center justify-center px-8 pt-20 pointer-events-none">
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl pointer-events-auto">
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
            className="text-xl md:text-2xl text-white mb-12 max-w-4xl mx-auto leading-relaxed font-light"
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
                <div className="text-sm text-white font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-gray-300">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Use Case Showcases - Semi-transparent to show particles behind */}
      
      {/* 1. Event Engagement Technology */}
      <div className="pointer-events-auto">
        <FullWidthLaptopShowcase
          url="https://selfieholosphere.com/collage/1lr9qn"
          title="Event Engagement Technology"
          description="Interactive experiences that captivate audiences and create unforgettable moments. From trade shows to festivals, retail activations to corporate events—our engagement platforms drive participation and generate valuable data insights."
          features={[
            'Trade shows and corporate events with real-time engagement',
            'Festivals and concerts with social media integration',
            'Retail locations and brand activations',
            'Real-time photo processing and customizable animations',
            'Custom branding, analytics, and lead generation'
          ]}
          backgroundColor="transparent"
          textColor="text-white"
          accentColor="text-purple-600"
        />
      </div>

      {/* 2. Custom Business Applications */}
      <div className="pointer-events-auto">
        <FullWidthLaptopShowcase
          url="https://splendid-cannoli-324007.netlify.app/"
          title="Custom Business Applications"
          description="Tailored internal tools and CRM systems built specifically for your organization's workflow. Streamline operations, improve efficiency, and gain valuable insights with applications designed around your unique business needs and processes."
          features={[
            'Custom CRM and database management systems',
            'Workflow automation and comprehensive reporting',
            'Team collaboration tools and project management',
            'Advanced data visualization and business analytics',
            'Secure cloud-based architecture with enterprise-grade security'
          ]}
          backgroundColor="transparent"
          textColor="text-white"
          accentColor="text-blue-600"
        />
      </div>

      {/* 3. Audience Engagement Platforms */}
      <div className="pointer-events-auto">
        <FullWidthLaptopShowcase
          url="http://urequestsongs.com"
          title="Audience Engagement Platforms"
          description="Real-time interaction tools that connect performers with their audience in meaningful ways. From song requests to live polling, these platforms create deeper engagement and memorable experiences for bands, DJs, and entertainers of all kinds."
          features={[
            'Live song request systems for bands, DJs, and performers',
            'Real-time audience voting, polls, and interactive features',
            'Social media integration and viral sharing capabilities',
            'Custom branding for artists, venues, and event organizers',
            'Comprehensive analytics and audience engagement insights'
          ]}
          backgroundColor="transparent"
          textColor="text-white"
          accentColor="text-cyan-400"
        />
      </div>

      {/* 4. Interactive Widgets & Components */}
      <div className="pointer-events-auto">
        <FullWidthLaptopShowcase
          url="https://capable-alfajores-d0dff2.netlify.app/"
          title="Interactive Widgets & Components"
          description="Gamified experiences and interactive elements that boost engagement on websites and at live events. From custom game shows to educational tools, we create interactive components that entertain, inform, and drive meaningful user participation."
          features={[
            'Custom game shows, trivia platforms, and interactive competitions',
            'Interactive website widgets and embedded components',
            'Educational modules and training platforms',
            'Leaderboards, scoring systems, and competition management',
            'Multi-device compatibility and responsive design'
          ]}
          backgroundColor="transparent"
          textColor="text-white"
          accentColor="text-indigo-600"
        />
      </div>

      {/* 5. Professional Website Development */}
      <div className="pointer-events-auto">
        <FullWidthLaptopShowcase
          url="https://www.fusion-events.ca"
          title="Professional Website Development"
          description="Beautiful, high-performance websites that drive real business results. Built with modern HTML, CSS, and JavaScript, optimized for speed, SEO, and conversions. Perfect for service businesses, corporate brands, and growing organizations."
          features={[
            'Modern, responsive design with mobile-first approach',
            'SEO optimization and lightning-fast loading speeds',
            'Content management systems and easy updates',
            'E-commerce integration and payment processing',
            'Advanced analytics, conversion tracking, and performance monitoring'
          ]}
          backgroundColor="transparent"
          textColor="text-white"
          accentColor="text-green-600"
        />
      </div>

      {/* Technology & Process Section */}
      <section className="min-h-screen flex items-center justify-center px-8 py-32 pointer-events-auto">
        {/* Subtle background for readability */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-7xl w-full">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">
              How we{' '}
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                work faster
              </span>
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed font-light">
              Our AI-assisted approach combines cutting-edge tools with decades of experience 
              to deliver exceptional results in record time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 mb-20">
            {[
              {
                number: '01',
                title: 'AI-Powered Development',
                description: 'We leverage the latest AI tools for rapid prototyping, code generation, and design iteration, reducing development time by 10x.',
                icon: '🤖'
              },
              {
                number: '02',
                title: '25+ Years of Expertise',
                description: 'Deep industry knowledge in events, entertainment, and technology ensures we understand your unique challenges and opportunities.',
                icon: '🎯'
              },
              {
                number: '03',
                title: 'Proven Methodologies',
                description: 'Our battle-tested processes and frameworks mean faster delivery without compromising quality or functionality.',
                icon: '⚡'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="text-6xl mb-6">{item.icon}</div>
                <div className="text-sm font-mono text-gray-300 mb-3">{item.number}</div>
                <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-white leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/20">
              <span className="text-white mr-4">Ready to experience the difference?</span>
              <motion.button
                className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="min-h-screen flex items-center justify-center px-8 py-32 pointer-events-auto">
        {/* Subtle background for readability */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-5xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">
              Ready to transform{' '}
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                your vision
              </span>
              <br />
              into reality?
            </h2>
            
            <p className="text-xl text-white mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Let's discuss how our AI-assisted approach can deliver exceptional 
              results for your next project—faster and more efficiently than ever before.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <motion.button
                className="px-12 py-4 bg-white text-gray-900 rounded-full font-medium text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
              </motion.button>
              <motion.button
                className="px-12 py-4 border border-white/30 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Consultation
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div
                className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-light text-blue-400 mb-2">Events & Entertainment</div>
                <p className="text-white text-sm">25+ years of industry expertise and proven results</p>
              </motion.div>
              
              <motion.div
                className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-light text-purple-400 mb-2">AI-Powered Development</div>
                <p className="text-white text-sm">10x faster project delivery with cutting-edge tools</p>
              </motion.div>
              
              <motion.div
                className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-light text-cyan-400 mb-2">Custom Solutions</div>
                <p className="text-white text-sm">Tailored specifically to your unique business needs</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}