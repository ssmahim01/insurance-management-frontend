"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutUsSection() {
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
    <section className="bg-white py-16 dark:bg-neutral-950 sm:py-20">
      <div
        ref={sectionRef}
        className={`mx-auto max-w-4xl px-5 text-center transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="mb-8 text-3xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-4xl">
          About Us
        </h2>

        <div className="space-y-5 text-[15px] leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
          <p>
            Shurokka, (also globally known as BIMA), is a Swedish HealthTech.
            It is operating across 6 countries in Asia and Africa with the
            aim to make healthcare more accessible in emerging economies.
            Shurokka started its initial operations in Ghana in 2010, and
            started in Bangladesh right after, in 2012.
          </p>
          <p>
            Shurokka has been the pioneer in tele-doctor services in
            Bangladesh. In the last 11+ years, it has served more than 1
            crore customers in Bangladesh. Currently, Shurokka Bangladesh
            offers a range of services across the spectrum from Micro Health
            and Life Insurance and Travel Insurance among others. SHUROKKA
            is also the first to spearhead cashless medical experience for
            customers, with its Wellness Plan in Bangladesh.
          </p>
        </div>
      </div>
    </section>
  );
}