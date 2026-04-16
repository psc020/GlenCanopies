"use client";

import { MessageCircleMore, PhoneCall } from "lucide-react";

import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Button } from "@/components/ui/button";
import { getPhoneHref, siteConfig } from "@/lib/site";

export function MobileStickyCTA() {
  const phoneHref = getPhoneHref();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 px-4 lg:hidden">
      <div className="pointer-events-auto shell-container">
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="flex-1 border-[#A62103] bg-[#A62103] text-white shadow-[0_20px_36px_-22px_rgba(166,33,3,0.6)] hover:border-[#8E1C02] hover:bg-[#8E1C02] hover:text-white"
          >
            <TrackedLink
              eventName="Quote CTA Clicked"
              eventProps={{ location: "mobile-sticky" }}
              href="/contact"
            >
              <MessageCircleMore />
              Get a Quote
            </TrackedLink>
          </Button>
          {phoneHref ? (
            <Button
              asChild
              className="min-w-0 flex-1 border-[#1D1D1D] bg-[#1D1D1D] text-white shadow-[0_18px_30px_-24px_rgba(29,29,29,0.5)] hover:border-[#121212] hover:bg-[#121212] hover:text-white"
              variant="outline"
            >
              <TrackedAnchor
                eventName="Phone CTA Clicked"
                eventProps={{ location: "mobile-sticky" }}
                href={phoneHref}
              >
                <PhoneCall />
                <span className="truncate">{siteConfig.phone}</span>
              </TrackedAnchor>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
