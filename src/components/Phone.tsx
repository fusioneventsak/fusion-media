import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Html, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface PhoneProps {
  position: [number, number, number];
  url: string;
  title: string;
  rotation?: [number, number, number];
  scale?: number;
}

export default function Phone({ position, url, title, rotation = [0, 0, 0], scale = 1 }: PhoneProps) {
  const phoneRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (phoneRef.current) {
      // Gentle floating animation
      const time = state.clock.elapsedTime;
      phoneRef.current.position.y = position[1] + Math.sin(time * 0.6 + position[0] * 0.5) * 0.08;
      phoneRef.current.rotation.y = rotation[1] + Math.sin(time * 0.3) * 0.04;
      
      // Hover effect
      if (hovered) {
        phoneRef.current.rotation.z = rotation[2] + Math.sin(time * 4) * 0.01;
      }
    }
  });
  
  return (
    <group
      ref={phoneRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Phone Body */}
      <RoundedBox 
        args={[0.8, 1.6, 0.08]} 
        position={[0, 0, 0]}
        radius={0.08}
        smoothness={16}
      >
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1}
          envMapIntensity={1.5}
        />
      </RoundedBox>
      
      {/* Screen */}
      <RoundedBox 
        args={[0.72, 1.5, 0.01]} 
        position={[0, 0, 0.045]}
        radius={0.06}
        smoothness={16}
      >
        <meshStandardMaterial color="#000" />
      </RoundedBox>
      
      {/* Camera Module */}
      <group position={[0, 0.65, 0.05]}>
        {/* Camera island */}
        <RoundedBox 
          args={[0.25, 0.12, 0.02]} 
          position={[0, 0, 0]}
          radius={0.02}
          smoothness={8}
        >
          <meshStandardMaterial 
            color="#333" 
            metalness={0.8} 
            roughness={0.2}
          />
        </RoundedBox>
        
        {/* Camera lenses */}
        <mesh position={[-0.06, 0, 0.01]}>
          <circleGeometry args={[0.025, 16]} />
          <meshStandardMaterial 
            color="#000" 
            metalness={1} 
            roughness={0}
          />
        </mesh>
        <mesh position={[0.06, 0, 0.01]}>
          <circleGeometry args={[0.025, 16]} />
          <meshStandardMaterial 
            color="#000" 
            metalness={1} 
            roughness={0}
          />
        </mesh>
      </group>
      
      {/* Home indicator */}
      <RoundedBox 
        args={[0.15, 0.025, 0.005]} 
        position={[0, -0.7, 0.05]}
        radius={0.01}
        smoothness={4}
      >
        <meshStandardMaterial 
          color="#666" 
          emissive="#222"
          emissiveIntensity={0.1}
        />
      </RoundedBox>
      
      {/* Volume buttons */}
      <RoundedBox 
        args={[0.03, 0.12, 0.015]} 
        position={[-0.42, 0.3, 0]}
        radius={0.005}
        smoothness={4}
      >
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1}
        />
      </RoundedBox>
      
      <RoundedBox 
        args={[0.03, 0.08, 0.015]} 
        position={[-0.42, 0.15, 0]}
        radius={0.005}
        smoothness={4}
      >
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1}
        />
      </RoundedBox>
      
      {/* Power button */}
      <RoundedBox 
        args={[0.03, 0.08, 0.015]} 
        position={[0.42, 0.2, 0]}
        radius={0.005}
        smoothness={4}
      >
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1}
        />
      </RoundedBox>
      
      {/* Screen Content */}
      <Html
        position={[0, 0, 0.05]}
        transform
        distanceFactor={2.5}
        style={{ pointerEvents: 'auto' }}
      >
        <div 
          className="phone-screen"
          style={{
            width: '180px',
            height: '380px',
            background: 'linear-gradient(135deg, #000 0%, #111 100%)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 0 30px rgba(0,0,0,0.9), inset 0 0 10px rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            position: 'relative',
            pointerEvents: 'auto'
          }}
        >
          {/* Status Bar */}
          <div style={{
            height: '28px',
            background: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            fontSize: '11px',
            color: 'white',
            fontWeight: '600'
          }}>
            <span>9:41</span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <span style={{ fontSize: '10px' }}>📶</span>
              <span style={{ fontSize: '10px' }}>📶</span>
              <span style={{ fontSize: '10px' }}>🔋</span>
            </div>
          </div>
          
          {/* App Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '12px',
            fontSize: '14px',
            fontWeight: 'bold',
            textAlign: 'center',
            position: 'relative'
          }}>
            {title}
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '12px',
              transform: 'translateY(-50%)',
              fontSize: '16px'
            }}>
              ⋯
            </div>
          </div>
          
          {/* Mobile Website Content */}
          <div style={{ 
            height: '324px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <iframe
              src={url}
              style={{
                width: '360px',
                height: '640px',
                border: 'none',
                backgroundColor: '#fff',
                transform: 'scale(0.5)',
                transformOrigin: 'top left',
                pointerEvents: 'auto'
              }}
              title={`${title} - Mobile`}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
            
            {/* Mobile UI overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(102,126,234,0.02) 0%, transparent 50%, rgba(118,75,162,0.02) 100%)',
              pointerEvents: 'none'
            }} />
          </div>
          
          {/* Screen glare effect */}
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '15px',
            width: '60px',
            height: '120px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 100%)',
            borderRadius: '8px',
            pointerEvents: 'none',
            opacity: hovered ? 0.4 : 0.15,
            transition: 'opacity 0.3s ease'
          }} />
        </div>
      </Html>
      
      {/* Screen glow */}
      <pointLight 
        position={[0, 0, 0.3]} 
        intensity={0.2} 
        color="#4A90E2" 
        distance={2}
      />
    </group>
  );
}