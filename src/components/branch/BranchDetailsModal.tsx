// BranchDetailsModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Handshake,
  CheckCircle2,
  XCircle,
  Navigation,
  Hash,
} from "lucide-react";
import { IPartnerBranch } from "@/types/branch.types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Field({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | number | null;
  mono?: boolean;
}) {
  const isEmpty = value === undefined || value === null || value === "";
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
          {label}
        </p>
        {isEmpty ? (
          <p className="text-sm text-slate-400 italic">Not provided</p>
        ) : (
          <p
            className={`text-sm text-slate-800 dark:text-slate-200 wrap-break-word ${
              mono ? "font-mono" : ""
            }`}
          >
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-3">
      {children}
    </p>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface BranchDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: IPartnerBranch;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BranchDetailsModal({
  open,
  onOpenChange,
  item,
}: BranchDetailsModalProps) {
  if (!item) return null;

  const partnerName =
    typeof item.partner === "string" ? item.partner : (item.partner as any)?.name ?? null;

  const [lng, lat] = item.location?.coordinates ?? [undefined, undefined];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] scrollbar-none overflow-y-auto p-0">

        {/* ── Header ── */}
        <div className="relative bg-linear-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 px-6 pt-8 pb-6 rounded-t-lg">
          <DialogHeader className="sr-only">
            <DialogTitle>Branch Details</DialogTitle>
            <DialogDescription>
              Detailed information for {item.branchName}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
            {/* Icon Avatar */}
            <div className="w-20 h-20 rounded-xl bg-linear-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white shadow-md border-4 border-white dark:border-slate-800 shrink-0">
              <Building2 className="w-9 h-9" />
            </div>

            {/* Name + badges */}
            <div className="text-center sm:text-left flex-1 min-w-0">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white truncate">
                {item.branchName ?? "—"}
              </h2>
              {partnerName && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                  {partnerName}
                </p>
              )}
              <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                {item.isActive ? (
                  <Badge
                    variant="outline"
                    className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                  >
                    <XCircle className="w-3 h-3 mr-1" />
                    Inactive
                  </Badge>
                )}
                <Badge
                  variant="secondary"
                  className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 border-violet-200 dark:border-violet-800"
                >
                  <Handshake className="w-3 h-3 mr-1" />
                  Branch
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-5 space-y-6">

          {/* Contact */}
          <div>
            <SectionTitle>Contact Information</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field icon={Phone} label="Phone" value={item.phone} mono />
              <Field icon={Mail}  label="Email" value={item.email} />
            </div>
          </div>

          <Separator />

          {/* Address */}
          <div>
            <SectionTitle>Address</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field icon={MapPin} label="Address"     value={item.address} />
              <Field icon={MapPin} label="City"        value={item.city} />
              <Field icon={MapPin} label="Area"        value={item.area} />
              <Field icon={Hash}   label="Postal Code" value={item.postalCode} />
              <Field
                icon={Navigation}
                label="Latitude"
                value={lat !== undefined ? String(lat) : undefined}
                mono
              />
              <Field
                icon={Navigation}
                label="Longitude"
                value={lng !== undefined ? String(lng) : undefined}
                mono
              />
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}