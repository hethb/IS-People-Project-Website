import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/Button";

const navClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-sm px-3 py-2 text-sm font-semibold transition ${
    isActive ? "bg-white/15 text-white" : "text-white/85 hover:bg-white/10"
  }`;

/**
 * Top navigation: keeps routes discoverable for demos and matches “marketplace” mental models.
 */
export function Header() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const headerShadow = useTransform(
    scrollY,
    [0, 28, 120],
    [
      "0 0 0 0 rgba(0,0,0,0)",
      "0 10px 30px -10px rgba(0,0,0,0.22)",
      "0 22px 50px -14px rgba(0,0,0,0.38)",
    ],
  );

  if (reduce) {
    return (
      <header className="sticky top-0 z-40 border-b border-white/15 bg-courie-brick/95 text-white backdrop-blur">
        <HeaderBar />
      </header>
    );
  }

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-white/15 bg-courie-brick/95 text-white backdrop-blur will-change-transform"
      style={{ boxShadow: headerShadow }}
    >
      <HeaderBar />
    </motion.header>
  );
}

function HeaderBar() {
  return (
    <>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm bg-courie-gold text-sm font-black text-courie-ink">
              SC
            </span>
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-tight text-white">Scotty's Courie</div>
              <div className="hidden text-xs font-semibold text-white/70 sm:block">Housing built for students</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink to="/project" className={navClass}>
              Project
            </NavLink>
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
            <Button type="button" variant="onDarkGhost" className="px-3">
              Sign in
            </Button>
          </Link>
          <Link to="/auth/sign-up">
            <Button type="button" variant="gold" className="px-4">
              Sign up
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile nav strip: keeps core actions reachable without a hamburger menu */}
      <div className="mx-auto flex max-w-6xl gap-2 border-t border-white/10 px-4 py-2 sm:px-6 md:hidden">
        <NavLink to="/project" className={navClass}>
          Project
        </NavLink>
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
    </>
  );
}
