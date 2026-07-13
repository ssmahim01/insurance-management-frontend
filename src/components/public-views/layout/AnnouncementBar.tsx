"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-[#0F467C] dark:bg-[#0F467C]">
      <div className="mx-auto flex h-11 max-w-7xl items-center justify-center gap-4 px-10 sm:px-6">
        <p className="text-center text-[13px] font-medium text-white sm:text-sm">
          Our Health Plan just got better – more benefits at a new price!
        </p>

        <Link
          href="/plans/health"
          className="shrink-0 rounded-full btn-bg px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-colors duration-300  sm:text-[13px]"
        >
          Click Here
        </Link>

        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss announcement"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:right-5"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}