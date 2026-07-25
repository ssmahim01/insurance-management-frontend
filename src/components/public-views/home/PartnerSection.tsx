// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";

// export default function PartnerSection() {
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
//     <section className="bg-[#EFF4FA] py-16 dark:bg-neutral-950 sm:py-20">
//       <div
//         ref={sectionRef}
//         className="mx-auto max-w-4xl px-6 text-center"
//       >
//         <div
//           className={`transition-all duration-700 ease-out ${
//             visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//           }`}
//         >
//           <h2 className="text-4xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-5xl">
//             500+ Partner Hospitals
//           </h2>
//           <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
//             With a Shurokka Subscription, get discounts at 500+ partner
//             hospitals and diagnostic centers / labs across all 64 districts
//             in Bangladesh. Our partner hospitals offer a range of discounts
//             on diagnostic tests &amp; hospitalization, ranging from a
//             minimum of 10% up to 50%.
//           </p>
//         </div>

//         <div
//           className={`relative mt-10 h-64 w-full overflow-hidden rounded-2xl shadow-lg shadow-black/5 transition-all duration-700 ease-out dark:shadow-black/30 sm:h-80 lg:h-96 ${
//             visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
//           }`}
//           style={{ transitionDelay: visible ? "150ms" : "0ms" }}
//         >
//           <Image
//             src="/assets/hospital.webp"
//             alt="500+ partner hospitals across Bangladesh offering 10-50% discount"
//             fill
//             sizes="(max-width: 768px) 100vw, 896px"
//             className="object-cover"
//           />
//         </div>

//         <div
//           className={`mt-10 transition-all duration-700 ease-out ${
//             visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//           }`}
//           style={{ transitionDelay: visible ? "300ms" : "0ms" }}
//         >
//           <Link
//             href="/our-partners"
//             className="group inline-flex items-center gap-2 rounded-full bg-[#00C896] px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:bg-[#0F467C] hover:shadow-lg hover:shadow-black/10"
//           >
//             Our Partner Hospitals
//             <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/components/shared/useInView";

const stats = [
  { value: "500+", label: "Hospitals & labs" },
  { value: "64", label: "Districts covered" },
  { value: "10–50%", label: "Discount on care" },
];

export default function PartnerSection() {
  const { ref: sectionRef, isVisible: visible } = useInView({
        threshold: 0.2,
    });

  return (
    <section className="relative overflow-hidden bg-[#EFF4FA] py-6 dark:bg-neutral-950 sm:py-20">
      {/* Ambient backdrop, echoes the coverage section's teal wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-120 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,200,150,0.10),transparent)]"
      />

      <div ref={sectionRef} className="mx-auto max-w-5xl px-6 text-center">
        <div
          className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#00A67E]">
            Nationwide Network
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-[#0B1F3A] dark:text-white sm:text-5xl">
            <span className="text-[#00A67E]">500+</span> Partner Hospitals
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
            With a Surokkha Health Subscription, get discounts at partner hospitals
            and diagnostic centers or labs across all 64 districts in
            Bangladesh — from a minimum of 10% up to 50% off diagnostic
            tests and hospitalization.
          </p>
        </div>

        {/* Stat strip — the real numbers behind the headline, not decoration */}
        <div
          className={`mx-auto mt-10 flex max-w-2xl items-stretch justify-center divide-x divide-black/10 rounded-2xl border border-black/5 bg-white/70 py-6 shadow-sm backdrop-blur-sm transition-all duration-700 ease-out dark:divide-white/10 dark:border-white/10 dark:bg-white/5 motion-reduce:transition-none motion-reduce:transform-none ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: visible ? "120ms" : "0ms" }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-1 flex-col px-4">
              <span className="text-2xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-3xl">
                {stat.value}
              </span>
              <span className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div
          className={`relative mt-12 transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Offset backdrop panel for depth, matching the coverage section's language */}
          <div
            aria-hidden
            className={`absolute -inset-3 -z-10 rounded-[28px] bg-[#00C896]/15 transition-transform duration-700 ease-out dark:bg-[#00C896]/10 -rotate-1 ${
              visible ? "scale-100" : "scale-90"
            }`}
          />

          <div className="group relative h-64 w-full overflow-hidden rounded-2xl shadow-lg shadow-black/10 dark:shadow-black/40 sm:h-80 lg:h-96">
            <Image
              src="/assets/hospital.webp"
              alt="500+ partner hospitals across Bangladesh offering 10-50% discount"
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/40 via-transparent to-transparent" />
          </div>
        </div>

        <div
          className={`mt-10 transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: visible ? "400ms" : "0ms" }}
        >
          <Link
            href="/our-partners"
            className="group inline-flex items-center gap-2 rounded-full bg-[#007A55] px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-sm shadow-[#007A55]/20 transition-all duration-300 hover:bg-[#F97316] hover:shadow-lg hover:shadow-[#F97316]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A67E] focus-visible:ring-offset-2"
          >
            Our Partner Hospitals
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}