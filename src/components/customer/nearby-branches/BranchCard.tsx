"use client";

import { useState } from "react";
import { Building2, Globe, MapPin, Navigation2 } from "lucide-react";
import { IPartnerBranch } from "@/types/branch.types";
import { BranchActions } from "./BranchActions";
import { formatDistance } from "@/utils/geo-distance";
import Link from "next/link";

interface PopulatedPartner {
  _id?: string;
  name: string;
  logo?: string;
  phone?: string;
  website?: string;
  email?: string;
}

interface BranchCardProps {
  branch: IPartnerBranch;
  index?: number;
  distanceKm?: number;
  userCoords?: { latitude: number; longitude: number } | null;
}

function getPopulatedPartner(
  partner: IPartnerBranch["partner"],
): PopulatedPartner | null {
  if (!partner || typeof partner === "string") return null;
  return partner as unknown as PopulatedPartner;
}

const GRADIENTS = [
  "from-cyan-600 via-cyan-700 to-teal-900",
  "from-blue-600 via-indigo-700 to-blue-950",
  "from-indigo-600 via-purple-700 to-indigo-950",
  "from-purple-600 via-fuchsia-700 to-purple-950",
  "from-teal-600 via-cyan-700 to-cyan-950",
  "from-blue-700 via-cyan-700 to-teal-900",
  "from-fuchsia-600 via-purple-700 to-indigo-950",
  "from-cyan-600 via-blue-700 to-indigo-950",
];

function hashToIndex(seed: string, length: number) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % length;
}

export function BranchCard({
  branch,
  index = 0,
  distanceKm,
  userCoords,
}: BranchCardProps) {
  const [logoFailed, setLogoFailed] = useState(false);

  const partner = getPopulatedPartner(branch.partner);
  const [longitude, latitude] = branch.location?.coordinates ?? [0, 0];
  const phone = branch.phone || partner?.phone;
  const email = branch.email || partner?.email;

  const seed = String(
    branch._id ?? partner?.name ?? branch.branchName ?? index,
  );
  const gradient = GRADIENTS[hashToIndex(seed, GRADIENTS.length)];

  const addressParts = [
    branch.address,
    branch.area,
    branch.city,
    branch.postalCode,
  ].filter(Boolean);
  const fullAddress = addressParts.join(", ");

  const showLogo = Boolean(partner?.logo) && !logoFailed;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-linear-to-br ${gradient} p-5 shadow-md shadow-black/10 ring-1 ring-white/10 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/20 hover:ring-white/30 focus-within:ring-2 focus-within:ring-white/50`}
    >
      {/* decorative glows — always on, since the card is always a dark-saturated gradient */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />
      <div className="pointer-events-none absolute -bottom-14 -left-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
      {/* animated border glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-2 ring-white/30 transition-opacity duration-300 group-hover:opacity-100" />

      {/* ── top badges: active + distance ── */}
      <div className="relative mb-4 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white ring-1 ring-white/20">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              branch.isActive ? "bg-cyan-300 animate-pulse" : "bg-white/40"
            }`}
          />
          {branch.isActive ? "Active" : "Inactive"}
        </span>
        {typeof distanceKm === "number" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-white ring-1 ring-white/20">
            <Navigation2 className="h-3 w-3" />
            {formatDistance(distanceKm)}
          </span>
        )}
      </div>

      {/* ── header: large logo + branch/partner name ── */}
      <div className="relative flex items-start gap-3 mb-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-white/40 transition-transform duration-300 group-hover:scale-105">
          {showLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={partner!.logo}
              alt={partner?.name ?? "Partner logo"}
              className="h-full w-full object-contain"
              loading="lazy"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-100">
              <Building2 className="h-7 w-7 text-slate-400" />
            </div>
          )}
        </div>
        <div className="min-w-0 pt-0.5">
          <p className="text-base font-bold text-white truncate">
            {branch.branchName}
          </p>
          <p className="text-xs text-white/70 truncate">
            {partner?.name ?? "Partner"}
          </p>
        </div>
      </div>

      {/* ── address + city/area chips ── */}
      <div className="relative space-y-1.5">
        <div className="flex items-start gap-2 text-sm text-white/85">
          <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-white/70" />
          <p className="leading-relaxed">
            {fullAddress || "Address unavailable"}
          </p>
        </div>
        {(branch.city || branch.area) && (
          <div className="flex flex-wrap gap-1.5 pl-6">
            {branch.city && (
              <span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-white/80">
                {branch.city}
              </span>
            )}
            {branch.area && (
              <span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-white/80">
                {branch.area}
              </span>
            )}
          </div>
        )}
      </div>

      {partner?.website && (
        <Link
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
        >
          <Globe className="h-3 w-3" />
          {partner.website.replace(/^https?:\/\//, "")}
        </Link>
      )}

      <BranchActions
        branchName={branch.branchName}
        phone={phone}
        email={email}
        address={fullAddress}
        latitude={latitude}
        longitude={longitude}
        userCoords={userCoords}
      />
    </div>
  );
}
