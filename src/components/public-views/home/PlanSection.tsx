"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

interface Plan {
  id: number;
  title: string;
  image: string;
  href: string;
  price?: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: 1,
    title: "Milvik Health Plans",
    image: "/assets/plan1.webp",
    href: "/plans/health",
    price: "৳499/month",
    features: [
      "24/7 Telemedicine",
      "500+ Partner Hospital Discount",
      "Cashback on Medicine, test, etc",
      "Hospitalization Cashback",
    ],
  },
  {
    id: 2,
    title: "Wellness Plans",
    image: "/assets/plan2.webp",
    href: "/plans/wellness",
    price: "৳699/month",
    features: [
      "Cashless Medicine and Doctor visit",
      "Cashless Hospitalization",
      "24/7 Telemedicine",
      "500+ Partner Hospital Discount",
    ],
  },
  {
    id: 3,
    title: "My Doctor Plans",
    image: "/assets/plan3.webp",
    href: "/plans/my-doctor",
    price: "৳999/month",
    features: [
      "24/7 Telemedicine",
      "500+ Partner Hospital Discount",
      "Unlimited Specialist Consultation",
      "Personalised Care Program",
    ],
  },
];

export default function PlansSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
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
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-5xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-5xl">
            Shurokka Plans
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Explore our range of Healthcare Plans to choose one that suits
            you
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              style={{ transitionDelay: visible ? `${index * 150}ms` : "0ms" }}
              className={`group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-xl dark:bg-neutral-900 dark:ring-white/10 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="relative h-56 w-full overflow-hidden sm:h-64">
                <Image
                  src={plan.image}
                  alt={plan.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white">
                    {plan.title}
                  </h3>
                  {plan.price && (
                    <span className="rounded-full bg-[#00C896]/10 px-3 py-1 text-xs font-semibold text-[#00A67E]">
                      {plan.price}
                    </span>
                  )}
                </div>

                <ul className="mb-6 flex-1 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00A67E]" strokeWidth={3} />
                      <span className="text-[15px] leading-snug text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className="group/btn inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#007A55] px-6 py-3 text-sm font-semibold text-[#007A55] transition-all duration-300 hover:bg-[#007A55] hover:text-white dark:border-[#00C896] dark:text-[#00C896] dark:hover:bg-[#00C896] dark:hover:text-neutral-950"
                >
                  View Plan Details
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}