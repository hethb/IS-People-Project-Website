import { Link } from "react-router-dom";
import { Reveal, Stagger, StaggerItem } from "../components/motion/scroll";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const sections = [
  { id: "problem", label: "Problem" },
  { id: "solution", label: "IS solution" },
  { id: "strategy", label: "Strategy" },
  { id: "theories", label: "Theories" },
  { id: "impact", label: "Impact" },
  { id: "team", label: "Team" },
] as const;

/**
 * IS course narrative: problem, solution, strategy, social theories, impact, and team.
 * Sticky mini-nav and anchor sections support visual storytelling and scannable structure.
 */
export function ProjectPage() {
  return (
    <div className="bg-courie-cream">
      {/* Hero intro */}
      <header className="border-b border-courie-cream-deep/80 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
          <p className="text-xs font-bold uppercase tracking-widest text-courie-brick">Information systems project</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-courie-ink sm:text-4xl">
            Scotty's Courie: a student housing marketplace
          </h1>
          <p className="mt-4 text-sm font-medium leading-relaxed text-courie-muted sm:text-base">
            This page walks through the real-world problem, our information-systems solution (with the interactive
            prototype you can try on this site), strategic analysis, social theories, expected impact, and how the team
            worked together. Use the section links to jump, or read top to bottom.
          </p>
        </div>

        <nav
          className="sticky top-20 z-30 border-t border-courie-cream-deep/60 bg-courie-cream/95 py-2 backdrop-blur md:top-16"
          aria-label="Project sections"
        >
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-1.5 px-2 sm:justify-start sm:px-6">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-sm border border-courie-cream-deep/80 bg-white px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-courie-ink transition hover:border-courie-brick/40 hover:text-courie-brick sm:text-xs"
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <div className="mx-auto max-w-3xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">
        <SectionProblem />
        <SectionSolution />
        <SectionStrategy />
        <SectionTheories />
        <SectionImpact />
        <SectionTeam />

        <Reveal y={20}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-courie-muted">Explore the working prototype and listings.</p>
            <div className="flex flex-wrap gap-2">
              <Link to="/listings">
                <Button type="button">Open map browse</Button>
              </Link>
              <Link to="/">
                <Button type="button" variant="secondary">
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function SectionProblem() {
  return (
    <section id="problem" className="scroll-mt-28 sm:scroll-mt-24">
      <Reveal y={20}>
        <h2 className="text-2xl font-bold text-courie-ink">1. The opportunity, problem, and context</h2>
        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-courie-brick">What we are trying to change</p>
      </Reveal>

      <Reveal y={16} className="mt-6" delay={0.05}>
        <Card className="p-6">
          <p className="text-sm font-semibold leading-relaxed text-courie-muted">
            <span className="font-bold text-courie-ink">Primary users</span> are university students who need
            off-campus housing near campus. <span className="font-bold text-courie-ink">Secondary users</span> may
            include students who sublease or list their own units—so the system must support at least one peer-to-peer
            side that lists housing, not just search.
          </p>
        </Card>
      </Reveal>

      <Stagger className="mt-6 space-y-3" stagger={0.05}>
        {[
          "Housing information is scattered across informal channels (e.g. group chats and social media), so students spend excessive time piecing together options and miss risks.",
          "Students can face predatory leasing, opaque fees, and pressure to sign before they understand the terms—especially when inexperienced renters meet experienced landlords or managers.",
          "Review quality is uneven: some feedback is honest; some may be promotional or retaliatory, which erodes trust and makes it hard to compare landlords fairly.",
          "Local shortages and high cost of living tighten the market; the power gap between new renters and long-term property owners can leave students with worse outcomes and more stress—hurting well-being and academic success.",
        ].map((t) => (
          <StaggerItem key={t}>
            <Card className="border-l-4 border-l-courie-brick p-4 pr-4">
              <p className="text-sm font-medium leading-relaxed text-courie-muted">{t}</p>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal y={18} className="mt-6">
        <Card className="border-courie-gold/50 bg-courie-cream/50 p-5">
          <p className="text-sm font-bold text-courie-ink">Design aim</p>
          <p className="mt-2 text-sm font-medium leading-relaxed text-courie-muted">
            Scotty's Courie is intended to <span className="text-courie-ink">reduce the difficulty of finding a safer, more
            affordable place to live</span> and to <span className="text-courie-ink">improve the sense of well-being and
            support academic success</span> by making trusted, student-relevant information easier to find and use than
            fragmented, generic alternatives.
          </p>
        </Card>
      </Reveal>
    </section>
  );
}

function SectionSolution() {
  return (
    <section id="solution" className="scroll-mt-28 sm:scroll-mt-24">
      <Reveal y={20}>
        <h2 className="text-2xl font-bold text-courie-ink">2. Information systems solution (concept + prototype)</h2>
        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-courie-brick">Concept, visuals, and wireframe</p>
      </Reveal>

      <Reveal y={16} className="mt-6">
        <p className="text-sm font-medium leading-relaxed text-courie-muted">
          Conceptually, the solution is a <span className="font-bold text-courie-ink">peer-to-peer web platform</span> (with
          a path to a companion mobile app) and a <span className="font-bold text-courie-ink">data layer</span> (listings,
          reviews, users, and verification in production) dedicated to the off-campus student rental marketplace—not a
          general national portal.
        </p>
      </Reveal>

      <div className="mt-6 rounded-lg border border-courie-cream-deep bg-white p-4 ring-1 ring-courie-cream-deep/50">
        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-courie-muted">Browse experience</p>
        <p className="mt-1 text-center text-xs text-courie-muted">Wireframe — split layout (as built on /listings)</p>
        <div className="mt-4 grid min-h-[140px] grid-cols-1 gap-2 sm:grid-cols-[1fr_1.5fr]">
          <div className="flex flex-col gap-2">
            <div className="rounded-sm border-2 border-dashed border-courie-brick/40 bg-courie-cream/80 p-3 text-center text-[11px] font-bold text-courie-ink">
              Student filters
            </div>
            <div className="min-h-8 rounded-sm border border-courie-cream-deep bg-white p-2 text-center text-[10px] text-courie-muted">
              Rent, walk, beds, trust toggles
            </div>
          </div>
          <div className="flex min-h-0 flex-col gap-2">
            <div className="min-h-24 flex-1 rounded-sm border-2 border-dashed border-courie-brick/40 bg-slate-900/90 p-2 text-center text-[11px] font-bold text-white">
              Interactive map
            </div>
            <div className="min-h-12 rounded-sm border border-courie-cream-deep bg-courie-cream/60 p-2 text-center text-[10px] text-courie-ink">
              Listing cards
            </div>
          </div>
        </div>
      </div>

      <Reveal y={16} className="mt-6">
        <p className="text-sm font-bold text-courie-ink">Key system capabilities (aligned with the prototype)</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-medium text-courie-muted">
          <li>
            <span className="text-courie-ink">Interactive map</span> (OpenStreetMap by default, optional Google) with
            listing pins and campus context.
          </li>
          <li>
            <span className="text-courie-ink">Student-tuned search</span>: affordability, walk time, lease fit, and
            safety / trust signals—filters students actually use.
          </li>
          <li>
            <span className="text-courie-ink">Reviews and landlord context</span>: property and landlord pages with
            review flows and transparency cues (in production, paired with stronger verification and moderation).
          </li>
          <li>
            <span className="text-courie-ink">Listings and reviews flows</span>: post listing, submit review (prototype
            UI; backend in a full deployment).
          </li>
        </ul>
        <p className="mt-4 text-sm font-medium text-courie-muted">
          <span className="font-bold text-courie-ink">Try it:</span> the live UI on this site is the working mock: start at{" "}
          <Link className="font-bold text-courie-brick underline" to="/listings">
            /listings
          </Link>{" "}
          and open any property, landlord profile, and review form.
        </p>
      </Reveal>
    </section>
  );
}

function SectionStrategy() {
  return (
    <section id="strategy" className="scroll-mt-28 sm:scroll-mt-24">
      <Reveal y={20}>
        <h2 className="text-2xl font-bold text-courie-ink">3. Strategic analysis</h2>
        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-courie-brick">Value, value chain, positioning</p>
      </Reveal>

      <div className="mt-6 space-y-4 text-sm font-medium leading-relaxed text-courie-muted">
        <Reveal y={16}>
          <Card className="p-5">
            <h3 className="font-bold text-courie-ink">Multi-sided platform and peer content</h3>
            <p className="mt-2">
              The platform is <span className="text-courie-ink">multi-sided</span>: it connects students searching for
              housing, students (or other actors) who supply listings, and the audience that reads and writes
              reviews. <span className="text-courie-ink">Value is co-created</span> through user-generated listings and
              reviews—the database and interfaces only realize that value if participation grows.
            </p>
          </Card>
        </Reveal>
        <Reveal y={16} delay={0.05}>
          <Card className="p-5">
            <h3 className="font-bold text-courie-ink">Value chain (simplified)</h3>
            <p className="mt-2">
              <span className="text-courie-ink">In-bound:</span> student and listing data, optional verification,
              mapping services, moderation rules. <span className="text-courie-ink">Core:</span> search, map, and trust
              UI. <span className="text-courie-ink">Out-bound:</span> better-matched tenancies, fewer bad surprises, and
              sustained engagement that reinforces data quality. At scale, operations, trust & safety, and campus
              partnerships would sit at the center of delivery.
            </p>
          </Card>
        </Reveal>
        <Reveal y={16} delay={0.08}>
          <Card className="p-5">
            <h3 className="font-bold text-courie-ink">Competitive positioning</h3>
            <p className="mt-2">
              General real estate marketplaces (e.g. Zillow) optimize for scale and a broad public; they are not
              structurally focused on <span className="text-courie-ink">semester windows, walk-to-class tradeoffs, and
              student-typical risk</span>. Scotty's Courie aims to{" "}
              <span className="text-courie-ink">differentiate on the student niche</span>: the same job-to-be-done
              (find housing) is served with filters, language, and trust features tuned to this audience—supporting
              <span className="text-courie-ink"> better positioning</span> as the student-first channel on campus, not
              a generic home search.
            </p>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

function SectionTheories() {
  return (
    <section id="theories" className="scroll-mt-28 sm:scroll-mt-24">
      <Reveal y={20}>
        <h2 className="text-2xl font-bold text-courie-ink">4. Social / behavioral theories in application</h2>
        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-courie-brick">How we reason about users</p>
      </Reveal>

      <div className="mt-6 space-y-4">
        <Reveal y={16}>
          <Card className="p-5">
            <div className="mb-2">
              <Badge tone="brand">Platform & network effects</Badge>
            </div>
            <h3 className="font-bold text-courie-ink">Multi-sided value and network growth</h3>
            <p className="mt-2 text-sm font-medium leading-relaxed text-courie-muted">
              <span className="text-courie-ink">Platform theory</span> highlights that value arises when different user
              groups interact. <span className="text-courie-ink">Network effects</span> mean the system's value to each
              user can rise as more students participate—listings, reviews, and map density all improve. If too few
              people contribute reviews, neighborhood-level credibility suffers and the platform cannot signal safety
              and quality; everyone sees weaker data. The UI therefore nudges participation (reviews, listings) to build
              the network.
            </p>
          </Card>
        </Reveal>
        <Reveal y={16} delay={0.05}>
          <Card className="p-5">
            <div className="mb-2">
              <Badge tone="success">Trust</Badge>
            </div>
            <h3 className="font-bold text-courie-ink">Adoption and resistance</h3>
            <p className="mt-2 text-sm font-medium leading-relaxed text-courie-muted">
              <span className="text-courie-ink">Trust theory</span> (as used in IS and HCI) posits that users adopt
              technology when it appears competent, dependable, and aligned with their interests. If students suspect
              that reviews are faked, spammed, or are landlords posing as students, <span className="text-courie-ink">
                trust erodes and resistance</span> grows. The prototype surfaces verification (demo), review patterns,
              and clear moderation copy as placeholders for a production trust stack.
            </p>
          </Card>
        </Reveal>
        <Reveal y={16} delay={0.08}>
          <Card className="p-5">
            <div className="mb-2">
              <Badge tone="warning">Privacy calculus</Badge>
            </div>
            <h3 className="font-bold text-courie-ink">Risk–benefit tradeoffs on sensitive reviews</h3>
            <p className="mt-2 text-sm font-medium leading-relaxed text-courie-muted">
              <span className="text-courie-ink">Privacy calculus theory</span> describes that people weigh expected
              benefits and risks before disclosing. A student leaving a candid negative review may expect their peers to
              benefit, but also fear <span className="text-courie-ink">retaliation or loss of a deposit</span>. That
              tradeoff can suppress honest signals unless the product makes anonymity, appeals, and limits on misuse
              legible. The sign-up and review UIs in this project reflect that by supporting anonymous options (prototype)
              and by stating privacy tradeoffs in trust copy.
            </p>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

function SectionImpact() {
  return (
    <section id="impact" className="scroll-mt-28 sm:scroll-mt-24">
      <Reveal y={20}>
        <h2 className="text-2xl font-bold text-courie-ink">5. Expected impact</h2>
        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-courie-brick">Organizational and societal</p>
      </Reveal>

      <Stagger className="mt-6 grid gap-4 sm:grid-cols-2" stagger={0.1}>
        <StaggerItem>
          <Card className="h-full p-5">
            <h3 className="font-bold text-courie-ink">Organizational (platform and partners)</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm text-courie-muted">
              <li>Shorter, lower-friction search cycles for a defined student market.</li>
              <li>Data on demand patterns, locations, and trust that can inform campus and city conversations.</li>
              <li>Basis for future partnerships (housing, student life, local government) with shared metrics.</li>
            </ul>
          </Card>
        </StaggerItem>
        <StaggerItem>
          <Card className="h-full p-5">
            <h3 className="font-bold text-courie-ink">Societal</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm text-courie-muted">
              <li>More information equity: especially for first-time renters and marginalized students.</li>
              <li>Potential reduction in predatory or opaque deals through transparency and social proof.</li>
              <li>Downstream well-being: less housing stress is tied to better academic and health outcomes (aspirational).</li>
            </ul>
          </Card>
        </StaggerItem>
      </Stagger>
    </section>
  );
}

function SectionTeam() {
  return (
    <section id="team" className="scroll-mt-28 sm:scroll-mt-24">
      <Reveal y={20}>
        <h2 className="text-2xl font-bold text-courie-ink">6. Team collaboration</h2>
        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-courie-brick">How we worked together</p>
      </Reveal>

      <Reveal y={16} className="mt-6">
        <p className="text-sm font-medium text-courie-muted">
          Use the table below in your final deliverable: replace the placeholder members with your actual names, or
          list group roles the way your instructor expects.
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-courie-cream-deep bg-white">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead className="bg-courie-cream/80 text-xs font-bold uppercase tracking-wide text-courie-ink">
              <tr>
                <th className="px-4 py-3">Teammate</th>
                <th className="px-4 py-3">Primary role</th>
                <th className="px-4 py-3">Contributions (fill in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-courie-cream-deep/80 text-courie-muted">
              <tr>
                <td className="px-4 py-3 font-semibold text-courie-ink">Member A</td>
                <td className="px-4 py-3">Problem framing, IS strategy, theory write-up</td>
                <td className="px-4 py-3">e.g. literature, competitive analysis, final narrative</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-courie-ink">Member B</td>
                <td className="px-4 py-3">UX / visual / infographic & poster</td>
                <td className="px-4 py-3">e.g. wireframes, style system, public-facing story</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-courie-ink">Member C</td>
                <td className="px-4 py-3">Prototype (web) & demo</td>
                <td className="px-4 py-3">e.g. app build, map, filters, routes</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-courie-muted/90">
          Collaboration process: regular sync on requirements, design–dev handoff for the browse and detail pages, and
          shared ownership of the written project sections (you can adjust this blurb to match your actual process).
        </p>
      </Reveal>
    </section>
  );
}
