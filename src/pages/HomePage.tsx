import { Link } from "react-router-dom";
import { HeroSearch } from "../components/home/HeroSearch";
import { ListingCard } from "../components/listings/ListingCard";
import { HomeHeroParallaxOrbs, Reveal, Stagger, StaggerItem } from "../components/motion/scroll";
import { TrustCallout } from "../components/trust/TrustCallout";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { mockListings } from "../data/mockListings";

/**
 * Home: hero + visual story (problem / theory hook / CTA) + live prototype teaser (featured listings).
 */
export function HomePage() {
  const featured = mockListings.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10 bg-courie-brick text-white">
        <HomeHeroParallaxOrbs />

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <Stagger className="max-w-3xl">
            <StaggerItem>
              <div className="flex flex-wrap gap-2">
                <Badge tone="brand">IS course project</Badge>
                <Badge tone="success">Map + reviews prototype</Badge>
                <Badge tone="warning">Trust &amp; privacy built in</Badge>
              </div>
            </StaggerItem>
            <StaggerItem>
              <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
                Off-campus housing you can understand—not guess.
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-4 text-base font-semibold leading-relaxed text-white/85 sm:text-lg">
                Scotty's Courie is our information-systems response to scattered housing info, uneven reviews, and the
                power gap between students and landlords. The full story—problem, solution, strategy, social theories,
                impact, and team—is on the project page. Below, you can use the same prototype the write-up describes.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Link to="/project">
                  <Button type="button" variant="gold" className="w-full sm:w-auto">
                    Read the project narrative
                  </Button>
                </Link>
                <span className="text-xs font-semibold text-white/60">or jump into the app ↓</span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-4">
                <HeroSearch variant="onBrick" />
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link to="/listings">
                  <Button type="button" variant="onDarkSecondary" className="w-full sm:w-auto">
                    Browse all listings
                  </Button>
                </Link>
                <Link to="/reviews/new">
                  <Button type="button" variant="onDarkGhost" className="w-full sm:w-auto">
                    Contribute a review
                  </Button>
                </Link>
              </div>
            </StaggerItem>
          </Stagger>

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-3" stagger={0.12}>
            {[
              {
                title: "Problem & context",
                body: "Students juggle group chats, informal posts, and generic listings—so risks hide in plain sight, and time-to-safe-housing is too long. We frame the real-world problem on the project page.",
              },
              {
                title: "IS solution & story",
                body: "A multi-sided, peer-content platform: map browse, student filters, listings, and review flows. Wireframe and live UI match our conceptual model (see /project).",
              },
              {
                title: "Strategy & theories",
                body: "Differentiation vs. broad portals, network effects, trust, and privacy calculus are spelled out for grading—and reflected in the demo (badges, anonymity, safety cues).",
              },
            ].map((x) => (
              <StaggerItem key={x.title}>
                <Card className="h-full border border-white/15 bg-white/95 p-5 text-courie-ink shadow-none backdrop-blur-sm">
                  <p className="text-sm font-extrabold">{x.title}</p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-courie-muted">{x.body}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* TRUST — teaser linking to project */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <Reveal x={-20} className="h-full" amount={0.2}>
            <TrustCallout
              title="Trust is a design problem—not only a data problem"
              body="Our prototype surfaces verification (demo), review patterns, landlord context, and moderation copy as placeholders. The project page explains trust theory, privacy tradeoffs, and what full production would require to prevent gaming or landlord sock-puppets."
            />
          </Reveal>
          <Reveal x={20} delay={0.08} className="h-full" amount={0.2}>
            <Card className="p-6">
              <p className="text-sm font-extrabold text-courie-ink">Why a dedicated student product?</p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-courie-muted">
                General sites are not built for semester windows, walk-to-class tradeoffs, or the lived stress of
                off-campus life. The strategic section compares this niche to one-size-fits-all marketplaces and walks
                through the value we intend to co-create with students and listers.
              </p>
              <div className="mt-4">
                <Link
                  to="/project#theories"
                  className="text-sm font-extrabold text-courie-brick hover:text-courie-brick-hover"
                >
                  Open social theory section →
                </Link>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* FEATURED */}
      <section className="border-t border-courie-cream-deep bg-courie-cream py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal y={20}>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wide text-courie-brick">Prototype: browse experience</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-courie-ink">Map + cards (mock data)</h2>
                <p className="mt-2 max-w-2xl text-sm font-semibold text-courie-muted">
                  The listing cards and map on /listings are the “visuals” of our information system solution—use them in
                  class to show the interactive part of the deliverable, alongside the /project write-up.
                </p>
              </div>
              <Link to="/listings" className="text-sm font-extrabold text-courie-brick hover:text-courie-brick-hover">
                Open map browse →
              </Link>
            </div>
          </Reveal>

          <Stagger className="mt-8 grid gap-5 lg:grid-cols-3" stagger={0.1}>
            {featured.map((l) => (
              <StaggerItem key={l.id}>
                <ListingCard listing={l} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Reveal y={32} amount={0.25}>
          <Card className="overflow-hidden will-change-transform">
            <div className="grid gap-8 p-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-courie-ink">Contribute to the (mock) network</h2>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-courie-muted">
                  Network effects only work with participation: reviews and listings are how peer value appears in the
                  system. The project page names expected organizational and societal impact; here you can click through
                  the same flows.
                </p>
                <p className="mt-4 text-sm font-semibold text-courie-muted">
                  <Link to="/project#impact" className="font-extrabold text-courie-brick hover:text-courie-brick-hover">
                    Read expected impact →
                  </Link>
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link to="/project">
                  <Button type="button" variant="secondary" className="w-full sm:w-auto">
                    Full project story
                  </Button>
                </Link>
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
        </Reveal>
      </section>
    </div>
  );
}
