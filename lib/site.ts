export const siteConfig = {
  name: "Glen Canopies",
  legalName: "Glen Canopies",
  title: "Premium canopy supply-and-fit specialists for homes and developments.",
  description:
    "Premium canopy supply-and-fit specialists for homes and developments across Ireland.",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000",
  locale: "en_GB",
  region: "Ireland",
  serviceArea: ["Ireland"],
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE?.trim() ?? "07833933639",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL?.trim() ?? "thomas@glencanopies.com",
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim() ?? "",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ?? "",
  facebookUrl:
    process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() ?? "https://www.facebook.com/glen.canopys",
};

export const primaryNavigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About & Services" },
  { href: "/recent-work", label: "Recent Work" },
  { href: "/developments", label: "Developments" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNavigation = {
  services: [
    { href: "/services/canopies", label: "Canopies" },
    { href: "/services/door-surrounds", label: "Door Surrounds" },
    { href: "/services/columns", label: "Columns" },
    { href: "/services/chimneys", label: "Chimneys" },
  ],
  company: [
    { href: "/about", label: "About & Services" },
    { href: "/recent-work", label: "Recent Work" },
    { href: "/developments", label: "Developments" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/cookie-policy", label: "Cookie Policy" },
  ],
} as const;

export function absoluteUrl(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(cleanPath, siteConfig.baseUrl).toString();
}

export function getPhoneHref(phone = siteConfig.phone) {
  return phone ? `tel:${phone.replace(/[^+\d]/g, "")}` : "";
}
