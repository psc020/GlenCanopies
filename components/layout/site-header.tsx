"use client";

import Link from "next/link";
import { Menu, PhoneCall, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Button } from "@/components/ui/button";
import { getPhoneHref, primaryNavigation, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  logoSrc: string;
};

const MAX_HEADER_HEIGHT = 11;
const MIN_HEADER_HEIGHT = 6.1;
const MAX_VERTICAL_PADDING = 1.25;
const MIN_VERTICAL_PADDING = 0.95;
const MAX_HEADER_OFFSET = MAX_HEADER_HEIGHT + MAX_VERTICAL_PADDING * 2;
const SCROLL_DISTANCE = 260;
const FROST_START = 0.08;

export function SiteHeader({ logoSrc }: SiteHeaderProps) {
  const pathname = usePathname();
  const phoneHref = getPhoneHref();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let frame = 0;

    const updateScrollState = () => {
      const nextProgress = Math.min(window.scrollY / SCROLL_DISTANCE, 1);

      setScrollProgress((current) =>
        Math.abs(current - nextProgress) > 0.002 ? nextProgress : current,
      );

      frame = 0;
    };

    updateScrollState();
    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateScrollState);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  const headerHeight = MAX_HEADER_HEIGHT - (MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT) * scrollProgress;
  const verticalPadding =
    MAX_VERTICAL_PADDING - (MAX_VERTICAL_PADDING - MIN_VERTICAL_PADDING) * scrollProgress;
  const headerOffset = headerHeight + verticalPadding * 2;
  const frostProgress = Math.min(Math.max((scrollProgress - FROST_START) / (1 - FROST_START), 0), 1);
  const headerBackgroundAlpha = isHome && !isMobileMenuOpen ? frostProgress : 1;
  const headerShadowAlpha = isHome && !isMobileMenuOpen ? 0.48 * frostProgress : 0.38;

  useLayoutEffect(() => {
    document.documentElement.style.setProperty(
      "--site-header-height",
      `${headerHeight}rem`,
    );
    document.documentElement.style.setProperty(
      "--site-header-offset",
      `${headerOffset}rem`,
    );

    return () => {
      document.documentElement.style.setProperty("--site-header-height", `${MAX_HEADER_HEIGHT}rem`);
      document.documentElement.style.setProperty("--site-header-offset", `${MAX_HEADER_OFFSET}rem`);
    };
  }, [headerHeight, headerOffset]);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: `rgba(29, 29, 29, ${headerBackgroundAlpha})`,
        boxShadow: `0 18px 40px -28px rgba(17, 17, 17, ${headerShadowAlpha})`,
      }}
    >
      {isMobileMenuOpen ? (
        <button
          aria-label="Close mobile menu"
          className="fixed inset-0 z-0 lg:hidden"
          type="button"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      ) : null}
      <div
        className="relative z-10 shell-container-wide flex min-h-[var(--site-header-height)] items-center justify-between gap-4"
        style={{ paddingBlock: `${verticalPadding}rem` }}
      >
        <BrandLogo
          src={logoSrc}
          className="origin-left h-[calc(var(--site-header-height)-0.65rem)] w-[11.25rem] sm:w-[12rem] md:w-[12.75rem] lg:w-[13.5rem] xl:w-[14rem]"
        />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {primaryNavigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === item.href
                : item.href === "/about"
                  ? pathname.startsWith("/about") || pathname.startsWith("/services")
                  : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[15px] font-medium tracking-[-0.01em] text-white/72 transition-colors hover:text-[#fea502]",
                  active && "text-[#fea502]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          {phoneHref ? (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="border border-white/12 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <TrackedAnchor
                eventName="Phone CTA Clicked"
                eventProps={{ location: "header" }}
                href={phoneHref}
              >
                <PhoneCall />
                {siteConfig.phone}
              </TrackedAnchor>
            </Button>
          ) : null}
          <Button
            asChild
            size="sm"
            className="!border-[#fea502] !bg-[#fea502] !text-[#1d1d1d] hover:!border-[#fea502] hover:!bg-[#fea502] hover:!text-[#1d1d1d]"
          >
            <TrackedLink
              eventName="Quote CTA Clicked"
              eventProps={{ location: "header" }}
              href="/contact"
            >
              Get a Free Quote
            </TrackedLink>
          </Button>
        </div>
        <div className="lg:hidden">
          <button
            className="flex size-11 cursor-pointer items-center justify-center rounded-xl border border-white/14 bg-white/8 text-white transition-colors hover:bg-white/12 hover:text-white"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          {isMobileMenuOpen ? (
            <div
              className="absolute left-1/2 top-full w-screen -translate-x-1/2 bg-[#1D1D1D] shadow-[0_24px_60px_-44px_rgba(17,17,17,0.42)]"
              id="mobile-menu"
            >
              <nav className="shell-container flex flex-col gap-3 px-6 py-6" aria-label="Mobile">
                {primaryNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-4 py-3 text-[15px] font-medium tracking-[-0.01em] text-white/82 transition-colors hover:bg-white/8 hover:text-[#fea502]"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-3 flex flex-col gap-3">
                  <Button
                    asChild
                    className="!border-[#fea502] !bg-[#fea502] !text-[#1d1d1d] hover:!border-[#fea502] hover:!bg-[#fea502] hover:!text-[#1d1d1d]"
                  >
                    <TrackedLink
                      eventName="Quote CTA Clicked"
                      eventProps={{ location: "mobile-menu" }}
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get a Free Quote
                    </TrackedLink>
                  </Button>
                  {phoneHref ? (
                    <Button
                      asChild
                      variant="outline"
                      className="border-white/14 bg-white/8 text-white hover:bg-white/12 hover:text-white"
                    >
                      <TrackedAnchor
                        eventName="Phone CTA Clicked"
                        eventProps={{ location: "mobile-menu" }}
                        href={phoneHref}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <PhoneCall />
                        {siteConfig.phone}
                      </TrackedAnchor>
                    </Button>
                  ) : null}
                </div>
              </nav>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
