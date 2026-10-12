"use client";
import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useI18n } from "@/components/providers/I18n";
import type { FaqData } from "@/lib/faq";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import s from "./FaqExplorer.module.css";

function normalize(t: string) {
  return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function FaqExplorer({ faq }: { faq: FaqData }) {
  const { p, r } = useI18n();
  const { faqPage, ui } = p;
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("all");
  const q = normalize(query.trim());
  const words = q.split(/\s+/).filter((w) => w.length > 1);

  const categories = useMemo(
    () =>
      faq.categories
        .filter((c) => active === "all" || c.key === active)
        .map((c) => ({
          ...c,
          items: c.items.filter((it) => {
            if (!words.length) return true;
            const hay = normalize(it.q + " " + it.a);
            // chaque mot doit apparaître (préfixe accepté : "perdu" trouve "perdue", "perds")
            return words.every((w) => hay.includes(w) || hay.includes(w.replace(/(ue|es|s|e)$/, "")));
          }),
        }))
        .filter((c) => c.items.length > 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q, active, faq]
  );

  return (
    <section className={`container ${s.wrap}`} aria-label={faqPage.pill}>
      <div className={s.toolbar}>
        <label className={s.search}>
          <MagnifyingGlass size={20} aria-hidden />
          <span className="sr-only">{ui.faqSearch}</span>
          <input type="search" placeholder={faqPage.searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <div className={s.tabs} role="tablist" aria-label={ui.faqTabs}>
          <button role="tab" aria-selected={active === "all"} className={`${s.tab} ${active === "all" ? s.tabOn : ""}`} onClick={() => setActive("all")}>
            {ui.faqAllTab}
          </button>
          {faq.categories.map((c) => (
            <button key={c.key} role="tab" aria-selected={active === c.key} className={`${s.tab} ${active === c.key ? s.tabOn : ""}`} onClick={() => setActive(c.key)}>
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {categories.length === 0 ? (
        <p className={s.empty} role="status">
          {faqPage.empty}
        </p>
      ) : (
        <div className={s.groups}>
          {categories.map((c, i) => (
            <Reveal key={c.key} delay={i * 0.05}>
              <div id={c.key} className={s.group}>
                <h2 className={`h3 ${s.groupTitle}`}>{c.title}</h2>
                <Accordion items={c.items} idPrefix={`faq-${c.key}`} defaultOpen={q ? 0 : null} />
              </div>
            </Reveal>
          ))}
        </div>
      )}

      <div className={s.help}>
        <p className="body-l">{ui.faqHelp}</p>
        <div className={s.helpActions}>
          <Button href={r("support")} variant="navy">
            {ui.faqHelpSupport}
          </Button>
          <Button href={r("contact")} variant="ghost">
            {ui.faqHelpContact}
          </Button>
        </div>
      </div>
    </section>
  );
}
