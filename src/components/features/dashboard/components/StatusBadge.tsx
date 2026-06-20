type StatusVariant = 'active' | 'inactive' | 'pending' | 'error' | 'success';

interface StatusBadgeProps {
  status: StatusVariant | string;
  label?: string;
}

const statusStyles: Record<StatusVariant, { bg: string; text: string; dot: string }> = {
  active: {
    bg: 'bg-green-50 dark:bg-green-950',
    text: 'text-green-700 dark:text-green-200',
    dot: 'bg-green-500',
  },
  inactive: {
    bg: 'bg-gray-50 dark:bg-gray-900',
    text: 'text-gray-700 dark:text-gray-200',
    dot: 'bg-gray-400',
  },
  pending: {
    bg: 'bg-yellow-50 dark:bg-yellow-950',
    text: 'text-yellow-700 dark:text-yellow-200',
    dot: 'bg-yellow-500',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-950',
    text: 'text-red-700 dark:text-red-200',
    dot: 'bg-red-500',
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-950',
    text: 'text-green-700 dark:text-green-200',
    dot: 'bg-green-500',
  },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const variant = (statusStyles[status as StatusVariant] || statusStyles.inactive) as typeof statusStyles.active;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${variant.bg} ${variant.text}`}
    >
      <span className={`w-2 h-2 rounded-full ${variant.dot}`} />
      {label || status}
    </span>
  );
}
