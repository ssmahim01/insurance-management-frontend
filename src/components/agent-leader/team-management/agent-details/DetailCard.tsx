import { LucideIcon } from "lucide-react";

interface DetailCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export function DetailCard({ title, icon: Icon, children, className = "" }: DetailCardProps) {
  return (
    <div
      className={`rounded-xl border border-border p-5 sm:p-6 transition-all duration-300 hover:shadow-md ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          {title}
        </h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}