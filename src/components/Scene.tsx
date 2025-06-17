import React, { useEffect } from 'react';
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
    camera.position.z = 6;
  }, [camera]);
  
  useFrame(() => {
    camera.position.y = -scrollY * 0.0015;
  });
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#4169E1" />
      <pointLight position={[0, 10, -10]} intensity={0.6} color="#FF6B6B" />
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#00FFFF" />
      
      <ParticleField scrollY={scrollY} />
      
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate={true}
        autoRotateSpeed={0.2}
      />
    </>
  );
}