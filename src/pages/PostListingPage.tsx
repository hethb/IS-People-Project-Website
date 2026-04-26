import type { InputHTMLAttributes } from "react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { TrustCallout } from "../components/trust/TrustCallout";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

/**
 * Post listing UI (mock): intended for trusted posters (landlords / subleases).
 * Collects the student-relevant fields your concept paper cares about.
 */
export function PostListingPage() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap gap-2">
        <Badge tone="brand">Supply-side</Badge>
        <Badge tone="neutral">Mock form</Badge>
      </div>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-courie-ink">Post a listing</h1>
      <p className="mt-2 max-w-3xl text-sm font-semibold leading-relaxed text-courie-muted">
        A strong student marketplace needs trustworthy inventory. This page is a realistic intake form UI—connect it to
        your backend later.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
        <Card className="p-6">
          {!submitted ? (
            <form className="space-y-5" onSubmit={onSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Listing title" id="title" placeholder="Ex: Walkable 2BR — semester lease OK" />
                <Field label="Monthly rent" id="rent" placeholder="1295" inputMode="numeric" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Neighborhood" id="hood" placeholder="University District" />
                <Field label="Walk minutes to campus" id="walk" placeholder="12" inputMode="numeric" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Select
                  label="Bedrooms"
                  id="beds"
                  options={[
                    { v: "0", t: "Studio" },
                    { v: "1", t: "1" },
                    { v: "2", t: "2" },
                    { v: "3", t: "3" },
                    { v: "4", t: "4+" },
                  ]}
                />
                <Select
                  label="Bathrooms"
                  id="baths"
                  options={[
                    { v: "1", t: "1" },
                    { v: "2", t: "2" },
                    { v: "3", t: "3+" },
                  ]}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <ToggleRow label="Furnished" id="furn" />
                <ToggleRow label="Pet friendly" id="pets" />
              </div>

              <div>
                <label className="text-xs font-extrabold text-courie-muted" htmlFor="leases">
                  Lease types offered
                </label>
                <p className="mt-1 text-xs font-semibold text-courie-muted/90">Hold Cmd/Ctrl to select multiple (demo).</p>
                <select
                  id="leases"
                  multiple
                  required
                  className="mt-2 h-28 w-full rounded-sm border border-courie-cream-deep bg-white px-3 py-2 text-sm font-semibold text-courie-ink outline-none ring-courie-brick/30 focus:ring-4"
                >
                  <option>Semester</option>
                  <option>Academic year</option>
                  <option>Full year</option>
                  <option>Month-to-month</option>
                </select>
              </div>

              <Field label="Photo URL (demo)" id="img" placeholder="https://…" />
              <Field label="Transparency: fees & move-in costs" id="fees" placeholder="Ex: admin fee $35; refundable deposit 1x rent" />

              <label className="flex items-start gap-3 rounded-lg bg-courie-cream p-4 ring-1 ring-courie-cream-deep/70">
                <input type="checkbox" required className="mt-1 h-5 w-5 accent-courie-brick" />
                <span className="text-sm font-semibold leading-relaxed text-courie-muted">
                  I agree to post accurate information and understand reviews may be publicly visible (prototype copy).
                </span>
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="submit" className="w-full sm:flex-1">
                  Publish listing (mock)
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
              <h2 className="text-xl font-black text-courie-ink">Listing received (mock)</h2>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-courie-muted">
                In a real workflow you’d verify ownership, dedupe spam, and optionally highlight student-friendly lease
                options once validated.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to="/listings">
                  <Button type="button" className="w-full sm:w-auto">
                    View browse
                  </Button>
                </Link>
                <Button type="button" variant="secondary" onClick={() => setSubmitted(false)}>
                  Post another
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="space-y-5">
          <TrustCallout
            title="Why posters should contribute structured data"
            body="Network effects improve when listings include the fields students filter on: walk time, lease flexibility, fees,
            and safety-relevant building features. That reduces wasted tours and builds trust faster."
          />
          <Card className="p-6">
            <p className="text-sm font-extrabold text-courie-ink">Trust prompts you can mention in class</p>
            <ul className="mt-3 space-y-2 text-sm font-semibold text-courie-muted">
              <li>Identity verification for landlords (concept)</li>
              <li>Fee disclosure checklist (concept)</li>
              <li>Review authenticity signals + appeals (concept)</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  placeholder,
  inputMode,
}: {
  label: string;
  id: string;
  placeholder?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <div>
      <label className="text-xs font-extrabold text-courie-muted" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        inputMode={inputMode}
        required
        className="mt-2 w-full rounded-sm border border-courie-cream-deep bg-white px-3 py-3 text-sm font-semibold text-courie-ink outline-none ring-courie-brick/30 focus:ring-4"
      />
    </div>
  );
}

function Select({
  label,
  id,
  options,
}: {
  label: string;
  id: string;
  options: { v: string; t: string }[];
}) {
  return (
    <div>
      <label className="text-xs font-extrabold text-courie-muted" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        required
        className="mt-2 w-full rounded-sm border border-courie-cream-deep bg-white px-3 py-3 text-sm font-semibold text-courie-ink outline-none ring-courie-brick/30 focus:ring-4"
      >
        {options.map((o) => (
          <option key={o.v} value={o.v}>
            {o.t}
          </option>
        ))}
      </select>
    </div>
  );
}

function ToggleRow({ label, id }: { label: string; id: string }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-sm bg-courie-cream px-3 py-3 ring-1 ring-courie-cream-deep/70">
      <span className="text-sm font-extrabold text-courie-ink">{label}</span>
      <input id={id} type="checkbox" className="h-5 w-5 accent-courie-brick" />
    </label>
  );
}
