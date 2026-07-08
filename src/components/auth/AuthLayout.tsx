"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

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
        <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary via-primary/90 to-primary/80 flex-col justify-between dark:from-slate-950 dark:via-slate-900 dark:to-gray-950 p-8 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/5 rounded-full -ml-36 -mb-36" />

          {/* Content */}
          <div className="relative z-10 space-y-4">
            <div className="space-y-2">
              <Link href="/login">
                <Image
                  src={"/assets/shurokkha-logo-1.png"}
                  alt="Shurokkha Logo"
                  width={500}
                  height={500}
                  quality={90}
                  className="w-auto h-20 rounded-md"
                  priority
                />
              </Link>
            </div>
          </div>

          {/* Left Panel Content */}
          {leftPanelContent && (
            <div className="relative z-10">{leftPanelContent}</div>
          )}

          {/* Footer */}
          <div className="relative z-10 space-y-2">
            <p className="text-primary-foreground/80 text-sm">
              © 2026 Shurokkha. All rights reserved.
            </p>
          </div>
        </div>
      )}

      {/* Right Panel - Main content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
