import type { Landlord } from "../types/models";

/**
 * Mock landlords / property managers.
 * Linked to listings via `landlordId`.
 */
export const mockLandlords: Landlord[] = [
  {
    id: "ll_aurora",
    name: "Aurora Student Housing",
    type: "property_management",
    trustScore: 4.6,
    responseTimeLabel: "Usually replies within 24 hours",
    yearsActive: 8,
    listingsCount: 42,
    bio: "Aurora focuses on walkable rentals near campus with clear semester lease options and a dedicated maintenance hotline.",
    moderationNote:
      "This profile has completed identity verification and responds to most review threads within 7 days.",
  },
  {
    id: "ll_maple",
    name: "Maple Row Rentals",
    type: "landlord",
    trustScore: 4.2,
    responseTimeLabel: "Usually replies within 2–3 days",
    yearsActive: 4,
    listingsCount: 11,
    bio: "Local landlord with a small portfolio. Emphasizes transparent move-in costs and flexible sublease policies.",
  },
  {
    id: "ll_riverbend",
    name: "Riverbend PM",
    type: "property_management",
    trustScore: 3.7,
    responseTimeLabel: "Replies within a week",
    yearsActive: 12,
    listingsCount: 86,
    bio: "Larger operator with mixed reviews. Scotty's Courie highlights patterns from verified renters to help you compare fairly.",
    moderationNote:
      "We flagged repeated themes in reviews about deposit timelines; the manager posted a clarifying policy update.",
  },
];
