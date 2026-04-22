import type { LeaseType } from "../types/models";

/** Pretty labels for lease types (used in filters + detail UI). */
export function formatLeaseType(t: LeaseType) {
  switch (t) {
    case "semester":
      return "Semester";
    case "academic_year":
      return "Academic year";
    case "full_year":
      return "Full year";
    case "month_to_month":
      return "Month-to-month";
    default:
      return t;
  }
}

export function formatMoney(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}
