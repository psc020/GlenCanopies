import { PageEvent } from "@/components/analytics/page-event";
import { FormSuccessState } from "@/components/forms/form-success-state";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Thank You | Glen Canopies",
  description: "Thank you for contacting Glen Canopies. Your quote enquiry has been received.",
  path: "/thank-you",
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <div className="shell-container section-space">
      <PageEvent name="Contact Form Submitted" props={{ source: "contact-page" }} />
      <FormSuccessState />
    </div>
  );
}

