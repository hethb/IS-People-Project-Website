import { Badge } from "../ui/Badge";

type Props = {
  title: string;
  body: string;
};

/** Used to explain moderation / verification in “plain student English.” */
export function TrustCallout({ title, body }: Props) {
  return (
    <div className="rounded-2xl border border-teal-200/70 bg-gradient-to-br from-teal-50 to-white p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="brand">Trust & safety</Badge>
        <span className="text-xs font-semibold text-teal-900/70">Designed for honest feedback</span>
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-700">{body}</p>
    </div>
  );
}
