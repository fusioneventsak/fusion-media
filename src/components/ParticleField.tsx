import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollY: number;
}

export default function ParticleField({ scrollY }: ParticleFieldProps) {
  const mainParticlesRef = useRef<THREE.Points>(null);
  const focalParticlesRef = useRef<THREE.Points>(null);
  const dustParticlesRef = useRef<THREE.Points>(null);
  
  // Custom shader material for realistic glowing particles
  const particleShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      uniforms: {
        time: { value: 0 },
        scrollOffset: { value: 0 },
        pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
      },
      vertexShader: `
        uniform float time;
        uniform float scrollOffset;
        uniform float pixelRatio;
        attribute float size;
        attribute float alpha;
        varying vec3 vColor;
        varying float vAlpha;
        varying float vGlow;
        
        void main() {
          vColor = color;
          vAlpha = alpha;
          
          // Apply scroll-based transformation
          vec3 pos = position;
          pos.y += scrollOffset * 0.5;
          pos.x += sin(scrollOffset * 0.01 + position.y * 0.1) * 2.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          // Much closer distance calculation
          float distance = length(mvPosition.xyz);
          float perspectiveSize = size * (50.0 / max(distance, 1.0));
          
          // Enhanced pulsing based on time and scroll
          float pulse = 1.0 + sin(time * 1.5 + scrollOffset * 0.01 + position.x * 0.4) * 0.3;
          perspectiveSize *= pulse;
          
          // Much brighter glow for close particles
          vGlow = 1.0 - smoothstep(1.0, 20.0, distance);
          vGlow = max(vGlow, 0.8);
          
          gl_PointSize = perspectiveSize * pixelRatio;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        varying float vGlow;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          // Much brighter particle rendering
          float circle = 1.0 - smoothstep(0.0, 0.5, dist);
          float core = 1.0 - smoothstep(0.0, 0.15, dist);
          float glow = 1.0 - smoothstep(0.15, 0.5, dist);
          
          float intensity = core * 2.0 + glow * 1.5;
          
          vec3 finalColor = vColor * intensity * vGlow;
          float finalAlpha = vAlpha * intensity * vGlow;
          
          gl_FragColor = vec4(finalColor, finalAlpha);
        }
      `
    });
  }, []);

  const dustShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      uniforms: {
        time: { value: 0 },
        scrollOffset: { value: 0 }
      },
      vertexShader: `
        uniform float time;
        uniform float scrollOffset;
        attribute float size;
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          vColor = color;
          
          // Apply scroll-based transformation
          vec3 pos = position;
          pos.y += scrollOffset * 0.3;
          pos.z += sin(scrollOffset * 0.005 + position.x * 0.05) * 1.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          float distance = length(mvPosition.xyz);
          vOpacity = 1.0 - smoothstep(2.0, 25.0, distance);
          vOpacity = max(vOpacity, 0.6);
          
          gl_PointSize = size * (30.0 / max(distance, 1.0));
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          float alpha = (1.0 - dist * 2.0) * vOpacity;
          gl_FragColor = vec4(vColor, alpha);
        }
      `
    });
  }, []);
  
  const particleData = useMemo(() => {
    // Main particles - much closer to camera
    const mainCount = 800;
    const mainPositions = new Float32Array(mainCount * 3);
    const mainColors = new Float32Array(mainCount * 3);
    const mainSizes = new Float32Array(mainCount);
    const mainAlphas = new Float32Array(mainCount);
    const mainVelocities = new Float32Array(mainCount * 3);
    
    for (let i = 0; i < mainCount; i++) {
      // Much closer distribution around the camera
      const radius = Math.random() * 15 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      mainPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      mainPositions[i * 3 + 1] = (Math.random() - 0.5) * 30; // Spread vertically for scroll effect
      mainPositions[i * 3 + 2] = radius * Math.cos(phi) - 10; // Closer to camera
      
      // Slow movement
      mainVelocities[i * 3] = (Math.random() - 0.5) * 0.01;
      mainVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      mainVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
      
      // Bright colors
      const colorType = Math.random();
      if (colorType < 0.3) {
        mainColors[i * 3] = 0.8 + Math.random() * 0.2;
        mainColors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        mainColors[i * 3 + 2] = 1.0;
      } else if (colorType < 0.6) {
        const intensity = 0.9 + Math.random() * 0.1;
        mainColors[i * 3] = intensity;
        mainColors[i * 3 + 1] = intensity;
        mainColors[i * 3 + 2] = intensity;
      } else {
        mainColors[i * 3] = 1.0;
        mainColors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        mainColors[i * 3 + 2] = 0.6 + Math.random() * 0.4;
      }
      
      mainSizes[i] = Math.random() * 3 + 1;
      mainAlphas[i] = 0.8 + Math.random() * 0.2;
    }
    
    // Focal particles - very close for immediate impact
    const focalCount = 200;
    const focalPositions = new Float32Array(focalCount * 3);
    const focalColors = new Float32Array(focalCount * 3);
    const focalSizes = new Float32Array(focalCount);
    const focalAlphas = new Float32Array(focalCount);
    
    for (let i = 0; i < focalCount; i++) {
      focalPositions[i * 3] = (Math.random() - 0.5) * 20;
      focalPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      focalPositions[i * 3 + 2] = Math.random() * 8 + 2; // Very close to camera
      
      const intensity = 0.95 + Math.random() * 0.05;
      focalColors[i * 3] = intensity;
      focalColors[i * 3 + 1] = intensity;
      focalColors[i * 3 + 2] = intensity;
      
      focalSizes[i] = Math.random() * 4 + 2;
      focalAlphas[i] = 0.9 + Math.random() * 0.1;
    }
    
    // Dust particles - closer and more responsive
    const dustCount = 1000;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    const dustSizes = new Float32Array(dustCount);
    const dustVelocities = new Float32Array(dustCount * 3);
    
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 40;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      dustVelocities[i * 3] = (Math.random() - 0.5) * 0.005;
      dustVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      dustVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
      
      // Colorful nebula
      const nebulaType = Math.random();
      if (nebulaType < 0.4) {
        dustColors[i * 3] = 0.6 + Math.random() * 0.4;
        dustColors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        dustColors[i * 3 + 2] = 1.0;
      } else if (nebulaType < 0.7) {
        dustColors[i * 3] = 0.8 + Math.random() * 0.2;
        dustColors[i * 3 + 1] = 0.6 + Math.random() * 0.4;
        dustColors[i * 3 + 2] = 1.0;
      } else {
        dustColors[i * 3] = 0.9 + Math.random() * 0.1;
        dustColors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        dustColors[i * 3 + 2] = 0.7 + Math.random() * 0.3;
      }
      
      dustSizes[i] = Math.random() * 2 + 0.5;
    }
    
    return {
      main: { 
        positions: mainPositions, 
        colors: mainColors, 
        sizes: mainSizes, 
        alphas: mainAlphas,
        velocities: mainVelocities,
        count: mainCount 
      },
      focal: { 
        positions: focalPositions, 
        colors: focalColors, 
        sizes: focalSizes,
        alphas: focalAlphas,
        count: focalCount 
      },
      dust: { 
        positions: dustPositions, 
        colors: dustColors, 
        sizes: dustSizes,
        velocities: dustVelocities,
        count: dustCount 
      }
    };
  }, []);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scrollOffset = scrollY * 0.01;
    
    // Update shader uniforms with scroll data
    if (particleShaderMaterial) {
      particleShaderMaterial.uniforms.time.value = time;
      particleShaderMaterial.uniforms.scrollOffset.value = scrollOffset;
    }
    if (dustShaderMaterial) {
      dustShaderMaterial.uniforms.time.value = time;
      dustShaderMaterial.uniforms.scrollOffset.value = scrollOffset;
    }
    
    // Animate main particles with scroll interaction
    if (mainParticlesRef.current) {
      const positions = mainParticlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleData.main.count; i++) {
        const i3 = i * 3;
        
        // Update positions
        positions[i3] += particleData.main.velocities[i3];
        positions[i3 + 1] += particleData.main.velocities[i3 + 1];
        positions[i3 + 2] += particleData.main.velocities[i3 + 2];
        
        // Wrapping with closer boundaries
        const maxDistance = 20;
        if (positions[i3] > maxDistance) positions[i3] = -maxDistance;
        if (positions[i3] < -maxDistance) positions[i3] = maxDistance;
        if (positions[i3 + 1] > maxDistance) positions[i3 + 1] = -maxDistance;
        if (positions[i3 + 1] < -maxDistance) positions[i3 + 1] = maxDistance;
        if (positions[i3 + 2] > 5) positions[i3 + 2] = -15;
        if (positions[i3 + 2] < -15) positions[i3 + 2] = 5;
        
        // Scroll-based floating
        const floatFreq = time * 0.1 + i * 0.01;
        positions[i3] += Math.sin(floatFreq + scrollOffset) * 0.005;
        positions[i3 + 1] += Math.cos(floatFreq * 0.8 + scrollOffset * 0.5) * 0.005;
      }
      
      mainParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Rotate based on scroll
      mainParticlesRef.current.rotation.y = time * 0.002 + scrollOffset * 0.1;
      mainParticlesRef.current.rotation.x = scrollOffset * 0.05;
    }
    
    // Animate focal particles with strong scroll response
    if (focalParticlesRef.current) {
      focalParticlesRef.current.rotation.x = Math.sin(time * 0.02) * 0.1 + scrollOffset * 0.02;
      focalParticlesRef.current.rotation.y = time * 0.005 + scrollOffset * 0.03;
      focalParticlesRef.current.rotation.z = Math.sin(time * 0.03 + scrollOffset * 0.01) * 0.05;
      
      // Move focal particles based on scroll
      focalParticlesRef.current.position.z = Math.sin(scrollOffset * 0.01) * 2;
    }
    
    // Animate dust with scroll interaction
    if (dustParticlesRef.current) {
      const positions = dustParticlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleData.dust.count; i++) {
        const i3 = i * 3;
        positions[i3] += particleData.dust.velocities[i3];
        positions[i3 + 1] += particleData.dust.velocities[i3 + 1];
        positions[i3 + 2] += particleData.dust.velocities[i3 + 2];
        
        // Closer wrapping
        const maxDistance = 25;
        if (positions[i3] > maxDistance) positions[i3] = -maxDistance;
        if (positions[i3] < -maxDistance) positions[i3] = maxDistance;
        if (positions[i3 + 1] > maxDistance) positions[i3 + 1] = -maxDistance;
        if (positions[i3 + 1] < -maxDistance) positions[i3 + 1] = maxDistance;
        if (positions[i3 + 2] > 10) positions[i3 + 2] = -10;
        if (positions[i3 + 2] < -10) positions[i3 + 2] = 10;
      }
      
      dustParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      dustParticlesRef.current.rotation.y = time * 0.001 + scrollOffset * 0.02;
    }
  });
  
  return (
    <>
      {/* Main star field */}
      <points ref={mainParticlesRef} material={particleShaderMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleData.main.count}
            array={particleData.main.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleData.main.count}
            array={particleData.main.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particleData.main.count}
            array={particleData.main.sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-alpha"
            count={particleData.main.count}
            array={particleData.main.alphas}
            itemSize={1}
          />
        </bufferGeometry>
      </points>
      
      {/* Focal bright stars */}
      <points ref={focalParticlesRef} material={particleShaderMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleData.focal.count}
            array={particleData.focal.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleData.focal.count}
            array={particleData.focal.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particleData.focal.count}
            array={particleData.focal.sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-alpha"
            count={particleData.focal.count}
            array={particleData.focal.alphas}
            itemSize={1}
          />
        </bufferGeometry>
      </points>
      
      {/* Nebula dust */}
      <points ref={dustParticlesRef} material={dustShaderMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleData.dust.count}
            array={particleData.dust.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleData.dust.count}
            array={particleData.dust.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particleData.dust.count}
            array={particleData.dust.sizes}
            itemSize={1}
          />
        </bufferGeometry>
      </points>
    </>
  );
}