"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowRight, LockSimple, Images } from "@phosphor-icons/react";
import { useI18n } from "@/components/providers/I18n";
import { SplitText } from "@/components/ui/SplitText";
import { WORK_MEDIA, mediaKey } from "@/content/media";
import { WorkLightbox, type WorkProject } from "./WorkLightbox";
import s from "./Work.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;
const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");
/** Nombre de projets mis en avant en grand format. */
const FEATURED = 2;

export function Work() {
  const { t, p, r } = useI18n();
  const w = t.work;
  const [open, setOpen] = useState<WorkProject | null>(null);

  // Projets publics (avec site et captures) d'abord, plateformes privées ensuite.
  const publicProjects: WorkProject[] = [];
  const privateProjects: { name: string; tag: string; text: string; url: string | null }[] = [];
  for (const it of w.items) {
    const media = WORK_MEDIA[mediaKey(it)];
    if (it.url && media) publicProjects.push({ name: it.name, tag: it.tag, text: it.text, url: it.url, media });
    else privateProjects.push(it);
  }

  const reveal = (i: number) => ({
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-8% 0px" },
    transition: { duration: 0.9, ease: EASE, delay: (i % 4) * 0.08 },
  });

  return (
    <section id={w.id} className="section" aria-labelledby="work-title">
      <div className="container">
        <div className={s.head}>
          <div className="section-head">
            <span className="eyebrow">{p.ui.workEyebrow}</span>
            <h2 id="work-title" className="h2">
              <SplitText as="span" text={w.title.join(" ")} accentLast />
            </h2>
          </div>
          <p className={`body-l ${s.intro}`}>{w.text}</p>
        </div>

        <ul className={s.grid}>
          {publicProjects.map((pr, i) => (
            <motion.li key={pr.url} className={i < FEATURED ? s.featured : undefined} {...reveal(i)}>
              <article className={s.card}>
                <button type="button" className={s.shot} onClick={() => setOpen(pr)} aria-label={`${p.ui.workView} : ${pr.name}`}>
                  <Image
                    src={pr.media.shots[0]}
                    alt=""
                    fill
                    sizes={i < FEATURED ? "(min-width: 1024px) 620px, 92vw" : "(min-width: 1024px) 300px, (min-width: 640px) 46vw, 92vw"}
                    className={s.shotImg}
                  />
                  <span className={s.shotVeil} aria-hidden />
                  <span className={s.view} aria-hidden>
                    <Images size={16} weight="bold" /> {p.ui.workView}
                  </span>
                </button>
                <div className={s.body}>
                  <span className={s.logo} style={pr.media.logoBg ? { background: pr.media.logoBg } : undefined}>
                    <Image src={pr.media.logo} alt={`Logo ${pr.name}`} width={120} height={120} />
                  </span>
                  <div className={s.info}>
                    <span className={`label ${s.tag}`}>{pr.tag}</span>
                    <h3 className={s.name}>{pr.name}</h3>
                    <p className={s.text}>{pr.text}</p>
                  </div>
                  <a href={pr.url} target="_blank" rel="noopener noreferrer" className={s.link}>
                    <span className={s.host}>{host(pr.url)}</span>
                    <ArrowUpRight size={16} weight="bold" aria-hidden />
                    <span className="sr-only">
                      {p.ui.workVisit} {p.ui.workOpens}
                    </span>
                  </a>
                </div>
              </article>
            </motion.li>
          ))}

          {privateProjects.map((pr, i) => (
            <motion.li key={pr.name} {...reveal(publicProjects.length + i)}>
              <article className={`${s.card} ${s.private}`}>
                <div className={s.pattern} aria-hidden>
                  <LockSimple size={28} weight="duotone" />
                </div>
                <div className={s.body}>
                  <div className={s.info}>
                    <span className={`label ${s.tag}`}>{pr.tag}</span>
                    <h3 className={s.name}>{pr.name}</h3>
                    <p className={s.text}>{pr.text}</p>
                  </div>
                  {pr.url ? (
                    <a href={pr.url} target="_blank" rel="noopener noreferrer" className={s.link}>
                      <span className={s.host}>{host(pr.url)}</span>
                      <ArrowUpRight size={16} weight="bold" aria-hidden />
                      <span className="sr-only">
                        {p.ui.workVisit} {p.ui.workOpens}
                      </span>
                    </a>
                  ) : (
                    <span className={s.privateNote}>
                      <LockSimple size={14} aria-hidden /> {p.ui.workPrivateNote}
                    </span>
                  )}
                </div>
              </article>
            </motion.li>
          ))}

          <motion.li {...reveal(publicProjects.length + privateProjects.length)}>
            <a href={r("contact")} className={`${s.card} ${s.cta}`}>
              <span className={s.ctaTitle}>{p.ui.workCtaTitle}</span>
              <span className={s.ctaText}>{p.ui.workCtaText}</span>
              <span className={s.ctaArrow} aria-hidden>
                <ArrowRight size={20} weight="bold" />
              </span>
            </a>
          </motion.li>
        </ul>
      </div>
      <WorkLightbox project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
