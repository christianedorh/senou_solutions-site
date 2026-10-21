"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { Browser, DeviceMobile, CreditCard, CheckCircle } from "@phosphor-icons/react";
import { useI18n } from "@/components/providers/I18n";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { useReducedMotionPref } from "@/components/providers/ReducedMotion";
import s from "./Hero.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;
// Forme de fond navy, en morphing lent
const BLOB_A = "M436 92c62 44 104 118 98 194s-60 154-128 190-150 28-206-18S110 322 118 246s52-142 118-176 138-22 200 22z";
const BLOB_B = "M420 110c70 40 120 110 110 190s-70 150-140 180-160 20-210-30S90 310 100 230s60-140 130-170 120-30 190 20z";
// Les deux rubans du « S » du logo (senou-pack/brand/senou-icon.svg)
const ICON_BOX = "472 40 712 696";
const RIBBON_TOP =
  "M1163.2,432.4C1162.1,431.6 1159.0,427.3 1156.3,422.8C1144.3,402.5 1120.8,383.5 1096.0,374.0C1070.1,364.1 1085.0,364.7 841.0,364.0C600.4,363.4 619.0,364.1 595.1,354.8C466.7,305.1 468.1,125.4 597.2,77.6C621.9,68.4 601.9,69.0 899.8,69.0C1179.5,69.0 1165.2,68.7 1167.9,73.8C1170.7,79.1 1168.1,94.5 1162.1,108.0C1150.2,134.8 1129.5,153.0 1099.5,163.1C1089.5,166.5 1089.5,166.5 864.0,167.0C705.6,167.4 637.5,167.9 635.0,168.7C592.0,182.0 584.5,236.3 622.4,258.9C634.2,266.0 616.1,265.4 848.5,266.0C1058.5,266.6 1058.5,266.6 1070.4,269.8C1114.5,281.7 1147.0,310.9 1162.5,352.5C1168.2,368.0 1169.1,373.7 1169.7,400.7C1170.4,431.7 1169.4,436.7 1163.2,432.4Z";
const RIBBON_BOTTOM =
  "M507.3,705.9C500.5,703.9 499.4,698.0 503.0,682.5C511.4,646.4 544.9,616.4 584.1,610.1C588.4,609.4 662.3,609.0 809.1,609.0C950.2,609.0 1029.6,608.6 1033.0,608.0C1070.4,600.9 1085.1,552.1 1058.0,525.0C1051.4,518.4 1040.7,512.6 1032.6,511.1C1028.4,510.3 965.8,510.0 824.6,510.0C607.7,510.0 617.7,510.2 596.5,505.0C552.9,494.2 514.3,455.2 503.9,411.5C497.3,383.5 497.0,343.0 503.4,343.0C504.9,343.0 512.0,350.4 512.0,351.9C512.0,353.6 523.6,368.4 529.6,374.4C544.1,389.0 566.6,401.8 586.5,406.9C604.6,411.6 596.5,411.4 823.5,412.0C1036.5,412.5 1036.5,412.5 1048.9,414.8C1145.7,432.3 1198.2,538.0 1153.9,626.1C1130.5,672.8 1086.3,701.7 1031.6,706.0C1014.8,707.3 511.9,707.2 507.3,705.9Z";

const TILES = [
  { key: "web", Icon: Browser, cls: s.tileWeb, delay: 1.2 },
  { key: "mobile", Icon: DeviceMobile, cls: s.tileMobile, delay: 1.35 },
  { key: "pay", Icon: CreditCard, cls: s.tilePay, delay: 1.5 },
] as const;

