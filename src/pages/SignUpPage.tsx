import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const ANDREW_EMAIL_SUFFIX = "@andrew.cmu.edu";

function isAndrewCmuEmail(email: string): boolean {
  const e = email.trim().toLowerCase();
  return e.endsWith(ANDREW_EMAIL_SUFFIX) && e.length > ANDREW_EMAIL_SUFFIX.length;
}

/** Sign-up UI shell (mock): emphasizes student email + basic safety copy. */
export function SignUpPage() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setEmailError(null);
    if (!isAndrewCmuEmail(email)) {
      setEmailError(`You must sign up with an Andrew ID ending in ${ANDREW_EMAIL_SUFFIX}.`);
      return;
    }
    setDone(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-md">
        <div className="flex flex-wrap gap-2">
          <Badge tone="brand">Auth UI</Badge>
          <Badge tone="success">Student-centered</Badge>
        </div>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-courie-ink">Create your account</h1>
        <p className="mt-2 text-sm font-semibold text-courie-muted">
          A credible student marketplace usually starts with a school email and clear privacy expectations.
        </p>

        <Card className="mt-6 p-6">
          {!done ? (
            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="text-xs font-extrabold text-courie-muted" htmlFor="name">
                  Display name
                </label>
                <input
                  id="name"
                  autoComplete="name"
                  placeholder="Alex"
                  required
                  className="mt-2 w-full rounded-sm border border-courie-cream-deep bg-white px-3 py-3 text-sm font-semibold text-courie-ink outline-none ring-courie-brick/30 focus:ring-4"
                />
              </div>
              <div>
                <label className="text-xs font-extrabold text-courie-muted" htmlFor="email">
                  School email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={`you${ANDREW_EMAIL_SUFFIX}`}
                  required
                  value={email}
                  onChange={(ev) => {
                    setEmail(ev.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={emailError ? "email-error" : undefined}
                  className={`mt-2 w-full rounded-sm border bg-white px-3 py-3 text-sm font-semibold text-courie-ink outline-none ring-courie-brick/30 focus:ring-4 ${
                    emailError ? "border-red-500/80" : "border-courie-cream-deep"
                  }`}
                />
                {emailError ? (
                  <p id="email-error" className="mt-2 text-xs font-semibold text-red-700" role="alert">
                    {emailError}
                  </p>
                ) : (
                  <p className="mt-1 text-xs font-semibold text-courie-muted/90">
                    Only <span className="font-extrabold text-courie-ink">{ANDREW_EMAIL_SUFFIX}</span> addresses are
                    accepted.
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs font-extrabold text-courie-muted" htmlFor="pw">
                  Password
                </label>
                <input
                  id="pw"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-2 w-full rounded-sm border border-courie-cream-deep bg-white px-3 py-3 text-sm font-semibold text-courie-ink outline-none ring-courie-brick/30 focus:ring-4"
                />
              </div>

              <label className="flex items-start gap-3 rounded-lg bg-courie-cream p-4 ring-1 ring-courie-cream-deep/70">
                <input type="checkbox" required className="mt-1 h-5 w-5 accent-courie-brick" />
                <span className="text-xs font-semibold leading-relaxed text-courie-muted">
                  I agree to the Terms and Privacy Policy (placeholder text for a class prototype).
                </span>
              </label>

              <Button type="submit" className="w-full">
                Create account (mock)
              </Button>
              <p className="text-center text-xs font-semibold text-courie-muted">
                Already have an account?{" "}
                <Link className="font-extrabold text-courie-brick hover:text-courie-brick-hover" to="/auth/sign-in">
                  Sign in
                </Link>
              </p>
            </form>
          ) : (
            <div>
              <p className="text-sm font-extrabold text-courie-ink">Account created (prototype)</p>
              <p className="mt-2 text-sm font-semibold text-courie-muted">Next step in production: email verification.</p>
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
