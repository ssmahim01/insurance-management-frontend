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
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import {
  LayoutDashboard,
  Package,
  Building2,
  Handshake,
  BarChart3,
  Settings,

  User,
  Sun,
  Moon,
  Bell,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/providers/ThemeProvider";
import { AppSidebar, AppSidebarProps } from "./AppSidebar";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        id: "analytics",
        label: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        id: "partners",
        label: "Partners",
        href: "/dashboard/partners",
        icon: Handshake,
      },
      {
        id: "branches",
        label: "Branches",
        href: "/dashboard/branches",
        icon: Building2,
      },
      {
        id: "packages",
        label: "Insurance Packages",
        href: "/dashboard/packages",
        icon: Package,
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        id: "settings",
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
      {
        id: "profile",
        label: "Profile",
        href: "/dashboard/profile",
        icon: User,
      },
    ],
  },
];





interface DashboardHeaderProps {
  pageTitle?: string;
}

export function DashboardHeader({ pageTitle }: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center gap-3 border-b border-gray-200/80 bg-background px-4 dark:border-gray-800">
      <SidebarTrigger className="-ml-1 h-8 w-8 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-colors" />

      <Separator
        orientation="vertical"
        className="bg-gray-200 dark:bg-gray-700"
      />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {pageTitle ?? "Dashboard"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2" id="header-actions" />
      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative hover:bg-muted">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="hover:bg-muted"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </div>
    </header>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: AppSidebarProps["user"];
  onLogout?: () => void;
  pageTitle?: string;
  defaultOpen?: boolean;
}

export function DashboardLayoutWrapper({
  children,
  user,
  pageTitle,
  defaultOpen = true,
}: DashboardLayoutProps) {
  const router = useRouter()
  
  const {logout} = useUser();

    const handleLogout = async () => {
    await logout();
    toast.success("Logout successful")
    router.push("/login")

  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <TooltipProvider>
        <AppSidebar user={user} onLogout={handleLogout} />
        <SidebarInset className="flex flex-col min-h-screen">
          <DashboardHeader pageTitle={pageTitle} />

          <main className="flex-1 overflow-auto bg-gray-50/50 dark:bg-gray-950/50">
            <div className="p-4 md:p-6 lg:p-8">{children}</div>
          </main>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  );
}
