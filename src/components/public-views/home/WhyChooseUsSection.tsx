"use client";

import { useEffect, useRef, useState } from "react";
import {
  Wallet,
  HandCoins,
  Stethoscope,
  ShieldCheck,
  HeartPulse,
  Smartphone,
} from "lucide-react";

interface Benefit {
  id: number;
  icon: typeof Wallet;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    id: 1,
    icon: Wallet,
    title: "Affordable Protection",
    description:
      "Quality healthcare shouldn't be expensive. Our plans are designed to provide meaningful protection at an affordable cost.",
  },
  {
    id: 2,
    icon: HandCoins,
    title: "Cash Support During Hospitalization",
    description:
      "Receive financial assistance while admitted to the hospital, helping you focus on recovery instead of expenses.",
  },
  {
    id: 3,
    icon: Stethoscope,
    title: "Access to Trusted Healthcare",
    description:
      "Enjoy consultations with qualified doctors along with exclusive discounts at selected hospitals and pharmacies.",
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "Protection Beyond Hospitalization",
    description:
      "Our plans include benefits for accidental death, disability and selected critical illnesses — offering financial security when it matters most.",
  },
  {
    id: 5,
    icon: HeartPulse,
    title: "Wellness-Focused Care",
    description:
      "Selected plans include preventive health benefits, encouraging early detection and healthier living.",
  },
  {
    id: 6,
    icon: Smartphone,
    title: "Simple & Digital Experience",
    description:
      "From enrollment to support, Surokkha provides a fast, secure and hassle-free digital experience.",
  },
];

export default function WhyChooseBenefitsSection() {
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
    <section
      ref={sectionRef}
      className="bg-[#0B1F3A] py-16 dark:bg-[#050D1A] sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`mx-auto mb-12 max-w-2xl text-center transition-all duration-700 ease-out sm:mb-16 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Why Choose Surokkha?
          </h2>
          <p className="mt-3 text-sm font-medium text-[#00E0AE] sm:text-base">
            11+ Years of delivering affordable healthcare solutions in
            Bangladesh
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.id}
                style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
                className={`group rounded-2xl border border-white/10 bg-white/3 p-6 transition-all duration-700 ease-out hover:-translate-y-1 hover:border-[#00C896]/40 hover:bg-white/6 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#00C896]/10 transition-colors duration-300 group-hover:bg-[#00C896]/20">
                  <Icon className="h-6 w-6 text-[#00E0AE]" strokeWidth={1.75} />
                </div>

                <h3 className="mb-2 text-lg font-bold text-white">
                  {benefit.title}
                </h3>

                <p className="text-sm leading-relaxed text-white/70">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}