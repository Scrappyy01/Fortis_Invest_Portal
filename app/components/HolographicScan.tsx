'use client';

import { useEffect, useRef, useState } from 'react';

export default function HolographicScan() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanPosition, setScanPosition] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [revealedPoints, setRevealedPoints] = useState<Set<number>>(new Set());
  const [windowHeight, setWindowHeight] = useState(0);

  // Get window height on client side only
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

    // Data points to reveal during scan - repositioned to bottom 2/3
    const dataPoints = [
      { x: 0.15, y: 0.45, label: 'UPTIME: 99.99%', value: '' },
      { x: 0.35, y: 0.55, label: 'THROUGHPUT', value: '10 PB/s' },
      { x: 0.65, y: 0.50, label: 'NODES', value: '50,000+' },
      { x: 0.82, y: 0.60, label: 'EFFICIENCY', value: '98%' },
      { x: 0.25, y: 0.75, label: 'LATENCY', value: '<1ms' },
      { x: 0.70, y: 0.85, label: 'CAPACITY', value: '∞' },
    ];

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw data points that have been "scanned"
      dataPoints.forEach((point, index) => {
        const pointY = point.y * canvas.height;
        
        // Check if this point should be revealed
        if (scanPosition > pointY - 100 || revealedPoints.has(index)) {
          if (!revealedPoints.has(index)) {
            setRevealedPoints(prev => new Set(prev).add(index));
          }

          const x = point.x * canvas.width;
          const opacity = 1; // Always full opacity once revealed

          // Draw glowing dot - neon blue gradient
          const gradient = ctx.createRadialGradient(x, pointY, 0, x, pointY, 20);
          gradient.addColorStop(0, `rgba(46, 166, 230, ${opacity})`); // #2ea6e6
          gradient.addColorStop(0.5, `rgba(46, 166, 230, ${opacity * 0.6})`);
          gradient.addColorStop(1, 'rgba(46, 166, 230, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, pointY, 20, 0, Math.PI * 2);
          ctx.fill();

          // Draw bright white dot above neon blue glow
          ctx.save();
          ctx.globalAlpha = 0.95;
          ctx.shadowColor = 'white';
          ctx.shadowBlur = 12;
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(x, pointY, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Draw label
          ctx.font = '12px "Helvetica Neue", sans-serif';
          ctx.fillStyle = `rgba(46, 166, 230, ${opacity})`; // #2ea6e6
          ctx.textAlign = 'left';
          ctx.fillText(point.label, x + 25, pointY - 5);
          
          if (point.value) {
            ctx.font = 'bold 14px "Helvetica Neue", sans-serif';
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.fillText(point.value, x + 25, pointY + 12);
          }

          // Draw connecting line to edge - changed to neon blue
          ctx.strokeStyle = `rgba(46, 166, 230, ${opacity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(x, pointY);
          ctx.lineTo(x - 15, pointY);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [scanPosition, revealedPoints]);

  // Update scan position - stop after one complete scan
  useEffect(() => {
    if (scanComplete || windowHeight === 0) return;

    const interval = setInterval(() => {
      setScanPosition((prev) => {
        const newPos = prev + 3;
        if (newPos > windowHeight + 200) {
          setScanComplete(true);
          return windowHeight + 200; // Keep at bottom
        }
        return newPos;
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [scanComplete, windowHeight]);

  return (
    <>
      {/* Canvas for data overlays */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20"
        style={{ opacity: 0.9 }}
      />
      
  {/* Scanning beam with holographic glow - changed to neon blue */}
      {!scanComplete && (
        <>
          <div
            className="absolute left-0 right-0 h-[3px] pointer-events-none z-30"
            style={{
              top: `${scanPosition}px`,
              background: 'linear-gradient(90deg, transparent, rgba(46, 166, 230, 0.8), rgba(46, 166, 230, 1), rgba(46, 166, 230, 0.8), transparent)',
              boxShadow: '0 0 30px rgba(46, 166, 230, 0.9), 0 0 60px rgba(46, 166, 230, 0.6)',
              filter: 'blur(0.5px)',
            }}
          />
          
          {/* Scanning beam glow trail - changed to neon blue */}
          <div
            className="absolute left-0 right-0 pointer-events-none z-20"
            style={{
              top: `${scanPosition - 100}px`,
              height: '100px',
              background: 'linear-gradient(to bottom, transparent, rgba(46, 166, 230, 0.1))',
            }}
          />
        </>
      )}
      
  {/* Grid overlay that pulses with scan - changed to neon blue */}
      {!scanComplete && windowHeight > 0 && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(46, 166, 230, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(46, 166, 230, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            opacity: Math.sin((scanPosition / windowHeight) * Math.PI) * 0.3 + 0.2,
          }}
        />
      )}
    </>
  );
}
