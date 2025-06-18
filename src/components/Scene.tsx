import React, { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import ParticleField from './ParticleField';

interface SceneProps {
  scrollY: number;
  currentPage: string;
}

export default function Scene({ scrollY, currentPage }: SceneProps) {
  const { camera, gl, scene } = useThree();
  
  useEffect(() => {
    // Debug camera setup
    camera.position.set(0, 0, 3); // Very close to origin
    camera.fov = 75;
    camera.near = 0.01;
    camera.far = 1000;
    camera.updateProjectionMatrix();
    
    // Debug renderer settings
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.5; // Brighter exposure
    
    console.log('🎥 Camera setup:', {
      position: camera.position,
      fov: camera.fov,
      near: camera.near,
      far: camera.far
    });
    
    console.log('🎬 Scene info:', {
      children: scene.children.length,
      renderer: gl.capabilities
    });
  }, [camera, gl, scene]);
  
  useFrame(() => {
    // Minimal camera movement
    camera.position.y = -scrollY * 0.0005;
  });
  
  return (
    <>
      {/* MAXIMUM LIGHTING - if you can't see particles now, it's not a lighting issue */}
      <ambientLight intensity={2.0} color="#ffffff" />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={2.0} 
        color="#ffffff"
      />
      <directionalLight 
        position={[-5, -5, -5]} 
        intensity={1.0} 
        color="#ffffff"
      />
      <pointLight 
        position={[0, 0, 0]} 
        intensity={2.0} 
        color="#ffffff" 
        distance={50}
      />
      <pointLight 
        position={[2, 2, 2]} 
        intensity={1.5} 
        color="#4080ff" 
        distance={20}
      />
      <pointLight 
        position={[-2, -2, -2]} 
        intensity={1.5} 
        color="#ff6b6b" 
        distance={20}
      />
      <pointLight 
        position={[0, 2, -2]} 
        intensity={1.5} 
        color="#00ffff" 
        distance={20}
      />
      
      {/* Debug: A bright reference object at camera position */}
      <mesh position={[0, 0, 2.5]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#ff00ff" />
      </mesh>
      
      <ParticleField scrollY={scrollY} />
      
      {/* Disable controls temporarily to avoid interference */}
      <OrbitControls 
        enabled={false}
      />
    </>
  );
}