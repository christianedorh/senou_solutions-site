"use client";
import { motion } from "motion/react";
import { Briefcase, RocketLaunch, GlobeHemisphereWest } from "@phosphor-icons/react";
import { useI18n } from "@/components/providers/I18n";
import { Marquee } from "@/components/ui/Marquee";
import s from "./ProofBar.module.css";

const ICONS = [Briefcase, RocketLaunch, GlobeHemisphereWest];

export function ProofBar() {
  const { t, p } = useI18n();
  return (
    <section className={s.bar} aria-label={p.ui.proofLabel}>
      <ul className={`container ${s.row}`}>
        {t.proof.items.map((it, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.li
              key={it}
              className={s.item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <Icon size={22} color="var(--blue)" weight="duotone" aria-hidden /> {it}
            </motion.li>
          );
        })}
      </ul>
      <div className={s.marquees}>
        <Marquee items={t.proof.marquee} />
        <Marquee items={t.proof.marquee} reverse />
      </div>
    </section>
  );
}
