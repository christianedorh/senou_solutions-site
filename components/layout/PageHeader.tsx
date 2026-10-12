"use client";
import { motion } from "motion/react";
import { Pill } from "@/components/ui/Pill";
import { SplitText } from "@/components/ui/SplitText";
import s from "./PageHeader.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export function PageHeader({ pill, title, intro, tone = "cyan" }: { pill: string; title: readonly string[]; intro: string; tone?: "mist" | "cyan" | "paper" }) {
  return (
    <header className={`container ${s.head}`}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
        <Pill tone={tone}>{pill}</Pill>
      </motion.div>
      <h1 className={`display-l ${s.title}`}>
        <SplitText as="span" text={title.join(" ")} accentLast delay={0.1} />
      </h1>
      <motion.p className={`body-l ${s.intro}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}>
        {intro}
      </motion.p>
    </header>
  );
}
