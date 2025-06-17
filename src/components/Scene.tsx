import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ParticleField from './ParticleField';

interface SceneProps {
  scrollY: number;
  currentPage: string;
}

export default function Scene({ scrollY, currentPage }: SceneProps) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.z = 15;
    camera.position.y = 0;
    camera.position.x = 0;
  }, [camera]);
  
  useFrame((state) => {
    // Gentle camera movement based on scroll
    const targetY = -scrollY * 0.0005;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    
    // Subtle scene rotation for ambient movement
    camera.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.002;
  });
  
  return (
    <>
      {/* Minimal lighting for particle visibility */}
      <ambientLight intensity={0.1} color="#1a1a2e" />
      <pointLight position={[0, 0, 0]} intensity={0.2} color="#4A90E2" />
      
      {/* Pure particle field background */}
      <ParticleField />
      
      {/* Gentle auto-rotation when on home page */}
      <OrbitControls 
        enablePan={false} 
        enableZoom={false}
        enableRotate={false}
        autoRotate={currentPage === 'home'}
        autoRotateSpeed={0.1}
      />
    </>
  );
}