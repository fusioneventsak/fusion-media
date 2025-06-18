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
    // FIXED CAMERA POSITION FOR SHARP FOCUS
    camera.position.set(0, 0, 10); // Fixed at 10 units back
    camera.fov = 45; // Narrow FOV for minimal distortion
    camera.near = 8; // Start focus at 8 units
    camera.far = 12; // End focus at 12 units (particles at 9-11 units)
    camera.updateProjectionMatrix();
    
    // Lock camera to look at center
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
    
    // DISABLE ALL BLUR-CAUSING FEATURES
    gl.setClearColor('#000000', 1); // Solid black background
    gl.setPixelRatio(window.devicePixelRatio); // Use device pixel ratio
    gl.antialias = true; // Enable antialiasing for smooth edges
    
    // NO tone mapping or color space changes
    gl.toneMapping = THREE.NoToneMapping;
    gl.outputColorSpace = THREE.LinearSRGBColorSpace;
    
    // Disable fog completely
    scene.fog = null;
    
    console.log('🎯 LOCKED CAMERA FOR MAXIMUM SHARPNESS');
    console.log('Camera Z:', camera.position.z, 'Near:', camera.near, 'Far:', camera.far);
  }, [camera, gl, scene]);
  
  useFrame(() => {
    // CAMERA STAYS COMPLETELY STILL - NO MOVEMENT TO MAINTAIN FOCUS
    // Only allow minimal scroll movement
    const scrollOffset = scrollY * 0.0002;
    camera.position.y = scrollOffset;
    
    // Always look at center
    camera.lookAt(0, scrollOffset, 0);
  });
  
  return (
    <>
      {/* MINIMAL LIGHTING TO AVOID BLUR */}
      <ambientLight intensity={0.3} />
      
      {/* Sharp particle field */}
      <ParticleField scrollY={scrollY} />
      
      {/* Test cube to verify sharpness */}
      <mesh position={[3, 0, 0]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
    </>
  );
}import React, { useEffect } from 'react';
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