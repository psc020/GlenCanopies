import Image from "next/image";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, FolderKanban, Layers3 } from "lucide-react";

import { TrackedLink } from "@/components/analytics/tracked-link";
import { Button } from "@/components/ui/button";

const quickExploreLinks = [
  {
    title: "Canopy styles",
    copy: "Roman, Apex, Small Lean-To, and Large Lean-To styles.",
    href: "#canopy-styles",
    icon: Layers3,
  },
  {
    title: "Recent installations",
    copy: "Browse completed canopy projects across Ireland.",
    href: "#recent-installations",
    icon: FolderKanban,
  },
  {
    title: "Development work",
    copy: "Canopy installations for housing schemes and multi-property projects.",
    href: "#development-scheme-work",
    icon: BriefcaseBusiness,
  },
] as const;

export function Hero() {
  return (
    <section className="relative isolate z-0 -mt-[var(--site-header-offset-max)] overflow-hidden bg-[#1D1D1D] text-white">
      <div className="absolute inset-0">
        <Image
          src="/brand/hero/heronew.png"
          alt="Aerial view of homes across Ireland"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(29,29,29,0.88)_0%,rgba(29,29,29,0.54)_44%,rgba(29,29,29,0.34)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.3)_100%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:8rem_8rem]" />
      </div>

      <div
        className="relative z-10 shell-container-wide flex min-h-[26rem] items-end px-4 pb-5 sm:px-6 sm:pb-6 lg:px-8 lg:pb-10 xl:min-h-[44rem]"
        style={{ paddingTop: "calc(var(--site-header-offset-max) + clamp(0.75rem, 2vw, 2rem))" }}
      >
        <div className="grid w-full gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-end xl:gap-10">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <h1 className="max-w-4xl text-balance text-[clamp(2.05rem,8vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-white">
                  Canopy Solutions
                </h1>
                <p className="max-w-2xl text-balance text-[clamp(1rem,3.6vw,2rem)] font-medium tracking-[-0.03em] text-white/88">
                  Quality canopies for homes and developments
                </p>
                <p className="max-w-2xl text-pretty text-[0.98rem] leading-[1.6] tracking-[-0.015em] text-white/74 md:text-[1.12rem]">
                  Glen Canopies supplies and fits stylish, practical canopies that improve
                  shelter and finish the front of your property properly.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-[3rem] border-[#fea502] bg-[#fea502] px-6 text-[0.92rem] font-semibold text-[#1d1d1d] shadow-[0_22px_54px_rgba(29,29,29,0.28)] hover:border-[#fea502] hover:bg-[#fea502]">
                <TrackedLink
                  eventName="Quote CTA Clicked"
                  eventProps={{ location: "hero" }}
                  href="/contact"
                >
                  Get a Free Quote
                  <ArrowRight />
                </TrackedLink>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-[3rem] border-white/16 bg-white/8 px-6 text-[0.92rem] font-semibold text-white hover:border-white/26 hover:bg-white/14 hover:text-white">
                <TrackedLink href="#recent-installations">View Recent Work</TrackedLink>
              </Button>
            </div>

            <div className="grid gap-3 xl:hidden">
              {quickExploreLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <TrackedLink
                    key={item.title}
                    eventName="Hero Quick Link Clicked"
                    eventProps={{ section: item.title }}
                    href={item.href}
                    className="group flex items-center justify-between gap-4 border border-white/12 bg-black/26 px-4 py-2.5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center bg-white/8 text-[#fea502] transition-colors group-hover:bg-white/14">
                        <Icon className="size-4.5" />
                      </span>
                      <div>
                        <p className="text-[0.98rem] font-semibold tracking-[-0.02em] text-white">
                          {item.title}
                        </p>
                        <p className="text-[0.9rem] leading-6 tracking-[-0.012em] text-white/64">
                          {item.copy}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="size-4 shrink-0 text-white/54 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </TrackedLink>
                );
              })}
            </div>
          </div>

          <div className="hidden gap-4 xl:grid xl:justify-self-end xl:min-w-[30rem] xl:max-w-[31rem]">
            <div className="border border-white/12 bg-black/30 p-5 shadow-[0_28px_70px_rgba(13,9,11,0.22)] backdrop-blur-[2px] md:p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[0.9rem] font-semibold tracking-[-0.02em] text-[#fea502]">
                  Quick explore
                </p>
                <p className="text-[0.8rem] font-medium tracking-[-0.01em] text-white/50">
                  Jump to section
                </p>
              </div>
              <div className="mt-5 space-y-3">
                {quickExploreLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <TrackedLink
                      key={item.title}
                      eventName="Hero Quick Link Clicked"
                      eventProps={{ section: item.title }}
                      href={item.href}
                      className="group grid gap-3 border-t border-white/10 pt-4 first:border-t-0 first:pt-0"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <span className="flex size-11 shrink-0 items-center justify-center bg-white/8 text-[#fea502] transition-colors group-hover:bg-white/14">
                            <Icon className="size-4.5" />
                          </span>
                          <div className="space-y-1.5">
                            <p className="text-[1.02rem] font-semibold tracking-[-0.025em] text-white">
                              {item.title}
                            </p>
                            <p className="text-[0.95rem] leading-6 tracking-[-0.012em] text-white/66">
                              {item.copy}
                            </p>
                          </div>
                        </div>
                        <ArrowUpRight className="mt-1 size-4 shrink-0 text-white/52 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                      </div>
                    </TrackedLink>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
