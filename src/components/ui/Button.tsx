import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

/**
 * Small button system so pages stay consistent.
 * `variant` maps to Tailwind classes for a cohesive “startup” look.
 */
export function Button({ variant = "primary", className = "", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition " +
    "focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

  const styles: Record<Variant, string> = {
    primary: "bg-teal-700 text-white shadow-sm hover:bg-teal-800 active:bg-teal-900",
    secondary:
      "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 active:bg-slate-100",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200/70",
  };

  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
}
