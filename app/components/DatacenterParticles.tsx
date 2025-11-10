'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  trail: { x: number; y: number; opacity: number }[];
}

export default function DatacenterParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle array - fewer particles but with trails
    const particles: Particle[] = [];
    const particleCount = 40;
    const trailLength = 15;

    // Initialize particles with varied speeds and directions
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.5 + 0.8;
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2 + 1.5,
        opacity: Math.random() * 0.4 + 0.6,
        trail: [],
      });
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with full opacity (no trails from clearing)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Store current position in trail
        particle.trail.push({
          x: particle.x,
          y: particle.y,
          opacity: particle.opacity,
        });

        // Limit trail length
        if (particle.trail.length > trailLength) {
          particle.trail.shift();
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges with smooth transition
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Draw trail
        particle.trail.forEach((point, index) => {
          const trailOpacity = (index / particle.trail.length) * particle.opacity * 0.5;
          const trailSize = (index / particle.trail.length) * particle.size;

          // Create gradient for trail point
          const gradient = ctx.createRadialGradient(
            point.x,
            point.y,
            0,
            point.x,
            point.y,
            trailSize * 2
          );
          gradient.addColorStop(0, `rgba(201, 169, 97, ${trailOpacity})`);
          gradient.addColorStop(1, 'rgba(201, 169, 97, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, trailSize * 2, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw main particle with stronger glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 4
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity})`);
        gradient.addColorStop(0.3, `rgba(201, 169, 97, ${particle.opacity * 0.8})`);
        gradient.addColorStop(1, 'rgba(201, 169, 97, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw bright core
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
