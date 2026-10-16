"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "@phosphor-icons/react";
import { useI18n } from "@/components/providers/I18n";
import { getLenis } from "@/components/providers/SmoothScroll";
import s from "./BackToTop.module.css";

/** Distance au bas de page (px) sous laquelle la flèche apparaît. */
const NEAR_BOTTOM = 480;

/** Petite flèche qui ramène en haut du site, visible seulement quand on arrive en bas de page. */
export function BackToTop() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = () => {
      const doc = document.documentElement;
      const bottom = doc.scrollHeight - (window.scrollY + window.innerHeight);
      setShow(window.scrollY > 200 && bottom <= NEAR_BOTTOM);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const goTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          className={s.btn}
          aria-label={t.nav.toTop}
          title={t.nav.toTop}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          onClick={goTop}
        >
          <ArrowUp size={20} weight="bold" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
