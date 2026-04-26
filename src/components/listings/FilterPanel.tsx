import type { ListingFiltersState } from "../../hooks/useListingFilters";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

type Props = {
  value: ListingFiltersState;
  onChange: (next: ListingFiltersState) => void;
  onReset: () => void;
};

/**
 * Student-first filters: affordability + campus distance + lease flexibility + safety.
 * These controls map directly onto common renter anxieties (trust + convenience).
 */
export function FilterPanel({ value, onChange, onReset }: Props) {
  function patch(partial: Partial<ListingFiltersState>) {
    onChange({ ...value, ...partial });
  }

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-extrabold text-courie-ink">Student filters</p>
          <p className="mt-1 text-xs font-semibold text-courie-muted/90">Tune results without losing transparency.</p>
        </div>
        <Button type="button" variant="ghost" className="px-3 py-2 text-xs" onClick={onReset}>
          Reset
        </Button>
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-courie-muted" htmlFor="maxPrice">
              Max monthly rent
            </label>
            <span className="text-xs font-extrabold text-courie-ink">${value.maxPrice}</span>
          </div>
          <input
            id="maxPrice"
            type="range"
            min={600}
            max={4000}
            step={25}
            value={value.maxPrice}
            onChange={(e) => patch({ maxPrice: Number(e.target.value) })}
            className="mt-2 w-full accent-courie-brick"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-courie-muted" htmlFor="walk">
              Max walk to campus
            </label>
            <span className="text-xs font-extrabold text-courie-ink">{value.maxWalkMinutes} min</span>
          </div>
          <input
            id="walk"
            type="range"
            min={5}
            max={60}
            step={1}
            value={value.maxWalkMinutes}
            onChange={(e) => patch({ maxWalkMinutes: Number(e.target.value) })}
            className="mt-2 w-full accent-courie-brick"
          />
        </div>

        <div>
          <p className="text-xs font-bold text-courie-muted">Bedrooms</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              { label: "Any", bedroomsMin: 0, studioOnly: false },
              { label: "Studio", bedroomsMin: 0, studioOnly: true },
              { label: "2+", bedroomsMin: 2, studioOnly: false },
              { label: "3+", bedroomsMin: 3, studioOnly: false },
            ].map((opt) => {
              const active =
                opt.studioOnly ? value.studioOnly : !value.studioOnly && value.bedroomsMin === opt.bedroomsMin;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => patch({ bedroomsMin: opt.bedroomsMin, studioOnly: opt.studioOnly })}
                  className={`rounded-sm px-3 py-2 text-xs font-extrabold ring-1 ring-inset transition ${
                    active ? "bg-courie-brick text-white ring-courie-brick" : "bg-white text-courie-muted ring-courie-cream-deep hover:bg-courie-cream"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-courie-muted">Minimum safety signal</p>
          <input
            type="range"
            min={1}
            max={5}
            step={0.1}
            value={value.minSafety}
            onChange={(e) => patch({ minSafety: Number(e.target.value) })}
            className="mt-2 w-full accent-courie-brick"
          />
          <p className="mt-1 text-xs font-semibold text-courie-muted/90">{value.minSafety.toFixed(1)} / 5</p>
        </div>

        <div className="space-y-3">
          <Toggle
            label="Furnished only"
            checked={value.furnishedOnly}
            onChange={(checked) => patch({ furnishedOnly: checked })}
          />
          <Toggle
            label="Pet friendly"
            checked={value.petFriendlyOnly}
            onChange={(checked) => patch({ petFriendlyOnly: checked })}
          />
          <Toggle
            label="Semester lease offered"
            checked={value.semesterLeaseOnly}
            onChange={(checked) => patch({ semesterLeaseOnly: checked })}
          />
        </div>
      </div>
    </Card>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-sm bg-courie-cream px-3 py-3 ring-1 ring-courie-cream-deep/70">
      <span className="text-sm font-bold text-courie-ink">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 accent-courie-brick"
      />
    </label>
  );
}
