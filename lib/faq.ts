// FAQ éditable hors code : une feuille Google Sheets publiée au format CSV.
// Colonnes attendues (ligne d'en-tête) : langue | categorie | question | reponse | accueil | ordre
//  - langue : fr ou en
//  - categorie : nom affiché de la catégorie (page FAQ)
//  - accueil : « oui » pour afficher la question sur la page d'accueil
//  - ordre : nombre facultatif pour trier
// L'adresse CSV se règle dans la variable d'environnement FAQ_SHEET_URL (Vercel).
// Sans adresse, ou si la feuille est vide ou injoignable, la FAQ de content/ est utilisée.
import { getDict, getPages, type Locale } from "@/content/i18n";
import { frenchSpacing, mapStrings } from "@/lib/format";

export type FaqItem = { q: string; a: string };
export type FaqCategory = { key: string; title: string; items: FaqItem[] };
export type FaqData = { home: FaqItem[]; categories: FaqCategory[] };

/** Délai de relecture de la feuille, en secondes. */
export const FAQ_REVALIDATE = 300;

export function fallbackFaq(locale: Locale): FaqData {
  return {
    home: getDict(locale).faq.items.map(({ q, a }) => ({ q, a })),
    categories: getPages(locale).faqPage.categories.map((c) => ({ key: c.key, title: c.title, items: c.items.map(({ q, a }) => ({ q, a })) })),
  };
}

const norm = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export const slug = (s: string) =>
  norm(s)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "autres";

/** Lecture CSV (guillemets, virgules et retours à la ligne dans les cellules). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim()));
}

const YES = new Set(["oui", "yes", "x", "1", "true", "vrai"]);

/** Transforme les lignes de la feuille en FAQ pour une langue. Renvoie null si rien d'exploitable. */
export function faqFromRows(rows: string[][], locale: Locale): FaqData | null {
  if (rows.length < 2) return null;
  const head = rows[0].map(norm);
  const col = (...names: string[]) => head.findIndex((h) => names.includes(h));
  const iLang = col("langue", "lang", "language");
  const iCat = col("categorie", "category");
  const iQ = col("question");
  const iA = col("reponse", "answer");
  const iHome = col("accueil", "home");
  const iOrder = col("ordre", "order");
  if (iQ < 0 || iA < 0) return null;

  const items = rows
    .slice(1)
    .map((r, n) => ({
      lang: iLang >= 0 ? norm(r[iLang] ?? "") : "fr",
      cat: (iCat >= 0 ? r[iCat] : "")?.trim() || "FAQ",
      q: (r[iQ] ?? "").trim(),
      a: (r[iA] ?? "").trim(),
      home: iHome >= 0 && YES.has(norm(r[iHome] ?? "")),
      order: iOrder >= 0 && r[iOrder]?.trim() ? Number(r[iOrder]) : n,
    }))
    .filter((it) => it.q && it.a && it.lang === locale)
    .sort((a, b) => (Number.isFinite(a.order) ? a.order : 0) - (Number.isFinite(b.order) ? b.order : 0));
  if (!items.length) return null;

  const categories: FaqCategory[] = [];
  for (const it of items) {
    let c = categories.find((x) => x.title === it.cat);
    if (!c) categories.push((c = { key: slug(it.cat), title: it.cat, items: [] }));
    c.items.push({ q: it.q, a: it.a });
  }
  const home = items.filter((it) => it.home).map(({ q, a }) => ({ q, a }));
  const faq = { home: home.length ? home : items.slice(0, 6).map(({ q, a }) => ({ q, a })), categories };
  // Même typographie que le reste du site (espaces insécables en français)
  return locale === "fr" ? mapStrings(faq, frenchSpacing) : faq;
}

export async function getFaq(locale: Locale): Promise<FaqData> {
  const url = process.env.FAQ_SHEET_URL;
  if (!url) return fallbackFaq(locale);
  try {
    const res = await fetch(url, { next: { revalidate: FAQ_REVALIDATE }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`FAQ: HTTP ${res.status}`);
    return faqFromRows(parseCsv(await res.text()), locale) ?? fallbackFaq(locale);
  } catch (e) {
    console.error("FAQ : feuille injoignable, contenu par défaut utilisé.", e);
    return fallbackFaq(locale);
  }
}
