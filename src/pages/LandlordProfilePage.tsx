import { Link, useParams } from "react-router-dom";
import { ListingCard } from "../components/listings/ListingCard";
import { ReviewCard } from "../components/reviews/ReviewCard";
import { TrustCallout } from "../components/trust/TrustCallout";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { getLandlordById, getListingsForLandlord, getReviewsForLandlord } from "../data/selectors";

/**
 * Landlord / PM profile: aggregates listings + reviews to support “multi-sided” trust.
 */
export function LandlordProfilePage() {
  const { landlordId } = useParams();
  const landlord = landlordId ? getLandlordById(landlordId) : undefined;

  if (!landlord) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Card className="p-8">
          <h1 className="text-2xl font-black text-slate-900">Profile not found</h1>
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

  const listings = getListingsForLandlord(landlord.id);
  const reviews = getReviewsForLandlord(landlord.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap gap-2">
        <Badge tone="brand">{landlord.type === "property_management" ? "Property management" : "Landlord"}</Badge>
        <Badge tone="neutral">{landlord.listingsCount} listings (mock total)</Badge>
        <Badge tone="success">Trust score {landlord.trustScore.toFixed(1)} / 5 (demo)</Badge>
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-3 lg:items-start">
        <Card className="p-6 lg:col-span-2">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">{landlord.name}</h1>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">{landlord.bio}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/70">
              <p className="text-xs font-bold text-slate-500">Response time</p>
              <p className="mt-1 text-sm font-extrabold text-slate-900">{landlord.responseTimeLabel}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/70">
              <p className="text-xs font-bold text-slate-500">Years active</p>
              <p className="mt-1 text-sm font-extrabold text-slate-900">{landlord.yearsActive}+</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/70">
              <p className="text-xs font-bold text-slate-500">Open listings</p>
              <p className="mt-1 text-sm font-extrabold text-slate-900">{listings.length} in demo</p>
            </div>
          </div>

          {landlord.moderationNote ? (
            <div className="mt-6">
              <TrustCallout title="Moderation transparency" body={landlord.moderationNote} />
            </div>
          ) : null}
        </Card>

        <Card className="p-6">
          <p className="text-sm font-extrabold text-slate-900">For your class narrative</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
            A landlord profile is where “network effects” meet “trust theory”: more reviews make profiles more informative,
            which attracts more renters—if the platform protects authenticity.
          </p>
          <div className="mt-4">
            <Link to="/reviews/new" className="text-sm font-extrabold text-teal-800 hover:text-teal-900">
              Write a review →
            </Link>
          </div>
        </Card>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-black text-slate-900">Active listings (demo subset)</h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-black text-slate-900">Recent reviews</h2>
        <div className="mt-5 grid gap-4">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </section>
    </div>
  );
}
