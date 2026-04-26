import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-courie-brick text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="text-sm font-extrabold">Scotty's Courie</p>
          <p className="mt-2 text-sm leading-relaxed text-white/80">
            A student housing IS project: problem framing, platform strategy, theory, and a working web prototype (demo
            data only).
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-courie-gold">Explore</p>
          <ul className="mt-3 space-y-2 text-sm font-semibold text-white/90">
            <li>
              <Link className="hover:text-courie-gold" to="/project">
                Project narrative (IS)
              </Link>
            </li>
            <li>
              <Link className="hover:text-courie-gold" to="/listings">
                Browse listings
              </Link>
            </li>
            <li>
              <Link className="hover:text-courie-gold" to="/reviews/new">
                Submit a review
              </Link>
            </li>
            <li>
              <Link className="hover:text-courie-gold" to="/listings/new">
                Post a listing
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-courie-gold">Privacy</p>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Reviews can be posted anonymously to reduce retaliation risk (prototype UI). In production, this would be
            paired with abuse prevention and verification workflows.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/65">
        Demo content only — not a real rental service.
      </div>
    </footer>
  );
}
