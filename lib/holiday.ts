/**
 * Édition de fin d’année : active au build avec NEXT_PUBLIC_HOLIDAY_EDITION=1.
 * Le site étant exporté en statique, l’édition reste celle du dernier export.
 */
export const HOLIDAY = process.env.NEXT_PUBLIC_HOLIDAY_EDITION === "1";
