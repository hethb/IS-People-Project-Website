import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

/** Sign-up UI shell (mock): emphasizes student email + basic safety copy. */
export function SignUpPage() {
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
          <Badge tone="success">Student-centered</Badge>
        </div>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Create your account</h1>
        <p className="mt-2 text-sm font-semibold text-slate-600">
          A credible student marketplace usually starts with a school email and clear privacy expectations.
        </p>

        <Card className="mt-6 p-6">
          {!done ? (
            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="text-xs font-extrabold text-slate-700" htmlFor="name">
                  Display name
                </label>
                <input
                  id="name"
                  autoComplete="name"
                  placeholder="Alex"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-900 outline-none ring-teal-500/30 focus:ring-4"
                />
              </div>
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
                  autoComplete="new-password"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-900 outline-none ring-teal-500/30 focus:ring-4"
                />
              </div>

              <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/70">
                <input type="checkbox" required className="mt-1 h-5 w-5 accent-teal-700" />
                <span className="text-xs font-semibold leading-relaxed text-slate-700">
                  I agree to the Terms and Privacy Policy (placeholder text for a class prototype).
                </span>
              </label>

              <Button type="submit" className="w-full">
                Create account (mock)
              </Button>
              <p className="text-center text-xs font-semibold text-slate-600">
                Already have an account?{" "}
                <Link className="font-extrabold text-teal-800 hover:text-teal-900" to="/auth/sign-in">
                  Sign in
                </Link>
              </p>
            </form>
          ) : (
            <div>
              <p className="text-sm font-extrabold text-slate-900">Account created (prototype)</p>
              <p className="mt-2 text-sm font-semibold text-slate-600">Next step in production: email verification.</p>
              <div className="mt-5">
                <Link to="/listings">
                  <Button type="button" className="w-full">
                    Start browsing
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
