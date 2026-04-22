import { mockLandlords } from "./mockLandlords";
import { mockListings } from "./mockListings";
import { mockReviews } from "./mockReviews";

/** Lookup helpers used across pages (keeps routing components simple). */
export function getListingById(id: string) {
  return mockListings.find((l) => l.id === id);
}

export function getLandlordById(id: string) {
  return mockLandlords.find((l) => l.id === id);
}

export function getReviewsForListing(listingId: string) {
  return mockReviews.filter((r) => r.listingId === listingId);
}

export function getReviewsForLandlord(landlordId: string) {
  return mockReviews.filter((r) => r.landlordId === landlordId);
}

export function getListingsForLandlord(landlordId: string) {
  return mockListings.filter((l) => l.landlordId === landlordId);
}
