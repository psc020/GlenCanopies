import type { Metadata } from "next";

import "./globals.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PlausibleScript } from "@/components/analytics/plausible-script";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { buildLocalBusinessJsonLd, buildOrganizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  applicationName: siteConfig.name,
  title: siteConfig.name,
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.baseUrl,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [absoluteUrl("/opengraph-image")],
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const logoSrc = "/brand/logo1.png";

  return (
    <html className="bg-background" data-scroll-behavior="smooth" lang="en">
      <body className="site-shell antialiased">
        <PlausibleScript />
        <JsonLd data={[buildOrganizationJsonLd(), buildLocalBusinessJsonLd()]} />
        <SiteHeader logoSrc={logoSrc} />
        <div className="page-frame">{children}</div>
        <SiteFooter logoSrc={logoSrc} />
      </body>
    </html>
  );
}
