"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { IRevenueChartPoint } from "@/types/dashboard";
import { formatCurrency } from "@/lib/utils/format-subscription";
import { DashboardSectionCard } from "./DashboardSectionCard";
import { SectionEmptyState } from "./SectionEmptyState";

interface RevenueChartProps {
  data: IRevenueChartPoint[];
}

interface TooltipPayloadItem {
  dataKey: string;
  value: number;
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-md text-xs space-y-1">
      <p className="font-semibold text-foreground">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-muted-foreground">
          {p.dataKey === "revenue" ? "Revenue" : "Subscriptions"}:{" "}
          <span className="font-semibold text-foreground">
            {p.dataKey === "revenue" ? formatCurrency(p.value) : p.value}
          </span>
        </p>
      ))}
    </div>
  );
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <DashboardSectionCard title="Monthly Revenue & Subscriptions" icon={TrendingUp}>
      {data.length === 0 ? (
        <SectionEmptyState message="No revenue data yet." />
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0891b2" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                yAxisId="revenue"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => formatCurrency(v).replace("৳", "")}
              />
              <YAxis yAxisId="subs" orientation="right" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                stroke="#0891b2"
                strokeWidth={2}
                fill="url(#revenueGradient)"
              />
              <Bar yAxisId="subs" dataKey="subscriptions" fill="#0f172a" radius={[4, 4, 0, 0]} barSize={18} opacity={0.7} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardSectionCard>
  );
}