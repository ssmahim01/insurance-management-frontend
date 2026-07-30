// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { Heart, Users, ScaleIcon as Scale, Sparkles } from "lucide-react";
// import { useInView } from "@/components/shared/useInView";

// interface ValueItem {
//   id: number;
//   number: string;
//   title: string;
//   description: string;
// }

// const values: ValueItem[] = [
//   {
//     id: 1,
//     number: "01",
    
//     title: "Customer First",
//     description:
//       "We put our members at the heart of everything we do, ensuring every service is designed around their needs.",
//   },
//   {
//     id: 2,
//     number: "02",
    
//     title: "Integrity",
//     description:
//       "We act with honesty, fairness, and accountability in every interaction.",
//   },
//   {
//     id: 3,
//     number: "03",
//     title: "Trust & Transparency",
//     description:
//       "We believe long-term relationships are built through clear communication and ethical practices.",
//   },
//   {
//     id: 4,
//     number: "04",
//     title: "Compassion",
//     description:
//       "We care deeply about the health, well-being, and financial security of every member and their family.",
//   },
//   {
//     id: 5,
//     number: "05",
//     title: "Excellence",
//     description:
//       "We continuously improve our services to deliver the highest standards of quality and customer experience.",
//   },
//   {
//     id: 6,
//     number: "06",
//     title: "Innovation",
//     description:
//       "We embrace technology and new ideas to make healthcare protection simpler, smarter, and more accessible.",
//   },
//   {
//     id: 5,
//     number: "05",
//     title: "Excellence",
//     description:
//       "We continuously improve our services to deliver the highest standards of quality and customer experience.",
//   },
// ];

// const points = [
//   {
//     id: 1,
//     icon: Heart,
//     title: "Dignity & Respect",
//     description:
//       "Everyone deserves access to quality healthcare with dignity and respect, regardless of their background.",
//   },
//   {
//     id: 2,
//     icon: Scale,
//     title: "Fair Treatment",
//     description:
//       "We are committed to creating an inclusive environment where every individual is treated fairly — regardless of age, gender, religion, ethnicity, disability, or social background.",
//   },
//   {
//     id: 3,
//     icon: Users,
//     title: "Equal Opportunity",
//     description:
//       "We promote equal opportunities for our members, employees, partners, and communities, delivering our services with fairness, respect, and professionalism.",
//   },
//   {
//     id: 4,
//     icon: Sparkles,
//     title: "Diversity & Inclusion",
//     description:
//       "By embracing diversity and inclusion, we strive to build a healthier, stronger, and more equitable future for everyone.",
//   },
// ];

// export default function ValuesSection() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const el = sectionRef.current;
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
//     <section className="relative overflow-hidden bg-white py-20 dark:bg-neutral-950 sm:py-28">
//       {/* ambient background accent */}
//       <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-160 -translate-x-1/2 rounded-full bg-[#0B1F3A]/5 blur-3xl dark:bg-blue-500/10" />

//       <div className="relative mx-auto max-w-7xl px-5">
//         <div
//           className={`mx-auto mb-16 max-w-2xl text-center transition-all duration-700 ease-out ${
//             visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//           }`}
//         >
//           <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB] dark:text-blue-400">
//             What We Stand For
//           </span>
//           <h2 className="text-3xl font-extrabold tracking-tight text-[#0B1F3A] dark:text-white sm:text-4xl">
//             Our Values
//           </h2>
//           <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">At Surokkha Health, our values define who we are and guide every decision we make. They inspire us to deliver trusted, transparent, and people-centered healthcare protection.</p>
//           <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-linear-to-r from-[#0B1F3A] to-[#2563EB] dark:from-blue-400 dark:to-blue-600" />
//         </div>

//         <div
//           ref={sectionRef}
//           className="grid grid-cols-1 gap-8 sm:grid-cols-3"
//         >
//           {values.map((value, index) => (
//             <div
//               key={value.id}
//               style={{ transitionDelay: visible ? `${index * 150}ms` : "0ms" }}
//               className={`group relative overflow-hidden rounded-2xl border border-[#0B1F3A]/5 bg-[#EFF4FA] shadow-sm transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0B1F3A]/10 dark:border-white/5 dark:bg-neutral-900 dark:hover:shadow-black/40 ${
//                 visible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-8"
//               }`}
//             >
//               <div className="relative h-52 w-full overflow-hidden">
//                 {/* gradient wash for contrast + depth */}
//                 <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/70 via-transparent to-transparent" />
//               </div>

//               <div className="p-6">
//                 <h3 className="mb-3 text-lg font-bold text-[#0B1F3A] dark:text-white">
//                   {value.title}
//                 </h3>

//                 <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
//                   {value.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <EqualityInclusionSection />
//       </div>
//     </section>
//   );
// }







// const EqualityInclusionSection =() =>{
//   const { ref, isVisible: visible } = useInView({ threshold: 0.2 });

//   return (
//     <section className="relative overflow-hidden bg-[#EFF4FA] py-20 dark:bg-neutral-950 sm:py-28">
//       <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-160 -translate-x-1/2 rounded-full bg-[#0B1F3A]/5 blur-3xl dark:bg-blue-500/10" />

//       <div className="">
//         <div
//           className={`mx-auto mb-14 max-w-2xl text-center transition-all duration-700 ease-out ${
//             visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//           }`}
//         >
//           <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB] dark:text-blue-400">
//             Fairness For All
//           </span>
//           <h2 className="text-3xl font-extrabold tracking-tight text-[#0B1F3A] dark:text-white sm:text-4xl">
//             Equality &amp; Inclusion
//           </h2>
//           <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
//             At Surokkha Health, we believe everyone deserves access to
//             quality healthcare with dignity and respect.
//           </p>
//           <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-linear-to-r from-[#0B1F3A] to-[#2563EB] dark:from-blue-400 dark:to-blue-600" />
//         </div>

