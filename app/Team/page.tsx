import Navbar from '../components/Navbar';

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navbar />
      
      <main className="container mx-auto px-8 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-luxury font-bold text-white mb-16 tracking-tight">
            Our Team
          </h1>
          
          {/* Team Member Profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            {/* Image - Left Side */}
            <div className="relative overflow-hidden rounded-sm">
              <img 
                src="/Dog.jpg" 
                alt="Team Member" 
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            
            {/* Text - Right Side */}
            <div className="text-white space-y-6">
              <h2 className="text-3xl md:text-4xl font-luxury font-bold text-[#c9a961] mb-4">
                John Doe
              </h2>
              <p className="text-lg leading-relaxed text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg leading-relaxed text-gray-300">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>
              
              {/* Bullet Points */}
              <ul className="space-y-3 pt-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a961] text-xl">•</span>
                  <span className="text-gray-300">Over 15 years of experience in capital markets and strategic investment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a961] text-xl">•</span>
                  <span className="text-gray-300">Led multiple billion-dollar infrastructure projects across global markets</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a961] text-xl">•</span>
                  <span className="text-gray-300">Specialized in emerging technologies and real-asset portfolio management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
