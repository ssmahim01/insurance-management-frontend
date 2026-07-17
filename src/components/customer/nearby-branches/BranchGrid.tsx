import { IPartnerBranch } from "@/types/branch.types";
import { BranchCard } from "./BranchCard";
import { getDistanceKm } from "@/utils/geo-distance";

interface BranchGridProps {
  branches: IPartnerBranch[];
  userCoords?: { latitude: number; longitude: number } | null;
}

export function BranchGrid({ branches, userCoords }: BranchGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {branches.map((branch, index) => {
        const [longitude, latitude] = branch.location?.coordinates ?? [0, 0];
        const distanceKm = userCoords
          ? getDistanceKm(userCoords.latitude, userCoords.longitude, latitude, longitude)
          : undefined;

        return (
          <div
            key={branch._id}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both"
            style={{ animationDelay: `${Math.min(index, 12) * 60}ms` }}
          >
            <BranchCard branch={branch} index={index} distanceKm={distanceKm} userCoords={userCoords} />
          </div>
        );
      })}
    </div>
  );
}