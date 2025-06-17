import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface Laptop3DProps {
  position: [number, number, number];
  url: string;
  title: string;
  description?: string;
  isOpen?: boolean;
  screenAngle?: number;
  isPoweredOn?: boolean;
}

const RoundedBox: React.FC<{
  args: [number, number, number];
  radius?: number;
  color: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  castShadow?: boolean;
  receiveShadow?: boolean;
  emissive?: string;
  roughness?: number;
  metalness?: number;
}> = ({
  args,
  color,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  castShadow = false,
  receiveShadow = false,
  emissive,
  roughness = 0.3,
  metalness = 0.7,
}) => {
  return (
    <mesh
      position={position}
      rotation={rotation}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    >
      <boxGeometry args={args} />
      <meshStandardMaterial
        color={color}
        emissive={emissive ? new THREE.Color(emissive) : undefined}
        roughness={roughness}
        metalness={metalness}
      />
    </mesh>
  );
};

export default function Laptop3D({
  position,
  url,
  title,
  description,
  isOpen = true,
  screenAngle = 90,
  isPoweredOn = true
}: Laptop3DProps) {
  const laptopRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useFrame((state) => {
    if (laptopRef.current) {
      laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.06;
      laptopRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.03;
    }
  });

  const baseRotation = isOpen ? -screenAngle * (Math.PI / 180) : 0;
  const keyWidth = 0.08;
  const keyHeight = 0.005;
  const keyDepth = 0.08;
  const keySpacing = 0.02;

  const generateKeys = (rows: number[], startX: number, startZ: number) => {
    let keys = [];
    let currentZ = startZ;
    
    for (let r = 0; r < rows.length; r++) {
      const numKeys = rows[r];
      const rowWidth = numKeys * (keyWidth + keySpacing) - keySpacing;
      const rowStartX = startX - (rowWidth / 2) + (keyWidth / 2);

      for (let i = 0; i < numKeys; i++) {
        keys.push(
          <mesh 
            key={`key-row${r}-${i}`} 
            position={[rowStartX + i * (keyWidth + keySpacing), 0.015, currentZ]} 
            receiveShadow
          >
            <boxGeometry args={[keyWidth, keyHeight, keyDepth]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.5} />
          </mesh>
        );
      }
      currentZ += keyDepth + keySpacing;
    }
    return keys;
  };

  return (
    <group
      ref={laptopRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.05 : 1}
    >
      {/* Laptop Base */}
      <RoundedBox
        args={[2.2, 0.12, 1.6]}
        position={[0, 0, 0]}
        color="#2a2a2a"
        roughness={0.3}
        metalness={0.7}
        castShadow
        receiveShadow
      />

      {/* Keyboard Area */}
      <RoundedBox
        args={[2.0, 0.01, 1.2]}
        position={[0, 0.06, -0.1]}
        color="#1a1a1a"
        roughness={0.8}
        receiveShadow
      />

      {/* Keyboard Keys */}
      {generateKeys([12, 11, 10, 8], 0, -0.5)}
      
      {/* Spacebar */}
      <mesh position={[0, 0.015, -0.15]} receiveShadow>
        <boxGeometry args={[0.6, 0.005, 0.08]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.5} />
      </mesh>

      {/* Trackpad */}
      <RoundedBox
        args={[0.4, 0.005, 0.25]}
        position={[0, 0.065, 0.15]}
        color="#333"
        roughness={0.2}
        metalness={0.5}
        receiveShadow
      />

      {/* Screen Assembly */}
      <group ref={screenRef} position={[0, 0.06, -0.75]}>
        <group rotation={[baseRotation, 0, 0]}>
          {/* Screen Back */}
          <RoundedBox
            args={[2.2, 1.3, 0.06]}
            position={[0, 0.65, -0.03]}
            color="#1a1a1a"
            roughness={0.3}
            metalness={0.8}
            castShadow
          />

          {/* Screen Bezel */}
          <RoundedBox
            args={[2.1, 1.2, 0.02]}
            position={[0, 0.65, 0.001]}
            color="#000"
            roughness={0.9}
          />

          {/* Screen */}
          <RoundedBox
            args={[2.0, 1.15, 0.005]}
            position={[0, 0.65, 0.01]}
            color={isPoweredOn ? "#ffffff" : "#000000"}
            emissive={isPoweredOn ? "#111" : "#000"}
            roughness={0.1}
            metalness={0.1}
          />

          {/* Power LED */}
          <mesh position={[-1.0, 0.05, 0.02]}>
            <sphereGeometry args={[0.01]} />
            <meshStandardMaterial
              color={isPoweredOn ? "#00ff00" : "#ff0000"}
              emissive={isPoweredOn ? "#002200" : "#220000"}
            />
          </mesh>

          {/* Embedded Website Content */}
          {isPoweredOn && isOpen && (
            <Html
              position={[0, 0.65, 0.015]}
              transform
              distanceFactor={1.1}
              style={{ pointerEvents: 'auto' }}
            >
              <div style={{
                width: '400px',
                height: '250px',
                background: '#fff',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                pointerEvents: 'auto'
              }}>
                {/* Browser Chrome */}
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }}></div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28ca42' }}></div>
                  </div>
                  <span>{title}</span>
                  <div style={{ color: '#90EE90', fontSize: '10px' }}>● LIVE</div>
                </div>
                
                {/* Website Content */}
                <iframe
                  src={url}
                  style={{
                    width: '100%',
                    height: '222px',
                    border: 'none',
                    backgroundColor: '#fff',
                    pointerEvents: 'auto'
                  }}
                  title={title}
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                  onLoad={() => setIframeLoaded(true)}
                />
                
                {/* Loading indicator */}
                {!iframeLoaded && (
                  <div style={{
                    position: 'absolute',
                    top: '30px',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    Loading {title}...
                  </div>
                )}
              </div>
            </Html>
          )}
        </group>
      </group>

      {/* Additional lighting */}
      <pointLight position={[1, 2, 1]} intensity={0.3} color="#4080ff" />
      <pointLight position={[-1, 2, 1]} intensity={0.2} color="#ffffff" />
    </group>
  );
}