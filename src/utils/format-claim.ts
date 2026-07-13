import { IClaim } from "@/types/claim.types";

export const getClaimCustomerName = (
  customer: IClaim["customer"],
): string => {
  if (!customer) return "—";
  return typeof customer === "string" ? "—" : customer.name;
};

export const getClaimSubscriptionLabel = (
  subscription: IClaim["subscription"],
): string => {
  if (!subscription) return "—";
  if (typeof subscription === "string") return (subscription as string).slice(-8);
  return subscription.subscriptionId ?? subscription._id.slice(-8);
};

export const getAttachmentCount = (attachments?: string[]): number =>
  attachments?.length ?? 0;