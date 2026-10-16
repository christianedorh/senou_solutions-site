import { Plus_Jakarta_Sans } from "next/font/google";
import type { Locale } from "@/content/i18n";
import { getPages } from "@/content/i18n";
import { I18nProvider } from "@/components/providers/I18n";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { BackToTop } from "@/components/ui/BackToTop";

// Une seule famille, sobre et corporate, pour les titres comme pour le texte.
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-sans", display: "swap" });

/** Document HTML commun aux deux langues : chaque groupe de routes a son propre <html lang>. */
export function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} className={sans.variable} suppressHydrationWarning>
      <head>
        {/* Applique le thème mémorisé avant le premier rendu pour éviter un flash de fond */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("senou-theme");if(t!=="dark"&&t!=="light")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";if(t==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`,
          }}
        />
      </head>
      <body>
        <a href="#contenu" className="skip-link">
          {getPages(locale).ui.skip}
        </a>
        <I18nProvider locale={locale}>
          <SmoothScroll>
            <ScrollProgress />
            <ThemeToggle />
            <BackToTop />
            {children}
          </SmoothScroll>
        </I18nProvider>
      </body>
    </html>
  );
}
