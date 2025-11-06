'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSlide, setActiveSlide] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Calculate which slide is currently in view
      const windowHeight = window.innerHeight;
      const slideNumber = Math.round(window.scrollY / windowHeight) + 1;
      setActiveSlide(Math.min(Math.max(slideNumber, 1), 5));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-[#1a1a1a]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#c9a961]/20">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/fortisfundamenta_logo_4.png" alt="Fortis Fundamenta Logo" className="h-12 w-auto" />
          </div>
          <div className="flex gap-8 text-sm tracking-wide">
            <a href="/Team" className="text-white hover:text-[#c9a961] transition-colors duration-300">THE TEAM</a>
            <a href="/Projects" className="text-white hover:text-[#c9a961] transition-colors duration-300">PROJECTS</a>
            <a href="/Invest" className="text-white hover:text-[#c9a961] transition-colors duration-300">INVEST</a>
          </div>
        </div>
      </nav>

      {/* Slide Navigation Indicator */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
        {[1, 2, 3, 4, 5].map((slideNum) => (
          <a
            key={slideNum}
            href={`#slide${slideNum}`}
            className="group flex items-center gap-3"
            aria-label={`Go to slide ${slideNum}`}
          >
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSlide === slideNum
                  ? 'bg-[#c9a961] border-[#c9a961] scale-125'
                  : 'bg-transparent border-white/40 hover:border-[#c9a961] hover:scale-110'
              }`}
            />
            <span
              className={`text-xs tracking-wide transition-all duration-300 ${
                activeSlide === slideNum
                  ? 'text-[#c9a961] opacity-100'
                  : 'text-white/40 opacity-0 group-hover:opacity-100 group-hover:text-white'
              }`}
            >
              {slideNum === 1 && 'INNOVATING'}
              {slideNum === 2 && 'HERITAGE'}
              {slideNum === 3 && 'VISION'}
              {slideNum === 4 && 'IDENTITY'}
              {slideNum === 5 && 'INVEST'}
            </span>
          </a>
        ))}
      </div>

      {/* Slide 1 — INNOVATING FOR TOMORROW */}
      <section id="slide1" className="h-screen flex items-center justify-center relative overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/Fortis Stockvideo1.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/60" />
        {/* Removed grid overlay for a cleaner look */}
        <div className="text-center text-white z-10 px-8 max-w-5xl">
          <h1 className="text-7xl md:text-8xl font-luxury font-bold mb-6 tracking-tight leading-tight">
            INNOVATING FOR<br/>TOMORROW
          </h1>
          <p className="text-3xl md:text-4xl font-light mb-4 text-white">
            Engineering the Future of Capital.
          </p>
          <p className="text-lg md:text-xl text-[#c9a961] font-light tracking-wide">
            Innovation that shapes tomorrow's world.
          </p>
        </div>
      </section>

      {/* Slide 2 — RESPECTING OUR PAST */}
      <section id="slide2" className="h-screen flex items-center justify-center bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#c9a961_1px,transparent_1px),linear-gradient(to_bottom,#c9a961_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        <div className="text-center text-white z-10 px-8 max-w-5xl">
          <h2 className="text-6xl md:text-7xl font-luxury font-bold mb-6 tracking-tight">
            RESPECTING OUR PAST
          </h2>
          <p className="text-3xl md:text-4xl font-light mb-4">
            Built on Integrity. Strengthened by Experience.
          </p>
          <p className="text-lg md:text-xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
            From engineering and technology to capital and development — a legacy of execution.
          </p>
        </div>
      </section>

      {/* Slide 3 — DELIVERING THE FUTURE OF POSSIBILITY */}
      <section id="slide3" className="h-screen flex items-center justify-center relative overflow-hidden bg-[#1a1a1a]">
        {/* Parallax Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/datacenter.png)',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#c9a961_1px,transparent_1px),linear-gradient(-45deg,#c9a961_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        </div>
        <div className="text-center text-white z-10 px-8 max-w-5xl">
          <h2 className="text-6xl md:text-7xl font-luxury font-bold mb-6 tracking-tight">
            DELIVERING THE FUTURE<br/>OF POSSIBILITY
          </h2>
          <p className="text-3xl md:text-4xl font-light mb-4">
            Where Vision Becomes Reality.
          </p>
          <p className="text-lg md:text-xl text-[#c9a961] font-light tracking-wide">
            Real-asset investments powering tomorrow's economy.
          </p>
        </div>
      </section>

      {/* Slide 4 — FORTIS FUNDAMENTA */}
      <section id="slide4" className="h-screen flex items-center justify-center bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#c9a961_1px,transparent_1px),linear-gradient(-45deg,#c9a961_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        </div>
        <div className="text-center text-white z-10 px-8 max-w-5xl">
          <div className="mb-8">
            <img src="/fortisfundamenta_01.svg" alt="Fortis Fundamenta" className="h-24 w-auto mx-auto mb-8 opacity-90" />
          </div>
          <h2 className="text-6xl md:text-7xl font-luxury font-bold mb-6 tracking-tight text-[#c9a961]">
            FORTIS FUNDAMENTA
          </h2>
          <p className="text-3xl md:text-4xl font-light mb-4">
            Foundation of Strength.
          </p>
          <p className="text-lg md:text-xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
            Structuring visionary excellence across property and technology.
          </p>
        </div>
      </section>

      {/* Slide 5 — INVEST IN EXCELLENCE */}
      <section id="slide5" className="h-screen flex items-center justify-center bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#c9a961_0%,transparent_70%)] opacity-10"></div>
        <div className="text-center text-white z-10 px-8 max-w-5xl">
          <h2 className="text-6xl md:text-7xl font-luxury font-bold mb-6 tracking-tight">
            INVEST IN EXCELLENCE
          </h2>
          <p className="text-3xl md:text-4xl font-light mb-4">
            A Managed Fund for Sophisticated Investors.
          </p>
          <p className="text-lg md:text-xl text-gray-300 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
            Partner with Fortis Fundamenta and invest in the foundations of the future.
          </p>
          <button className="bg-[#c9a961] hover:bg-[#d4b876] text-[#1a1a1a] font-semibold text-lg px-12 py-4 rounded-sm transition-all duration-300 tracking-wide shadow-lg hover:shadow-[#c9a961]/50">
            APPLY FOR INVESTOR ACCESS
          </button>
        </div>
      </section>
      <footer className="bg-black text-gray-400 text-sm py-8">
  
  <div className="border-t border-gray-700 w-full mb-6"></div>

  <div className="container mx-auto text-center space-y-4">
    <p>© 2025 FortisFundementa Inc.</p>

    <nav className="flex flex-wrap justify-center gap-6">
      <a href="#" className="hover:text-cyan-400 transition">Transparency & Disclosure</a>
      <a href="#" className="hover:text-cyan-400 transition">Legal</a>
      <a href="#" className="hover:text-cyan-400 transition">Phishing and Fraud Awareness</a>
      <a href="#" className="hover:text-cyan-400 transition">Do Not Sell or Share My Personal Information</a>
    </nav>
  </div>
</footer>
    </div>
  );
}
