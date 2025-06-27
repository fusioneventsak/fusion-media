import React, { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import ParticleField from './ParticleField';

interface SceneProps {
  currentPage: string;
}

export default function Scene({ currentPage }: SceneProps) {
  const { camera, gl } = useThree();
  
  useEffect(() => {
    // EXACT CAMERA SETTINGS FROM YOUR REFERENCE
    camera.position.set(15, 3, 15);
    camera.fov = 45;
    camera.near = 0.1;
    camera.far = 200;
    camera.updateProjectionMatrix();
    
    // CRITICAL RENDERER SETTINGS FOR SHARP PARTICLES
    gl.setClearColor('#000000', 1);
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // iOS-specific optimizations
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      // Reduce pixel ratio for iOS to improve performance
      gl.setPixelRatio(1);
      
      // Disable expensive features on iOS
      gl.shadowMap.enabled = false;
      gl.antialias = false;
      
      // Set lower precision for mobile
      gl.getContext().getExtension('OES_standard_derivatives');
    }
    
    // Disable antialiasing for particles specifically
    const context = gl.getContext();
    context.disable(context.SAMPLE_ALPHA_TO_COVERAGE);
    
    console.log('🔍 Camera positioned with iOS optimizations');
  }, [camera, gl]);
  
  useFrame(() => {
    // MUCH SLOWER CAMERA MOVEMENT for iOS - reduced by 10x
    const time = Date.now() * 0.00005; // Was 0.0001, now 0.00005 for smoother iOS
    camera.position.x = Math.cos(time) * 15;
    camera.position.z = Math.sin(time) * 15;
    camera.position.y = 3 + Math.sin(time * 0.5) * 1;
    camera.lookAt(0, 0, 0);
  });
  
  return (
    <>
      {/* REDUCED LIGHTING FOR iOS PERFORMANCE */}
      <ambientLight intensity={0.3} color="#ffffff" />
      
      {/* Fewer directional lights for mobile */}
      <directionalLight position={[5, 10, 5]} intensity={0.4} color="#ffffff" />
      <directionalLight position={[-5, 8, -5]} intensity={0.3} color="#ffffff" />
      
      {/* Single point light instead of multiple */}
      <pointLight position={[0, 6, 0]} intensity={0.2} color="#ffffff" distance={20} />
      
      {/* Optimized particle field */}
      <ParticleField />
    </>
  );
}