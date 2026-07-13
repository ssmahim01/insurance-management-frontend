"use client";

import { Button } from "@/components/ui/button";
import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;

  action?: React.ReactNode;

  actionButton?: {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    onClick: () => void;
  };
}



export function PageHeader({
  title,
  description,
  breadcrumbs,
  action,
  actionButton,
}: PageHeaderProps) {
  return (
    <div className="space-y-6 mb-8">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-2">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {action}

          {actionButton && (
            <Button onClick={actionButton.onClick} className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 hover:cursor-pointer hover:scale-105 transition-transform duration-200">
              {actionButton.icon && <actionButton.icon className="w-4 h-4" />}
              {actionButton.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
