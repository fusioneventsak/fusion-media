import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface Phone3DProps {
  position: [number, number, number];
  url: string;
  title: string;
  description?: string;
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

export default function Phone3D({
  position,
  url,
  title,
  description,
  isPoweredOn = true
}: Phone3DProps) {
  const phoneRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

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
      {/* Phone Body */}
      <RoundedBox
        args={[0.45, 0.9, 0.05]}
        position={[0, 0, 0]}
        color="#2a2a2a"
        roughness={0.2}
        metalness={0.8}
        castShadow
        receiveShadow
      />

      {/* Screen */}
      <RoundedBox
        args={[0.42, 0.85, 0.01]}
        position={[0, 0, 0.026]}
        color={isPoweredOn ? "#000000" : "#000000"}
        emissive={isPoweredOn ? "#111" : "#000"}
        roughness={0.1}
        metalness={0.1}
      />

      {/* Camera Notch */}
      <mesh position={[0, 0.38, 0.03]}>
        <cylinderGeometry args={[0.03, 0.03, 0.01, 16]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      {/* Home Indicator */}
      <RoundedBox
        args={[0.1, 0.005, 0.01]}
        position={[0, -0.4, 0.026]}
        color="#333"
        roughness={0.3}
      />

      {/* Power Button */}
      <RoundedBox
        args={[0.02, 0.08, 0.01]}
        position={[0.225, 0.1, 0]}
        color="#1a1a1a"
        roughness={0.4}
      />

      {/* Volume Buttons */}
      <RoundedBox
        args={[0.02, 0.06, 0.008]}
        position={[-0.225, 0.15, 0]}
        color="#1a1a1a"
        roughness={0.4}
      />
      <RoundedBox
        args={[0.02, 0.06, 0.008]}
        position={[-0.225, 0.05, 0]}
        color="#1a1a1a"
        roughness={0.4}
      />

      {/* Embedded Mobile Content */}
      {isPoweredOn && (
        <Html
          position={[0, 0, 0.03]}
          transform
          distanceFactor={2.5}
          style={{ pointerEvents: 'auto' }}
        >
          <div style={{
            width: '180px',
            height: '360px',
            background: '#000',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 0 30px rgba(0,0,0,0.6)',
            pointerEvents: 'auto',
            position: 'relative'
          }}>
            {/* Status Bar */}
            <div style={{
              height: '24px',
              background: '#000',
              color: 'white',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 12px'
            }}>
              <span>9:41</span>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>

            {/* App Header */}
            <div style={{
              height: '44px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {title}
            </div>

            {/* Mobile Website Content */}
            <div style={{ height: '292px', overflow: 'hidden', background: 'white' }}>
              <iframe
                src={url}
                style={{
                  width: '360px',
                  height: '584px',
                  border: 'none',
                  backgroundColor: '#fff',
                  transform: 'scale(0.5)',
                  transformOrigin: 'top left',
                  pointerEvents: 'auto'
                }}
                title={`${title} - Mobile`}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                onLoad={() => setIframeLoaded(true)}
              />
              
              {/* Loading indicator */}
              {!iframeLoaded && (
                <div style={{
                  position: 'absolute',
                  top: '68px',
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
          </div>
        </Html>
      )}

      {/* Phone lighting */}
      <pointLight position={[0.5, 1, 0.5]} intensity={0.2} color="#4080ff" />
    </group>
  );
}