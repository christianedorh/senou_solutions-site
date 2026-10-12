import s from "./Pill.module.css";

export function Pill({ tone = "mist", children }: { tone?: "mist" | "cyan" | "paper" | "dark"; children: React.ReactNode }) {
  return <span className={`${s.pill} ${s[tone]} label`}>{children}</span>;
}
