import { CTASection } from "@/components/layout/cta-section";
import { PageHeader } from "@/components/layout/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { generalFaqs } from "@/content/faqs";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata } from "@/lib/seo";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "FAQ", href: "/faq" },
];

export const metadata = buildMetadata({
  title: "Canopy FAQs | Glen Canopies Ireland",
  description:
    "Common questions about canopy installation, canopy styles, and service coverage across Ireland.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <JsonLd data={[buildBreadcrumbJsonLd(breadcrumbs), buildFaqJsonLd(generalFaqs)]} />
      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Common questions about canopies, service areas, styles, lighting options, and development work."
      />
      <section className="shell-container section-space">
        <div className="grid gap-4 md:grid-cols-2">
          {generalFaqs.map((faq) => (
            <details key={faq.question} className="surface-panel rounded-[1.5rem] p-5">
              <summary className="cursor-pointer list-none text-lg font-semibold tracking-tight text-slate-950 marker:hidden">
                {faq.question}
              </summary>
              <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <CTASection
        title="Still Have a Question?"
        description="Get in touch and we’ll help with advice or a quote."
      />
    </>
  );
}
