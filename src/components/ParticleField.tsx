import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  
  // Create sharp star texture programmatically
  const starTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    
    // Create a radial gradient for sharp star points
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
  
  // Create optimized particle system
  const { positions, colors, sizes } = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    // Beautiful star colors - mostly white with some variety
    const starColors = [
      new THREE.Color('#ffffff'), // Pure white (most common)
      new THREE.Color('#ffffff'), // Pure white
      new THREE.Color('#ffffff'), // Pure white
      new THREE.Color('#fffef7'), // Very slight warm white
      new THREE.Color('#f8f8ff'), // Very slight cool white
      new THREE.Color('#e6f3ff'), // Subtle blue tint
      new THREE.Color('#fff5e6'), // Subtle warm tint
    ];
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Create a more natural star field distribution
      if (Math.random() < 0.7) {
        // Main galaxy plane - wider distribution
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.pow(Math.random(), 0.5) * 25; // Concentration toward center
        const spiralOffset = radius * 0.2;
        
        positions[i3] = Math.cos(angle + spiralOffset) * radius;
        positions[i3 + 1] = (Math.random() - 0.5) * 6; // Flatter galaxy
        positions[i3 + 2] = Math.sin(angle + spiralOffset) * radius;
      } else {
        // Foreground stars - closer and scattered
        positions[i3] = (Math.random() - 0.5) * 15;
        positions[i3 + 1] = (Math.random() - 0.5) * 10;
        positions[i3 + 2] = (Math.random() - 0.5) * 10;
      }
      
      // Assign colors (mostly white)
      const colorIndex = Math.floor(Math.random() * starColors.length);
      const color = starColors[colorIndex];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      // Variable star sizes - mostly small with occasional bright stars
      sizes[i] = Math.random() < 0.03 ? 
        Math.random() * 3 + 2 :  // Bright stars
        Math.random() * 1.5 + 0.5; // Normal stars
    }
    
    console.log('✨ Created crisp star field with', count, 'stars');
    return { positions, colors, sizes };
  }, []);
  
  useFrame((state) => {
    if (pointsRef.current && materialRef.current) {
      // Very subtle rotation
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.008;
      
      // Smooth scroll movement
      const scrollFactor = scrollY * 0.001;
      pointsRef.current.position.y = scrollFactor;
      pointsRef.current.position.x = Math.sin(scrollFactor * 0.1) * 0.5;
      
      // Subtle twinkling effect
      materialRef.current.opacity = 0.9 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        map={starTexture}
        size={1.5}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.9}
        alphaTest={0.001}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        fog={false}
      />
    </points>
  );
}