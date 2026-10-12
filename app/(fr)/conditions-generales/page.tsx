import { pageMetadata } from "@/lib/metadata";
import { TermsRoute } from "@/components/pages/TermsRoute";

export const metadata = pageMetadata("terms", "fr");

export default function Page() {
  return <TermsRoute />;
}
