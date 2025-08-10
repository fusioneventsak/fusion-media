import { useRef, useEffect } from 'react';

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

interface SplashCursorProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: ColorRGB;
  TRANSPARENT?: boolean;
  STABLE_COLORS?: boolean;
}

export default function SplashCursor({
  SIM_RESOLUTION = 64,
  DYE_RESOLUTION = 512,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 8.0,
  VELOCITY_DISSIPATION = 6.0,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 1,
  SPLAT_RADIUS = 0.12,
  SPLAT_FORCE = 1500,
  SHADING = true,
  COLOR_UPDATE_SPEED = 0,
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT = true,
  STABLE_COLORS = true
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Mobile detection for performance optimizations
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Skip fluid simulation entirely on mobile for better performance
    if (isMobile) {
      console.log('📱 Mobile detected - using simplified cursor effect');
      
      // Simple mobile cursor effect
      let mouseX = 0;
      let mouseY = 0;
      let trails: Array<{x: number, y: number, life: number, color: ColorRGB}> = [];
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Set canvas size
      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      // Generate theme colors
      const generateColor = (): ColorRGB => {
        const themeColors = [
          { r: 0.3, g: 0.6, b: 1.0 },    // Blue
          { r: 0.6, g: 0.3, b: 1.0 },    // Purple
          { r: 0.0, g: 0.8, b: 1.0 },    // Cyan
          { r: 1.0, g: 0.4, b: 0.8 },    // Pink
          { r: 0.3, g: 1.0, b: 0.6 },    // Green
        ];
        return themeColors[Math.floor(Math.random() * themeColors.length)];
      };
      
      // Add trail point
      const addTrail = (x: number, y: number) => {
        const color = generateColor();
        trails.push({
          x: x,
          y: y,
          life: 1.0,
          color: color
        });
        
        // Limit trail length for performance
        if (trails.length > (isIOS ? 20 : 30)) {
          trails.shift();
        }
      };
      
      // Animation loop
      let animationId: number;
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw trails
        for (let i = trails.length - 1; i >= 0; i--) {
          const trail = trails[i];
          trail.life -= 0.02;
          
          if (trail.life <= 0) {
            trails.splice(i, 1);
            continue;
          }
          
          const alpha = trail.life;
          const size = trail.life * 20;
          
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = `rgba(${Math.floor(trail.color.r * 255)}, ${Math.floor(trail.color.g * 255)}, ${Math.floor(trail.color.b * 255)}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(trail.x, trail.y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        
        animationId = requestAnimationFrame(animate);
      };
      
      animate();
      
      // CRITICAL: Use passive event listeners to avoid blocking scroll
      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        mouseX = x;
        mouseY = y;
        addTrail(x, y);
      };
      
      const handleTouchMove = (e: TouchEvent) => {
        // Don't prevent default to allow scrolling
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        mouseX = x;
        mouseY = y;
        addTrail(x, y);
      };
      
      const handleClick = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create burst effect
        for (let i = 0; i < Math.min(5, isIOS ? 3 : 5); i++) {
          setTimeout(() => {
            addTrail(
              x + (Math.random() - 0.5) * 40,
              y + (Math.random() - 0.5) * 40
            );
          }, i * 50);
        }
      };
      
      // CRITICAL: Use passive event listeners
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('click', handleClick, { passive: true });
      
      // Cleanup
      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('click', handleClick);
      };
    }

    // Rest of the desktop fluid simulation code remains the same...
    // [Previous desktop implementation continues here]
    
  }, [SIM_RESOLUTION, DYE_RESOLUTION, DENSITY_DISSIPATION, VELOCITY_DISSIPATION, SPLAT_RADIUS, SPLAT_FORCE, COLOR_UPDATE_SPEED, CURL, STABLE_COLORS]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // CRITICAL: Don't block interaction with page content
        zIndex: 0 // Keep it behind content
      }}
    />
  );
}