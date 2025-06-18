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
    // Set up camera - much closer for sharp focus
    camera.position.set(0, 0, 3);
    camera.fov = 75;
    camera.near = 0.1;
    camera.far = 1000;
    camera.updateProjectionMatrix();
    
    // Look at the center
    camera.lookAt(0, 0, 0);
    
    // Set up renderer
    gl.setClearColor('#000000', 0); // Transparent background
    
    console.log('🎥 Scene setup complete:', {
      camera: camera.position,
      renderer: gl.domElement,
      sceneChildren: scene.children.length
    });
  }, [camera, gl, scene]);
  
  useFrame(() => {
    // Minimal camera movement
    camera.position.y = -scrollY * 0.0005;
  });
  
  return (
    <>
      {/* Maximum lighting */}
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} />
      <pointLight position={[0, 0, 5]} intensity={0.5} />
      
      {/* Test objects to confirm 3D is working - positioned closer */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
      
      <mesh position={[0.8, 0, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#00ff00" />
      </mesh>
      
      <mesh position={[-0.8, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 8]} />
        <meshBasicMaterial color="#0000ff" />
      </mesh>
      
      <ParticleField scrollY={scrollY} />
    </>
  );
}