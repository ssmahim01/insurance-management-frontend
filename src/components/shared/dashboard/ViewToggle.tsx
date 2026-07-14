"use client";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ViewMode = "table" | "grid";

interface ViewToggleProps {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 shadow-sm shrink-0">
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => onChange("grid")}
        title="Grid view"
        className={`h-8 w-8 transition-all duration-200 ease-out active:scale-95 ${
          view === "grid"
            ? "bg-linear-to-br from-emerald-600 to-blue-600 text-white shadow-sm hover:from-emerald-600 hover:to-blue-600 hover:text-white"
            : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => onChange("table")}
        title="Table view"
        className={`h-8 w-8 transition-all duration-200 ease-out active:scale-95 ${
          view === "table"
            ? "bg-linear-to-br from-emerald-600 to-blue-600 text-white shadow-sm hover:from-emerald-600 hover:to-blue-600 hover:text-white"
            : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}