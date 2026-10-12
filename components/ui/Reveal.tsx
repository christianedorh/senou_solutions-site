"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotionPref } from "@/components/providers/ReducedMotion";

/**
 * Fade + translation à l'entrée dans le viewport.
 * On observe l'élément avec useInView et on pilote l'animation via `animate`,
 * plus fiable que whileInView sur les pages rendues côté serveur.
 */
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotionPref();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const show = reduced || inView;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 40 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
