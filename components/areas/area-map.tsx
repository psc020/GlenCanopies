import { MapPinned } from "lucide-react";

import { getGoogleMapsEmbedUrl, getGoogleMapsLink } from "@/lib/maps";

type AreaMapProps = {
  query: string;
  title: string;
};

export function AreaMap({ query, title }: AreaMapProps) {
  const embedUrl = getGoogleMapsEmbedUrl(query);
  const linkUrl = getGoogleMapsLink(query);

  return (
    <div className="overflow-hidden rounded-none border border-slate-200 bg-card shadow-[0_14px_28px_-24px_rgba(17,24,39,0.2)]">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
        <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-950">
          <MapPinned className="size-4 text-[#A62103]" />
          Map of {title}
        </div>
        <a
          className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 transition-colors hover:text-slate-950"
          href={linkUrl}
          rel="noreferrer"
          target="_blank"
        >
          Open Map
        </a>
      </div>
      <div className="relative aspect-[4/3] min-h-[220px]">
        <iframe
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={embedUrl}
          title={`${title} map`}
        />
      </div>
    </div>
  );
}
