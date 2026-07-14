"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface PurposeItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

const purposeItems: PurposeItem[] = [
  {
    id: 1,
    image: "/assets/purpose/serving-underserved.jpg",
    title: "Serving the underserved",
    description:
      "Over a decade ago, we created the concept of micro-insurance which could be accessed very easily, through mobile, and address the healthcare needs of the underserved.",
  },
  {
    id: 2,
    image: "/assets/purpose/experience.jpg",
    title: "Experience",
    description:
      "We put customer experience at the center and ensure that customers want Shurokka to be part of their lives. We pride ourselves on sharing these learnings across our markets globally, and continue to build on it to serve customers better.",
  },
  {
    id: 3,
    image: "/assets/purpose/integrated-health.jpg",
    title: "Integrated health & insurance",
    description:
      "We create integrated health and insurance solutions and partner with leading financial service enablers to offer accessible and affordable solutions for underserved consumers.",
  },
  {
    id: 4,
    image: "/assets/purpose/mobile-health.jpg",
    title: "Unlocking mobile for health",
    description:
      "By leveraging mobile technology to deliver health solutions, we are able to scale rapidly and serve millions of 'unreachable' customers.",
  },
];

export default function PurposeSection() {
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#EFF4FA] py-16 dark:bg-neutral-950 sm:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div
          className={`mx-auto mb-14 max-w-2xl text-center transition-all duration-700 ease-out  ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-4xl">
            How We Bring Purpose to Life
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            We challenge the status quo in emerging markets. In a decade, we
            have changed the way emerging market consumers experience health
            solutions by harnessing technology.
          </p>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {purposeItems.map((item, index) => (
            <div
              key={item.id}
              style={{ transitionDelay: visible ? `${index * 130}ms` : "0ms" }}
              className={`transition-all duration-700 ease-out hover:-translate-y-1.5 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative mb-4 h-44 w-full overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <h3 className="mb-2 text-base  font-bold text-[#0B1F3A] dark:text-white">
                {item.title}
              </h3>

              <p className="text-sm leading-relaxed text-justify text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}