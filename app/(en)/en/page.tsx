import { pageMetadata } from "@/lib/metadata";
import { getFaq } from "@/lib/faq";
import { HomePage } from "@/components/pages/HomePage";

export const metadata = pageMetadata("home", "en");
// La FAQ est relue depuis la feuille Google Sheets toutes les 5 minutes (voir lib/faq.ts).
export const revalidate = 300;

export default async function Page() {
  return <HomePage faq={await getFaq("en")} />;
}
