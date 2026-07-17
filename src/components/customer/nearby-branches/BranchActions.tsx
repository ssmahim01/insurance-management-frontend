"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Phone, Mail, Navigation, Copy, Check } from "lucide-react";
import { DirectionsModal } from "./DirectionsModal";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BranchActionsProps {
  branchName: string;
  phone?: string;
  email?: string;
  address: string;
  latitude: number;
  longitude: number;
  userCoords?: { latitude: number; longitude: number } | null;
}

export function BranchActions({
  branchName,
  phone,
  email,
  address,
  latitude,
  longitude,
  userCoords,
}: BranchActionsProps) {
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const mailtoHref = email
    ? `mailto:${email}?subject=${encodeURIComponent(
        "Insurance Service Inquiry"
      )}&body=${encodeURIComponent(
        `Hello,\n\nI would like to know more about your insurance services.\n\nBranch: ${branchName}\n\nRegards,`
      )}`
    : undefined;

  const handleCopyPhone = async () => {
    if (!phone) return;
    try {
      await navigator.clipboard.writeText(phone);
      setPhoneCopied(true);
      toast.success("Phone number copied");
      setTimeout(() => setPhoneCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy number");
    }
  };

  const btnBase =
    "flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all duration-200 ease-out active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60";
  const glass =
    "bg-white/10 text-white backdrop-blur-sm ring-1 ring-white/15 hover:bg-white/20 hover:-translate-y-0.5";
  const disabledCls = "bg-white/10 text-white/40 cursor-not-allowed";
  const solid =
    "bg-white text-slate-900 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:bg-white/95";

  return (
    <>
      <div className="space-y-2 pt-4 mt-4 border-t border-white/15">
        {/* ── phone row: call + copy ── */}
        <div className="grid grid-cols-3 gap-2">
          {phone ? (
            <Link
              href={`tel:${phone}`}
              className={`${btnBase} ${glass} col-span-2`}
              aria-label={`Call ${phone}`}
            >
              <Phone className="h-3.5 w-3.5" />
              Call
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className={`${btnBase} ${disabledCls} col-span-2`}
              aria-label="Phone number unavailable"
            >
              <Phone className="h-3.5 w-3.5" />
              Call
            </button>
          )}
          <button
            type="button"
            onClick={handleCopyPhone}
            disabled={!phone}
            className={`${btnBase} ${phone ? glass : disabledCls}`}
            aria-label="Copy phone number"
            title="Copy phone number"
          >
            {phoneCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* ── email + directions row ── */}
        <div className="grid grid-cols-2 gap-2">
          {mailtoHref ? (
            <a href={mailtoHref} className={`${btnBase} ${glass}`} aria-label={`Email ${email}`}>
              <Mail className="h-3.5 w-3.5" />
              Email
            </a>
          ) : (
            <button
              type="button"
              disabled
              className={`${btnBase} ${disabledCls}`}
              aria-label="Email unavailable"
            >
              <Mail className="h-3.5 w-3.5" />
              Email
            </button>
          )}
          <Button
            type="button"
            variant="default"
            onClick={() => setDirectionsOpen(true)}
           className="group hover:cursor-pointer border-indigo-600 text-white bg-indigo-700 hover:bg-indigo-800 hover:shadow-xl hover:text-white duration-500 dark:text-white mt-2 cursor-pointer font-bold tracking-widest uppercase transition-colors disabled:opacity-60 hover:scale-105 ease-in-out"
            aria-label={`Show directions to ${branchName}`}
          >
            <Navigation className="h-3.5 w-3.5" />
            Directions
          </Button>
        </div>
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