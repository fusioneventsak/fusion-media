import React, { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import ParticleField from './ParticleField';

interface SceneProps {
  scrollY: number;
  currentPage: string;
}

export default function Scene({ scrollY, currentPage }: SceneProps) {
  const { camera, gl } = useThree();
  
  useEffect(() => {
    // OPTIMAL CAMERA SETTINGS FOR SHARP PARTICLES
    camera.position.set(0, 0, 5);   // Closer to particles
    camera.fov = 60;                // Wider FOV for better view
    camera.near = 0.1;              
    camera.far = 100;               
    camera.updateProjectionMatrix();
    
    // RENDERER SETTINGS FOR MAXIMUM BRIGHTNESS
    gl.setClearColor('#000000', 1);
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    console.log('🔍 Camera positioned for bright particles');
  }, [camera, gl]);
  
  useFrame(() => {
    // KEEP CAMERA STEADY
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
  });
  
  return (
    <>
      {/* MAXIMUM AMBIENT LIGHTING */}
      <ambientLight intensity={3.0} color="#ffffff" />
      
      {/* Additional point lights for extra brightness */}
      <pointLight position={[10, 10, 10]} intensity={2.0} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={2.0} color="#ffffff" />
      
      {/* Bright particle field */}
      <ParticleField scrollY={scrollY} />
    </>
  );
}