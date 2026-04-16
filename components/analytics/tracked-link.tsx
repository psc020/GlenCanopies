"use client";

import Link, { type LinkProps } from "next/link";
import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from "react";

import { trackPlausibleEvent, type AnalyticsProps } from "@/lib/analytics";

type TrackedLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    eventName?: string;
    eventProps?: AnalyticsProps;
  };

export const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(
  ({ eventName, eventProps, onClick, ...props }, ref) => {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (eventName) {
        trackPlausibleEvent(eventName, eventProps);
      }

      onClick?.(event);
    };

    return <Link ref={ref} onClick={handleClick} {...props} />;
  },
);

TrackedLink.displayName = "TrackedLink";

