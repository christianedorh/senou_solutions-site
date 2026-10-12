"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EnvelopeSimple, Phone, WhatsappLogo, ArrowRight } from "@phosphor-icons/react";
import { useI18n } from "@/components/providers/I18n";
import { Curtain } from "@/components/ui/Curtain";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { useReducedMotionPref } from "@/components/providers/ReducedMotion";
import s from "./FinalCta.module.css";

const tel = (n: string) => `tel:${n.replace(/[^\d+]/g, "")}`;

export function FinalCta() {
  const { t, p } = useI18n();
  const c = t.finalCta;
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPref();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const iconY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const iconRotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  const channels = [
    { key: "email", Icon: EnvelopeSimple, title: p.ui.ctaEmail, text: c.email, href: `mailto:${c.email}`, external: false },
    ...c.phones.map((n, i) => ({ key: `phone-${i}`, Icon: Phone, title: p.ui.ctaPhone, text: n, href: tel(n), external: false })),
    { key: "whatsapp", Icon: WhatsappLogo, title: "WhatsApp", text: p.ui.ctaWhatsapp, href: c.whatsapp, external: true },
  ];

  return (
    <Curtain id="contact" className={s.wrap}>
      <div className={`container ${s.grid}`} ref={ref}>
        <div className={s.copy}>
          <h2 className="display-l">
            <SplitText as="span" text={c.title.join(" ")} accentLast />
          </h2>
          <p className={`body-l ${s.text}`}>{c.text}</p>
          <Reveal delay={0.15}>
            <Button href={`mailto:${c.email}`}>
              {c.primary} <ArrowRight size={18} weight="bold" aria-hidden />
            </Button>
          </Reveal>
        </div>

        <div className={s.side}>
          <motion.div className={s.mark} aria-hidden style={reduced ? undefined : { y: iconY, rotate: iconRotate }}>
            <Logo variant="icon" />
          </motion.div>
          <ul className={s.channels}>
            {channels.map(({ key, Icon, title, text, href, external }, i) => (
              <li key={key}>
                <Reveal delay={0.1 + i * 0.08}>
                  <motion.a
                    href={href}
                    className={s.channel}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  >
                    <span className={s.channelIcon}>
                      <Icon size={22} weight="duotone" aria-hidden />
                    </span>
                    <span className={s.channelBody}>
                      <span className={s.channelTitle}>{title}</span>
                      <span className={s.channelText}>{text}</span>
                    </span>
                    <ArrowRight size={18} aria-hidden className={s.channelArrow} />
                  </motion.a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Curtain>
  );
}
