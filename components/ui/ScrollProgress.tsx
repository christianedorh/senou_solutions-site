"use client";
import { motion, useScroll } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 3,
        width: "100%",
        zIndex: 900,
        background: "linear-gradient(90deg, var(--blue), var(--cyan))",
        transformOrigin: "0 50%",
        scaleX: scrollYProgress,
      }}
    />
  );
}
