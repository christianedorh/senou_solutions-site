// Dictionnaires FR / EN et routes par langue. Le français est servi à la racine, l'anglais sous /en.
import { fr } from "./fr";
import { en } from "./en";
import { pagesFr } from "./pages.fr";
import { pagesEn } from "./pages.en";
import { frenchSpacing, mapStrings } from "@/lib/format";

export type Locale = "fr" | "en";
export const LOCALES: readonly Locale[] = ["fr", "en"];

/** Élargit les littéraux `as const` pour que FR et EN partagent un même type. */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends null
      ? null
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : { readonly [K in keyof T]: Widen<T[K]> };

export type Dict = Widen<typeof fr>;
export type Pages = Widen<typeof pagesFr>;

// Les deux affectations vérifient la parité des clés entre les langues.
const DICTS: Record<Locale, Dict> = { fr: mapStrings<Dict>(fr, frenchSpacing), en };
const PAGES: Record<Locale, Pages> = { fr: mapStrings<Pages>(pagesFr, frenchSpacing), en: pagesEn };

export const getDict = (locale: Locale) => DICTS[locale];
export const getPages = (locale: Locale) => PAGES[locale];

/** Pages intérieures : chemin FR ↔ chemin EN. */
export const ROUTES = {
  home: { fr: "/", en: "/en" },
  faq: { fr: "/faq", en: "/en/faq" },
  contact: { fr: "/contact", en: "/en/contact" },
  support: { fr: "/support", en: "/en/support" },
  terms: { fr: "/conditions-generales", en: "/en/terms" },
  privacy: { fr: "/politique-de-confidentialite", en: "/en/privacy" },
} as const;
export type RouteKey = keyof typeof ROUTES;

export const route = (key: RouteKey, locale: Locale) => ROUTES[key][locale];

/** Chemin équivalent dans l'autre langue (sélecteur FR/EN). */
export function switchPath(pathname: string, to: Locale): string {
  const clean = pathname.replace(/\/$/, "") || "/";
  for (const r of Object.values(ROUTES)) {
    if (r.fr === clean || r.en === clean) return r[to];
  }
  return ROUTES.home[to];
}

export const SITE_URL = "https://senousolutions.com";

/** Balises hreflang et URL canonique pour une page donnée. */
export function alternates(key: RouteKey, locale: Locale) {
  return {
    canonical: `${SITE_URL}${route(key, locale)}`,
    languages: {
      fr: `${SITE_URL}${route(key, "fr")}`,
      en: `${SITE_URL}${route(key, "en")}`,
      "x-default": `${SITE_URL}${route(key, "fr")}`,
    },
  };
}
