import { PageHeader } from "@/components/layout/page-header";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cookie Policy | Glen Canopies",
  description: "Read how Glen Canopies uses cookies and lightweight analytics on this website.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Cookie Policy", href: "/cookie-policy" },
        ]}
        eyebrow="Legal"
        title="Cookie Policy"
        description="This page explains how cookies and analytics may be used on the Glen Canopies website."
      />
      <section className="shell-container section-space">
        <div className="surface-panel rounded-[1.75rem] p-6 md:p-8">
          <div className="space-y-8 text-sm leading-7 text-slate-600 md:text-base">
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Essential Site Behaviour</h2>
              <p className="mt-4">
                The website may use basic technical storage where needed for secure forms,
                performance, and essential functionality.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Analytics</h2>
              <p className="mt-4">
                If analytics are enabled, Glen Canopies may collect general information such as
                page views, quote CTA clicks, and project page visits to help improve the website.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Managing Cookies</h2>
              <p className="mt-4">
                You can manage or clear cookies in your browser settings. Some functionality may be
                affected if essential storage is disabled.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
