"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

const placeholderAvatar = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#E5E7EB"/>
  <circle cx="100" cy="80" r="35" fill="#9CA3AF"/>
  <path d="M40 190 C40 140 70 120 100 120 C130 120 160 140 160 190 Z" fill="#9CA3AF"/>
</svg>
`); 

const globalTeam: TeamMember[] = [
  { id: 1, name: "Gustaf Agartson", role: "CEO, Global", image: placeholderAvatar },
  { id: 2, name: "Michelle Duan", role: "Chief Financial Officer", image: placeholderAvatar },
  { id: 3, name: "Balaji Jayavelu", role: "Chief Technology Officer", image: placeholderAvatar },
  { id: 4, name: "Stewart Langdon", role: "Board Director", image: placeholderAvatar},
  { id: 5, name: "Suramya Gupta", role: "Board Director", image: placeholderAvatar },
];

const bangladeshTeam: TeamMember[] = [
  { id: 1, name: "Muinur Rahman", role: "Chief Operating Officer (COO), Bangladesh", image: placeholderAvatar },
  { id: 2, name: "Riaz Mostofa", role: "Chief Financial Officer (CFO), Bangladesh", image: placeholderAvatar },
  { id: 3, name: "Israt Mustafa", role: "Country Lead, Product", image: placeholderAvatar },
  { id: 4, name: "Shafiqul Islam Sutirtha", role: "Country Lead, People Operations & Experience", image:placeholderAvatar },
  { id: 5, name: "M. Asif", role: "Country Lead, IT", image: placeholderAvatar },
  { id: 6, name: "Rezaur Rahim", role: "Country Lead, Claims", image: placeholderAvatar },
  { id: 7, name: "Rahat Ikbal", role: "Country Lead, Field Sales", image: placeholderAvatar },
];

function TeamGrid({
  title,
  members,
  visible,
}: {
  title: string;
  members: TeamMember[];
  visible: boolean;
}) {
  return (
    <div className="mb-16 last:mb-0">
      <h3
        className={`mb-10 text-center text-2xl font-extrabold text-[#0B1F3A] transition-all duration-700 ease-out dark:text-white sm:text-3xl ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {title}
      </h3>

      <div className="grid grid-cols-2 justify-items-center gap-x-5 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
        {members.map((member, index) => (
          <div
            key={member.id}
            style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
            className={`flex w-full max-w-40 flex-col items-center text-center transition-all duration-700 ease-out rounded-2xl hover:-translate-y-1.5 hover:shadow ${
              visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-800 sm:h-36 sm:w-36">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="144px"
                className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
              />
            </div>

            <p className="text-sm font-bold text-[#0B1F3A] dark:text-white">
              {member.name}
            </p>
            <p className="mt-1 text-xs uppercase leading-snug tracking-wide text-gray-500 dark:text-gray-400">
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 dark:bg-neutral-950 sm:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <TeamGrid title="Our Experienced Global Team" members={globalTeam} visible={visible} />
        <TeamGrid title="Our Seasoned Bangladesh Team" members={bangladeshTeam} visible={visible} />
      </div>
    </section>
  );
}