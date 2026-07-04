import { Badge } from "@/components/ui/badge";
import { PaymentStatus } from "@/types/subscription.types";

interface PaymentStatusBadgeProps {
  status: PaymentStatus | undefined;
}

const STYLES: Record<string, string> = {
  PAID: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
  COMPLETED: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
  UNPAID: "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
  FAILED: "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400",
  REFUNDED: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
};

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const resolved = status ?? PaymentStatus.UNPAID;
  return (
    <Badge variant="outline" className={STYLES[resolved] ?? STYLES.UNPAID}>
      {resolved}
    </Badge>
  );
}