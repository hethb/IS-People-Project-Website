import { Link } from "react-router-dom";
import type { Listing } from "../../types/models";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { StarRating } from "../ui/StarRating";

type Props = {
  listing: Listing;
};

/** Listing card used on Home + Listings pages */
export function ListingCard({ listing }: Props) {
  return (
    <Card className="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative">
        <img
          src={listing.imageUrl}
          alt=""
          className="h-44 w-full object-cover"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge tone="brand">{listing.neighborhood}</Badge>
          {listing.furnished ? <Badge tone="neutral">Furnished</Badge> : null}
          {listing.petFriendly ? <Badge tone="success">Pet friendly</Badge> : null}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-courie-muted/90">{listing.distanceToCampus} from campus</p>
            <h3 className="mt-1 text-base font-bold leading-snug text-courie-ink">{listing.title}</h3>
          </div>
          <div className="text-right">
            <p className="text-lg font-extrabold text-courie-ink">${listing.priceMonthly}</p>
            <p className="text-xs font-semibold text-courie-muted/90">/ month</p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-courie-muted">
          <span className="rounded-sm bg-courie-cream px-2 py-1 ring-1 ring-courie-cream-deep/60">
            {listing.bedrooms === 0 ? "Studio" : `${listing.bedrooms} bed`}
          </span>
          <span className="rounded-sm bg-courie-cream px-2 py-1 ring-1 ring-courie-cream-deep/60">{listing.bathrooms} bath</span>
          <span className="rounded-sm bg-courie-cream px-2 py-1 ring-1 ring-courie-cream-deep/60">
            {listing.walkMinutesToCampus} min walk
          </span>
        </div>

        <div className="mt-4">
          <StarRating value={listing.rating} reviewCount={listing.reviewCount} size="sm" />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold text-courie-muted/90">Safety signal: {listing.safetyScore.toFixed(1)}/5</p>
          <Link
            to={`/listings/${listing.id}`}
            className="text-sm font-bold text-courie-brick hover:text-courie-brick-hover"
          >
            View details →
          </Link>
        </div>
      </div>
    </Card>
  );
}
