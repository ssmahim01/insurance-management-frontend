"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PartnerSection() {
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
    <section className="bg-[#EFF4FA] py-16 dark:bg-neutral-950 sm:py-20">
      <div
        ref={sectionRef}
        className="mx-auto max-w-4xl px-6 text-center"
      >
        <div
          className={`transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-4xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-5xl">
            500+ Partner Hospitals
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
            With a Shurokka Subscription, get discounts at 500+ partner
            hospitals and diagnostic centers / labs across all 64 districts
            in Bangladesh. Our partner hospitals offer a range of discounts
            on diagnostic tests &amp; hospitalization, ranging from a
            minimum of 10% up to 50%.
          </p>
        </div>

        <div
          className={`relative mt-10 h-64 w-full overflow-hidden rounded-2xl shadow-lg shadow-black/5 transition-all duration-700 ease-out dark:shadow-black/30 sm:h-80 lg:h-96 ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{ transitionDelay: visible ? "150ms" : "0ms" }}
        >
          <Image
            src="/assets/10-50-Discount-1-1.webp"
            alt="500+ partner hospitals across Bangladesh offering 10-50% discount"
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <div
          className={`mt-10 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: visible ? "300ms" : "0ms" }}
        >
          <Link
            href="/our-partners"
            className="group inline-flex items-center gap-2 rounded-full bg-[#00C896] px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:bg-[#0F467C] hover:shadow-lg hover:shadow-black/10"
          >
            Our Partner Hospitals
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}