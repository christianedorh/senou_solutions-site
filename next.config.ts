import type { NextConfig } from "next";

// Date du dernier déploiement (calculée à chaque build), affichée sur les pages légales.
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_BUILD_DATE: BUILD_DATE },
  reactStrictMode: true,
  // Export statique pour l'hébergement mutualisé (PlanetHoster) : `npm run build` écrit le site dans `out/`,
  // à placer à la racine de public_html. URL propres, HTTPS et cache : `public/.htaccess`.
  // Tant que SITE_LIVE ne vaut pas "1" au build, robots.txt interdit l'indexation.
  output: "export",
  images: { unoptimized: true },
};
export default nextConfig;
