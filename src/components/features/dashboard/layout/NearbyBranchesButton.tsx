"use client";

import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface NearbyBranchesButtonProps {
  href?: string;
  className?: string;
  showLabel?: boolean;
}

export function NearbyBranchesButton({
  href = "/customer/dashboard/nearby-branches",
  className,
  showLabel = true,
}: NearbyBranchesButtonProps) {
  return (
    <Link
      href={href}
      title="Find nearby branches"
      className={cn(
        "group relative flex items-center gap-1.5 overflow-hidden rounded-full px-3 py-1.5",
        "bg-linear-to-r from-indigo-500 via-teal-500 to-indigo-600",
        "text-white shadow-sm ring-1 ring-indigo-600/20",
        "transition-all duration-300 ease-out",
        "hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 hover:ring-indigo-500/40",
        "active:scale-95",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2",
        className
      )}
    >
      {/* subtle shine sweep on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

      <MapPin className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />

      {showLabel && (
        <span className="hidden sm:inline text-[12.5px] font-semibold tracking-wide whitespace-nowrap">
          Nearby Branches
        </span>
      )}
    </Link>
  );
}