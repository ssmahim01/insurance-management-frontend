"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetMeQuery } from "@/redux/features/user/user.api";

interface BackToDashboardSectionProps {
  href?: string;
  label?: string;
  className?: string;
}

export function BackToDashboardSection({
  href = "/customer/dashboard",
  label = "Back to Dashboard",
  className,
}: BackToDashboardSectionProps) {
  const { data } = useGetMeQuery();
  const role = data?.data?.role;

  if (role !== "CUSTOMER") return null;

  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "group flex w-full items-center gap-2.5 rounded border border-border my-5",
        "dark:bg-slate-950 px-4 py-3",
        "text-gray-800 dark:text-gray-300 font-bold",
        "transition-all duration-250 ease-out",
        "border-indigo-300 dark:hover:border-indigo-800",
        "bg-indigo-50 dark:hover:bg-indigo-950/30",
        "text-indigo-700 dark:hover:text-indigo-400",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <ArrowLeft className="h-4 w-4 shrink-0 transition-transform duration-250 ease-out group-hover:-translate-x-0.5" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}