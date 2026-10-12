import { pageMetadata } from "@/lib/metadata";
import { PrivacyRoute } from "@/components/pages/PrivacyRoute";

export const metadata = pageMetadata("privacy", "en");

export default function Page() {
  return <PrivacyRoute />;
}
