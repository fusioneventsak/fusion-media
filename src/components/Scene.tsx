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
    // Optimal camera position for Milky Way viewing
    camera.position.set(0, 3, 18); // Further back for wide galaxy view
    camera.fov = 50; // Narrower FOV for less distortion and better focus
    camera.near = 0.1;
    camera.far = 200;
    camera.updateProjectionMatrix();
    
    // Look slightly down at the galaxy center
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
    
    // Renderer optimizations for crisp particles
    gl.shadowMap.enabled = false; // Disable shadows for better performance
    gl.setClearColor('#000000', 0);
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Enhanced tone mapping for beautiful star colors
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
    gl.outputColorSpace = THREE.SRGBColorSpace;
    
    console.log('🌌 Perfect Milky Way camera setup');
  }, [camera, gl, scene]);
  
  useFrame((state) => {
    // Gentle camera movement that maintains focus
    const targetY = 3 + (-scrollY * 0.003);
    const targetX = Math.sin(scrollY * 0.0004) * 2;
    const targetZ = 18 + Math.cos(scrollY * 0.0002) * 3;
    
    // Smooth interpolation to prevent jarring movements
    camera.position.y += (targetY - camera.position.y) * 0.02;
    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.z += (targetZ - camera.position.z) * 0.015;
    
    // Always keep galaxy centered
    camera.lookAt(0, 0, 0);
    
    // Very subtle camera roll for immersion
    camera.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.008;
  });
  
  return (
    <>
      {/* Subtle ambient lighting to see star colors */}
      <ambientLight intensity={0.05} color="#ffffff" />
      
      {/* Main galactic center glow */}
      <pointLight
        position={[0, 0, 0]}
        intensity={0.3}
        color="#fff8e1"
        distance={25}
        decay={2}
      />
      
      {/* Soft rim lighting for dimension */}
      <directionalLight
        position={[15, 8, 12]}
        intensity={0.1}
        color="#e8f4ff"
      />
      
      {/* Opposing rim light */}
      <directionalLight
        position={[-12, -5, -8]}
        intensity={0.08}
        color="#f3e5f5"
      />
      
      {/* Beautiful Milky Way particle field */}
      <ParticleField scrollY={scrollY} />
      
      {/* Distant nebula clouds for atmosphere */}
      <mesh position={[35, 12, -50]} scale={[20, 10, 20]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color="#2d1b69" 
          transparent 
          opacity={0.015}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      
      <mesh position={[-30, -8, -45]} scale={[15, 8, 15]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color="#1a4d66" 
          transparent 
          opacity={0.012}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      
      <mesh position={[20, -15, -40]} scale={[18, 6, 18]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color="#4d1a33" 
          transparent 
          opacity={0.01}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}