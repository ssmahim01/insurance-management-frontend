"use client";

import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const benefits = [
  {
    title: "Save Up to 50% on Radiology Tests:",
    description:
      "Get significant discounts on essential radiology tests like X-rays, MRIs, and CT scans.",
  },
  {
    title: "Save Up to 40% on Pathology Tests:",
    description:
      "Save on pathology tests, including blood tests, urine tests, and biopsies, ensuring accurate diagnostics without financial strain.",
  },
  {
    title: "Save Up to 20% on Hospitalization Costs:",
    description:
      "Reduce your financial burden during hospital stays with substantial discounts on hospitalization expenses.",
  },
];

const stats = [
  { value: "242+", label: "Healthcare Partners" },
  { value: "35+", label: "Districts" },
];

export default function PartnerNetwork() {
  return (
    <section className="bg-white py-20 dark:bg-[#0B1220]">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#111827] dark:text-white sm:text-3xl">
            Maximize Your Savings with Our Partner Network
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#6B7280] dark:text-slate-400 sm:text-base">
            Access quality healthcare at discounted rates with our healthcare
            partners
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-10">
          {/* Copy column */}
          <div>
            <p className="text-sm text-[#374151] dark:text-slate-300 sm:text-base">
              As a Chhaya subscriber, you gain access to exclusive discounts
              at our network of partner hospitals and healthcare service
              providers. Here&apos;s how you can save:
            </p>

            <ul className="mt-6 space-y-5">
              {benefits.map((b) => (
                <li key={b.title} className="flex gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-emerald-600 text-white"
                    strokeWidth={2}
                  />
                  <p className="text-sm text-[#374151] dark:text-slate-300 sm:text-base">
                    <span className="font-bold text-[#111827] dark:text-white">
                      {b.title}
                    </span>{" "}
                    {b.description}
                  </p>
                </li>
              ))}
            </ul>

            <button className="mt-8 rounded-lg bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-800 cursor-pointer">
              View All Partners
            </button>
          </div>

          {/* Illustration + stats column */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-6 text-[#374151] dark:text-slate-300">
              <Image
                src="/assets/discount-partner.svg"
                alt="Healthcare Partners"
                width={600}
                height={400}
                className="rounded-lg "
              />

            </div>

            <div className="mt-8 flex gap-16">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm text-[#6B7280] dark:text-slate-400">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}