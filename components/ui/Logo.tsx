/* eslint-disable @next/next/no-img-element */
/** Logo SENOU Solutions (SVG de senou-pack/brand) : version claire sur fond clair, sombre sur fond navy. */
export function Logo({ variant = "light", className = "" }: { variant?: "light" | "dark" | "icon"; className?: string }) {
  const src = variant === "icon" ? "/brand/senou-icon.svg" : `/brand/senou-logo-${variant}.svg`;
  return <img src={src} alt="" className={className} width={variant === "icon" ? 712 : 2072} height={696} decoding="async" />;
}
