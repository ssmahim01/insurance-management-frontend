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
import Link from "next/link";

// ----------------------------------------------------------------------------
// DESIGN NOTE — same light/dark tokens as the diagnostic page:
//              LIGHT        DARK          USED FOR
// paper        #F4F7F4      #0B1412       page background
// card         #FFFFFF      #12211D       card / CTA surface
// ink          #16241F      #E7EFEA       primary text
// muted        #6B7A73      #8FA39B       secondary text / labels
// teal         #0E6B58      #4FD9BC       links, focus rings, accents
// teal-deep    #0A4A3D      #06231D       hero background
// amber        #D9A441      #F0C36D       verified stamp accent
// line         #D7DEDA      #24332E       hairlines / dashes
//
// Also fixed from the pasted version: partner data had been accidentally
// left as the diagnostic centers list — swapped back to actual pharmacies.
// Breadcrumb said "Diagnastic" and the CTA said "diagnostic center" — both
// now say "Pharmacy". CTA/breadcrumb colors were plain blue/slate — now use
// the shared teal design tokens so both pages match in both modes.
// ----------------------------------------------------------------------------

const pharmacyPartners = [
  { id: 1, name: "Lazz Pharma", logo: "/pharmacies/lazz-pharma.png", city: "Dhaka" },
  { id: 2, name: "Tamanna Pharmacy", logo: "/pharmacies/tamanna-pharmacy.png", city: "Dhaka" },
  { id: 3, name: "Well Care Pharmacy", logo: "/pharmacies/well-care.png", city: "Chattogram" },
  { id: 4, name: "Arogga", logo: "/pharmacies/arogga.png", city: "Dhaka" },
  { id: 5, name: "Shafi Pharmacy", logo: "/pharmacies/shafi-pharmacy.png", city: "Sylhet" },
  { id: 6, name: "Medix Pharma", logo: "/pharmacies/medix-pharma.png", city: "Khulna" },
  { id: 7, name: "Care Point Pharmacy", logo: "/pharmacies/care-point.png", city: "Rajshahi" },
  { id: 8, name: "Popular Pharmacy", logo: "/pharmacies/popular-pharmacy.png", city: "Dhaka" },
];

