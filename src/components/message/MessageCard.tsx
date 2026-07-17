"use client";

import React, { useState } from "react";
import { Eye, MessageSquare, Calendar } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IMessage, MessageType } from "@/redux/features/message/message.api";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatDate = (iso?: string) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
};

const formatTime = (iso?: string) => {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit", minute: "2-digit",
  });
};

// Detects http(s) URLs inside a text string and renders them as clickable links,
// keeping the rest as plain text.
const URL_REGEX = /(https?:\/\/[^\s]+)/g;

function linkifyText(text: string, onLinkClick?: (e: React.MouseEvent) => void) {
  const parts = text.split(URL_REGEX);

  return parts.map((part, i) => {
    if (part.match(URL_REGEX)) {
      // strip trailing punctuation that's likely not part of the URL (. , ) etc.)
      const trailingPunctMatch = part.match(/[.,)\]]+$/);
      const trailing = trailingPunctMatch ? trailingPunctMatch[0] : "";
      const url = trailing ? part.slice(0, -trailing.length) : part;

      return (
        <React.Fragment key={i}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 dark:text-green-400 underline underline-offset-2 hover:text-green-700 dark:hover:text-green-300 break-all"
            onClick={(e) => {
              e.stopPropagation();
              onLinkClick?.(e);
            }}
          >
            {url}
          </a>
          {trailing}
        </React.Fragment>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

const MESSAGE_TYPE_LABELS: Record<MessageType, string> = {
  [MessageType.SUBSCRIPTION]: "Subscription",
  [MessageType.PAYMENT]: "Payment",
  [MessageType.CLAIM]: "Claim",
  [MessageType.PROMOTIONAL]: "Promotional",
  [MessageType.GENERAL]: "General",
  [MessageType.OTP]: "OTP",
  [MessageType.SMS]: "SMS",
};

const MESSAGE_TYPE_COLORS: Record<MessageType, string> = {
  [MessageType.SUBSCRIPTION]:
    "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400",
  [MessageType.PAYMENT]:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
  [MessageType.CLAIM]:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-900/20 dark:text-violet-400",
  [MessageType.PROMOTIONAL]:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
  [MessageType.GENERAL]:
    "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
  [MessageType.OTP]:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400",
  [MessageType.SMS]:
    "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400",
};

// ─── Skeleton ────────────────────────────────────────────────────────────────

function MessageCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl ring-1 ring-black/5 dark:ring-white/10 shadow-sm p-4">
      <div className="flex items-start gap-3">
        <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
    </div>
  );
}

// ─── Details Dialog (inline, customer view — simple) ─────────────────────────

function MessageDetailsDialog({
  message,
  open,
  onOpenChange,
}: {
  message: IMessage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!message) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center text-white shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <DialogTitle className="text-left">Message Details</DialogTitle>
              {message.type && (
                <Badge
                  variant="outline"
                  className={`text-[10px] px-1.5 py-0 mt-1 whitespace-nowrap ${MESSAGE_TYPE_COLORS[message.type]}`}
                >
                  {MESSAGE_TYPE_LABELS[message.type]}
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap wrap-anywhere">
          {linkifyText(message.message)}
        </p>

        <div className="flex items-center gap-1 text-xs text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(message.createdAt)} · {formatTime(message.createdAt)}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────────

interface MessageCardProps {
  message: IMessage;
  onViewDetails: (m: IMessage) => void;
}

function MessageCard({ message, onViewDetails }: MessageCardProps) {
  return (
    <div
      className="relative bg-gray-100 dark:bg-slate-950 rounded-2xl ring-1 ring-black/5 dark:ring-white/10 shadow-sm hover:shadow-md transition-all duration-200 p-4"
      onClick={() => onViewDetails(message)}
      role="button"
    >
      <div className="flex items-start gap-3 pr-4">
        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center text-white shrink-0">
          <MessageSquare className="w-4 h-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {message.type && (
              <Badge
                variant="outline"
                className={`text-[10px] px-1.5 py-0 whitespace-nowrap ${MESSAGE_TYPE_COLORS[message.type]}`}
              >
                {MESSAGE_TYPE_LABELS[message.type]}
              </Badge>
            )}
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 wrap-break-word">
            {linkifyText(message.message)}
          </p>

          <p className="text-[11px] text-slate-400 mt-1.5">
            {formatDate(message.createdAt)} · {formatTime(message.createdAt)}
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full shrink-0 text-slate-500 dark:text-slate-400 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400"
          title="View details"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(message);
          }}
        >
          <Eye className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

// ─── List ────────────────────────────────────────────────────────────────────

interface MessageCardsProps {
  messages: IMessage[];
  isLoading: boolean;
}

export function MessageCards({ messages, isLoading }: MessageCardsProps) {
  const [viewingMessage, setViewingMessage] = useState<IMessage | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (m: IMessage) => {
    setViewingMessage(m);
    setIsDetailsOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <MessageCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {messages.map((m) => (
          <MessageCard key={m._id} message={m} onViewDetails={handleViewDetails} />
        ))}
      </div>

      <MessageDetailsDialog
        message={viewingMessage}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
    </>
  );
}