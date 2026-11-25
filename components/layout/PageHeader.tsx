"use client";
import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { Sparkle } from "@phosphor-icons/react";
import { useI18n } from "@/components/providers/I18n";
import { HOLIDAY } from "@/lib/holiday";
import { Pill } from "@/components/ui/Pill";
import { SplitText } from "@/components/ui/SplitText";
import s from "./PageHeader.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;
// Édition fêtes : une seule chute de neige (moins de 5 s), puis plus rien ne bouge.
// [gauche %, taille px, retard s]
const FLAKES = [
  [4, 11, 0], [12, 8, 0.6], [21, 13, 0.2], [30, 9, 0.9], [39, 10, 0.4], [48, 8, 1.1],
  [57, 12, 0.1], [66, 9, 0.7], [75, 14, 0.3], [84, 10, 1], [93, 12, 0.5],
] as const;

export function PageHeader({ pill, title, intro, tone = "cyan" }: { pill: string; title: readonly string[]; intro: string; tone?: "mist" | "cyan" | "paper" }) {
  const { t } = useI18n();
  return (
    <header className={`container ${s.head} ${HOLIDAY ? s.holiday : ""}`}>
      {HOLIDAY && (
        <div className={s.snow} aria-hidden>
          {FLAKES.map(([left, size, delay], i) => (
            <span
              key={left}
              className={s.flake}
              style={{ left: `${left}%`, fontSize: size, animationDelay: `${delay}s`, "--drift": i % 2 ? "-18px" : "22px" } as CSSProperties}
            >
              ❄
            </span>
          ))}
          <Sparkle weight="fill" className={`${s.star} ${s.starA}`} />
          <Sparkle weight="fill" className={`${s.star} ${s.starB}`} />
        </div>
      )}
      <motion.div className={s.pills} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
        <Pill tone={tone}>{pill}</Pill>
        {HOLIDAY && (
          <span className={s.season}>
            <Sparkle size={16} weight="fill" aria-hidden />
            {t.holiday.edition}
          </span>
        )}
      </motion.div>
      <h1 className={`display-l ${s.title}`}>
        <SplitText as="span" text={title.join(" ")} accentLast delay={0.1} />
      </h1>
      <motion.p className={`body-l ${s.intro}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}>
        {intro}
      </motion.p>
    </header>
  );
}
