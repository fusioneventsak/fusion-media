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
    // Perfect camera setup for crisp stars
    camera.position.set(0, 0, 5);
    camera.fov = 75;
    camera.near = 0.1;
    camera.far = 200;
    camera.updateProjectionMatrix();
    
    // Look at origin
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
    
    // Renderer optimizations for crisp particles
    gl.setClearColor('#000000', 0); // Fully transparent
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Disable fog to prevent greyness
    scene.fog = null;
    
    console.log('✨ Crisp star field scene ready');
  }, [camera, gl, scene]);
  
  useFrame((state) => {
    // Gentle camera movement based on scroll
    const targetY = -scrollY * 0.001;
    const targetX = Math.sin(scrollY * 0.0002) * 0.3;
    
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.x += (targetX - camera.position.x) * 0.05;
  });
  
  return (
    <>
      {/* No lighting needed for stars - they emit their own light */}
      
      {/* Main crisp star field */}
      <ParticleField scrollY={scrollY} />
      
      {/* Subtle distant nebula - very transparent */}
      <mesh position={[20, 8, -30]} scale={[12, 6, 12]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color="#1a0d4a" 
          transparent 
          opacity={0.03}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      
      <mesh position={[-18, -6, -35]} scale={[8, 4, 8]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color="#0d1a4a" 
          transparent 
          opacity={0.02}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}