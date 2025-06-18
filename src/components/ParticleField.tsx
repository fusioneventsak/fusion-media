import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create particles positioned in SHARP FOCUS ZONE (2-6 units from camera)
  const particles = useMemo(() => {
    const count = 300;
    const particles = [];
    
    for (let i = 0; i < count; i++) {
      // Position ALL particles in the sharp focus zone (2-6 units from camera at z=10)
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 4 + 1; // 1-5 radius
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 3; // -1.5 to 1.5
      const z = (Math.random() - 0.5) * 2; // -1 to 1 (close to camera plane)
      
      // Size categories
      let size;
      if (Math.random() < 0.05) {
        size = 0.15; // Large bright stars
      } else if (Math.random() < 0.2) {
        size = 0.08; // Medium stars
      } else {
        size = 0.04; // Small stars
      }
      
      // Milky Way colors
      const colors = [
        '#ffffff', '#ffffff', '#ffffff', // Mostly white
        '#fff8e1', '#e8f4ff', 
        '#ff6b47', '#4a90e2', '#9b59b6'
      ];
      
      particles.push({
        position: [x, y, z],
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        originalSize: size,
        phase: Math.random() * Math.PI * 2
      });
    }
    
    console.log('⭐ Created SHARP FOCUS particles in zone 2-6 units');
    return particles;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Minimal rotation to keep particles in focus
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      
      // Gentle scroll movement
      groupRef.current.position.y = scrollY * 0.001;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Render each particle as individual mesh for guaranteed sharpness */}
      {particles.map((particle, i) => (
        <mesh
          key={i}
          position={particle.position as [number, number, number]}
          scale={[particle.size, particle.size, particle.size]}
        >
          <sphereGeometry args={[1, 12, 8]} />
          <meshBasicMaterial 
            color={particle.color}
            transparent={false}
            fog={false}
          />
        </mesh>
      ))}
      
      {/* Add a few larger prominent stars for depth */}
      <mesh position={[2, 1, 0]} scale={[0.2, 0.2, 0.2]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshBasicMaterial color="#4a90e2" />
      </mesh>
      
      <mesh position={[-1.5, -0.8, 0.5]} scale={[0.18, 0.18, 0.18]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshBasicMaterial color="#ff6b47" />
      </mesh>
      
      <mesh position={[0.5, 2, -0.3]} scale={[0.16, 0.16, 0.16]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshBasicMaterial color="#9b59b6" />
      </mesh>
    </group>
  );
}