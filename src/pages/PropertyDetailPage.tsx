import { Link, useParams } from "react-router-dom";
import { ListingMap } from "../components/listings/ListingMap";
import { ReviewCard } from "../components/reviews/ReviewCard";
import { SafetyMeter } from "../components/trust/SafetyMeter";
import { TrustCallout } from "../components/trust/TrustCallout";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { StarRating } from "../components/ui/StarRating";
import { getLandlordById, getListingById, getReviewsForListing } from "../data/selectors";
import { formatLeaseType, formatMoney } from "../lib/format";

/**
 * Property detail: the “decision page” where trust signals + reviews reduce uncertainty.
 */
export function PropertyDetailPage() {
  const { listingId } = useParams();
  const listing = listingId ? getListingById(listingId) : undefined;

  if (!listing) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Card className="p-8">
          <h1 className="text-2xl font-black text-slate-900">Listing not found</h1>
          <p className="mt-2 text-sm font-semibold text-slate-600">This ID isn’t in the mock dataset.</p>
          <div className="mt-6">
            <Link to="/listings" className="text-sm font-extrabold text-teal-800 hover:text-teal-900">
              ← Back to browse
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const landlord = getLandlordById(listing.landlordId);
  const reviews = getReviewsForListing(listing.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap gap-2">
        <Badge tone="brand">{listing.neighborhood}</Badge>
        <Badge tone="neutral">{listing.distanceToCampus} from campus</Badge>
        {listing.petFriendly ? <Badge tone="success">Pet friendly</Badge> : <Badge tone="warning">No pets</Badge>}
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-2 lg:items-start">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">{listing.title}</h1>
          <div className="mt-3">
            <StarRating value={listing.rating} reviewCount={listing.reviewCount} />
          </div>
          <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-700">{listing.summary}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Card className="p-4">
              <p className="text-xs font-bold text-slate-500">Rent</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{formatMoney(listing.priceMonthly)}</p>
              <p className="text-xs font-semibold text-slate-500">per month (mock)</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs font-bold text-slate-500">Walk time</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{listing.walkMinutesToCampus} min</p>
              <p className="text-xs font-semibold text-slate-500">to main campus (demo)</p>
            </Card>
          </div>

          <div className="mt-6">
            <img
              src={listing.imageUrl}
              alt=""
              className="h-64 w-full rounded-2xl object-cover ring-1 ring-slate-200/70 shadow-soft"
            />
          </div>
        </div>

        <div className="space-y-5">
          <SafetyMeter score={listing.safetyScore} />

          <Card className="p-5">
            <p className="text-sm font-extrabold text-slate-900">Lease options</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {listing.leaseTypes.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-teal-50 px-3 py-1 text-xs font-extrabold text-teal-900 ring-1 ring-teal-200/60"
                >
                  {formatLeaseType(t)}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs font-semibold leading-relaxed text-slate-600">
              Students often need <span className="font-extrabold text-slate-900">semester-aligned</span> move dates.
              Always confirm details in your own lease—this UI is a decision-support layer, not legal advice.
            </p>
          </Card>

          {landlord ? (
            <Card className="p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {landlord.type === "property_management" ? "Property manager" : "Landlord"}
              </p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-extrabold text-slate-900">{landlord.name}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-600">{landlord.responseTimeLabel}</p>
                </div>
                <Link to={`/landlords/${landlord.id}`}>
                  <Button type="button" variant="secondary" className="w-full sm:w-auto">
                    View profile
                  </Button>
                </Link>
              </div>
            </Card>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to={`/reviews/new?listingId=${listing.id}`} className="sm:flex-1">
              <Button type="button" className="w-full">
                Write a review
              </Button>
            </Link>
            <Link to="/listings" className="sm:flex-1">
              <Button type="button" variant="secondary" className="w-full">
                Save for later (demo)
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
        <Card className="p-6">
          <h2 className="text-lg font-extrabold text-slate-900">Highlights</h2>
          <ul className="mt-4 space-y-3 text-sm font-semibold text-slate-700">
            {listing.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-teal-100 text-xs font-black text-teal-900">
                  ✓
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm font-semibold text-slate-700">
            <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200/70">
              Beds<br />
              <span className="text-lg font-black text-slate-900">{listing.bedrooms === 0 ? "Studio" : listing.bedrooms}</span>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200/70">
              Baths<br />
              <span className="text-lg font-black text-slate-900">{listing.bathrooms}</span>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200/70">
              Furnished<br />
              <span className="text-lg font-black text-slate-900">{listing.furnished ? "Yes" : "No"}</span>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200/70">
              Sqft<br />
              <span className="text-lg font-black text-slate-900">{listing.sqft ?? "—"}</span>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <TrustCallout
            title="How reviews are shown (prototype)"
            body="We highlight verified student reviewers and clearly label anonymous posts. A production system would add
            fraud detection, rate limits, and structured questions (deposit, maintenance, communication) for comparability."
          />
          <ListingMap listings={[listing]} activeListingId={listing.id} />
        </div>
      </div>

      <section className="mt-12">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Student reviews</h2>
            <p className="mt-2 text-sm font-semibold text-slate-600">
              Reviews are mock data, but the layout shows how transparency + privacy cues coexist.
            </p>
          </div>
          <Link to={`/reviews/new?listingId=${listing.id}`} className="text-sm font-extrabold text-teal-800 hover:text-teal-900">
            Add yours →
          </Link>
        </div>

        <div className="mt-6 grid gap-4">
          {reviews.length ? (
            reviews.map((r) => <ReviewCard key={r.id} review={r} />)
          ) : (
            <Card className="p-6 text-sm font-semibold text-slate-700">No reviews yet—be the first.</Card>
          )}
        </div>
      </section>
    </div>
  );
}
