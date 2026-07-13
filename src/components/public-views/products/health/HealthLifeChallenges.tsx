"use client";

import Image from "next/image";



const features = [
  {
    icon: '/assets/critical-illness-protection.svg',
    title: "Critical Illness Protection",
    description: "Financial safeguard against severe health conditions",
  },
  {
    icon: '/assets/disability-coverage.svg',
    title: "Disability Coverage",
    description: "Support for partial or total disability",
  },
  {
    icon: '/assets/hospital-stay-cover.svg',
    title: "Hospitalization Cover",
    description: "We pay for your hospital stays and treatment costs",
  },
  {
    icon: '/assets/outpatient-support.svg',
    title: "Outpatient Support",
    description: "Doctor visits and tests are included",
  },
];

export default function HealthLifeChallenges() {
  return (
    <section className="bg-white py-20 dark:bg-[#0B1220]">
      <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] dark:text-white sm:text-4xl">
          Supporting You Through Life&apos;s Challenges
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#6B7280] dark:text-slate-400 sm:text-lg">
          Protect yourself and your family from financial stress caused by
          unexpected health issues with comprehensive health insurance.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-y-14 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
          {features.map(({ icon, title, description }) => (
            <div key={title} className="flex flex-col items-center transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer">
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-[#F3F4F6] dark:bg-slate-800/60">
                <Image
                  src={icon}
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 text-[#374151] dark:text-slate-300"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-6 text-xl font-bold text-[#1F2937] dark:text-white">
                {title}
              </h3>
              <p className="mt-2 max-w-55 text-sm text-[#6B7280] dark:text-slate-400">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}