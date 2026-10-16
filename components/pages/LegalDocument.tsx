"use client";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/components/providers/I18n";
import type { LegalSection } from "@/content/pages.fr";
import s from "./LegalDocument.module.css";

export function LegalDocument({ sections, updated }: { sections: readonly LegalSection[]; updated: string }) {
  const { p, r, locale } = useI18n();
  const builtOn = new Date(`${process.env.NEXT_PUBLIC_BUILD_DATE}T12:00:00Z`);
  const updatedOn = isNaN(builtOn.getTime()) ? "" : builtOn.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [sections]);

  return (
    <div className={`container ${s.wrap}`}>
      <nav className={s.toc} aria-label={p.ui.toc}>
        <span className={`label ${s.tocTitle}`}>{p.ui.toc}</span>
        <ol>
          {sections.map((sec) => (
            <li key={sec.id}>
              <a href={`#${sec.id}`} className={`${s.tocLink} ${active === sec.id ? s.tocOn : ""}`}>
                {sec.title.replace(/^\d+\.\s*/, "")}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <article className={s.doc}>
        <p className={s.updated}>{updated} {updatedOn}</p>
        {sections.map((sec, i) => (
          <Reveal key={sec.id} delay={Math.min(i, 3) * 0.04}>
            <section id={sec.id} className={s.section} aria-labelledby={`${sec.id}-title`}>
              <h2 id={`${sec.id}-title`} className={`h3 ${s.sectionTitle}`}>
                {sec.title}
              </h2>
              {sec.paragraphs.map((p, k) => (
                <p key={k}>{p}</p>
              ))}
              {sec.bullets && (
                <ul className={s.bullets}>
                  {sec.bullets.map((b, k) => (
                    <li key={k}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          </Reveal>
        ))}
        <p className={s.note}>
          {p.ui.legalAsk} <a href={r("contact")}>{p.ui.legalAskLink}</a>.
        </p>
      </article>
    </div>
  );
}
