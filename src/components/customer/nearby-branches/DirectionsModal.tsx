"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Copy, Check, ExternalLink, MapPin, Navigation } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DirectionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  branchName: string;
  address: string;
  latitude: number;
  longitude: number;
  userCoords?: { latitude: number; longitude: number } | null;
}

export function DirectionsModal({
  open,
  onOpenChange,
  branchName,
  address,
  latitude,
  longitude,
  userCoords,
}: DirectionsModalProps) {
  const [copiedField, setCopiedField] = useState<"address" | "coords" | null>(null);

  const googleMapsUrl = userCoords
    ? `https://www.google.com/maps/dir/?api=1&origin=${userCoords.latitude},${userCoords.longitude}&destination=${latitude},${longitude}`
    : `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  const appleMapsUrl = `https://maps.apple.com/?daddr=${latitude},${longitude}${
    userCoords ? `&saddr=${userCoords.latitude},${userCoords.longitude}` : ""
  }`;

  const embedUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
  const coordsLabel = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

  const handleCopy = async (value: string, field: "address" | "coords") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      toast.success(field === "address" ? "Address copied" : "Coordinates copied");
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error("Couldn't copy to clipboard");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 gap-0 overflow-hidden max-h-[90vh] flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <Navigation className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Directions to {branchName}
          </DialogTitle>
          <DialogDescription className="text-sm">{address}</DialogDescription>
        </DialogHeader>

        <div className="relative w-full aspect-video sm:aspect-[16/8] shrink-0 bg-muted">
          <iframe
            title={`Map showing ${branchName}`}
            src={embedUrl}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="flex flex-col gap-3 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              
              className="gap-2 bg-linear-to-r from-emerald-600 to-blue-600 text-white hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 ease-out hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-2 items-center">
                <ExternalLink className="h-4 w-4" />
                Open in Google Maps
              </a>
            </Button>
            <Button
              
              variant="outline"
              className="gap-2 transition-all hover:cursor-pointer duration-200 ease-out hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <a href={appleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-2 items-center">
                <ExternalLink className="h-4 w-4" />
                Open in Apple Maps
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleCopy(address, "address")}
              className="gap-2 transition-all hover:cursor-pointer duration-200 ease-out hover:shadow-md active:scale-[0.98]"
            >
              {copiedField === "address" ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              Copy Address
            </Button>
            <Button
              variant="outline"
              onClick={() => handleCopy(coordsLabel, "coords")}
              className="gap-2 transition-all hover:cursor-pointer duration-200 ease-out hover:shadow-md active:scale-[0.98]"
            >
              {copiedField === "coords" ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              Copy Coordinates
            </Button>
          </div>

          <p className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
            <MapPin className="h-3.5 w-3.5" />
            {coordsLabel}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}