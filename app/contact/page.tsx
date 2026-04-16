import { Building2, Clock3, ImagePlus, Mail, MapPinned, PhoneCall, Sparkles } from "lucide-react";

import { PageEvent } from "@/components/analytics/page-event";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { QuoteForm } from "@/components/forms/quote-form";
import { PageHeader } from "@/components/layout/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { FacebookButton } from "@/components/ui/facebook-button";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getPhoneHref, siteConfig } from "@/lib/site";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

export const metadata = buildMetadata({
  title: "Contact Glen Canopies | Get a Quote",
  description:
    "Contact Glen Canopies for a free quote on canopies, door surrounds, columns and sill installations across Ireland.",
  path: "/contact",
});

export default function ContactPage() {
  const phoneHref = getPhoneHref();

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />
      <PageEvent name="Contact Page Viewed" props={{ page: "contact" }} />
      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow="Contact"
        title="Get a Free Quote"
        description="Whether you’re planning a new canopy or improving your entrance, we’re here to help."
        actions={
          phoneHref ? (
            <Button asChild variant="outline">
              <TrackedAnchor
                eventName="Phone CTA Clicked"
                eventProps={{ location: "contact-page" }}
                href={phoneHref}
              >
                <PhoneCall />
                {siteConfig.phone}
              </TrackedAnchor>
            </Button>
          ) : null
        }
      />
      <section className="shell-container section-space">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <QuoteForm />
          <div className="space-y-5">
            <div className="surface-panel p-6 md:p-7">
              <div className="flex items-start gap-4">
                <span className="brand-icon-tile flex size-11 shrink-0 items-center justify-center rounded-xl">
                  <PhoneCall className="size-4.5" />
                </span>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                      Contact Details
                    </h2>
                    <p className="text-[15px] leading-7 tracking-[-0.01em] text-slate-600">
                      Speak to us directly or send an email and we&apos;ll come back to you as
                      soon as we can.
                    </p>
                  </div>
                  <div className="space-y-4 text-sm leading-7 text-slate-600">
                    {phoneHref ? (
                      <a
                        className="flex items-center gap-3 transition-colors hover:text-[#A62103]"
                        href={phoneHref}
                      >
                        <PhoneCall className="size-4 text-[#A62103]" />
                        <span>{siteConfig.phone}</span>
                      </a>
                    ) : null}
                    {siteConfig.email ? (
                      <a
                        className="flex items-center gap-3 transition-colors hover:text-[#A62103]"
                        href={`mailto:${siteConfig.email}`}
                      >
                        <Mail className="size-4 text-[#A62103]" />
                        <span>{siteConfig.email}</span>
                      </a>
                    ) : null}
                    <div className="flex items-center gap-3">
                      <Clock3 className="size-4 text-[#A62103]" />
                      <span>Monday to Friday, 8:00am - 5:00pm</span>
                    </div>
                    {siteConfig.facebookUrl ? (
                      <div className="flex items-center gap-3">
                        <FacebookButton compact href={siteConfig.facebookUrl} label="Follow Glen Canopies on Facebook" />
                        <a
                          className="transition-colors hover:text-[#A62103]"
                          href={siteConfig.facebookUrl}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Follow us on Facebook
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="surface-panel p-6 md:p-7">
              <div className="flex items-start gap-4">
                <span className="brand-icon-tile flex size-11 shrink-0 items-center justify-center rounded-xl">
                  <MapPinned className="size-4.5" />
                </span>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                      What to Include
                    </h2>
                    <p className="text-[15px] leading-7 tracking-[-0.01em] text-slate-600">
                      The more detail you include, the easier it is for us to guide you and price
                      the right option.
                    </p>
                  </div>
                  <ul className="space-y-3 text-sm leading-7 text-slate-600">
                    <li className="flex items-start gap-3">
                      <MapPinned className="mt-1 size-4 shrink-0 text-[#A62103]" />
                      <span>Your area or town</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="mt-1 size-4 shrink-0 text-[#A62103]" />
                      <span>The canopy style or service you’re interested in</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Building2 className="mt-1 size-4 shrink-0 text-[#A62103]" />
                      <span>Whether it’s a domestic job or development work</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ImagePlus className="mt-1 size-4 shrink-0 text-[#A62103]" />
                      <span>Any preferred finishes, lighting, or entrance details</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="surface-panel p-6 md:p-7">
              <div className="flex items-start gap-4">
                <span className="brand-icon-tile flex size-11 shrink-0 items-center justify-center rounded-xl">
                  <ImagePlus className="size-4.5" />
                </span>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                    Submission Notes
                  </h2>
                  <p className="text-[15px] leading-7 tracking-[-0.01em] text-slate-600">
                    If you have a photo of the property, upload it with your enquiry. It can help
                    speed up the quoting process and make the first response more accurate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
