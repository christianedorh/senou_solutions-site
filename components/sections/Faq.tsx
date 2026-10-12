"use client";
import { useI18n } from "@/components/providers/I18n";
import type { FaqItem } from "@/lib/faq";
import { SplitText } from "@/components/ui/SplitText";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import s from "./Faq.module.css";

export function Faq({ items }: { items: FaqItem[] }) {
  const { t, p, r } = useI18n();
  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className={`container ${s.grid}`}>
        <div className={s.head}>
          <span className="eyebrow">{p.ui.faqEyebrow}</span>
          <h2 id="faq-title" className="h2">
            <SplitText as="span" text={t.faq.title.join(" ")} accentLast />
          </h2>
          <Button href={r("faq")} variant="ghost">
            {p.ui.faqAll}
          </Button>
        </div>
        <Accordion items={items} idPrefix="faq-home" />
      </div>
    </section>
  );
}
