import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create particles as individual meshes (same method as the working shapes)
  const particles = useMemo(() => {
    const particleArray = [];
    const count = 50; // Start with fewer for performance
    
    for (let i = 0; i < count; i++) {
      particleArray.push({
        id: i,
        position: [
          (Math.random() - 0.5) * 4,  // x: -2 to 2
          (Math.random() - 0.5) * 4,  // y: -2 to 2
          (Math.random() - 0.5) * 4   // z: -2 to 2
        ] as [number, number, number],
        color: [
          '#ffffff', '#ff6b6b', '#4ecdc4', '#45b7d1', 
          '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8'
        ][Math.floor(Math.random() * 8)],
        size: Math.random() * 0.05 + 0.02, // 0.02 to 0.07
        speed: Math.random() * 2 + 1
      });
    }
    
    console.log('🌟 Created', count, 'mesh particles');
    return particleArray;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Rotate the entire particle group
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Render each particle as a small mesh (same as the working shapes) */}
      {particles.map((particle) => (
        <mesh 
          key={particle.id} 
          position={particle.position}
          scale={[particle.size, particle.size, particle.size]}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial 
            color={particle.color} 
            transparent 
            opacity={0.8}
          />
        </mesh>
      ))}
      
      {/* Test: A few extra visible particles in specific positions */}
      <mesh position={[0, 0, 1]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
      
      <mesh position={[0.5, 0.5, 1]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#ff00ff" />
      </mesh>
      
      <mesh position={[-0.5, -0.5, 1]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>
      
      {/* Debug log */}
      <mesh position={[0, 0, 0]} visible={false}>
        <boxGeometry args={[0.01, 0.01, 0.01]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  );
}