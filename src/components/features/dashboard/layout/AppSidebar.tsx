"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavItem } from "./DashboardLayout";
import Image from "next/image";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { IUser } from "@/types/user.types";
import { getDashboardNavigation } from "./navigation";
import { Skeleton } from "@/components/ui/skeleton";

export interface AppSidebarProps {
  user?: IUser | null;
  onLogout?: () => void;
  isLoading?: boolean;
}

function getActiveHref(
  navigation: { items: NavItem[] }[],
  pathname: string,
): string | null {
  let best: string | null = null;

  for (const group of navigation) {
    for (const item of group.items) {
      const isExact = pathname === item.href;
      const isNestedUnder = pathname.startsWith(`${item.href}/`);

      if (isExact || isNestedUnder) {
        if (!best || item.href.length > best.length) {
          best = item.href;
        }
      }
    }
  }

  return best;
}

function NavItemRow({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const Icon = item.icon;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        tooltip={isCollapsed ? item.label : undefined}
        className={cn(
          "group/nav relative gap-3 rounded-xl transition-all duration-200 text-[13.5px]",
          isActive
            ? "bg-emerald-50 text-emerald-700 font-semibold dark:bg-emerald-900/20 dark:text-emerald-400"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100",
        )}
      >
        <Link href={item.href} className="flex items-center gap-3 w-full">
          {isActive && (
            <span className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-emerald-600 dark:bg-emerald-400" />
          )}
          <Icon
            className={cn(
              "h-4 w-4 shrink-0 transition-transform duration-200 group-hover/nav:scale-110",
              isActive
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-gray-500 dark:text-gray-500",
            )}
          />
          <span className="truncate">{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebarSkeleton() {
  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200/80 dark:border-gray-800">
      <SidebarHeader className="border-b mb-3 border-gray-200/80 dark:border-gray-800">
        <div className="ml-2 my-2">
          <Skeleton className="h-12 w-12 rounded-md" />
        </div>
      </SidebarHeader>

      <SidebarContent className="py-3">
        {Array.from({ length: 3 }).map((_, groupIdx) => (
          <SidebarGroup key={groupIdx} className="px-2 py-1">
            <div className="px-2 pb-2">
              <Skeleton className="h-3 w-20" />
            </div>
            <SidebarMenu>
              {Array.from({ length: 4 }).map((_, itemIdx) => (
                <SidebarMenuItem key={itemIdx}>
                  <div className="flex items-center gap-3 px-2 py-2">
                    <Skeleton className="h-4 w-4 rounded shrink-0" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200/80 dark:border-gray-800 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 rounded-xl p-2">
              <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-2.5 w-16" />
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

export function AppSidebar({ user, onLogout, isLoading }: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const pathname = usePathname();
  const navigation = getDashboardNavigation(user?.role);
  const activeHref = getActiveHref(navigation, pathname);

  // Derives the role's dashboard root from the nav config itself (first
  // group's first item) instead of hardcoding "/dashboard", which doesn't
  // exist under any actual role's route tree in this app.
  const dashboardRoot = navigation[0]?.items[0]?.href ?? "";

  if (isLoading) return <AppSidebarSkeleton />;

  const initials =
    user?.name
      ?.trim()
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const roleLabel = user?.role
    ?.replace(/[_-]/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-gray-200/80 dark:border-gray-800"
    >
      {/* ── Header / Logo ── */}
      <SidebarHeader className="border-b mb-3 border-gray-200/80 dark:border-gray-800">
        <Link href={dashboardRoot || "#"} className="flex items-center py-1">
          <Image
            src={"/assets/shurokkha-logo-1.png"}
            alt="Shurokkha Logo"
            width={200}
            height={200}
            quality={90}
            className={cn(
              "rounded-md object-contain ml-2 transition-all duration-200",
              isCollapsed ? "h-8 w-8" : "h-12 w-12",
            )}
            priority
          />
        </Link>
      </SidebarHeader>

      {/* ── Navigation ── */}
      <SidebarContent className="py-3">
        {navigation.map((group) => (
          <SidebarGroup key={group.label} className="px-2 py-1">
            <SidebarGroupLabel
              className={cn(
                "font-bold uppercase tracking-widest text-[10.5px] text-gray-400 dark:text-gray-500 px-2 pb-1 transition-all duration-200",
                isCollapsed && "opacity-0 h-0 overflow-hidden py-0",
              )}
            >
              {group.label}
            </SidebarGroupLabel>

            <SidebarMenu>
              {group.items.map((item) => (
                <NavItemRow key={item.id} item={item} isActive={item.href === activeHref} />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* ── Footer / User ── */}
      {user && (
        <SidebarFooter className="border-t border-gray-200/80 dark:border-gray-800 p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <SidebarMenuButton
                    size="lg"
                    className={cn(
                      "gap-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                      isCollapsed && "justify-center",
                    )}
                    tooltip={
                      isCollapsed
                        ? `${user.name || "User"} · ${roleLabel ?? "User"}`
                        : undefined
                    }
                  >
                    <Avatar className="h-8 w-8 shrink-0 rounded-lg ring-2 ring-transparent hover:ring-emerald-200 dark:hover:ring-emerald-900 transition-all">
                      <AvatarImage src={user.picture} alt={user.name} />
                      <AvatarFallback className="rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold dark:bg-emerald-900/30 dark:text-emerald-400">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                      <>
                        <div className="min-w-0 flex-1 text-left">
                          <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-50">
                            {user.name || "User"}
                          </p>
                          <p className="truncate text-[11px] text-gray-400 dark:text-gray-500">
                            {user.phone}
                          </p>
                        </div>
                        <ChevronDown className="h-4 w-4 shrink-0 text-gray-400 ml-auto" />
                      </>
                    )}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  side="top"
                  sideOffset={8}
                  className="w-56 rounded-xl border-gray-200/80 dark:border-gray-700/60"
                >
                  <div className="px-3 py-2.5">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                      {user.name || "User"}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {user.phone}
                    </p>
                    {roleLabel && (
                      <span className="mt-1.5 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                        {roleLabel}
                      </span>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 cursor-pointer text-sm">
                    <Link href={`${dashboardRoot}/profile`} className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer text-sm">
                    <Link href={`${dashboardRoot}/settings`} className="flex items-center gap-2">
                      <Settings className="h-3.5 w-3.5" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={onLogout}
                    className="gap-2 cursor-pointer text-sm text-red-600 focus:text-red-600 dark:text-red-400"
                  >
                    <LogOut className="h-3.5 w-3.5" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}

      <SidebarRail />
    </Sidebar>
  );
}