import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField() {
  const mainParticlesRef = useRef<THREE.Points>(null);
  const focalParticlesRef = useRef<THREE.Points>(null);
  const dustParticlesRef = useRef<THREE.Points>(null);
  
  // Custom shader material for realistic glowing particles with enhanced visibility
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
          
          // Distance-based size with perspective - enhanced for better visibility
          float distance = length(mvPosition.xyz);
          float perspectiveSize = size * (400.0 / distance);
          
          // Add subtle pulsing based on time and position
          float pulse = 1.0 + sin(time * 1.5 + position.x * 0.4 + position.y * 0.2) * 0.2;
          perspectiveSize *= pulse;
          
          // Enhanced glow intensity - much more visible at distance
          vGlow = 1.0 - smoothstep(5.0, 120.0, distance);
          vGlow = max(vGlow, 0.6); // Higher minimum visibility
          
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
          
          // Soft circular falloff with enhanced brightness
          float circle = 1.0 - smoothstep(0.0, 0.5, dist);
          
          // Brighter inner core
          float core = 1.0 - smoothstep(0.0, 0.2, dist);
          
          // Enhanced outer glow
          float glow = 1.0 - smoothstep(0.2, 0.5, dist);
          
          // Combine core and glow with much higher intensity
          float intensity = core * 1.5 + glow * 1.0;
          
          // Final color with significantly enhanced visibility
          vec3 finalColor = vColor * intensity * max(vGlow, 0.7);
          float finalAlpha = vAlpha * intensity * max(vGlow, 0.6);
          
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
          
          // Much better visibility for dust particles
          float distance = length(mvPosition.xyz);
          vOpacity = 0.8 * (1.0 - smoothstep(10.0, 150.0, distance));
          vOpacity = max(vOpacity, 0.4); // Higher minimum visibility
          
          gl_PointSize = size * (200.0 / distance);
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
          gl_FragColor = vec4(vColor, alpha * 0.6);
        }
      `
    });
  }, []);
  
  const particleData = useMemo(() => {
    // Main cosmic particles - increased count and brightness
    const mainCount = 1500;
    const mainPositions = new Float32Array(mainCount * 3);
    const mainColors = new Float32Array(mainCount * 3);
    const mainSizes = new Float32Array(mainCount);
    const mainAlphas = new Float32Array(mainCount);
    const mainVelocities = new Float32Array(mainCount * 3);
    
    for (let i = 0; i < mainCount; i++) {
      // Wider distribution for better coverage
      const radius = Math.random() * 120 + 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      mainPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      mainPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      mainPositions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Very slow movement - particles last forever by staying in bounds
      mainVelocities[i * 3] = (Math.random() - 0.5) * 0.003;
      mainVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      mainVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
      
      // Much brighter star colors
      const colorType = Math.random();
      if (colorType < 0.25) {
        // Bright blue stars
        mainColors[i * 3] = 0.9 + Math.random() * 0.1;
        mainColors[i * 3 + 1] = 0.95 + Math.random() * 0.05;
        mainColors[i * 3 + 2] = 1.0;
      } else if (colorType < 0.5) {
        // Bright white stars
        const intensity = 0.95 + Math.random() * 0.05;
        mainColors[i * 3] = intensity;
        mainColors[i * 3 + 1] = intensity;
        mainColors[i * 3 + 2] = intensity;
      } else if (colorType < 0.75) {
        // Bright purple/cyan accents
        mainColors[i * 3] = 0.8 + Math.random() * 0.2;
        mainColors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        mainColors[i * 3 + 2] = 1.0;
      } else {
        // Golden/yellow stars
        mainColors[i * 3] = 1.0;
        mainColors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        mainColors[i * 3 + 2] = 0.7 + Math.random() * 0.2;
      }
      
      // Larger sizes and higher brightness
      mainSizes[i] = Math.random() * 5 + 2;
      mainAlphas[i] = 0.9 + Math.random() * 0.1;
    }
    
    // More focal bright stars
    const focalCount = 500;
    const focalPositions = new Float32Array(focalCount * 3);
    const focalColors = new Float32Array(focalCount * 3);
    const focalSizes = new Float32Array(focalCount);
    const focalAlphas = new Float32Array(focalCount);
    
    for (let i = 0; i < focalCount; i++) {
      const radius = Math.random() * 30 + 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      focalPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      focalPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      focalPositions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Very bright colors
      const intensity = 0.98 + Math.random() * 0.02;
      focalColors[i * 3] = intensity;
      focalColors[i * 3 + 1] = intensity;
      focalColors[i * 3 + 2] = intensity;
      
      focalSizes[i] = Math.random() * 6 + 3;
      focalAlphas[i] = 0.95 + Math.random() * 0.05;
    }
    
    // Enhanced dust and nebula effect
    const dustCount = 2500;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    const dustSizes = new Float32Array(dustCount);
    const dustVelocities = new Float32Array(dustCount * 3);
    
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 400;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 400;
      
      // Very slow movement to keep particles forever
      dustVelocities[i * 3] = (Math.random() - 0.5) * 0.002;
      dustVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      dustVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
      
      // Brighter nebula colors
      const nebulaType = Math.random();
      if (nebulaType < 0.3) {
        // Bright blue nebula
        dustColors[i * 3] = 0.6 + Math.random() * 0.4;
        dustColors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        dustColors[i * 3 + 2] = 1.0;
      } else if (nebulaType < 0.6) {
        // Bright purple nebula
        dustColors[i * 3] = 0.8 + Math.random() * 0.2;
        dustColors[i * 3 + 1] = 0.6 + Math.random() * 0.4;
        dustColors[i * 3 + 2] = 1.0;
      } else {
        // Bright white/cyan nebula
        dustColors[i * 3] = 0.8 + Math.random() * 0.2;
        dustColors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        dustColors[i * 3 + 2] = 1.0;
      }
      
      dustSizes[i] = Math.random() * 4 + 1.5;
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
    
    // Animate main particles with infinite循环 (they never disappear)
    if (mainParticlesRef.current) {
      const positions = mainParticlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleData.main.count; i++) {
        const i3 = i * 3;
        
        // Update positions with wrapping to keep particles forever
        positions[i3] += particleData.main.velocities[i3];
        positions[i3 + 1] += particleData.main.velocities[i3 + 1];
        positions[i3 + 2] += particleData.main.velocities[i3 + 2];
        
        // Seamless wrapping - particles reappear on opposite side
        const maxDistance = 140;
        if (positions[i3] > maxDistance) positions[i3] = -maxDistance;
        if (positions[i3] < -maxDistance) positions[i3] = maxDistance;
        if (positions[i3 + 1] > maxDistance) positions[i3 + 1] = -maxDistance;
        if (positions[i3 + 1] < -maxDistance) positions[i3 + 1] = maxDistance;
        if (positions[i3 + 2] > maxDistance) positions[i3 + 2] = -maxDistance;
        if (positions[i3 + 2] < -maxDistance) positions[i3 + 2] = maxDistance;
        
        // Gentle floating motion
        const floatFreq = time * 0.06 + i * 0.01;
        positions[i3] += Math.sin(floatFreq) * 0.001;
        positions[i3 + 1] += Math.cos(floatFreq * 0.8) * 0.001;
      }
      
      mainParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      mainParticlesRef.current.rotation.y = time * 0.0005;
    }
    
    // Animate focal particles
    if (focalParticlesRef.current) {
      focalParticlesRef.current.rotation.x = Math.sin(time * 0.01) * 0.02;
      focalParticlesRef.current.rotation.y = time * 0.002;
      focalParticlesRef.current.rotation.z = Math.sin(time * 0.015) * 0.015;
    }
    
    // Animate dust with infinite wrapping
    if (dustParticlesRef.current) {
      const positions = dustParticlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleData.dust.count; i++) {
        const i3 = i * 3;
        positions[i3] += particleData.dust.velocities[i3];
        positions[i3 + 1] += particleData.dust.velocities[i3 + 1];
        positions[i3 + 2] += particleData.dust.velocities[i3 + 2];
        
        // Seamless wrapping for infinite dust
        const maxDistance = 200;
        if (positions[i3] > maxDistance) positions[i3] = -maxDistance;
        if (positions[i3] < -maxDistance) positions[i3] = maxDistance;
        if (positions[i3 + 1] > maxDistance) positions[i3 + 1] = -maxDistance;
        if (positions[i3 + 1] < -maxDistance) positions[i3 + 1] = maxDistance;
        if (positions[i3 + 2] > maxDistance) positions[i3 + 2] = -maxDistance;
        if (positions[i3 + 2] < -maxDistance) positions[i3 + 2] = maxDistance;
      }
      
      dustParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      dustParticlesRef.current.rotation.y = time * 0.0002;
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
}