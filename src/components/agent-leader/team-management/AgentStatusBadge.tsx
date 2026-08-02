'use client';

import { Badge } from '@/components/ui/badge';
import { IsActive } from '@/types/user.types';

interface AgentStatusBadgeProps {
  status: IsActive | undefined;
}

export function AgentStatusBadge({ status }: AgentStatusBadgeProps) {
 const variants: Record<
  string,
  {
    className: string;
    label: string;
  }
> = {
  [IsActive.ACTIVE]: {
    label: "Active",
    className:
      "bg-emerald-100 text-emerald-700 border border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-800",
  },

  [IsActive.INACTIVE]: {
    label: "Inactive",
    className:
      "bg-amber-100 text-amber-700 border border-amber-300 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-800",
  },

  [IsActive.CREATED]: {
    label: "Created",
    className:
      "bg-slate-100 text-slate-700 border border-slate-300 dark:bg-slate-500/15 dark:text-slate-400 dark:border-slate-800",
  },

  [IsActive.BLOCKED]: {
    label: "Blocked",
    className:
      "bg-rose-100 text-rose-700 border border-rose-300 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-800",
  },
};

  const config =
  variants[status || IsActive.INACTIVE];

return (
  <Badge
    className={`rounded-full px-3 py-1 font-semibold tracking-wide ${config.className}`}
  >
    {config.label}
  </Badge>
);
}
