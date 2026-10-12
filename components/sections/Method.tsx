"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useI18n } from "@/components/providers/I18n";
import { Curtain } from "@/components/ui/Curtain";
import { ScrollWords } from "@/components/ui/ScrollWords";
import { SplitText } from "@/components/ui/SplitText";
import { Button } from "@/components/ui/Button";
import { useReducedMotionPref } from "@/components/providers/ReducedMotion";
import { useMediaQuery } from "@/components/providers/useMediaQuery";
import s from "./Method.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Method() {
  const { t, r } = useI18n();
  const m = t.method;
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotionPref();
  const desktop = useMediaQuery("(min-width: 1024px)");
  // La ligne de progression se remplit pendant que les étapes traversent l'écran.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Curtain id={m.id} className={s.wrap}>
      <div className={`container ${s.inner}`}>
        <div className={s.head}>
          <h2 className={`h2 ${s.title}`}>
            <SplitText as="span" text={m.title.join(" ")} accentLast />
          </h2>
          <ScrollWords text={m.text} className={`h3 ${s.big}`} />
        </div>

        <ol className={s.steps} ref={ref}>
          <span className={s.track} aria-hidden>
            <motion.span className={s.trackFill} style={reduced ? undefined : desktop ? { scaleX: line } : { scaleY: line }} />
          </span>
          {m.steps.map((st, i) => (
            <motion.li
              key={st.n}
              className={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
            >
              <span className={`${s.n} tnum`}>{st.n}</span>
              <h3 className={s.stepTitle}>{st.title}</h3>
              <p className={s.stepText}>{st.text}</p>
            </motion.li>
          ))}
        </ol>

        <div className={s.actions}>
          <Button href={r("contact")}>{t.nav.cta}</Button>
        </div>
      </div>
    </Curtain>
  );
}
