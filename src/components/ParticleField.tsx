import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const groupRef = useRef<THREE.Group>(null);
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  
  // Create beautiful glowing particles using instanced meshes
  const { particles, tempObject, tempColor } = useMemo(() => {
    const count = 500; // Manageable count for performance
    const tempObject = new THREE.Object3D();
    const tempColor = new THREE.Color();
    
    const particles = Array.from({ length: count }, (_, i) => {
      // Create natural star distribution
      let x, y, z;
      
      if (Math.random() < 0.7) {
        // Main galaxy disk
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.pow(Math.random(), 0.6) * 12;
        const spiralOffset = radius * 0.15;
        
        x = Math.cos(angle + spiralOffset) * radius;
        y = (Math.random() - 0.5) * 3; // Flatter galaxy
        z = Math.sin(angle + spiralOffset) * radius;
      } else {
        // Foreground stars
        x = (Math.random() - 0.5) * 8;
        y = (Math.random() - 0.5) * 6;
        z = (Math.random() - 0.5) * 8;
      }
      
      return {
        position: new THREE.Vector3(x, y, z),
        size: Math.random() < 0.1 ? 
          Math.random() * 0.8 + 0.6 :  // Bright stars
          Math.random() * 0.4 + 0.2,   // Normal stars
        color: [
          '#ffffff', '#ffffff', '#ffffff', // Mostly white
          '#e8f4ff', '#fff8e1', '#f0f8ff', // Subtle variations
          '#fffef7', '#f8f8ff'
        ][Math.floor(Math.random() * 8)],
        speed: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2
      };
    });
    
    console.log('✨ Created', count, 'glowing mesh particles');
    return { particles, tempObject, tempColor };
  }, []);
  
  // Update instances every frame
  useFrame((state) => {
    if (instancedMeshRef.current && groupRef.current) {
      const time = state.clock.elapsedTime;
      
      // Smooth galaxy rotation
      groupRef.current.rotation.y = time * 0.01;
      
      // Scroll-based movement
      groupRef.current.position.y = scrollY * 0.0008;
      groupRef.current.position.x = Math.sin(scrollY * 0.0002) * 0.5;
      
      // Update each particle instance
      particles.forEach((particle, i) => {
        // Gentle floating animation
        const floatY = Math.sin(time * particle.speed + particle.phase) * 0.1;
        const floatX = Math.cos(time * particle.speed * 0.7 + particle.phase) * 0.05;
        
        // Set position with floating animation
        tempObject.position.copy(particle.position);
        tempObject.position.y += floatY;
        tempObject.position.x += floatX;
        
        // Scale variation for twinkling
        const twinkle = 0.8 + Math.sin(time * 2 + particle.phase) * 0.2;
        tempObject.scale.setScalar(particle.size * twinkle);
        
        // Apply transform to instance
        tempObject.updateMatrix();
        instancedMeshRef.current!.setMatrixAt(i, tempObject.matrix);
        
        // Set color with slight brightness variation
        tempColor.setStyle(particle.color);
        const brightness = 0.9 + Math.sin(time * 1.5 + particle.phase) * 0.1;
        tempColor.multiplyScalar(brightness);
        instancedMeshRef.current!.setColorAt(i, tempColor);
      });
      
      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
      if (instancedMeshRef.current.instanceColor) {
        instancedMeshRef.current.instanceColor.needsUpdate = true;
      }
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Instanced mesh for all particles */}
      <instancedMesh
        ref={instancedMeshRef}
        args={[undefined, undefined, particles.length]}
        castShadow={false}
        receiveShadow={false}
      >
        {/* Sharp sphere geometry for each star */}
        <sphereGeometry args={[1, 8, 6]} />
        
        {/* Glowing material with emissive properties */}
        <meshStandardMaterial
          emissive="#ffffff"
          emissiveIntensity={0.3}
          color="#ffffff"
          metalness={0}
          roughness={0.1}
          transparent={true}
          opacity={0.9}
        />
      </instancedMesh>
      
      {/* Add some larger glowing orbs for variety */}
      {[...Array(20)].map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 8 + Math.random() * 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 2;
        
        return (
          <mesh
            key={`glow-${i}`}
            position={[x, y, z]}
            scale={[0.3, 0.3, 0.3]}
          >
            <sphereGeometry args={[1, 12, 8]} />
            <meshStandardMaterial
              emissive="#4a90ff"
              emissiveIntensity={0.4}
              color="#ffffff"
              metalness={0}
              roughness={0}
              transparent={true}
              opacity={0.7}
            />
          </mesh>
        );
      })}
      
      {/* Bright central stars */}
      {[...Array(10)].map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 1;
        
        return (
          <mesh
            key={`bright-${i}`}
            position={[x, y, z]}
            scale={[0.8, 0.8, 0.8]}
          >
            <sphereGeometry args={[1, 16, 12]} />
            <meshStandardMaterial
              emissive="#ffffff"
              emissiveIntensity={0.6}
              color="#ffffff"
              metalness={0}
              roughness={0}
              transparent={true}
              opacity={1}
            />
            
            {/* Add point light for each bright star */}
            <pointLight
              intensity={0.3}
              distance={5}
              color="#ffffff"
              decay={2}
            />
          </mesh>
        );
      })}
    </group>
  );
}