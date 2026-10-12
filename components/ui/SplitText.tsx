"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { splitWords } from "@/lib/format";
import { useReducedMotionPref } from "@/components/providers/ReducedMotion";
import s from "./SplitText.module.css";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  accentLast?: boolean;
};

/**
 * Révèle un texte mot par mot (chaque mot monte depuis un masque).
 * L'observation se fait sur le conteneur : les mots eux-mêmes sont masqués
 * par overflow hidden et ne seraient jamais "en vue" pour un observateur.
 */
export function SplitText({ text, as = "p", className = "", delay = 0, accentLast = false }: Props) {
  const Tag = as;
  const reduced = useReducedMotionPref();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = splitWords(text);
  const show = reduced || inView;
  return (
    <Tag className={className} ref={ref as React.RefObject<never>}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden>
          <span className={s.mask}>
            <motion.span
              className={`${s.word} ${accentLast && i === words.length - 1 ? "accent" : ""}`}
              initial={reduced ? false : { y: "110%" }}
              animate={show ? { y: 0 } : { y: "110%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.04 }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
