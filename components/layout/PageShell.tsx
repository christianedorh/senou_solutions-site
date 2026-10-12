import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav visible />
      <main id="contenu" style={{ paddingTop: "calc(var(--section) + 24px)" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
