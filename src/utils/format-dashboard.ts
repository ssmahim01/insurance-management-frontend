export const formatCompactNumber = (n: number): string => {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);
};

export const formatDate = (iso?: string): string => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getInitials = (name?: string): string => {
  if (!name?.trim()) return "U";
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Brand palette for charts — navy + cyan/blue, no purple.
export const CHART_COLORS = {
  primary: "#0891b2",   // cyan-600
  secondary: "#2563eb", // blue-600
  navy: "#0f172a",       // slate-900
  muted: "#64748b",      // slate-500
  success: "#10b981",    // emerald-500 (kept only for status semantics, not brand accents)
  warning: "#f59e0b",
  danger: "#ef4444",
};

export const STATUS_CHART_COLORS: Record<string, string> = {
  ACTIVE: "#0891b2",
  PENDING: "#f59e0b",
  EXPIRED: "#64748b",
  CANCELLED: "#ef4444",
  PAID: "#0891b2",
  UNPAID: "#64748b",
  FAILED: "#ef4444",
  REFUNDED: "#2563eb",
};