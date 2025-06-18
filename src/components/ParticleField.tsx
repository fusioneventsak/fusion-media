import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const mainParticlesRef = useRef<THREE.Points>(null);
  const brightStarsRef = useRef<THREE.Points>(null);
  
  // Enhanced material for sharp, large particles
  const sharpParticleMaterial = useMemo(() => {
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
        
        void main() {
          vColor = color;
          vBrightness = brightness;
          
          // Position particles VERY close to camera
          vec3 pos = position;
          
          // Create slow tunnel effect
          float speed = scrollOffset * 0.002;
          pos.z = mod(pos.z + speed, 4.0) - 2.0; // Very close loop: -2 to +2
          
          // Gentle floating motion
          pos.x += sin(time * 0.3 + pos.z) * 0.05;
          pos.y += cos(time * 0.2 + pos.z) * 0.05;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          // MUCH LARGER particles - no distance attenuation issues
          float finalSize = size * 100.0; // Massive size multiplier
          
          gl_PointSize = finalSize;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vBrightness;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          // Sharp circular particles
          if (dist > 0.5) discard;
          
          // Create sharp, bright core with soft edge
          float core = 1.0 - smoothstep(0.0, 0.2, dist);  // Sharp center
          float edge = 1.0 - smoothstep(0.2, 0.5, dist);  // Soft edge
          
          float intensity = core * 2.0 + edge * 0.5;
          
          // Very bright and visible
          vec3 finalColor = vColor * intensity * vBrightness;
          float finalAlpha = intensity * vBrightness * 0.9;
          
          gl_FragColor = vec4(finalColor, finalAlpha);
        }
      `
    });
  }, []);

  // Generate particle data - much closer positioning
  const particleData = useMemo(() => {
    // Main particles - distributed very close
    const mainCount = 400;
    const mainPositions = new Float32Array(mainCount * 3);
    const mainColors = new Float32Array(mainCount * 3);
    const mainSizes = new Float32Array(mainCount);
    const mainBrightness = new Float32Array(mainCount);
    
    for (let i = 0; i < mainCount; i++) {
      // Position particles VERY CLOSE to camera
      mainPositions[i * 3] = (Math.random() - 0.5) * 3;     // x: -1.5 to +1.5
      mainPositions[i * 3 + 1] = (Math.random() - 0.5) * 3; // y: -1.5 to +1.5  
      mainPositions[i * 3 + 2] = (Math.random() - 0.5) * 4; // z: -2 to +2
      
      // Bright, varied colors
      const colorType = Math.random();
      const intensity = 0.9 + Math.random() * 0.1;
      
      if (colorType < 0.25) {
        // Electric blue
        mainColors[i * 3] = 0.2 * intensity;
        mainColors[i * 3 + 1] = 0.6 * intensity;
        mainColors[i * 3 + 2] = intensity;
      } else if (colorType < 0.5) {
        // Bright white
        mainColors[i * 3] = intensity;
        mainColors[i * 3 + 1] = intensity;
        mainColors[i * 3 + 2] = intensity;
      } else if (colorType < 0.75) {
        // Hot pink/magenta
        mainColors[i * 3] = intensity;
        mainColors[i * 3 + 1] = 0.2 * intensity;
        mainColors[i * 3 + 2] = 0.8 * intensity;
      } else {
        // Bright cyan
        mainColors[i * 3] = 0.1 * intensity;
        mainColors[i * 3 + 1] = intensity;
        mainColors[i * 3 + 2] = intensity;
      }
      
      // Large particle sizes
      mainSizes[i] = Math.random() * 0.8 + 0.4; // 0.4 to 1.2 (will be multiplied by 100)
      mainBrightness[i] = 0.7 + Math.random() * 0.3;
    }
    
    // Bright focal stars - even closer
    const starCount = 100;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starBrightness = new Float32Array(starCount);
    
    for (let i = 0; i < starCount; i++) {
      // Super close bright stars
      starPositions[i * 3] = (Math.random() - 0.5) * 2;     // x: -1 to +1
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 2; // y: -1 to +1
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 3; // z: -1.5 to +1.5
      
      // Bright golden/white stars
      const warmth = Math.random() * 0.2;
      starColors[i * 3] = 1.0;
      starColors[i * 3 + 1] = 1.0 - warmth * 0.3;
      starColors[i * 3 + 2] = 1.0 - warmth * 0.6;
      
      starSizes[i] = Math.random() * 1.0 + 0.6; // 0.6 to 1.6 (large stars)
      starBrightness[i] = 0.8 + Math.random() * 0.2; // Very bright
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
      }
    };
  }, []);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Update shader uniforms
    if (sharpParticleMaterial) {
      sharpParticleMaterial.uniforms.time.value = time;
      sharpParticleMaterial.uniforms.scrollOffset.value = scrollY;
    }
    
    // Very gentle rotation
    if (mainParticlesRef.current) {
      mainParticlesRef.current.rotation.z = time * 0.01;
    }
    
    if (brightStarsRef.current) {
      brightStarsRef.current.rotation.y = time * 0.005;
    }
  });
  
  console.log('🌟 Rendering particles:', {
    main: particleData.main.count,
    stars: particleData.stars.count,
    material: 'Sharp particle shader'
  });
  
  return (
    <>
      {/* Remove debug objects since particles are working */}
      
      {/* Main particles - sharp and large */}
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
            attach="attributes-brightness"
            count={particleData.main.count}
            array={particleData.main.brightness}
            itemSize={1}
          />
        </bufferGeometry>
      </points>
      
      {/* Bright focal stars */}
      <points ref={brightStarsRef} material={sharpParticleMaterial}>
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
    </>
  );
}