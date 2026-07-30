"use client";

import { format } from "date-fns";
import {
  Handshake,
  Phone,
  Mail,
  Users,
  CalendarClock,
  Clock,
  MapPin,
  BadgeCheck,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { IsActive, IUser } from "@/types/user.types";
import { AgentStatusBadge } from "./AgentStatusBadge";

interface AgentDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: IUser | null;
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
        <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          {label}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300 break-words">
          {value ?? (
            <span className="text-slate-300 dark:text-slate-600 italic text-xs">—</span>
          )}
        </p>
      </div>
    </div>
  );
}

export function AgentDetailsModal({ open, onOpenChange, item }: AgentDetailsModalProps) {
  if (!item) return null;

  const address = item.address;
  const hasAddress = Boolean(
    address?.division || address?.district || address?.thana
  );
  const addressLine = hasAddress
    ? [address?.thana, address?.district, address?.division]
        .filter(Boolean)
        .join(", ")
    : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex flex-col items-center gap-2 pb-2">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-md mb-1">
            <Handshake className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold tracking-widest uppercase">
            Agent Details
          </DialogTitle>
          <DialogDescription className="text-sm tracking-wide">
            Profile and activity overview
          </DialogDescription>
        </DialogHeader>

        <Separator />

        {/* ── Identity ── */}
        <div className="flex items-center gap-3 pt-1">
          <Avatar className="h-14 w-14 ring-2 ring-emerald-100 dark:ring-emerald-900/60">
            <AvatarImage src={item.picture} alt={item.name} />
            <AvatarFallback className="bg-linear-to-br from-emerald-500 to-blue-600 text-white font-bold">
              {item.name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-base font-semibold text-slate-900 dark:text-white truncate">
              {item.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              {item.customId ?? "—"}
            </p>
            <div className="mt-1">
              <AgentStatusBadge status={item.isActive ?? IsActive.ALL} />
            </div>
          </div>
        </div>

        <Separator />

        {/* ── Contact & Activity ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailRow icon={Phone} label="Phone" value={item.phone} />
          <DetailRow icon={Mail} label="Email" value={item.email} />
          <DetailRow
            icon={CalendarClock}
            label="Joined"
            value={item.createdAt ? format(new Date(item.createdAt), "MMM dd, yyyy") : undefined}
          />
          <DetailRow
            icon={Clock}
            label="Last Login"
            value={item.lastLoginAt ? format(new Date(item.lastLoginAt), "MMM dd, yyyy") : "Never"}
          />
          <DetailRow icon={Users} label="Customers" value="0" />
          <DetailRow icon={BadgeCheck} label="Gender" value={item.gender} />
        </div>

        {hasAddress && (
          <>
            <Separator />
            <DetailRow icon={MapPin} label="Address" value={addressLine} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}