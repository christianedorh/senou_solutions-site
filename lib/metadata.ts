import type { Metadata, Viewport } from "next";
import { alternates, getDict, getPages, SITE_URL, type Locale, type RouteKey } from "@/content/i18n";

/** Métadonnées d'une page : titre, description, hreflang et Open Graph dans la bonne langue. */
export function pageMetadata(key: RouteKey, locale: Locale): Metadata {
  const { title, description } = key === "home" ? getDict(locale).meta : getPages(locale).meta[key];
  const alt = alternates(key, locale);
  return {
    title,
    description,
    alternates: alt,
    openGraph: {
      title,
      description,
      url: alt.canonical,
      siteName: "SENOU Solutions",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
      type: "website",
    },
  };
}

export const baseMetadata: Metadata = { metadataBase: new URL(SITE_URL) };

/** Couleur de la barre d'état mobile : celle du haut de page, par thème (voir applyTheme). */
export const THEME_COLORS = { light: "#f5f8fc", dark: "#09111f" } as const;

export const baseViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Le site peut passer sous l'encoche ; les éléments fixes ajoutent env(safe-area-inset-*).
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
  ],
};
