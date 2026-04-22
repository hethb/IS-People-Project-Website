import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Card className="p-10 text-center">
        <p className="text-xs font-extrabold uppercase tracking-wide text-slate-500">404</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">That page isn’t roosting here</h1>
        <p className="mt-3 text-sm font-semibold text-slate-600">The route doesn’t exist in this prototype.</p>
        <div className="mt-8 flex justify-center">
          <Link to="/">
            <Button type="button">Go home</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
