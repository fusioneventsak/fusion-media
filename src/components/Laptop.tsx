import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Html } from '@react-three/drei';
import * as THREE from 'three';

interface LaptopProps {
  position: [number, number, number];
  url: string;
  title: string;
}

export default function Laptop({ position, url, title }: LaptopProps) {
  const laptopRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (laptopRef.current) {
      laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
      laptopRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    }
  });
  
  return (
    <group
      ref={laptopRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.05 : 1}
    >
      {/* Laptop base */}
      <Box args={[2.2, 0.12, 1.6]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </Box>
      
      {/* Laptop screen back */}
      <Box args={[2.2, 1.3, 0.06]} position={[0, 0.7, -0.75]} rotation={[-0.1, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </Box>
      
      {/* Screen bezel */}
      <Box args={[2, 1.15, 0.02]} position={[0, 0.7, -0.72]} rotation={[-0.1, 0, 0]}>
        <meshStandardMaterial color="#000" />
      </Box>
      
      {/* Embedded content */}
      <Html
        position={[0, 0.7, -0.71]}
        rotation={[-0.1, 0, 0]}
        transform
        distanceFactor={1}
        style={{ pointerEvents: 'auto' }}
      >
        <div style={{
          width: '350px',
          height: '220px',
          background: '#fff',
          borderRadius: '6px',
          overflow: 'hidden',
          boxShadow: '0 0 30px rgba(0,0,0,0.6)',
          pointerEvents: 'auto'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '10px',
            fontSize: '13px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>{title}</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }}></div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }}></div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28ca42' }}></div>
            </div>
          </div>
          <iframe
            src={url}
            style={{
              width: '100%',
              height: '190px',
              border: 'none',
              backgroundColor: '#fff',
              pointerEvents: 'auto'
            }}
            title={title}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        </div>
      </Html>
    </group>
  );
}