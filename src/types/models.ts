/**
 * Shared domain types for listings, landlords, and reviews.
 * In a real app these would mirror your API/database schema.
 */

export type LeaseType = "semester" | "academic_year" | "full_year" | "month_to_month";

export type Listing = {
  id: string;
  title: string;
  /** Short neighborhood label for cards */
  neighborhood: string;
  /** Human-readable distance to campus (mock) */
  distanceToCampus: string;
  walkMinutesToCampus: number;
  priceMonthly: number;
  bedrooms: number;
  bathrooms: number;
  sqft?: number;
  furnished: boolean;
  petFriendly: boolean;
  leaseTypes: LeaseType[];
  /** 1–5 safety score used for trust UI */
  safetyScore: number;
  /** 0–5 average rating from reviews */
  rating: number;
  reviewCount: number;
  landlordId: string;
  /** Short marketing blurb */
  summary: string;
  /** Bullet highlights shown on detail page */
  highlights: string[];
  imageUrl: string;
  /** Approx lat/lng for map placeholder positioning */
  lat: number;
  lng: number;
};

export type Landlord = {
  id: string;
  name: string;
  type: "landlord" | "property_management";
  /** Overall reputation score (mock) */
  trustScore: number;
  responseTimeLabel: string;
  yearsActive: number;
  listingsCount: number;
  bio: string;
  moderationNote?: string;
};

export type Review = {
  id: string;
  listingId: string;
  landlordId: string;
  /** Stars 1–5 */
  rating: number;
  title: string;
  body: string;
  createdAt: string; // ISO date string
  verifiedStudent: boolean;
  /** If true, UI shows “Anonymous” instead of a display name */
  anonymous: boolean;
  authorDisplayName: string;
  tags: string[];
};
