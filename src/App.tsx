import React, { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import ParticleField from './ParticleField';

interface SceneProps {
  scrollY: number;
  currentPage: string;
}

export default function Scene({ scrollY, currentPage }: SceneProps) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 5);
    camera.fov = 75;
    camera.near = 0.1;
    camera.far = 1000;
    camera.updateProjectionMatrix();
  }, [camera]);
  
  useFrame(() => {
    // Gentle camera movement based on scroll
    camera.position.y = -scrollY * 0.001;
  });
  
  return (
    <>
      {/* Simple lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      <ParticleField scrollY