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
    // DEAD SIMPLE CAMERA - CANNOT CAUSE BLUR
    camera.position.set(0, 0, 3);  // Close to particles
    camera.fov = 75;               // Standard FOV
    camera.near = 0.1;             // Standard near
    camera.far = 1000;             // Standard far
    camera.updateProjectionMatrix();
    
    // Look straight ahead
    camera.lookAt(0, 0, 0);
    
    // SIMPLEST RENDERER SETTINGS
    gl.setClearColor('#000000', 1);
    
    console.log('📷 SIMPLE camera at Z=3, particles at Z=0 to -2');
  }, [camera, gl, scene]);
  
  useFrame(() => {
    // NO CAMERA MOVEMENT AT ALL
    // Camera stays locked at (0, 0, 3)
  });
  
  return (
    <>
      {/* BRIGHT lighting so we can see everything clearly */}
      <ambientLight intensity={1} />
      
      {/* Particle field */}
      <ParticleField scrollY={scrollY} />
    </>
  );
}