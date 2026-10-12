import { pageMetadata } from "@/lib/metadata";
import { getFaq } from "@/lib/faq";
import { FaqRoute } from "@/components/pages/FaqRoute";

export const metadata = pageMetadata("faq", "fr");
// La FAQ est relue depuis la feuille Google Sheets toutes les 5 minutes (voir lib/faq.ts).
export const revalidate = 300;

export default async function Page() {
  return <FaqRoute faq={await getFaq("fr")} />;
}
