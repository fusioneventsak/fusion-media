import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const groupRef = useRef<THREE.Group>(null);
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const dustRef = useRef<THREE.InstancedMesh>(null);
  
  // Create realistic Milky Way star distribution
  const { mainStars, cosmicDust, tempObject, tempColor } = useMemo(() => {
    const starCount = 800;
    const dustCount = 1200;
    const tempObject = new THREE.Object3D();
    const tempColor = new THREE.Color();
    
    // Milky Way color palette
    const starColors = [
      { color: '#ffffff', weight: 40 }, // White dwarf stars (most common)
      { color: '#fff8e1', weight: 25 }, // Slightly warm white
      { color: '#e8f4ff', weight: 20 }, // Cool blue-white
      { color: '#ff6b47', weight: 8 },  // Red giants
      { color: '#4a90e2', weight: 4 },  // Blue giants
      { color: '#9b59b6', weight: 2 },  // Purple nebula reflection
      { color: '#3498db', weight: 1 }   // Bright blue stars
    ];
    
    const getRandomColor = () => {
      const totalWeight = starColors.reduce((sum, item) => sum + item.weight, 0);
      let random = Math.random() * totalWeight;
      
      for (const item of starColors) {
        random -= item.weight;
        if (random <= 0) return item.color;
      }
      return starColors[0].color;
    };
    
    // Main stars - distributed in galaxy spiral pattern
    const mainStars = Array.from({ length: starCount }, (_, i) => {
      let x, y, z, size;
      
      if (Math.random() < 0.85) {
        // Galaxy disk with spiral arms
        const armIndex = Math.floor(Math.random() * 4); // 4 spiral arms
        const armAngle = (armIndex * Math.PI * 0.5) + (Math.random() - 0.5) * 0.8;
        const radius = Math.pow(Math.random(), 0.4) * 25; // Concentration toward center
        const spiralTightness = radius * 0.2;
        const angle = armAngle + spiralTightness;
        
        x = Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
        y = (Math.random() - 0.5) * (2 + radius * 0.1); // Disk gets thicker toward edge
        
        // Size distribution: mostly small stars
        if (Math.random() < 0.02) {
          size = Math.random() * 0.4 + 0.3; // Bright giants
        } else if (Math.random() < 0.1) {
          size = Math.random() * 0.2 + 0.15; // Medium stars
        } else {
          size = Math.random() * 0.1 + 0.05; // Small dwarf stars
        }
      } else {
        // Halo stars - older, more scattered
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        const radius = Math.random() * 15 + 10;
        
        x = radius * Math.sin(theta) * Math.cos(phi);
        y = radius * Math.sin(theta) * Math.sin(phi);
        z = radius * Math.cos(theta);
        
        size = Math.random() * 0.08 + 0.03; // Very small halo stars
      }
      
      return {
        position: new THREE.Vector3(x, y, z),
        size,
        color: getRandomColor(),
        brightness: 0.8 + Math.random() * 0.4,
        twinkleSpeed: Math.random() * 2 + 0.5,
        phase: Math.random() * Math.PI * 2
      };
    });
    
    // Cosmic dust and small particles
    const cosmicDust = Array.from({ length: dustCount }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.pow(Math.random(), 0.3) * 30;
      const spiralFactor = radius * 0.15;
      
      const x = Math.cos(angle + spiralFactor) * radius;
      const z = Math.sin(angle + spiralFactor) * radius;
      const y = (Math.random() - 0.5) * (1 + radius * 0.05);
      
      return {
        position: new THREE.Vector3(x, y, z),
        size: Math.random() * 0.03 + 0.01, // Very small dust particles
        color: Math.random() < 0.7 ? '#ffffff' : ['#e8f4ff', '#f3e5f5', '#e0f2f1'][Math.floor(Math.random() * 3)],
        opacity: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2
      };
    });
    
    console.log('🌌 Created realistic Milky Way:', starCount, 'stars +', dustCount, 'dust particles');
    return { mainStars, cosmicDust, tempObject, tempColor };
  }, []);
  
  useFrame((state) => {
    if (instancedMeshRef.current && dustRef.current && groupRef.current) {
      const time = state.clock.elapsedTime;
      
      // Very slow galaxy rotation
      groupRef.current.rotation.y = time * 0.008;
      
      // Subtle scroll movement
      groupRef.current.position.y = scrollY * 0.001;
      groupRef.current.position.x = Math.sin(scrollY * 0.0003) * 0.8;
      
      // Update main stars
      mainStars.forEach((star, i) => {
        // Gentle stellar motion
        tempObject.position.copy(star.position);
        tempObject.position.y += Math.sin(time * star.twinkleSpeed + star.phase) * 0.02;
        
        // Realistic twinkling
        const twinkle = 0.8 + Math.sin(time * star.twinkleSpeed * 2 + star.phase) * 0.2;
        tempObject.scale.setScalar(star.size * twinkle);
        
        tempObject.updateMatrix();
        instancedMeshRef.current!.setMatrixAt(i, tempObject.matrix);
        
        // Color with brightness variation
        tempColor.setStyle(star.color);
        tempColor.multiplyScalar(star.brightness * twinkle);
        instancedMeshRef.current!.setColorAt(i, tempColor);
      });
      
      // Update cosmic dust
      cosmicDust.forEach((dust, i) => {
        tempObject.position.copy(dust.position);
        tempObject.position.y += Math.sin(time * 0.3 + dust.phase) * 0.05;
        tempObject.position.x += Math.cos(time * 0.2 + dust.phase) * 0.02;
        
        tempObject.scale.setScalar(dust.size);
        tempObject.updateMatrix();
        dustRef.current!.setMatrixAt(i, tempObject.matrix);
        
        tempColor.setStyle(dust.color);
        tempColor.multiplyScalar(dust.opacity);
        dustRef.current!.setColorAt(i, tempColor);
      });
      
      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
      instancedMeshRef.current.instanceColor!.needsUpdate = true;
      dustRef.current.instanceMatrix.needsUpdate = true;
      dustRef.current.instanceColor!.needsUpdate = true;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Main star field */}
      <instancedMesh
        ref={instancedMeshRef}
        args={[undefined, undefined, mainStars.length]}
      >
        <sphereGeometry args={[1, 8, 6]} />
        <meshStandardMaterial
          emissive="#ffffff"
          emissiveIntensity={0.4}
          metalness={0}
          roughness={0.2}
          transparent={true}
          opacity={0.9}
        />
      </instancedMesh>
      
      {/* Cosmic dust particles */}
      <instancedMesh
        ref={dustRef}
        args={[undefined, undefined, cosmicDust.length]}
      >
        <sphereGeometry args={[1, 6, 4]} />
        <meshBasicMaterial
          transparent={true}
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
      
      {/* A few prominent bright stars with subtle colors */}
      {[
        { pos: [8, 1, 5], color: '#4a90e2', size: 0.6 },
        { pos: [-6, -2, 8], color: '#ff6b47', size: 0.5 },
        { pos: [3, 4, -2], color: '#9b59b6', size: 0.4 },
        { pos: [-4, 3, -6], color: '#ffffff', size: 0.7 },
        { pos: [10, -1, -4], color: '#3498db', size: 0.5 }
      ].map((star, i) => (
        <mesh
          key={`bright-${i}`}
          position={star.pos as [number, number, number]}
          scale={[star.size, star.size, star.size]}
        >
          <sphereGeometry args={[1, 12, 8]} />
          <meshStandardMaterial
            emissive={star.color}
            emissiveIntensity={0.6}
            color={star.color}
            metalness={0}
            roughness={0.1}
            transparent={true}
            opacity={0.9}
          />
          <pointLight
            intensity={0.8}
            distance={15}
            color={star.color}
            decay={2}
          />
        </mesh>
      ))}
    </group>
  );
}