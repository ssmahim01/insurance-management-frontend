"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";

/**
 * "Find the Right Plan for You" pricing section with a Monthly/Yearly
 * billing toggle. Yearly prices are derived from monthly with a ~15%
 * discount baked in — adjust `YEARLY_DISCOUNT` or hardcode real numbers
 * once you have actual annual pricing from the underwriter.
 */

type Billing = "monthly" | "yearly";

const YEARLY_DISCOUNT = 0.15;

const plans = [
  {
    name: "Alo",
    monthlyPrice: 86.12,
    coverage: "113,000",
  },
  {
    name: "Asha",
    monthlyPrice: 130.12,
    coverage: "179,000",
  },
  {
    name: "Astha",
    monthlyPrice: 216.12,
    coverage: "295,000",
  },
];

function formatPrice(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function HealthPricingPlans() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section className="bg-white py-20 dark:bg-[#0B1220]">
      <div className="mx-auto max-w-7xl px-5 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] dark:text-white sm:text-4xl">
          Find the Right Plan for You
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#6B7280] dark:text-slate-400 sm:text-lg">
          Explore our affordable health packages designed to fit your unique
          needs and budget
        </p>

        {/* Billing toggle */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#111827]/10 p-1 dark:border-white/10">
          <button
            onClick={() => setBilling("monthly")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              billing === "monthly"
                ? "bg-emerald-600 text-white"
                : "text-[#374151] hover:bg-[#111827]/5 dark:text-slate-300 dark:hover:bg-white/5"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              billing === "yearly"
                ? "bg-emerald-600 text-white"
                : "text-[#374151] hover:bg-[#111827]/5 dark:text-slate-300 dark:hover:bg-white/5"
            }`}
          >
            Yearly
          </button>
        </div>

        {/* Plan cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 text-left md:grid-cols-3">
          {plans.map((plan) => {
            const price =
              billing === "monthly"
                ? plan.monthlyPrice
                : plan.monthlyPrice * 12 * (1 - YEARLY_DISCOUNT);
            const unit = billing === "monthly" ? "/month" : "/year";
            const periodLabel =
              billing === "monthly" ? "Monthly & 1 Person" : "Yearly & 1 Person";

            return (
              <div
                key={plan.name}
                className="flex flex-col rounded-2xl border border-black/5 bg-linear-to-br from-emerald-50 to-amber-50 p-8 shadow-sm dark:border-white/10 dark:from-emerald-950/30 dark:to-amber-950/10
                transition-all duration-500 ease-out hover:-translate-y-2 
                "
              >
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {plan.name}
                </span>

                <p className="mt-3 text-4xl font-extrabold text-[#111827] dark:text-white">
                  TK {formatPrice(price)}
                </p>
                <p className="mt-1 text-sm text-[#6B7280] dark:text-slate-400">
                  ({periodLabel})
                </p>

                <p className="mt-6 text-sm font-bold text-[#111827] dark:text-white">
                  Service Included?
                </p>
                <ul className="mt-3 space-y-2.5 text-sm text-[#374151] dark:text-slate-300">
                  <li className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#374151] dark:bg-slate-400" />
                    Doctor Consultation followed by e-Prescription*
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#374151] dark:bg-slate-400" />
                    Cash Coverage of up to Taka {plan.coverage}
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#374151] dark:bg-slate-400" />
                    Up to 40% discount on diagnostic test bills
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#374151] dark:bg-slate-400" />
                    Duration: 1 year (with subscription auto-renewal facility)
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#374151] dark:bg-slate-400" />
                    Price: Taka {formatPrice(price)}
                    {unit}
                  </li>
                </ul>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-[#111827] dark:text-white">
                    Underwritten by:
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <ShieldCheck
                      className="h-8 w-8 shrink-0 text-emerald-700 dark:text-emerald-400"
                      strokeWidth={1.5}
                      fill="currentColor"
                      fillOpacity={0.15}
                    />
                    <div className="leading-tight">
                      <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        Protective Islami Life Insurance Limited
                      </p>
                      <p className="text-[10px] italic text-amber-700/80 dark:text-amber-400/70">
                        Protect Your Future
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button className="flex-1 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-600 cursor-pointer">
                    View Details
                  </button>
                  <button className="flex-1 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800 cursor-pointer">
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}