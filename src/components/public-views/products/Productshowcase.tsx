"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Check,
  X,
  Shield,
  ShieldPlus,
  Users,
  Sparkles,
  Infinity as InfinityIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------ Types ------------------------------ */

type PlanId = "basic" | "plus" | "standard" | "smart" | "360";
type PlanTypeKey = "single" | "joint";

type PlanRow = {
  label: string;
  values: [boolean | number | string, boolean | number | string, boolean | number | string];
};

type Plan = {
  id: PlanId;
  tier: string;
  name: string;
  tagline: string;
  description: string;
  icon: typeof Shield;
  level: number; // 1-5
  features: string[];
};

/* ---------------------------- Static data ---------------------------- */

const PLANS: Plan[] = [
  {
    id: "basic",
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
  },
  {
    id: "plus",
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
  },
  {
    id: "standard",
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
  },
  {
    id: "smart",
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
  },
  {
    id: "360",
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
  },
];

const PLAN_TYPES: { id: PlanTypeKey; label: string }[] = [
  { id: "single", label: "Single" },
  { id: "joint", label: "Joint" },
];

const TIERS = ["Silver", "Gold", "Platinum"] as const;
const RECOMMENDED_TIER_INDEX = 1; // Gold

/* --------------------------- Pricing tables --------------------------- */
/* NOTE: the source `plans` list didn't include price figures, so the tables
   below are carried over from the plan's closest existing pricing set.
   "360" is a placeholder scaled up from "smart" — swap in real numbers
   when you have them. */

const BASIC_PRICING: Record<PlanTypeKey, PlanRow[]> = {
  single: [
    { label: "24/7 Teledoctor", values: [true, true, true] },
    { label: "Specialist Doctor", values: [true, true, true] },
    { label: "Discount at Partner Hospital", values: [true, true, true] },
    { label: "Personalized Care", values: [true, true, true] },
    { label: "Health Points", values: [true, true, true] },
    { label: "Hospitalization Cover (per night)", values: ["2,500", "3,500", "4,500"] },
    { label: "Hospitalization Cashback Limit (Yearly)", values: ["50,000", "70,000", "90,000"] },
    { label: "Yearly Limit (Nights)", values: [20, 20, 20] },
    { label: "Medicine Cashback", values: [false, "2,000", "4,000"] },
    { label: "Doctor Consultation Cashback", values: [false, "2,000", "2,000"] },
    { label: "Diagnostic Tests Cashback (Yearly Limit)", values: [false, "1,000", "1,000"] },
    { label: "Monthly Charge (Taka)", values: [180, 340, 480] },
    { label: "90 Days Charge (Taka)", values: [435, 935, 1320] },
    { label: "180 Days Charge (Taka)", values: [875, 1750, 2635] },
    { label: "Yearly Charge (Taka)", values: [1650, 3290, 5050] },
  ],
  joint: [
    { label: "24/7 Teledoctor", values: [true, true, true] },
    { label: "Specialist Doctor", values: [true, true, true] },
    { label: "Discount at Partner Hospital", values: [true, true, true] },
    { label: "Hospitalization Cashback Limit (Yearly)", values: ["80,000", "110,000", "140,000"] },
    { label: "Monthly Charge (Taka)", values: [320, 610, 860] },
    { label: "Yearly Charge (Taka)", values: [2970, 5920, 9090] },
  ],
};

const PLUS_PRICING: Record<PlanTypeKey, PlanRow[]> = {
  single: [
    { label: "Accidental Death Cover", values: [true, true, true] },
    { label: "Natural Death Cover", values: [false, true, true] },
    { label: "Disability Cover", values: [true, true, true] },
    { label: "Sum Assured (Taka)", values: ["1,00,000", "3,00,000", "5,00,000"] },
    { label: "Monthly Charge (Taka)", values: [90, 190, 320] },
    { label: "Yearly Charge (Taka)", values: [990, 2090, 3520] },
  ],
  joint: [
    { label: "Accidental Death Cover", values: [true, true, true] },
    { label: "Sum Assured (Taka)", values: ["1,50,000", "4,00,000", "6,50,000"] },
    { label: "Monthly Charge (Taka)", values: [150, 320, 540] },
    { label: "Yearly Charge (Taka)", values: [1650, 3520, 5940] },
  ],
};

