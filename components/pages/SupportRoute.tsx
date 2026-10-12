"use client";
import { useI18n } from "@/components/providers/I18n";
import type { FaqData } from "@/lib/faq";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { SupportContent } from "@/components/pages/SupportContent";

export function SupportRoute({ faq }: { faq: FaqData }) {
  const { supportPage } = useI18n().p;
  return (
    <PageShell>
      <PageHeader pill={supportPage.pill} title={supportPage.title} intro={supportPage.intro} tone="mist" />
      <SupportContent faq={faq} />
    </PageShell>
  );
}
