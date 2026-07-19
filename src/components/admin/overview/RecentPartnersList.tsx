"use client";

import { format } from "date-fns";
import { Building2, Phone, Mail } from "lucide-react";
import { IRecentPartner } from "@/types/dashboard";

interface RecentPartnersListProps {
  items: IRecentPartner[];
}

export function RecentPartnersList({ items }: RecentPartnersListProps) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gray-100 dark:bg-slate-950 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Recent Partners
        </h3>
        <span className="text-xs text-slate-400">{items.length} shown</span>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
          <Building2 className="w-9 h-9 mb-3 opacity-30" />
          <p className="text-sm font-medium">No partners yet</p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {items.map((partner) => (
            <li
              key={partner._id}
              className="flex items-center gap-3 px-5 py-3.5 transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-800/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                {partner.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Building2 className="h-4.5 w-4.5 text-slate-400" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {partner.name}
                </p>
                <div className="flex items-center gap-3 mt-0.5">
                  {partner.phone && (
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Phone className="h-3 w-3" />
                      {partner.phone}
                    </span>
                  )}
                  {partner.email && (
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 truncate">
                      <Mail className="h-3 w-3 shrink-0" />
                      <span className="truncate">{partner.email}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    partner.isActive
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${partner.isActive ? "bg-emerald-500" : "bg-slate-400"}`}
                  />
                  {partner.isActive ? "Active" : "Inactive"}
                </span>
                <span className="text-[11px] text-slate-400">
                  {format(new Date(partner.createdAt), "MMM dd, yyyy")}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
