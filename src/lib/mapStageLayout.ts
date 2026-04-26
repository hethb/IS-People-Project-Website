export type ListingMapLayout = "default" | "browse";

/** Fixed height for the map stage (Leaflet / Google inner container). */
export function mapStageHeightClass(layout: ListingMapLayout | undefined) {
  return layout === "browse"
    ? "relative h-[min(58vh,580px)] w-full min-h-[300px] overflow-hidden rounded-md lg:h-[min(64vh,640px)] lg:min-h-[380px]"
    : "relative h-[min(52vh,420px)] w-full min-h-[280px] overflow-hidden rounded-lg";
}
