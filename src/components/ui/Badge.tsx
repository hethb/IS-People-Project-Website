type Props = {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "brand";
};

/** Compact label for trust signals + filters */
export function Badge({ children, tone = "neutral" }: Props) {
  const tones: Record<NonNullable<Props["tone"]>, string> = {
    neutral: "bg-courie-cream-deep/80 text-courie-muted ring-courie-cream-deep",
    success: "bg-white/90 text-courie-brick ring-courie-brick/25",
    warning: "bg-courie-gold/25 text-courie-ink ring-courie-gold/50",
    brand: "bg-courie-brick text-white ring-white/25",
  };

  return (
    <span
      className={`inline-flex items-center rounded-sm px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
