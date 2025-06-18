import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const mainParticlesRef = useRef<THREE.Points>(null);
  const brightStarsRef = useRef<THREE.Points>(null);
  const dustParticlesRef = useRef<THREE.Points>(null);
  
  // Simple but highly visible particle material
  const visibleParticleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      uniforms: {
        time: { value: 0 },
        scrollOffset: { value: 0 }
      },
      vertexShader: `
        uniform float time;
        uniform float scrollOffset;
        attribute float size;
        attribute float brightness;
        varying vec3 vColor;
        varying float vBrightness;
        varying float vAlpha;
        
        void main() {
          vColor = color;
          vBrightness = brightness;
          
          // Position particles much closer to camera
          vec3 pos = position;
          
          // Create tunnel effect with scroll
          float speed = scrollOffset * 0.005;
          pos.z = mod(pos.z + speed, 12.0) - 6.0; // Loop from -6 to +6
          
          // Add gentle movement
          pos.x += sin(time * 0.5 + pos.z * 0.1) * 0.1;
          pos.y += cos(time * 0.3 + pos.z * 0.1) * 0.1;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          float distance = length(mvPosition.xyz);
          
          // Make particles very large and visible
          float perspectiveSize = size * (10.0 / max(distance, 0.1));
          
          // Ensure minimum visibility
          vAlpha = max(0.5, 1.0 - distance / 20.0);
          
          gl_PointSize = max(perspectiveSize, 2.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vBrightness;
        varying float vAlpha;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          // Create bright glow effect
          float intensity = 1.0 - dist * 2.0;
          intensity = pow(intensity, 2.0); // Sharper falloff
          
          // Apply brightness and ensure visibility
          vec3 finalColor = vColor * vBrightness * max(intensity, 0.3);
          float finalAlpha = vAlpha * intensity * max(vBrightness, 0.4);
          
          gl_FragColor = vec4(finalColor, finalAlpha);
        }
      `
    });
  }, []);

  // Generate particle data with closer positioning
  const particleData = useMemo(() => {
    // Main particles - distributed in visible range
    const mainCount = 800;
    const mainPositions = new Float32Array(mainCount * 3);
    const mainColors = new Float32Array(mainCount * 3);
    const mainSizes = new Float32Array(mainCount);
    const mainBrightness = new Float32Array(mainCount);
    
    for (let i = 0; i < mainCount; i++) {
      // Position particles in a much closer range
      mainPositions[i * 3] = (Math.random() - 0.5) * 8; // x: -4 to +4
      mainPositions[i * 3 + 1] = (Math.random() - 0.5) * 8; // y: -4 to +4  
      mainPositions[i * 3 + 2] = (Math.random() - 0.5) * 12; // z: -6 to +6
      
      // Bright, varied colors
      const colorType = Math.random();
      const intensity = 0.8 + Math.random() * 0.2;
      
      if (colorType < 0.3) {
        // Blue/cyan particles
        mainColors[i * 3] = 0.4 * intensity;
        mainColors[i * 3 + 1] = 0.8 * intensity;
        mainColors[i * 3 + 2] = intensity;
      } else if (colorType < 0.6) {
        // White/yellow particles
        mainColors[i * 3] = intensity;
        mainColors[i * 3 + 1] = intensity * 0.95;
        mainColors[i * 3 + 2] = intensity * 0.8;
      } else if (colorType < 0.8) {
        // Purple/magenta particles
        mainColors[i * 3] = 0.9 * intensity;
        mainColors[i * 3 + 1] = 0.3 * intensity;
        mainColors[i * 3 + 2] = 0.8 * intensity;
      } else {
        // Orange/red particles
        mainColors[i * 3] = intensity;
        mainColors[i * 3 + 1] = 0.6 * intensity;
        mainColors[i * 3 + 2] = 0.2 * intensity;
      }
      
      // Large, visible sizes
      mainSizes[i] = Math.random() * 3 + 1; // 1 to 4 units
      mainBrightness[i] = 0.6 + Math.random() * 0.4; // 0.6 to 1.0
    }
    
    // Bright focal stars
    const starCount = 150;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starBrightness = new Float32Array(starCount);
    
    for (let i = 0; i < starCount; i++) {
      // Even closer bright stars
      starPositions[i * 3] = (Math.random() - 0.5) * 6; // x: -3 to +3
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 6; // y: -3 to +3
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 8; // z: -4 to +4
      
      // Bright white/warm stars
      const warmth = Math.random() * 0.3;
      starColors[i * 3] = 1.0;
      starColors[i * 3 + 1] = 1.0 - warmth * 0.2;
      starColors[i * 3 + 2] = 1.0 - warmth * 0.5;
      
      starSizes[i] = Math.random() * 4 + 2; // 2 to 6 units - very bright
      starBrightness[i] = 0.8 + Math.random() * 0.2; // Very bright
    }
    
    // Dust particles for depth
    const dustCount = 1200;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    const dustSizes = new Float32Array(dustCount);
    const dustBrightness = new Float32Array(dustCount);
    
    for (let i = 0; i < dustCount; i++) {
      // Widespread dust for atmosphere
      dustPositions[i * 3] = (Math.random() - 0.5) * 12; // x: -6 to +6
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 12; // y: -6 to +6
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 16; // z: -8 to +8
      
      // Nebula-like colors
      const nebulaType = Math.random();
      const dustIntensity = 0.4 + Math.random() * 0.3;
      
      if (nebulaType < 0.4) {
        // Blue nebula
        dustColors[i * 3] = 0.3 * dustIntensity;
        dustColors[i * 3 + 1] = 0.6 * dustIntensity;
        dustColors[i * 3 + 2] = dustIntensity;
      } else if (nebulaType < 0.7) {
        // Purple nebula
        dustColors[i * 3] = 0.7 * dustIntensity;
        dustColors[i * 3 + 1] = 0.3 * dustIntensity;
        dustColors[i * 3 + 2] = 0.8 * dustIntensity;
      } else {
        // Cyan nebula
        dustColors[i * 3] = 0.4 * dustIntensity;
        dustColors[i * 3 + 1] = 0.8 * dustIntensity;
        dustColors[i * 3 + 2] = 0.9 * dustIntensity;
      }
      
      dustSizes[i] = Math.random() * 2 + 0.5; // 0.5 to 2.5 units
      dustBrightness[i] = 0.3 + Math.random() * 0.4; // Dimmer for atmosphere
    }
    
    return {
      main: { 
        positions: mainPositions, 
        colors: mainColors, 
        sizes: mainSizes,
        brightness: mainBrightness,
        count: mainCount 
      },
      stars: { 
        positions: starPositions, 
        colors: starColors, 
        sizes: starSizes,
        brightness: starBrightness,
        count: starCount 
      },
      dust: { 
        positions: dustPositions, 
        colors: dustColors, 
        sizes: dustSizes,
        brightness: dustBrightness,
        count: dustCount 
      }
    };
  }, []);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Update shader uniforms
    if (visibleParticleMaterial) {
      visibleParticleMaterial.uniforms.time.value = time;
      visibleParticleMaterial.uniforms.scrollOffset.value = scrollY;
    }
    
    // Gentle rotation for visual interest
    if (mainParticlesRef.current) {
      mainParticlesRef.current.rotation.z = time * 0.002;
      mainParticlesRef.current.rotation.y = time * 0.001;
    }
    
    if (brightStarsRef.current) {
      brightStarsRef.current.rotation.y = time * 0.003;
      brightStarsRef.current.rotation.x = Math.sin(time * 0.002) * 0.02;
    }
    
    if (dustParticlesRef.current) {
      dustParticlesRef.current.rotation.y = time * 0.0015;
      dustParticlesRef.current.rotation.z = time * 0.0008;
    }
  });
  
  return (
    <>
      {/* Main particles */}
      <points ref={mainParticlesRef} material={visibleParticleMaterial}>
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
            attach="attributes-brightness"
            count={particleData.main.count}
            array={particleData.main.brightness}
            itemSize={1}
          />
        </bufferGeometry>
      </points>
      
      {/* Bright focal stars */}
      <points ref={brightStarsRef} material={visibleParticleMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleData.stars.count}
            array={particleData.stars.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleData.stars.count}
            array={particleData.stars.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particleData.stars.count}
            array={particleData.stars.sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-brightness"
            count={particleData.stars.count}
            array={particleData.stars.brightness}
            itemSize={1}
          />
        </bufferGeometry>
      </points>
      
      {/* Atmospheric dust */}
      <points ref={dustParticlesRef} material={visibleParticleMaterial}>
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
          <bufferAttribute
            attach="attributes-brightness"
            count={particleData.dust.count}
            array={particleData.dust.brightness}
            itemSize={1}
          />
        </bufferGeometry>
      </points>
      
      {/* Additional lighting for particle visibility */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={0.3} color="#ffffff" />
      <pointLight position={[5, 5, 5]} intensity={0.2} color="#4080ff" />
      <pointLight position={[-5, -5, -5]} intensity={0.2} color="#ff4080" />
    </>
  );
}