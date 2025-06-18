import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const particlesRef = useRef<THREE.Points>(null);
  
  // SIMPLE, SHARP PARTICLE MATERIAL - NO COMPLEX SHADERS
  const particleMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });
  }, []);
  
  const particleData = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // CLOSE TO CAMERA - particles between Z=-5 and Z=5
      positions[i * 3] = (Math.random() - 0.5) * 50;     // X: -25 to 25
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50; // Y: -25 to 25  
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z: -5 to 5 (CLOSE!)
      
      // BRIGHT WHITE COLORS - NO COMPLEX COLOR MIXING
      const brightness = 0.7 + Math.random() * 0.3;
      colors[i * 3] = brightness;     // R
      colors[i * 3 + 1] = brightness; // G
      colors[i * 3 + 2] = brightness; // B
    }
    
    console.log('🌟 Created 1000 particles between Z=-5 and Z=5');
    return { positions, colors, count };
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      // VERY SLOW ROTATION - NO JARRING MOVEMENT
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
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
        <bufferAttribute
          attach="attributes-color"
          count={particleData.count}
          array={particleData.colors}
          itemSize={3}
        />
      </bufferGeometry>
    </points>
  );
}