"use client";
import { useI18n } from "@/components/providers/I18n";
import type { FaqData } from "@/lib/faq";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { FaqExplorer } from "@/components/pages/FaqExplorer";

export function FaqRoute({ faq }: { faq: FaqData }) {
  const { faqPage } = useI18n().p;
  return (
    <PageShell>
      <PageHeader pill={faqPage.pill} title={faqPage.title} intro={faqPage.intro} />
      <FaqExplorer faq={faq} />
    </PageShell>
  );
}
