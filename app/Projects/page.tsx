'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from "../components/Navbar";

export default function ProjectsPage() {
  // Visibility states for fade-down animations
  const [headlineVisible, setHeadlineVisible] = useState(false);
  const [currentProjectsVisible, setCurrentProjectsVisible] = useState(false);
  const [pastProjectsVisible, setPastProjectsVisible] = useState(false);

  const headlineRef = useRef<HTMLElement>(null);
  const currentProjectsRef = useRef<HTMLElement>(null);
  const pastProjectsRef = useRef<HTMLElement>(null);

  // Intersection Observer for fade-down animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headlineRef.current) setHeadlineVisible(true);
            if (entry.target === currentProjectsRef.current) setCurrentProjectsVisible(true);
            if (entry.target === pastProjectsRef.current) setPastProjectsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    [headlineRef, currentProjectsRef, pastProjectsRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Fundo com grid dourado */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#c9a961_1px,transparent_1px),linear-gradient(to_bottom,#c9a961_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />

      {/* Conteúdo sobreposto */}
      <div className="relative z-10 bg-[#1a1a1a]/95">
        <Navbar />

        <main className="container mx-auto px-8 pt-32 pb-16 space-y-16">
          {/* Headline */}
          <section ref={headlineRef} className={`max-w-6xl mx-auto text-center pt-8 pb-4 transition-all duration-1000 ${headlineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}>
            
            <h1
              className="font-custom text-5xl md:text-7xl lg:text8xl font-bold tracking-tight text-[#c9a961] mb-2 transition-all duration-1000 delay-500 opacity-100 translate-y-0"
              style={{   
                textShadow:
                  "rgba(0, 0, 0, 1) 0px 0px 40px, rgba(0, 0, 0, 1) 0px 6px 20px, rgba(201, 169, 97, 0.6) 0px 0px 100px",
                animation: "text-glow 4s ease-in-out infinite",
              }}
            >
              STRATEGIC HIGH-GROWTH INVESTMENTS 
            </h1>

            <h1
              className="font-custom text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#c9a961] mb-4 transition-all duration-1000 delay-500 opacity-100 translate-y-0"
              style={{
                textShadow:
                  "rgba(0, 0, 0, 1) 0px 0px 0px, rgba(0, 0, 0, 1) 0px 6px 20px, rgba(201, 169, 97, 0.6) 0px 0px 100px",
                animation: "text-glow 4s ease-in-out infinite",
              }}
            >
              ANCHORED BY REAL ASSETS
            </h1>

            <div className="mx-auto w-[60%] h-[2px] bg-gradient-to-r from-transparent via-[#c9a961] to-transparent blur-md opacity-90" />
          </section>

          {/* Current Projects */}
          <section ref={currentProjectsRef} className={`max-w-6xl mx-auto space-y-8 transition-all duration-1000 delay-200 ${currentProjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}>
            <h1 className="text-3xl md:text-4xl lg:text-4xl font-semibold text-[#ffffff] tracking-wide mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-10">
              Current Projects
            </h1>

            {/* Project Cerebrum */}
            <div className="relative rounded-2xl shadow-lg h-[440px] overflow-hidden group">
              <img
                src="/hyspacdata.png"
                alt="Project Cerebrum"
                className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 ease-in-out scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 z-10 transition duration-300 group-hover:bg-black/50" />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
                <h3 className="text-3xl text-white font-bold mb-2">
                  Project Cerebrum
                </h3>
                <p className="text-lg text-gray-300 mb-4">
                  Hyperscale Data Center Campus
                </p>
                <a className="text-[#c9a961] font-semibold hover:underline">
                  DETAILS YET TO BE RELEASED →
                </a>
              </div>
            </div>

            {/* Project Solaris SEQ */}
            <div className="relative rounded-2xl shadow-lg h-[440px] overflow-hidden group">
              <img
                src="/Solaris.png"
                alt="Project Solaris SEQ"
                className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 ease-in-out scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 z-10 transition duration-300 group-hover:bg-black/50" />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
                <h3 className="text-3xl text-white font-bold mb-2">
                  Project Solaris SEQ
                </h3>
                <p className="text-lg text-gray-300 mb-4">
                  Energy Infrastructure, Details yet to be released.
                </p>
                <a className="text-[#c9a961] font-semibold hover:underline">
                  DETAILS YET TO BE RELEASED →
                </a>
              </div>
            </div>
          </section>

          {/* Past Project Experience */}
          <section ref={pastProjectsRef} className={`max-w-6xl mx-auto space-y-8 transition-all duration-1000 delay-400 ${pastProjectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}>
            <h1 className="text-3xl md:text-4xl lg:text-4xl font-semibold text-[#ffffff] tracking-wide mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-10">
              Past Project Experience
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProjectCard
                image="/Homemaker-Centre.jpg"
                title="Homemakers Mega Centre Penrith"
                description="Design, development and construction of a major bulky goods retail shopping centre comprising 30,000 of net lettable floor area in Penrith NSW."
                value="$65.5m"
              />

              <ProjectCard
                image="/Kemblawarra Business.webp"
                title="Kemblawarra Business Park"
                description="Design, development and construction of a multi-use industrial business park located in the Illawarra region south of Sydney."
                value="$20m"
              />

              <ProjectCard
                image="/King Street.jpeg"
                title="King Street Office Complex"
                description="Refurbish and extension of an existing multistorey office and retail building in the Illawarra region south of Sydney."
                value="$13.2m"
              />

              <ProjectCard
                image="/Unanderra Industrial.jpg"
                title="Unanderra Industrial Land Subdivision"
                description="Design, development and construction of a new industrial land subdivision comprising 15 industrial lots in the Illawarra region south of Sydney."
                value="$11.8m"
              />

              <ProjectCard
                image="/Mary’s Veil.png"
                title="Mary’s Veil Estate Dubbo Stage 1"
                description="Design, development and construction of a new residential estate comprising 33 residential lots with an average lot size of 600m² located in Dubbo NSW."
                value="$5.8m"
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// ✅ Card reutilizável para projetos passados
interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  value: string;
}

function ProjectCard({ image, title, description, value }: ProjectCardProps) {
  return (
    <div className="relative rounded-2xl shadow-lg h-[440px] overflow-hidden group">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 ease-in-out scale-100 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/60 z-10 transition duration-300 group-hover:bg-black/50" />
      <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
        <h3 className="text-2xl text-white font-bold mb-2">{title}</h3>
        <p className="text-gray-300 mb-2">{description}</p>
        <p className="text-[#c9a961] font-semibold">Project Value {value}</p>
      </div>
    </div>
  );
}
