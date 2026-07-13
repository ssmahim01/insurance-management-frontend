"use client";

import React from "react";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/providers/ThemeProvider";
import { AppSidebar } from "./AppSidebar";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/redux/features/user/user.api";

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
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        id: "agentLeader",
        label: "Agent Leaders",
        href: "/admin/dashboard/agent-leader",
        icon: Handshake,
      },
      {
        id: "admins",
        label: "Admins",
        href: "/admin/dashboard/admins",
        icon: User,
      },
      {
        id: "agents",
        label: "Agents",
        href: "/admin/dashboard/agents",
        icon: Handshake,
      },
      {
        id: "partners",
        label: "Partners",
        href: "/admin/dashboard/partners",
        icon: Handshake,
      },
      {
        id: "branches",
        label: "Branches",
        href: "/admin/dashboard/branches",
        icon: Building2,
      },
      {
        id: "packages",
        label: "Packages",
        href: "/admin/dashboard/packages",
        icon: Package,
      },
      {
        id: "customers",
        label: "Customers",
        href: "/admin/dashboard/customers",
        icon: Package,
      },
    ],
  },
];

export interface BreadcrumbTrailItem {
  label: string;
  href?: string;
}

interface DashboardHeaderProps {
  /** Backward-compatible single-crumb usage. */
  pageTitle?: string;
  /** Preferred: pass a full trail (e.g. from PageHeader's breadcrumbs shape) for multi-level context. */
  breadcrumbs?: BreadcrumbTrailItem[];
}

export function DashboardHeader({ pageTitle, breadcrumbs }: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme();

  const trail: BreadcrumbTrailItem[] =
    breadcrumbs && breadcrumbs.length > 0
      ? breadcrumbs
      : [{ label: pageTitle ?? "Dashboard" }];

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b border-gray-200/80 bg-background/80 backdrop-blur-sm px-4 dark:border-gray-800">
     <SidebarTrigger className="-ml-1 h-8 w-8 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-colors" />

      <Separator
        orientation="vertical"
        className="h-16 bg-gray-200 dark:bg-gray-700"
      />

      <Breadcrumb>
        <BreadcrumbList>
          {trail.map((crumb, idx) => {
            const isLast = idx === trail.length - 1;
            return (
              <React.Fragment key={`${crumb.label}-${idx}`}>
                <BreadcrumbItem>
                  {isLast || !crumb.href ? (
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {crumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={crumb.href}
                      className="text-sm text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
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

      <div className="ml-auto flex items-center gap-2" id="header-actions" />

      {/* Right Section */}
      <div className="flex items-center gap-1.5 rounded-full border border-gray-200/80 bg-gray-50/60 p-1 dark:border-gray-800 dark:bg-gray-900/40">
        {/* Notifications — UI only for now; no notifications API wired yet */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <Bell className="h-4.5 w-4.5]" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </Button>
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

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-8 w-8 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
        >
          <Sun className="h-4.5 w-4.5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4.5 w-4.5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
        </Button>
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
          <DashboardHeader pageTitle={pageTitle} breadcrumbs={breadcrumbs} />

          <main className="flex-1 overflow-auto bg-gray-50/50 dark:bg-gray-950/50">
            <div className="p-4 md:p-6 lg:p-8">{children}</div>
          </main>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  );
}