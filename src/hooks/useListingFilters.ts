import { useMemo, useState } from "react";
import type { Listing } from "../types/models";

export type ListingFiltersState = {
  maxPrice: number;
  maxWalkMinutes: number;
  bedroomsMin: number; // 0 = any, 1+ means at least N (studio handled separately)
  studioOnly: boolean;
  furnishedOnly: boolean;
  petFriendlyOnly: boolean;
  semesterLeaseOnly: boolean;
  minSafety: number;
};

const defaultFilters: ListingFiltersState = {
  maxPrice: 3000,
  maxWalkMinutes: 60,
  bedroomsMin: 0,
  studioOnly: false,
  furnishedOnly: false,
  petFriendlyOnly: false,
  semesterLeaseOnly: false,
  minSafety: 1,
};

/**
 * Client-side filtering for the prototype.
 * A real app would push these params to an API and paginate results.
 */
export function useListingFilters(all: Listing[]) {
  const [filters, setFilters] = useState<ListingFiltersState>(defaultFilters);

  const filtered = useMemo(() => {
    return all.filter((l) => {
      if (l.priceMonthly > filters.maxPrice) return false;
      if (l.walkMinutesToCampus > filters.maxWalkMinutes) return false;
      if (filters.petFriendlyOnly && !l.petFriendly) return false;
      if (filters.furnishedOnly && !l.furnished) return false;
      if (filters.semesterLeaseOnly && !l.leaseTypes.includes("semester")) return false;
      if (l.safetyScore < filters.minSafety) return false;

      if (filters.studioOnly) {
        if (l.bedrooms !== 0) return false;
      } else if (filters.bedroomsMin > 0) {
        if (l.bedrooms < filters.bedroomsMin) return false;
      }

      return true;
    });
  }, [all, filters]);

  return { filters, setFilters, filtered, reset: () => setFilters(defaultFilters) };
}
