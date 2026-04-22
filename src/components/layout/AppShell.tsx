import { Footer } from "./Footer";
import { Header } from "./Header";

type Props = {
  children: React.ReactNode;
};

/** Shared page chrome: header + footer + centered content column */
export function AppShell({ children }: Props) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
