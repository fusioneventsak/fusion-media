import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Html } from '@react-three/drei';
import * as THREE from 'three';

interface PhoneProps {
  position: [number, number, number];
  url: string;
  title: string;
}

export default function Phone({ position, url, title }: PhoneProps) {
  const phoneRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (phoneRef.current) {
      phoneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.06;
      phoneRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.03;
    }
  });
  
  return (
    <group
      ref={phoneRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.08 : 1}
    >
      {/* Phone body */}
      <Box args={[0.65, 1.3, 0.08]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.1} />
      </Box>
      
      {/* Phone screen */}
      <Box args={[0.6, 1.2, 0.02]} position={[0, 0, 0.04]}>
        <meshStandardMaterial color="#000" />
      </Box>
      
      {/* Home indicator */}
      <Box args={[0.15, 0.02, 0.01]} position={[0, -0.55, 0.05]}>
        <meshStandardMaterial color="#333" />
      </Box>
      
      {/* Embedded mobile content */}
      <Html
        position={[0, 0, 0.05]}
        transform
        distanceFactor={2.2}
        style={{ pointerEvents: 'auto' }}
      >
        <div style={{
          width: '150px',
          height: '300px',
          background: '#fff',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(0,0,0,0.4)',
          pointerEvents: 'auto'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '6px',
            fontSize: '11px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            {title}
          </div>
          <iframe
            src={url}
            style={{
              width: '300px',
              height: '570px',
              border: 'none',
              backgroundColor: '#fff',
              transform: 'scale(0.5)',
              transformOrigin: 'top left',
              pointerEvents: 'auto'
            }}
            title={`${title} - Mobile`}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        </div>
      </Html>
    </group>
  );
}