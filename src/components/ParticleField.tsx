import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  
  // Create optimized particle system using Points geometry
  const { positions, colors, sizes } = useMemo(() => {
    const count = 2000; // Many more particles for Milky Way effect
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    // Milky Way colors - blues, purples, whites, and subtle pinks
    const starColors = [
      new THREE.Color('#ffffff'), // Bright white stars
      new THREE.Color('#e8f4ff'), // Slightly blue white
      new THREE.Color('#fff8e1'), // Warm white
      new THREE.Color('#e3f2fd'), // Light blue
      new THREE.Color('#f3e5f5'), // Light purple
      new THREE.Color('#fce4ec'), // Light pink
      new THREE.Color('#e0f2f1'), // Light cyan
    ];
    
    for (let i = 0; i < count; i++) {
      // Create galaxy-like distribution
      const i3 = i * 3;
      
      // Use spiral galaxy distribution
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 15 + 5; // 5 to 20 units from center
      const spiralFactor = radius * 0.3; // Creates spiral arms
      
      // Main galaxy disk
      positions[i3] = Math.cos(angle + spiralFactor) * radius + (Math.random() - 0.5) * 4;
      positions[i3 + 1] = (Math.random() - 0.5) * 4; // Thinner on Y axis
      positions[i3 + 2] = Math.sin(angle + spiralFactor) * radius + (Math.random() - 0.5) * 4;
      
      // Add some stars closer to camera for depth
      if (Math.random() < 0.1) {
        positions[i3] = (Math.random() - 0.5) * 8;
        positions[i3 + 1] = (Math.random() - 0.5) * 8;
        positions[i3 + 2] = (Math.random() - 0.5) * 8;
      }
      
      // Assign colors
      const colorIndex = Math.floor(Math.random() * starColors.length);
      const color = starColors[colorIndex];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      // Vary sizes - some bright stars, mostly small ones
      sizes[i] = Math.random() < 0.05 ? Math.random() * 8 + 4 : Math.random() * 3 + 1;
    }
    
    console.log('🌌 Created Milky Way with', count, 'stars');
    return { positions, colors, sizes };
  }, []);
  
  useFrame((state) => {
    if (pointsRef.current && materialRef.current) {
      // Slow rotation for galaxy effect
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.z = state.clock.elapsedTime * 0.01;
      
      // Scroll-based movement - move the entire galaxy
      pointsRef.current.position.y = scrollY * 0.001;
      pointsRef.current.position.x = Math.sin(scrollY * 0.0001) * 2;
      
      // Subtle breathing effect for stars
      materialRef.current.size = 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      
      // Opacity variation for twinkling
      materialRef.current.opacity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
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
        size={2}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// src/components/Scene.tsx
import React, { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import ParticleField from './ParticleField';

interface SceneProps {
  scrollY: number;
  currentPage: string;
}

export default function Scene({ scrollY, currentPage }: SceneProps) {
  const { camera, gl, scene } = useThree();
  
  useEffect(() => {
    // Optimized camera setup for particle visibility
    camera.position.set(0, 0, 10);
    camera.fov = 75;
    camera.near = 0.1;
    camera.far = 1000;
    camera.updateProjectionMatrix();
    
    // Look at origin
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
    
    // Renderer optimizations
    gl.setClearColor('#000000', 0);
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    console.log('🎥 Milky Way scene setup complete');
  }, [camera, gl]);
  
  useFrame((state) => {
    // Smooth camera movement based on scroll
    const targetY = -scrollY * 0.002;
    const targetX = Math.sin(scrollY * 0.0003) * 1;
    
    camera.position.y += (targetY - camera.position.y) * 0.1;
    camera.position.x += (targetX - camera.position.x) * 0.1;
    
    // Slight rotation for immersion
    camera.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
  });
  
  return (
    <>
      {/* Minimal lighting for particles */}
      <ambientLight intensity={0.3} />
      
      {/* Main particle field */}
      <ParticleField scrollY={scrollY} />
      
      {/* Optional: Add some larger "nebula" effects */}
      <mesh position={[15, 5, -20]} scale={[8, 4, 8]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color="#4a148c" 
          transparent 
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <mesh position={[-12, -8, -25]} scale={[6, 3, 6]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color="#1a237e" 
          transparent 
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Distant background stars */}
      <mesh position={[0, 0, -50]}>
        <sphereGeometry args={[50, 32, 32]} />
        <meshBasicMaterial 
          color="#0a0a0a"
          side={THREE.BackSide}
          transparent
          opacity={0.3}
        />
      </mesh>
    </>
  );
}

// src/App.tsx - Enhanced version
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Navigation from './components/Navigation';
import Scene from './components/Scene';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'case-studies':
        return <CaseStudiesPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Enhanced 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ 
            position: [0, 0, 10], 
            fov: 75,
            near: 0.1,
            far: 1000
          }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false
          }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          onCreated={({ gl, camera }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.2;
            gl.outputColorSpace = THREE.SRGBColorSpace;
            console.log('🌌 Milky Way canvas created');
          }}
          performance={{
            current: 1,
            min: 0.5,
            max: 1,
            debounce: 200
          }}
        >
          <Scene scrollY={scrollY} currentPage={currentPage} />
        </Canvas>
      </div>

      {/* Navigation */}
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Page Content */}
      <main className="relative z-10">
        {renderPage()}
      </main>
    </div>
  );
}