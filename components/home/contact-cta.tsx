import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/analytics/tracked-link";

export function ContactCTA() {
  return (
    <section
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden text-white"
      style={{
        backgroundColor: "#1D1D1D",
        backgroundImage:
          "linear-gradient(100deg, rgba(29,29,29,0.66) 0%, rgba(29,29,29,0.56) 38%, rgba(29,29,29,0.62) 100%), linear-gradient(180deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.28) 100%), url('/brand/cta/schemenormal2.webp')",
        backgroundPosition: "center 58%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      >
      <div className="shell-container-wide grid min-h-[10.5rem] items-center gap-5 px-5 py-7 md:min-h-[13rem] md:grid-cols-[0.9fr_1.1fr] md:gap-8 md:px-8 md:py-8">
        <div className="space-y-3">
          <span className="eyebrow eyebrow-light">Get Started</span>
          <h2 className="text-balance font-[var(--font-display)] text-[clamp(1.9rem,4vw,3.5rem)] font-semibold leading-[0.97] tracking-[-0.05em] text-white">
            Get a Free Quote
          </h2>
        </div>
        <div className="ml-auto max-w-[34rem] space-y-4 md:justify-self-end">
          <p className="text-pretty text-[0.98rem] leading-[1.56] tracking-[-0.016em] text-white/88 md:text-[1.06rem]">
            Tell us about your property, the style you like, and your area, and we&apos;ll help
            you with the right quote.
          </p>
          <div>
            <Button
              asChild
              className="border-[#A62103] bg-[#A62103] text-white shadow-none hover:border-[#8E1C02] hover:bg-[#8E1C02] hover:text-white"
              size="lg"
            >
              <TrackedLink
                eventName="Quote CTA Clicked"
                eventProps={{ location: "home-bottom-banner" }}
                href="/contact"
              >
                Get a Free Quote
                <ArrowRight />
              </TrackedLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
