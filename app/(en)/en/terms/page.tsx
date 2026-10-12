import { pageMetadata } from "@/lib/metadata";
import { TermsRoute } from "@/components/pages/TermsRoute";

export const metadata = pageMetadata("terms", "en");

export default function Page() {
  return <TermsRoute />;
}
