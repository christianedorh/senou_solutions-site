// Logos et captures d'écran des réalisations et des partenaires.
// Clé : l'URL du projet quand elle existe, sinon son nom (identique en FR et en EN).
// Logos récupérés sur les sites des clients ; captures faites depuis leurs pages publiques.

export type WorkMedia = {
  logo: string;
  /** Fond derrière le logo, pour les logos clairs ou détourés. */
  logoBg?: string;
  /** Captures desktop (1440 × 900), la première sert de vignette. */
  shots: string[];
  /** Capture mobile (390 × 844, ×2). */
  mobile?: string;
};

const shots = (slug: string, n: number) => Array.from({ length: n }, (_, i) => `/work/${slug}/${i + 1}.jpg`);

export const WORK_MEDIA: Record<string, WorkMedia> = {
  "https://centralresource.net": { logo: "/logos/centralresource.png", shots: shots("centralresource", 3), mobile: "/work/centralresource/mobile.jpg" },
  "https://gesfarm-frontend.vercel.app/": { logo: "/logos/gesfarm.svg", shots: shots("gesfarm", 1), mobile: "/work/gesfarm/mobile.jpg" },
  "https://pressing.senousolutions.com/login": { logo: "/brand/senou-icon.svg", shots: shots("pressing", 1), mobile: "/work/pressing/mobile.jpg" },
  "https://teststock.senousolutions.com/signin": { logo: "/brand/senou-icon.svg", shots: shots("stock", 1), mobile: "/work/stock/mobile.jpg" },
  "https://kdaproevents.com": { logo: "/logos/kdaproevents.png", shots: shots("kdaproevents", 3), mobile: "/work/kdaproevents/mobile.jpg" },
  "https://africaascent.org": { logo: "/logos/africaascent.png", shots: shots("africaascent", 3), mobile: "/work/africaascent/mobile.jpg" },
  "https://kaevents.net": { logo: "/logos/kaevents.png", shots: shots("kaevents", 3), mobile: "/work/kaevents/mobile.jpg" },
  "https://chriscancompanies.com": { logo: "/logos/chriscan.png", shots: shots("chriscan", 3), mobile: "/work/chriscan/mobile.jpg" },
  "https://mamoutofu.com": { logo: "/logos/mamoutofu.png", shots: shots("mamoutofu", 2), mobile: "/work/mamoutofu/mobile.jpg" },
};

/** Logos des partenaires. `null` : logo à fournir, le nom est affiché en attendant. */
export const PARTNER_LOGOS: Record<string, string | null> = {
  LAFRICAMOBILE: "/logos/lafricamobile.png",
  "https://kdaproevents.com": "/logos/kdaproevents.png",
  "https://africaascent.org": "/logos/africaascent.png",
  "SPARK CORPORATION": "/logos/sparkcorporation.jpg",
};

export const mediaKey = (item: { url: string | null; name: string }) => item.url ?? item.name;
