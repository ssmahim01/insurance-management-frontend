"use client";

import { Mail, Phone, Reply, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IContact } from "@/types/contact.type";

interface ContactDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: IContact;
  onMarkAsReplied: (item: IContact) => void;
  isMarkingReplied: boolean;
}

const formatDate = (iso?: string) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function ContactDetailsModal({
  open,
  onOpenChange,
  item,
  onMarkAsReplied,
  isMarkingReplied,
}: ContactDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-linear-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            {item.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {item.isRead ? (
              <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
                Read
              </Badge>
            ) : (
              <Badge className="border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                Unread
              </Badge>
            )}
            {item.isReplied ? (
              <Badge className="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                <Reply className="w-3 h-3 mr-1" />
                Replied
              </Badge>
            ) : (
              <Badge className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
                Pending Reply
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Mail className="w-4 h-4 shrink-0" />
              <span className="truncate">{item.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Phone className="w-4 h-4 shrink-0" />
              <span>{item.phone ?? "—"}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 sm:col-span-2">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{formatDate(item.createdAt)}</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-slate-400 mb-1">
              Subject
            </p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {item.subject}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-slate-400 mb-1">
              Message
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap leading-relaxed">
              {item.message}
            </p>
          </div>

          {!item.isReplied && (
            <Button
              className="w-full"
              disabled={isMarkingReplied}
              onClick={() => onMarkAsReplied(item)}
            >
              <Reply className="w-4 h-4 mr-2" />
              {isMarkingReplied ? "Marking..." : "Mark as Replied"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}