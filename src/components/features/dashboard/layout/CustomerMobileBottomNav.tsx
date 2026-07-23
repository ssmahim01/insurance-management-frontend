"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseMedical, Home, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
}

const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  {
    id: "doctor-call",
    label: "Doctor Call",
    href: "/customer/dashboard/consultants",
    icon: BriefcaseMedical,
  },
  {
    id: "home",
    label: "Home",
    href: "/customer/dashboard",
    icon: Home,
  },
  {
    id: "profile",
    label: "Profile",
    href: "/customer/dashboard/profile",
    icon: User,
  },
];

function getActiveHref(pathname: string): string | null {
  let best: string | null = null;

  for (const item of BOTTOM_NAV_ITEMS) {
    const isExact = pathname === item.href;
    const isNestedUnder = pathname.startsWith(`${item.href}/`);

    if (isExact || isNestedUnder) {
      if (!best || item.href.length > best.length) {
        best = item.href;
      }
    }
  }

  return best;
}

export function CustomerMobileBottomNav() {
  const pathname = usePathname();
  const activeHref = getActiveHref(pathname);

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "sm:hidden fixed inset-x-0 bottom-0 z-50 w-full",
        "border-t border-gray-200/80 dark:border-gray-800",
        "bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm",
        "shadow-[0_-2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_-2px_12px_rgba(0,0,0,0.3)]",
        "pb-[env(safe-area-inset-bottom)]",
      )}
    >
      <ul className="flex items-stretch justify-around">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const isActive = item.href === activeHref;
          const Icon = item.icon;

          return (
            <li key={item.id} className="flex-1">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex flex-col items-center gap-1 py-2.5 px-1",
                  "transition-colors duration-200 ease-out",
                )}
              >
                {/* active indicator bar */}
                <span
                  className={cn(
                    "absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full",
                    "bg-indigo-500 transition-opacity duration-200",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                />

                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-transform duration-200",
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 scale-105"
                      : "text-gray-400 dark:text-gray-500",
                  )}
                />

                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-wide truncate max-w-full",
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-400 dark:text-gray-500",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
