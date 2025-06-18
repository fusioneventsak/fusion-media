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
    // Position camera closer to see particles better
    camera.position.set(0, 0, 5);
    camera.fov = 75;
    camera.near = 0.1;
    camera.far = 1000;
    camera.updateProjectionMatrix();
  }, [camera]);
  
  useFrame(() => {
    // Gentle camera movement based on scroll
    camera.position.y = -scrollY * 0.001;
    camera.position.x = Math.sin(scrollY * 0.0005) * 0.5;
  });
  
  return (
    <>
      {/* Enhanced lighting setup for particle visibility */}
      <ambientLight intensity={0.3} color="#ffffff" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.5} 
        color="#ffffff"
      />
      <pointLight 
        position={[0, 0, 0]} 
        intensity={0.4} 
        color="#ffffff" 
        distance={50}
      />
      <pointLight 
        position={[10, 10, 10]} 
        intensity={0.3} 
        color="#4080ff" 
        distance={30}
      />
      <pointLight 
        position={[-10, -10, -10]} 
        intensity={0.3} 
        color="#ff6b6b" 
        distance={30}
      />
      <pointLight 
        position={[0, 10, -10]} 
        intensity={0.3} 
        color="#00ffff" 
        distance={30}
      />
      
      <ParticleField scrollY={scrollY} />
      
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate={true}
        autoRotateSpeed={0.1}
        dampingFactor={0.05}
        enableDamping={true}
      />
    </>
  );
}