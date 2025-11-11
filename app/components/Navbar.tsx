'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#c9a961]/20">
      <div className="container mx-auto px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/fortisfundamenta_logo_4.png" alt="Fortis Fundamenta Logo" className="h-12 w-auto" />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm tracking-wide">
          <Link href="/Team" className="text-white hover:text-[#c9a961] transition-colors duration-300">THE TEAM</Link>
          <Link href="/Projects" className="text-white hover:text-[#c9a961] transition-colors duration-300">PROJECTS</Link>
          <Link href="/Invest" className="text-white hover:text-[#c9a961] transition-colors duration-300">INVEST</Link>
        </div>
        
        {/* Mobile Hamburger Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer pl-3"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1a1a1a]/98 border-t border-[#c9a961]/20 py-4 px-8">
          <div className="flex flex-col gap-4 text-sm tracking-wide">
            <Link 
              href="/Team" 
              className="text-white hover:text-[#c9a961] transition-colors duration-300 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              THE TEAM
            </Link>
            <Link 
              href="/Projects" 
              className="text-white hover:text-[#c9a961] transition-colors duration-300 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              PROJECTS
            </Link>
            <Link 
              href="/Invest" 
              className="text-white hover:text-[#c9a961] transition-colors duration-300 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              INVEST
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
