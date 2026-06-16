// Auth Routes
export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
} as const;

// Error Messages
export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid phone number or password',
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: 'This phone number is already registered',
  INVALID_OTP: 'Invalid or expired OTP',
  OTP_EXPIRED: 'OTP has expired. Please request a new one',
  WEAK_PASSWORD: 'Password is too weak',
  NETWORK_ERROR: 'Network error. Please try again',
  SOMETHING_WRONG: 'Something went wrong. Please try again',
} as const;

// Success Messages
export const AUTH_SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful! Please login.',
  OTP_SENT: 'OTP sent to your phone number',
  PASSWORD_RESET: 'Password reset successful!',
  PASSWORD_CHANGED: 'Password changed successfully!',
} as const;

// OTP Settings
export const OTP_SETTINGS = {
  LENGTH: 6,
  EXPIRY_MINUTES: 5,
  RESEND_DELAY_SECONDS: 30,
  MAX_ATTEMPTS: 5,
} as const;

// Password Strength Levels
export const PASSWORD_STRENGTH = {
  WEAK: { level: 0, label: 'Weak', color: 'bg-red-500' },
  FAIR: { level: 1, label: 'Fair', color: 'bg-orange-500' },
  GOOD: { level: 2, label: 'Good', color: 'bg-yellow-500' },
  STRONG: { level: 3, label: 'Strong', color: 'bg-green-500' },
} as const;

// Form Field Placeholders
export const FORM_PLACEHOLDERS = {
  PHONE: '0 1234 567890',
  PASSWORD: 'Enter your password',
  FULL_NAME: 'John Doe',
  OTP: '000000',
} as const;

// Animation Durations (in ms)
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;
