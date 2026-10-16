/* eslint-disable @next/next/no-img-element */
/**
 * Logo SENOU Solutions (SVG de senou-pack/brand) : « light » pour fond clair, « dark » pour fond navy.
 * « auto » suit le thème de la page (les deux images sont rendues, une seule est affichée).
 */
export function Logo({ variant = "light", className = "" }: { variant?: "light" | "dark" | "icon" | "auto"; className?: string }) {
  if (variant === "auto") {
    return (
      <>
        <img src="/brand/senou-logo-light.svg" alt="" className={`${className} logo-light-only`} width={2072} height={696} decoding="async" />
        <img src="/brand/senou-logo-dark.svg" alt="" className={`${className} logo-dark-only`} width={2072} height={696} decoding="async" />
      </>
    );
  }
  const src = variant === "icon" ? "/brand/senou-icon.svg" : `/brand/senou-logo-${variant}.svg`;
  return <img src={src} alt="" className={className} width={variant === "icon" ? 712 : 2072} height={696} decoding="async" />;
}
