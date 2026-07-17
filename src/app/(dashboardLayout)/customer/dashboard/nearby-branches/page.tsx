import { Metadata } from "next";
import { NearbyBranches } from "@/components/customer/nearby-branches";

export const metadata: Metadata = {
  title: "Find Nearby Branches",
  description:
    "Discover partner diagnostic centers and pharmacies near your current location.",
};

export default function NearbyBranchesPage() {
  return <NearbyBranches />;
}
