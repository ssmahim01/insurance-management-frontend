// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Check, ArrowRight } from "lucide-react";

// interface Plan {
//   id: number;
//   title: string;
//   image: string;
//   href: string;
//   price?: string;
//   features: string[];
// }

// const plans: Plan[] = [
//   {
//     id: 1,
//     title: "Essential Protection for Everyday Healthcare",
//     image: "/assets/plan1.1.webp",
//     href: "/plans/health",
//     price: "৳499/month",
//     features: [
//       "24/7 Telemedicine",
//       "500+ Partner Hospital Discount",
//       "Cashback on Medicine, test, etc",
//       "Hospitalization Cashback",
//     ],
//   },
//   {
//     id: 2,
//     title: "Wellness Plans",
//     image: "/assets/plan1.2.webp",
//     href: "/plans/wellness",
//     price: "৳699/month",
//     features: [
//       "Cashless Medicine and Doctor visit",
//       "Cashless Hospitalization",
//       "24/7 Telemedicine",
//       "500+ Partner Hospital Discount",
//     ],
//   },
//   {
//     id: 3,
//     title: "My Doctor Plans",
//     image: "/assets/plan1.3.webp",
//     href: "/plans/my-doctor",
//     price: "৳999/month",
//     features: [
//       "24/7 Telemedicine",
//       "500+ Partner Hospital Discount",
//       "Unlimited Specialist Consultation",
//       "Personalised Care Program",
//     ],
//   },
// ];

// export default function PlansSection() {
//   const gridRef = useRef<HTMLDivElement>(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const el = gridRef.current;
//     if (!el) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.2 }
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section className="bg-[#EFF4FA] py-16 dark:bg-neutral-950 sm:py-20">
//       <div className="mx-auto max-w-7xl px-6">
//         <div
//           className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
//             visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//           }`}
//         >
//           <h2 className="text-5xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-5xl">
//             Explore Our Health Plans
//           </h2>
//           <p className="mt-4 text-md text-gray-500 dark:text-gray-400">
//             Every individual and family has unique healthcare needs. That’s why Surokkha offers a range of thoughtfully designed health plans—providing financial protection, access to quality healthcare, and peace of mind when you need it most.
//           </p>
//         </div>

//         <div
//           ref={gridRef}
//           className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3"
//         >
//           {plans.map((plan, index) => (
//             <div
//               key={plan.id}
//               style={{ transitionDelay: visible ? `${index * 150}ms` : "0ms" }}
//               className={`group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-xl dark:bg-neutral-900 dark:ring-white/10 ${
//                 visible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-10"
//               }`}
//             >
//               <div className="relative h-56 w-full overflow-hidden sm:h-64">
//                 <Image
//                   src={plan.image}
//                   alt={plan.title}
//                   fill
//                   sizes="(max-width: 768px) 100vw, 33vw"
//                   className="object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//               </div>

//               <div className="flex flex-1 flex-col p-6">
//                 <div className="mb-4 flex items-center justify-between">
//                   <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white">
//                     {plan.title}
//                   </h3>
//                   {plan.price && (
//                     <span className="rounded-full bg-[#00C896]/10 px-3 py-1 text-xs font-semibold text-[#00A67E]">
//                       {plan.price}
//                     </span>
//                   )}
//                 </div>

//                 <ul className="mb-6 flex-1 space-y-3">
//                   {plan.features.map((feature, i) => (
//                     <li key={i} className="flex items-start gap-2.5">
//                       <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00A67E]" strokeWidth={3} />
//                       <span className="text-[15px] leading-snug text-gray-600 dark:text-gray-300">
//                         {feature}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>

//                 {/* <Link
//                   href={plan.href}
//                   className="group/btn inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#007A55] px-6 py-3 text-sm font-semibold text-[#007A55] transition-all duration-300 hover:bg-[#007A55] hover:text-white dark:border-[#00C896] dark:text-[#00C896] dark:hover:bg-[#00C896] dark:hover:text-neutral-950"
//                 >
//                   View Plan Details
//                   <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
//                 </Link> */}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ArrowRight, Shield, ShieldPlus, Users, Sparkles, Infinity as InfinityIcon } from "lucide-react";

interface Plan {
  id: number;
  tier: string; // e.g. "Tier 01"
  name: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  level: number; // 1-5, drives the coverage meter
  features: string[];
  perfectFor: string;
  cta: string;
  href: string;
}

