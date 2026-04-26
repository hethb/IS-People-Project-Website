import { FormEvent, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TrustCallout } from "../components/trust/TrustCallout";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { mockListings } from "../data/mockListings";

/**
 * Review submission UI (mock): emphasizes anonymity + verification framing.
 * No backend—on submit we show a friendly confirmation state.
 */
export function SubmitReviewPage() {
  const [params] = useSearchParams();
  const defaultListingId = params.get("listingId") ?? "";

  const [listingId, setListingId] = useState(defaultListingId);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [tags, setTags] = useState("maintenance, communication");
  const [submitted, setSubmitted] = useState(false);

  const listing = useMemo(() => mockListings.find((l) => l.id === listingId), [listingId]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap gap-2">
        <Badge tone="brand">Community contribution</Badge>
        <Badge tone="warning">Anonymous option</Badge>
      </div>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-courie-ink">Submit a student review</h1>
      <p className="mt-2 max-w-3xl text-sm font-semibold leading-relaxed text-courie-muted">
        Reviews help shift power toward renters—especially when they’re specific, fair, and verifiable. This form is a
        front-end prototype (no data is saved).
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
        <Card className="p-6">
          {!submitted ? (
            <form className="space-y-5" onSubmit={onSubmit}>
              <div>
                <label className="text-xs font-extrabold text-courie-muted" htmlFor="listing">
                  Listing
                </label>
                <select
                  id="listing"
                  className="mt-2 w-full rounded-sm border border-courie-cream-deep bg-white px-3 py-3 text-sm font-semibold text-courie-ink outline-none ring-courie-brick/30 focus:ring-4"
                  value={listingId}
                  onChange={(e) => setListingId(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Choose a listing…
                  </option>
                  {mockListings.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.title}
                    </option>
                  ))}
                </select>
                {listing ? (
                  <p className="mt-2 text-xs font-semibold text-courie-muted">
                    You’re reviewing: <span className="font-extrabold text-courie-ink">{listing.title}</span>{" "}
                    <Link className="font-extrabold text-courie-brick hover:text-courie-brick-hover" to={`/listings/${listing.id}`}>
                      (view)
                    </Link>
                  </p>
                ) : null}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-courie-muted" htmlFor="rating">
                    Overall rating
                  </label>
                  <span className="text-xs font-extrabold text-courie-ink">{rating} / 5</span>
                </div>
                <input
                  id="rating"
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="mt-2 w-full accent-courie-brick"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-courie-muted" htmlFor="rtitle">
                  Review title
                </label>
                <input
                  id="rtitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Short headline (ex: “Deposit returned on time”)"
                  className="mt-2 w-full rounded-sm border border-courie-cream-deep bg-white px-3 py-3 text-sm font-semibold text-courie-ink outline-none ring-courie-brick/30 focus:ring-4"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-courie-muted" htmlFor="rbody">
                  What should other students know?
                </label>
                <textarea
                  id="rbody"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  rows={6}
                  placeholder="Be specific: communication, repairs, fees, move-in condition, safety at night…"
                  className="mt-2 w-full rounded-sm border border-courie-cream-deep bg-white px-3 py-3 text-sm font-semibold text-courie-ink outline-none ring-courie-brick/30 focus:ring-4"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-courie-muted" htmlFor="tags">
                  Tags (comma-separated)
                </label>
                <input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="mt-2 w-full rounded-sm border border-courie-cream-deep bg-white px-3 py-3 text-sm font-semibold text-courie-ink outline-none ring-courie-brick/30 focus:ring-4"
                />
              </div>

              <label className="flex items-start gap-3 rounded-lg bg-courie-cream p-4 ring-1 ring-courie-cream-deep/70">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="mt-1 h-5 w-5 accent-courie-brick"
                />
                <span>
                  <span className="text-sm font-extrabold text-courie-ink">Post anonymously</span>
                  <span className="mt-1 block text-xs font-semibold leading-relaxed text-courie-muted">
                    Privacy calculus: anonymity can increase honesty, but platforms still need abuse prevention. This demo
                    simply toggles the UI promise.
                  </span>
                </span>
              </label>

              <label className="flex items-start gap-3 rounded-lg bg-white p-4 ring-1 ring-courie-cream-deep/70">
                <input type="checkbox" disabled className="mt-1 h-5 w-5 accent-courie-muted/50" />
                <span>
                  <span className="text-sm font-extrabold text-courie-ink">Verified student (demo disabled)</span>
                  <span className="mt-1 block text-xs font-semibold leading-relaxed text-courie-muted">
                    In production, verification might require a school email + enrollment check, with clear disclosure.
                  </span>
                </span>
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="submit" className="w-full sm:flex-1">
                  Submit review (mock)
                </Button>
                <Link to="/listings" className="sm:flex-1">
                  <Button type="button" variant="secondary" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          ) : (
            <div>
              <h2 className="text-xl font-black text-courie-ink">Thanks—your review would be queued next</h2>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-courie-muted">
                This prototype doesn’t persist data. For your demo, treat this as the “happy path” confirmation screen.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to="/listings">
                  <Button type="button" className="w-full sm:w-auto">
                    Back to browse
                  </Button>
                </Link>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setSubmitted(false);
                    setTitle("");
                    setBody("");
                  }}
                >
                  Write another
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="space-y-5">
          <TrustCallout
            title="Good reviews reduce information asymmetry"
            body="Students are often first-time renters. Structured prompts (fees, maintenance, lease clarity) improve comparability
            and make the marketplace more valuable for everyone—posters and searchers alike."
          />
          <Card className="p-6">
            <p className="text-sm font-extrabold text-courie-ink">Moderation notes (example)</p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-courie-muted">
              Student Roost could publish how reviews are screened, what counts as evidence, and how landlords can respond
              without chilling honest criticism.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
