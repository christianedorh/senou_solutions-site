"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react";
import { useI18n } from "@/components/providers/I18n";
import { useReducedMotionPref } from "@/components/providers/ReducedMotion";
import { SplitText } from "@/components/ui/SplitText";
import { Button } from "@/components/ui/Button";
import { PARTNER_LOGOS, WORK_MEDIA, mediaKey } from "@/content/media";
import s from "./Partners.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

// Partenaires : grands logos, puis les clients qui nous ont confié leur site, puis une étude de cas.
// Pas de témoignages : à ajouter seulement avec de vrais avis.
export function Partners() {
  const { t, p } = useI18n();
  const pa = t.partners;
  const reduced = useReducedMotionPref();
  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ["start end", "end start"] });
  const backY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const frontY = useTransform(scrollYProgress, [0, 1], [90, -60]);

  // Clients dont nous avons réalisé le site (logos du bandeau)
  const clients = t.work.items.flatMap((it) => {
    const m = WORK_MEDIA[mediaKey(it)];
    return m ? [{ name: it.name, logo: m.logo }] : [];
  });
  // Captures de l'étude de cas : les partenaires qui sont aussi clients
  const story = pa.items.flatMap((it) => (it.url && WORK_MEDIA[it.url] ? [WORK_MEDIA[it.url].shots[0]] : [])).slice(0, 2);

  return (
    <section id={pa.id} className={`section ${s.wrap}`} aria-labelledby="partners-title">
      <div className="container">
        <div className={`section-head ${s.head}`}>
          <span className="eyebrow">{p.ui.partnersEyebrow}</span>
          <h2 id="partners-title" className="h2">
            <SplitText as="span" text={pa.title.join(" ")} accentLast />
          </h2>
          <p className="body-l">{p.ui.partnersIntro}</p>
        </div>

        <ul className={s.wall} aria-label={p.ui.partnersLabel}>
          {pa.items.map((it, i) => {
            const logo = PARTNER_LOGOS[mediaKey(it)];
            const inner = (
              <>
                <span className={s.logoBox}>
                  {logo ? (
                    <Image src={logo} alt={`Logo ${it.name}`} fill sizes="240px" className={`${s.logo} ${logo.endsWith(".jpg") ? s.logoOpaque : ""}`} />
                  ) : (
                    <span className={s.wordmark}>{it.name}</span>
                  )}
                </span>
                <span className={s.caption}>
                  {it.name}
                  {it.url && <ArrowUpRight size={14} weight="bold" aria-hidden className={s.arrow} />}
                </span>
              </>
            );
            return (
              <motion.li
                key={it.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
              >
                {it.url ? (
                  <a href={it.url} target="_blank" rel="noopener noreferrer" className={`${s.tile} ${s.tileLink}`}>
                    {inner}
                    <span className="sr-only">{p.ui.workOpens}</span>
                  </a>
                ) : (
                  <div className={s.tile}>{inner}</div>
                )}
              </motion.li>
            );
          })}
        </ul>

        {clients.length > 0 && (
          <div className={s.clients}>
            <p className={s.clientsTitle}>{p.ui.partnersClients}</p>
            <div className={s.strip}>
              <span className="sr-only">{clients.map((c) => c.name).join(", ")}</span>
              <div className={s.track} aria-hidden>
                {[...clients, ...clients].map((c, i) => (
                  <span key={i} className={s.clientLogo}>
                    <Image src={c.logo} alt="" fill sizes="160px" className={s.logo} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <motion.div
          ref={storyRef}
          className={s.story}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className={s.storyCopy}>
            <p className={s.storyText}>{p.ui.partnersStory}</p>
            <Button href="#realisations" variant="light">
              {p.ui.partnersStoryCta} <ArrowRight size={18} weight="bold" aria-hidden />
            </Button>
          </div>
          <div className={s.storyVisual} aria-hidden>
            {story[0] && (
              <motion.span className={`${s.storyShot} ${s.storyBack}`} style={reduced ? undefined : { y: backY }}>
                <Image src={story[0]} alt="" fill sizes="(min-width: 1024px) 420px, 70vw" className={s.storyImg} />
              </motion.span>
            )}
            {story[1] && (
              <motion.span className={`${s.storyShot} ${s.storyFront}`} style={reduced ? undefined : { y: frontY }}>
                <Image src={story[1]} alt="" fill sizes="(min-width: 1024px) 420px, 70vw" className={s.storyImg} />
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
