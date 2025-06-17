import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField() {
  const mainParticlesRef = useRef<THREE.Points>(null);
  const focalParticlesRef = useRef<THREE.Points>(null);
  const dustParticlesRef = useRef<THREE.Points>(null);
  
  const particleData = useMemo(() => {
    // Main starfield - dramatic backdrop
    const mainCount = 2500;
    const mainPositions = new Float32Array(mainCount * 3);
    const mainColors = new Float32Array(mainCount * 3);
    const mainSizes = new Float32Array(mainCount);
    const mainVelocities = new Float32Array(mainCount * 3);
    
    for (let i = 0; i < mainCount; i++) {
      // Wide distribution across the scene
      mainPositions[i * 3] = (Math.random() - 0.5) * 120;
      mainPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      mainPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      
      // Slow drift velocities
      mainVelocities[i * 3] = (Math.random() - 0.5) * 0.002;
      mainVelocities[i * 3 + 1] = Math.random() * 0.003 + 0.001;
      mainVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
      
      // Color palette - cosmic theme
      const colorType = Math.random();
      if (colorType < 0.25) {
        // Electric cyan - tech vibes
        mainColors[i * 3] = 0.05 + Math.random() * 0.15;
        mainColors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
        mainColors[i * 3 + 2] = 1;
      } else if (colorType < 0.5) {
        // Deep purple - luxury feel
        mainColors[i * 3] = 0.5 + Math.random() * 0.3;
        mainColors[i * 3 + 1] = 0.1 + Math.random() * 0.2;
        mainColors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
      } else if (colorType < 0.75) {
        // Electric blue - modern
        mainColors[i * 3] = 0.1 + Math.random() * 0.2;
        mainColors[i * 3 + 1] = 0.4 + Math.random() * 0.4;
        mainColors[i * 3 + 2] = 1;
      } else {
        // Bright white - elegance
        mainColors[i * 3] = 0.9 + Math.random() * 0.1;
        mainColors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        mainColors[i * 3 + 2] = 1;
      }
      
      // Variable sizes for depth
      mainSizes[i] = Math.random() * 1.5 + 0.3;
    }
    
    // Focal cluster - central energy
    const focalCount = 1200;
    const focalPositions = new Float32Array(focalCount * 3);
    const focalColors = new Float32Array(focalCount * 3);
    const focalSizes = new Float32Array(focalCount);
    
    for (let i = 0; i < focalCount; i++) {
      // Spherical distribution around center
      const radius = Math.random() * 12 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      focalPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      focalPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      focalPositions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Bright, energetic colors
      const colorType = Math.random();
      if (colorType < 0.3) {
        // Brilliant cyan
        focalColors[i * 3] = 0.02;
        focalColors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        focalColors[i * 3 + 2] = 1;
      } else if (colorType < 0.6) {
        // Vivid purple
        focalColors[i * 3] = 0.8 + Math.random() * 0.2;
        focalColors[i * 3 + 1] = 0.2 + Math.random() * 0.3;
        focalColors[i * 3 + 2] = 1;
      } else {
        // Pure radiance
        focalColors[i * 3] = 1;
        focalColors[i * 3 + 1] = 0.95 + Math.random() * 0.05;
        focalColors[i * 3 + 2] = 1;
      }
      
      focalSizes[i] = Math.random() * 2.5 + 0.8;
    }
    
    // Dust particles - ambient atmosphere
    const dustCount = 800;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    const dustSizes = new Float32Array(dustCount);
    const dustVelocities = new Float32Array(dustCount * 3);
    
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 150;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 120;
      
      dustVelocities[i * 3] = (Math.random() - 0.5) * 0.001;
      dustVelocities[i * 3 + 1] = Math.random() * 0.002 + 0.0005;
      dustVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
      
      // Subtle, ethereal colors
      const intensity = 0.3 + Math.random() * 0.4;
      dustColors[i * 3] = intensity * (0.4 + Math.random() * 0.3);
      dustColors[i * 3 + 1] = intensity * (0.6 + Math.random() * 0.4);
      dustColors[i * 3 + 2] = intensity;
      
      dustSizes[i] = Math.random() * 0.8 + 0.2;
    }
    
    return {
      main: { 
        positions: mainPositions, 
        colors: mainColors, 
        sizes: mainSizes, 
        velocities: mainVelocities,
        count: mainCount 
      },
      focal: { 
        positions: focalPositions, 
        colors: focalColors, 
        sizes: focalSizes, 
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
    
    // Animate main particles with gentle drift
    if (mainParticlesRef.current) {
      const positions = mainParticlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleData.main.count; i++) {
        const i3 = i * 3;
        
        // Apply velocities
        positions[i3] += particleData.main.velocities[i3];
        positions[i3 + 1] += particleData.main.velocities[i3 + 1];
        positions[i3 + 2] += particleData.main.velocities[i3 + 2];
        
        // Add floating motion
        const floatFreq = time * 0.01 + i * 0.001;
        positions[i3] += Math.sin(floatFreq) * 0.002;
        positions[i3 + 1] += Math.cos(floatFreq * 0.7) * 0.001;
        positions[i3 + 2] += Math.sin(floatFreq * 1.3) * 0.002;
        
        // Reset particles that drift too far
        if (positions[i3 + 1] > 40) {
          positions[i3 + 1] = -40;
          positions[i3] = (Math.random() - 0.5) * 120;
          positions[i3 + 2] = (Math.random() - 0.5) * 100;
        }
      }
      
      mainParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Global rotation for main field
      mainParticlesRef.current.rotation.x = Math.sin(time * 0.02) * 0.03;
      mainParticlesRef.current.rotation.y = time * 0.005;
    }
    
    // Animate focal cluster with energy
    if (focalParticlesRef.current) {
      focalParticlesRef.current.rotation.x = Math.sin(time * 0.06) * 0.12;
      focalParticlesRef.current.rotation.y = time * 0.02;
      focalParticlesRef.current.rotation.z = Math.sin(time * 0.04) * 0.08;
      
      // Pulsing scale effect
      const scale = 1 + Math.sin(time * 0.8) * 0.05;
      focalParticlesRef.current.scale.setScalar(scale);
    }
    
    // Animate dust with gentle movement
    if (dustParticlesRef.current) {
      const positions = dustParticlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleData.dust.count; i++) {
        const i3 = i * 3;
        
        positions[i3] += particleData.dust.velocities[i3];
        positions[i3 + 1] += particleData.dust.velocities[i3 + 1];
        positions[i3 + 2] += particleData.dust.velocities[i3 + 2];
        
        // Subtle floating
        const floatFreq = time * 0.008 + i * 0.002;
        positions[i3] += Math.sin(floatFreq) * 0.001;
        positions[i3 + 1] += Math.cos(floatFreq * 0.9) * 0.0008;
        positions[i3 + 2] += Math.sin(floatFreq * 1.1) * 0.001;
        
        // Reset dust particles
        if (positions[i3 + 1] > 50) {
          positions[i3 + 1] = -50;
          positions[i3] = (Math.random() - 0.5) * 150;
          positions[i3 + 2] = (Math.random() - 0.5) * 120;
        }
      }
      
      dustParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      dustParticlesRef.current.rotation.y = time * 0.003;
    }
  });
  
  return (
    <>
      {/* Main starfield */}
      <points ref={mainParticlesRef}>
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
        <pointsMaterial
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      {/* Focal energy cluster */}
      <points ref={focalParticlesRef}>
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
        </bufferGeometry>
        <pointsMaterial
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      {/* Atmospheric dust */}
      <points ref={dustParticlesRef}>
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
        <pointsMaterial
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}