"use client";

import React from "react";
import {
  Eye, Edit2, FileText, Calendar, Paperclip, Hash, MessageSquareText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IClaim, ClaimStatus } from "@/types/claim.types";
import { getNestedName } from "@/lib/utils/format-subscription";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatDate = (iso?: string | Date | null) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
};

const getSubscriptionLabel = (subscription: IClaim["subscription"]) => {
  if (!subscription) return { title: "—", sub: null };
  if (typeof subscription === "string") return { title: subscription, sub: null };

  const packageTitle = getNestedName(subscription?.package as any);
  if (packageTitle) {
    return { title: packageTitle, sub: subscription.subscriptionId ?? subscription._id };
  }
  return { title: subscription.subscriptionId ?? subscription._id, sub: null };
};

type BadgeTone = "green" | "amber" | "slate" | "red" | "blue";

const TONE_CLASSES: Record<BadgeTone, string> = {
  green: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
  amber: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  slate: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
  red: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
  blue: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
};

const STATUS_TONE: Record<ClaimStatus, BadgeTone> = {
  [ClaimStatus.PENDING]: "amber",
  [ClaimStatus.APPROVED]: "green",
  [ClaimStatus.REJECTED]: "red",
  [ClaimStatus.ALL]: "slate",
};

function Pill({ tone, children }: { tone: BadgeTone; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${TONE_CLASSES[tone]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${tone === "green" ? "bg-green-500" : tone === "amber" ? "bg-amber-500" : tone === "red" ? "bg-red-500" : tone === "blue" ? "bg-blue-500" : "bg-slate-400"}`} />
      {children}
    </span>
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function ClaimCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl ring-1 ring-black/5 dark:ring-white/10 shadow-sm p-4 sm:p-5">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-11 h-11 rounded-full shrink-0" />
        <div className="min-w-0 flex-1">
          <Skeleton className="h-4 w-32 mb-1.5" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="space-y-2 py-3 border-y border-slate-100 dark:border-slate-800">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <div className="flex justify-between items-center mt-3">
        <Skeleton className="h-3 w-24" />
        <div className="flex gap-1.5">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────────

interface ClaimCardProps {
  claim: IClaim;
  onViewDetails: (claim: IClaim) => void;
  onEdit?: (claim: IClaim) => void;
}

function ClaimCard({ claim, onViewDetails, onEdit }: ClaimCardProps) {
  const { title: packageOrSubLabel, sub: subIdLabel } = getSubscriptionLabel(claim.subscription);
  const attachmentsCount = claim.attachments?.length ?? 0;
  const canEdit = onEdit && claim.status !== ClaimStatus.APPROVED;

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl ring-1 ring-black/5 dark:ring-white/10 shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-5">
      {/* Header: package title + status */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-full bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center shrink-0 shadow-sm ring-1 ring-black/5">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-slate-900 dark:text-white truncate">
              {packageOrSubLabel}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {claim.serviceTitle}
              {/* {subIdLabel && (
                <span className="text-slate-400"> · #{subIdLabel.slice?.(-6)}</span>
              )} */}
            </p>
          </div>
        </div>
        <Pill tone={STATUS_TONE[claim.status] ?? "slate"}>{claim.status}</Pill>
      </div>

      {/* Description */}
      <div className="py-3 border-y border-slate-100 dark:border-slate-800">
        <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
          {claim.description}
        </p>

        {claim.status !== ClaimStatus.PENDING && claim.adminNote && (
          <p className="flex items-start gap-1 mt-2 text-xs text-slate-500 dark:text-slate-400">
            <MessageSquareText className="w-3 h-3 mt-0.5 shrink-0" />
            <span className="line-clamp-2">{claim.adminNote}</span>
          </p>
        )}
      </div>

      {/* Footer: meta + actions */}
      <div className="flex items-center justify-between mt-3 gap-2">
        <div className="flex items-center gap-3 text-[11px] text-slate-400 min-w-0">
          <span className="flex items-center gap-1 shrink-0">
            <Calendar className="w-3 h-3" /> {formatDate(claim.createdAt)}
          </span>
          {attachmentsCount > 0 && (
            <span className="flex items-center gap-1 shrink-0">
              <Paperclip className="w-3 h-3" /> {attachmentsCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-slate-500 dark:text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
            title="View details"
            onClick={() => onViewDetails(claim)}
          >
            <Eye className="w-3.5 h-3.5" />
          </Button>
          {canEdit && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-slate-500 dark:text-slate-400 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400"
              title="Edit claim"
              onClick={() => onEdit(claim)}
            >
              <Edit2 className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Grid ────────────────────────────────────────────────────────────────────

interface ClaimCardsProps {
  claims: IClaim[];
  isLoading: boolean;
  onViewDetails: (claim: IClaim) => void;
  onEdit?: (claim: IClaim) => void;
}

export function ClaimCards({ claims, isLoading, onViewDetails, onEdit }: ClaimCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ClaimCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {claims.map((claim) => (
        <ClaimCard
          key={claim._id}
          claim={claim}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}