import type { Review } from "../../types/models";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { StarRating } from "../ui/StarRating";
import { VerifiedStudentPill } from "../trust/VerifiedPill";

type Props = {
  review: Review;
};

/** Review card: highlights verification + anonymity choices (privacy calculus). */
export function ReviewCard({ review }: Props) {
  const who = review.anonymous ? "Anonymous student" : review.authorDisplayName;

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StarRating value={review.rating} size="sm" />
            {review.verifiedStudent ? <VerifiedStudentPill /> : null}
            {review.anonymous ? <Badge tone="warning">Anonymous</Badge> : null}
          </div>
          <p className="mt-2 text-base font-bold text-slate-900">{review.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">{review.body}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs font-semibold text-slate-500">{who}</p>
          <p className="mt-1 text-xs font-semibold text-slate-400">{review.createdAt}</p>
        </div>
      </div>

      {review.tags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {review.tags.map((t) => (
            <span key={t} className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200/60">
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </Card>
  );
}
