// BranchDetailsModal.tsx
"use client";

import { Building2, MapPin, Phone, Mail } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IPartnerBranch } from "@/types/branch.types";

interface BranchDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: IPartnerBranch;
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground text-right">
        {value || "—"}
      </span>
    </div>
  );
}

export function BranchDetailsModal({
  open,
  onOpenChange,
  item,
}: BranchDetailsModalProps) {
  const partnerName =
    typeof item.partner === "string" ? item.partner : (item.partner as any)?.name;

  const [lng, lat] = item.location?.coordinates ?? [undefined, undefined];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] scrollbar-none overflow-y-auto p-6">
        <DialogHeader className="flex flex-col items-center gap-2 pb-2">
          <div className="w-12 h-12 rounded-xl from-violet-500 to-purple-600 flex items-center justify-center shadow-md mb-1">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold tracking-widest uppercase">
            {item.branchName}
          </DialogTitle>
          <DialogDescription className="text-[#96999A] text-sm tracking-wide">
            Branch details
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
            Basic Information
          </p>
          <Row label="Partner" value={partnerName} />
          <Row label="Branch Name" value={item.branchName} />
          <div className="flex justify-between py-2 border-b border-border last:border-0">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge variant={item.isActive ? "default" : "secondary"}>
              {item.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" /> Contact Information
          </p>
          <Row label="Phone" value={item.phone} />
          <Row label="Email" value={item.email} />
        </div>

        <Separator />

        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> Address
          </p>
          <Row label="Address" value={item.address} />
          <Row label="City" value={item.city} />
          <Row label="Area" value={item.area} />
          <Row label="Postal Code" value={item.postalCode} />
          <Row label="Latitude" value={lat !== undefined ? String(lat) : undefined} />
          <Row label="Longitude" value={lng !== undefined ? String(lng) : undefined} />
        </div>
      </DialogContent>
    </Dialog>
  );
}