import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

export function formatPhoneNumber(phoneNumber: string): string {
  try {
    const parsed = parsePhoneNumber(phoneNumber, 'BD');
    if (!parsed) return phoneNumber;
    return parsed.formatInternational();
  } catch {
    return phoneNumber;
  }
}

export function normalizePhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters except +
  let normalized = phoneNumber.replace(/[^\d+]/g, '');

  // If it starts with 0, replace with 0
  if (normalized.startsWith('0')) {
    normalized = '0' + normalized.slice(1);
  }

  // If it doesn't start with +, add 0
  if (!normalized.startsWith('+')) {
    normalized = '0' + normalized;
  }

  return normalized;
}

export function isValidPhone(phoneNumber: string): boolean {
  try {
    return isValidPhoneNumber(phoneNumber, 'BD');
  } catch {
    return false;
  }
}

export function formatPhoneForDisplay(phoneNumber: string): string {
  const normalized = normalizePhoneNumber(phoneNumber);
  // Format as 0 1XXX XXXXXX
  if (normalized.length === 13) {
    return `${normalized.slice(0, 4)} ${normalized.slice(4, 8)} ${normalized.slice(8)}`;
  }
  return normalized;
}
