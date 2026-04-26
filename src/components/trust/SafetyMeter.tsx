type Props = {
  /** 1–5 */
  score: number;
  label?: string;
};

/** Simple “trust meter” for property safety signals (mock logic, real UX pattern). */
export function SafetyMeter({ score, label = "Safety signal" }: Props) {
  const s = Math.max(1, Math.min(5, score));
  const pct = (s / 5) * 100;

  return (
    <div className="rounded-lg bg-white p-4 ring-1 ring-courie-cream-deep/60">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-courie-muted/90">{label}</p>
          <p className="mt-1 text-sm text-courie-muted">
            Based on renter reports about lighting, access control, maintenance responsiveness, and walkability at night
            (demo).
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-courie-ink">{s.toFixed(1)}</p>
          <p className="text-xs text-courie-muted/90">out of 5</p>
        </div>
      </div>
      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-courie-cream-deep">
        <div className="h-full rounded-full bg-courie-brick" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
