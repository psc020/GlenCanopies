const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ?? "";

export function getGoogleMapsEmbedUrl(query: string) {
  if (googleMapsApiKey) {
    const url = new URL("https://www.google.com/maps/embed/v1/place");
    url.searchParams.set("key", googleMapsApiKey);
    url.searchParams.set("q", query);
    url.searchParams.set("zoom", "11");
    return url.toString();
  }

  const url = new URL("https://www.google.com/maps");
  url.searchParams.set("q", query);
  url.searchParams.set("output", "embed");
  return url.toString();
}

export function getGoogleMapsLink(query: string) {
  const url = new URL("https://www.google.com/maps/search/");
  url.searchParams.set("api", "1");
  url.searchParams.set("query", query);
  return url.toString();
}

export function getMapPreviewFallbackAlt(query: string) {
  return `Map preview for ${query}`;
}
