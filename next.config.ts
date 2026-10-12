import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Préversion : en-tête noindex sur toutes les pages tant que SITE_LIVE ne vaut pas "1".
  async headers() {
    if (process.env.SITE_LIVE === "1") return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};
export default nextConfig;
