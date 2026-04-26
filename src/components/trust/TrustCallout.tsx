import { Badge } from "../ui/Badge";

type Props = {
  title: string;
  body: string;
};

/** Used to explain moderation / verification in “plain student English.” */
export function TrustCallout({ title, body }: Props) {
  return (
    <div className="rounded-lg border border-courie-brick/20 bg-gradient-to-br from-courie-cream to-white p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="brand">Trust & safety</Badge>
        <span className="text-xs font-semibold text-courie-brick">Designed for honest feedback</span>
      </div>
      <p className="mt-3 text-sm font-semibold text-courie-ink">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-courie-muted">{body}</p>
    </div>
  );
}
