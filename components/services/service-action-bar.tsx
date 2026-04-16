"use client";

import Link from "next/link";
import { Check, Copy, Mail, Share2 } from "lucide-react";
import { useState } from "react";

import { trackPlausibleEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ServiceActionBarProps = {
  title: string;
  shareUrl: string;
  enquiryHref: string;
  shareLabel?: string;
  enquiryLabel?: string;
  enquiryText?: string;
};

function FacebookShareIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn("shrink-0 fill-current", className)}
    >
      <path d="M13.5 22v-8.2h2.8l.42-3.2H13.5V8.57c0-.94.27-1.58 1.62-1.58h1.73V4.12c-.3-.04-1.33-.12-2.54-.12-2.5 0-4.21 1.53-4.21 4.34v2.26H7.3v3.2h2.85V22h3.35Z" />
    </svg>
  );
}

const shareButtonClassName =
  "inline-flex items-center gap-2 border border-slate-200 bg-white px-3.5 py-2 text-[14px] font-medium tracking-[-0.01em] text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-950";

export function ServiceActionBar({
  title,
  shareUrl,
  enquiryHref,
  shareLabel = "Share this page",
  enquiryLabel = "Enquire Now",
  enquiryText = "Send us your property details and we’ll help with the right canopy, finish, and quote.",
}: ServiceActionBarProps) {
  const [copied, setCopied] = useState(false);

  const emailHref = `mailto:?subject=${encodeURIComponent(`${title} | Glen Canopies`)}&body=${encodeURIComponent(`Take a look at this page from Glen Canopies:\n\n${shareUrl}`)}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      trackPlausibleEvent("Service Shared", { method: "copy-link", service: title });
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      trackPlausibleEvent("Service Shared", { method: "copy-link-failed", service: title });
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${title} | Glen Canopies`,
          text: `Take a look at this page from Glen Canopies.`,
          url: shareUrl,
        });
        trackPlausibleEvent("Service Shared", { method: "native-share", service: title });
      } catch {
        // Ignore cancelled native shares.
      }
      return;
    }

    await handleCopy();
  };

  return (
    <div className="grid gap-6 border-t border-slate-200 pt-6 md:grid-cols-[1fr_auto] md:items-center md:pt-8">
      <div className="space-y-3">
        <p className="eyebrow">{shareLabel}</p>
        <div className="flex flex-wrap gap-3">
          <button className={shareButtonClassName} type="button" onClick={handleNativeShare}>
            <Share2 className="size-4" />
            Share
          </button>
          <a
            className={shareButtonClassName}
            href={facebookHref}
            rel="noopener noreferrer"
            target="_blank"
            onClick={() =>
              trackPlausibleEvent("Service Shared", { method: "facebook", service: title })
            }
          >
            <FacebookShareIcon className="size-4" />
            Facebook
          </a>
          <a
            className={shareButtonClassName}
            href={emailHref}
            onClick={() => trackPlausibleEvent("Service Shared", { method: "email", service: title })}
          >
            <Mail className="size-4" />
            Email
          </a>
          <button className={shareButtonClassName} type="button" onClick={handleCopy}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy Link"}
          </button>
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 md:items-end">
        <Button asChild size="lg">
          <Link href={enquiryHref}>{enquiryLabel}</Link>
        </Button>
        <p className="max-w-[24rem] text-[0.94rem] leading-6 tracking-[-0.01em] text-slate-500 md:text-right">
          {enquiryText}
        </p>
      </div>
    </div>
  );
}
