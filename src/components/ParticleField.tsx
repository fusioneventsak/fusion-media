import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  
  // Create optimized particle system using Points geometry
  const { positions, colors, sizes } = useMemo(() => {
    const count = 2000; // Many more particles for Milky Way effect
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    // Milky Way colors - blues, purples, whites, and subtle pinks
    const starColors = [
      new THREE.Color('#ffffff'), // Bright white stars
      new THREE.Color('#e8f4ff'), // Slightly blue white
      new THREE.Color('#fff8e1'), // Warm white
      new THREE.Color('#e3f2fd'), // Light blue
      new THREE.Color('#f3e5f5'), // Light purple
      new THREE.Color('#fce4ec'), // Light pink
      new THREE.Color('#e0f2f1'), // Light cyan
    ];
    
    for (let i = 0; i < count; i++) {
      // Create galaxy-like distribution
      const i3 = i * 3;
      
      // Use spiral galaxy distribution
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 15 + 5; // 5 to 20 units from center
      const spiralFactor = radius * 0.3; // Creates spiral arms
      
      // Main galaxy disk
      positions[i3] = Math.cos(angle + spiralFactor) * radius + (Math.random() - 0.5) * 4;
      positions[i3 + 1] = (Math.random() - 0.5) * 4; // Thinner on Y axis
      positions[i3 + 2] = Math.sin(angle + spiralFactor) * radius + (Math.random() - 0.5) * 4;
      
      // Add some stars closer to camera for depth
      if (Math.random() < 0.1) {
        positions[i3] = (Math.random() - 0.5) * 8;
        positions[i3 + 1] = (Math.random() - 0.5) * 8;
        positions[i3 + 2] = (Math.random() - 0.5) * 8;
      }
      
      // Assign colors
      const colorIndex = Math.floor(Math.random() * starColors.length);
      const color = starColors[colorIndex];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      // Vary sizes - some bright stars, mostly small ones
      sizes[i] = Math.random() < 0.05 ? Math.random() * 8 + 4 : Math.random() * 3 + 1;
    }
    
    console.log('🌌 Created Milky Way with', count, 'stars');
    return { positions, colors, sizes };
  }, []);
  
  useFrame((state) => {
    if (pointsRef.current && materialRef.current) {
      // Slow rotation for galaxy effect
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.z = state.clock.elapsedTime * 0.01;
      
      // Scroll-based movement - move the entire galaxy
      pointsRef.current.position.y = scrollY * 0.001;
      pointsRef.current.position.x = Math.sin(scrollY * 0.0001) * 2;
      
      // Subtle breathing effect for stars
      materialRef.current.size = 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      
      // Opacity variation for twinkling
      materialRef.current.opacity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
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
        size={2}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}