const STANDARD_PRICING: Record<PlanTypeKey, PlanRow[]> = {
  single: [
    { label: "Diet Consultation", values: [true, true, true] },
    { label: "Fitness Plan", values: [false, true, true] },
    { label: "Mental Health Sessions (Yearly)", values: [1, 4, 8] },
    { label: "Monthly Charge (Taka)", values: [70, 150, 260] },
    { label: "Yearly Charge (Taka)", values: [770, 1650, 2860] },
  ],
  joint: [
    { label: "Diet Consultation", values: [true, true, true] },
    { label: "Mental Health Sessions (Yearly)", values: [2, 6, 12] },
    { label: "Monthly Charge (Taka)", values: [120, 260, 440] },
    { label: "Yearly Charge (Taka)", values: [1320, 2860, 4840] },
  ],
};

const SMART_PRICING: Record<PlanTypeKey, PlanRow[]> = {
  single: [
    { label: "Personal Doctor Access", values: [true, true, true] },
    { label: "Home Visit (Yearly)", values: [0, 2, 4] },
    { label: "Monthly Charge (Taka)", values: [250, 450, 650] },
    { label: "Yearly Charge (Taka)", values: [2750, 4950, 7150] },
  ],
  joint: [
    { label: "Personal Doctor Access", values: [true, true, true] },
    { label: "Home Visit (Yearly)", values: [0, 3, 6] },
    { label: "Monthly Charge (Taka)", values: [420, 750, 1080] },
    { label: "Yearly Charge (Taka)", values: [4620, 8250, 11880] },
  ],
};

// Placeholder — scaled ~40% above "Smart" until real figures are provided.
const TIER_360_PRICING: Record<PlanTypeKey, PlanRow[]> = {
  single: [
    { label: "Personal Doctor Access", values: [true, true, true] },
    { label: "Home Visit (Yearly)", values: [2, 4, 6] },
    { label: "Preventive Health Screening", values: [true, true, true] },
    { label: "Monthly Charge (Taka)", values: [350, 630, 910] },
    { label: "Yearly Charge (Taka)", values: [3850, 6930, 10010] },
  ],
  joint: [
    { label: "Personal Doctor Access", values: [true, true, true] },
    { label: "Home Visit (Yearly)", values: [2, 5, 8] },
    { label: "Monthly Charge (Taka)", values: [590, 1050, 1510] },
    { label: "Yearly Charge (Taka)", values: [6490, 11550, 16610] },
  ],
};

const PLAN_PRICING: Record<PlanId, Record<PlanTypeKey, PlanRow[]>> = {
  basic: BASIC_PRICING,
  plus: PLUS_PRICING,
  standard: STANDARD_PRICING,
  smart: SMART_PRICING,
  "360": TIER_360_PRICING,
};

/* ------------------------------ Cell ------------------------------ */

function Cell({ value }: { value: boolean | number | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-50 dark:bg-teal-900/30">
        <Check className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
      </span>
    ) : (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
        <X className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />
      </span>
    );
  }
  return <span>{value}</span>;
}

/* --------------------------- Plan content --------------------------- */

