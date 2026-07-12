"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function GlobalOperationSection() {
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
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#EFF4FA] py-16 dark:bg-neutral-950 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2
          className={`mb-12 text-center text-3xl font-extrabold text-[#0B1F3A] transition-all duration-700 ease-out dark:text-white sm:text-4xl ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Our Global Operation
        </h2>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2"
        >
          <div
            className={`relative h-64 w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-700 ease-out dark:bg-neutral-900 dark:ring-white/10 sm:h-80 ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <Image
              src="/assets/global-operation-map.png"
              alt="Shurokka global operation map across Ghana, Tanzania, Pakistan, Bangladesh, Sri Lanka, Cambodia, and Singapore"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6"
            />
          </div>

          <div
            className={`transition-all duration-700 ease-out ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: visible ? "150ms" : "0ms" }}
          >
            <p className="text-[15px] leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
              Shurokka (BIMA), from its origin in Sweden, has been working
              across various markets globally, with the aim of leveraging
              mobile technology to bridge the healthcare gap for the
              underserved, in emerging economies. Notably, globally Shurokka
              has garnered a user base of over 5 million active subscribers
              and 20 million beneficiaries currently, and continuing to
              innovate and serve customers to make healthcare affordable and
              accessible to all.
            </p>

            <Link
              href="/global-operations"
              className="mt-4 inline-block text-sm font-semibold text-[#007A55] underline underline-offset-4 transition-colors hover:text-[#00A67E] dark:text-[#00E0AE]"
            >
              Know more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}