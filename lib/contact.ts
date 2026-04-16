import "server-only";

import { Resend } from "resend";

import { siteConfig } from "@/lib/site";

export type QuoteSubmission = {
  name: string;
  phone: string;
  email: string;
  area: string;
  serviceRequired: string;
  message: string;
  image?:
    | {
        filename: string;
        content: string;
        contentType: string;
      }
    | undefined;
};

function buildPlainTextMessage(submission: QuoteSubmission) {
  return [
    "New Glen Canopies quote enquiry",
    "",
    `Name: ${submission.name}`,
    `Phone: ${submission.phone}`,
    `Email: ${submission.email}`,
    `Area: ${submission.area}`,
    `Service Required: ${submission.serviceRequired}`,
    "",
    "Message:",
    submission.message,
  ].join("\n");
}

function buildHtmlMessage(submission: QuoteSubmission) {
  return `
    <h1>New Glen Canopies quote enquiry</h1>
    <p><strong>Name:</strong> ${submission.name}</p>
    <p><strong>Phone:</strong> ${submission.phone}</p>
    <p><strong>Email:</strong> ${submission.email}</p>
    <p><strong>Area:</strong> ${submission.area}</p>
    <p><strong>Service Required:</strong> ${submission.serviceRequired}</p>
    <p><strong>Message:</strong></p>
    <p>${submission.message.replace(/\n/g, "<br />")}</p>
  `;
}

export async function sendQuoteEnquiry(submission: QuoteSubmission) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.QUOTE_FROM_EMAIL?.trim();
  const toEmail = process.env.QUOTE_TO_EMAIL?.trim() || siteConfig.email;

  if (!apiKey || !fromEmail || !toEmail) {
    if (process.env.NODE_ENV === "development") {
      console.info("Quote enquiry transport is not configured. Logging submission instead.", {
        submission,
      });
      return;
    }

    throw new Error("Quote enquiry transport is not configured.");
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: submission.email,
    subject: `New quote enquiry from ${submission.name}`,
    html: buildHtmlMessage(submission),
    text: buildPlainTextMessage(submission),
    attachments: submission.image
      ? [
          {
            filename: submission.image.filename,
            content: submission.image.content,
          },
        ]
      : undefined,
  });

  if (error) {
    throw error;
  }
}

