"use client";

import { LucideIcon, LocateFixed, MapPinOff, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GeoStatus } from "@/hooks/useGeolocation";

interface BranchSearchCardProps {
  status: Exclude<GeoStatus, "granted">;
  errorMessage?: string;
  onRetry: () => void;
}

interface StatusConfig {
  icon: LucideIcon;
  title: string;
  description: string;
  showRetry: boolean;
  animate?: boolean;
}

const STATUS_CONFIG: Record<Exclude<GeoStatus, "granted">, StatusConfig> = {
  idle: {
    icon: LocateFixed,
    title: "Requesting your location",
    description: "We need your location to find branches near you.",
    showRetry: false,
    animate: true,
  },
  requesting: {
    icon: LocateFixed,
    title: "Locating you...",
    description: "Please allow location access in your browser prompt.",
    showRetry: false,
    animate: true,
  },
  denied: {
    icon: MapPinOff,
    title: "Location access denied",
    description: "Enable location permission in your browser settings to see nearby branches.",
    showRetry: true,
  },
  unavailable: {
    icon: AlertTriangle,
    title: "Location unavailable",
    description: "We couldn't determine your location. Please try again.",
    showRetry: true,
  },
  timeout: {
    icon: Clock,
    title: "Location request timed out",
    description: "It took too long to get your location. Please try again.",
    showRetry: true,
  },
};

export function BranchSearchCard({ status, errorMessage, onRetry }: BranchSearchCardProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center gap-5 rounded-3xl border border-border bg-card/70 backdrop-blur-sm p-10 sm:p-14 text-center shadow-sm">
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500/15 to-blue-500/10 ring-1 ring-emerald-500/10">
        <Icon
          className={`h-7 w-7 text-emerald-600 dark:text-emerald-400 ${
            config.animate ? "animate-pulse" : ""
          }`}
        />
        {config.animate && (
          <span className="absolute inset-0 rounded-2xl ring-2 ring-emerald-400/40 animate-ping" />
        )}
      </div>

      <div className="relative space-y-1.5">
        <h3 className="text-lg font-semibold text-foreground">{config.title}</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
          {errorMessage || config.description}
        </p>
      </div>

      {config.showRetry && (
        <Button
          onClick={onRetry}
          className="relative gap-2 bg-linear-to-r from-emerald-600 to-blue-600 text-white shadow-md shadow-emerald-900/10 hover:from-emerald-700 hover:to-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 ease-out"
        >
          <LocateFixed className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}