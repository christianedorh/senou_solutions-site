import s from "./Marquee.module.css";

export function Marquee({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  const track = [...items, ...items];
  return (
    <div className={s.wrap}>
      <span className="sr-only">{items.join(", ")}</span>
      <div className={`${s.track} ${reverse ? s.reverse : ""}`} aria-hidden>
        {track.map((it, i) => (
          <span className={s.item} key={i}>
            {it}
            <span className={s.dot} />
          </span>
        ))}
      </div>
    </div>
  );
}
