"use client";
import { useI18n } from "@/components/providers/I18n";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactContent } from "@/components/pages/ContactContent";

export function ContactRoute() {
  const { contactPage } = useI18n().p;
  return (
    <PageShell>
      <PageHeader pill={contactPage.pill} title={contactPage.title} intro={contactPage.intro} tone="paper" />
      <ContactContent />
    </PageShell>
  );
}
