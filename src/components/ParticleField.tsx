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
          float core = 1.0 - smoothstep(0.0, 0.2, dist);
          
          // Outer glow
          float glow = 1.0 - smoothstep(0.2, 0.5, dist);
          
          // Combine core and glow
          float intensity = core * 0.8 + glow * 0.4;
          
          // Final color with bloom effect
          vec3 finalColor = vColor * intensity * vGlow;
          float finalAlpha = vAlpha * intensity * vGlow;
          
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
  
  const particleData = useMemo(() => {
    // Main cosmic particles - fewer but more impactful
    const mainCount = 800;
    const mainPositions = new Float32Array(mainCount * 3);
    const mainColors = new Float32Array(mainCount * 3);
    const mainSizes = new Float32Array(mainCount);
    const mainAlphas = new Float32Array(mainCount);
    const mainVelocities = new Float32Array(mainCount * 3);
    
    for (let i = 0; i < mainCount; i++) {
      // Distribute in 3D space with some clustering
      const radius = Math.random() * 60 + 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      mainPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      mainPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      mainPositions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Slow movement
      mainVelocities[i * 3] = (Math.random() - 0.5) * 0.01;
      mainVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      mainVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
      
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
      mainSizes[i] = Math.random() * 3 + 1;
      mainAlphas[i] = 0.6 + Math.random() * 0.4;
    }
    
    // Focal bright stars
    const focalCount = 200;
    const focalPositions = new Float32Array(focalCount * 3);
    const focalColors = new Float32Array(focalCount * 3);
    const focalSizes = new Float32Array(focalCount);
    const focalAlphas = new Float32Array(focalCount);
    
    for (let i = 0; i < focalCount; i++) {
      const radius = Math.random() * 15 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      focalPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      focalPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      focalPositions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Bright blue-white colors
      const intensity = 0.9 + Math.random() * 0.1;
      focalColors[i * 3] = intensity * 0.9;
      focalColors[i * 3 + 1] = intensity;
      focalColors[i * 3 + 2] = intensity;
      
      focalSizes[i] = Math.random() * 4 + 2;
      focalAlphas[i] = 0.8 + Math.random() * 0.2;
    }
    
    // Dust and nebula effect
    const dustCount = 1500;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    const dustSizes = new Float32Array(dustCount);
    const dustVelocities = new Float32Array(dustCount * 3);
    
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 200;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
      
      dustVelocities[i * 3] = (Math.random() - 0.5) * 0.005;
      dustVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      dustVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
      
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
    
    // Animate main particles
    if (mainParticlesRef.current) {
      const positions = mainParticlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleData.main.count; i++) {
        const i3 = i * 3;
        
        positions[i3] += particleData.main.velocities[i3];
        positions[i3 + 1] += particleData.main.velocities[i3 + 1];
        positions[i3 + 2] += particleData.main.velocities[i3 + 2];
        
        // Gentle floating
        const floatFreq = time * 0.1 + i * 0.01;
        positions[i3] += Math.sin(floatFreq) * 0.002;
        positions[i3 + 1] += Math.cos(floatFreq * 0.7) * 0.002;
      }
      
      mainParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      mainParticlesRef.current.rotation.y = time * 0.001;
    }
    
    // Animate focal particles
    if (focalParticlesRef.current) {
      focalParticlesRef.current.rotation.x = Math.sin(time * 0.02) * 0.05;
      focalParticlesRef.current.rotation.y = time * 0.005;
      focalParticlesRef.current.rotation.z = Math.sin(time * 0.03) * 0.03;
    }
    
    // Animate dust
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