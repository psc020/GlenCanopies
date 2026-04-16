import Script from "next/script";

import { siteConfig } from "@/lib/site";

export function PlausibleScript() {
  if (!siteConfig.plausibleDomain) {
    return null;
  }

  return (
    <Script
      defer
      data-domain={siteConfig.plausibleDomain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}

