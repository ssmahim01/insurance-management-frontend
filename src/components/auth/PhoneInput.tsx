'use client';

import { Phone } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';

interface PhoneInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export function PhoneInput({
  label,
  error,
  ...props
}: PhoneInputProps) {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-sm font-medium">
          {label}
        </label>
      )}

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Phone size={18} />
        </div>

        <input
          type="tel"
          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg ${
            error
              ? 'border-red-500'
              : 'border-border'
          }`}
          {...props}
        />
      </div>

      {error && (
        <p className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}