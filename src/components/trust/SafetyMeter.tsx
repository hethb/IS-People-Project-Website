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
    <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200/60">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-1 text-sm text-slate-700">
            Based on renter reports about lighting, access control, maintenance responsiveness, and walkability at night
            (demo).
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-900">{s.toFixed(1)}</p>
          <p className="text-xs text-slate-500">out of 5</p>
        </div>
      </div>
      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-teal-600" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
