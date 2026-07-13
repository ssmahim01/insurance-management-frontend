"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ----------------------------------------------------------------------------
// Partner pharmacy data — replace logo paths with real assets in /public/pharmacies/
// ----------------------------------------------------------------------------
const pharmacyPartners = [
  { id: 1, name: "Lazz Pharma", logo: "/pharmacies/lazz-pharma.png" },
  { id: 2, name: "Tamanna Pharmacy", logo: "/pharmacies/tamanna-pharmacy.png" },
  { id: 3, name: "Well Care Pharmacy", logo: "/pharmacies/well-care.png" },
  { id: 4, name: "Arogga", logo: "/pharmacies/arogga.png" },
  { id: 5, name: "Shafi Pharmacy", logo: "/pharmacies/shafi-pharmacy.png" },
  { id: 6, name: "Medix Pharma", logo: "/pharmacies/medix-pharma.png" },
  { id: 7, name: "Care Point Pharmacy", logo: "/pharmacies/care-point.png" },
  { id: 8, name: "Popular Pharmacy", logo: "/pharmacies/popular-pharmacy.png" },
];

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function PharmacyLogo({
  name,
  logo,
  index,
  inView,
}: {
  name: string;
  logo: string;
  index: number;
  inView: boolean;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={`group flex h-24 items-center justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      style={{ transitionDelay: inView ? `${index * 80}ms` : "0ms" }}
    >
      {!errored ? (
        <Image
          src={logo}
          alt={name}
          width={140}
          height={56}
          className="max-h-12 w-auto object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
          onError={() => setErrored(true)}
        />
      ) : (
        <span className="text-center text-sm font-medium text-slate-500 dark:text-slate-400">
          {name}
        </span>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------
// Main section
// ----------------------------------------------------------------------------
export default function DiagnesticPage() {
  const { ref: gridRef, inView: gridInView } = useInView<HTMLDivElement>();

  return (
    <section className="bg-slate-50 dark:bg-slate-950 ">
      {/* pharmacy banner */}
      <div className="bg-linear-to-r from-emerald-600 to-teal-600 dark:from-emerald-800 dark:to-teal-800">
        <div className="mx-auto flex max-w-7xl justify-center text-center items-center gap-4 px-5 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div>
            <h2 className="text-lg font-bold text-white sm:text-2xl">
              Diagnastic
            </h2>
            <p className="text-xs text-emerald-50/90 sm:text-sm">
              Order medicines and redeem your Shurokka benefits at partner
              pharmacies.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        {/* ---------------- Partner logos ---------------- */}
        <div ref={gridRef} className="mt-14 text-center">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
            Our Pharmacy Partners
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
            Trusted pharmacies across Bangladesh accepting your Shurokka
            benefits.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {pharmacyPartners.map((partner, index) => (
              <PharmacyLogo
                key={partner.id}
                name={partner.name}
                logo={partner.logo}
                index={index}
                inView={gridInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
