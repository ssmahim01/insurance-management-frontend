"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ValueItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

const values: ValueItem[] = [
  {
    id: 1,
    image: "/assets/values/earn-give-respect.svg",
    title: "Earn and Give Respect",
    description:
      "We show consideration for each other and for our customers. We celebrate diversity and are kind and sensitive when discussing ways in which we are different.",
  },
  {
    id: 2,
    image: "/assets/values/think-big-start-small.svg",
    title: "Think Big Start Small",
    description:
      "We imagine solutions that will challenge the status quo. We start small, take time to get it right, then let it fly. We empower our people to share and test their ideas. We believe in growing our people because every employee can have an impact on the business.",
  },
  {
    id: 3,
    image: "/assets/values/take-ownership.svg",
    title: "Take Ownership",
    description:
      "Every one of our employees has a responsibility to our customers to deliver value and service. We recognise and reward people who take initiative, follow through on ideas with analysis and action, and go beyond their role to make Shurokka better.",
  },
];

export default function ValuesSection() {
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-16 dark:bg-neutral-950 sm:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <h2
          className={`mb-14 text-center text-3xl font-extrabold text-[#0B1F3A] transition-all duration-700 ease-out dark:text-white sm:text-4xl ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Our Values and Equality
        </h2>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 gap-8 sm:grid-cols-3"
        >
          {values.map((value, index) => (
            <div
              key={value.id}
              style={{ transitionDelay: visible ? `${index * 150}ms` : "0ms" }}
              className={`rounded-2xl bg-[#EFF4FA] p-6 transition-all duration-700 ease-out dark:bg-neutral-900 hover:-translate-y-1.5 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative mb-5 h-48 w-full overflow-hidden rounded-xl">
                <Image
                  src={value.image}
                  alt={value.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              <h3 className="mb-3 text-lg font-bold text-[#0B1F3A] dark:text-white">
                {value.title}
              </h3>

              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}