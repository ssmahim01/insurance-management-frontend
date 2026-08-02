"use client";

import Image from "next/image";
import { Edit2, Eye, PackageCheck, Trash2, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IsActive, IUser } from "@/types/user.types";

const STATUS_LABELS: Record<IsActive, string> = {
  [IsActive.ACTIVE]: "Active",
  [IsActive.INACTIVE]: "Inactive",
  [IsActive.CREATED]: "Created",
  [IsActive.BLOCKED]: "Blocked",
  [IsActive.ALL]: "All",
};

const STATUS_STYLES: Record<IsActive, string> = {
  [IsActive.ACTIVE]:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
  [IsActive.INACTIVE]:
    "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
  [IsActive.CREATED]:
    "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
  [IsActive.BLOCKED]:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400",
  [IsActive.ALL]:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400",
};

const STATUS_DOT: Record<IsActive, string> = {
  [IsActive.ACTIVE]: "bg-emerald-500",
  [IsActive.INACTIVE]: "bg-slate-400",
  [IsActive.CREATED]: "bg-slate-400",
  [IsActive.BLOCKED]: "bg-red-500",
  [IsActive.ALL]: "bg-slate-500",
};

const GENDER_LABELS: Record<string, string> = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
};

const formatDate = (iso?: string) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

interface CustomerCardProps {
  customer: IUser;
  /** Show a "Created By" row with the agent's name — used on agent-leader's page. */
  showAgentColumn?: boolean;
  getAgentName?: (c: IUser) => string;
  onViewDetails: (c: IUser) => void;
  onViewSubscriptions: (c: IUser) => void;
  onEdit: (c: IUser) => void;
  /** Omit to hide the delete action (e.g. agent's own customer list). */
  onDelete?: (c: IUser) => void;
}

export function CustomerCard({
  customer,
  showAgentColumn = false,
  getAgentName,
  onViewDetails,
  onViewSubscriptions,
  onEdit,
  onDelete,
}: CustomerCardProps) {
  const status = customer.isActive ?? IsActive.INACTIVE;

  return (
    <div className="group flex flex-col rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-1 hover:ring-emerald-200 dark:hover:ring-emerald-900 overflow-hidden">
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-3 p-4 pb-3">
        <div className="flex items-center gap-3 min-w-0">
          {customer.picture ? (
            <Image
              src={customer.picture}
              width={200}
              height={200}
              quality={90}
              alt={customer.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 shrink-0"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-linear-to-br from-emerald-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
              {customer.name?.charAt(0)?.toUpperCase() ?? "C"}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-semibold text-slate-900 dark:text-white truncate">
              {customer.name ?? "—"}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
              {customer.phone ?? "—"}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={`shrink-0 ${STATUS_STYLES[status] ?? STATUS_STYLES[IsActive.INACTIVE]}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full mr-1.5 inline-block ${STATUS_DOT[status] ?? STATUS_DOT[IsActive.INACTIVE]}`}
          />
          {STATUS_LABELS[status] ?? "Unknown"}
        </Badge>
      </div>

      {/* ── Details ── */}
      <div className="grid grid-cols-2 gap-y-2 gap-x-3 px-4 pb-4 text-sm">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Gender
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            {customer.gender ? (
              GENDER_LABELS[customer.gender]
            ) : (
              <span className="text-slate-300 dark:text-slate-600 italic text-xs">—</span>
            )}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            NID
          </p>
          <p className="text-slate-700 dark:text-slate-300 font-mono truncate">
            {customer.nid ?? (
              <span className="text-slate-300 dark:text-slate-600 italic text-xs">—</span>
            )}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Joined
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            {formatDate(customer.createdAt)}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Last Login
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            {customer.lastLoginAt ? (
              formatDate(customer.lastLoginAt)
            ) : (
              <span className="text-slate-300 dark:text-slate-600 italic text-xs">Never</span>
            )}
          </p>
        </div>

        {showAgentColumn && getAgentName && (
          <div className="col-span-2 pt-1 border-t border-slate-100 dark:border-slate-800 mt-1">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2">
              <UserCog className="w-3.5 h-3.5 shrink-0" />
              {getAgentName(customer)}
            </span>
          </div>
        )}
      </div>

      {/* ── Actions ── */}
      <div className="mt-auto flex items-center gap-1.5 border-t border-slate-100 dark:border-slate-800 px-3 py-2.5 bg-slate-50/60 dark:bg-slate-800/30">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 active:scale-95"
          title="View details"
          onClick={() => onViewDetails(customer)}
        >
          <Eye className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 active:scale-95"
          title="View subscriptions"
          onClick={() => onViewSubscriptions(customer)}
        >
          <PackageCheck className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 active:scale-95"
          title="Edit customer"
          onClick={() => onEdit(customer)}
        >
          <Edit2 className="w-3.5 h-3.5" />
        </Button>
        {onDelete && (
          <Button
            variant="destructive"
            size="icon"
            className="h-8 w-8 ml-auto transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 active:scale-95"
            title="Delete customer"
            onClick={() => onDelete(customer)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}

export function CustomerCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 p-4 pb-3">
        <Skeleton className="w-11 h-11 rounded-full shrink-0" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 pb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
      <div className="flex gap-1.5 border-t border-slate-100 dark:border-slate-800 px-3 py-2.5">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
}