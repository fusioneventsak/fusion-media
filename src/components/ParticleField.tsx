import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create particles DIRECTLY in front of camera - CANNOT be out of focus
  const particles = useMemo(() => {
    const particles = [];
    
    // Create particles at Z = 0 to -2 (right in front of camera at Z=3)
    for (let i = 0; i < 200; i++) {
      const x = (Math.random() - 0.5) * 6;  // -3 to 3
      const y = (Math.random() - 0.5) * 4;  // -2 to 2  
      const z = Math.random() * -2;         // 0 to -2 (in front of camera)
      
      // Different sizes
      let size;
      if (Math.random() < 0.1) {
        size = 0.06; // Larger stars
      } else {
        size = 0.03; // Small stars
      }
      
      particles.push({
        position: [x, y, z],
        size,
        color: Math.random() < 0.8 ? '#ffffff' : '#4a90e2'
      });
    }
    
    console.log('🎯 Particles created RIGHT IN FRONT of camera');
    return particles;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      groupRef.current.position.y = scrollY * 0.0005;
    }
  });
  
  return (
    <group ref={groupRef}>
      {particles.map((particle, i) => (
        <mesh
          key={i}
          position={particle.position as [number, number, number]}
        >
          <sphereGeometry args={[particle.size, 8, 6]} />
          <meshBasicMaterial color={particle.color} />
        </mesh>
      ))}
      
      {/* TEST OBJECTS - These MUST be sharp */}
      <mesh position={[1, 0, -0.5]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
      
      <mesh position={[-1, 0, -1]}>
        <sphereGeometry args={[0.05, 8, 6]} />
        <meshBasicMaterial color="#00ff00" />
      </mesh>
    </group>
  );
}