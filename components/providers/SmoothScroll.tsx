"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { useReducedMotionPref } from "./ReducedMotion";

let current: Lenis | null = null;
/** Instance Lenis active (null si le défilement natif est utilisé). */
export const getLenis = () => current;

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotionPref();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    current = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href*='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href")!;
      const [path, hash] = href.split("#");
      if (!hash) return;
      // Ancre de la page courante seulement (« /en/#x » et « /en#x » visent la même page).
      const norm = (p: string) => p.replace(/\/$/, "") || "/";
      if (path && norm(path) !== norm(window.location.pathname)) return;
      const target = document.querySelector("#" + hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -96 });
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      current = null;
    };
  }, [reduced]);
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
