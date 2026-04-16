import { Clock3, Mail, PhoneCall } from "lucide-react";

import { FacebookButton } from "@/components/ui/facebook-button";
import { getPhoneHref, siteConfig } from "@/lib/site";

type SiteFooterProps = {
  logoSrc: string;
};

export function SiteFooter({ logoSrc }: SiteFooterProps) {
  void logoSrc;
  const phoneHref = getPhoneHref();

  return (
    <footer className="relative z-20 border-t border-white/10 bg-[#1D1D1D] text-white">
      <div className="shell-container-wide py-8 md:py-10">
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:gap-8">
          <div className="space-y-3">
            <p className="text-[15px] font-medium tracking-[-0.01em] text-white">
              &copy; 2026 Glen Canopies. All rights reserved.
            </p>
            <p className="max-w-xl text-[15px] leading-7 tracking-[-0.01em] text-white/72">
              Premium canopy supply-and-fit specialists across Ireland.
            </p>
          </div>

          <div className="grid gap-3 text-[15px] tracking-[-0.01em] text-white/72 md:justify-self-end">
            {phoneHref ? (
              <a className="inline-flex items-center gap-3 transition-colors hover:text-[#fea502]" href={phoneHref}>
                <PhoneCall className="size-4 text-[#fea502]" />
                <span>{siteConfig.phone}</span>
              </a>
            ) : null}
            {siteConfig.email ? (
              <a
                className="inline-flex items-center gap-3 transition-colors hover:text-[#fea502]"
                href={`mailto:${siteConfig.email}`}
              >
                <Mail className="size-4 text-[#fea502]" />
                <span>{siteConfig.email}</span>
              </a>
            ) : null}
            <div className="inline-flex items-center gap-3">
              <Clock3 className="size-4 text-[#fea502]" />
              <span>Mon - Fri, 8:00am - 5:00pm</span>
            </div>
            {siteConfig.facebookUrl ? (
              <div className="inline-flex items-center gap-3">
                <FacebookButton compact href={siteConfig.facebookUrl} label="Follow Glen Canopies on Facebook" />
                <a
                  className="transition-colors hover:text-[#fea502]"
                  href={siteConfig.facebookUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Follow us on Facebook
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
