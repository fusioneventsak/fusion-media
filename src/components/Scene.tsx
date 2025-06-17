import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ParticleField from './ParticleField';
import Laptop from './Laptop';
import Phone from './Phone';

interface SceneProps {
  scrollY: number;
  currentPage: string;
}

export default function Scene({ scrollY, currentPage }: SceneProps) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    camera.position.z = 8;
    camera.position.y = 1;
  }, [camera]);
  
  useFrame((state) => {
    // Smooth camera movement based on scroll
    const targetY = -scrollY * 0.001;
    camera.position.y += (targetY - camera.position.y) * 0.1;
    
    // Gentle scene rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });
  
  // Only show 3D devices on home page
  const show3DDevices = currentPage === 'home';
  
  return (
    <>
      {/* Enhanced Lighting Setup */}
      <ambientLight intensity={0.3} color="#4A90E2" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8} 
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#667eea" />
      <pointLight position={[0, 15, -5]} intensity={0.6} color="#764ba2" />
      <spotLight
        position={[0, 10, 10]}
        intensity={0.5}
        angle={0.3}
        penumbra={0.5}
        color="#4A90E2"
        castShadow
      />
      
      <ParticleField />
      
      {show3DDevices && (
        <group ref={groupRef}>
          {/* Featured Laptops - Professional Showcase */}
          <Laptop 
            position={[-4.5, 3, 0]} 
            rotation={[0, 0.2, 0]}
            scale={0.8}
            url="https://selfieholosphere.com/collage/1lr9qn"
            title="Selfie Holosphere - 3D Photo Experience"
          />
          
          <Laptop 
            position={[4.2, 2.5, -1]} 
            rotation={[0, -0.3, 0]}
            scale={0.9}
            url="http://urequestsongs.com"
            title="U Request Songs - Interactive DJ Platform"
          />
          
          <Laptop 
            position={[-3.8, 0, 2]} 
            rotation={[0, 0.4, 0]}
            scale={0.75}
            url="https://www.fusion-events.ca"
            title="Fusion Events - Premium Event Services"
          />
          
          <Laptop 
            position={[3.5, -1, 1.5]} 
            rotation={[0, -0.2, 0]}
            scale={0.85}
            url="https://splendid-cannoli-324007.netlify.app/"
            title="Custom Event Application Suite"
          />
          
          <Laptop 
            position={[0, -3, 0]} 
            rotation={[0, 0, 0]}
            scale={1}
            url="https://lucasarts.netlify.app"
            title="Interactive Portfolio Showcase"
          />
          
          {/* Mobile Phones - Responsive Design Showcase */}
          <Phone 
            position={[-6, 1.5, 3]} 
            rotation={[0, 0.5, 0.1]}
            scale={1.2}
            url="https://capable-alfajores-d0dff2.netlify.app/"
            title="Mobile Event App"
          />
          
          <Phone 
            position={[6.2, 0.8, 2.5]} 
            rotation={[0, -0.4, -0.1]}
            scale={1.1}
            url="https://lucky-centaur-ce715c.netlify.app/"
            title="Interactive Mobile Experience"
          />
          
          <Phone 
            position={[-5.5, -1.5, 1]} 
            rotation={[0, 0.3, 0.05]}
            scale={1}
            url="https://magnificent-semifreddo-123456.netlify.app/"
            title="Mobile Portfolio"
          />
          
          <Phone 
            position={[5.8, -2.2, 0.5]} 
            rotation={[0, -0.6, -0.05]}
            scale={1.15}
            url="https://dreamy-pavlova-789012.netlify.app/"
            title="Event Management Mobile"
          />
          
          {/* Additional Devices for Depth */}
          <Laptop 
            position={[-1.5, 1.2, -3]} 
            rotation={[0, 0.1, 0]}
            scale={0.6}
            url="https://wonderful-sprite-345678.netlify.app/"
            title="Analytics Dashboard"
          />
          
          <Phone 
            position={[2, 1.8, -2.5]} 
            rotation={[0, -0.2, 0]}
            scale={0.9}
            url="https://amazing-unicorn-901234.netlify.app/"
            title="Mobile Analytics"
          />
        </group>
      )}
      
      <OrbitControls 
        enablePan={false} 
        enableZoom={true}
        enableRotate={true}
        maxDistance={15}
        minDistance={5}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 4}
        autoRotate={currentPage === 'home' && !show3DDevices}
        autoRotateSpeed={0.2}
        dampingFactor={0.05}
        enableDamping={true}
      />
    </>
  );
}