"use client";

import { AlertOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BranchErrorStateProps {
  onRetry: () => void;
}

export function BranchErrorState({ onRetry }: BranchErrorStateProps) {
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center gap-5 rounded-3xl border border-red-200/60 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/10 p-10 sm:p-14 text-center">
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-red-400/10 blur-3xl" />

      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900/30 ring-1 ring-red-200 dark:ring-red-900/50">
        <AlertOctagon className="h-7 w-7 text-red-600 dark:text-red-400" />
      </div>

      <div className="relative space-y-1.5">
        <h3 className="text-lg font-semibold text-foreground">Couldn&apos;t load nearby branches</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
          Something went wrong while fetching branches. Please check your connection and try again.
        </p>
      </div>

      <Button
        onClick={onRetry}
        variant="outline"
        className="gap-2 border-red-300 text-red-700 hover:bg-red-100 hover:text-red-800 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30 transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97]"
      >
        Try Again
      </Button>
    </div>
  );
}