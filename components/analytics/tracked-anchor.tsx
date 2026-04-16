"use client";

import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from "react";

import { trackPlausibleEvent, type AnalyticsProps } from "@/lib/analytics";

type TrackedAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName?: string;
  eventProps?: AnalyticsProps;
};

export const TrackedAnchor = forwardRef<HTMLAnchorElement, TrackedAnchorProps>(
  ({ eventName, eventProps, onClick, ...props }, ref) => {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (eventName) {
        trackPlausibleEvent(eventName, eventProps);
      }

      onClick?.(event);
    };

    return <a ref={ref} onClick={handleClick} {...props} />;
  },
);

TrackedAnchor.displayName = "TrackedAnchor";

