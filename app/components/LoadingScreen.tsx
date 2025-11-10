'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a minimum loading time of 800ms for smooth experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-[#1a1a1a] flex items-center justify-center transition-opacity duration-500"
      style={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? 'auto' : 'none'
      }}
    >
      {/* Animated background grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201, 169, 97, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201, 169, 97, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-fade 2s ease-in-out infinite'
        }}
      />

      {/* Logo container */}
      <div className="relative">
        {/* Pulsing ring */}
        <div 
          className="absolute inset-0 -m-12 rounded-full border-2 border-[#c9a961] opacity-50"
          style={{
            animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />
        
        {/* Logo */}
        <img 
          src="/fortisfundamenta_logo_1.png" 
          alt="Loading..." 
          className="h-32 w-auto relative z-10"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(201, 169, 97, 0.6))',
            animation: 'logo-pulse 2s ease-in-out infinite'
          }}
        />
        
        {/* Scanning beam */}
        <div 
          className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#c9a961] to-transparent"
          style={{
            animation: 'scan-vertical 2s ease-in-out infinite',
            boxShadow: '0 0 15px rgba(201, 169, 97, 0.8)'
          }}
        />
      </div>

      {/* Loading text */}
      <div 
        className="absolute bottom-32 text-[#c9a961] text-sm tracking-widest font-light"
        style={{
          animation: 'fade-pulse 2s ease-in-out infinite'
        }}
      >
        LOADING
      </div>
    </div>
  );
}
