"use client";
import { useI18n } from "@/components/providers/I18n";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { LegalDocument } from "@/components/pages/LegalDocument";

export function TermsRoute() {
  const { termsPage } = useI18n().p;
  return (
    <PageShell>
      <PageHeader pill={termsPage.pill} title={termsPage.title} intro={termsPage.intro} tone="paper" />
      <LegalDocument sections={termsPage.sections} updated={termsPage.updated} />
    </PageShell>
  );
}
