import React, { useRef, useMemo, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  // No props needed - standalone particle system
}

export default function ParticleField() {
  const mainParticlesRef = useRef<THREE.Points>(null);
  const dustParticlesRef = useRef<THREE.Points>(null);
  
  // MOBILE DETECTION AND ADAPTIVE PARTICLE COUNTS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // DRAMATICALLY REDUCED PARTICLE COUNTS FOR MOBILE
  const MAIN_COUNT = isIOS ? 800 : isMobile ? 1200 : 4000;
  const DUST_COUNT = isIOS ? 400 : isMobile ? 600 : 2500;
  
  console.log(`🎯 Particle counts - Main: ${MAIN_COUNT}, Dust: ${DUST_COUNT}, iOS: ${isIOS}`);
  
  // SIMPLIFIED SHADER MATERIAL FOR MOBILE
  const sharpParticleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: isIOS ? 1 : Math.min(window.devicePixelRatio, 2) }
      },
      vertexShader: `
        attribute float size;
        attribute float alpha;
        varying vec3 vColor;
        varying float vOpacity;
        varying float vGlow;
        uniform float time;
        uniform float pixelRatio;
        
        void main() {
          vColor = color;
          vOpacity = alpha;
          
          vec3 pos = position;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          // SIMPLIFIED SIZE CALCULATION FOR MOBILE
          float distance = length(mvPosition.xyz);
          float perspectiveSize = size * (200.0 / distance);
          
          ${isIOS ? `
          // Simplified pulsing for iOS
          float pulse = 1.0 + sin(time + position.x) * 0.05;
          ` : `
          // Full pulsing for desktop
          float pulse = 1.0 + sin(time * 2.0 + position.x * 0.5 + position.y * 0.3) * 0.1;
          `}
          
          perspectiveSize *= pulse;
          
          // Simplified glow for mobile
          vGlow = ${isIOS ? '0.8' : '(1.0 - smoothstep(5.0, 50.0, distance))'};
          
          gl_PointSize = perspectiveSize * pixelRatio;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        varying float vGlow;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          if (distanceToCenter > 0.5) discard;
          
          ${isIOS ? `
          // Simplified fragment shader for iOS
          float circle = 1.0 - distanceToCenter * 2.0;
          float intensity = circle * 0.8;
          ` : `
          // Full fragment shader for desktop
          float circle = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          float core = 1.0 - smoothstep(0.0, 0.2, distanceToCenter);
          float glow = 1.0 - smoothstep(0.2, 0.5, distanceToCenter);
          float intensity = core * 0.8 + glow * 0.4;
          `}
          
          vec3 finalColor = vColor * intensity * vGlow;
          float finalAlpha = vOpacity * intensity * vGlow;
          
          gl_FragColor = vec4(finalColor, finalAlpha);
        }
      `
    });
  }, [isIOS]);

  // SIMPLIFIED DUST SHADER FOR MOBILE
  const dustParticleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        uniform float time;
        attribute float size;
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          vColor = color;
          
          vec3 pos = position;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          float distance = length(mvPosition.xyz);
          vOpacity = ${isIOS ? '0.2' : '0.3 * (1.0 - smoothstep(10.0, 100.0, distance))'};
          
          gl_PointSize = size * (${isIOS ? '80.0' : '100.0'} / distance);
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
          gl_FragColor = vec4(vColor, alpha * ${isIOS ? '0.05' : '0.1'});
        }
      `
    });
  }, [isIOS]);
  
  // OPTIMIZED PARTICLE GENERATION
  const particleData = useMemo(() => {
    // Main cloud particles (fewer for mobile)
    const mainPositions = new Float32Array(MAIN_COUNT * 3);
    const mainColors = new Float32Array(MAIN_COUNT * 3);
    const mainSizes = new Float32Array(MAIN_COUNT);
    const mainAlphas = new Float32Array(MAIN_COUNT);
    const mainVelocities = new Float32Array(MAIN_COUNT * 3);
    
    for (let i = 0; i < MAIN_COUNT; i++) {
      // Simplified spiral generation for mobile
      const armIndex = Math.floor(Math.random() * (isIOS ? 2 : 4)); // Fewer arms on iOS
      const armAngle = (armIndex * Math.PI / (isIOS ? 1 : 2)) + (Math.random() - 0.5) * 0.5;
      const distanceFromCenter = Math.pow(Math.random(), 0.5) * (isIOS ? 60 : 80); // Smaller field on iOS
      const spiralTightness = isIOS ? 0.15 : 0.2;
      const angle = armAngle + (distanceFromCenter * spiralTightness);
      
      // Reduced noise for mobile
      const noise = (Math.random() - 0.5) * (isIOS ? 4 : 8);
      const heightNoise = (Math.random() - 0.5) * (isIOS ? 1 : 2);
      
      mainPositions[i * 3] = Math.cos(angle) * distanceFromCenter + noise;
      mainPositions[i * 3 + 1] = heightNoise + Math.sin(angle * 0.1) * (distanceFromCenter * 0.02);
      mainPositions[i * 3 + 2] = Math.sin(angle) * distanceFromCenter + noise;
      
      // Reduced movement for mobile performance
      const velocityScale = isIOS ? 0.001 : 0.002;
      mainVelocities[i * 3] = (Math.random() - 0.5) * velocityScale;
      mainVelocities[i * 3 + 1] = (Math.random() - 0.5) * (velocityScale * 0.5);
      mainVelocities[i * 3 + 2] = (Math.random() - 0.5) * velocityScale;
      
      // Simplified color generation for mobile
      const colorType = Math.random();
      if (colorType < 0.5) {
        // Blue stars
        mainColors[i * 3] = 0.7;
        mainColors[i * 3 + 1] = 0.8;
        mainColors[i * 3 + 2] = 1.0;
      } else {
        // White/cyan stars
        mainColors[i * 3] = 0.6;
        mainColors[i * 3 + 1] = 0.8;
        mainColors[i * 3 + 2] = 1.0;
      }
      
      // Simplified size distribution
      mainSizes[i] = isIOS ? (0.5 + Math.random() * 1.0) : (0.5 + Math.random() * 1.5);
      mainAlphas[i] = isIOS ? (0.4 + Math.random() * 0.4) : (0.6 + Math.random() * 0.4);
    }
    
    // Dust cloud particles (much fewer for mobile)
    const dustPositions = new Float32Array(DUST_COUNT * 3);
    const dustColors = new Float32Array(DUST_COUNT * 3);
    const dustSizes = new Float32Array(DUST_COUNT);
    const dustVelocities = new Float32Array(DUST_COUNT * 3);
    
    for (let i = 0; i < DUST_COUNT; i++) {
      const radius = Math.pow(Math.random(), 2) * (isIOS ? 30 : 50) + 10;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * (isIOS ? 20 : 30) + 15;
      
      dustPositions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * (isIOS ? 8 : 15);
      dustPositions[i * 3 + 1] = height;
      dustPositions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * (isIOS ? 8 : 15);
      
      const velocityScale = isIOS ? 0.001 : 0.003;
      dustVelocities[i * 3] = (Math.random() - 0.5) * velocityScale;
      dustVelocities[i * 3 + 1] = Math.random() * velocityScale + 0.0005;
      dustVelocities[i * 3 + 2] = (Math.random() - 0.5) * velocityScale;
      
      // Simplified nebula colors
      dustColors[i * 3] = 0.4;
      dustColors[i * 3 + 1] = 0.6;
      dustColors[i * 3 + 2] = 0.9;
      
      dustSizes[i] = isIOS ? (Math.random() * 1 + 0.3) : (Math.random() * 2 + 0.5);
    }
    
    console.log(`✨ Created MOBILE-OPTIMIZED particle system - Main: ${MAIN_COUNT}, Dust: ${DUST_COUNT}`);
    return {
      main: {
        positions: mainPositions,
        colors: mainColors,
        sizes: mainSizes,
        alphas: mainAlphas,
        velocities: mainVelocities,
        count: MAIN_COUNT
      },
      dust: {
        positions: dustPositions,
        colors: dustColors,
        sizes: dustSizes,
        velocities: dustVelocities,
        count: DUST_COUNT
      }
    };
  }, [MAIN_COUNT, DUST_COUNT, isIOS]);
  
  // OPTIMIZED ANIMATION WITH MOBILE-SPECIFIC FRAME RATE
  useFrame((state) => {
    // MOBILE-OPTIMIZED TIME MULTIPLIER
    const time = state.clock.getElapsedTime() * (isIOS ? 0.4 : 0.8); // Much slower on iOS
    
    // Update shader uniforms
    if (sharpParticleMaterial) {
      sharpParticleMaterial.uniforms.time.value = time;
    }
    if (dustParticleMaterial) {
      dustParticleMaterial.uniforms.time.value = time;
    }
    
    // REDUCED ANIMATION FREQUENCY FOR MOBILE
    const shouldUpdate = isIOS ? (state.clock.elapsedTime % 0.1 < 0.016) : true; // Update every 6th frame on iOS
    
    if (!shouldUpdate) return;
    
    // Animate main particles with simplified galactic rotation
    if (mainParticlesRef.current) {
      const mainPositions = mainParticlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleData.main.count; i++) {
        const i3 = i * 3;
        
        // Apply stellar velocities
        mainPositions[i3] += particleData.main.velocities[i3];
        mainPositions[i3 + 1] += particleData.main.velocities[i3 + 1];
        mainPositions[i3 + 2] += particleData.main.velocities[i3 + 2];
        
        if (!isIOS) {
          // Skip complex galactic motion on iOS
          const x = mainPositions[i3];
          const z = mainPositions[i3 + 2];
          const distanceFromCenter = Math.sqrt(x * x + z * z);
          
          const orbitalSpeed = distanceFromCenter > 0 ? 0.00003 / Math.sqrt(distanceFromCenter + 10) : 0;
          const angle = Math.atan2(z, x);
          const newAngle = angle + orbitalSpeed;
          
          mainPositions[i3] += Math.cos(newAngle) * orbitalSpeed * 0.05;
          mainPositions[i3 + 2] += Math.sin(newAngle) * orbitalSpeed * 0.05;
        }
        
        // Simplified parallax motion
        const parallaxFreq = time * 0.01 + i * 0.0005;
        mainPositions[i3] += Math.sin(parallaxFreq) * (isIOS ? 0.0004 : 0.0008);
        mainPositions[i3 + 1] += Math.cos(parallaxFreq * 0.7) * (isIOS ? 0.0002 : 0.0004);
        mainPositions[i3 + 2] += Math.sin(parallaxFreq * 1.3) * (isIOS ? 0.0004 : 0.0008);
      }
      
      mainParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      
      // MUCH SLOWER rotation for iOS
      mainParticlesRef.current.rotation.y = time * (isIOS ? 0.008 : 0.02); // Four times faster rotation
    }
    
    // Simplified dust animation
    if (dustParticlesRef.current) {
      const dustPositions = dustParticlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleData.dust.count; i++) {
        const i3 = i * 3;
        
        // Apply dust velocities
        dustPositions[i3] += particleData.dust.velocities[i3];
        dustPositions[i3 + 1] += particleData.dust.velocities[i3 + 1];
        dustPositions[i3 + 2] += particleData.dust.velocities[i3 + 2];
        
        if (!isIOS) {
          // Skip turbulence on iOS
          const turbulenceFreq = time * 0.04 + i * 0.02;
          dustPositions[i3] += Math.sin(turbulenceFreq) * 0.0008;
          dustPositions[i3 + 1] += Math.cos(turbulenceFreq * 1.3) * 0.0004;
          dustPositions[i3 + 2] += Math.sin(turbulenceFreq * 0.8) * 0.0008;
        }
        
        // Reset dust particles that drift too far
        const maxHeight = isIOS ? 40 : 60;
        const maxDistance = isIOS ? 50 : 80;
        
        if (dustPositions[i3 + 1] > maxHeight) {
          dustPositions[i3 + 1] = -10;
          dustPositions[i3] = (Math.random() - 0.5) * maxDistance;
          dustPositions[i3 + 2] = (Math.random() - 0.5) * maxDistance;
        }
        
        if (Math.abs(dustPositions[i3]) > maxDistance) {
          dustPositions[i3] = -Math.sign(dustPositions[i3]) * 20;
        }
        if (Math.abs(dustPositions[i3 + 2]) > maxDistance) {
          dustPositions[i3 + 2] = -Math.sign(dustPositions[i3 + 2]) * 20;
        }
      }
      
      dustParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      dustParticlesRef.current.rotation.y = time * (isIOS ? 0.012 : 0.032); // Four times faster rotation
    }
  });
  
  return (
    <>
      {/* Main sharp particles */}
      <points ref={mainParticlesRef} material={sharpParticleMaterial}>
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
      
      {/* Dust particles */}
      <points ref={dustParticlesRef} material={dustParticleMaterial}>
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
}