const plans: Plan[] = [
  {
    id: 1,
    tier: "Tier 01",
    name: "Surokkha Basic",
    tagline: "Essential Protection for Everyday Healthcare",
    description:
      "Designed for individuals looking for affordable health protection. Essential financial support during hospitalization, plus access to medical consultation and exclusive healthcare discounts.",
    icon: Shield,
    level: 1,
    features: [
      "Hospital Cash Benefit",
      "Doctor Consultation Support",
      "Hospital Discount Network",
      "Pharmacy Discount",
      "Accidental Death Benefit",
      "Natural Death Benefit",
      "Permanent Disability Protection",
    ],
    perfectFor: "Students, young professionals and first-time buyers",
    cta: "Learn More",
    href: "/plans/basic",
  },
  {
    id: 2,
    tier: "Tier 02",
    name: "Surokkha Plus",
    tagline: "Greater Protection with More Healthcare Benefits",
    description:
      "Enhanced coverage for individuals who need more frequent access to healthcare. Increased medical benefits and broader financial protection for unexpected medical situations.",
    icon: ShieldPlus,
    level: 2,
    features: [
      "Enhanced Hospital Cash Benefit",
      "Increased Doctor Consultations",
      "Hospital & Pharmacy Discounts",
      "Accidental Coverage",
      "Permanent Disability Protection",
      "Natural Death Benefit",
    ],
    perfectFor: "Working professionals and growing families",
    cta: "Learn More",
    href: "/plans/plus",
  },
  {
    id: 3,
    tier: "Tier 03",
    name: "Surokkha Standard",
    tagline: "Comprehensive Healthcare for Your Family",
    description:
      "Combines everyday healthcare support with stronger financial protection — hospitalization benefits plus critical illness and accident-related coverage.",
    icon: Users,
    level: 3,
    features: [
      "Comprehensive Hospital Cash Benefit",
      "Doctor Consultation",
      "Hospital & Pharmacy Discounts",
      "Ward Expense Support",
      "Critical Illness Benefit",
      "Accident Protection",
      "Disability Coverage",
      "Life Protection",
    ],
    perfectFor: "Families seeking balanced healthcare and financial security",
    cta: "Learn More",
    href: "/plans/standard",
  },
  {
    id: 4,
    tier: "Tier 04",
    name: "Surokkha Smart",
    tagline: "Advanced Health Protection with Wellness Benefits",
    description:
      "More than insurance — Surokkha Smart encourages preventive healthcare with wellness benefits, health screenings and higher financial protection.",
    icon: Sparkles,
    level: 4,
    features: [
      "Higher Hospital Cash Benefit",
      "Wellness Benefits",
      "Preventive Health Screening",
      "Ward Coverage",
      "Doctor Consultation",
      "Critical Illness Benefit",
      "Enhanced Accident Protection",
      "Disability Protection",
    ],
    perfectFor: "Health-conscious individuals who value preventive care",
    cta: "Learn More",
    href: "/plans/smart",
  },
  {
    id: 5,
    tier: "Tier 05",
    name: "Surokkha 360",
    tagline: "Complete Protection for Every Stage of Life",
    description:
      "Our most comprehensive healthcare solution — premium medical benefits, higher financial protection and wellness services for every unexpected challenge.",
    icon: InfinityIcon,
    level: 5,
    features: [
      "Maximum Hospital Cash Benefit",
      "Premium Wellness Program",
      "Preventive Health Screening",
      "Doctor Consultation",
      "Hospital & Pharmacy Benefits",
      "Critical Illness Protection",
      "Accident Coverage",
      "Disability Protection",
      "Life Coverage",
    ],
    perfectFor: "Individuals and families seeking the highest level of protection",
    cta: "Get Started",
    href: "/plans/360",
  },
];

// const MAX_LEVEL = 5;

// function CoverageMeter({ level }: { level: number }) {
//   return (
//     <div className="flex items-center gap-1" aria-label={`Coverage level ${level} of ${MAX_LEVEL}`}>
//       {Array.from({ length: MAX_LEVEL }).map((_, i) => (
//         <span
//           key={i}
//           className={`h-1.5 w-5 rounded-full transition-colors duration-500 ${
//             i < level ? "bg-[#00A67E]" : "bg-[#0B1F3A]/10 dark:bg-white/10"
//           }`}
//         />
//       ))}
//     </div>
//   );
// }

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
      { threshold: 0.15 }
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
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00A67E]">
            Explore Our Health Plans
          </span>
          <h2 className="mt-3 text-4xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-5xl">
            A plan for every stage of life
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Every individual and family has unique healthcare needs. Five tiers of
            protection, each building on the last — so you can start where you are
            and grow into more coverage over time.
          </p>
        </div>

        {/* Plans grid */}
        <div
          ref={gridRef}
          className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3"
        >
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            // const isTop = plan.level === MAX_LEVEL;
            return (
              <div
                key={plan.id}
                style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-xl dark:bg-neutral-900 dark:ring-white/10 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="flex flex-col gap-4 p-6 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00C896]/10">
                      <Icon className="h-5.5 w-5.5 text-[#007A55] dark:text-[#00C896]" strokeWidth={2} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {plan.tier}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#00A67E]">{plan.tagline}</p>
                  </div>

                  <p className="text-[13.5px] leading-relaxed text-gray-500 dark:text-gray-400">
                    {plan.description}
                  </p>
                </div>

                <div className="mx-6 border-t border-dashed border-gray-200 dark:border-white/10" />

                <div className="flex flex-1 flex-col p-6 pt-4">
                  <span className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    What&apos;s Included
                  </span>
                  <ul className="mb-5 flex-1 space-y-2.5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00A67E]" strokeWidth={3} />
                        <span className="text-[14px] leading-snug text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-5 rounded-lg bg-[#EFF4FA] px-3.5 py-2.5 dark:bg-white/5">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-[#00A67E]">
                      Perfect For
                    </span>
                    <p className="mt-0.5 text-[13px] leading-snug text-[#0B1F3A] dark:text-gray-200">
                      {plan.perfectFor}
                    </p>
                  </div>

                  <a
                    href={plan.href}
                    className={`group/btn inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-500 border-2 border-[#007A55] text-[#007A55] hover:bg-[#007A55] hover:text-white dark:border-[#00C896] dark:text-[#00C896] dark:hover:bg-[#00C896] dark:hover:text-neutral-950"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}