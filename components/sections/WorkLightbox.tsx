"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "@phosphor-icons/react";
import { useI18n } from "@/components/providers/I18n";
import { getLenis } from "@/components/providers/SmoothScroll";
import type { WorkMedia } from "@/content/media";
import s from "./WorkLightbox.module.css";

export type WorkProject = { name: string; tag: string; text: string; url: string; media: WorkMedia };
type Slide = { src: string; mobile: boolean };

const EASE = [0.16, 1, 0.3, 1] as const;
const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");
/** Point d'arrêt projeté d'un geste lancé (décélération du défilement iOS). */
const momentum = (velocity: number, rate = 0.998) => ((velocity / 1000) * rate) / (1 - rate);

/** Galerie plein écran d'un projet : captures desktop et mobile, clavier et focus gérés. */
export function WorkLightbox({ project, onClose }: { project: WorkProject | null; onClose: () => void }) {
  const { p } = useI18n();
  const ui = p.ui;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const slides: Slide[] = project
    ? [...project.media.shots.map((src) => ({ src, mobile: false })), ...(project.media.mobile ? [{ src: project.media.mobile, mobile: true }] : [])]
    : [];
  const n = slides.length;
  const go = useCallback(
    (delta: number) => {
      if (n < 2) return;
      setDir(delta);
      setIndex((i) => (i + delta + n) % n);
    },
    [n]
  );

  // Ouverture : mémorise le focus, bloque le défilement, place le focus dans la boîte.
  useEffect(() => {
    if (!project) return;
    setIndex(0);
    returnFocus.current = document.activeElement as HTMLElement | null;
    getLenis()?.stop();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const id = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      cancelAnimationFrame(id);
      document.documentElement.style.overflow = prevOverflow;
      getLenis()?.start();
      returnFocus.current?.focus();
    };
  }, [project]);

  // Clavier : Échap ferme, flèches naviguent, Tab reste dans la boîte.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const f = [...dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose, go]);

  const slide = slides[index];

  // Balayage : on regarde où le geste aurait fini sa course, pas seulement où le doigt s'est levé.
  const stageRef = useRef<HTMLDivElement>(null);
  const onDragEnd = (_: unknown, info: PanInfo) => {
    const width = stageRef.current?.offsetWidth ?? 600;
    const landing = info.offset.x + momentum(info.velocity.x);
    if (landing < -width / 3) go(1);
    else if (landing > width / 3) go(-1);
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className={s.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          data-lenis-prevent
        >
          <motion.div
            ref={dialogRef}
            className={s.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-dialog-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <header className={s.head}>
              <span className={s.logo} style={project.media.logoBg ? { background: project.media.logoBg } : undefined}>
                <Image src={project.media.logo} alt="" width={96} height={96} />
              </span>
              <div className={s.meta}>
                <span className={`label ${s.tag}`}>{project.tag}</span>
                <h2 id="work-dialog-title" className={s.name}>
                  {project.name}
                </h2>
              </div>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className={s.visit}>
                {host(project.url)} <ArrowUpRight size={16} weight="bold" aria-hidden />
                <span className="sr-only">{ui.workOpens}</span>
              </a>
              <button ref={closeRef} type="button" className={s.close} onClick={onClose} aria-label={ui.workClose}>
                <X size={22} />
              </button>
            </header>

            <div className={s.stage} ref={stageRef}>
              <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                <motion.figure
                  key={slide?.src}
                  className={`${s.figure} ${slide?.mobile ? s.figureMobile : ""}`}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -60 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  drag={n > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
                  onDragEnd={onDragEnd}
                >
                  {slide &&
                    (slide.mobile ? (
                      <span className={s.phone}>
                        <Image src={slide.src} alt={`${ui.workShotOf} ${project.name} — ${ui.workMobile}`} width={780} height={1688} sizes="320px" draggable={false} />
                      </span>
                    ) : (
                      <span className={s.browser}>
                        <span className={s.chrome} aria-hidden>
                          <i />
                          <i />
                          <i />
                          <span className={s.address}>{host(project.url)}</span>
                        </span>
                        <Image src={slide.src} alt={`${ui.workShotOf} ${project.name} (${index + 1}/${n})`} width={1440} height={900} sizes="(min-width: 1024px) 900px, 92vw" draggable={false} />
                      </span>
                    ))}
                </motion.figure>
              </AnimatePresence>
              {n > 1 && (
                <>
                  <button type="button" className={`${s.arrow} ${s.prev}`} onClick={() => go(-1)} aria-label={ui.workPrev}>
                    <ArrowLeft size={20} weight="bold" />
                  </button>
                  <button type="button" className={`${s.arrow} ${s.next}`} onClick={() => go(1)} aria-label={ui.workNext}>
                    <ArrowRight size={20} weight="bold" />
                  </button>
                </>
              )}
            </div>

            <footer className={s.foot}>
              <p className={s.text}>{project.text}</p>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className={`${s.visit} ${s.visitMobile}`}>
                {ui.workVisit} <ArrowUpRight size={16} weight="bold" aria-hidden />
                <span className="sr-only">{ui.workOpens}</span>
              </a>
              {n > 1 && (
                <div className={s.thumbs} role="group" aria-label={ui.workShots}>
                  {slides.map((sl, i) => (
                    <button
                      key={sl.src}
                      type="button"
                      className={`${s.thumb} ${sl.mobile ? s.thumbMobile : ""} ${i === index ? s.thumbOn : ""}`}
                      onClick={() => {
                        setDir(i > index ? 1 : -1);
                        setIndex(i);
                      }}
                      aria-label={`${sl.mobile ? ui.workMobile : `${ui.workShots} ${i + 1}`}`}
                      aria-current={i === index ? "true" : undefined}
                    >
                      <Image src={sl.src} alt="" width={sl.mobile ? 78 : 144} height={sl.mobile ? 169 : 90} />
                    </button>
                  ))}
                </div>
              )}
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
