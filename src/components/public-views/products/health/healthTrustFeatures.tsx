"use client";

import Image from "next/image";

const features = [
  {
    icon: "/assets/affordable-premiums.svg",
    title: "Affordable Premiums",
    description: "Quality coverage within your budget",
  },
  {
    icon: "/assets/paperless-process.svg",
    title: "Paperless Process",
    description: "100% digital, hassle-free experience",
  },
  {
    icon: "/assets/fast-claim-settlement.svg",
    title: "Fast Claim Settlement",
    description: "Quick, transparent claim approvals",
  },
];

export default function HealthTrustFeatures() {
  return (
    <section className="bg-white py-20 dark:bg-[#0B1220]">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] dark:text-white sm:text-4xl">
          Trusted Protection for Your Family
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-[#6B7280] dark:text-slate-400 sm:text-lg">
          Experience peace of mind with reliable, transparent, and
          customer-focused health insurance.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-y-14 sm:grid-cols-3 sm:gap-x-8">
          {features.map(({ icon, title, description }) => (
            <div key={title} className="flex flex-col items-center transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer">
              <div className="flex h-44 w-44 items-center justify-center rounded-full bg-[#F3F4F6] dark:bg-slate-800/60">
                <Image
                  src={icon}
                  alt=""
                  width={110}
                  height={110}
                  className="h-28 w-28 select-none dark:invert"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-6 text-xl font-bold text-[#1F2937] dark:text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm text-[#6B7280] dark:text-slate-400">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}