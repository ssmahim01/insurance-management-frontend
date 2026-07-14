"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeroBannerProps {
  title: string;
  description?: string;
  userName?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  /** Extra action(s) rendered next to the refresh button, e.g. "Add teacher". */
  action?: React.ReactNode;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function DashboardHeroBanner({
  title,
  description,
  userName,
  onRefresh,
  isRefreshing,
  action,
}: DashboardHeroBannerProps) {
  // date is computed client-side only, to avoid SSR/CSR hydration mismatches
  const [dateLabel, setDateLabel] = useState("");

  useEffect(() => {
   setTimeout(() => {
     setDateLabel(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
   }, 100);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg shadow-emerald-900/10 dark:shadow-black/30 p-6 sm:p-7">
      {/* decorative glow accents */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-blue-300/10 blur-2xl" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest">
            {getGreeting()}
            {userName ? `, ${userName}` : ""}
          </p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm max-w-xl">
              {description}
            </p>
          )}
          {dateLabel && (
            <p className="mt-2 text-xs font-medium">
              {dateLabel}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onRefresh && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="gap-2 bg-white/15 text-white border border-white/20 hover:bg-white/25 backdrop-blur-sm transition-all duration-200 ease-out hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-70"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          )}
          {action}
        </div>
      </div>
    </div>
  );
}