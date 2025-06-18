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
    // Set up camera - even closer with sharper focus
    camera.position.set(0, 0, 2); // Much closer
    camera.fov = 60; // Narrower field of view for less distortion
    camera.near = 0.1;
    camera.far = 100; // Reduced far plane
    camera.updateProjectionMatrix();
    
    // Look directly at the center
    camera.lookAt(0, 0, 0);
    
    // Ensure the camera updates
    camera.updateMatrixWorld();
    
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
      
      {/* Test objects - positioned very close to camera for sharp focus */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
      
      <mesh position={[0.5, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#00ff00" />
      </mesh>
      
      <mesh position={[-0.5, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.2, 8]} />
        <meshBasicMaterial color="#0000ff" />
      </mesh>
      
      {/* Additional test objects at different depths */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
      
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#ff00ff" />
      </mesh>
      
      <ParticleField scrollY={scrollY} />
    </>
  );
}