import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const testMeshesRef = useRef<THREE.Group>(null);
  const simpleParticlesRef = useRef<THREE.Points>(null);
  
  // First, let's add some simple visible test objects
  const testObjects = useMemo(() => {
    const objects = [];
    for (let i = 0; i < 10; i++) {
      objects.push({
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6
        ] as [number, number, number],
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      });
    }
    return objects;
  }, []);

  // Simple particle system using basic material
  const simpleParticleData = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Position particles very close to camera
      positions[i * 3] = (Math.random() - 0.5) * 4;     // x: -2 to +2
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4; // y: -2 to +2
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4; // z: -2 to +2
      
      // Bright colors
      colors[i * 3] = Math.random();     // r
      colors[i * 3 + 1] = Math.random(); // g
      colors[i * 3 + 2] = Math.random(); // b
    }
    
    return { positions, colors, count };
  }, []);

  // Basic material that should definitely be visible
  const basicParticleMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.1,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Rotate test objects
    if (testMeshesRef.current) {
      testMeshesRef.current.rotation.y = time * 0.5;
    }
    
    // Rotate particles
    if (simpleParticlesRef.current) {
      simpleParticlesRef.current.rotation.z = time * 0.2;
    }
  });

  console.log('🔍 ParticleField rendering with:', {
    testObjects: testObjects.length,
    simpleParticles: simpleParticleData.count
  });

  return (
    <group>
      {/* Test: Visible mesh objects to confirm 3D scene is working */}
      <group ref={testMeshesRef}>
        {testObjects.map((obj, i) => (
          <mesh key={i} position={obj.position}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color={obj.color} />
          </mesh>
        ))}
      </group>

      {/* Test: Simple particles with basic material */}
      <points ref={simpleParticlesRef} material={basicParticleMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={simpleParticleData.count}
            array={simpleParticleData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={simpleParticleData.count}
            array={simpleParticleData.colors}
            itemSize={3}
          />
        </bufferGeometry>
      </points>

      {/* Test: A simple glowing sphere at origin */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#00ff00" />
      </mesh>

      {/* Test: Some lines to see coordinate system */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([-2, 0, 0, 2, 0, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ff0000" />
      </line>
      
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, -2, 0, 0, 2, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00ff00" />
      </line>
      
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, 0, -2, 0, 0, 2])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#0000ff" />
      </line>

      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <mesh position={[0, 0, -1]}>
          <planeGeometry args={[1, 0.2]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}