function PlanContent({ plan }: { plan: Plan }) {
  const Icon = plan.icon;
  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-col items-center text-center">
        <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-md shadow-teal-900/10">
          <Icon className="h-7 w-7" />
        </span>
        <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-teal-600 dark:text-teal-400">
          {plan.tier}
        </span>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          {plan.name}
        </h3>
        <p className="mt-2 text-base font-medium text-slate-700 dark:text-slate-300">
          {plan.tagline}
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {plan.description}
        </p>

        {/* Level indicator */}
        <div className="mt-6 flex items-center gap-1.5">
          {PLANS.map((p) => (
            <span
              key={p.id}
              className={cn(
                "h-1.5 w-6 rounded-full transition-colors",
                p.level <= plan.level
                  ? "bg-teal-600"
                  : "bg-slate-200 dark:bg-slate-800"
              )}
            />
          ))}
        </div>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" />
            <span className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------ Main ------------------------------ */

export default function ProductShowcase() {
  const [planId, setPlanId] = useState<PlanId>("basic");
  const [planType, setPlanType] = useState<PlanTypeKey>("single");
  const [fade, setFade] = useState(true);
  const firstRender = useRef(true);

  const plan = PLANS.find((p) => p.id === planId)!;
  const rows = PLAN_PRICING[planId][planType];

  // Fade content out/in whenever the active plan changes
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setFade(false);
    const timer = setTimeout(() => setFade(true), 150);
    return () => clearTimeout(timer);
  }, [planId]);

  const selectPlan = (id: PlanId) => {
    if (id === planId) return;
    setPlanId(id);
    setPlanType("single"); // reset plan type when switching plan
  };

  return (
    <div>
      {/* Plan tabs */}
      <section className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Choose a plan
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">
          Make your life easier and healthy with family-focused protection
        </p>

        <div className="mt-8 inline-flex flex-wrap justify-center gap-2 rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-900">
          {PLANS.map((p) => {
            const Icon = p.icon;
            const active = planId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => selectPlan(p.id)}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200",
                  active
                    ? "bg-teal-700 text-white shadow-md shadow-teal-900/10"
                    : "text-slate-600 hover:bg-white hover:text-teal-700 dark:text-slate-300 dark:hover:bg-slate-800"
                )}
              >
                <Icon className={cn("h-4 w-4", active ? "text-white" : "text-teal-600 dark:text-teal-400")} />
                {p.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Content that swaps with the active plan */}
      <div
        className={cn(
          "transition-all duration-200 ease-out",
          fade ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        )}
      >
        {/* Plan content */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <PlanContent plan={plan} />
        </section>

        {/* Pricing table */}
        <section className="bg-slate-50 py-16 dark:bg-slate-950">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              {plan.name} Plan Details
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">
              {plan.description}
            </p>

            {/* Plan type selector */}
            <div className="relative mt-8 inline-flex rounded-full bg-white p-1.5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              {PLAN_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setPlanType(type.id)}
                  className={cn(
                    "relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200",
                    planType === type.id
                      ? "bg-teal-700 text-white"
                      : "text-slate-600 hover:text-teal-700 dark:text-slate-300"
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="mt-10 overflow-hidden rounded-2xl border bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full min-w-160 border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b dark:border-slate-800">
                      <th className="px-5 py-4 font-semibold text-slate-500 dark:text-slate-400">
                        Plan
                      </th>
                      {TIERS.map((tier, i) => (
                        <th
                          key={tier}
                          className={cn(
                            "relative px-5 py-4 text-center font-semibold",
                            i === RECOMMENDED_TIER_INDEX
                              ? "text-teal-700 dark:text-teal-300"
                              : "text-slate-600 dark:text-slate-300"
                          )}
                        >
                          {i === RECOMMENDED_TIER_INDEX && (
                            <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-orange-500">
                              Most popular
                            </span>
                          )}
                          {tier}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr
                        key={row.label}
                        className={cn(
                          "border-b last:border-0 dark:border-slate-800",
                          i % 2 === 1 && "bg-slate-50/60 dark:bg-slate-800/30"
                        )}
                      >
                        <td className="px-5 py-3.5 font-medium text-slate-700 dark:text-slate-300">
                          {row.label}
                        </td>
                        {row.values.map((v, idx) => (
                          <td
                            key={idx}
                            className={cn(
                              "px-5 py-3.5 text-center text-slate-700 dark:text-slate-300",
                              idx === RECOMMENDED_TIER_INDEX && "bg-teal-50/40 dark:bg-teal-900/10"
                            )}
                          >
                            <Cell value={v} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-400 dark:text-slate-500 sm:hidden">
              Swipe sideways to compare all tiers →
            </p>
          </div>
        </section>

        {/* Terms banner */}
        <section className="border-y bg-slate-100 py-12 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
              Terms &amp; Conditions: {plan.name}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">
              At Shurokka, we value transparency and trust. Please take a moment
              to read our terms and conditions to understand our commitment to
              providing reliable service.
            </p>
            <Button className="mt-6 bg-teal-700 hover:bg-teal-800">
              <Link href="/term-of-service">Read Our Terms</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}