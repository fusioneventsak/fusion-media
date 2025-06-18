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
    // PERFECT FOCUS CAMERA SETTINGS
    camera.position.set(0, 0, 8);   // Close enough for sharp focus
    camera.fov = 50;                // Narrow FOV reduces distortion
    camera.near = 0.1;              
    camera.far = 50;                // Shorter far plane
    camera.focus = 8;               // Focus distance matches camera Z position
    camera.updateProjectionMatrix();
    
    // CRYSTAL CLEAR RENDERER SETTINGS
    gl.setClearColor('#000000', 1);
    gl.setPixelRatio(1);            // Force 1:1 pixel ratio for sharpness
    gl.antialias = false;           // Disable antialiasing that can cause blur
    
    console.log('🔍 Camera focused at Z=8, particles at Z=0');
  }, [camera, gl]);
  
  useFrame(() => {
    // CAMERA LOCKED IN POSITION - NO MOVEMENT
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);
  });
  
  return (
    <>
      {/* BRIGHT, DIRECT LIGHTING */}
      <ambientLight intensity={2.0} />
      
      {/* Sharp particle field */}
      <ParticleField scrollY={scrollY} />
    </>
  );
}