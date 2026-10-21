import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL, LOCALES, type RouteKey } from "@/content/i18n";

// Export statique : fichier généré au build.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(ROUTES) as RouteKey[]).flatMap((key) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}${ROUTES[key][locale]}`,
      alternates: { languages: { fr: `${SITE_URL}${ROUTES[key].fr}`, en: `${SITE_URL}${ROUTES[key].en}` } },
      changeFrequency: "monthly" as const,
      priority: key === "home" ? 1 : 0.5,
    }))
  );
}
