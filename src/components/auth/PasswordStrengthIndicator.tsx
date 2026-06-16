'use client';

import { useMemo } from 'react';
import { calculatePasswordStrength, getPasswordStrengthColor, getPasswordStrengthLabel } from '@/lib/auth/password-strength';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const { strength, color, label } = useMemo(() => {
    if (!password) return { strength: 0, color: 'bg-border', label: '' };
    const calculatedStrength = calculatePasswordStrength(password);
    const strengthMap = { weak: 1, fair: 2, good: 3, strong: 4 };
    return {
      strength: strengthMap[calculatedStrength],
      color: getPasswordStrengthColor(calculatedStrength),
      label: getPasswordStrengthLabel(calculatedStrength),
    };
  }, [password]);

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              bar <= strength ? color : 'bg-border'
            }`}
          />
        ))}
      </div>
      {label && <p className="text-xs text-muted-foreground">Password strength: <span className="font-medium text-foreground">{label}</span></p>}
    </div>
  );
}
