/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  LayoutDashboard,
  Package,
  Building2,
  Handshake,
  User,
  Sun,
  Moon,
  Bell,
  Clock,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/providers/ThemeProvider";
import { AppSidebar } from "./AppSidebar";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { IUser } from "@/types/user.types";
import { cn } from "@/lib/utils";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

export const dashboardNavigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Management",
    items: [
      { id: "agentLeader", label: "Agent Leaders", href: "/admin/dashboard/agent-leader", icon: Handshake },
      { id: "admins", label: "Admins", href: "/admin/dashboard/admins", icon: User },
      { id: "agents", label: "Agents", href: "/admin/dashboard/agents", icon: Handshake },
      { id: "partners", label: "Partners", href: "/admin/dashboard/partners", icon: Handshake },
      { id: "branches", label: "Branches", href: "/admin/dashboard/branches", icon: Building2 },
      { id: "packages", label: "Packages", href: "/admin/dashboard/packages", icon: Package },
      { id: "customers", label: "Customers", href: "/admin/dashboard/customers", icon: Package },
    ],
  },
];

export interface BreadcrumbTrailItem {
  label: string;
  href?: string;
}

interface DashboardHeaderProps {
  pageTitle?: string;
  breadcrumbs?: BreadcrumbTrailItem[];
  user?: IUser;
  isUserLoading?: boolean;
  onLogout?: () => void;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return "Good Night";
  if (hour < 12) return "Good Morning";
  if (hour < 14) return "Good Noon";
  if (hour < 18) return "Good Afternoon";
  if (hour < 21) return "Good Evening";
  return "Good Night";
}