const cities = [
  "All cities",
  ...Array.from(new Set(pharmacyPartners.map((p) => p.city))),
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

// Same barcode motif as the diagnostic page, reused for visual continuity.
function BarcodeRule({
  className = "",
  seed = 1,
}: {
  className?: string;
  seed?: number;
}) {
  const bars = useMemo(() => {
    let n = seed * 9301 + 49297;
    const out: number[] = [];
    for (let i = 0; i < 28; i++) {
      n = (n * 9301 + 49297) % 233280;
      out.push(1 + (n / 233280) * 3);
    }
    return out;
  }, [seed]);

  return (
    <svg
      viewBox="0 0 200 20"
      className={className}
      preserveAspectRatio="none"
      aria-hidden
    >
      {bars.map((w, i) => {
        const x = bars.slice(0, i).reduce((a, b) => a + b + 1.4, 0);
        return (
          <rect key={i} x={x} y={0} width={w} height={20} fill="currentColor" />
        );
      })}
    </svg>
  );
}

function PharmacySlipCard({
  name,
  logo,
  city,
  id,
  index,
  inView,
}: {
  name: string;
  logo: string;
  city: string;
  id: number;
  index: number;
  inView: boolean;
}) {
  const [errored, setErrored] = useState(false);
  const code = `RX-${String(id).padStart(4, "0")}`;

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-md border border-[#D7DEDA] bg-white shadow-[0_1px_2px_rgba(15,30,25,0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(14,107,88,0.12)] dark:border-[#24332E] dark:bg-[#12211D] dark:hover:shadow-[0_10px_24px_rgba(79,217,188,0.08)] ${
        inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
      style={{ transitionDelay: inView ? `${index * 60}ms` : "0ms" }}
    >
      {/* city tab */}
      <div className="flex items-center justify-between px-3 pt-2.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#0E6B58] dark:text-[#4FD9BC]">
          {city}
        </span>
        <span className="font-mono text-[9px] tracking-wider text-[#9AA8A2] dark:text-[#8FA39B]">
          {code}
        </span>
      </div>

      {/* logo field */}
      <div className="flex h-24 items-center justify-center px-4 py-3">
        {!errored ? (
          <Image
            src={logo}
            alt={name}
            width={140}
            height={56}
            className="max-h-11 w-auto object-contain grayscale transition-all duration-300 group-hover:grayscale-0 dark:brightness-110 dark:contrast-110"
            onError={() => setErrored(true)}
          />
        ) : (
          <span className="text-center text-sm font-medium text-[#16241F] dark:text-[#E7EFEA]">
            {name}
          </span>
        )}
      </div>

      {/* perforation */}
      <div className="relative px-3">
        <div className="absolute -left-1 -top-1.25 h-2.5 w-2.5 rounded-full bg-[#F4F7F4] dark:bg-[#0B1412]" />
        <div className="absolute -right-1 -top-1.25 h-2.5 w-2.5 rounded-full bg-[#F4F7F4] dark:bg-[#0B1412]" />
        <div className="border-t border-dashed border-[#D7DEDA] dark:border-[#24332E]" />
      </div>

      {/* name + verified stamp */}
      <div className="flex items-center justify-between gap-2 px-3 py-2.5">
        <span className="truncate text-[11.5px] font-medium text-[#16241F] dark:text-[#E7EFEA]">
          {name}
        </span>
        <span
          className="flex shrink-0 items-center gap-1 rounded-sm border border-[#D9A441]/50 bg-[#D9A441]/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-[#9A7115] dark:border-[#F0C36D]/40 dark:bg-[#F0C36D]/10 dark:text-[#F0C36D]"
          title="Verified Shurokka partner"
        >
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Verified
        </span>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Main section
// ----------------------------------------------------------------------------
export default function PharmacyPage() {
  const { ref: gridRef, inView: gridInView } = useInView<HTMLDivElement>();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All cities");

  const filtered = useMemo(() => {
    return pharmacyPartners.filter((p) => {
      const matchesQuery = p.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      const matchesCity = city === "All cities" || p.city === city;
      return matchesQuery && matchesCity;
    });
  }, [query, city]);

  return (
    <section className="bg-[#F4F7F4] pb-5 font-sans dark:bg-[#0B1412]">
      <div className="relative overflow-hidden bg-[#0A4A3D] dark:bg-[#06231D]">
        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:py-10">
          {/* breadcrumb */}
          <div className="pb-5">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs text-white"
            >
              <Link
                href="/"
                className="flex items-center gap-1 transition-colors hover:text-[#7FD9C4]"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Home
              </Link>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#C7D1CC]"
              >
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-medium text-white" aria-current="page">
                Pharmacy
              </span>
            </nav>
          </div>
          {/* ---------------- Report-header hero ---------------- */}
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7FD9C4]">
                Pharmacy Network — Report No. SHK/RX/2026
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Find a partner pharmacy.
                <br />
                Redeem your benefit on the spot.
              </h2>
              <p className="mt-3 text-sm text-[#CFE6DE] sm:text-base">
                Order medicines and settle the bill directly through Shurokka at
                any partner pharmacy below.
              </p>
            </div>

            {/* readout block, styled like a report's field grid */}
            <div className="grid shrink-0 grid-cols-3 gap-px overflow-hidden rounded-md border border-white/15 bg-white/10 text-white sm:w-72">
              {[
                { label: "Partners", value: `${pharmacyPartners.length}+` },
                { label: "Cities", value: `${cities.length - 1}` },
                { label: "Ordering", value: "24/7" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#0A4A3D] px-3 py-3 text-center dark:bg-[#06231D]"
                >
                  <p className="font-mono text-xl font-semibold">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-[#9FC9BC]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <BarcodeRule seed={3} className="mt-8 h-4 w-full text-[#7FD9C4]/40" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5">
        {/* ---------------- Partner logos ---------------- */}
        <div ref={gridRef} className="mt-12">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0E6B58] dark:text-[#4FD9BC]">
              Requisition — Select Pharmacy
            </p>
            <h3 className="text-lg font-semibold text-[#16241F] dark:text-[#E7EFEA] sm:text-xl">
              Our pharmacy partners
            </h3>
          </div>

          {/* search + city filter, styled as a request form */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end">
            <label className="flex-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#6B7A73] dark:text-[#8FA39B]">
                Search
              </span>
              <div className="relative mt-1">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7A73] dark:text-[#8FA39B]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M21 21l-4.3-4.3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Pharmacy name…"
                  className="w-full rounded-md border border-[#D7DEDA] bg-white py-2.5 pl-9 pr-4 text-sm text-[#16241F] outline-none transition-colors placeholder:text-[#9AA8A2] focus:border-[#0E6B58] focus:ring-2 focus:ring-[#0E6B58]/15 dark:border-[#24332E] dark:bg-[#12211D] dark:text-[#E7EFEA] dark:placeholder:text-[#8FA39B] dark:focus:border-[#4FD9BC] dark:focus:ring-[#4FD9BC]/15"
                />
              </div>
            </label>

            <label className="sm:w-48">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#6B7A73] dark:text-[#8FA39B]">
                City
              </span>
              <Select
                value={city}
                onValueChange={(v) => setCity(v ?? "All cities")}
              >
                <SelectTrigger className="mt-1 w-full cursor-pointer rounded-md border border-[#D7DEDA] bg-white px-4 py-5 text-sm text-[#16241F] focus:border-[#0E6B58] focus:ring-2 focus:ring-[#0E6B58]/15 dark:border-[#24332E] dark:bg-[#12211D] dark:text-[#E7EFEA] dark:focus:border-[#4FD9BC] dark:focus:ring-[#4FD9BC]/15">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent className="dark:border-[#24332E] dark:bg-[#12211D] dark:text-[#E7EFEA]">
                  {cities.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
          </div>

          {filtered.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {filtered.map((partner, index) => (
                <PharmacySlipCard
                  key={partner.id}
                  id={partner.id}
                  name={partner.name}
                  logo={partner.logo}
                  city={partner.city}
                  index={index}
                  inView={gridInView}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-md border border-dashed border-[#D7DEDA] py-10 text-center text-sm text-[#6B7A73] dark:border-[#24332E] dark:text-[#8FA39B]">
              No pharmacies match &ldquo;{query}&rdquo; in {city}. Try a
              different search.
            </div>
          )}
        </div>

        {/* ---------------- CTA, styled as the tear-off bottom of a form ---------------- */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 rounded-md border border-[#D7DEDA] bg-white p-6 text-center dark:border-[#24332E] dark:bg-[#12211D] sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-semibold text-[#16241F] dark:text-[#E7EFEA]">
              Don&apos;t see your local pharmacy?
            </p>
            <p className="mt-0.5 text-sm text-[#6B7A73] dark:text-[#8FA39B]">
              We&apos;re adding new partners every week across Bangladesh.
            </p>
          </div>
          <button className="shrink-0 rounded-md bg-[#0E6B58] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0A4A3D] dark:bg-[#4FD9BC] dark:text-[#06231D] dark:hover:bg-[#7FD9C4]">
            Suggest a pharmacy
          </button>
        </div>
      </div>
    </section>
  );
}