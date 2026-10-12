"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { splitWords } from "@/lib/format";
import s from "./ScrollWords.module.css";

function Word({ w, i, n, progress }: { w: string; i: number; n: number; progress: MotionValue<number> }) {
  const start = i / n;
  const end = start + 1 / n;
  const opacity = useTransform(progress, [start, end], [0.4, 1]);
  return (
    <motion.span className={s.word} style={{ opacity }}>
      {w}
    </motion.span>
  );
}

export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 40%"] });
  const words = splitWords(text);
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden>
          <Word w={w} i={i} n={words.length} progress={scrollYProgress} />
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
