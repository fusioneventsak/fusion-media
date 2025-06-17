import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ParticleField from './ParticleField';
import Laptop3D from './Laptop3D';
import Phone3D from './Phone3D';

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
          {/* Featured Laptops with enhanced 3D rendering */}
          <Laptop3D
            position={[-3.5, 2.5, 0]}
            url="https://selfieholosphere.com/collage/1lr9qn"
            title="Selfie Holosphere"
            description="Interactive 3D photo collage experience"
            isOpen={true}
            screenAngle={95}
            isPoweredOn={true}
          />
          
          <Laptop3D
            position={[3.5, 2, 0]}
            url="http://urequestsongs.com"
            title="U Request Songs"
            description="Interactive DJ platform"
            isOpen={true}
            screenAngle={90}
            isPoweredOn={true}
          />
          
          <Laptop3D
            position={[-2.8, -0.5, 0]}
            url="https://www.fusion-events.ca"
            title="Fusion Events"
            description="Professional event services"
            isOpen={true}
            screenAngle={85}
            isPoweredOn={true}
          />
          
          <Laptop3D
            position={[2.8, -1.5, 0]}
            url="https://splendid-cannoli-324007.netlify.app/"
            title="Custom Application"
            description="Business management platform"
            isOpen={true}
            screenAngle={88}
            isPoweredOn={true}
          />
          
          {/* Enhanced Mobile Phone displays */}
          <Phone3D
            position={[-4.5, 0.8, 2.5]}
            url="https://capable-alfajores-d0dff2.netlify.app/"
            title="Mobile Event App"
            description="Comprehensive event management"
            isPoweredOn={true}
          />
          
          <Phone3D
            position={[4.5, 0.3, 2.5]}
            url="https://lucky-centaur-ce715c.netlify.app/"
            title="Interactive Experience"
            description="Mobile-first application"
            isPoweredOn={true}
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