"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { LucideIcon } from "lucide-react";
import { IStatusChartPoint } from "@/types/dashboard";
import { STATUS_CHART_COLORS } from "@/utils/format-dashboard";
import { DashboardSectionCard } from "./DashboardSectionCard";
import { SectionEmptyState } from "./SectionEmptyState";

interface StatusPieChartProps {
  title: string;
  icon: LucideIcon;
  data: IStatusChartPoint[];
}

const FALLBACK_COLORS = ["#0891b2", "#2563eb", "#64748b", "#f59e0b", "#ef4444"];

export function StatusPieChart({ title, icon, data }: StatusPieChartProps) {
  return (
    <DashboardSectionCard title={title} icon={icon} className="bg-gray-100 border border-border dark:bg-slate-950 p-6 pt-8 shadow-sm hover:shadow-xl hover:scale-105 ease-in-out transform transition-transform duration-500">
      {data.length === 0 ? (
        <SectionEmptyState message="No data for this period." />
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
              >
                {data.map((entry, idx) => (
                  <Cell
                    key={entry.name}
                    fill={STATUS_CHART_COLORS[entry.name] ?? FALLBACK_COLORS[idx % FALLBACK_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardSectionCard>
  );
}