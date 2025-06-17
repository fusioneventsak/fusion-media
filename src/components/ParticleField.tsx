import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const focalPointRef = useRef<THREE.Points>(null);
  
  // Main particle system - Milky Way-like starfield
  const mainParticles = useMemo(() => {
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      // More spread throughout the canvas
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      
      // Color variance - blues, cyans, purples, and whites like stars
      const colorType = Math.random();
      if (colorType < 0.25) {
        // Cyan tones - like hot blue stars
        colors[i * 3] = 0.1 + Math.random() * 0.2; // R
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.3; // G
        colors[i * 3 + 2] = 1; // B
      } else if (colorType < 0.5) {
        // Blue tones - like main sequence stars
        colors[i * 3] = 0.05 + Math.random() * 0.25; // R
        colors[i * 3 + 1] = 0.3 + Math.random() * 0.4; // G
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
      } else if (colorType < 0.75) {
        // Purple/violet tones - like distant stars
        colors[i * 3] = 0.4 + Math.random() * 0.3; // R
        colors[i * 3 + 1] = 0.1 + Math.random() * 0.3; // G
        colors[i * 3 + 2] = 0.7 + Math.random() * 0.3; // B
      } else {
        // White/light tones - like bright stars
        colors[i * 3] = 0.8 + Math.random() * 0.2; // R
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2; // G
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1; // B
      }
      
      // Much smaller sizes - like distant stars
      sizes[i] = Math.random() * 0.003 + 0.001;
    }
    
    return { positions, colors, sizes, count: particleCount };
  }, []);
  
  // Focal point - denser star cluster like galactic center
  const focalParticles = useMemo(() => {
    const particleCount = 1200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      // Concentrated around center with some spread - like galactic core
      const radius = Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Brighter, more vibrant colors for galactic center
      const colorType = Math.random();
      if (colorType < 0.3) {
        // Bright cyan - like young hot stars
        colors[i * 3] = 0.05; // R
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2; // G
        colors[i * 3 + 2] = 1; // B
      } else if (colorType < 0.6) {
        // Electric blue - like massive stars
        colors[i * 3] = 0.1 + Math.random() * 0.2; // R
        colors[i * 3 + 1] = 0.5 + Math.random() * 0.4; // G
        colors[i * 3 + 2] = 1; // B
      } else if (colorType < 0.8) {
        // Purple/magenta - like nebula colors
        colors[i * 3] = 0.6 + Math.random() * 0.3; // R
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.3; // G
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1; // B
      } else {
        // Bright white - like supergiants
        colors[i * 3] = 0.9 + Math.random() * 0.1; // R
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1; // G
        colors[i * 3 + 2] = 1; // B
      }
      
      // Slightly larger sizes for focal point but still star-like
      sizes[i] = Math.random() * 0.006 + 0.002;
    }
    
    return { positions, colors, sizes, count: particleCount };
  }, []);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.08;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
    
    if (focalPointRef.current) {
      focalPointRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.15;
      focalPointRef.current.rotation.y = state.clock.elapsedTime * 0.06;
      focalPointRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.1;
    }
  });
  
  return (
    <>
      {/* Main starfield */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={mainParticles.count}
            array={mainParticles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={mainParticles.count}
            array={mainParticles.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={mainParticles.count}
            array={mainParticles.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Galactic center cluster */}
      <points ref={focalPointRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={focalParticles.count}
            array={focalParticles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={focalParticles.count}
            array={focalParticles.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={focalParticles.count}
            array={focalParticles.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}