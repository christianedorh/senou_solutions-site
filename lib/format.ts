/** Découpe sur les espaces ordinaires seulement : les espaces insécables restent dans le mot. */
export function splitWords(text: string): string[] {
  return text.split(/[ \t\n\r]+/).filter(Boolean);
}

const NNBSP = "\u202f";
/** Typographie française : espace fine insécable avant « : ; ! ? » et dans les guillemets. */
export function frenchSpacing(text: string): string {
  return text
    .replace(/ ([:;!?»])/g, `${NNBSP}$1`)
    .replace(/« /g, `«${NNBSP}`);
}

/** Applique une transformation à toutes les chaînes d'un objet de contenu (clés et URL exclues). */
export function mapStrings<T>(value: T, fn: (s: string) => string): T {
  if (typeof value === "string") return (/^(https?:|mailto:|tel:|\/)/.test(value) ? value : fn(value)) as T;
  if (Array.isArray(value)) return value.map((v) => mapStrings(v, fn)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k === "key" || k === "href" || k === "id" ? v : mapStrings(v, fn)])) as T;
  }
  return value;
}

/** "/en/#services" → "/en#services" : évite la redirection due à la barre oblique finale. */
export function cleanHref(href: string): string {
  return href.replace(/(.)\/#/, "$1#");
}
