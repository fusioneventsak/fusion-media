import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  // Test: Simple mesh to confirm 3D is working
  const testMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({ 
      color: '#ff0000',
      transparent: true,
      opacity: 0.8 
    });
  }, []);

  // Super simple particle material
  const particleMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: '#ffffff',
      size: 0.1,
      sizeAttenuation: false, // No distance attenuation
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending
    });
  }, []);

  // Simple particle positions
  const particleData = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 5;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5; // z
    }
    
    console.log('🌟 Created', count, 'particles');
    return { positions, count };
  }, []);
  
  useFrame((state) => {
    // Rotate test mesh
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
    
    // Rotate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  
  console.log('🎬 ParticleField rendering');
  
  return (
    <group>
      {/* Test: Red cube to confirm 3D is working */}
      <mesh ref={meshRef} position={[2, 0, 0]} material={testMaterial}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
      </mesh>
      
      {/* Test: Green cube that's always visible */}
      <mesh position={[-2, 0, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshBasicMaterial color="#00ff00" />
      </mesh>
      
      {/* Test: Blue sphere */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#0000ff" />
      </mesh>
      
      {/* Simple particles */}
      <points ref={particlesRef} material={particleMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleData.count}
            array={particleData.positions}
            itemSize={3}
          />
        </bufferGeometry>
      </points>
      
      {/* Debug: Log that we're rendering */}
      <mesh position={[0, 0, 0]} visible={false}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  );
}