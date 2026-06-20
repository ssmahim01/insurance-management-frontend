import { ArrowUp, ArrowDown } from 'lucide-react';
import type { StatsCardProps } from '@/types/dashboard';

export function StatsCard({
  title,
  value,
  subtext,
  icon: Icon,
  trend,
  onClick,
}: StatsCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:shadow-md hover:scale-105' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
            {trend && (
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? (
                  <ArrowUp className="w-3 h-3" />
                ) : (
                  <ArrowDown className="w-3 h-3" />
                )}
                {trend.value}%
              </div>
            )}
          </div>
          {subtext && (
            <p className="text-xs text-muted-foreground mt-2">{subtext}</p>
          )}
        </div>
        {Icon && (
          <div className="shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              {Icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
