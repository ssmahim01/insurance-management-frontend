import { ClaimTitle, PaymentMethod } from "@/types/claim.types";

export const CLAIM_TITLE_LABELS: Record<ClaimTitle, string> = {
  [ClaimTitle.OPD]: "OPD",
  [ClaimTitle.HOSPITAL_COVERAGE]: "Hospital Coverage",
  [ClaimTitle.PREGNANCY_COVERAGE]: "Pregnancy Coverage",
  [ClaimTitle.PARTIAL_DISABILITY]: "Partial Disability",
  [ClaimTitle.PERMANENT_DISABILITY]: "Permanent Disability",
  [ClaimTitle.LIFE_COVERAGE]: "Life Coverage",
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  [PaymentMethod.BKASH]: "bKash",
  [PaymentMethod.NAGAD]: "Nagad",
  [PaymentMethod.BANK]: "Bank Account",
};