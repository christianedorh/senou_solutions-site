import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { parseCsv, faqFromRows, fallbackFaq } from "@/lib/faq";

describe("parseCsv", () => {
  it("handles quotes, commas and line breaks inside cells", () => {
    const rows = parseCsv('a,b\r\n"x, y","il a dit ""oui""\nvraiment"\n');
    expect(rows).toEqual([["a", "b"], ["x, y", 'il a dit "oui"\nvraiment']]);
  });
});

describe("faqFromRows", () => {
  const csv = `Langue,Catégorie,Question,Réponse,Accueil,Ordre
fr,Services,Q2,R2,,2
fr,Services,Q1,R1,oui,1
fr,Paiement,Q3,R3,OUI,3
en,Services,EQ,EA,yes,1`;
  it("groups by category, sorts by order and filters by language", () => {
    const fr = faqFromRows(parseCsv(csv), "fr")!;
    expect(fr.categories.map((c) => [c.key, c.items.map((i) => i.q)])).toEqual([
      ["services", ["Q1", "Q2"]],
      ["paiement", ["Q3"]],
    ]);
    expect(fr.home.map((i) => i.q)).toEqual(["Q1", "Q3"]);
    expect(faqFromRows(parseCsv(csv), "en")!.home).toEqual([{ q: "EQ", a: "EA" }]);
  });
  it("applies French spacing to French rows only", () => {
    const rows = parseCsv("langue,question,reponse\nfr,Une question ?,Oui : bien sûr\nen,A question?,Yes : sure");
    expect(faqFromRows(rows, "fr")!.home[0]).toEqual({ q: "Une question\u202f?", a: "Oui\u202f: bien sûr" });
    expect(faqFromRows(rows, "en")!.home[0]).toEqual({ q: "A question?", a: "Yes : sure" });
  });
  it("returns null when the sheet has nothing usable", () => {
    expect(faqFromRows(parseCsv("foo,bar\n1,2"), "fr")).toBeNull();
    expect(faqFromRows(parseCsv(csv), "en")).not.toBeNull();
  });
  it("reads the provided template back into the same FAQ", () => {
    const rows = parseCsv(readFileSync("content/faq-modele.csv", "utf8"));
    for (const locale of ["fr", "en"] as const) {
      const fromSheet = faqFromRows(rows, locale)!;
      const sheetItems = fromSheet.categories.flatMap((c) => c.items);
      for (const it of fallbackFaq(locale).categories.flatMap((c) => c.items)) expect(sheetItems).toContainEqual(it);
      for (const it of fallbackFaq(locale).home) expect(fromSheet.home.map((h) => h.q)).toContain(it.q);
    }
  });
});
