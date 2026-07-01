'use client';

import { Badge } from '@/components/ui/badge';
import { IsActive } from '@/types/user.types';

interface AgentStatusBadgeProps {
  status: IsActive | undefined;
}

export function AgentStatusBadge({ status }: AgentStatusBadgeProps) {
  const variants: Record<string, { badge: 'default' | 'secondary' | 'destructive'; label: string }> = {
    [IsActive.ACTIVE]: { badge: 'default', label: 'Active' },
    [IsActive.INACTIVE]: { badge: 'secondary', label: 'Inactive' },
    [IsActive.BLOCKED]: { badge: 'destructive', label: 'Blocked' },
  };

  const config = variants[status || ''] || variants[IsActive.INACTIVE];

  return (
    <Badge variant={config.badge} className="font-medium">
      {config.label}
    </Badge>
  );
}
