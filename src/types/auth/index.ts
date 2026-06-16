// Auth Types

export type LoginPayload = {
  phoneNumber: string;
  password: string;
  rememberMe?: boolean;
};

export type RegisterPayload = {
  fullName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profilePicture?: File;
  agreedToTerms: boolean;
};

export type ForgotPasswordPayload = {
  phoneNumber: string;
};

export type ResetPasswordPayload = {
  phoneNumber: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
};

export type AuthResponse = {
  success: boolean;
  message: string;
  data?: AuthenticatedUser;
  token?: string;
  refreshToken?: string;
};

export type AuthenticatedUser = {
  id: string;
  phoneNumber: string;
  fullName?: string;
  profilePicture?: string;
  role?: string;
  createdAt?: string;
};

export type OTPVerificationPayload = {
  phoneNumber: string;
  otp: string;
};

export type SendOTPPayload = {
  phoneNumber: string;
};

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

export type AuthState = {
  user: AuthenticatedUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};
