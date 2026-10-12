"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";
import { useReducedMotionPref } from "@/components/providers/ReducedMotion";

type Props = {
  to: number;
  from?: number;
  prefix?: string;
  suffix?: string;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
};

export function Counter({
  to,
  from = 0,
  prefix = "",
  suffix = "",
  format = (n) => Math.round(n).toString(),
  duration = 1.4,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotionPref();
  const [value, setValue] = useState(from);
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    const controls = animate(from, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setValue(v) });
    return () => controls.stop();
  }, [inView, from, to, duration, reduced]);
  return (
    <span ref={ref} className={`tnum ${className}`}>
      {prefix}
      {format(value)}
      {suffix}
    </span>
  );
}
