"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { EnvelopeSimple, Phone, MapPin, WhatsappLogo, CheckCircle, LinkedinLogo, type Icon as PhosphorIcon } from "@phosphor-icons/react";
import { useI18n } from "@/components/providers/I18n";
import { SOCIAL_URLS } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import s from "./ContactContent.module.css";

const DETAIL_ICONS: Record<string, PhosphorIcon> = { email: EnvelopeSimple, phone: Phone, whatsapp: WhatsappLogo, address: MapPin };
const SOCIAL_ICONS: Record<string, PhosphorIcon> = { LinkedIn: LinkedinLogo };

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactContent() {
  const { t, p } = useI18n();
  const contactPage = p.contactPage;
  const f = contactPage.form;
  const socials = t.footer.socials.filter((name) => SOCIAL_URLS[name]);
  const [values, setValues] = useState({ name: "", company: "", email: "", subject: f.subjects[0] as string, message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const validate = (): Errors => {
    const err: Errors = {};
    if (!values.name.trim()) err.name = f.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) err.email = f.errors.email;
    if (values.message.trim().length < 10) err.message = f.errors.message;
    return err;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) {
      const first = Object.keys(err)[0];
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    const who = values.company.trim() ? `${values.name}, ${values.company.trim()}` : values.name;
    const subject = encodeURIComponent(`[${values.subject}] ${f.mailSubject} ${who}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${who} (${values.email})`);
    window.location.href = `mailto:${f.to}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className={`container ${s.wrap}`}>
      <Reveal>
        <form className={s.form} onSubmit={onSubmit} noValidate>
          <div className={s.row}>
            <label className={s.field}>
              <span className={s.label}>{f.name}</span>
              <input name="name" type="text" autoComplete="name" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
              {errors.name && (
                <span id="err-name" className={s.error} role="alert">
                  {errors.name}
                </span>
              )}
            </label>
            <label className={s.field}>
              <span className={s.label}>{f.email}</span>
              <input name="email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
              {errors.email && (
                <span id="err-email" className={s.error} role="alert">
                  {errors.email}
                </span>
              )}
            </label>
          </div>
          <label className={s.field}>
            <span className={s.label}>{f.company}</span>
            <input name="company" type="text" autoComplete="organization" value={values.company} onChange={set("company")} />
          </label>
          <label className={s.field}>
            <span className={s.label}>{f.subject}</span>
            <select name="subject" value={values.subject} onChange={set("subject")}>
              {f.subjects.map((sj) => (
                <option key={sj} value={sj}>
                  {sj}
                </option>
              ))}
            </select>
          </label>
          <label className={s.field}>
            <span className={s.label}>{f.message}</span>
            <textarea name="message" rows={6} value={values.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined} />
            {errors.message && (
              <span id="err-message" className={s.error} role="alert">
                {errors.message}
              </span>
            )}
          </label>
          <div className={s.actions}>
            <Button>{f.submit}</Button>
            <p className={s.hint}>{f.hint}</p>
          </div>
          {sent && (
            <motion.p className={s.success} role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <CheckCircle size={20} weight="fill" /> {f.success}
            </motion.p>
          )}
        </form>
      </Reveal>

      <aside className={s.aside}>
        {contactPage.details.map((d, i) => {
          const Icon = DETAIL_ICONS[d.key] ?? EnvelopeSimple;
          const inner = (
            <>
              <span className={s.detailIcon}>
                <Icon size={20} />
              </span>
              <span className={s.detailTitle}>{d.title}</span>
              <span className={s.detailText}>{d.text}</span>
            </>
          );
          const href = "href" in d ? d.href : undefined;
          return (
            <Reveal key={d.key} delay={0.1 + i * 0.06}>
              {href ? (
                <a href={href} className={s.detail} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {inner}
                </a>
              ) : (
                <div className={s.detail}>{inner}</div>
              )}
            </Reveal>
          );
        })}
        {socials.length > 0 && (
          <Reveal delay={0.4}>
            <div className={s.socials}>
              <span className="label">{contactPage.socialsTitle}</span>
              <div className={s.socialRow}>
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
          </Reveal>
        )}
      </aside>
    </div>
  );
}
