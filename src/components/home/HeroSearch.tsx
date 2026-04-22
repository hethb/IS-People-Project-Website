import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";

/**
 * Hero search is intentionally simple for a prototype:
 * it routes users into Browse with a query string you can later wire to real search.
 */
export function HeroSearch() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    navigate(`/listings?${params.toString()}`);
  }

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
        className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm outline-none ring-teal-500/30 placeholder:font-medium placeholder:text-slate-400 focus:ring-4"
      />
      <Button type="submit" className="w-full sm:w-auto sm:shrink-0 sm:px-6">
        Search housing
      </Button>
    </form>
  );
}
