import type { NextConfig } from "next";

// Date du dernier déploiement (calculée à chaque build), affichée sur les pages légales.
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_BUILD_DATE: BUILD_DATE },
  reactStrictMode: true,
  // Préversion : en-tête noindex sur toutes les pages tant que SITE_LIVE ne vaut pas "1".
  async headers() {
    if (process.env.SITE_LIVE === "1") return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};
export default nextConfig;
