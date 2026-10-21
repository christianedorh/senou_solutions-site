"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useI18n } from "@/components/providers/I18n";
import { THEME_COLORS } from "@/lib/metadata";
import s from "./ThemeToggle.module.css";

export type Theme = "light" | "dark";
const KEY = "senou-theme";

function read(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/** Applique le thème sur <html>, le mémorise, et adoucit le passage. */
export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  if (theme === "dark") root.dataset.theme = "dark";
  else delete root.dataset.theme;
  // La barre d'état mobile suit le thème choisi, pas seulement celui du système.
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", THEME_COLORS[theme]));
  try {
    localStorage.setItem(KEY, theme);
  } catch {}
  window.setTimeout(() => root.classList.remove("theme-switching"), 600);
}

/**
 * Bouton discret fixé sur le bord droit : une pastille moitié claire, moitié sombre
 * qui pivote à chaque bascule. Pas de texte, seulement un libellé accessible.
 */
export function ThemeToggle() {
  const { t } = useI18n();
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const current = read();
    setTheme(current);
    setMounted(true);
    // Resynchronise la barre d'état si le thème mémorisé diffère de celui du système.
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", THEME_COLORS[current]));
  }, []);
  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = next === "dark" ? t.nav.theme.toDark : t.nav.theme.toLight;

  return (
    <motion.button
      type="button"
      className={s.btn}
      aria-label={label}
      title={label}
      initial={{ opacity: 0, x: 24 }}
      animate={mounted ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      onClick={() => {
        setTheme(next);
        applyTheme(next);
      }}
    >
      <motion.svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        aria-hidden
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {/* moitié claire et moitié sombre */}
        <path d="M12 2a10 10 0 0 1 0 20z" fill="#0a1b3d" />
        <path d="M12 2a10 10 0 0 0 0 20z" fill="#ffffff" />
        <circle cx="12" cy="12" r="9.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2.75v18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </motion.svg>
    </motion.button>
  );
}
