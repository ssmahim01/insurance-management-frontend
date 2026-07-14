"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ----------------------------------------------------------------------------
// Partner diagnostic center data — replace logo paths with real assets in /public/diagnostics/
// ----------------------------------------------------------------------------
const diagnosticPartners = [
  { id: 1, name: "Popular Diagnostic Centre", logo: "/diagnostics/popular-diagnostic.png", city: "Dhaka" },
  { id: 2, name: "Labaid Diagnostic", logo: "/diagnostics/labaid.png", city: "Dhaka" },
  { id: 3, name: "Ibn Sina Diagnostic", logo: "/diagnostics/ibn-sina.png", city: "Chattogram" },
  { id: 4, name: "Al Mahmud Diagnostic", logo: "/diagnostics/al-mahmud.png", city: "Dhaka" },
  { id: 5, name: "Ashiyan Diagnostic", logo: "/diagnostics/ashiyan.png", city: "Sylhet" },
  { id: 6, name: "Prime Diagnostic Centre", logo: "/diagnostics/prime.png", city: "Khulna" },
  { id: 7, name: "Modern Diagnostic Centre", logo: "/diagnostics/modern.png", city: "Rajshahi" },
  { id: 8, name: "Central Hospital Diagnostic", logo: "/diagnostics/central.png", city: "Dhaka" },
];

const cities = ["All cities", ...Array.from(new Set(diagnosticPartners.map((p) => p.city)))];

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

function DiagnosticLogo({
  name,
  logo,
  city,
  index,
  inView,
}: {
  name: string;
  logo: string;
  city: string;
  index: number;
  inView: boolean;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={`group relative flex h-28 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800/60 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      style={{ transitionDelay: inView ? `${index * 70}ms` : "0ms" }}
    >
      {/* subtle corner glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-blue-400/0 blur-2xl transition-colors duration-500 group-hover:bg-blue-400/20"
      />

      {!errored ? (
        <Image
          src={logo}
          alt={name}
          width={140}
          height={56}
          className="max-h-11 w-auto object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
          onError={() => setErrored(true)}
        />
      ) : (
        <span className="text-center text-sm font-medium text-slate-500 dark:text-slate-400">
          {name}
        </span>
      )}

      {/* name + city reveal on hover */}
      <div className="flex flex-col items-center gap-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
          {name}
        </span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500">{city}</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Main section
// ----------------------------------------------------------------------------
export default function DiagnosticPage() {
  const { ref: gridRef, inView: gridInView } = useInView<HTMLDivElement>();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<string>("All cities");

  const filtered = useMemo(() => {
    return diagnosticPartners.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.trim().toLowerCase());
      const matchesCity = city === "All cities" || p.city === city;
      return matchesQuery && matchesCity;
    });
  }, [query, city]);

  return (
    <section className="bg-slate-50 dark:bg-slate-950">
      {/* diagnostic banner */}
      <div className="relative overflow-hidden bg-linear-to-r from-blue-600 to-cyan-600 dark:from-blue-800 dark:to-cyan-800">
        {/* decorative dot pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1.5px, transparent 1.5px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-10 text-center sm:px-6 sm:py-14 lg:px-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12h4l2-7 4 14 2-7h6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Diagnostic</h2>
            <p className="mx-auto mt-1.5 max-w-md text-sm text-blue-50/90 sm:text-base">
              Book lab tests and scans, and redeem your Shurokka benefits at
              partner diagnostic centers.
            </p>
          </div>

          {/* quick stats */}
          <div className="mt-2 flex items-center gap-6 text-blue-50/95 sm:gap-10">
            <div className="text-center">
              <p className="text-xl font-bold text-white sm:text-2xl">{diagnosticPartners.length}+</p>
              <p className="text-[11px] uppercase tracking-wide text-blue-100/80">Partners</p>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-center">
              <p className="text-xl font-bold text-white sm:text-2xl">{cities.length - 1}</p>
              <p className="text-[11px] uppercase tracking-wide text-blue-100/80">Cities</p>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-center">
              <p className="text-xl font-bold text-white sm:text-2xl">24/7</p>
              <p className="text-[11px] uppercase tracking-wide text-blue-100/80">Booking</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---------------- Partner logos ---------------- */}
        <div ref={gridRef} className="mt-14 text-center">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
            Our Diagnostic Partners
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
            Trusted diagnostic centers across Bangladesh accepting your
            Shurokka benefits.
          </p>

          {/* search + city filter */}
          <div className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search diagnostic centers…"
                className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:ring-blue-900/40"
              />
            </div>

            <Select value={city} onValueChange={(v) => setCity(v ?? "All cities")}>
              <SelectTrigger className="w-45 cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-5 text-sm text-slate-700 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:ring-blue-900/40">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>

              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filtered.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {filtered.map((partner, index) => (
                <DiagnosticLogo
                  key={partner.id}
                  name={partner.name}
                  logo={partner.logo}
                  city={partner.city}
                  index={index}
                  inView={gridInView}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-200 py-10 text-sm text-slate-400 dark:border-slate-800">
              No diagnostic centers match &ldquo;{query}&rdquo; in {city}. Try a
              different search.
            </div>
          )}
        </div>

        {/* ---------------- CTA ---------------- */}
        <div className="mb-16 mt-14 flex flex-col items-center justify-between gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-6 text-center dark:border-blue-900/40 dark:bg-blue-950/20 sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Don&apos;t see your local diagnostic center?
            </p>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              We&apos;re adding new partners every week across Bangladesh.
            </p>
          </div>
          <button className="shrink-0 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
            Suggest a diagnostic center
          </button>
        </div>
      </div>
    </section>
  );
}