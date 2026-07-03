"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

// interface PageHeaderProps {
//   title: string;
//   description?: string;
//   breadcrumbs?: Array<{ label: string; href?: string }>;
//   action?: {
//     label: string;
//     href: string;
//   };
//   actionButton?: {
//     label: string;
//     icon?: React.ComponentType<{ className?: string }>;
//     onClick: () => void;
//   };
// }

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
      {/* Breadcrumbs */}
      {/* {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">
                  {crumb.label}
                </span>
              )}
              {idx < breadcrumbs.length - 1 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      )} */}

      {/* Title and Action */}
      {/* <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        {action && (
          <Link
            href={action.href}
            className="inline-flex hover:cursor-pointer items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2 hover:scale-105 transition-transform duration-200"
          >
            {action.label}
          </Link>
        )}
        {actionButton && (
          <Button
            onClick={actionButton.onClick}
            className="gap-2 hover:cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            {actionButton.icon && <actionButton.icon className="w-4 h-4" />}
            {actionButton.label}
          </Button>
        )}
      </div> */}

      <div className="flex items-start justify-between gap-4">
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
