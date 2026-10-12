"use client";
import { motion } from "motion/react";
import s from "./Button.module.css";

type Props = {
  variant?: "primary" | "navy" | "ghost" | "light";
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
};

const motionProps = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 260, damping: 30 },
} as const;

export function Button({ variant = "primary", href, external = false, children, className = "" }: Props) {
  const cls = `${s.btn} ${s[variant]} ${className}`;
  const inner = <span className={s.inner}>{children}</span>;
  if (href) {
    return (
      <motion.a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...motionProps}>
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button className={cls} {...motionProps}>
      {inner}
    </motion.button>
  );
}
