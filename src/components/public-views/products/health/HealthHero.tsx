"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HealthHero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#0B1220]">
      <div className="mx-auto max-w-5xl px-4 pt-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-[#111827] dark:text-white sm:text-5xl md:text-6xl">
          Affordable Coverage for{" "}
          <span className="relative inline-block text-emerald-500">
            Every
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 120 8"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 5.5C20 2 40 2 60 4C80 6 100 3 118 2.5"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <br />
          Health Emergency
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base text-[#4B5563] dark:text-slate-400 sm:text-lg">
          Reliable <span aria-hidden="true">•</span> Accessible{" "}
          <span aria-hidden="true">•</span> Digital{" "}
          <span aria-hidden="true">•</span> Fast
        </p>

        <div className="mt-9 flex justify-center">
          <Button
            size="lg"
            className="cursor-pointer h-12 rounded-xl  px-8 text-base font-semibold text-white btn-bg"
          >
            See Our Plans
          </Button>
        </div>
      </div>

      {/* Line-art illustration strip */}
      <div className="relative -mt-20 w-full">
        <Image
          src="/assets/health-bg.svg"
          alt=""
          width={2617}
          height={768}
          priority
          className="h-auto w-full select-none dark:invert"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}