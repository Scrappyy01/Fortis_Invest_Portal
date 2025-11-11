'use client';

import Navbar from '../components/Navbar';
import LoadingScreen from '../components/LoadingScreen';
import { useState, useRef, useEffect } from 'react';

export default function InvestPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Loading state
  const [isLoaded, setIsLoaded] = useState(false);

  // Visibility states for fade-down animations
  const [heroVisible, setHeroVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [featuredVisible, setFeaturedVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Wait for loading screen to finish before starting animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800); // Match LoadingScreen duration

    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for fade-down animations (only after loading)
  useEffect(() => {
    if (!isLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === heroRef.current) setHeroVisible(true);
            if (entry.target === cardsRef.current) setCardsVisible(true);
            if (entry.target === featuredRef.current) setFeaturedVisible(true);
            if (entry.target === contactRef.current) setContactVisible(true);
            if (entry.target === ctaRef.current) setCtaVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    [heroRef, cardsRef, featuredRef, contactRef, ctaRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [isLoaded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Loading Screen */}
      <LoadingScreen />
      
      <Navbar />
      
      <main className="container mx-auto px-8 pt-32 pb-16">
        {/* Hero Section */}
        <div ref={heroRef} className={`max-w-6xl mx-auto text-center mb-20 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}>
          <h1 className="text-6xl md:text-7xl font-luxury font-bold text-white mb-6 tracking-tight">
            Investor Centre
          </h1>
          <p className="text-2xl md:text-3xl text-[#c9a961] font-light">
            Invest with Confidence. Governed, Audited, and Transparent.
          </p>
        </div>

        {/* Main Content Grid */}
        <div ref={cardsRef} className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 transition-all duration-1000 delay-200 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}>
          
          {/* Wholesale Investor Eligibility */}
          <div className="bg-[#252525] border border-[#c9a961]/20 p-8 rounded-sm">
            <h2 className="text-3xl font-luxury font-bold text-[#c9a961] mb-6">
              Wholesale Investor Eligibility
            </h2>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <p>
                Under ASIC regulations, wholesale investors must meet one or more of the following criteria:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="flex items-start">
                  <span className="text-[#c9a961] mr-2">•</span>
                  <span>Net assets of at least $2.5 million, or</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a961] mr-2">•</span>
                  <span>Gross income for each of the last two financial years of at least $250,000, or</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a961] mr-2">•</span>
                  <span>A professional investor as defined under the Corporations Act 2001</span>
                </li>
              </ul>
              <p className="text-sm text-gray-400 mt-6 italic">
                Certification by a qualified accountant may be required to verify eligibility.
              </p>
            </div>
          </div>

          {/* Custodian & Trustee */}
          <div className="bg-[#252525] border border-[#c9a961]/20 p-8 rounded-sm">
            <h2 className="text-3xl font-luxury font-bold text-[#c9a961] mb-6">
              Custodian & Trustee
            </h2>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <p className="text-xl font-semibold text-white">Quay Services</p>
              <p>
                Fortis Fundamenta has engaged Quay Services as the independent custodian and trustee for the fund, ensuring:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="flex items-start">
                  <span className="text-[#c9a961] mr-2">•</span>
                  <span>Institutional-grade asset protection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a961] mr-2">•</span>
                  <span>Independent oversight and governance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a961] mr-2">•</span>
                  <span>Transparent reporting and compliance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#c9a961] mr-2">•</span>
                  <span>Regulatory adherence to Australian standards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Fortis Fund - Featured Section */}
        <div ref={featuredRef} className={`max-w-7xl mx-auto mb-20 transition-all duration-1000 delay-300 ${featuredVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}>
          <div className="bg-gradient-to-r from-[#c9a961]/10 to-[#d4b876]/10 border-2 border-[#c9a961]/40 p-12 rounded-sm text-center">
            <div className="mb-6">
              <img 
                src="/fortisfundamenta_logo_1.png" 
                alt="The Fortis Fund" 
                className="h-20 w-auto mx-auto opacity-90"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-luxury font-bold text-[#c9a961] mb-4">
              THE FORTIS FUND
            </h2>
            <p className="text-2xl text-white mb-8 font-light">
              Investment Now Open – Apply for Investor Access
            </p>
            <a
              href="/investor-portal"
              className="inline-block bg-[#c9a961] hover:bg-[#d4b876] text-[#1a1a1a] font-semibold text-lg px-16 py-5 rounded-sm transition-all duration-300 tracking-wide shadow-2xl hover:shadow-[#c9a961]/60 hover:scale-105"
            >
              ACCESS INVESTOR PORTAL
            </a>
          </div>
        </div>

        {/* Contact for Investor Relations */}
        <div ref={contactRef} className={`max-w-4xl mx-auto mb-20 transition-all duration-1000 delay-400 ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}>
          <div className="bg-[#252525] border border-[#c9a961]/20 p-10 rounded-sm">
            <h2 className="text-4xl font-luxury font-bold text-[#c9a961] mb-3 text-center">
              Contact Investor Relations
            </h2>
            <p className="text-center text-gray-400 mb-8">
              Have questions? Our investor relations team is here to help.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#c9a961]/30 rounded-sm text-white focus:outline-none focus:border-[#c9a961] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#c9a961]/30 rounded-sm text-white focus:outline-none focus:border-[#c9a961] transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#c9a961]/30 rounded-sm text-white focus:outline-none focus:border-[#c9a961] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#c9a961]/30 rounded-sm text-white focus:outline-none focus:border-[#c9a961] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#c9a961] hover:bg-[#d4b876] text-[#1a1a1a] font-semibold text-lg px-8 py-4 rounded-sm transition-all duration-300 tracking-wide shadow-lg hover:shadow-[#c9a961]/50"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>

        {/* Apply for Investor Access CTA */}
        <div ref={ctaRef} className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-500 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}>
          <div className="bg-[#252525] border-2 border-[#c9a961]/40 p-12 rounded-sm">
            <h2 className="text-4xl md:text-5xl font-luxury font-bold text-white mb-4">
              Ready to Begin?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Submit your application to join sophisticated investors in the Fortis Fund.
            </p>
            <a
              href="/apply"
              className="inline-block bg-[#c9a961] hover:bg-[#d4b876] text-[#1a1a1a] font-semibold text-lg px-16 py-5 rounded-sm transition-all duration-300 tracking-wide shadow-2xl hover:shadow-[#c9a961]/60 hover:scale-105"
            >
              APPLY FOR INVESTOR ACCESS
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
