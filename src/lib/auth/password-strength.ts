import type { PasswordStrength } from '@/types/auth';

export function calculatePasswordStrength(password: string): PasswordStrength {
  let strength = 0;

  // Length check
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;

  // Lowercase check
  if (/[a-z]/.test(password)) strength++;

  // Uppercase check
  if (/[A-Z]/.test(password)) strength++;

  // Number check
  if (/[0-9]/.test(password)) strength++;

  // Special character check
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) return 'weak';
  if (strength <= 3) return 'fair';
  if (strength <= 4) return 'good';
  return 'strong';
}

export function getPasswordStrengthColor(strength: PasswordStrength): string {
  const colors = {
    weak: 'bg-red-500',
    fair: 'bg-orange-500',
    good: 'bg-yellow-500',
    strong: 'bg-green-500',
  };
  return colors[strength];
}

export function getPasswordStrengthLabel(strength: PasswordStrength): string {
  const labels = {
    weak: 'Weak',
    fair: 'Fair',
    good: 'Good',
    strong: 'Strong',
  };
  return labels[strength];
}
