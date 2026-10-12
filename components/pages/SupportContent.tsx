"use client";
import { motion } from "motion/react";
import { Browser, DeviceMobile, CreditCard, Sparkle, Question, ArrowRight, EnvelopeSimple, Phone, WhatsappLogo, MapPin, type Icon as PhosphorIcon } from "@phosphor-icons/react";
import { useI18n } from "@/components/providers/I18n";
import type { FaqData } from "@/lib/faq";
import type { RouteKey } from "@/content/i18n";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import s from "./SupportContent.module.css";

const TOPIC_ICONS: Record<string, PhosphorIcon> = { web: Browser, mobile: DeviceMobile, paiement: CreditCard, evolution: Sparkle, questions: Question };
const TONES = [s.mist, s.white, s.cyan, s.white, s.mist];
const CHANNEL_ICONS: Record<string, PhosphorIcon> = { email: EnvelopeSimple, phone: Phone, whatsapp: WhatsappLogo, address: MapPin };

export function SupportContent({ faq }: { faq: FaqData }) {
  const { p, r } = useI18n();
  const { supportPage, ui } = p;
  const top: AccordionItem[] = faq.categories.flatMap((c) => c.items).slice(0, 5);
  return (
    <div className={`container ${s.wrap}`}>
      <section aria-label={ui.supportTopics} className={s.topics}>
        {supportPage.topics.map((t, i) => {
          const Icon = TOPIC_ICONS[t.key] ?? Question;
          return (
            <motion.a
              key={t.key}
              href={r(t.href as RouteKey)}
              className={`${s.topic} ${TONES[i % TONES.length]}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              whileHover={{ y: -6 }}
            >
              <span className={s.topicIcon}>
                <Icon size={26} weight="duotone" />
              </span>
              <span className={s.topicTitle}>{t.title}</span>
              <span className={s.topicText}>{t.text}</span>
              <span className={s.topicArrow} aria-hidden>
                <ArrowRight size={18} />
              </span>
            </motion.a>
          );
        })}
      </section>

      <Reveal>
        <section className={s.urgent} aria-labelledby="urgent-title">
          <div>
            <h2 id="urgent-title" className="h3">
              {supportPage.urgent.title}
            </h2>
            <p className={s.urgentText}>{supportPage.urgent.text}</p>
          </div>
          <Button href={r("contact")}>{supportPage.urgent.cta}</Button>
        </section>
      </Reveal>

      <section className={s.channels} aria-label={ui.supportChannels}>
        {supportPage.channels.map((c, i) => {
          const Icon = CHANNEL_ICONS[c.key] ?? EnvelopeSimple;
          const inner = (
            <>
              <span className={s.channelIcon}>
                <Icon size={22} />
              </span>
              <span className={s.channelTitle}>{c.title}</span>
              <span className={s.channelText}>{c.text}</span>
            </>
          );
          return (
            <Reveal key={c.key} delay={i * 0.06}>
              {"href" in c && c.href ? (
                <a href={c.href} className={`${s.channel} ${s.channelLink}`} {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {inner}
                </a>
              ) : (
                <div className={s.channel}>{inner}</div>
              )}
            </Reveal>
          );
        })}
      </section>

      <section className={s.faq} aria-labelledby="support-faq-title">
        <div className={s.faqHead}>
          <h2 id="support-faq-title" className="h2">
            {supportPage.faqTitle}
          </h2>
          <Button href={r("faq")} variant="ghost">
            {ui.supportFaqAll}
          </Button>
        </div>
        <Accordion items={top} idPrefix="support-faq" />
      </section>
    </div>
  );
}
