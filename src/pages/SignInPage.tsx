import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

/** Sign-in UI shell (mock): enough visual realism for a class demo. */
export function SignInPage() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-md">
        <div className="flex flex-wrap gap-2">
          <Badge tone="brand">Auth UI</Badge>
          <Badge tone="neutral">Mock</Badge>
        </div>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-courie-ink">Sign in</h1>
        <p className="mt-2 text-sm font-semibold text-courie-muted">Welcome back—pick up where you left off.</p>

        <Card className="mt-6 p-6">
          {!done ? (
            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="text-xs font-extrabold text-courie-muted" htmlFor="email">
                  School email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@school.edu"
                  required
                  className="mt-2 w-full rounded-sm border border-courie-cream-deep bg-white px-3 py-3 text-sm font-semibold text-courie-ink outline-none ring-courie-brick/30 focus:ring-4"
                />
              </div>
              <div>
                <label className="text-xs font-extrabold text-courie-muted" htmlFor="pw">
                  Password
                </label>
                <input
                  id="pw"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-2 w-full rounded-sm border border-courie-cream-deep bg-white px-3 py-3 text-sm font-semibold text-courie-ink outline-none ring-courie-brick/30 focus:ring-4"
                />
              </div>
              <Button type="submit" className="w-full">
                Sign in (mock)
              </Button>
              <p className="text-center text-xs font-semibold text-courie-muted">
                New here?{" "}
                <Link className="font-extrabold text-courie-brick hover:text-courie-brick-hover" to="/auth/sign-up">
                  Create an account
                </Link>
              </p>
            </form>
          ) : (
            <div>
              <p className="text-sm font-extrabold text-courie-ink">Signed in (prototype)</p>
              <p className="mt-2 text-sm font-semibold text-courie-muted">No session is created—this is UI-only.</p>
              <div className="mt-5">
                <Link to="/listings">
                  <Button type="button" className="w-full">
                    Continue to browse
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
