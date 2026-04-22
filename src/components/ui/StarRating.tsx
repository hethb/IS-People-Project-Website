type Props = {
  /** 0–5 stars (display rounds to whole stars for simplicity). */
  value: number;
  reviewCount?: number;
  size?: "sm" | "md";
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/** Simple accessible star row (visual only; not an input). */
export function StarRating({ value, reviewCount, size = "md" }: Props) {
  const v = clamp(value, 0, 5);
  // Class demo simplicity: round to nearest whole star for the icon row.
  const filled = Math.round(v);

  const starClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  const Star = ({ kind }: { kind: "full" | "empty" }) => {
    const fill = kind === "full" ? "text-amber-400" : "text-slate-200";
    return (
      <svg viewBox="0 0 20 20" className={`${starClass} ${fill}`} aria-hidden="true">
        <path
          fill="currentColor"
          d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.9 4.06 16.71l.94-5.5-4-3.9 5.53-.8L10 1.5z"
        />
      </svg>
    );
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center" aria-label={`Rating ${v.toFixed(1)} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} kind={i < filled ? "full" : "empty"} />
        ))}
      </div>
      <div className="text-sm text-slate-600">
        <span className="font-semibold text-slate-900">{v.toFixed(1)}</span>
        {typeof reviewCount === "number" ? <span> · {reviewCount} reviews</span> : null}
      </div>
    </div>
  );
}
