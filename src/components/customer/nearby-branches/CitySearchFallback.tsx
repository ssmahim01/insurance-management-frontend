"use client";

import { useState } from "react";
import { Search, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllBranchesQuery } from "@/redux/features/branch/branch.api";

interface CitySearchFallbackProps {
  onResults: (branches: ReturnType<typeof useGetAllBranchesQuery>["data"] extends infer R
    ? R extends { data: infer D } ? D : never
    : never) => void;
}

// Fallback when both GPS and IP location fail. Reuses the existing
// getAllBranches endpoint's text search (city/area/address), which is a
// text match — not true distance-based geocoding, so results won't carry
// a real distanceKm value.
export function CitySearchFallback({ onResults }: CitySearchFallbackProps) {
  const [city, setCity] = useState("");
  const [submittedCity, setSubmittedCity] = useState("");

  const { data, isFetching } = useGetAllBranchesQuery(
    submittedCity ? { searchTerm: submittedCity, isActive: "true", limit: 50 } : undefined,
    { skip: !submittedCity },
  );

  const handleSearch = () => {
    const trimmed = city.trim();
    if (!trimmed) return;
    setSubmittedCity(trimmed);
    if (data?.data) onResults(data.data);
  };

  return (
    <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-sm p-6 sm:p-8 space-y-4">
      <div className="flex items-center gap-2 text-foreground">
        <MapPinned className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-base font-semibold">Search branches by city</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        We couldn&apos;t determine your location automatically. Enter a city or area to find branches there.
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="e.g. Dhaka, Chattogram..."
          aria-label="City or area"
          className="flex-1"
        />
        <Button
          onClick={handleSearch}
          disabled={isFetching || !city.trim()}
          className="gap-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700"
        >
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>
    </div>
  );
}