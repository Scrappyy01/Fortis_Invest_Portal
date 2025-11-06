import Navbar from '../components/Navbar';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navbar />
      
      <main className="container mx-auto px-8 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-luxury font-bold text-white mb-8 tracking-tight">
            Projects
          </h1>
          <p className="text-xl text-gray-300">Coming soon...</p>
        </div>
      </main>
    </div>
  );
}
