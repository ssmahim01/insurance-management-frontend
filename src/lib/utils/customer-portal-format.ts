export const formatCurrency = (n?: number) =>
  `BDT ${(n ?? 0).toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const formatDate = (iso?: string | Date | null) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

export const formatDateTime = (iso?: string | Date | null) => {
  if (!iso) return "—";
  const d = new Date(iso);
  const datePart = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const timePart = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  return `${datePart} | ${timePart}`;
};

export function formatPlanLabel(planType: string) {
  if (!planType) return "—";
  return planType.charAt(0) + planType.slice(1).toLowerCase().replace(/_/g, " ");
}