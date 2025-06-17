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
  
  useEffect(() => {
    camera.position.z = 6;
  }, [camera]);
  
  useFrame(() => {
    camera.position.y = -scrollY * 0.0015;
  });
  
  // Only show 3D devices on home page
  const show3DDevices = currentPage === 'home';
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#4169E1" />
      <pointLight position={[0, 10, -10]} intensity={0.6} color="#FF6B6B" />
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#00FFFF" />
      
      <ParticleField />
      
      {show3DDevices && (
        <>
          {/* Laptops with embedded websites */}
          <Laptop 
            position={[-3.5, 2.5, 0]} 
            url="https://selfieholosphere.com/collage/1lr9qn"
            title="Selfie Holosphere - Photo Activation"
          />
          <Laptop 
            position={[3.5, 2, 0]} 
            url="http://urequestsongs.com"
            title="U Request Songs - Interactive Platform"
          />
          <Laptop 
            position={[-2.8, -0.5, 0]} 
            url="https://www.fusion-events.ca"
            title="Fusion Events - Event Management"
          />
          <Laptop 
            position={[2.8, -1.5, 0]} 
            url="https://splendid-cannoli-324007.netlify.app/"
            title="Custom Event Application"
          />
          
          {/* Phones with mobile versions */}
          <Phone 
            position={[-4.5, 0.8, 2.5]} 
            url="https://capable-alfajores-d0dff2.netlify.app/"
            title="Mobile Event App"
          />
          <Phone 
            position={[4.5, 0.3, 2.5]} 
            url="https://lucky-centaur-ce715c.netlify.app/"
            title="Interactive Mobile Experience"
          />
        </>
      )}
      
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate={currentPage === 'home'}
        autoRotateSpeed={0.3}
      />
    </>
  );
}