"use client";
import { useI18n } from "@/components/providers/I18n";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import s from "./Numbers.module.css";

export function Numbers() {
  const { t } = useI18n();
  const n = t.numbers;
  return (
    <section className={s.wrap} aria-labelledby="numbers-title">
      <div className="container">
        <Reveal>
          <h2 id="numbers-title" className={`h2 ${s.title}`}>
            {n.title}
          </h2>
        </Reveal>
        <div className={s.stats}>
          {n.stats.map((st, i) => (
            <Reveal key={st.label} delay={i * 0.12}>
              <div className={s.stat}>
                <span className={`display-xl ${s.num}`}>
                  <Counter to={st.value} suffix={st.suffix} duration={2} />
                </span>
                <span className="label">{st.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <p className={s.note}>{n.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
