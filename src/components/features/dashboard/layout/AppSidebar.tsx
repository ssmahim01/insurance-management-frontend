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

function NavItemRow({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const isActive =
    item.href === "/dashboard"
      ? pathname === item.href
      : pathname.startsWith(item.href);

  const Icon = item.icon;

  const content = (
    <SidebarMenuButton
      isActive={isActive}
      tooltip={isCollapsed ? item.label : undefined}
      className={cn(
        "gap-3 rounded-lg transition-all duration-150 text-base",
        isActive
          ? "bg-emerald-50 text-emerald-700 font-semibold dark:bg-emerald-900/20 dark:text-emerald-400"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100",
      )}
    >
      <Link href={item.href} className="flex items-center gap-3 w-full">
        <Icon
          className={cn(
            "h-4 w-4 shrink-0",
            isActive
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-gray-500 dark:text-gray-500",
          )}
        />
        <span>{item.label}</span>
      </Link>
    </SidebarMenuButton>
  );

  return <SidebarMenuItem>{content}</SidebarMenuItem>;
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
  const navigation = getDashboardNavigation(user?.role);

  if (isLoading) return <AppSidebarSkeleton />;

  return (

    <Sidebar
      collapsible="icon"
      className="border-r border-gray-200/80 dark:border-gray-800"
    >
      {/* ── Header / Logo ── */}
      <SidebarHeader className="border-b mb-3 border-gray-200/80 dark:border-gray-800">
        <Link href="/dashboard">
          <Image
            src={"/assets/shurokkha-logo-1.png"}
            alt="Shurokkha Logo"
            width={200}
            height={200}
            quality={90}
            className=" h-12 w-12 rounded-md object-center ml-2"
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
                "font-bold uppercase tracking-widest px-2 pb-1 transition-all duration-200",
                isCollapsed && "opacity-0 h-0 overflow-hidden py-0",
              )}
            >
              {group.label}
            </SidebarGroupLabel>

            <SidebarMenu>
              {group.items.map((item) => (
                <NavItemRow key={item.id} item={item} />
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
                        ? `${user.name} · ${user.role ?? "User"}`
                        : undefined
                    }
                  >
                    <Avatar className="h-8 w-8 shrink-0 rounded-lg">
                      <AvatarImage src={user.picture} alt={user.name} />
                      <AvatarFallback className="rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold dark:bg-emerald-900/30 dark:text-emerald-400">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                      <>
                        <div className="min-w-0 flex-1 text-left">
                          <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-50">
                            {user.name}
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
                  className="w-52 rounded-xl border-gray-200/80 dark:border-gray-700/60"
                >
                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {user.phone}
                    </p>
                    {user.role && (
                      <p className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        {user.role
                          .replace(/[_-]/g, " ")
                          .toLowerCase()
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </p>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 cursor-pointer text-sm">
                    <User className="h-3.5 w-3.5" />
                    <Link href="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer text-sm">
                    <Settings className="h-3.5 w-3.5" />
                    <Link href="/dashboard/settings">Settings</Link>
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
