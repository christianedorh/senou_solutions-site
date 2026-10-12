"use client";
import { motion } from "motion/react";
import {
  Browser,
  DeviceMobile,
  CreditCard,
  Compass,
  ChatsCircle,
  Megaphone,
  Handshake,
  ArrowRight,
  ArrowUpRight,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import { useI18n } from "@/components/providers/I18n";
import { SplitText } from "@/components/ui/SplitText";
import { Button } from "@/components/ui/Button";
import s from "./Services.module.css";

const ICONS: Record<string, PhosphorIcon> = {
  web: Browser,
  mobile: DeviceMobile,
  paiement: CreditCard,
  conseil: Compass,
  consultation: ChatsCircle,
  marketing: Megaphone,
  representation: Handshake,
};
const EASE = [0.16, 1, 0.3, 1] as const;

/** Halo lumineux qui suit le pointeur sur la carte survolée. */
const spotlight = (e: React.PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export function Services() {
  const { t, p, r } = useI18n();
  const reveal = (i: number) => ({
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-8% 0px" },
    transition: { duration: 0.9, ease: EASE, delay: (i % 4) * 0.08 },
  });

  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{p.ui.servicesEyebrow}</span>
          <h2 id="services-title" className="h2">
            <SplitText as="span" text={t.services.title.join(" ")} accentLast />
          </h2>
        </div>
        <ul className={s.grid}>
          {t.services.items.map((it, i) => {
            const Icon = ICONS[it.key] ?? Browser;
            return (
              <motion.li key={it.key} {...reveal(i)}>
                <a href={r("contact")} className={s.card} onPointerMove={spotlight}>
                  <span className={s.top}>
                    <span className={s.icon} aria-hidden>
                      <Icon size={26} weight="duotone" />
                    </span>
                    <span className={`${s.num} tnum`} aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <h3 className={s.title}>{it.title}</h3>
                  <p className={s.text}>{it.text}</p>
                  <span className={s.more}>
                    {p.ui.serviceAsk} <ArrowRight size={16} weight="bold" aria-hidden className={s.moreArrow} />
                  </span>
                </a>
              </motion.li>
            );
          })}
          <motion.li {...reveal(t.services.items.length)}>
            <div className={`${s.card} ${s.cta}`}>
              <span className={s.ctaGlow} aria-hidden />
              <span className={s.icon} aria-hidden>
                <ArrowUpRight size={26} weight="bold" />
              </span>
              <h3 className={s.title}>{p.ui.servicesCtaTitle}</h3>
              <p className={s.text}>{p.ui.servicesCtaText}</p>
              <Button href={r("contact")} variant="light" className={s.ctaBtn}>
                {p.ui.servicesCtaButton}
              </Button>
            </div>
          </motion.li>
        </ul>
      </div>
    </section>
  );
}
