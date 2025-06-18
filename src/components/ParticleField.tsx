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
  const MAIN_COUNT = 800;
  const DUST_COUNT = 400;
  
  // SHARP PARTICLE SHADER MATERIAL - EXACTLY LIKE YOUR REFERENCE
  const sharpParticleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        varying float vOpacity;
        uniform float time;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Size calculation with perspective
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          
          // Distance-based opacity
          float distance = length(mvPosition.xyz);
          vOpacity = 1.0 - smoothstep(20.0, 80.0, distance);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          // Create perfect circular particles
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          if (distanceToCenter > 0.5) discard;
          
          // Smooth circular falloff - SHARP EDGES
          float alpha = 1.0 - (distanceToCenter * 2.0);
          alpha = smoothstep(0.0, 1.0, alpha);
          
          // Bright, sharp particles
          gl_FragColor = vec4(vColor, alpha * vOpacity * 0.9);
        }
      `
    });
  }, []);

  // DUST PARTICLE SHADER MATERIAL
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
        attribute float size;
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          
          // Distance-based opacity for dust
          float distance = length(mvPosition.xyz);
          vOpacity = 1.0 - smoothstep(15.0, 60.0, distance);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          if (distanceToCenter > 0.5) discard;
          
          // Softer falloff for dust
          float alpha = 1.0 - (distanceToCenter * 2.0);
          alpha = smoothstep(0.0, 1.0, alpha);
          
          gl_FragColor = vec4(vColor, alpha * vOpacity * 0.6);
        }
      `
    });
  }, []);
  
  // PARTICLE DATA GENERATION
  const particleData = useMemo(() => {
    // Main particles - distributed in space
    const mainPositions = new Float32Array(MAIN_COUNT * 3);
    const mainColors = new Float32Array(MAIN_COUNT * 3);
    const mainSizes = new Float32Array(MAIN_COUNT);
    const mainVelocities = new Float32Array(MAIN_COUNT * 3);
    
    for (let i = 0; i < MAIN_COUNT; i++) {
      // Distribute particles in a large area
      const radius = Math.random() * 40 + 10;
      const theta = Math.random() * Math.PI * 2;
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