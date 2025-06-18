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
    camera.position.set(0, 0, 10);  // Far enough to see particles clearly
    camera.fov = 60;                // Narrower FOV for less distortion
    camera.near = 0.1;              // Standard near plane
    camera.far = 100;               // Shorter far plane
    camera.updateProjectionMatrix();
    
    // SHARP RENDERER SETTINGS
    gl.setClearColor('#000000', 1);
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio
    
    console.log('📷 Camera at Z=10, particles at Z=-5 to Z=5');
  }, [camera, gl]);
  
  useFrame(() => {
    // CAMERA STAYS COMPLETELY STILL
    // No movement = no blur from motion
  });
  
  return (
    <>
      {/* BRIGHT LIGHTING */}
      <ambientLight intensity={1.5} />
      
      {/* Simple particle field */}
      <ParticleField scrollY={scrollY} />
    </>
  );
}