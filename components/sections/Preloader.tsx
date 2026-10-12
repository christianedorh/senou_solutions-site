"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "@/components/providers/I18n";
import { useReducedMotionPref } from "@/components/providers/ReducedMotion";
import { BRAND_ICON, BRAND_VIEWBOX, BRAND_WORD } from "@/components/ui/brandPaths";
import s from "./Preloader.module.css";

/** Durée de la séquence avant la sortie, en millisecondes. */
const DURATION = 2600;
type Bezier = [number, number, number, number];
const SETTLE: Bezier = [0.22, 1, 0.36, 1];
const OVERSHOOT: Bezier = [0.34, 1.56, 0.64, 1];

/**
 * Écran d'ouverture repris du spot de marque SENOU (5 s) : le « S » se pose,
 * le nom glisse depuis l'icône, un filet se trace, puis la signature monte.
 * Joué une fois par session.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotionPref();
  const { p } = useI18n();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("senou-preloaded")) {
      setShow(false);
      onDone();
      return;
    }
    document.body.style.overflow = "hidden";
    // Minuteur classique : la séquence se termine même si le rendu est suspendu.
    const timer = setTimeout(() => {
      sessionStorage.setItem("senou-preloaded", "1");
      setShow(false);
      document.body.style.overflow = "";
      onDone();
    }, DURATION);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  const enter = (delay: number, from: Record<string, number | string>, duration = 0.8, ease: Bezier = SETTLE) => ({
    initial: reduced ? false : { opacity: 0, ...from },
    animate: { opacity: 1, x: 0, y: 0, scale: 1, scaleX: 1 },
    transition: { duration, ease, delay },
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={s.wrap}
          aria-hidden
          style={{ clipPath: "inset(0 0 0% 0)" }}
          exit={
            reduced
              ? { opacity: 0, transition: { duration: 0.3 } }
              : { clipPath: "inset(0 0 100% 0)", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }
          }
        >
          <span className={`${s.orb} ${s.orbCyan}`} />
          <span className={`${s.orb} ${s.orbBlue}`} />

          <div className={s.lockup}>
            <svg className={s.logo} viewBox={BRAND_VIEWBOX}>
              <motion.g {...enter(0.1, { y: "4%", scale: 0.82 }, 0.9, OVERSHOOT)} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
                {BRAND_ICON.map((pt, i) => (
                  <path key={i} fill={pt.fill} d={pt.d} fillRule={pt.rule} />
                ))}
              </motion.g>
              <motion.g {...enter(0.55, { x: "-2.4%", scale: 0.985 })} style={{ transformBox: "fill-box", transformOrigin: "left center" }}>
                {BRAND_WORD.map((pt, i) => (
                  <path key={i} fill={pt.fill} d={pt.d} fillRule={pt.rule} />
                ))}
              </motion.g>
            </svg>
            <motion.span className={s.rule} {...enter(1.1, { scaleX: 0 }, 0.7)} />
            <motion.p className={s.tagline} {...enter(1.25, { y: "60%" }, 0.65)}>
              {p.ui.brandTagline[0]} <em>{p.ui.brandTagline[1]}</em>
            </motion.p>
          </div>

          <span className={s.meter}>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduced ? 0 : DURATION / 1000, ease: "linear" }}
            />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
