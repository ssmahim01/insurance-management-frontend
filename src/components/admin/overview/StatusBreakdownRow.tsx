import { CheckCircle2, Clock, XCircle, Ban, ShieldCheck, ShieldAlert } from "lucide-react";
import { IDashboardSummary } from "@/types/dashboard";
import { formatCurrency } from "@/lib/utils/format-subscription";

interface StatusChipProps {
  label: string;
  value: number;
  icon: typeof CheckCircle2;
  tone: "success" | "warning" | "muted" | "danger";
}

const TONE_STYLES: Record<StatusChipProps["tone"], string> = {
  success: "bg-cyan-600/10 text-cyan-700 dark:text-cyan-400",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  muted: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  danger: "bg-red-500/10 text-red-600 dark:text-red-400",
};

function StatusChip({ label, value, icon: Icon, tone }: StatusChipProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border p-3.5 transition-colors duration-200 hover:bg-muted/30">
      <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${TONE_STYLES[tone]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground truncate">{label}</p>
        <p className="text-lg font-bold text-foreground tabular-nums">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}

interface StatusBreakdownRowProps {
  summary: IDashboardSummary;
}

export function StatusBreakdownRow({ summary }: StatusBreakdownRowProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <StatusChip label="Active" value={summary.activeSubscriptions} icon={CheckCircle2} tone="success" />
      <StatusChip label="Pending" value={summary.pendingSubscriptions} icon={Clock} tone="warning" />
      <StatusChip label="Expired" value={summary.expiredSubscriptions} icon={XCircle} tone="muted" />
      <StatusChip label="Cancelled" value={summary.cancelledSubscriptions} icon={Ban} tone="danger" />
      <StatusChip label="Paid" value={summary.paidSubscriptions} icon={ShieldCheck} tone="success" />
      <StatusChip label="Unpaid" value={summary.unpaidSubscriptions} icon={ShieldAlert} tone="muted" />
    </div>
  );
}

export function AverageRevenueBanner({ summary }: { summary: IDashboardSummary }) {
  return (
    <div className="rounded-xl border border-border bg-linear-to-r from-slate-900 to-cyan-800 p-5 flex items-center justify-between">
      <div>
        <p className="text-xs text-cyan-100/70 uppercase tracking-wide">Average Revenue per Subscription</p>
        <p className="text-2xl font-bold text-white mt-1 tabular-nums">{formatCurrency(summary.averageRevenue)}</p>
      </div>
    </div>
  );
}