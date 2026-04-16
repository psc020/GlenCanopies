import { ArrowRight, PhoneCall } from "lucide-react";

import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Button } from "@/components/ui/button";
import { getPhoneHref, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type CTASectionProps = {
  title: string;
  description: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  fullBleed?: boolean;
  tone?: "dark" | "red";
  backgroundImageSrc?: string;
  sectionClassName?: string;
};

export function CTASection({
  title,
  description,
  primaryLabel = "Get a Free Quote",
  secondaryLabel = "View Recent Work",
  backgroundImageSrc = "/brand/cta/schemenormal2.png",
  sectionClassName,
}: CTASectionProps) {
  const phoneHref = getPhoneHref();
  const secondaryHref = secondaryLabel === "Contact Us" ? "/contact" : "/recent-work";

  return (
    <section
      className={cn(
        "relative left-1/2 w-screen -translate-x-1/2 overflow-hidden text-white",
        sectionClassName,
      )}
      style={{
        backgroundColor: "#1D1D1D",
        backgroundImage: `linear-gradient(100deg, rgba(29,29,29,0.66) 0%, rgba(29,29,29,0.56) 38%, rgba(29,29,29,0.62) 100%), linear-gradient(180deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.28) 100%), url('${backgroundImageSrc}')`,
        backgroundPosition: "center 58%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="shell-container-wide grid min-h-[10.5rem] items-center gap-5 px-5 py-7 md:min-h-[12.5rem] md:grid-cols-[0.9fr_1.1fr] md:gap-8 md:px-8 md:py-8">
        <div className="space-y-3">
          <span className="eyebrow eyebrow-light">Get Started</span>
          <h2 className="text-balance font-[var(--font-display)] text-[clamp(1.9rem,4vw,3.35rem)] font-semibold leading-[0.97] tracking-[-0.05em] text-white">
            {title}
          </h2>
        </div>
        <div className="ml-auto max-w-[38rem] space-y-4 md:justify-self-end">
          <p className="text-pretty text-[0.98rem] leading-[1.56] tracking-[-0.016em] text-white/84 md:text-[1.04rem]">
            {description}
          </p>
          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
            <Button
              asChild
              className="border-[#A62103] bg-[#A62103] text-white shadow-none hover:border-[#8E1C02] hover:bg-[#8E1C02] hover:text-white"
            >
              <TrackedLink
                eventName="Quote CTA Clicked"
                eventProps={{ location: "cta-section" }}
                href="/contact"
              >
                {primaryLabel}
                <ArrowRight />
              </TrackedLink>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/16 bg-white/8 text-white hover:border-white/26 hover:bg-white/14 hover:text-white"
            >
              <TrackedLink href={secondaryHref}>{secondaryLabel}</TrackedLink>
            </Button>
            {phoneHref ? (
              <Button
                asChild
                variant="ghost"
                className="border border-white/12 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <TrackedAnchor
                  eventName="Phone CTA Clicked"
                  eventProps={{ location: "cta-section" }}
                  href={phoneHref}
                >
                  <PhoneCall />
                  {siteConfig.phone}
                </TrackedAnchor>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
