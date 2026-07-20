"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, Power } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { useUser } from "@/context/UserContext";

interface CustomerPortalHeaderProps {
  backHref?: string;
  backLabel?: string;
}

export function CustomerPortalHeader({ backHref, backLabel = "Back to Dashboard" }: CustomerPortalHeaderProps) {
  const { data: me } = useGetMeQuery();
  const { logout } = useUser();
  const router = useRouter();
  const user = me?.data;

  const handleLogout = async () => {
    await logout();
    toast.success("Logout successful");
    router.push("/login");
  };

  return (
    <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link href="/customer/dashboard" className="flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-full bg-linear-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
            {user?.name?.charAt(0)?.toUpperCase() ?? "C"}
          </div>
          <span className="text-xl font-extrabold text-indigo-700 dark:text-indigo-400 tracking-tight">
            YourBrand
          </span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-full pl-1 pr-2.5 py-1 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors duration-200">
            <div className="text-right leading-tight hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{user?.name ?? "—"}</p>
              <p className="text-xs text-slate-400">{user?.phone ?? ""}</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Power className="h-4 w-4" />
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600 gap-2 cursor-pointer"
            >
              <Power className="h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {backHref && (
        <div className="bg-slate-100/80 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" /> {backLabel}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}