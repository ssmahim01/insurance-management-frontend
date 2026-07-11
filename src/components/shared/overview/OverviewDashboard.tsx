"use client";

import { IOverviewData } from "@/types/subscription.types";
import { OverviewPanel } from "./OverviewPanel";
import { OverviewSkeleton } from "./OverviewSkeleton";
import { OverviewErrorState } from "./OverviewErrorState";

interface OverviewDashboardProps {
  data: IOverviewData | undefined;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

export function OverviewDashboard({ data, isLoading, isError, onRetry }: OverviewDashboardProps) {
  if (isLoading) return <OverviewSkeleton />;
  if (isError || !data) return <OverviewErrorState onRetry={onRetry} />;

  return (
    <div className="space-y-6 pt-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverviewPanel label="Today" data={data.today} />
        <OverviewPanel label="This Month" data={data.month} />
      </div>
      <OverviewPanel label="Lifetime" data={data.lifetime} />
    </div>
  );
}