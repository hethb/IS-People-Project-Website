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
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Sign in</h1>
        <p className="mt-2 text-sm font-semibold text-slate-600">Welcome back—pick up where you left off.</p>

        <Card className="mt-6 p-6">
          {!done ? (
            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="text-xs font-extrabold text-slate-700" htmlFor="email">
                  School email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@school.edu"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-900 outline-none ring-teal-500/30 focus:ring-4"
                />
              </div>
              <div>
                <label className="text-xs font-extrabold text-slate-700" htmlFor="pw">
                  Password
                </label>
                <input
                  id="pw"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-900 outline-none ring-teal-500/30 focus:ring-4"
                />
              </div>
              <Button type="submit" className="w-full">
                Sign in (mock)
              </Button>
              <p className="text-center text-xs font-semibold text-slate-600">
                New here?{" "}
                <Link className="font-extrabold text-teal-800 hover:text-teal-900" to="/auth/sign-up">
                  Create an account
                </Link>
              </p>
            </form>
          ) : (
            <div>
              <p className="text-sm font-extrabold text-slate-900">Signed in (prototype)</p>
              <p className="mt-2 text-sm font-semibold text-slate-600">No session is created—this is UI-only.</p>
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