//         <div
//           ref={ref}
//           className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
//         >
//           {points.map((point, index) => {
//             const Icon = point.icon;
//             return (
//               <div
//                 key={point.id}
//                 style={{
//                   transitionDelay: visible ? `${index * 150}ms` : "0ms",
//                 }}
//                 className={`group rounded-2xl border border-[#0B1F3A]/5 bg-white p-6 shadow-sm transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0B1F3A]/10 dark:border-white/5 dark:bg-neutral-900 dark:hover:shadow-black/40 ${
//                   visible
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-8"
//                 }`}
//               >
//                 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1F3A]/5 transition-colors duration-300 group-hover:bg-[#0B1F3A]/10 dark:bg-white/5 dark:group-hover:bg-white/10">
//                   <Icon
//                     className="h-6 w-6 text-[#2563EB] dark:text-blue-400"
//                     strokeWidth={1.75}
//                   />
//                 </div>

//                 <h3 className="mb-2 text-lg font-bold text-[#0B1F3A] dark:text-white">
//                   {point.title}
//                 </h3>

//                 <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
//                   {point.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Users, ScaleIcon as Scale, Sparkles, ShieldCheck } from "lucide-react";
import { useInView } from "@/components/shared/useInView";

interface ValueItem {
  id: number;
  number: string;
  title: string;
  description: string;
}

const values: ValueItem[] = [
  {
    id: 1,
    number: "01",
    title: "Customer First",
    description:
      "We put our members at the heart of everything we do, ensuring every service is designed around their needs.",
  },
  {
    id: 2,
    number: "02",
    title: "Integrity",
    description:
      "We act with honesty, fairness, and accountability in every interaction.",
  },
  {
    id: 3,
    number: "03",
    title: "Trust & Transparency",
    description:
      "We believe long-term relationships are built through clear communication and ethical practices.",
  },
  {
    id: 4,
    number: "04",
    title: "Compassion",
    description:
      "We care deeply about the health, well-being, and financial security of every member and their family.",
  },
  {
    id: 5,
    number: "05",
    title: "Excellence",
    description:
      "We continuously improve our services to deliver the highest standards of quality and customer experience.",
  },
  {
    id: 6,
    number: "06",
    title: "Innovation",
    description:
      "We embrace technology and new ideas to make healthcare protection simpler, smarter, and more accessible.",
  },
];

const points = [
  {
    id: 1,
    icon: Heart,
    title: "Dignity & Respect",
    description:
      "Everyone deserves access to quality healthcare with dignity and respect, regardless of their background.",
  },
  {
    id: 2,
    icon: Scale,
    title: "Fair Treatment",
    description:
      "We are committed to creating an inclusive environment where every individual is treated fairly — regardless of background or status.",
  },
  {
    id: 3,
    icon: Users,
    title: "Equal Opportunity",
    description:
      "We promote equal opportunities for our members, employees, and partners with complete fairness and professionalism.",
  },
  {
    id: 4,
    icon: Sparkles,
    title: "Diversity & Inclusion",
    description:
      "By embracing diversity and inclusion, we strive to build a healthier, stronger, and more equitable future for everyone.",
  },
];

export default function ValuesSection() {
  const { ref, isVisible: visible } = useInView({ threshold: 0.15 });

  return (
    <div className="relative bg-slate-50/50 dark:bg-neutral-950">
      {/* Upper Section: Core Values */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* Ambient background accents */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`mx-auto mb-16 max-w-2xl text-center transition-all duration-700 ease-out`}
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 ring-1 ring-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-400/30">
              <ShieldCheck className="h-3.5 w-3.5" />
              What We Stand For
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Our Core Values
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              At Surokkha Health, our values define who we are and guide every decision we make to deliver trusted, transparent healthcare protection.
            </p>
          </div>

          <div
            ref={ref}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {values.map((value, index) => (
              <div
                key={value.id}
                style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xs transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 dark:border-neutral-800 dark:bg-neutral-900/80 dark:hover:border-blue-500/30 dark:hover:shadow-black/40 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {/* Subtle Card Accent Line */}
                <div className="absolute top-0 left-0 h-1 w-0 bg-linear-to-r from-blue-600 to-indigo-600 transition-all duration-300 group-hover:w-full" />

                <div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                    {value.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lower Section: Equality & Inclusion */}
      <EqualityInclusionSection />
    </div>
  );
}

const EqualityInclusionSection = () => {
  const { ref, isVisible: visible } = useInView({ threshold: 0.15 });

  return (
    <section className="relative overflow-hidden border-t border-slate-200/60 bg-slate-100/70 py-20 dark:border-neutral-800/80 dark:bg-neutral-900/40 sm:py-28">
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-blue-600/5 blur-[100px] dark:bg-blue-400/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto mb-16 max-w-2xl text-center transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Fairness For All
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Equality &amp; Inclusion
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            We believe everyone deserves access to quality healthcare with dignity, respect, and zero barriers.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.id}
                className={`group relative flex flex-col rounded-2xl border border-slate-200/70 bg-white p-6 shadow-xs transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-blue-500/20 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-500/10 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-400/20 dark:group-hover:bg-blue-500 dark:group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>

                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                  {point.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}