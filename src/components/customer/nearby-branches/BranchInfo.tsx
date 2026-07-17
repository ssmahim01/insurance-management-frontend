import { MapPin } from "lucide-react";
import { IPartnerBranch } from "@/types/branch.types";

interface BranchInfoProps {
  branch: IPartnerBranch;
}

export function BranchInfo({ branch }: BranchInfoProps) {
  const addressParts = [branch.address, branch.area, branch.city, branch.postalCode].filter(Boolean);

  return (
    <div className="flex items-start gap-2 text-sm text-white/85">
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/10">
        <MapPin className="h-3.5 w-3.5 text-white" />
      </div>
      <p className="leading-relaxed">{addressParts.join(", ")}</p>
    </div>
  );
}