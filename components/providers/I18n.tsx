"use client";
import { createContext, useContext } from "react";
import { getDict, getPages, route, type Locale, type RouteKey } from "@/content/i18n";

const LocaleContext = createContext<Locale>("fr");

export function I18nProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/** Langue courante, textes de l'accueil (t), pages et libellés (p), et chemins localisés (r). */
export function useI18n() {
  const locale = useContext(LocaleContext);
  return { locale, t: getDict(locale), p: getPages(locale), r: (key: RouteKey) => route(key, locale) };
}
