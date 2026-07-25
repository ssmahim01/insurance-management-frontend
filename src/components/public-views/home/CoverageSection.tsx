"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Building2,
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import { useInView } from "@/components/shared/useInView";

interface CoverageBlock {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  href: string;
  icon: typeof Users;
  reverse: boolean;
  stat: {
    icon: typeof Users;
    value: string;
    label: string;
  };
}

const coverageBlocks: CoverageBlock[] = [
  {
    id: 1,
    eyebrow: "For You & Your Family",
    icon: Users,
    title: "Individuals & Families",
    description:
      "We understand the importance of safeguarding the financial security of individuals and families. We offer a comprehensive suite of plans designed to address a wide range of needs — protection against life and disability, health, wellness, and doctor service — ensuring peace of mind for our clients and their loved ones.",
    image: "/assets/Cover1.webp",
    href: "/products",
    reverse: false,
    stat: {
      icon: HeartHandshake,
      value: "500+",
      label: "Partner hospitals, up to 50% off",
    },
  },
  {
    id: 2,
    eyebrow: "For Your Organisation",
    icon: Building2,
    title: "Corporates & Stakeholders",
    description:
      "In today's dynamic business environment, employee well-being is paramount. We partner with organisations to develop customised health solutions that safeguard their most valuable asset: their workforce. Our healthcare plans address health needs across the spectrum, tailored to the requirements of your employees or stakeholders, ensuring their wellbeing.",
    image: "/assets/Cover2.png",
    href: "/products",
    reverse: true,
    stat: {
      icon: ShieldCheck,
      value: "24/7",
      label: "Care built around your workforce",
    },
  },
];

function CoverageRow({ block }: { block: CoverageBlock }) {
  const Icon = block.icon;
  const StatIcon = block.stat.icon;

  const { ref: sectionRef, isVisible: visible } = useInView({
      threshold: 0.2,
  });

  return (
    <div
      ref={sectionRef}
      className={`grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20 ${
        block.reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Text column */}
      <div
        className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
          visible
            ? "opacity-100 translate-x-0"
            : `opacity-0 ${block.reverse ? "translate-x-8" : "-translate-x-8"}`
        }`}
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00C896]/25 bg-[#00C896]/10 px-4 py-1.5 dark:bg-[#00C896]/15">
          <Icon className="h-4 w-4 text-[#00A67E]" strokeWidth={2} />
          <span className="text-xs font-semibold uppercase tracking-wide text-[#00A67E]">
            {block.eyebrow}
          </span>
        </div>

        <h3 className="mb-4 text-3xl font-bold tracking-tight text-[#0B1F3A] dark:text-white sm:text-4xl">
          {block.title}
        </h3>

        <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
          {block.description}
        </p>

        <Link
          href={block.href}
          className="group/cta inline-flex items-center gap-2 rounded-full bg-[#007A55] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-sm shadow-[#007A55]/20 transition-all duration-300 hover:bg-[#F97316] hover:shadow-md hover:shadow-[#F97316]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A67E] focus-visible:ring-offset-2"
        >
          Know More
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
        </Link>
      </div>

      {/* Image column */}
      <div
        className={`relative transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ transitionDelay: visible ? "150ms" : "0ms" }}
      >
        {/* Offset backdrop panel for depth */}
        <div
          aria-hidden
          className={`absolute -inset-3 -z-10 rounded-[28px] bg-[#00C896]/15 transition-transform duration-700 ease-out dark:bg-[#00C896]/10 ${
            block.reverse ? "rotate-2" : "-rotate-2"
          } ${visible ? "scale-100" : "scale-90"}`}
        />

        <div className="group relative h-64 w-full overflow-hidden rounded-2xl shadow-lg shadow-black/10 dark:shadow-black/40 sm:h-80 lg:h-96">
          <Image
            src={block.image}
            alt={block.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/40 via-transparent to-transparent" />
        </div>

        {/* Floating stat badge, grounded in the plan's real coverage details */}
        <div
          className={`absolute -bottom-6 left-6 flex max-w-[80%] items-center gap-3 rounded-xl border border-black/5 bg-white/95 px-4 py-3 shadow-xl shadow-black/10 backdrop-blur-sm transition-all duration-700 ease-out dark:border-white/10 dark:bg-neutral-900/95 sm:left-8 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: visible ? "400ms" : "0ms" }}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00C896]/15">
            <StatIcon className="h-5 w-5 text-[#00A67E]" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <p className="text-base font-bold leading-tight text-[#0B1F3A] dark:text-white">
              {block.stat.value}
            </p>
            <p className="truncate text-xs leading-tight text-gray-500 dark:text-gray-400">
              {block.stat.label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoverageSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-10 dark:bg-neutral-950 sm:py-24">
      {/* Subtle ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-140 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,200,150,0.08),transparent)]"
      />

      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={headingRef}
          className={`mx-auto mb-20 max-w-2xl text-center transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none sm:mb-24 ${
            headingVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#00A67E]">
            Coverage
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-[#0B1F3A] dark:text-white sm:text-5xl">
            Built for how you live and work
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Empowering individuals, families, and corporate stakeholders to
            prioritise their wellbeing
          </p>
          <div className="mx-auto mt-6 h-1 w-14 rounded-full bg-[#00C896]" />
        </div>

        <div className="space-y-6 sm:space-y-28">
          {coverageBlocks.map((block, index) => (
            <div key={block.id} className="relative">
              <CoverageRow block={block} />
              {index < coverageBlocks.length - 1 && (
                <div
                  aria-hidden
                  className="mx-auto mt-24 h-px w-full max-w-3xl bg-linear-to-r from-transparent via-black/10 to-transparent dark:via-white/10 sm:mt-28"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}