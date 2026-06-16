'use client';

import { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
  className = '',
}: AuthCardProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        {subtitle && (
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="pt-4 border-t border-border">
          {footer}
        </div>
      )}
    </div>
  );
}