function formatRole(role?: string) {
  if (!role) return "";
  return role
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Premium live clock chip — mounted client-side only to avoid SSR/CSR mismatch. */
function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setTimeout(() => setNow(new Date()), 100);
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const date = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const offsetMinutes = -now.getTimezoneOffset();
  const offsetHours = offsetMinutes / 60;
  const offsetLabel = `UTC${offsetHours >= 0 ? "+" : ""}${offsetHours}`;

  return (
    <div
      className={cn(
        "hidden md:flex items-center gap-2.5 rounded-full px-3.5 py-1.5",
        "bg-linear-to-r from-emerald-600 via-green-600 to-indigo-700",
        "dark:from-emerald-950/40 dark:via-cyan-950/30 dark:to-blue-950/30",
        "shadow-sm",
        "transition-all duration-300",
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>

      <Clock className="h-3.5 w-3.5 text-emerald-100 dark:text-emerald-400" />

      <div className="flex items-baseline gap-1">
        <span className="text-[13px] font-bold tabular-nums text-gray-100">
          {time}
        </span>
        <span className="text-[11px] font-semibold tabular-nums text-emerald-100 dark:text-emerald-500/90">
          :{seconds}
        </span>
      </div>

      <span className="h-3.5 w-px bg-emerald-200 dark:bg-emerald-800" />

      <span className="text-[11.5px] font-medium text-gray-100 dark:text-gray-400 whitespace-nowrap">
        {date}
      </span>

      <span className="hidden lg:inline text-[10px] font-semibold text-blue-100 dark:text-blue-400/80">
        {offsetLabel}
      </span>
    </div>
  );
}

export function DashboardHeader({
  pageTitle,
  breadcrumbs,
  user,
  isUserLoading,
  onLogout,
}: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme();

  const trail: BreadcrumbTrailItem[] =
    breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs : [{ label: pageTitle ?? "Dashboard" }];

  const firstName = user?.name?.split(" ")[0];
  const initials = user?.name?.substring(0, 2).toUpperCase() || "U";
  const roleLabel = formatRole((user as any)?.role);

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200/80 bg-linear-to-r from-white via-white to-emerald-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-emerald-950/10 backdrop-blur-sm dark:border-gray-800">
      <div className="flex h-16 shrink-0 items-center gap-3 px-4">
        <SidebarTrigger className="-ml-1 h-8 w-8 rounded-lg text-gray-500 hover:bg-emerald-50 hover:text-emerald-700 dark:text-gray-400 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400 transition-colors duration-200" />

        <Separator orientation="vertical" className="h-16 bg-gray-200 dark:bg-gray-700" />

        {/* ── Greeting + breadcrumb ── */}
        <div className="flex flex-col justify-center min-w-0">
          {firstName && (
            <p className="hidden sm:block text-[11.5px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 leading-tight">
              {getGreeting()}, {firstName}
            </p>
          )}
          <Breadcrumb>
            <BreadcrumbList>
              {trail.map((crumb, idx) => {
                const isLast = idx === trail.length - 1;
                return (
                  <React.Fragment key={`${crumb.label}-${idx}`}>
                    <BreadcrumbItem>
                      {isLast || !crumb.href ? (
                        <BreadcrumbPage className="text-[15px] font-semibold text-gray-800 dark:text-gray-200">
                          {crumb.label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          href={crumb.href}
                          className="text-[13.5px] text-gray-400 hover:text-emerald-600 dark:text-gray-500 dark:hover:text-emerald-400 transition-colors"
                        >
                          {crumb.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* ── Page-level action portal (unchanged) ── */}
        <div className="ml-auto flex items-center gap-2" id="header-actions" />

        {/* ── Live clock ── */}
        <LiveClock />

        {/* ── Right cluster ── */}
        <div className="flex items-center gap-1.5 rounded-full border border-gray-200/80 bg-gray-50/60 p-2 dark:border-gray-800 dark:bg-gray-900/40 shadow-sm">
          <DropdownMenu>
            <DropdownMenuTrigger className="relative h-6 w-6 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-gray-900" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 rounded-xl">
              <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Notifications
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="px-3 py-6 text-center text-sm text-gray-400">
                You&apos;re all caught up.
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative h-6 w-6 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <Sun className="h-4.5 w-4.5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4.5 w-4.5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
          </Button>
        </div>

        {/* ── User dropdown (now clickable — shows info + logout) ── */}
        {isUserLoading ? (
          <div className="hidden sm:flex items-center gap-2 pl-1">
            <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
          </div>
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                  "hidden sm:flex items-center gap-2 pl-1 pr-1.5 py-1 rounded-full",
                  "hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors duration-200",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                )}
            >
              <div className="flex flex-col items-end leading-tight">
                  <span className="text-[13.5px] font-semibold text-gray-800 dark:text-gray-100 truncate max-w-32">
                    {user.name}
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium truncate max-w-32">
                    {roleLabel}
                  </span>
                </div>
                <Avatar className="h-9 w-9 ring-2 ring-emerald-100 dark:ring-emerald-900/60">
                  <AvatarImage src={user.picture} alt={user.name} />
                  <AvatarFallback className="bg-linear-to-br from-emerald-500 via-cyan-500 to-blue-600 text-white text-xs font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" sideOffset={10} className="w-64 rounded-xl">
              <div className="flex items-center gap-3 px-3 py-3">
                <Avatar className="h-10 w-10 ring-2 ring-emerald-100 dark:ring-emerald-900/60">
                  <AvatarImage src={user.picture} alt={user.name} />
                  <AvatarFallback className="bg-linear-to-br from-emerald-500 via-cyan-500 to-blue-600 text-white text-sm font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-50">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-gray-400 dark:text-gray-500">
                    {user.phone}
                  </p>
                  {roleLabel && (
                    <span className="mt-1 inline-block rounded-full bg-linear-to-r from-emerald-50 to-blue-50 px-2 py-0.5 text-[10.5px] font-medium text-emerald-700 dark:from-emerald-900/20 dark:to-blue-900/20 dark:text-emerald-400">
                      {roleLabel}
                    </span>
                  )}
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 cursor-pointer text-sm">
                <User className="h-3.5 w-3.5" /> Profile
              </DropdownMenuItem>
              {/* <DropdownMenuItem className="gap-2 cursor-pointer text-sm">
                <Settings className="h-3.5 w-3.5" /> Settings
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onLogout}
                className="gap-2 cursor-pointer text-sm text-red-600 focus:text-red-600 dark:text-red-400"
              >
                <LogOut className="h-3.5 w-3.5" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </header>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
  pageTitle?: string;
  breadcrumbs?: BreadcrumbTrailItem[];
  defaultOpen?: boolean;
}

export function DashboardLayoutWrapper({
  children,
  pageTitle,
  breadcrumbs,
  defaultOpen = true,
}: DashboardLayoutProps) {
  const router = useRouter();
  const { data: user, isLoading } = useGetMeQuery(undefined);
  const { logout } = useUser();

  const handleLogout = async () => {
    await logout();
    toast.success("Logout successful");
    router.push("/login");
  };

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <TooltipProvider>
        <AppSidebar user={user?.data} onLogout={handleLogout} isLoading={isLoading} />
        <SidebarInset className="flex flex-col min-h-screen">
          <DashboardHeader
            pageTitle={pageTitle}
            breadcrumbs={breadcrumbs}
            user={user?.data}
            isUserLoading={isLoading}
            onLogout={handleLogout}
          />

          <main className="flex-1 overflow-auto bg-gray-50/50 dark:bg-gray-950/50">
            <div className="p-4 md:p-6 lg:p-8">{children}</div>
          </main>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  );
}