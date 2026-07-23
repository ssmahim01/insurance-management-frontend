"use client";

import { useState } from "react";
import { Building2, Globe, MapPin, Navigation2 } from "lucide-react";
import { IPartnerBranch } from "@/types/branch.types";
import { BranchActions } from "./BranchActions";
import { formatDistance } from "@/utils/geo-distance";
import Link from "next/link";
import { CATEGORY_LABELS } from "./NearbyBranchesFilters";
import { PartnerCategory } from "@/types/partner.types";

interface PopulatedPartner {
  _id?: string;
  name: string;
  logo?: string;
  phone?: string;
   category?: PartnerCategory;
  description?: string;   
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
      className={`group relative overflow-hidden rounded-2xl bg-linear-to-br ${gradient} shadow-md shadow-black/10 ring-1 ring-white/10 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-black/25 hover:ring-white/30 hover:scale-[1.008] focus-within:ring-2 focus-within:ring-white/50`}
    >
      {/* decorative glows */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl transition-transform duration-500 group-hover:scale-125" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-white/5 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
      {/* animated sheen sweep on hover */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      {/* animated border glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-2 ring-white/30 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
        {/* ── logo ── */}
        <div className="flex shrink-0 items-center gap-4 sm:block">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-white/40 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:rotate-1 sm:h-20 sm:w-20">
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
                <Building2 className="h-7 w-7 text-slate-400 sm:h-8 sm:w-8" />
              </div>
            )}
          </div>

          {/* status + distance badges sit next to logo on mobile only */}
          <div className="flex flex-col gap-1.5 sm:hidden">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white ring-1 ring-white/20">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  branch.isActive ? "bg-cyan-300 animate-pulse" : "bg-white/40"
                }`}
              />
              {branch.isActive ? "Active" : "Inactive"}
            </span>
            {typeof distanceKm === "number" && (
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white/15 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-white ring-1 ring-white/20">
                <Navigation2 className="h-3 w-3" />
                {formatDistance(distanceKm)}
              </span>
            )}
          </div>
        </div>

        {/* ── main info ── */}
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-lg font-bold text-white transition-transform duration-300 group-hover:translate-x-0.5">
                {partner?.name ?? "Partner"}
              </p>
              {partner?.category && (
                <span className="mt-1 inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/80">
                  {CATEGORY_LABELS[partner.category]}
                </span>
              )}
              <p className="truncate text-sm text-white/70">
                {branch.branchName}
              </p>
            </div>

            {/* status + distance badges — desktop only, top-right of info column */}
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white ring-1 ring-white/20">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    branch.isActive
                      ? "bg-cyan-300 animate-pulse"
                      : "bg-white/40"
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
          </div>

          <div className="flex items-start gap-2 text-sm text-white/85">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-white/70" />
            <p className="leading-relaxed">
              {fullAddress || "Address unavailable"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pl-6">
            {branch.city && (
              <span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-white/80 transition-colors duration-200 group-hover:bg-white/15">
                {branch.city}
              </span>
            )}
            {branch.area && (
              <span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-white/80 transition-colors duration-200 group-hover:bg-white/15">
                {branch.area}
              </span>
            )}
            {partner?.website && (
              <Link
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-white/70 hover:text-white transition-colors duration-200"
              >
                <Globe className="h-3 w-3" />
                {partner.website.replace(/^https?:\/\//, "")}
              </Link>
            )}
          </div>
        </div>

        {/* ── actions ── */}
        <div className="sm:w-80 sm:shrink-0 sm:border-l sm:border-white/10 sm:pl-5">
          <BranchActions
            branchName={branch.branchName}
            phone={phone}
            address={fullAddress}
            latitude={latitude}
            longitude={longitude}
            userCoords={userCoords}
          />
        </div>
      </div>
    </div>
  );
}
