"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { switchPath, LOCALES } from "@/content/i18n";
import { useI18n } from "@/components/providers/I18n";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { getLenis } from "@/components/providers/SmoothScroll";
import { cleanHref } from "@/lib/format";
import s from "./Nav.module.css";

export function Nav({ visible }: { visible: boolean }) {
  const { locale, t, p, r } = useI18n();
  const pathname = usePathname() ?? "/";
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  // La barre se resserre en descendant et revient en remontant, avec 24 px de marge
  // pour ne pas basculer à chaque petit mouvement du défilement.
  const anchor = useRef(0);
  const down = useRef(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    if (y <= 120) {
      down.current = false;
      anchor.current = y;
      setCompact(false);
    } else if (down.current ? y > anchor.current : y < anchor.current) {
      anchor.current = y;
    } else if (Math.abs(y - anchor.current) > 24) {
      down.current = !down.current;
      anchor.current = y;
      setCompact(down.current);
    }
  });

  // Menu ouvert : la page ne défile plus, Échap ferme, Tab reste dans le menu.
  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      } else if (e.key === "Tab" && menuRef.current && burgerRef.current) {
        const f = [burgerRef.current, ...menuRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
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
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
      getLenis()?.start();
    };
  }, [open]);

  const langSwitch = (cls: string) => (
    <span className={cls} role="group" aria-label={p.ui.langLabel}>
      {LOCALES.map((l, i) => (
        <span key={l} className={s.langItem}>
          {i > 0 && <span className={s.langSep} aria-hidden>|</span>}
          <a
            href={switchPath(pathname, l)}
            hrefLang={l}
            lang={l}
            className={l === locale ? s.langOn : s.langOff}
            aria-current={l === locale ? "true" : undefined}
            aria-label={p.ui.langNames[l]}
          >
            {t.nav.lang[i]}
          </a>
        </span>
      ))}
    </span>
  );

  return (
    <>
      <motion.header
        className={`${s.bar} ${compact ? s.compact : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={visible ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <a href={r("home")} className={s.logo} aria-label={p.ui.homeLabel}>
          <Logo variant="auto" />
        </a>
        <nav className={s.links} aria-label={p.ui.mainNav}>
          {t.nav.links.map((l) => (
            <a key={l.href} href={cleanHref(l.href)} className={s.link}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className={s.right}>
          {langSwitch(s.lang)}
          <Button href={r("contact")} className={s.cta}>
            {t.nav.cta}
          </Button>
          <button
            ref={burgerRef}
            className={s.burger}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? p.ui.closeMenu : p.ui.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="menu-mobile"
            className={s.menu}
            data-lenis-prevent
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
          >
            <nav aria-label={p.ui.mobileNav}>
              {t.nav.links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={cleanHref(l.href)}
                  className={s.menuLink}
                  onClick={() => setOpen(false)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.04, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className={s.menuFoot}>
              <Button href={r("contact")} className={s.menuCta}>
                {t.nav.cta}
              </Button>
              {langSwitch(s.menuLang)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
