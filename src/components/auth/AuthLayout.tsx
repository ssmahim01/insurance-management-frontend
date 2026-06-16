'use client';

import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  showLeftPanel?: boolean;
  leftPanelContent?: ReactNode;
}

export function AuthLayout({
  children,
  showLeftPanel = true,
  leftPanelContent,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Hidden on mobile, gradient background */}
      {showLeftPanel && (
        <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary via-primary/90 to-primary/80 flex-col justify-between p-8 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/10 rounded-full -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-foreground/5 rounded-full -ml-36 -mb-36" />

          {/* Content */}
          <div className="relative z-10 space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-primary-foreground">
                Insurance Management
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                Secure, efficient, and comprehensive
              </p>
            </div>
          </div>

          {/* Left Panel Content */}
          {leftPanelContent && (
            <div className="relative z-10">
              {leftPanelContent}
            </div>
          )}

          {/* Footer */}
          <div className="relative z-10 space-y-2">
            <p className="text-primary-foreground/80 text-sm">
              © 2024 Insurance Management. All rights reserved.
            </p>
          </div>
        </div>
      )}

      {/* Right Panel - Main content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
