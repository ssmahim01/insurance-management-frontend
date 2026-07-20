import { SubscriptionDetailsPage } from "@/components/customer/Dashboard/SubscriptionDetailsPage";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <SubscriptionDetailsPage id={id} />;
}
