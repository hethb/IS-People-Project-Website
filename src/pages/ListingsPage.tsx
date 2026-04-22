import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterPanel } from "../components/listings/FilterPanel";
import { ListingCard } from "../components/listings/ListingCard";
import { ListingMap } from "../components/listings/ListingMap";
import { Badge } from "../components/ui/Badge";
import { mockListings } from "../data/mockListings";
import { useListingFilters } from "../hooks/useListingFilters";

/**
 * Browse experience: filters + cards + map-style module.
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
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Badge tone="brand">Browse</Badge>
          <Badge tone="neutral">{filtered.length} matches</Badge>
          {q ? <Badge tone="warning">Keyword: “{q}”</Badge> : null}
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Off-campus listings</h1>
        <p className="max-w-3xl text-sm font-semibold leading-relaxed text-slate-600">
          Use student filters on the left (desktop) and explore the map module on the right. Pins deep-link into listing
          details for a realistic demo flow.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-4">
          <FilterPanel value={filters} onChange={setFilters} onReset={reset} />
          <div className="mt-4 rounded-2xl bg-white p-4 text-xs font-semibold leading-relaxed text-slate-600 ring-1 ring-slate-200/70">
            Tip: combine <span className="font-extrabold text-slate-900">walk time</span> with{" "}
            <span className="font-extrabold text-slate-900">safety signal</span> to mimic how students actually trade off
            price vs peace of mind.
          </div>
        </div>

        <div className="space-y-6 lg:col-span-8">
          <ListingMap listings={filtered.length ? filtered : base} />

          {filtered.length === 0 ? (
            <div className="rounded-2xl bg-white p-6 text-sm font-semibold text-slate-700 ring-1 ring-slate-200/70">
              No listings match those filters. Try resetting—or widening rent/walk time.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {filtered.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
