import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/i18n";

// Tant que SITE_LIVE ne vaut pas "1" (variable Vercel), le site n'est pas indexé :
// pratique pour une préversion privée avant validation des pages légales.
export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_LIVE !== "1") return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
