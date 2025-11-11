'use client';

import { useEffect, useState, useRef } from 'react';
import HolographicScan from './components/HolographicScan';
import AuroraGold from './components/AuroraGold';
import LoadingScreen from './components/LoadingScreen';

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [slide4Visible, setSlide4Visible] = useState(false);
  const [slide2Visible, setSlide2Visible] = useState(false);
  const [slide3Visible, setSlide3Visible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const slide4Ref = useRef<HTMLElement>(null);
  const slide2Ref = useRef<HTMLElement>(null);
  const slide3Ref = useRef<HTMLElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Throttled scroll handler - prevents excessive re-renders
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      // Throttle to run max every 100ms instead of 60+ times per second
      if (now - lastScrollTimeRef.current < 100) {
        return;
      }
      lastScrollTimeRef.current = now;

      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const slideNumber = Math.round(currentScrollY / windowHeight) + 1;
      setActiveSlide(Math.min(Math.max(slideNumber, 1), 5));
      
      // Check if slide 2 is in view
      if (slide2Ref.current && !slide2Visible) {
        const rect = slide2Ref.current.getBoundingClientRect();
        const isInView = rect.top < windowHeight * 0.75 && rect.bottom > 0;
        if (isInView) {
          setSlide2Visible(true);
        }
      }

      // Check if slide 3 is in view
      if (slide3Ref.current && !slide3Visible) {
        const rect = slide3Ref.current.getBoundingClientRect();
        const isInView = rect.top < windowHeight * 0.75 && rect.bottom > 0;
        if (isInView) {
          setSlide3Visible(true);
        }
      }
      
      // Check if slide 4 is in view
      if (slide4Ref.current && !slide4Visible) {
        const rect = slide4Ref.current.getBoundingClientRect();
        const isInView = rect.top < windowHeight * 0.75 && rect.bottom > 0;
        if (isInView) {
          setSlide4Visible(true);
        }
      }
    };

    handleScroll(); // Call once on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slide4Visible, slide2Visible, slide3Visible]);

  // Smooth snap scrolling on wheel event
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent default scroll behavior
      e.preventDefault();

      // Don't trigger if already scrolling
      if (isScrollingRef.current) return;

      // Determine scroll direction
      const direction = e.deltaY > 0 ? 1 : -1;
      const windowHeight = window.innerHeight;
      const currentSlide = Math.round(window.scrollY / windowHeight);
      let targetSlide = currentSlide + direction;

      // Clamp to valid slide range (0-4, since 0-indexed)
      targetSlide = Math.max(0, Math.min(4, targetSlide));

      // If same slide, do nothing
      if (targetSlide === currentSlide) return;

      // Set scrolling state
      isScrollingRef.current = true;

      // Smooth scroll to target slide with ease-in-out
      const targetPosition = targetSlide * windowHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Reset scrolling state after animation completes
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000); // Match this to scroll animation duration
    };

    // Add wheel event listener with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Lazy load video - only play when on slide 1
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (activeSlide === 1) {
      // Play video when on slide 1
      video.play().catch((err) => {
        console.log('Video autoplay prevented:', err);
      });
    } else {
      // Pause video when not on slide 1 to save resources
      video.pause();
    }
  }, [activeSlide]);

  // Handle tab visibility change - reset scroll state and resume animations
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Tab is now active - reset scroll state to prevent lag
        isScrollingRef.current = false;
        
        // Clear any pending scroll timeouts
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = null;
        }

        // Resume video if on slide 1
        const video = videoRef.current;
        if (video && activeSlide === 1) {
          video.play().catch((err) => {
            console.log('Video autoplay prevented:', err);
          });
        }
      } else {
        // Tab is hidden - pause video to save resources
        const video = videoRef.current;
        if (video) {
          video.pause();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [activeSlide]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative bg-[#1a1a1a]">
      {/* Loading Screen */}
      <LoadingScreen />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#c9a961]/20">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/fortisfundamenta_logo_4.png" alt="Fortis Fundamenta Logo" className="h-12 w-auto" />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-sm tracking-wide">
            <a href="/Team" className="text-white hover:text-[#c9a961] transition-colors duration-300">THE TEAM</a>
            <a href="/Projects" className="text-white hover:text-[#c9a961] transition-colors duration-300">PROJECTS</a>
            <a href="/Invest" className="text-white hover:text-[#c9a961] transition-colors duration-300">INVEST</a>
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
              <a 
                href="/Team" 
                className="text-white hover:text-[#c9a961] transition-colors duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                THE TEAM
              </a>
              <a 
                href="/Projects" 
                className="text-white hover:text-[#c9a961] transition-colors duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                PROJECTS
              </a>
              <a 
                href="/Invest" 
                className="text-white hover:text-[#c9a961] transition-colors duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                INVEST
              </a>
            </div>
          </div>
        )}
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
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${activeSlide === slideNum
                  ? 'bg-[#c9a961] border-[#c9a961] scale-125'
                  : 'bg-transparent border-white/40 hover:border-[#c9a961] hover:scale-110'
                }`}
            />
            <span
              className={`text-xs tracking-wide transition-all duration-300 ${activeSlide === slideNum
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
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/Fortis Stockvideo3.mp4"
          loop
          muted
          playsInline
          aria-hidden="true"
          preload="none"
        />
        <div className="absolute inset-0 bg-black/60" />
        {/* Removed grid overlay for a cleaner look */}
        <div className="text-center text-white z-10 px-8 max-w-5xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-luxury font-bold mb-4 md:mb-6 tracking-tight leading-tight" style={{
            textShadow: '0 0 30px rgba(0,0,0,0.8), 0 4px 15px rgba(0,0,0,0.9)'
          }}>
            INNOVATING FOR<br />TOMORROW
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-3 md:mb-4 text-white" style={{
            textShadow: '0 0 20px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.9)'
          }}>
            Engineering the Future of Capital.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-[#c9a961] font-light tracking-wide" style={{
            textShadow: '0 0 15px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.9)'
          }}>
            Innovation that shapes tomorrow's world.
          </p>
        </div>
      </section>

      {/* Slide 2 — RESPECTING OUR PAST */}
      <section ref={slide2Ref} id="slide2" className="h-screen flex items-center justify-center relative overflow-hidden">
        {/* Left Side - Past (Old Semi Truck with sepia) */}
        <div 
          className="absolute left-0 top-0 w-1/2 h-full overflow-hidden"
          style={{
            backgroundImage: 'url(/OldSemiTruck.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) sepia(60%) contrast(1.2)',
            opacity: 0.8,
          }}
        />
        
        {/* Right Side - Present (Modern Powertrain) */}
        <div 
          className="absolute right-0 top-0 w-1/2 h-full overflow-hidden"
          style={{
            backgroundImage: 'url(/hd_powertrain.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(30%) contrast(1.1)',
          }}
        />
        
        {/* Vignette Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)'
          }}
        />
        
        {/* Subtle Film Grain Effect */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
          }}
        />
        
        {/* Gradient Divider Line */}
        <div 
          className="absolute top-0 left-1/2 h-full w-1 -translate-x-1/2 z-20 opacity-40"
          style={{
            background: 'linear-gradient(to bottom, transparent, #c9a961, transparent)',
          }}
        />
        
        {/* Content */}
        <div className="text-center text-white z-10 px-8 max-w-5xl relative">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-luxury font-bold mb-4 md:mb-6 tracking-tight transition-all duration-1000 ${slide2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'} delay-0`} style={{
            textShadow: '0 0 30px rgba(0, 0, 0, 0.8), 0 4px 15px rgba(0, 0, 0, 0.9)'
          }}>
            RESPECTING OUR PAST
          </h2>
          <p className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-3 md:mb-4 transition-all duration-1000 ${slide2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'} delay-200`} style={{
            textShadow: '0 0 20px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(0, 0, 0, 0.9)'
          }}>
            Built on Integrity. Strengthened by Experience.
          </p>
          <p className={`text-base sm:text-lg md:text-xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ${slide2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'} delay-400`} style={{
            textShadow: '0 0 15px rgba(0, 0, 0, 0.8), 0 2px 8px rgba(0, 0, 0, 0.9)'
          }}>
            From engineering and technology to capital and development — a legacy of execution.
          </p>
        </div>
      </section>

      {/* Slide 3 — DELIVERING THE FUTURE OF POSSIBILITY */}
      <section ref={slide3Ref} id="slide3" className="h-screen flex items-center justify-center relative overflow-hidden bg-[#1a1a1a]">
        {/* Parallax Background Image */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${slide3Visible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: 'url(/datacenter.png)',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className={`absolute inset-0 bg-black/70 transition-opacity duration-1000 ${slide3Visible ? 'opacity-100' : 'opacity-0'}`}></div>
        
        {/* Holographic Scan Effect */}
        {slide3Visible && <HolographicScan />}
        
        <div className={`absolute inset-0 opacity-10 transition-opacity duration-1000 ${slide3Visible ? 'opacity-10' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#c9a961_1px,transparent_1px),linear-gradient(-45deg,#c9a961_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        </div>
        <div className={`text-center text-white z-10 px-8 max-w-5xl transition-all duration-1000 delay-300 ${slide3Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-luxury font-bold mb-4 md:mb-6 tracking-tight" style={{
            textShadow: '0 0 30px rgba(0,0,0,0.8), 0 4px 15px rgba(0,0,0,0.9)'
          }}>
            DELIVERING THE FUTURE<br />OF POSSIBILITY
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-3 md:mb-4" style={{
            textShadow: '0 0 20px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.9)'
          }}>
            Where Vision Becomes Reality.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-[#c9a961] font-light tracking-wide" style={{
            textShadow: '0 0 15px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.9)'
          }}>
            Real-asset investments powering tomorrow's economy.
          </p>
        </div>
      </section>

      {/* Slide 4 — FORTIS FUNDAMENTA */}
      <section ref={slide4Ref} id="slide4" className="h-screen flex items-center justify-center bg-[#1a1a1a] relative overflow-hidden">
        {/* Architectural Grid Background */}
        <div className="absolute inset-0" style={{ transform: 'translateZ(0)' }}>
          {/* Base fine grid */}
          <div 
            className={`absolute inset-0 transition-opacity duration-1000 ${slide4Visible ? 'opacity-15' : 'opacity-0'}`}
            style={{
              backgroundImage: `
                linear-gradient(rgba(201, 169, 97, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(201, 169, 97, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
          
          {/* Animated precision lines - vertical */}
          {slide4Visible && (
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className="absolute h-full w-[2px] bg-gradient-to-b from-transparent via-[#c9a961] to-transparent animate-line-emerge-1"
                style={{ left: '20%', transformOrigin: 'top' }}
              />
              <div 
                className="absolute h-full w-[2px] bg-gradient-to-b from-transparent via-[#c9a961] to-transparent animate-line-emerge-2"
                style={{ left: '40%', transformOrigin: 'top' }}
              />
              <div 
                className="absolute h-full w-[2px] bg-gradient-to-b from-transparent via-[#c9a961] to-transparent animate-line-emerge-3"
                style={{ left: '60%', transformOrigin: 'top' }}
              />
              <div 
                className="absolute h-full w-[2px] bg-gradient-to-b from-transparent via-[#c9a961] to-transparent animate-line-emerge-1"
                style={{ left: '80%', transformOrigin: 'top' }}
              />
            </div>
          )}
          
          {/* Animated precision lines - horizontal */}
          {slide4Visible && (
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#c9a961] to-transparent animate-line-emerge-2"
                style={{ top: '25%', transformOrigin: 'left' }}
              />
              <div 
                className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#c9a961] to-transparent animate-line-emerge-3"
                style={{ top: '50%', transformOrigin: 'left' }}
              />
              <div 
                className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#c9a961] to-transparent animate-line-emerge-1"
                style={{ top: '75%', transformOrigin: 'left' }}
              />
            </div>
          )}
          
          {/* Radial gradient overlay for depth */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 20%, rgba(26, 26, 26, 0.4) 60%, rgba(26, 26, 26, 0.9) 100%)'
            }}
          />
        </div>
        
        <div className="text-center text-white z-10 px-8 max-w-5xl relative">
          {/* Animated corner accents around content */}
          {slide4Visible && (
            <>
              <div className="absolute -top-8 -left-8 w-16 h-16 border-t-2 border-l-2 border-[#c9a961] opacity-0 animate-line-emerge-1" />
              <div className="absolute -top-8 -right-8 w-16 h-16 border-t-2 border-r-2 border-[#c9a961] opacity-0 animate-line-emerge-2" />
              <div className="absolute -bottom-8 -left-8 w-16 h-16 border-b-2 border-l-2 border-[#c9a961] opacity-0 animate-line-emerge-3" />
              <div className="absolute -bottom-8 -right-8 w-16 h-16 border-b-2 border-r-2 border-[#c9a961] opacity-0 animate-line-emerge-1" />
            </>
          )}
          
          {/* Logo with reveal animation */}
          <div className={`mb-8 relative transition-all duration-1200 ${slide4Visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            {/* Scanning beam effect over logo */}
            {slide4Visible && (
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{
                  animation: 'logo-scan 2s ease-out forwards'
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#c9a961] to-transparent"
                  style={{
                    animation: 'scan-down 2s ease-out forwards',
                    boxShadow: '0 0 10px rgba(201, 169, 97, 0.8)'
                  }}
                />
              </div>
            )}
            <img 
              src="/fortisfundamenta_logo_1.png" 
              alt="Fortis Fundamenta" 
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto mx-auto relative z-10"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(201, 169, 97, 0.4))',
                animation: slide4Visible ? 'subtle-pulse 3s ease-in-out infinite' : 'none'
              }}
            />
          </div>
          
          {/* Heading with letter reveal */}
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-luxury font-bold mb-4 md:mb-6 tracking-tight text-[#c9a961] transition-all duration-1000 delay-500 ${slide4Visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`} 
            style={{
              textShadow: '0 0 30px rgba(0,0,0,0.8), 0 4px 15px rgba(0,0,0,0.9), 0 0 60px rgba(201, 169, 97, 0.3)',
              animation: slide4Visible ? 'text-glow 4s ease-in-out infinite' : 'none'
            }}
          >
            FOUNDATION OF STRENGTH
          </h2>
          
          {/* Decorative line */}
          <div className={`w-32 h-[2px] bg-gradient-to-r from-transparent via-[#c9a961] to-transparent mx-auto mb-4 md:mb-6 transition-all duration-1000 delay-700 ${slide4Visible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
          
          {/* Subtitle with fade */}
          <p className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-3 md:mb-4 transition-all duration-1000 delay-900 ${slide4Visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`} style={{
            textShadow: '0 0 20px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.9)'
          }}>
            Structuring visionary excellence across property and technology.
          </p>
        </div>
      </section>

      {/* Slide 5 — INVEST IN EXCELLENCE */}
      <section id="slide5" className="h-screen flex items-center justify-center bg-[#1a1a1a] relative overflow-hidden">
        
        {/* CSS-generated Stars Background */}
        <div className="absolute inset-0 bg-stars" />
        
        {/* AuroraGold overlay with optimized settings */}
        <div className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
          <AuroraGold 
            colorStops={['#c9a961', '#d4b876', '#c9a961']}
            amplitude={0.5}
            blend={1}
            speed={0.3}
          />
        </div>
        
        {/* Gold-lit Skyline Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/GoldCoast3.png)',
          }}
        >
          {/* Dark overlay to subtly darken the image */}
          <div className="absolute inset-0" style={{background: 'rgba(10, 10, 20, 0.45)'}} />
        </div>
        
        {/* Vignette for premium feel */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)'
          }}
        />
        
        <div className="text-center text-white z-10 px-4 sm:px-6 md:px-8 max-w-5xl relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-luxury font-bold mb-4 md:mb-6 tracking-tight" style={{
            textShadow: '0 0 30px rgba(0,0,0,0.8), 0 4px 15px rgba(0,0,0,0.9)'
          }}>
            INVEST IN EXCELLENCE
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-3 md:mb-4" style={{
            textShadow: '0 0 20px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.9)'
          }}>
            A Managed Fund for Sophisticated Investors.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 font-light mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2" style={{
            textShadow: '0 0 15px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.9)'
          }}>
            Partner with Fortis Fundamenta and invest in the foundations of the future.
          </p>
          <button className="bg-[#c9a961] hover:bg-[#d4b876] text-[#1a1a1a] font-semibold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-12 py-3 md:py-4 rounded-sm transition-all duration-300 tracking-wide shadow-2xl hover:shadow-[#c9a961]/60 hover:scale-105 w-full sm:w-auto max-w-sm">
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
