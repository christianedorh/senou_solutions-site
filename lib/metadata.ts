import type { Metadata } from "next";
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
