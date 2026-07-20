import { notFound } from "next/navigation";
import { ClaimDetailsPage } from "@/components/customer/Dashboard/ClaimDetailsPage";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ subscription?: string }>;
}

export default async function Page({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const { subscription } = await searchParams;

  const claimId = id === "new" ? subscription : id;

  if (!claimId) {
    notFound();
  }

  return <ClaimDetailsPage id={claimId} />;
}