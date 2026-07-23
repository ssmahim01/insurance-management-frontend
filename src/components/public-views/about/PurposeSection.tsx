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
    image:
      "https://www.eagletelemedicine.com/wp-content/uploads/2022/11/serving.jpg",
    title: "Serving the underserved",
    description:
      "Over a decade ago, we created the concept of micro-insurance which could be accessed very easily, through mobile, and address the healthcare needs of the underserved.",
  },
  {
    id: 2,
    image:
      "https://electronichealthreporter.com/wp-content/uploads/2023/10/Medical-Staff-Team-1030x686-1.jpg",
    title: "Experience",
    description:
      "We put customer experience at the center and ensure that customers want Shurokka to be part of their lives. We pride ourselves on sharing these learnings across our markets globally, and continue to build on it to serve customers better.",
  },
  {
    id: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuVcQfb_xHqvSv6nqBEMFKvwPV826xtnzNx1FvW3qpQnMmibWGM04fDo1k&s=10",
    title: "Integrated health & insurance",
    description:
      "We create integrated health and insurance solutions and partner with leading financial service enablers to offer accessible and affordable solutions for underserved consumers.",
  },
  {
    id: 4,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6TE--S0R-Y0-hIr3mfPzS_llvTyHgnKDdP_poCH0LCmcHqoE7DRDPkfu9&s=10",
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
    <section className="relative overflow-hidden bg-[#EFF4FA] py-16 dark:bg-neutral-950 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-105 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,200,150,0.08),transparent)]"
      />

      <div className="mx-auto max-w-7xl px-5">
        <div
          className={`mx-auto mb-14 max-w-2xl text-center transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#00A67E]">
            Our Purpose
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0B1F3A] dark:text-white sm:text-4xl">
            How We Bring Purpose to Life
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            We challenge the status quo in emerging markets. In a decade, we
            have changed the way emerging market consumers experience health
            solutions by harnessing technology.
          </p>
          <div className="mx-auto mt-6 h-1 w-14 rounded-full bg-[#00C896]" />
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {purposeItems.map((item, index) => (
            <div
              key={item.id}
              style={{ transitionDelay: visible ? `${index * 130}ms` : "0ms" }}
              className={`group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm shadow-black/5 ring-1 ring-black/5 transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/10 dark:bg-neutral-900 dark:ring-white/10 motion-reduce:transition-none motion-reduce:transform-none ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/50 via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 text-base font-bold text-[#0B1F3A] dark:text-white">
                  {item.title}
                </h3>
                <div className="mb-3 h-0.5 w-8 rounded-full bg-[#00C896]/60" />
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}