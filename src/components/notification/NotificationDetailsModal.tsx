
"use client";

import { useEffect } from "react";
import { Bell, User, Phone, Calendar, ShieldCheck } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  useMarkAsReadMutation,
  INotification,
} from "@/redux/features/notification/notification.api";

interface NotificationDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: INotification;
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </span>
      <span className="text-sm font-medium text-foreground text-right">
        {value || "—"}
      </span>
    </div>
  );
}

const formatDate = (iso?: string) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getUserName = (user: INotification["user"]) =>
  typeof user === "string" ? user : user?.name;

const getUserPhone = (user: INotification["user"]) =>
  typeof user === "string" ? undefined : user?.phone;

export function NotificationDetailsModal({
  open,
  onOpenChange,
  item,
}: NotificationDetailsModalProps) {
  const [markAsRead] = useMarkAsReadMutation();

  useEffect(() => {
    if (open && !item.isRead) {
      markAsRead(item._id).catch(() => {
      });
    }
  }, [open, item._id]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] scrollbar-none overflow-y-auto p-6">
        <DialogHeader className="flex flex-col items-center gap-2 pb-2">
          <div className="w-12 h-12 rounded-xl from-violet-500 to-purple-600 flex items-center justify-center shadow-md mb-1">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold tracking-widest uppercase text-center">
            {item.title}
          </DialogTitle>
          <DialogDescription className="text-[#96999A] text-sm tracking-wide">
            Notification details
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
            Message
          </p>
          <p className="text-sm text-foreground bg-muted/50 rounded-md p-3 leading-relaxed">
            {item.message}
          </p>
        </div>

        <Separator />

        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
            Recipient
          </p>
          <Row icon={User} label="Name" value={getUserName(item.user)} />
          <Row icon={Phone} label="Phone" value={getUserPhone(item.user)} />
        </div>

        <Separator />

        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
            Meta
          </p>
          <Row icon={Calendar} label="Sent" value={formatDate(item.createdAt)} />
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Status
            </span>
            <Badge variant={item.isRead ? "default" : "secondary"}>
              {item.isRead ? "Read" : "Unread"}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}