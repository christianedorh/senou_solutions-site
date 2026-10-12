"use client";
import { useI18n } from "@/components/providers/I18n";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { LegalDocument } from "@/components/pages/LegalDocument";

export function PrivacyRoute() {
  const { privacyPage } = useI18n().p;
  return (
    <PageShell>
      <PageHeader pill={privacyPage.pill} title={privacyPage.title} intro={privacyPage.intro} tone="paper" />
      <LegalDocument sections={privacyPage.sections} updated={privacyPage.updated} />
    </PageShell>
  );
}
