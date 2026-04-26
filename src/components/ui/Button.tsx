import type { ButtonHTMLAttributes } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  /** Translucent + white text for use on brick / dark brand bars */
  | "onDarkSecondary"
  | "onDarkGhost"
  /** Gold CTA on brick (matches infographic accent) */
  | "gold";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

/**
 * Small button system so pages stay consistent (Scotty’s Courie palette).
 */
export function Button({ variant = "primary", className = "", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-sm font-semibold transition " +
    "focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

  const styles: Record<Variant, string> = {
    primary:
      "bg-courie-brick text-white shadow-sm hover:bg-courie-brick-hover active:bg-courie-brick-active",
    secondary:
      "bg-white text-courie-ink ring-1 ring-courie-cream-deep hover:bg-courie-cream active:bg-courie-cream-deep/80",
    ghost: "bg-transparent text-courie-muted hover:bg-courie-cream-deep/60 active:bg-courie-cream-deep",
    onDarkSecondary:
      "bg-white/10 text-white ring-1 ring-white/35 hover:bg-white/20 active:bg-white/25",
    onDarkGhost: "bg-transparent text-white/90 hover:bg-white/10 active:bg-white/15",
    gold: "bg-courie-gold text-courie-ink shadow-sm hover:bg-courie-gold-hover active:brightness-95",
  };

  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
}
