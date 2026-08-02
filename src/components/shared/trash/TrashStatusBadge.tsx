import { IsActive } from "@/types/user.types";

interface TrashStatusBadgeProps {
  status: IsActive | undefined;
}

const STATUS_META: Record<string, { label: string; className: string }> = {
  [IsActive.ACTIVE]: {
    label: "Active",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  [IsActive.INACTIVE]: {
    label: "Inactive",
    className: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  },
  [IsActive.CREATED]: {
    label: "Created",
    className: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  },
  [IsActive.BLOCKED]: {
    label: "Blocked",
    className: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
};

export function TrashStatusBadge({ status }: TrashStatusBadgeProps) {
  const meta = (status && STATUS_META[status]) || {
    label: "Unknown",
    className: "bg-muted text-muted-foreground",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.className}`}
    >
      {meta.label}
    </span>
  );
}