import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Html, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface LaptopProps {
  position: [number, number, number];
  url: string;
  title: string;
  rotation?: [number, number, number];
  scale?: number;
}

export default function Laptop({ position, url, title, rotation = [0, 0, 0], scale = 1 }: LaptopProps) {
  const laptopRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (laptopRef.current) {
      // Gentle floating animation
      const time = state.clock.elapsedTime;
      laptopRef.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.05;
      
      // Subtle rotation when hovered
      if (hovered) {
        laptopRef.current.rotation.y = rotation[1] + Math.sin(time * 2) * 0.02;
      }
    }
  });
  
  return (
    <group
      ref={laptopRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Laptop Base/Bottom */}
      <RoundedBox 
        args={[3.2, 0.15, 2.2]} 
        position={[0, 0, 0]}
        radius={0.05}
        smoothness={8}
      >
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.8} 
          roughness={0.2}
          envMapIntensity={1}
        />
      </RoundedBox>
      
      {/* Laptop Screen Back */}
      <RoundedBox 
        args={[3.2, 2.0, 0.08]} 
        position={[0, 1.08, -1.05]} 
        rotation={[-0.15, 0, 0]}
        radius={0.05}
        smoothness={8}
      >
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1}
          envMapIntensity={1.2}
        />
      </RoundedBox>
      
      {/* Screen Bezel */}
      <RoundedBox 
        args={[2.9, 1.8, 0.02]} 
        position={[0, 1.08, -1.01]} 
        rotation={[-0.15, 0, 0]}
        radius={0.02}
        smoothness={8}
      >
        <meshStandardMaterial color="#000" />
      </RoundedBox>
      
      {/* Keyboard Area */}
      <RoundedBox 
        args={[2.8, 0.02, 1.8]} 
        position={[0, 0.08, 0.1]}
        radius={0.02}
        smoothness={4}
      >
        <meshStandardMaterial 
          color="#333" 
          metalness={0.1} 
          roughness={0.8}
        />
      </RoundedBox>
      
      {/* Trackpad */}
      <RoundedBox 
        args={[1.2, 0.01, 0.8]} 
        position={[0, 0.09, 0.6]}
        radius={0.02}
        smoothness={4}
      >
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.3} 
          roughness={0.6}
        />
      </RoundedBox>
      
      {/* Apple Logo (optional detail) */}
      <mesh position={[0, 1.5, -1.13]} rotation={[-0.15, 0, 0]}>
        <circleGeometry args={[0.08, 32]} />
        <meshStandardMaterial 
          color="#444" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#222"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Screen Content - HTML Overlay */}
      <Html
        position={[0, 1.08, -1.0]}
        rotation={[-0.15, 0, 0]}
        transform
        distanceFactor={1.2}
        style={{ pointerEvents: 'auto' }}
      >
        <div 
          className="laptop-screen"
          style={{
            width: '420px',
            height: '260px',
            background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 0 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.1)',
            position: 'relative',
            pointerEvents: 'auto'
          }}
        >
          {/* Browser Chrome */}
          <div style={{
            background: 'linear-gradient(135deg, #2a2a3a 0%, #1f1f2e 100%)',
            padding: '8px 12px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #ff5f57 0%, #ff4757 100%)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}></div>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #ffbd2e 0%, #ffa502 100%)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}></div>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #28ca42 0%, #2ed573 100%)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}></div>
            </div>
            <div style={{
              color: 'white',
              fontSize: '11px',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {title}
            </div>
            <div style={{
              color: '#888',
              fontSize: '10px',
              display: 'flex',
              gap: '8px'
            }}>
              <span>⚡ LIVE</span>
              <span>🔒</span>
            </div>
          </div>
          
          {/* Website Content */}
          <div style={{ 
            position: 'relative',
            height: '212px',
            overflow: 'hidden'
          }}>
            <iframe
              src={url}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                backgroundColor: '#000',
                pointerEvents: 'auto'
              }}
              title={title}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
            
            {/* Subtle overlay for depth */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
              pointerEvents: 'none'
            }} />
          </div>
          
          {/* Screen reflection effect */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            width: '100px',
            height: '150px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
            borderRadius: '4px',
            pointerEvents: 'none',
            opacity: hovered ? 0.3 : 0.1,
            transition: 'opacity 0.3s ease'
          }} />
        </div>
      </Html>
      
      {/* Ambient lighting around laptop */}
      <pointLight 
        position={[0, 1, -0.5]} 
        intensity={0.3} 
        color="#4A90E2" 
        distance={3}
      />
    </group>
  );
}