"use client";

import { useActionState } from "react";

import { submitQuoteForm, initialQuoteFormState } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileUploadField } from "@/components/forms/file-upload-field";
import { services } from "@/content/services";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p className="text-sm font-medium text-red-600" id={id}>
      {message}
    </p>
  );
}

export function QuoteForm() {
  const [state, formAction, isPending] = useActionState(submitQuoteForm, initialQuoteFormState);

  return (
    <form action={formAction} className="surface-panel rounded-[1.5rem] p-6 md:p-8">
      <div className="space-y-2 border-b border-slate-200 pb-6 md:pb-7">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950 md:text-[1.9rem]">
          Request a Quote
        </h2>
        <p className="max-w-2xl text-[15px] leading-7 tracking-[-0.01em] text-slate-600">
          Tell us about the property, the style you&apos;re considering, and any finish or
          entrance details you already have in mind.
        </p>
      </div>
      <div className="grid gap-6 pt-6 md:grid-cols-2 md:gap-7 md:pt-7">
        <div className="space-y-3">
          <Label htmlFor="name">Name</Label>
          <Input aria-describedby={state.fieldErrors?.name ? "name-error" : undefined} id="name" name="name" />
          <FieldError id="name-error" message={state.fieldErrors?.name?.[0]} />
        </div>
        <div className="space-y-3">
          <Label htmlFor="phone">Phone</Label>
          <Input
            aria-describedby={state.fieldErrors?.phone ? "phone-error" : undefined}
            id="phone"
            name="phone"
            type="tel"
          />
          <FieldError id="phone-error" message={state.fieldErrors?.phone?.[0]} />
        </div>
        <div className="space-y-3">
          <Label htmlFor="email">Email</Label>
          <Input
            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
            id="email"
            name="email"
            type="email"
          />
          <FieldError id="email-error" message={state.fieldErrors?.email?.[0]} />
        </div>
        <div className="space-y-3">
          <Label htmlFor="area">Area</Label>
          <Input aria-describedby={state.fieldErrors?.area ? "area-error" : undefined} id="area" name="area" />
          <FieldError id="area-error" message={state.fieldErrors?.area?.[0]} />
        </div>
        <div className="space-y-3 md:col-span-2">
          <Label htmlFor="serviceRequired">Service Required</Label>
          <Select
            aria-describedby={state.fieldErrors?.serviceRequired ? "service-error" : undefined}
            defaultValue=""
            id="serviceRequired"
            name="serviceRequired"
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </Select>
          <FieldError id="service-error" message={state.fieldErrors?.serviceRequired?.[0]} />
        </div>
        <div className="space-y-3 md:col-span-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
            id="message"
            name="message"
            placeholder="Tell us about the property, canopy style, finish, and anything else that will help with the quote."
          />
          <FieldError id="message-error" message={state.fieldErrors?.message?.[0]} />
        </div>
        <div className="md:col-span-2">
          <FileUploadField id="image" name="image" error={state.fieldErrors?.image?.[0]} />
        </div>
      </div>
      <div className="hidden">
        <Label htmlFor="website">Website</Label>
        <Input autoComplete="off" id="website" name="website" tabIndex={-1} />
      </div>
      {state.message ? (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      ) : null}
      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <p className="max-w-xl text-sm leading-7 text-slate-500">
          Your details are validated and submitted server-side. We only use them to respond to your
          quote enquiry.
        </p>
        <Button className="min-w-[12.5rem] whitespace-nowrap" disabled={isPending} size="lg" type="submit">
          {isPending ? "Sending enquiry..." : "Send Quote Request"}
        </Button>
      </div>
    </form>
  );
}
