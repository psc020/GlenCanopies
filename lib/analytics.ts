export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: {
        props?: Record<string, string | number | boolean>;
      },
    ) => void;
  }
}

export function trackPlausibleEvent(eventName: string, props?: AnalyticsProps) {
  if (typeof window === "undefined" || typeof window.plausible !== "function") {
    return;
  }

  const filteredProps = Object.fromEntries(
    Object.entries(props ?? {}).filter(
      (entry): entry is [string, string | number | boolean] => entry[1] !== undefined,
    ),
  );

  window.plausible(eventName, {
    props: filteredProps,
  });
}
