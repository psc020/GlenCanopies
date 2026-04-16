"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { sendQuoteEnquiry } from "@/lib/contact";

const acceptedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
const maxUploadSize = 5 * 1024 * 1024;

const quoteFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  phone: z.string().trim().min(7, "Please enter a contact number."),
  email: z.string().trim().email("Please enter a valid email address."),
  area: z.string().trim().min(2, "Please tell us which area the project is in."),
  serviceRequired: z.string().trim().min(2, "Please select the service you need."),
  message: z
    .string()
    .trim()
    .min(20, "Please add a little more detail about the project.")
    .max(2500, "Please keep the message under 2500 characters."),
  website: z.string().trim().optional(),
});

export type QuoteFormState = {
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof quoteFormSchema> | "image", string[]>>;
};

export const initialQuoteFormState: QuoteFormState = {};

function getImageFromFormData(formData: FormData) {
  const value = formData.get("image");

  if (!(value instanceof File) || value.size === 0) {
    return undefined;
  }

  return value;
}

export async function submitQuoteForm(
  _previousState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  const parsed = quoteFormSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    area: formData.get("area"),
    serviceRequired: formData.get("serviceRequired"),
    message: formData.get("message"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    return {
      message: "Please check the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (parsed.data.website) {
    redirect("/thank-you");
  }

  const image = getImageFromFormData(formData);

  if (image) {
    if (!acceptedImageTypes.includes(image.type)) {
      return {
        message: "Please upload a JPG, PNG, WEBP or HEIC image file.",
        fieldErrors: {
          image: ["Please upload a JPG, PNG, WEBP or HEIC image file."],
        },
      };
    }

    if (image.size > maxUploadSize) {
      return {
        message: "Please keep uploads below 5MB.",
        fieldErrors: {
          image: ["Please keep uploads below 5MB."],
        },
      };
    }
  }

  try {
    const attachment = image
      ? {
          filename: image.name,
          contentType: image.type,
          content: Buffer.from(await image.arrayBuffer()).toString("base64"),
        }
      : undefined;

    await sendQuoteEnquiry({
      ...parsed.data,
      image: attachment,
    });
  } catch (error) {
    console.error("Quote form submission failed", error);

    return {
      message:
        "We couldn't send your enquiry just now. Please try again, or call us directly if the problem continues.",
    };
  }

  redirect("/thank-you");
}

