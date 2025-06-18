import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const particlesRef = useRef<THREE.Points>(null);
  
  // CRYSTAL CLEAR PARTICLE MATERIAL
  const particleMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: 0xffffff,
      size: 8,                    // Much larger size for visibility
      sizeAttenuation: false,     // NO size attenuation = consistent size
      transparent: true,
      opacity: 0.8,               // Slightly transparent for better blending
      blending: THREE.AdditiveBlending, // Additive blending for glow effect
      depthWrite: true,           // Enable depth writing for proper rendering
      depthTest: true,            // Enable depth testing
      fog: false                  // Disable fog effects
    });
  }, []);
  
  const particleData = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // PARTICLES AT EXACT SAME DEPTH - NO DEPTH VARIATION
      positions[i * 3] = (Math.random() - 0.5) * 40;     // X: -20 to 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // Y: -20 to 20  
      positions[i * 3 + 2] = 0;                           // Z: EXACTLY 0 (same focal plane)
    }
    
    console.log('✨ Created 800 particles at Z=0 (same focal plane)');
    return { positions, count };
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      // EXTREMELY SLOW ROTATION
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.005;
    }
  });
  
  return (
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
  );
}