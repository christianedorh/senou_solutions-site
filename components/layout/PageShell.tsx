import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { HOLIDAY } from "@/lib/holiday";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav visible holiday={HOLIDAY} />
      <main id="contenu" style={{ paddingTop: "calc(var(--section) + 24px)" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
