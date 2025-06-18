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
    // Perfect camera setup for beautiful 3D particles
    camera.position.set(0, 2, 12);
    camera.fov = 60;
    camera.near = 0.1;
    camera.far = 200;
    camera.updateProjectionMatrix();
    
    // Look slightly down for better galaxy view
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
    
    // Enable shadows for depth
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Beautiful clear background
    gl.setClearColor('#000000', 0);
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Enable tone mapping for glow effects
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.2;
    
    console.log('🌟 Beautiful 3D star scene ready');
  }, [camera, gl, scene]);
  
  useFrame((state) => {
    // Smooth camera movement with scroll
    const targetY = 2 + (-scrollY * 0.002);
    const targetX = Math.sin(scrollY * 0.0003) * 1;
    const targetZ = 12 + Math.sin(scrollY * 0.0001) * 2;
    
    camera.position.y += (targetY - camera.position.y) * 0.03;
    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.z += (targetZ - camera.position.z) * 0.02;
    
    // Always look at the galaxy center
    camera.lookAt(0, 0, 0);
    
    // Subtle camera rotation for immersion
    camera.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.01;
  });
  
  return (
    <>
      {/* Key lighting setup for beautiful 3D stars */}
      <ambientLight intensity={0.1} color="#ffffff" />
      
      {/* Main directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.3}
        color="#ffffff"
        castShadow={false}
      />
      
      {/* Rim lighting from behind */}
      <directionalLight
        position={[-5, 2, -10]}
        intensity={0.2}
        color="#4a90ff"
        castShadow={false}
      />
      
      {/* Subtle fill light */}
      <pointLight
        position={[0, 5, 8]}
        intensity={0.15}
        color="#ffffff"
        distance={20}
        decay={2}
      />
      
      {/* Beautiful glowing particle field */}
      <ParticleField scrollY={scrollY} />
      
      {/* Subtle nebula clouds far in background */}
      <mesh position={[25, 8, -40]} scale={[15, 8, 15]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color="#1a0d4a" 
          transparent 
          opacity={0.02}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      
      <mesh position={[-20, -5, -35]} scale={[12, 6, 12]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color="#4a1a0d" 
          transparent 
          opacity={0.015}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}