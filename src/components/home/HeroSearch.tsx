import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";

type Props = {
  /** Cream input + gold CTA for the brick hero (Scotty’s Courie look). */
  variant?: "default" | "onBrick";
};

/**
 * Hero search is intentionally simple for a prototype:
 * it routes users into Browse with a query string you can later wire to real search.
 */
export function HeroSearch({ variant = "default" }: Props) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    navigate(`/listings?${params.toString()}`);
  }

  const onBrick = variant === "onBrick";
  const inputClass = onBrick
    ? "w-full rounded-sm border border-white/25 bg-courie-cream px-4 py-3 text-sm font-semibold text-courie-ink shadow-sm outline-none ring-courie-gold/35 placeholder:font-medium placeholder:text-courie-muted/70 focus:ring-4"
    : "w-full rounded-sm border border-courie-cream-deep bg-white px-4 py-3 text-sm font-semibold text-courie-ink shadow-sm outline-none ring-courie-brick/25 placeholder:font-medium placeholder:text-courie-muted/60 focus:ring-4";

  return (
    <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <label className="sr-only" htmlFor="hero-q">
        Search neighborhoods, landlords, or keywords
      </label>
      <input
        id="hero-q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Try “pet friendly”, “semester lease”, or a neighborhood…"
        className={inputClass}
      />
      <Button
        type="submit"
        variant={onBrick ? "gold" : "primary"}
        className="w-full sm:w-auto sm:shrink-0 sm:px-6"
      >
        Search housing
      </Button>
    </form>
  );
}
