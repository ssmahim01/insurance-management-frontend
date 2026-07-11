"use client";

import { ClaimPageContent } from "@/components/claim/ClaimPageContent";
// import { CreateClaimModal } from "../claim/CreateClaim";
import { useGetAllClaimsQuery } from "@/redux/features/claim/claim.api";
// import { useGetMySubscriptionsQuery } from "@/redux/features/subscription/subscription.api";

export function CustomerClaimsPage() {
  return (
    <ClaimPageContent
      title="My Claims"
      description="Submit and track claims against your active subscriptions."
      breadcrumbs={[
        { label: "Dashboard", href: "/customer/dashboard" },
        { label: "Claims" },
      ]}
      useQuery={useGetAllClaimsQuery}
      // headerAction={(refetch) => (
      //   <CreateClaimModal onSuccess={refetch} useSubscriptionsQuery={useGetMySubscriptionsQuery} />
      // )}
    />
  );
}