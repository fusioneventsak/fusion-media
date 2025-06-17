import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const mainParticlesRef = useRef<THREE.Points>(null);
  const focalParticlesRef = useRef<THREE.Points>(null);
  const dustParticlesRef = useRef<THREE.Points>(null);
  
  // Enhanced shader with glow effects and tunnel behavior
  const particleShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      uniforms: {
        time: { value: 0 },
        scrollOffset: { value: 0 },
        pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
      },
      vertexShader: `
        uniform float time;
        uniform float scrollOffset;
        uniform float pixelRatio;
        attribute float size;
        attribute float alpha;
        attribute float depth;
        varying vec3 vColor;
        varying float vAlpha;
        varying float vGlow;
        varying float vSize;
        
        void main() {
          vColor = color;
          vAlpha = alpha;
          vSize = size;
          
          // Create tunnel effect with continuous particle stream
          vec3 pos = position;
          
          // Tunnel movement - particles flow very close to camera
          float tunnelSpeed = scrollOffset * 0.01; // Slower for better visibility
          pos.z = mod(pos.z + tunnelSpeed, 6.0) - 3.0; // Very short loop from -3 to +3
          
          // Slight spiral effect for visual interest
          float spiral = (pos.z + tunnelSpeed) * 0.1;
          pos.x += sin(spiral + pos.y * 0.1) * 0.5;
          pos.y += cos(spiral + pos.x * 0.1) * 0.3;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          float distance = length(mvPosition.xyz);
          
          // Size based on distance - very large for close particles
          float perspectiveSize = size * (3.0 / max(distance, 0.05));
          
          // Pulsing effect
          float pulse = 1.0 + sin(time * 2.0 + pos.z * 0.1) * 0.2;
          perspectiveSize *= pulse;
          
          // Maximum visibility glow
          vGlow = 1.0 - smoothstep(0.05, 5.0, distance);
          vGlow = max(vGlow, 0.9); // Always at least 90% visible
          
          // Depth-based brightness - very close particles
          vGlow *= (1.0 + (3.0 - abs(pos.z)) / 3.0);
          
          gl_PointSize = max(perspectiveSize * pixelRatio, 4.0); // Minimum size of 4 pixels
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        varying float vGlow;
        varying float vSize;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          // Create glow effect with multiple layers
          float innerCore = 1.0 - smoothstep(0.0, 0.1, dist);
          float outerCore = 1.0 - smoothstep(0.1, 0.3, dist);
          float glow = 1.0 - smoothstep(0.3, 0.5, dist);
          
          // Combine layers for realistic glow
          float intensity = innerCore * 3.0 + outerCore * 1.5 + glow * 0.8;
          
          // Apply glow and ensure visibility
          vec3 finalColor = vColor * intensity * max(vGlow, 0.5);
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
        time: { value: 0 },
        scrollOffset: { value: 0 }
      },
      vertexShader: `
        uniform float time;
        uniform float scrollOffset;
        attribute float size;
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          vColor = color;
          
          // Dust tunnel effect - very close and slow
          vec3 pos = position;
          float dustSpeed = scrollOffset * 0.008; // Slower movement
          pos.z = mod(pos.z + dustSpeed, 8.0) - 4.0; // Very short dust tunnel
          
          // Gentle swirling
          float swirl = (pos.z + dustSpeed) * 0.05;
          pos.x += sin(swirl + time * 0.5) * 0.8;
          pos.y += cos(swirl + time * 0.3) * 0.6;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          float distance = length(mvPosition.xyz);
          
          // Maximum visibility dust
          vOpacity = 1.0 - smoothstep(0.1, 6.0, distance);
          vOpacity = max(vOpacity, 0.8); // Very high minimum visibility
          
          gl_PointSize = size * (2.5 / max(distance, 0.05)); // Large dust
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
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `
    });
  }, []);
  
  const particleData = useMemo(() => {
    // Main particles for tunnel effect
    const mainCount = 1200;
    const mainPositions = new Float32Array(mainCount * 3);
    const mainColors = new Float32Array(mainCount * 3);
    const mainSizes = new Float32Array(mainCount);
    const mainAlphas = new Float32Array(mainCount);
    const mainDepths = new Float32Array(mainCount);
    
    for (let i = 0; i < mainCount; i++) {
      // Distribute particles in a cylinder for tunnel effect - VERY CLOSE
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.5 + 0.2; // Very small tunnel radius
      
      mainPositions[i * 3] = Math.cos(angle) * radius;
      mainPositions[i * 3 + 1] = Math.sin(angle) * radius;
      mainPositions[i * 3 + 2] = (Math.random() - 0.5) * 6; // Very short depth range -3 to +3
      
      // Color variations for depth
      const depth = Math.abs(mainPositions[i * 3 + 2]) / 3.0; // Adjusted for very short range
      const colorVariation = Math.random() * 0.3 + 0.7;
      
      const colorType = Math.random();
      if (colorType < 0.3) {
        // Blue stars with depth variation
        mainColors[i * 3] = (0.6 + Math.random() * 0.3) * colorVariation;
        mainColors[i * 3 + 1] = (0.8 + Math.random() * 0.2) * colorVariation;
        mainColors[i * 3 + 2] = colorVariation;
      } else if (colorType < 0.6) {
        // White stars with subtle variations
        const intensity = (0.8 + Math.random() * 0.2) * colorVariation;
        mainColors[i * 3] = intensity;
        mainColors[i * 3 + 1] = intensity * (0.9 + Math.random() * 0.1);
        mainColors[i * 3 + 2] = intensity * (0.95 + Math.random() * 0.05);
      } else if (colorType < 0.8) {
        // Purple/cyan with depth
        mainColors[i * 3] = (0.7 + Math.random() * 0.2) * colorVariation;
        mainColors[i * 3 + 1] = (0.6 + Math.random() * 0.3) * colorVariation;
        mainColors[i * 3 + 2] = colorVariation;
      } else {
        // Golden particles
        mainColors[i * 3] = colorVariation;
        mainColors[i * 3 + 1] = (0.8 + Math.random() * 0.2) * colorVariation;
        mainColors[i * 3 + 2] = (0.4 + Math.random() * 0.3) * colorVariation;
      }
      
      // Very large sizes for visibility
      mainSizes[i] = Math.random() * 6 + 2; // 2 to 8 units - very large
      mainAlphas[i] = 0.7 + Math.random() * 0.3;
      mainDepths[i] = depth;
    }
    
    // Focal particles - bright stars scattered throughout
    const focalCount = 300;
    const focalPositions = new Float32Array(focalCount * 3);
    const focalColors = new Float32Array(focalCount * 3);
    const focalSizes = new Float32Array(focalCount);
    const focalAlphas = new Float32Array(focalCount);
    
    for (let i = 0; i < focalCount; i++) {
      focalPositions[i * 3] = (Math.random() - 0.5) * 3; // Very close
      focalPositions[i * 3 + 1] = (Math.random() - 0.5) * 3;
      focalPositions[i * 3 + 2] = (Math.random() - 0.5) * 5; // Very close depth
      
      // Bright white/yellow stars
      const warmth = Math.random();
      const intensity = 0.9 + Math.random() * 0.1;
      focalColors[i * 3] = intensity;
      focalColors[i * 3 + 1] = intensity * (0.9 + warmth * 0.1);
      focalColors[i * 3 + 2] = intensity * (0.7 + warmth * 0.2);
      
      focalSizes[i] = Math.random() * 8 + 3; // 3 to 11 - very big and bright
      focalAlphas[i] = 0.8 + Math.random() * 0.2;
    }
    
    // Dust particles for atmosphere
    const dustCount = 2000;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    const dustSizes = new Float32Array(dustCount);
    
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 4; // Very close
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 8; // Very close depth
      
      // Nebula colors with subtle variations
      const nebulaType = Math.random();
      const colorShift = Math.random() * 0.2 + 0.6;
      
      if (nebulaType < 0.4) {
        // Blue nebula
        dustColors[i * 3] = 0.4 * colorShift;
        dustColors[i * 3 + 1] = 0.7 * colorShift;
        dustColors[i * 3 + 2] = colorShift;
      } else if (nebulaType < 0.7) {
        // Purple nebula
        dustColors[i * 3] = 0.7 * colorShift;
        dustColors[i * 3 + 1] = 0.4 * colorShift;
        dustColors[i * 3 + 2] = 0.9 * colorShift;
      } else {
        // Cyan/white nebula
        dustColors[i * 3] = 0.6 * colorShift;
        dustColors[i * 3 + 1] = 0.8 * colorShift;
        dustColors[i * 3 + 2] = colorShift;
      }
      
      dustSizes[i] = Math.random() * 4 + 1; // Larger dust particles
    }
    
    return {
      main: { 
        positions: mainPositions, 
        colors: mainColors, 
        sizes: mainSizes, 
        alphas: mainAlphas,
        depths: mainDepths,
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
        count: dustCount 
      }
    };
  }, []);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scrollOffset = scrollY; // Direct scroll value for tunnel effect
    
    // Update shader uniforms
    if (particleShaderMaterial) {
      particleShaderMaterial.uniforms.time.value = time;
      particleShaderMaterial.uniforms.scrollOffset.value = scrollOffset;
    }
    if (dustShaderMaterial) {
      dustShaderMaterial.uniforms.time.value = time;
      dustShaderMaterial.uniforms.scrollOffset.value = scrollOffset;
    }
    
    // Gentle rotation for visual interest
    if (mainParticlesRef.current) {
      mainParticlesRef.current.rotation.z = time * 0.001;
    }
    
    if (focalParticlesRef.current) {
      focalParticlesRef.current.rotation.y = time * 0.002;
      focalParticlesRef.current.rotation.x = Math.sin(time * 0.001) * 0.01;
    }
    
    if (dustParticlesRef.current) {
      dustParticlesRef.current.rotation.y = time * 0.0005;
    }
  });
  
  return (
    <>
      {/* Main tunnel particles */}
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
          <bufferAttribute
            attach="attributes-depth"
            count={particleData.main.count}
            array={particleData.main.depths}
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
          <bufferAttribute
            attach="attributes-depth"
            count={particleData.focal.count}
            array={new Float32Array(particleData.focal.count)} // Default depth
            itemSize={1}
          />
        </bufferGeometry>
      </points>
      
      {/* Atmospheric dust */}
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