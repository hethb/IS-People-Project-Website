import { Link } from "react-router-dom";
import { HeroSearch } from "../components/home/HeroSearch";
import { ListingCard } from "../components/listings/ListingCard";
import { TrustCallout } from "../components/trust/TrustCallout";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { mockListings } from "../data/mockListings";

/**
 * Home: brand + value proposition + “network effects” CTAs (post/review/browse).
 * Mock “featured listings” pulls the first 3 items for a polished demo.
 */
export function HomePage() {
  const featured = mockListings.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10 bg-courie-brick text-white">
        <div className="absolute inset-0">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-courie-gold/15 blur-3xl" />
          <div className="absolute -bottom-44 -right-44 h-[28rem] w-[28rem] rounded-full bg-black/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <Badge tone="brand">Student-first housing</Badge>
              <Badge tone="success">Verified reviews (demo)</Badge>
              <Badge tone="warning">Anonymous option</Badge>
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              Find off-campus housing you can actually trust.
            </h1>
            <p className="mt-4 text-base font-semibold leading-relaxed text-white/85 sm:text-lg">
              Student Roost centers affordability, campus proximity, semester-friendly leases, and transparent landlord
              signals—so you can rent with more confidence and less guesswork.
            </p>
            <HeroSearch variant="onBrick" />

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/listings">
                <Button type="button" variant="onDarkSecondary" className="w-full sm:w-auto">
                  Browse all listings
                </Button>
              </Link>
              <Link to="/reviews/new">
                <Button type="button" variant="onDarkGhost" className="w-full sm:w-auto">
                  Share a review (build the community)
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Peer transparency",
                body: "Reviews emphasize student realities: deposits, maintenance, lease quirks—not just glossy photos.",
              },
              {
                title: "Campus proximity",
                body: "Walk times and neighborhood context help you optimize for schedules, night classes, and safety.",
              },
              {
                title: "Lease fit",
                body: "Filter for semester and academic-year options that match how students actually move.",
              },
            ].map((x) => (
              <Card key={x.title} className="border border-white/15 bg-white/95 p-5 text-courie-ink shadow-none backdrop-blur-sm">
                <p className="text-sm font-extrabold">{x.title}</p>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-courie-muted">{x.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <TrustCallout
            title="Trust isn’t a vibe—it’s a set of visible signals"
            body="This prototype highlights verified student reviews, safety signals, and moderation notes. In a real
            launch, you’d combine school email verification, anti-brigading checks, and clear appeals workflows."
          />
          <Card className="p-6">
            <p className="text-sm font-extrabold text-courie-ink">Privacy calculus, designed in</p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-courie-muted">
              Honest reviews can carry retaliation risk. Student Roost makes anonymity and safety cues explicit, so
              students can choose how visible they want to be—without pretending privacy is “one-size-fits-all.”
            </p>
            <div className="mt-4 rounded-lg bg-courie-cream p-4 ring-1 ring-courie-cream-deep">
              <p className="text-xs font-bold uppercase tracking-wide text-courie-brick">What you’ll see on listings</p>
              <ul className="mt-3 space-y-2 text-sm font-semibold text-courie-muted">
                <li>Verified student review badges (mock)</li>
                <li>Safety signal meter + explanation</li>
                <li>Landlord response patterns and transparency notes</li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* FEATURED */}
      <section className="border-t border-courie-cream-deep bg-courie-cream py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-courie-brick">Featured near campus</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-courie-ink">
                Start with strong options
              </h2>
              <p className="mt-2 max-w-2xl text-sm font-semibold text-courie-muted">
                Cards are reusable components driven by mock data—swap in your API later without redesigning the UI.
              </p>
            </div>
            <Link to="/listings" className="text-sm font-extrabold text-courie-brick hover:text-courie-brick-hover">
              View map browse →
            </Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {featured.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Card className="overflow-hidden">
          <div className="grid gap-8 p-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-courie-ink">
                Make the marketplace smarter
              </h2>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-courie-muted">
                Platforms get better with participation. If you’ve rented in this area, add a review. If you have a
                sublease, post it with student-friendly details.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link to="/reviews/new">
                <Button type="button" className="w-full sm:w-auto">
                  Submit a review
                </Button>
              </Link>
              <Link to="/listings/new">
                <Button type="button" variant="secondary" className="w-full sm:w-auto">
                  Post a listing
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
