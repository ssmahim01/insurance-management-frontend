import { UserX, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AgentDetailsErrorStateProps {
  onBack: () => void;
}

export function AgentDetailsErrorState({ onBack }: AgentDetailsErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 py-16 px-6 text-center">
      <div className="h-14 w-14 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <UserX className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">Agent Not Found</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        This agent doesn&apos;t exist or could not be loaded.
      </p>
      <Button variant="outline" onClick={onBack} className="gap-2 transition-all duration-300 hover:shadow-md">
        <ArrowLeft className="h-4 w-4" />
        Go Back
      </Button>
    </div>
  );
}