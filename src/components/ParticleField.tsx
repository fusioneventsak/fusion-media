import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const mainParticlesRef = useRef<THREE.Points>(null);
  const dustParticlesRef = useRef<THREE.Points>(null);
  
  // PARTICLE COUNTS
  const MAIN_COUNT = 4000;
  const DUST_COUNT = 2500;
  
  // EXACT SHADER MATERIAL FROM YOUR REFERENCE
  const sharpParticleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
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
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // EXACT SIZE CALCULATION FROM REFERENCE
          float distance = length(mvPosition.xyz);
          float perspectiveSize = size * (300.0 / distance);
          
          // Add subtle pulsing
          float pulse = 1.0 + sin(time * 2.0 + position.x * 0.5 + position.y * 0.3) * 0.1;
          perspectiveSize *= pulse;
          
          // Glow intensity based on distance
          vGlow = 1.0 - smoothstep(5.0, 50.0, distance);
          
          gl_PointSize = perspectiveSize * pixelRatio;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          // EXACT FRAGMENT SHADER FROM REFERENCE
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          if (distanceToCenter > 0.5) discard;
          
          // Soft circular falloff
          float circle = 1.0 - smoothstep(0.0, 0.5, dist);
          
          // Inner bright core
          float core = 1.0 - smoothstep(0.0, 0.2, dist);
          
          // Outer glow
          float glow = 1.0 - smoothstep(0.2, 0.5, dist);
          
          // Combine core and glow
          float intensity = core * 0.8 + glow * 0.4;
          
          // Final color with bloom effect
          vec3 finalColor = vColor * intensity * vGlow;
          float finalAlpha = vOpacity * intensity * vGlow;
          
          gl_FragColor = vec4(finalColor, finalAlpha);
        }
      `
    });
  }, []);

  // DUST SHADER FROM REFERENCE
  const dustParticleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
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
          
          // Very subtle movement
          float distance = length(mvPosition.xyz);
          vOpacity = 0.3 * (1.0 - smoothstep(10.0, 100.0, distance));
          
          gl_PointSize = size * (100.0 / distance);
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
          gl_FragColor = vec4(vColor, alpha * 0.1);
        }
      `
    });
  }, []);
  
  // EXACT PARTICLE GENERATION FROM REFERENCE
  const particleData = useMemo(() => {
    // Main cloud particles (distributed in a galaxy-like spiral)
    const mainPositions = new Float32Array(MAIN_COUNT * 3);
    const mainColors = new Float32Array(MAIN_COUNT * 3);
    const mainSizes = new Float32Array(MAIN_COUNT);
    const mainAlphas = new Float32Array(MAIN_COUNT);
    const mainVelocities = new Float32Array(MAIN_COUNT * 3);
    
    for (let i = 0; i < MAIN_COUNT; i++) {
      // Create multiple spiral arms like the Milky Way
      const armIndex = Math.floor(Math.random() * 4); // 4 spiral arms
      const armAngle = (armIndex * Math.PI / 2) + (Math.random() - 0.5) * 0.5;
      const distanceFromCenter = Math.pow(Math.random(), 0.5) * 80; // Power distribution
      const spiralTightness = 0.2;
      const angle = armAngle + (distanceFromCenter * spiralTightness);
      
      // Add noise and scatter
      const noise = (Math.random() - 0.5) * (8 + distanceFromCenter * 0.1);
      const heightNoise = (Math.random() - 0.5) * (2 + distanceFromCenter * 0.05);
      
      mainPositions[i * 3] = Math.cos(angle) * distanceFromCenter + noise;
      mainPositions[i * 3 + 1] = heightNoise + Math.sin(angle * 0.1) * (distanceFromCenter * 0.02);
      mainPositions[i * 3 + 2] = Math.sin(angle) * distanceFromCenter + noise;
      
      // Very subtle movement for realism
      mainVelocities[i * 3] = (Math.random() - 0.5) * 0.002;
      mainVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.001;
      mainVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
      
      // Realistic star colors
      const colorType = Math.random();
      if (colorType < 0.4) {
        // Blue stars (hot)
        mainColors[i * 3] = 0.7 + Math.random() * 0.3;
        mainColors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        mainColors[i * 3 + 2] = 1.0;
      } else if (colorType < 0.7) {
        // White stars
        const intensity = 0.8 + Math.random() * 0.2;
        mainColors[i * 3] = intensity;
        mainColors[i * 3 + 1] = intensity;
        mainColors[i * 3 + 2] = intensity;
      } else {
        // Purple/cyan accents
        mainColors[i * 3] = 0.5 + Math.random() * 0.3;
        mainColors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
        mainColors[i * 3 + 2] = 1.0;
      }
      
      // Variable sizes and brightness
      const sizeRandom = Math.random();
      if (sizeRandom < 0.7) {
        // 70% tiny particles
        mainSizes[i] = 0.5 + Math.random() * 1.5;
      } else if (sizeRandom < 0.9) {
        // 20% small particles
        mainSizes[i] = 2 + Math.random() * 2;
      } else {
        // 10% larger particles (star clusters)
        mainSizes[i] = 4 + Math.random() * 3;
      }
      
      mainAlphas[i] = 0.6 + Math.random() * 0.4;
    }
    
    // Dust cloud particles (very fine, close to photos)
    const dustPositions = new Float32Array(DUST_COUNT * 3);
    const dustColors = new Float32Array(DUST_COUNT * 3);
    const dustSizes = new Float32Array(DUST_COUNT);
    const dustVelocities = new Float32Array(DUST_COUNT * 3);
    
    for (let i = 0; i < DUST_COUNT; i++) {
      // Concentrate around photo area with exponential falloff
      const radius = Math.pow(Math.random(), 2) * 50 + 10;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 30 + 15;
      
      dustPositions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 15;
      dustPositions[i * 3 + 1] = height;
      dustPositions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 15;
      
      dustVelocities[i * 3] = (Math.random() - 0.5) * 0.003;
      dustVelocities[i * 3 + 1] = Math.random() * 0.002 + 0.001;
      dustVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
      
      // Subtle nebula colors
      const nebulaType = Math.random();
      if (nebulaType < 0.5) {
        // Blue nebula
        dustColors[i * 3] = 0.3 + Math.random() * 0.2;
        dustColors[i * 3 + 1] = 0.5 + Math.random() * 0.3;
        dustColors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
      } else {
        // Purple nebula
        dustColors[i * 3] = 0.5 + Math.random() * 0.3;
        dustColors[i * 3 + 1] = 0.3 + Math.random() * 0.2;
        dustColors[i * 3 + 2] = 0.7 + Math.random() * 0.3;
      }
      
      dustSizes[i] = Math.random() * 2 + 0.5;
    }
    
    console.log('✨ Created EXACT particle system from reference');
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
  }, []);
  
  // EXACT ANIMATION FROM REFERENCE
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Update shader uniforms
    if (sharpParticleMaterial) {
      sharpParticleMaterial.uniforms.time.value = time;
    }
    if (dustParticleMaterial) {
      dustParticleMaterial.uniforms.time.value = time;
    }
    
    // Animate main particles with galactic rotation
    if (mainParticlesRef.current) {
      const mainPositions = mainParticlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleData.main.count; i++) {
        const i3 = i * 3;
        
        // Apply stellar velocities
        mainPositions[i3] += particleData.main.velocities[i3];
        mainPositions[i3 + 1] += particleData.main.velocities[i3 + 1];
        mainPositions[i3 + 2] += particleData.main.velocities[i3 + 2];
        
        // Add complex galactic motion patterns
        const x = mainPositions[i3];
        const z = mainPositions[i3 + 2];
        const distanceFromCenter = Math.sqrt(x * x + z * z);
        
        // Galactic rotation - closer stars orbit faster
        const orbitalSpeed = distanceFromCenter > 0 ? 0.00008 / Math.sqrt(distanceFromCenter + 10) : 0;
        const angle = Math.atan2(z, x);
        const newAngle = angle + orbitalSpeed;
        
        // Apply subtle orbital motion
        mainPositions[i3] += Math.cos(newAngle) * orbitalSpeed * 0.1;
        mainPositions[i3 + 2] += Math.sin(newAngle) * orbitalSpeed * 0.1;
        
        // Add stellar parallax and depth motion
        const parallaxFreq = time * 0.02 + i * 0.001;
        mainPositions[i3] += Math.sin(parallaxFreq) * 0.001;
        mainPositions[i3 + 1] += Math.cos(parallaxFreq * 0.7) * 0.0005;
        mainPositions[i3 + 2] += Math.sin(parallaxFreq * 1.3) * 0.001;
      }
      
      mainParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Galactic rotation - very slow
      mainParticlesRef.current.rotation.y = time * 0.003;
    }
    
    // Animate dust cloud with atmospheric turbulence
    if (dustParticlesRef.current) {
      const dustPositions = dustParticlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleData.dust.count; i++) {
        const i3 = i * 3;
        
        // Apply dust velocities
        dustPositions[i3] += particleData.dust.velocities[i3];
        dustPositions[i3 + 1] += particleData.dust.velocities[i3 + 1];
        dustPositions[i3 + 2] += particleData.dust.velocities[i3 + 2];
        
        // Add atmospheric turbulence
        const turbulenceFreq = time * 0.1 + i * 0.05;
        dustPositions[i3] += Math.sin(turbulenceFreq) * 0.002;
        dustPositions[i3 + 1] += Math.cos(turbulenceFreq * 1.3) * 0.001;
        dustPositions[i3 + 2] += Math.sin(turbulenceFreq * 0.8) * 0.002;
        
        // Reset dust particles that drift too far
        if (dustPositions[i3 + 1] > 60) {
          dustPositions[i3 + 1] = -10;
          dustPositions[i3] = (Math.random() - 0.5) * 70;
          dustPositions[i3 + 2] = (Math.random() - 0.5) * 70;
        }
        
        // Boundary wrapping for infinite effect
        if (Math.abs(dustPositions[i3]) > 80) {
          dustPositions[i3] = -Math.sign(dustPositions[i3]) * 20;
        }
        if (Math.abs(dustPositions[i3 + 2]) > 80) {
          dustPositions[i3 + 2] = -Math.sign(dustPositions[i3 + 2]) * 20;
        }
      }
      
      dustParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      dustParticlesRef.current.rotation.y = time * 0.005;
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
      const phi = Math.random() * Math.PI;
      
      mainPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      mainPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      mainPositions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Slow movement
      mainVelocities[i * 3] = (Math.random() - 0.5) * 0.01;
      mainVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      mainVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
      
      // Bright white colors with slight variations
      const intensity = 0.8 + Math.random() * 0.2;
      mainColors[i * 3] = intensity;
      mainColors[i * 3 + 1] = intensity;
      mainColors[i * 3 + 2] = intensity;
      
      // Variable sizes
      mainSizes[i] = Math.random() * 3 + 1;
    }
    
    // Dust particles
    const dustPositions = new Float32Array(DUST_COUNT * 3);
    const dustColors = new Float32Array(DUST_COUNT * 3);
    const dustSizes = new Float32Array(DUST_COUNT);
    const dustVelocities = new Float32Array(DUST_COUNT * 3);
    
    for (let i = 0; i < DUST_COUNT; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 80;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
      
      dustVelocities[i * 3] = (Math.random() - 0.5) * 0.005;
      dustVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      dustVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
      
      // Subtle blue-purple colors
      dustColors[i * 3] = 0.5 + Math.random() * 0.3;
      dustColors[i * 3 + 1] = 0.6 + Math.random() * 0.3;
      dustColors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
      
      dustSizes[i] = Math.random() * 2 + 0.5;
    }
    
    console.log('✨ Created SHARP particles with custom shaders');
    return {
      main: {
        positions: mainPositions,
        colors: mainColors,
        sizes: mainSizes,
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
  }, []);
  
  // ANIMATION LOOP
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Update shader uniforms
    if (sharpParticleMaterial) {
      sharpParticleMaterial.uniforms.time.value = time;
    }
    if (dustParticleMaterial) {
      dustParticleMaterial.uniforms.time.value = time;
    }
    
    // Animate main particles
    if (mainParticlesRef.current) {
      const positions = mainParticlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleData.main.count; i++) {
        const i3 = i * 3;
        
        positions[i3] += particleData.main.velocities[i3];
        positions[i3 + 1] += particleData.main.velocities[i3 + 1];
        positions[i3 + 2] += particleData.main.velocities[i3 + 2];
        
        // Gentle floating motion
        const floatFreq = time * 0.1 + i * 0.01;
        positions[i3] += Math.sin(floatFreq) * 0.002;
        positions[i3 + 1] += Math.cos(floatFreq * 0.7) * 0.002;
      }
      
      mainParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      mainParticlesRef.current.rotation.y = time * 0.001;
    }
    
    // Animate dust particles
    if (dustParticlesRef.current) {
      const positions = dustParticlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleData.dust.count; i++) {
        const i3 = i * 3;
        positions[i3] += particleData.dust.velocities[i3];
        positions[i3 + 1] += particleData.dust.velocities[i3 + 1];
        positions[i3 + 2] += particleData.dust.velocities[i3 + 2];
      }
      
      dustParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      dustParticlesRef.current.rotation.y = time * 0.0005;
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