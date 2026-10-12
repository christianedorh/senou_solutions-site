import { describe, it, expect } from "vitest";
import { splitWords, cleanHref } from "@/lib/format";
import { switchPath, route } from "@/content/i18n";

describe("splitWords", () => {
  it("splits on whitespace and drops empties", () => {
    expect(splitWords("  Le digital  sur mesure. ")).toEqual(["Le", "digital", "sur", "mesure."]);
  });
});

describe("cleanHref", () => {
  it("removes the slash before a hash on localized home links", () => {
    expect(cleanHref("/en/#services")).toBe("/en#services");
  });
  it("keeps the root anchor untouched", () => {
    expect(cleanHref("/#services")).toBe("/#services");
  });
});

describe("switchPath", () => {
  it("maps each page to its counterpart in the other language", () => {
    expect(switchPath("/", "en")).toBe("/en");
    expect(switchPath("/en", "fr")).toBe("/");
    expect(switchPath("/conditions-generales", "en")).toBe("/en/terms");
    expect(switchPath("/en/privacy/", "fr")).toBe("/politique-de-confidentialite");
  });
  it("falls back to the home page for unknown paths", () => {
    expect(switchPath("/inconnu", "en")).toBe("/en");
  });
  it("builds localized routes", () => {
    expect(route("faq", "en")).toBe("/en/faq");
  });
});
