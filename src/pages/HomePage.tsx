import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import FullWidthLaptopShowcase from '../components/Laptop';
import AnimatedHeroTitle from '../components/AnimatedHeroTitle';

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero parallax effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.3], [0, 8]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [-50, -150]);

  // Smooth spring animations
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Services section in view detection
  const servicesInView = useInView(servicesRef, { 
    once: true, 
    margin: "-20% 0px -20% 0px" 
  });

  // CTA section mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const ctaElement = ctaRef.current;
    if (ctaElement) {
      ctaElement.addEventListener('mousemove', handleMouseMove);
      ctaElement.addEventListener('mouseleave', () => setMousePosition({ x: 0, y: 0 }));
    }

    return () => {
      if (ctaElement) {
        ctaElement.removeEventListener('mousemove', handleMouseMove);
        ctaElement.removeEventListener('mouseleave', () => setMousePosition({ x: 0, y: 0 }));
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative pointer-events-none">
      {/* Rest of the component code... */}
      </div>
    </div>
  );
}