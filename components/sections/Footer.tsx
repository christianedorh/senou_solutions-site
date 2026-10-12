"use client";
import { motion } from "motion/react";
import { LinkedinLogo, InstagramLogo, FacebookLogo, XLogo, YoutubeLogo, type Icon as PhosphorIcon } from "@phosphor-icons/react";
import { useI18n } from "@/components/providers/I18n";
import { Logo } from "@/components/ui/Logo";
import { cleanHref } from "@/lib/format";
import s from "./Footer.module.css";

const SOCIAL_ICONS: Record<string, PhosphorIcon> = { LinkedIn: LinkedinLogo, Instagram: InstagramLogo, Facebook: FacebookLogo, X: XLogo, YouTube: YoutubeLogo };
// À VALIDER : URL des comptes. Un réseau sans URL n'est pas affiché.
export const SOCIAL_URLS: Record<string, string | null> = { LinkedIn: null };

export function Footer() {
  const { t, p, r } = useI18n();
  const f = t.footer;
  const socials = f.socials.filter((name) => SOCIAL_URLS[name]);
  return (
    <footer className={s.wrap}>
      <div className={`container ${s.top} ${socials.length ? s.withSocials : ""}`}>
        <div className={s.brand}>
          <a href={r("home")} className={s.logo} aria-label={p.ui.homeLabel}>
            <Logo variant="dark" />
          </a>
          <p className={s.tagline}>{f.tagline}</p>
          <p className={s.address}>
            <span className={`label ${s.colTitle}`}>{p.ui.footerAddress}</span>
            {f.address}
          </p>
        </div>
        {f.columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className={s.col}>
            <span className={`label ${s.colTitle}`}>{col.title}</span>
            {col.links.map((l) => (
              <a key={l.href} href={cleanHref(l.href)} className={s.link}>
                {l.label}
              </a>
            ))}
          </nav>
        ))}
        {socials.length > 0 && (
          <div className={s.col}>
            <span className={`label ${s.colTitle}`}>{p.ui.footerFollow}</span>
            <div className={s.socials}>
              {socials.map((name) => {
                const Icon = SOCIAL_ICONS[name] ?? LinkedinLogo;
                return (
                  <a key={name} href={SOCIAL_URLS[name]!} aria-label={name} className={s.social} target="_blank" rel="noopener noreferrer">
                    <Icon size={22} />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className={`container ${s.legal}`}>
        <span>{f.copyright}</span>
        <span>
          <a href={r("terms")}>{p.termsPage.title.join(" ")}</a> · <a href={r("privacy")}>{p.privacyPage.title.join(" ")}</a>
        </span>
      </div>
      <div className={s.giant} aria-hidden>
        <motion.span initial={{ y: "40%" }} whileInView={{ y: "0%" }} viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}>
          SENOU SOLUTIONS
        </motion.span>
      </div>
    </footer>
  );
}
