import React, { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import ParticleField from './ParticleField';

interface SceneProps {
  scrollY: number;
  currentPage: string;
}

export default function Scene({ scrollY, currentPage }: SceneProps) {
  const { camera, gl, scene } = useThree();
  
  useEffect(() => {
    // Optimized camera setup for particle visibility
    camera.position.set(0, 0, 10);
    camera.fov = 75;
    camera.near = 0.1;
    camera.far = 1000;
    camera.updateProjectionMatrix();
    
    // Look at origin
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
    
    // Renderer optimizations
    gl.setClearColor('#000000', 0);
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    console.log('🎥 Milky Way scene setup complete');
  }, [camera, gl]);
  
  useFrame((state) => {
    // Smooth camera movement based on scroll
    const targetY = -scrollY * 0.002;
    const targetX = Math.sin(scrollY * 0.0003) * 1;
    
    camera.position.y += (targetY - camera.position.y) * 0.1;
    camera.position.x += (targetX - camera.position.x) * 0.1;
    
    // Slight rotation for immersion
    camera.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
  });
  
  return (
    <>
      {/* Minimal lighting for particles */}
      <ambientLight intensity={0.3} />
      
      {/* Main particle field */}
      <ParticleField scrollY={scrollY} />
      
      {/* Optional: Add some larger "nebula" effects */}
      <mesh position={[15, 5, -20]} scale={[8, 4, 8]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color="#4a148c" 
          transparent 
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <mesh position={[-12, -8, -25]} scale={[6, 3, 6]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color="#1a237e" 
          transparent 
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Distant background stars */}
      <mesh position={[0, 0, -50]}>
        <sphereGeometry args={[50, 32, 32]} />
        <meshBasicMaterial 
          color="#0a0a0a"
          side={THREE.BackSide}
          transparent
          opacity={0.3}
        />
      </mesh>
    </>
  );
}