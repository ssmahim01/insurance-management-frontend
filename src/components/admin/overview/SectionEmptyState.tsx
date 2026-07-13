import { Inbox } from "lucide-react";

interface SectionEmptyStateProps {
  message: string;
}

export function SectionEmptyState({ message }: SectionEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-2.5">
        <Inbox className="h-4 w-4 text-muted-foreground/50" />
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}