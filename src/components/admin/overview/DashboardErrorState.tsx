"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardErrorStateProps {
  onRetry: () => void;
}

export function DashboardErrorState({ onRetry }: DashboardErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/5 py-20 px-6 text-center">
      <div className="h-14 w-14 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <AlertTriangle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">Failed to load dashboard</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Something went wrong while fetching your data. Please try again.
      </p>
      <Button variant="outline" onClick={onRetry} className="gap-2 transition-all duration-300 hover:shadow-md">
        <RefreshCcw className="h-4 w-4" />
        Retry
      </Button>
    </div>
  );
}