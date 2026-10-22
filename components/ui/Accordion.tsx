"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "@phosphor-icons/react";
import s from "./Accordion.module.css";

export type AccordionItem = { q: string; a: string };

export function Accordion({ items, idPrefix, defaultOpen = 0 }: { items: readonly AccordionItem[]; idPrefix: string; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <ul className={s.list}>
      {items.map((it, i) => {
        const isOpen = open === i;
        const id = `${idPrefix}-${i}`;
        return (
          <li key={it.q} className={s.item}>
            <button className={s.q} aria-expanded={isOpen} aria-controls={id} id={`${id}-btn`} onClick={() => setOpen(isOpen ? null : i)}>
              <span>{it.q}</span>
              <motion.span className={s.icon} animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                <Plus size={22} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={id}
                  role="region"
                  aria-labelledby={`${id}-btn`}
                  className={s.aWrap}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className={s.a}>{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
