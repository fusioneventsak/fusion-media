import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  
  // Create ultra-sharp star texture
  const starTexture = useMemo(() => {
    const size = 32;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    
    // Clear to transparent
    ctx.clearRect(0, 0, size, size);
    
    // Create sharp center point
    const center = size / 2;
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;
    
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const dx = x - center;
        const dy = y - center;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const index = (y * size + x) * 4;
        
        if (distance < 1) {
          // Sharp center pixel
          data[index] = 255;     // R
          data[index + 1] = 255; // G
          data[index + 2] = 255; // B
          data[index + 3] = 255; // A
        } else if (distance < 2) {
          // Slight glow around center
          const alpha = Math.max(0, 255 * (2 - distance));
          data[index] = 255;
          data[index + 1] = 255;
          data[index + 2] = 255;
          data[index + 3] = alpha;
        } else {
          // Transparent
          data[index + 3] = 0;
        }
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.needsUpdate = true;
    
    return texture;
  }, []);
  
  // Create star field with better positioning for sharpness
  const { positions, colors, sizes } = useMemo(() => {
    const count = 800; // Fewer but sharper stars
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Position stars in optimal focus range (closer to camera)
      if (Math.random() < 0.6) {
        // Main star field - closer to camera for sharp focus
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 8 + 2; // Much closer
        
        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = (Math.random() - 0.5) * 4;
        positions[i3 + 2] = Math.sin(angle) * radius;
      } else {
        // Background stars - still closer than before
        positions[i3] = (Math.random() - 0.5) * 12;
        positions[i3 + 1] = (Math.random() - 0.5) * 8;
        positions[i3 + 2] = (Math.random() - 0.5) * 6;
      }
      
      // Pure white for maximum sharpness
      colors[i3] = 1;     // R
      colors[i3 + 1] = 1; // G
      colors[i3 + 2] = 1; // B
      
      // Consistent small sizes for sharp points
      sizes[i] = Math.random() < 0.05 ? 3 : 1.5;
    }
    
    console.log('⭐ Created ultra-sharp star field');
    return { positions, colors, sizes };
  }, []);
  
  useFrame((state) => {
    if (pointsRef.current && materialRef.current) {
      // Minimal rotation to maintain sharpness
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.005;
      
      // Subtle scroll movement
      pointsRef.current.position.y = scrollY * 0.0008;
      pointsRef.current.position.x = Math.sin(scrollY * 0.0001) * 0.2;
      
      // Very subtle size variation for twinkling
      const baseSize = 1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      materialRef.current.size = baseSize;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        map={starTexture}
        size={1.5}
        sizeAttenuation={false}
        vertexColors={true}
        transparent={true}
        opacity={1.0}
        alphaTest={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        fog={false}
      />
    </points>
  );
}