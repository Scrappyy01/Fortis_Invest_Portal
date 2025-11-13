"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";

interface TeamMember {
  name: string;
  image: string;
  role: string;
  bio: string;
  positions: string[];
}

const teamMembers: TeamMember[] = [
  {
    name: "Anthony Kosseris",
    image: "/Anthony.JPG",
    role: "Director and Investment Manager",
    bio: "Anthony is a visionary entrepreneur and innovator with expertise in engineering, law, and property. He brings over 30 years of experience building and delivering successful ventures across technology, freight, logistics, manufacturing, and property.",
    positions: [
      "Fortis Fundamenta Pty Ltd – Director and Investment Manager",
      "Load Link Australia Pty Ltd – Founder and Managing Director",
      "Loadlink Logistics Pty Ltd – Founder and Managing Director",
      "AJK Engines & Powertrains – Founder and Managing Director",
    ],
  },
  {
    name: "John Kosseris",
    image: "/Dog.jpg",
    role: "Director",
    bio: "John is an experienced entrepreneur with over 55 years in property development, construction, and freight. He has successfully navigated multiple financial cycles and built enduring businesses.",
    positions: ["Fortis Fundamenta Pty Ltd – Director"],
  },
  {
    name: "Melissa Nedelkovska",
    image: "/Melissa.jpg",
    role: "Director",
    bio: "Melissa has a Masters Degree in Accounting and a Bachelor of Business Management & Marketing. She brings over 25 years of experience in the Residential and Commercial Property Development and Management space",
    positions: [
      "Fortis Fundamenta Pty Ltd – Director",
      "CFO of All Properties Group.",
    ],
  },
  {
    name: "Matthew Hunt",
    image: "/Matt.png",
    role: "Business Development Manager",
    bio: "Over 30 years of experience as a prototype developer and business development manager. Held senior roles in multiple international companies.",
    positions: [],
  },
  {
    name: "Stuart Gale",
    image: "/Stuart.PNG",
    role: "Head of IT",
    bio: "Veteran technology specialist with over 30 years in coding, web and application development. Founded and operated digital agencies since the early internet era. Delivered high-profile technology solutions across industries.",
    positions: [],
  },
];

function TeamCard({ member }: { member: TeamMember }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="relative group w-full md:w-[300px] h-screen md:h-[600px] lg:h-[700px] flex-shrink-0 overflow-hidden cursor-pointer transition-all duration-300 flex items-center justify-center snap-start"
      onClick={() => setExpanded(!expanded)}
    >
      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
      />
      <button className="absolute inset-x-0 bottom-6 mx-auto bg-[#c9a961] text-black text-sm font-semibold px-5 py-2 rounded-full opacity-90 group-hover:opacity-100 transition z-20 w-fit">
        {member.name}
      </button>

      {expanded && (
        <div className="absolute inset-0 bg-[#1a1a1a] bg-opacity-95 p-6 overflow-y-auto z-30 flex flex-col items-start justify-center">
          <h3 className="text-2xl font-bold text-[#c9a961] mb-3">
            {member.name}
          </h3>
          <p className="text-base text-gray-400 italic mb-3">{member.role}</p>
          <p className="text-base leading-relaxed text-gray-300 mb-4">
            {member.bio}
          </p>
          {member.positions.length > 0 && (
            <ul className="space-y-2">
              {member.positions.map((pos: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#c9a961] text-lg">•</span>
                  <span className="text-gray-300 text-base">{pos}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default function TeamPage() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingComplete(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isLoadingComplete) {
            if (entry.target === headerRef.current) setHeaderVisible(true);
            if (entry.target === cardsRef.current) setCardsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);

    return () => observer.disconnect();
  }, [isLoadingComplete]);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#c9a961_1px,transparent_1px),linear-gradient(to_bottom,#c9a961_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />
      <div className="relative z-10 bg-[#1a1a1a]/95 min-h-screen">
        <Navbar />

        <section
          ref={headerRef}
          className={`pt-[100px] pb-8 text-center transition-all duration-1000 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-12"
          }`}
        >
          <h1
            className=" font-custom text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#c9a961] mb-2"
            style={{
              textShadow:
                "rgba(0, 0, 0, 1) 0px 0px 40px, rgba(0, 0, 0, 1) 0px 6px 20px, rgba(201, 169, 97, 0.6) 0px 0px 120px",
              animation: "text-glow 4s ease-in-out infinite",
            }}
          >
            OUR TEAM
          </h1>
          <div className="mx-auto w-[50%] h-[2px] bg-gradient-to-r from-transparent via-[#c9a961] to-transparent blur-md opacity-90" />
        </section>

        <main
          ref={cardsRef}
          className={`w-full transition-all duration-1000 delay-200 ${
            cardsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-12"
          }`}
        >
          <div className="md:hidden w-full h-screen overflow-y-scroll snap-y snap-mandatory">
            {teamMembers.map((member, idx) => (
              <TeamCard key={idx} member={member} />
            ))}
          </div>

          <div className="hidden md:flex justify-center items-center overflow-x-auto snap-x snap-mandatory px-6 pb-16">
            <div className="flex flex-nowrap justify-center items-center gap-0 max-w-screen-xl">
              {teamMembers.map((member, idx) => (
                <TeamCard key={idx} member={member} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
