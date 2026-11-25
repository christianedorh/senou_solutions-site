"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "@/components/providers/I18n";
import { useReducedMotionPref } from "@/components/providers/ReducedMotion";
import { BRAND_ICON, BRAND_VIEWBOX, BRAND_WORD } from "@/components/ui/brandPaths";
import { HOLIDAY } from "@/lib/holiday";
import s from "./Preloader.module.css";

/** Durée de la séquence avant la sortie, en millisecondes (plus longue en édition fêtes, pour les vœux). */
const DURATION = HOLIDAY ? 2600 : 1600;
type Bezier = [number, number, number, number];
const SETTLE: Bezier = [0.22, 1, 0.36, 1];
const OVERSHOOT: Bezier = [0.34, 1.56, 0.64, 1];

// Édition fêtes, d’après le spot « senou-noel » : étoiles fixes [gauche %, haut %, taille px, or].
const STARS = [
  [8, 14, 12, 0], [17, 32, 8, 0], [24, 9, 16, 1], [36, 20, 7, 0], [47, 7, 10, 0],
  [61, 15, 14, 1], [72, 6, 8, 0], [83, 24, 12, 0], [92, 11, 17, 1], [6, 72, 9, 0],
  [13, 86, 13, 1], [88, 78, 10, 0], [95, 62, 7, 0], [79, 90, 14, 1],
] as const;
// Flocons [gauche %, taille px, décalage s, durée s].
const FLAKES = Array.from({ length: 36 }, (_, i) => [
  (i * 37 + 11) % 100,
  2 + (i % 4),
  -((i * 0.73) % 6),
  5 + (i % 5),
] as const);

/**
 * Écran d'ouverture repris du spot de marque SENOU (5 s) : le « S » se pose,
 * le nom glisse depuis l'icône, un filet se trace, puis la signature monte.
 * Joué une fois par session. En édition fêtes : ciel de nuit, neige, étoiles et vœux dorés.
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
          className={`${s.wrap} ${HOLIDAY ? s.holiday : ""}`}
          aria-hidden
          style={{ clipPath: "inset(0 0 0% 0)" }}
          exit={
            reduced
              ? { opacity: 0, transition: { duration: 0.3 } }
              : { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }
          }
        >
          <span className={`${s.orb} ${s.orbCyan}`} />
          <span className={`${s.orb} ${s.orbBlue}`} />
          {HOLIDAY && (
            <>
              <span className={s.gold} />
              <span className={s.sky}>
                {STARS.map(([left, top, size, gold], i) => (
                  <i
                    key={i}
                    className={`${s.star} ${gold ? s.starGold : ""}`}
                    style={{ left: `${left}%`, top: `${top}%`, width: size, animationDelay: `${-(i * 0.37) % 3}s` }}
                  />
                ))}
                {!reduced &&
                  FLAKES.map(([left, size, delay, dur], i) => (
                    <i
                      key={`f${i}`}
                      className={s.flake}
                      style={{ left: `${left}%`, width: size, height: size, animationDelay: `${delay}s`, animationDuration: `${dur}s`, opacity: 0.35 + (size - 2) * 0.15 }}
                    />
                  ))}
              </span>
            </>
          )}

          <div className={s.lockup}>
            <svg className={s.logo} viewBox={BRAND_VIEWBOX}>
              <motion.g {...enter(0.05, { y: "4%", scale: 0.82 }, 0.7, OVERSHOOT)} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
                {BRAND_ICON.map((pt, i) => (
                  <path key={i} fill={pt.fill} d={pt.d} fillRule={pt.rule} />
                ))}
              </motion.g>
              <motion.g {...enter(0.3, { x: "-2.4%", scale: 0.985 }, 0.6)} style={{ transformBox: "fill-box", transformOrigin: "left center" }}>
                {BRAND_WORD.map((pt, i) => (
                  <path key={i} fill={pt.fill} d={pt.d} fillRule={pt.rule} />
                ))}
              </motion.g>
            </svg>
            <motion.span className={s.rule} {...enter(0.65, { scaleX: 0 }, 0.5)} />
            <motion.p className={s.tagline} {...enter(0.75, { y: "60%" }, 0.5)}>
              {p.ui.brandTagline[0]} <em>{p.ui.brandTagline[1]}</em>
            </motion.p>
            {HOLIDAY && (
              <motion.p
                className={s.greet}
                initial={reduced ? false : { opacity: 0, y: "40%", letterSpacing: "0.5em" }}
                animate={{ opacity: 1, y: 0, letterSpacing: "0.32em" }}
                transition={{ duration: 0.8, ease: SETTLE, delay: 1.05 }}
              >
                <span className={s.spark} />
                {p.ui.holidayGreeting}
                <span className={s.spark} />
              </motion.p>
            )}
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
