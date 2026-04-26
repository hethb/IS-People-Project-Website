import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterPanel } from "../components/listings/FilterPanel";
import { ListingCard } from "../components/listings/ListingCard";
import { ListingMap } from "../components/listings/ListingMap";
import { Reveal, Stagger, StaggerItem } from "../components/motion/scroll";
import { Badge } from "../components/ui/Badge";
import { mockListings } from "../data/mockListings";
import { useListingFilters } from "../hooks/useListingFilters";

/**
 * Browse: sticky student filters (left) + large map module (right) + results grid, similar to a split map search UI.
 * `q` from the hero search is applied as a lightweight keyword filter (prototype).
 */
export function ListingsPage() {
  const [params] = useSearchParams();
  const q = (params.get("q") ?? "").trim().toLowerCase();

  const base = useMemo(() => {
    if (!q) return mockListings;
    return mockListings.filter((l) => {
      const hay = `${l.title} ${l.neighborhood} ${l.summary}`.toLowerCase();
      return hay.includes(q);
    });
  }, [q]);

  const { filters, setFilters, filtered, reset } = useListingFilters(base);

  return (
    <div className="min-h-dvh bg-courie-cream">
      <div className="mx-auto max-w-[1440px] px-4 pb-12 pt-8 sm:px-6 lg:pt-10">
        <Reveal y={20}>
          <header className="mb-8 border-b border-courie-cream-deep/70 pb-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="brand">Browse</Badge>
              <Badge tone="neutral">{filtered.length} matches</Badge>
              {q ? <Badge tone="warning">Keyword: “{q}”</Badge> : null}
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-courie-ink">Off-campus listings</h1>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-courie-muted">
              Filters stay on the left; the map stays in view while you scan results—same flow as a dedicated housing
              search tool.
            </p>
          </header>
        </Reveal>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(280px,340px)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[minmax(300px,360px)_minmax(0,1fr)]">
          <Reveal x={-20} y={0} className="min-w-0" amount={0.12}>
            <aside className="space-y-4 lg:sticky lg:top-20 lg:z-10 lg:max-h-[calc(100dvh-5.5rem)] lg:self-start lg:overflow-y-auto lg:pr-1">
              <FilterPanel value={filters} onChange={setFilters} onReset={reset} />
              <div className="rounded-lg border border-courie-cream-deep/80 bg-white p-4 text-xs font-medium leading-relaxed text-courie-muted shadow-sm">
                Tip: combine <span className="font-semibold text-courie-ink">walk time</span> with{" "}
                <span className="font-semibold text-courie-ink">safety signal</span> the way students actually trade off
                rent vs. peace of mind.
              </div>
            </aside>
          </Reveal>

          <Reveal x={24} y={0} delay={0.08} className="min-w-0" amount={0.1}>
            <div className="space-y-10">
              <ListingMap layout="browse" listings={filtered} />

              <section aria-labelledby="listings-results-heading">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-courie-cream-deep/60 pb-4">
                  <h2 id="listings-results-heading" className="text-lg font-bold text-courie-ink">
                    Matching homes
                    <span className="ml-2 font-semibold text-courie-muted">({filtered.length})</span>
                  </h2>
                </div>

                {filtered.length === 0 ? (
                  <div className="rounded-lg border border-courie-cream-deep/80 bg-white p-8 text-sm font-medium text-courie-muted shadow-sm">
                    No listings match those filters. Try resetting—or widening rent and walk time.
                  </div>
                ) : (
                  <Stagger className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" stagger={0.09}>
                    {filtered.map((l) => (
                      <StaggerItem key={l.id}>
                        <ListingCard listing={l} />
                      </StaggerItem>
                    ))}
                  </Stagger>
                )}
              </section>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
