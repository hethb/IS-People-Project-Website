type Props = {
  children: React.ReactNode;
  className?: string;
};

/** Rounded “product card” container used across the app */
export function Card({ children, className = "" }: Props) {
  return (
    <div className={`rounded-lg bg-white shadow-soft ring-1 ring-courie-cream-deep/90 ${className}`}>{children}</div>
  );
}
