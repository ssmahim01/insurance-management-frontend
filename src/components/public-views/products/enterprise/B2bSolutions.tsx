"use client";

import { SlidersHorizontal, Lightbulb, HandCoins, Umbrella } from "lucide-react";
import Image from "next/image";

/**
 * "Partner with Chhaya for Bespoke B2B Insurance" feature grid.
 * Icons are lucide-react stand-ins for the reference art (idea+sliders,
 * bulb+people, hand+coins/people, umbrella+money-bag) — swap for real SVGs
 * the same way as the other icon sections if you have the actual files.
 */

const features = [
  {
    icon: '/assets/customized-coverage-for-unique-business-needs.svg',
    title: "Customized Coverage for Unique Business Needs",
    description:
      "Tailor insurance products to address specific risks and operational nuances, providing relevant and comprehensive protection for your business",
  },
  {
    icon: '/assets/collaborative-innovation-across-key-sectors.svg',
    title: "Collaborative Innovation Across Key Sectors",
    description:
      "Partner with us to co-create solutions in life, health, asset protection, and employee benefits, meeting the evolving challenges of your industry",
  },
  {
    icon: '/assets/comprehensive-life-health-employee-benefits-icon.svg',
    title: "Comprehensive Life, Health & Employee Benefits",
    description:
      "Design personalized insurance plans that enhance employee well-being, satisfaction, and retention through tailored life, health, and benefit packages",
  },
  {
    icon: '/assets/tailored-asset-protection-solutions.svg',
    title: "Tailored Asset Protection Solutions",
    description:
      "Develop flexible insurance products that safeguard your business assets against sector-specific risks, ensuring long-term security and peace of mind",
  },
];

export default function B2BSolutions() {
  return (
    <section className="bg-white py-20 dark:bg-[#0B1220]">
      <div className="mx-auto max-w-7xl px-5 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#111827] dark:text-white sm:text-3xl">
          Partner with Chhaya for Bespoke B2B Insurance
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-[#6B7280] dark:text-slate-400 sm:text-base">
          Innovative, flexible insurance solutions crafted to meet the
          specific needs of your industry and employees
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-2xl border border-black/10 p-8 shadow-sm dark:border-white/10 transition-all duration-500 ease-out hover:-translate-y-2"
            >
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#F3F4F6] dark:bg-slate-800/60">
                <Image
                  src={Icon}
                  alt={title}
                    width={64}
                    height={64}
                />
              </div>
              <h3 className="mt-6 text-lg font-bold text-[#1F2937] dark:text-white">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#6B7280] dark:text-slate-400">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}