import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";
import type { FAQ } from "@/types/faq";

type FAQPreviewProps = {
  faqs: FAQ[];
};

export function FAQPreview({ faqs }: FAQPreviewProps) {
  return (
    <section className="shell-container section-space">
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Straight answers on supply-and-fit installation, service coverage, canopy styles, and development work."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {faqs.slice(0, 4).map((faq) => (
          <details key={faq.question} className="surface-panel rounded-[1.5rem] p-5">
            <summary className="cursor-pointer list-none text-lg font-semibold tracking-tight text-slate-950 marker:hidden">
              {faq.question}
            </summary>
            <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
          </details>
        ))}
      </div>
      <div className="mt-6">
        <Link className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950" href="/faq">
          View all FAQs
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