export function Hero({ ready }: { ready: boolean }) {
  const { t, r } = useI18n();
  const h = t.hero;
  const reduced = useReducedMotionPref();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % h.rotating.length), 3400);
    return () => clearInterval(id);
  }, [reduced, h.rotating.length]);
  const { scrollY } = useScroll();
  const topY = useTransform(scrollY, [0, 600], [0, -40]);
  const bottomY = useTransform(scrollY, [0, 600], [0, -80]);

  const wordAnim = (delay: number) => ({
    initial: reduced ? false : { y: "110%" },
    animate: ready ? { y: 0 } : {},
    transition: { duration: 1, ease: EASE, delay },
  });
  const fade = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, ease: EASE, delay },
  });
  const float = (delay: number, amp = 6, dur = 7) =>
    reduced ? {} : { y: [0, -amp, 0], transition: { delay, duration: dur, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <section className={`${s.hero} section`} aria-labelledby="hero-title">
      <div className={`container ${s.grid}`}>
        <div className={s.copy}>
          <motion.div {...fade(0.1)}>
            <Pill tone="cyan">{h.pill}</Pill>
          </motion.div>
          <h1 id="hero-title" className={`display-xl ${s.title}`}>
            <span className="sr-only">{`${h.titleLines.join(" ")} ${h.before} ${h.rotating.join(", ")}.`}</span>
            {h.titleLines.map((line, li) => (
              <span className={s.line} key={li} aria-hidden>
                <motion.span className={`${s.word} ${li === h.titleLines.length - 1 ? "accent" : ""}`} {...wordAnim(0.2 + li * 0.1)}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className={s.rotLine} aria-hidden {...fade(0.45)}>
            {h.before}{" "}
            {/* Le mot glisse verticalement dans une fenêtre masquée ; un léger flou fond l'ancien et le nouveau,
                et la pastille s'ajuste à la largeur du mot au lieu de sauter. */}
            <motion.span layout className={s.rotBox} transition={{ layout: { duration: 0.5, ease: EASE } }}>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={i}
                  layout="position"
                  className={s.rot}
                  initial={{ y: "105%", opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-105%", opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {h.rotating[i]}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </motion.p>
          <motion.p className={`body-l ${s.text}`} {...fade(0.55)}>
            {h.text}
          </motion.p>
          <motion.div className={s.actions} {...fade(0.65)}>
            <Button href={r("contact")}>{h.cta.primary}</Button>
            <Button href="#realisations" variant="ghost">
              {h.cta.secondary}
            </Button>
          </motion.div>
          <motion.p className={s.proof} {...fade(0.8)}>
            <CheckCircle size={20} weight="fill" color="var(--blue)" aria-hidden /> {h.proof}
          </motion.p>
        </div>

        <motion.div
          className={s.visual}
          aria-hidden
          initial={reduced ? false : { opacity: 0, scale: 0.94 }}
          animate={ready ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
        >
          <div className={s.glow} />
          <svg className={s.blob} viewBox="0 0 600 600">
            <defs>
              <linearGradient id="hero-navy" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#13306b" />
                <stop offset="1" stopColor="var(--navy)" />
              </linearGradient>
            </defs>
            <motion.path
              fill="url(#hero-navy)"
              initial={{ d: BLOB_A }}
              animate={reduced ? {} : { d: [BLOB_A, BLOB_B, BLOB_A] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>

          {/* Orbites fines, tracées à l'entrée */}
          <svg className={s.orbits} viewBox="0 0 600 600">
            {[230, 280].map((rad, k) => (
              <motion.circle
                key={rad}
                cx="300"
                cy="300"
                r={rad}
                fill="none"
                stroke={k ? "var(--mist)" : "var(--cyan)"}
                strokeOpacity={k ? 0.9 : 0.45}
                strokeWidth="1.5"
                strokeDasharray={k ? "2 10" : undefined}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={ready && !reduced ? { pathLength: 1 } : reduced ? { pathLength: 1 } : {}}
                transition={{ duration: 2.2, ease: EASE, delay: 0.8 + k * 0.2 }}
              />
            ))}
          </svg>

          {/* Les deux rubans du S, qui se rejoignent depuis les côtés opposés */}
          <motion.div className={s.ribbons} style={{ y: reduced ? 0 : topY }}>
            <motion.svg
              viewBox={ICON_BOX}
              className={s.ribbon}
              initial={reduced ? false : { x: "18%", opacity: 0 }}
              animate={ready ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 1.6, ease: EASE, delay: 0.6 }}
            >
              <motion.path d={RIBBON_TOP} fill="var(--cyan)" animate={float(2.4, 6, 8)} />
            </motion.svg>
          </motion.div>
          <motion.div className={s.ribbons} style={{ y: reduced ? 0 : bottomY }}>
            <motion.svg
              viewBox={ICON_BOX}
              className={s.ribbon}
              initial={reduced ? false : { x: "-18%", opacity: 0 }}
              animate={ready ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 1.6, ease: EASE, delay: 0.75 }}
            >
              <motion.path d={RIBBON_BOTTOM} fill="#3b84ec" animate={float(2.8, 6, 9)} />
            </motion.svg>
          </motion.div>

          {/* Tuiles des trois savoir-faire : web, mobile, paiement */}
          {TILES.map(({ key, Icon, cls, delay }, k) => (
            <motion.span
              key={key}
              className={`${s.tile} ${cls}`}
              initial={reduced ? false : { opacity: 0, scale: 0.6 }}
              animate={ready ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay }}
            >
              <motion.span className={s.tileInner} animate={float(delay + 0.8, 8, 6 + k)}>
                <Icon size={30} weight="duotone" />
              </motion.span>
            </motion.span>
          ))}

          {/* Un seul accent or, discret */}
          <svg className={s.spark} viewBox="0 0 60 60">
            {["M16 44 L8 26", "M30 40 L30 18", "M42 44 L52 30"].map((d, k) => (
              <motion.path
                key={d}
                d={d}
                stroke="var(--gold)"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={ready && !reduced ? { pathLength: 1 } : reduced ? { pathLength: 1 } : {}}
                transition={{ duration: 0.7, delay: 1.8 + k * 0.12, ease: EASE }}
              />
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
