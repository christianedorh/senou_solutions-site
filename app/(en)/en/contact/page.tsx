import { pageMetadata } from "@/lib/metadata";
import { ContactRoute } from "@/components/pages/ContactRoute";

export const metadata = pageMetadata("contact", "en");

export default function Page() {
  return <ContactRoute />;
}
