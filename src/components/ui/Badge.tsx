type Props = {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "brand";
};

/** Compact label for trust signals + filters */
export function Badge({ children, tone = "neutral" }: Props) {
  const tones: Record<NonNullable<Props["tone"]>, string> = {
    neutral: "bg-slate-100 text-slate-700 ring-slate-200/60",
    success: "bg-emerald-50 text-emerald-800 ring-emerald-200/60",
    warning: "bg-amber-50 text-amber-900 ring-amber-200/60",
    brand: "bg-teal-50 text-teal-900 ring-teal-200/60",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
