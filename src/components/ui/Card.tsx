type Props = {
  children: React.ReactNode;
  className?: string;
};

/** Rounded “product card” container used across the app */
export function Card({ children, className = "" }: Props) {
  return (
    <div className={`rounded-2xl bg-white shadow-soft ring-1 ring-slate-200/60 ${className}`}>{children}</div>
  );
}
