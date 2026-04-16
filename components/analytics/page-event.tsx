"use client";

import { useEffect, useEffectEvent } from "react";

import { trackPlausibleEvent, type AnalyticsProps } from "@/lib/analytics";

type PageEventProps = {
  name: string;
  props?: AnalyticsProps;
};

export function PageEvent({ name, props }: PageEventProps) {
  const emitEvent = useEffectEvent(() => {
    trackPlausibleEvent(name, props);
  });

  useEffect(() => {
    emitEvent();
  }, []);

  return null;
}
