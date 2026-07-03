"use client";

import { RotateCcw, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface RestoreDialogProps {
  entityName?: string;
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function RestoreDialog({
  isOpen,
  itemName,
  entityName,
  onConfirm,
  onCancel,
  isLoading,
}: RestoreDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5 text-primary" />
            Restore {entityName}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will restore{" "}
            <span className="font-medium text-foreground">{itemName}</span> and
            make them available again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isLoading}
            className="gap-2 bg-indigo-700 hover:bg-indigo-800 text-white hover:cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Restore
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
