// MessageDetailsModal.tsx
"use client";

import { useState } from "react";
import { MessageSquare, Phone, Calendar, Copy, Check } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IMessage } from "@/redux/features/message/message.api";

interface MessageDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: IMessage;
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

export function MessageDetailsModal({
  open,
  onOpenChange,
  item,
}: MessageDetailsModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.message);
      setCopied(true);
      toast.success("Message copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy message");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] scrollbar-none overflow-y-auto p-6">
        <DialogHeader className="flex flex-col items-center gap-2 pb-2">
          <div className="w-12 h-12 rounded-xl from-violet-500 to-purple-600 flex items-center justify-center shadow-md mb-1">
            <MessageSquare className="w-6 h-6 text-violet-500 dark:text-white" />
          </div>
          <DialogTitle className="text-xl font-bold tracking-widest uppercase text-center">
            Message Details
          </DialogTitle>
          <DialogDescription className="text-[#96999A] text-sm tracking-wide">
            Full message content and metadata
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
              Message
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="h-7 gap-1.5 text-xs"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <p className="text-sm text-foreground bg-muted/50 rounded-md p-3 leading-relaxed whitespace-pre-wrap">
            {item.message}
          </p>
        </div>

        <Separator />

        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
            Meta
          </p>
          <Row icon={Phone} label="Phone" value={item.phone} />
          <Row icon={Calendar} label="Sent" value={formatDate(item.createdAt)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}