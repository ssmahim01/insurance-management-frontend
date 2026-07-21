"use client";

import { useState } from "react";
import { Phone, Navigation } from "lucide-react";
import { DirectionsModal } from "./DirectionsModal";
import { Button } from "@/components/ui/button";

interface BranchActionsProps {
  branchName: string;
  phone?: string;
  address: string;
  latitude: number;
  longitude: number;
  userCoords?: { latitude: number; longitude: number } | null;
}

export function BranchActions({
  branchName,
  phone,
  address,
  latitude,
  longitude,
  userCoords,
}: BranchActionsProps) {
  const [directionsOpen, setDirectionsOpen] = useState(false);

  return (
    <>
      <div className="mt-3 space-y-2.5">
        {phone && (
          <div
            className="flex w-full cursor-default items-center gap-2.5 rounded-xl bg-emerald-50 px-3.5 py-2.5 ring-1 ring-emerald-100 select-text dark:bg-emerald-950/20 dark:ring-emerald-900/40"
            aria-label={`Branch contact number ${phone}`}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            <Phone className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />

            <span className="flex-1 truncate text-[13.5px] font-semibold tracking-wide text-emerald-800 tabular-nums dark:text-emerald-300">
              {phone}
            </span>

            <span className="hidden shrink-0 text-[10px] font-medium uppercase tracking-wider text-emerald-600/70 sm:inline dark:text-emerald-400/60">
              Branch Line
            </span>
          </div>
        )}

        {/* ── Directions: the only real action ── */}
        <Button
          type="button"
          onClick={() => setDirectionsOpen(true)}
          className="group w-full gap-2 rounded-xl hover:cursor-pointer bg-indigo-600 font-semibold tracking-wide text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30 active:scale-95"
          aria-label={`Show directions to ${branchName}`}
        >
          <Navigation className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          Get Directions
        </Button>
      </div>

      <DirectionsModal
        open={directionsOpen}
        onOpenChange={setDirectionsOpen}
        branchName={branchName}
        address={address}
        latitude={latitude}
        longitude={longitude}
        userCoords={userCoords}
      />
    </>
  );
}