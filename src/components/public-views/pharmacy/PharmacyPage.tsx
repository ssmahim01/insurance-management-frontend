"use client";

import Link from "next/link";

const pharmacyPartners = [
  { id: 1, city: "Dhaka" },
  { id: 2, city: "Dhaka" },
  { id: 3, city: "Chattogram" },
  { id: 4, city: "Dhaka" },
  { id: 5, city: "Sylhet" },
  { id: 6, city: "Khulna" },
  { id: 7, city: "Rajshahi" },
  { id: 8, city: "Dhaka" },
];

const cities = [
  "All cities",
  ...Array.from(new Set(pharmacyPartners.map((p) => p.city))),
];

// ----------------------------------------------------------------------------
// Main section
// ----------------------------------------------------------------------------
export default function PharmacyPage() {
  return (
    <section className="bg-[#F4F7F4] pb-5 dark:bg-[#0B1412]">
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
        </div>
      </div>

      {/* ---------------- Coming soon ---------------- */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-5 py-24 text-center sm:py-32">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0E6B58]/20 dark:bg-[#4FD9BC]/20" />
          <span className="absolute inline-flex h-11 w-11 animate-pulse rounded-full bg-[#0E6B58]/10 dark:bg-[#4FD9BC]/10" />
          <svg
            className="relative h-7 w-7 animate-spin text-[#0E6B58] dark:text-[#4FD9BC]"
            style={{ animationDuration: "2.2s" }}
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="42 100"
            />
          </svg>
        </div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0E6B58] dark:text-[#4FD9BC]">
          Requisition in progress
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-[#16241F] dark:text-[#E7EFEA] sm:text-3xl">
          Pharmacy list coming soon
        </h3>
        <p className="mt-3 max-w-md text-sm text-[#6B7A73] dark:text-[#8FA39B]">
          We&apos;re onboarding partner pharmacies across Bangladesh. Check
          back shortly to find and redeem your benefit nearby.
        </p>
      </div>
    </section>
  );
}