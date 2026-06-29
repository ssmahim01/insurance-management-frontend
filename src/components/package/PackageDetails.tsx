

"use client";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Package, ShieldCheck, ShieldOff, CalendarDays, DollarSign,
  CheckCircle2, XCircle, BarChart3, Users, TrendingUp, Clock,
  Banknote,
} from "lucide-react";
import { IInsurancePackage, PlanType } from "@/types/package.types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PLAN_LABELS: Record<PlanType, string> = {
  [PlanType.MONTHLY]:     "Monthly",
  [PlanType.QUARTERLY]:   "Quarterly",
  [PlanType.HALF_YEARLY]: "Half-Yearly",
  [PlanType.YEARLY]:      "Yearly",
  [PlanType.LIFETIME]:    "Lifetime",
};

const PLAN_COLORS: Record<PlanType, string> = {
  [PlanType.MONTHLY]:     "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  [PlanType.QUARTERLY]:   "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-900/20 dark:text-violet-300",
  [PlanType.HALF_YEARLY]: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300",
  [PlanType.YEARLY]:      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300",
  [PlanType.LIFETIME]:    "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-300",
};

const formatCurrency = (v?: number) =>
  v !== undefined && v !== null ? `৳ ${Number(v).toLocaleString()}` : "—";

const formatDate = (iso?: Date | string) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) : "—";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-3">{children}</p>;
}

function StatBox({ label, value, icon: Icon, color }: {
  label: string; value: string | number; icon: React.ElementType; color: string;
}) {
  return (
    <div className={`rounded-lg border p-3 ${color}`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-3.5 h-3.5 opacity-70" />
        <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">{label}</p>
      </div>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface PackageDetailsModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  item: IInsurancePackage;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PackageDetailsModal({ open, onOpenChange, item }: PackageDetailsModalProps) {
  if (!item) return null;

  const analytics = (item as any).analytics;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0">

        {/* ── Header ── */}
        <div className="relative bg-slate-50 dark:bg-slate-800/30 px-6 pt-8 pb-6 rounded-t-lg border-b border-slate-200 dark:border-slate-700">
          <DialogHeader className="sr-only">
            <DialogTitle>Package Details</DialogTitle>
            <DialogDescription>Details for {item.name}</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-3xl border-4 border-white dark:border-slate-800 shadow-md shrink-0">
              <Package className="w-9 h-9 text-white" />
            </div>

            <div className="text-center sm:text-left flex-1 min-w-0">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white truncate">{item.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-mono mt-0.5">{item.slug}</p>
              <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant="outline" className={item.isActive
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
                  : "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                }>
                  {item.isActive ? <ShieldCheck className="w-3 h-3 mr-1" /> : <ShieldOff className="w-3 h-3 mr-1" />}
                  {item.isActive ? "Active" : "Inactive"}
                </Badge>
                <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                  <Banknote className="w-3 h-3 mr-1" />
                  Coverage: {formatCurrency(item.coverageAmount)}
                </Badge>
                <Badge variant="outline" className="border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                  {item.plans?.length ?? 0} Plan{(item.plans?.length ?? 0) !== 1 ? "s" : ""}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-5 space-y-6">

          {/* Description */}
          <div>
            <SectionTitle>Description</SectionTitle>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item.description}</p>
          </div>

          <Separator />

          {/* Analytics */}
          {analytics && (
            <>
              <div>
                <SectionTitle>Analytics</SectionTitle>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <StatBox label="Subscriptions" value={analytics.totalSubscriptions ?? 0}  icon={Users}     color="border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-900/20 dark:text-violet-300" />
                  <StatBox label="Revenue"        value={formatCurrency(analytics.totalRevenue)}            icon={DollarSign} color="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300" />
                  <StatBox label="Active Subs"    value={analytics.activeSubscriptions  ?? analytics.active   ?? 0} icon={TrendingUp} color="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300" />
                  <StatBox label="Pending Subs"   value={analytics.pendingSubscriptions ?? analytics.pending  ?? 0} icon={Clock}      color="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300" />
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Plans */}
          <div>
            <SectionTitle>Plans ({item.plans?.length ?? 0})</SectionTitle>
            <div className="space-y-3">
              {item.plans?.map((plan, idx) => (
                <div key={idx} className={`rounded-lg border p-4 ${PLAN_COLORS[plan.type]}`}>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className={PLAN_COLORS[plan.type]}>
                      {PLAN_LABELS[plan.type]}
                    </Badge>
                    <span className="text-xs opacity-70">{plan.durationInMonths} month{plan.durationInMonths !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="flex items-end gap-3">
                    {plan.discountPrice > 0 && plan.discountPrice < plan.regularPrice ? (
                      <>
                        <p className="text-xl font-bold">{formatCurrency(plan.discountPrice)}</p>
                        <p className="text-sm line-through opacity-50 mb-0.5">{formatCurrency(plan.regularPrice)}</p>
                        <Badge className="mb-0.5 text-[10px]">
                          {Math.round(((plan.regularPrice - plan.discountPrice) / plan.regularPrice) * 100)}% OFF
                        </Badge>
                      </>
                    ) : (
                      <p className="text-xl font-bold">{formatCurrency(plan.regularPrice)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Benefits */}
          {item.benefits?.length > 0 && (
            <>
              <div>
                <SectionTitle>Benefits ({item.benefits.length})</SectionTitle>
                <ul className="space-y-1.5">
                  {item.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <Separator />
            </>
          )}

          {/* Exclusions */}
          {item.exclusions?.length > 0 && (
            <>
              <div>
                <SectionTitle>Exclusions ({item.exclusions.length})</SectionTitle>
                <ul className="space-y-1.5">
                  {item.exclusions.map((exclusion, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      {exclusion}
                    </li>
                  ))}
                </ul>
              </div>
              <Separator />
            </>
          )}

          {/* Metadata */}
          <div>
            <SectionTitle>Package Details</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Created</p>
                  <p className="text-sm text-slate-800 dark:text-slate-200">{formatDate(item.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Last Updated</p>
                  <p className="text-sm text-slate-800 dark:text-slate-200">{formatDate(item.updatedAt)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Coverage Amount</p>
                  <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">{formatCurrency(item.coverageAmount)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Total Plans</p>
                  <p className="text-sm text-slate-800 dark:text-slate-200">{item.plans?.length ?? 0}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}