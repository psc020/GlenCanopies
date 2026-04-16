import { PageHeader } from "@/components/layout/page-header";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | Glen Canopies",
  description: "Read how Glen Canopies handles enquiry data, uploaded images, and website information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy-policy" },
        ]}
        eyebrow="Legal"
        title="Privacy Policy"
        description="This policy explains how Glen Canopies handles information submitted through the website."
      />
      <section className="shell-container section-space">
        <div className="surface-panel rounded-[1.75rem] p-6 md:p-8">
          <div className="space-y-8 text-sm leading-7 text-slate-600 md:text-base">
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Information We Collect</h2>
              <p className="mt-4">
                When you contact Glen Canopies through the website, we may collect your name, phone
                number, email address, area, service details, message, and any image you choose to
                upload.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">How We Use It</h2>
              <p className="mt-4">
                We use the information you provide to respond to enquiries, prepare quotes, and
                manage customer communication.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Retention and Sharing</h2>
              <p className="mt-4">
                Enquiry data is kept only for as long as reasonably necessary to manage sales and
                follow-up. We do not sell your information. Service providers may process data where
                needed to deliver the website or email service securely.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
