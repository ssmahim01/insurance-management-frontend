"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TravelShield() {
    const route = useRouter();
  return (
    <section className="relative isolate overflow-hidden py-32">
      <Image
        src="/assets/travel-upcoming-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-linear-to-br from-emerald-900/85 via-emerald-800/75 to-emerald-700/70" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          <Image 
            src="/assets/worldIcon.png"
            alt="Travel Shield Icon"
            width={150}
            height={150}
          />
        </div>

        <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl">
          Travel <span className="text-orange-400">Shield</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-white/90 sm:text-lg">
         A smarter way to protect your journeys. Our <span className="font-semibold text-orange-400">
            Travel Insurance</span> is coming soon to safeguard every international trip you take.
        </p>

        <p className="mt-4 text-base text-white/90 sm:text-lg">
          In the meantime, check out our{" "}
          <span className="font-semibold text-orange-400">
            Health Packages
          </span>
          :
        </p>

        <Button
          onClick={() => route.push("/product/health")}
          className="cursor-pointer mt-8 rounded-full bg-orange-500 px-8 py-5 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-colors hover:bg-orange-600"
        >
          Explore Health Packages
        </Button>
      </div>
    </section>
  );
}