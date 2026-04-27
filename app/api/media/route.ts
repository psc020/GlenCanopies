import { type NextRequest, NextResponse } from "next/server";

import { absoluteHttpUrl } from "@/lib/utils";

function getAllowedHosts() {
  const hosts = new Set<string>();
  const configuredHosts = (
    process.env.APIFY_ALLOWED_IMAGE_HOSTS || process.env.SPIFFY_ALLOWED_IMAGE_HOSTS
  )
    ?.split(",")
    .map((item) => item.trim());

  for (const host of configuredHosts ?? []) {
    if (host) {
      hosts.add(host);
    }
  }

  const apiBaseUrl = process.env.APIFY_API_URL || process.env.SPIFFY_API_URL;

  if (apiBaseUrl) {
    hosts.add(new URL(apiBaseUrl).hostname);
  }

  return hosts;
}

function isAllowedHost(hostname: string, allowedHosts: Set<string>) {
  return [...allowedHosts].some((allowedHost) => {
    if (!allowedHost) {
      return false;
    }

    if (allowedHost.startsWith("*.")) {
      const domain = allowedHost.slice(2);
      return hostname === domain || hostname.endsWith(`.${domain}`);
    }

    if (allowedHost.startsWith(".")) {
      return hostname.endsWith(allowedHost);
    }

    return hostname === allowedHost;
  });
}

export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get("src");
  const validUrl = src ? absoluteHttpUrl(src) : null;

  if (!validUrl) {
    return NextResponse.json({ error: "Missing or invalid src parameter." }, { status: 400 });
  }

  const imageUrl = new URL(validUrl);
  const allowedHosts = getAllowedHosts();

  if (allowedHosts.size > 0 && !isAllowedHost(imageUrl.hostname, allowedHosts)) {
    return NextResponse.json(
      { error: "Image host is not allowed. Add it to SPIFFY_ALLOWED_IMAGE_HOSTS." },
      { status: 403 },
    );
  }

  const fetchImage = (headers?: HeadersInit) =>
    fetch(imageUrl, {
      headers,
      next: {
        revalidate: 60 * 60,
      },
    });

  let response = await fetchImage({
    Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "User-Agent": "Mozilla/5.0 (compatible; GlenCanopiesImageProxy/1.0; +https://glencanopies.com)",
  });

  if (!response.ok) {
    response = await fetchImage();
  }

  if (!response.ok) {
    return NextResponse.json({ error: "Unable to fetch remote image." }, { status: 502 });
  }

  const contentType = response.headers.get("content-type") || "application/octet-stream";
  const arrayBuffer = await response.arrayBuffer();

  return new NextResponse(arrayBuffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
