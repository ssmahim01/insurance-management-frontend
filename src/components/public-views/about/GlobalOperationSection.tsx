// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// export default function GlobalOperationSection() {
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
//       { threshold: 0.3 }
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section className="bg-[#EFF4FA] py-16 dark:bg-neutral-950 sm:py-20">
//       <div className="mx-auto max-w-7xl px-6">
//         <h2
//           className={`mb-12 text-center text-3xl font-extrabold text-[#0B1F3A] transition-all duration-700 ease-out dark:text-white sm:text-4xl ${
//             visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//           }`}
//         >
//           Our Global Operation
//         </h2>

//         <div
//           ref={sectionRef}
//           className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2"
//         >
//           <div
//             className={`relative h-64 w-full overflow-hidden rounded-2xl transition-all duration-700 ease-out sm:h-80 ${
//               visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
//             }`}
//           >
//             <Image
//               src="https://t3.ftcdn.net/jpg/17/84/38/54/360_F_1784385429_9RYpwRgjCCFymVapZqwnfBldTNWPjzzd.jpg"
//               alt="Shurokka global operation map across Ghana, Tanzania, Pakistan, Bangladesh, Sri Lanka, Cambodia, and Singapore"
//               fill
//               sizes="(max-width: 1024px) 100vw, 50vw"
//               className="rounded-2xl object-cover"
//             />
//           </div>

//           <div
//             className={`transition-all duration-700 ease-out ${
//               visible
//                 ? "opacity-100 translate-x-0"
//                 : "opacity-0 translate-x-8"
//             }`}
//             style={{ transitionDelay: visible ? "150ms" : "0ms" }}
//           >
//             <p className="text-[15px] leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
//               Shurokka (BIMA), from its origin in Sweden, has been working
//               across various markets globally, with the aim of leveraging
//               mobile technology to bridge the healthcare gap for the
//               underserved, in emerging economies. Notably, globally Shurokka
//               has garnered a user base of over 5 million active subscribers
//               and 20 million beneficiaries currently, and continuing to
//               innovate and serve customers to make healthcare affordable and
//               accessible to all.
//             </p>

//             <Link
//               href="/global-operations"
//               className="mt-4 inline-block text-sm font-semibold text-[#007A55] underline underline-offset-4 transition-colors hover:text-[#00A67E] dark:text-[#00E0AE]"
//             >
//               Know more
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "5M+", label: "Active Subscribers" },
  { value: "20M+", label: "Beneficiaries" },
  { value: "7", label: "Countries Served" },
];

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
    <section className="relative overflow-hidden bg-[#EFF4FA] py-20 dark:bg-neutral-950 sm:py-28">
      {/* ambient accent */}
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#0B1F3A]/5 blur-3xl dark:bg-blue-500/10" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto mb-16 max-w-2xl text-center transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB] dark:text-blue-400">
            Worldwide Reach
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0B1F3A] dark:text-white sm:text-4xl">
            Our Global Operation
          </h2>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-linear-to-r from-[#0B1F3A] to-[#2563EB] dark:from-blue-400 dark:to-blue-600" />
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          <div
            className={`relative transition-all duration-700 ease-out ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-lg shadow-[#0B1F3A]/10 sm:h-96">
              <Image
                src="https://t3.ftcdn.net/jpg/17/84/38/54/360_F_1784385429_9RYpwRgjCCFymVapZqwnfBldTNWPjzzd.jpg"
                alt="Shurokka global operation map across Ghana, Tanzania, Pakistan, Bangladesh, Sri Lanka, Cambodia, and Singapore"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/40 via-transparent to-transparent" />
            </div>

            {/* floating stat card */}
            <div
              className={`absolute -bottom-6 -right-4 rounded-xl bg-white p-4 shadow-xl shadow-[#0B1F3A]/15 transition-all duration-700 ease-out dark:bg-neutral-800 sm:-right-6 sm:p-5 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: visible ? "400ms" : "0ms" }}
            >
              <p className="text-2xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-3xl">
                20M+
              </p>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Beneficiaries Served
              </p>
            </div>
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
              underserved in emerging economies. Continuing to innovate and
              serve customers, Shurokka is committed to making healthcare
              affordable and accessible to all.
            </p>

            {/* stat row */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#0B1F3A]/10 pt-6 dark:border-white/10">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`transition-all duration-700 ease-out ${
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: visible ? `${300 + index * 100}ms` : "0ms",
                  }}
                >
                  <p className="text-xl font-extrabold text-[#0B1F3A] dark:text-white sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/global-operations"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#122a4f] hover:shadow-lg hover:shadow-[#0B1F3A]/20 dark:bg-white dark:text-[#0B1F3A] dark:hover:bg-gray-100"
            >
              Know more
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}