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
    
    // Disable antialiasing for particles specifically
    const context = gl.getContext();
    context.disable(context.SAMPLE_ALPHA_TO_COVERAGE);
    
    console.log('🔍 Camera positioned exactly like reference');
  }, [camera, gl]);
  
  useFrame(() => {
    // SLOWER CAMERA MOVEMENT - reduced by 5x
    const time = Date.now() * 0.0001; // Was 0.0005, now 0.0001
    camera.position.x = Math.cos(time) * 15;
    camera.position.z = Math.sin(time) * 15;
    camera.position.y = 3 + Math.sin(time * 0.5) * 1;
    camera.lookAt(0, 0, 0);
  });
  
  return (
    <>
      {/* EXACT LIGHTING FROM YOUR REFERENCE */}
      <ambientLight intensity={0.4} color="#ffffff" />
      
      {/* Multiple directional lights for even coverage */}
      <directionalLight position={[5, 10, 5]} intensity={0.5} color="#ffffff" />
      <directionalLight position={[-5, 8, -5]} intensity={0.4} color="#ffffff" />
      <directionalLight position={[0, 12, -8]} intensity={0.3} color="#ffffff" />
      
      {/* Point lights for localized brightness */}
      <pointLight position={[0, 6, 0]} intensity={0.3} color="#ffffff" distance={20} />
      <pointLight position={[8, 4, 0]} intensity={0.2} color="#ffffff" distance={12} />
      <pointLight position={[-8, 4, 0]} intensity={0.2} color="#ffffff" distance={12} />
      
      {/* Bright particle field with scroll effects */}
      <ParticleField />
    </>
  );
}