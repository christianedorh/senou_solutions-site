"use client";
import { motion } from "motion/react";
import { Lightning, ChatCircleText, CheckCircle, Package, TShirt, Plant, ChartLineUp, GlobeHemisphereWest } from "@phosphor-icons/react";
import { useI18n } from "@/components/providers/I18n";
import { SplitText } from "@/components/ui/SplitText";
import { useReducedMotionPref } from "@/components/providers/ReducedMotion";
import s from "./Capabilities.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;
const tile = (i: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.9, ease: EASE, delay: i * 0.08 },
});
const PLATFORM_ICONS = [Package, TShirt, Plant, ChartLineUp];
const ORBIT_DOTS = 6;

export function Capabilities() {
  const { t } = useI18n();
  const reduced = useReducedMotionPref();
  const c = t.capabilities;
  const tl = c.tiles;
  const slow = (duration: number) => (reduced ? {} : { duration, repeat: Infinity, ease: "linear" as const });

  return (
    <section className="section" aria-labelledby="capabilities-title">
      <div className="container">
        <span className="eyebrow">{c.pill}</span>
        <h2 id="capabilities-title" className={`h2 ${s.title}`}>
          <SplitText as="span" text={`${c.title.join(" ")}.`} accentLast />
        </h2>

        <div className={s.grid}>
          <motion.article className={`${s.tile} ${s.remote}`} {...tile(0)}>
            <div>
              <h3 className="h3">{tl.remote.title}</h3>
              <p className={s.text}>{tl.remote.text}</p>
            </div>
            <div className={s.globe} aria-hidden>
              <GlobeHemisphereWest size={72} weight="thin" className={s.globeIcon} />
              <motion.div className={s.ring} animate={reduced ? {} : { rotate: 360 }} transition={slow(40)}>
                {Array.from({ length: ORBIT_DOTS }, (_, i) => (
                  <span key={i} className={s.dot} style={{ transform: `rotate(${(i * 360) / ORBIT_DOTS}deg) translateY(-96px)` }} />
                ))}
              </motion.div>
              <motion.div className={`${s.ring} ${s.ringInner}`} animate={reduced ? {} : { rotate: -360 }} transition={slow(28)}>
                {[0, 1, 2].map((i) => (
                  <span key={i} className={`${s.dot} ${s.dotSmall}`} style={{ transform: `rotate(${i * 120}deg) translateY(-62px)` }} />
                ))}
              </motion.div>
            </div>
          </motion.article>

          <motion.article className={`${s.tile} ${s.reactive}`} {...tile(1)}>
            <span className={s.badge} aria-hidden>
              <motion.span
                animate={reduced ? {} : { scale: [1, 1.12, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className={s.badgeInner}
              >
                <Lightning size={24} weight="fill" />
              </motion.span>
            </span>
            <h3 className="h3">{tl.reactive.title}</h3>
            <p className={s.text}>{tl.reactive.text}</p>
          </motion.article>

          <motion.article className={`${s.tile} ${s.sms}`} {...tile(2)}>
            <div className={s.bubbles} aria-hidden>
              {[0, 1].map((k) => (
                <motion.span
                  key={k}
                  className={`${s.bubble} ${k ? s.bubbleAlt : ""}`}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.4 + k * 0.35 }}
                >
                  {k ? <span className={s.lines} /> : <ChatCircleText size={20} weight="duotone" />}
                </motion.span>
              ))}
            </div>
            <h3 className="h3">{tl.sms.title}</h3>
            <p className={s.text}>{tl.sms.text}</p>
          </motion.article>

          <motion.article className={`${s.tile} ${s.payments}`} {...tile(3)}>
            <div className={s.payRow} aria-hidden>
              <span className={s.payBar}>
                <motion.span
                  className={s.payFill}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
                />
              </span>
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: 1.5 }}
                className={s.payCheck}
              >
                <CheckCircle size={26} weight="fill" />
              </motion.span>
            </div>
            <h3 className="h3">{tl.payments.title}</h3>
            <p className={s.text}>{tl.payments.text}</p>
          </motion.article>

          <motion.article className={`${s.tile} ${s.platforms}`} {...tile(4)}>
            <div className={s.iconGrid} aria-hidden>
              {PLATFORM_ICONS.map((Icon, i) => (
                <motion.span
                  key={i}
                  className={s.iconCell}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.3 + i * 0.08 }}
                >
                  <Icon size={20} weight="duotone" />
                </motion.span>
              ))}
            </div>
            <h3 className="h3">{tl.platforms.title}</h3>
            <p className={s.text}>{tl.platforms.text}</p>
          </motion.article>

          <motion.article className={`${s.tile} ${s.flexible}`} {...tile(5)}>
            <div>
              <h3 className="h3">{tl.flexible.title}</h3>
              <p className={s.text}>{tl.flexible.text}</p>
            </div>
            <svg className={s.flow} viewBox="0 0 400 80" aria-hidden preserveAspectRatio="none">
              <motion.path
                d="M10 60 C 90 60, 110 20, 200 20 S 310 60, 390 30"
                fill="none"
                stroke="url(#flex-grad)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: EASE, delay: 0.3 }}
              />
              <defs>
                <linearGradient id="flex-grad" x1="0" x2="1">
                  <stop offset="0" stopColor="var(--blue)" />
                  <stop offset="1" stopColor="var(--cyan)" />
                </linearGradient>
              </defs>
            </svg>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
