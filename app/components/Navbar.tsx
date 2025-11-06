import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#c9a961]/20">
      <div className="container mx-auto px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/fortisfundamenta_logo_4.png" alt="Fortis Fundamenta Logo" className="h-12 w-auto" />
        </Link>
        <div className="flex gap-8 text-sm tracking-wide">
          <Link href="/Team" className="text-white hover:text-[#c9a961] transition-colors duration-300">THE TEAM</Link>
          <Link href="/Projects" className="text-white hover:text-[#c9a961] transition-colors duration-300">PROJECTS</Link>
          <Link href="/Invest" className="text-white hover:text-[#c9a961] transition-colors duration-300">INVEST</Link>
        </div>
      </div>
    </nav>
  );
}
