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
    // Optimized camera for maximum particle sharpness
    camera.position.set(0, 0, 8);
    camera.fov = 60; // Narrower FOV for less distortion
    camera.near = 0.1;
    camera.far = 100;
    camera.updateProjectionMatrix();
    
    // Ensure camera is looking directly at center
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
    
    // Renderer settings for crisp pixels
    gl.setClearColor('#000000', 0);
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.antialias = false; // Disable antialiasing for sharper points
    
    // Disable fog completely
    scene.fog = null;
    
    console.log('⭐ Ultra-sharp camera setup complete');
  }, [camera, gl, scene]);
  
  useFrame((state) => {
    // Very minimal camera movement to maintain sharpness
    const targetY = -scrollY * 0.0005;
    camera.position.y += (targetY - camera.position.y) * 0.02;
    
    // Keep camera perfectly focused on center
    camera.lookAt(0, 0, 0);
  });
  
  return (
    <>
      {/* Only the crisp star field - no other elements */}
      <ParticleField scrollY={scrollY} />
    </>
  );
}