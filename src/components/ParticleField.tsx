import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const particlesRef = useRef<THREE.Points>(null);
  
  // ULTRA BRIGHT PARTICLE MATERIAL
  const particleMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: 0xffffff,
      size: 15,                   // MUCH LARGER SIZE
      sizeAttenuation: false,     // NO size attenuation = consistent size
      transparent: true,
      opacity: 1.0,               // FULL OPACITY
      blending: THREE.AdditiveBlending, // Additive blending for maximum brightness
      depthWrite: false,          // Disable depth writing for better blending
      depthTest: false,           // Disable depth testing for maximum visibility
      fog: false,                 // Disable fog effects
      vertexColors: false         // Use material color only
    });
  }, []);
  
  const particleData = useMemo(() => {
    const count = 500;  // Fewer particles but much more visible
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // PARTICLES MUCH CLOSER TO CAMERA
      positions[i * 3] = (Math.random() - 0.5) * 20;     // X: -10 to 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y: -10 to 10  
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z: -5 to 5 (much closer)
    }
    
    console.log('✨ Created 500 BRIGHT particles close to camera');
    return { positions, count };
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      // VERY SLOW ROTATION
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.005) * 0.1;
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