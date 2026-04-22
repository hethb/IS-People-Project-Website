import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="text-sm font-extrabold text-slate-900">Student Roost</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            A student-first marketplace prototype: affordability signals, campus proximity, and peer transparency.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Explore</p>
          <ul className="mt-3 space-y-2 text-sm font-semibold text-slate-700">
            <li>
              <Link className="hover:text-teal-800" to="/listings">
                Browse listings
              </Link>
            </li>
            <li>
              <Link className="hover:text-teal-800" to="/reviews/new">
                Submit a review
              </Link>
            </li>
            <li>
              <Link className="hover:text-teal-800" to="/listings/new">
                Post a listing
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Privacy</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Reviews can be posted anonymously to reduce retaliation risk (prototype UI). In production, this would be
            paired with abuse prevention and verification workflows.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-200/70 py-6 text-center text-xs text-slate-500">
        Demo content only — not a real rental service.
      </div>
    </footer>
  );
}
