import { pageMetadata } from "@/lib/metadata";
import { getFaq } from "@/lib/faq";
import { SupportRoute } from "@/components/pages/SupportRoute";

export const metadata = pageMetadata("support", "en");
// La FAQ est relue depuis la feuille Google Sheets toutes les 5 minutes (voir lib/faq.ts).
export const revalidate = 300;

export default async function Page() {
  return <SupportRoute faq={await getFaq("en")} />;
}
