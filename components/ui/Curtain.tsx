"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotionPref } from "@/components/providers/ReducedMotion";

/**
 * Section qui se révèle comme une page qu'on tourne : un voile couleur papier
 * recouvre la section et se rétracte vers le bas quand elle entre dans le viewport.
 * On n'utilise pas clip-path sur la section elle-même, car il empêcherait les
 * observateurs d'intersection des enfants (compteurs, reveals) de se déclencher.
 */
export function Curtain({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const reduced = useReducedMotionPref();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <section id={id} className={className} ref={ref} style={{ position: "relative" }}>
      {children}
      {!reduced && (
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--paper)",
            transformOrigin: "50% 100%",
            pointerEvents: "none",
            zIndex: 5,
          }}
          initial={{ scaleY: 1 }}
          animate={inView ? { scaleY: 0 } : { scaleY: 1 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </section>
  );
}
