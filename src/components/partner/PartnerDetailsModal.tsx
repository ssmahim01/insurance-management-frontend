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
  Phone,
  Mail,
  Globe,
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  Handshake,
  User,
  FileText,
  Stethoscope,
  Pill,
} from "lucide-react";
import { IPartner, PartnerCategory } from "@/types/partner.types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Field({
  icon: Icon,
  label,
  value,
  mono = false,
  isLink = false,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | number | null;
  mono?: boolean;
  isLink?: boolean;
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
        ) : isLink ? (
          <a
            href={String(value)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-violet-600 dark:text-violet-400 hover:underline break-all"
          >
            {String(value).replace(/^https?:\/\//, "")}
          </a>
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

const formatDate = (iso?: string | null, withTime = false) => {
  if (!iso) return null;
  const opts: Intl.DateTimeFormatOptions = withTime
    ? { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }
    : { day: "2-digit", month: "long", year: "numeric" };
  return new Date(iso).toLocaleDateString("en-GB", opts);
};

const CATEGORY_LABELS: Record<PartnerCategory, string> = {
  [PartnerCategory.DIAGNOSTIC_HOSPITAL]: "Diagnostic / Hospital",
  [PartnerCategory.PHARMACEUTICALS]: "Pharmaceuticals",
};

const CATEGORY_ICONS: Record<PartnerCategory, React.ElementType> = {
  [PartnerCategory.DIAGNOSTIC_HOSPITAL]: Stethoscope,
  [PartnerCategory.PHARMACEUTICALS]: Pill,
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface PartnerDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: IPartner;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PartnerDetailsModal({
  open,
  onOpenChange,
  item,
}: PartnerDetailsModalProps) {
  if (!item) return null;

  const createdByName =
    !item.createdBy
      ? null
      : typeof item.createdBy === "string"
      ? item.createdBy
      : (item.createdBy as any)?.name ?? null;

  const CategoryIcon = item.category ? CATEGORY_ICONS[item.category] : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] scrollbar-none overflow-y-auto p-0">

        {/* ── Header ── */}
        <div className="relative bg-linear-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 px-6 pt-8 pb-6 rounded-t-lg">
          <DialogHeader className="sr-only">
            <DialogTitle>Partner Details</DialogTitle>
            <DialogDescription>
              Detailed information for {item.name}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
            {/* Logo / Avatar */}
            {item.logo ? (
              <img
                src={item.logo}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-contain border-4 border-white dark:border-slate-800 shadow-md bg-white p-1 shrink-0"
              />
            ) : (
              <div className="w-20 h-20 rounded-xl bg-linear-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white font-bold text-3xl border-4 border-white dark:border-slate-800 shadow-md shrink-0">
                {item.name?.charAt(0)?.toUpperCase() ?? "P"}
              </div>
            )}

            {/* Name + badges */}
            <div className="text-center sm:text-left flex-1 min-w-0">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white truncate">
                {item.name ?? "—"}
              </h2>
              {item.description && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                  {item.description}
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
                {item.category && CategoryIcon && (
                  <Badge
                    variant="outline"
                    className={
                      item.category === PartnerCategory.DIAGNOSTIC_HOSPITAL
                        ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                        : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
                    }
                  >
                    <CategoryIcon className="w-3 h-3 mr-1" />
                    {CATEGORY_LABELS[item.category]}
                  </Badge>
                )}
                <Badge
                  variant="secondary"
                  className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 border-violet-200 dark:border-violet-800"
                >
                  <Handshake className="w-3 h-3 mr-1" />
                  Partner
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
              <Field icon={Phone}  label="Phone"   value={item.phone} mono />
              <Field icon={Mail}   label="Email"   value={item.email} />
              <Field
                icon={Globe}
                label="Website"
                value={item.website}
                isLink={!!item.website}
              />
              <Field
                icon={CategoryIcon ?? Handshake}
                label="Category"
                value={item.category ? CATEGORY_LABELS[item.category] : null}
              />
            </div>
          </div>

          {item.description && (
            <>
              <Separator />
              <div>
                <SectionTitle>Description</SectionTitle>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Account Details */}
          <div>
            <SectionTitle>Record Details</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {createdByName && (
                <Field icon={User} label="Created By" value={createdByName} />
              )}
              <Field
                icon={CalendarDays}
                label="Added On"
                value={formatDate(item.createdAt)}
              />
              <Field
                icon={Clock}
                label="Last Updated"
                value={formatDate(item.updatedAt)}
              />
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}