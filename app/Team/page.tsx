"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";

const teamMembers = [
  {
    name: "Anthony Kosseris",
    image: "/Anthony__.png",
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
    role: "Board Member (Pending)",
    bio: "May or may not be involved — confirmation pending.",
    positions: [],
  },
  {
    name: "Matthew Hunt",
    image: "/Matt.JPG",
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

function TeamCard({ member }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="relative group w-screen sm:w-[300px] h-[100vh] sm:h-[600px] md:h-[650px] lg:h-[700px] flex-shrink-0 overflow-hidden cursor-pointer transition-all duration-300 flex items-center justify-center scroll-snap-align-start"
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
        <div className="absolute inset-0 bg-[#1a1a1a] bg-opacity-95 p-6 overflow-y-auto z-30 flex flex-col justify-center text-left">
          <h3 className="text-2xl font-bold text-[#c9a961] mb-3">
            {member.name}
          </h3>
          <p className="text-base text-gray-400 italic mb-3">{member.role}</p>
          <p className="text-base leading-relaxed text-gray-300 mb-4">
            {member.bio}
          </p>
          {member.positions.length > 0 && (
            <ul className="space-y-2">
              {member.positions.map((pos, idx) => (
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
  return (
    <div className="relative min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      <Navbar />
      <section className="absolute top-0 left-0 w-full pt-[100px] pb-4 text-center z-40">
        <h1
          className="text-4xl md:text-6xl lg:text-5xl font-bold tracking-tight text-[#c9a961] mb-2 transition-all duration-1000 delay-500 opacity-100 translate-y-0"
          style={{
            fontFamily: "'Unica One', sans-serif",
            textShadow:
              "rgba(0, 0, 0, 1) 0px 0px 40px, rgba(0, 0, 0, 1) 0px 6px 20px, rgba(201, 169, 97, 0.6) 0px 0px 120px",
            animation: "text-glow 4s ease-in-out infinite",
          }}
        >
          OUR TEAM
        </h1>
        <div className="mx-auto w-[50%] h-[2px] bg-gradient-to-r from-transparent via-[#c9a961] to-transparent blur-md opacity-90" />
      </section>

      <main className="pt-[200px] px-0 sm:px-6 w-full flex justify-center items-center overflow-x-auto scroll-snap-x">
        <div className="flex flex-nowrap justify-center items-center gap-0 max-w-screen-xl">
          {teamMembers.map((member, idx) => (
            <TeamCard key={idx} member={member} />
          ))}
        </div>
      </main>
    </div>
  );
}
