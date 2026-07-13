import { LucideIcon } from "lucide-react";

interface DashboardSectionCardProps {
  title: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardSectionCard({ title, icon: Icon, action, children, className = "" }: DashboardSectionCardProps) {
  return (
    <div className={`rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:shadow-md ${className}`}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="h-8 w-8 rounded-lg bg-cyan-600/10 flex items-center justify-center">
              <Icon className="h-4 w-4 text-cyan-700 dark:text-cyan-400" />
            </div>
          )}
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}