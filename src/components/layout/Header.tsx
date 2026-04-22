import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/Button";

const navClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-semibold transition ${
    isActive ? "bg-teal-50 text-teal-900" : "text-slate-700 hover:bg-slate-100"
  }`;

/**
 * Top navigation: keeps routes discoverable for demos and matches “marketplace” mental models.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-sm font-black text-white">
              SR
            </span>
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-tight text-slate-900">Student Roost</div>
              <div className="hidden text-xs font-semibold text-slate-500 sm:block">Housing built for students</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink to="/listings" className={navClass}>
              Browse
            </NavLink>
            <NavLink to="/reviews/new" className={navClass}>
              Write a review
            </NavLink>
            <NavLink to="/listings/new" className={navClass}>
              Post a listing
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/auth/sign-in" className="hidden sm:block">
            <Button type="button" variant="ghost" className="px-3">
              Sign in
            </Button>
          </Link>
          <Link to="/auth/sign-up">
            <Button type="button" className="px-4">
              Sign up
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile nav strip: keeps core actions reachable without a hamburger menu */}
      <div className="mx-auto flex max-w-6xl gap-2 border-t border-slate-200/60 px-4 py-2 sm:px-6 md:hidden">
        <NavLink to="/listings" className={navClass}>
          Browse
        </NavLink>
        <NavLink to="/reviews/new" className={navClass}>
          Review
        </NavLink>
        <NavLink to="/listings/new" className={navClass}>
          Post
        </NavLink>
        <NavLink to="/auth/sign-in" className={navClass}>
          Sign in
        </NavLink>
      </div>
    </header>
  );
}
