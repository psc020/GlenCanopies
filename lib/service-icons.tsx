import {
  Columns3,
  DoorOpen,
  Flame,
  Hexagon,
  LayoutPanelTop,
  Pill,
} from "lucide-react";

type IconProps = {
  className?: string;
};

function RomanCanopyIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 11.9 12 8.25l8.5 3.65" />
      <path d="M4.85 11.9h14.3" />
      <path d="M6.45 11.9v4.4" />
      <path d="M17.55 11.9v4.4" />
      <path d="M6.45 16.3 4.95 18.2" />
      <path d="M17.55 16.3l1.5 1.9" />
      <path d="M12 8.25v3.65" />
    </svg>
  );
}

function SmallLeanToCanopyIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.2 9.95h13.6" />
      <path d="M4.2 11.75h15.6" />
      <path d="M6.55 11.75v4.85" />
      <path d="M17.45 11.75v4.85" />
      <path d="M6.55 16.6 5.15 18.25" />
      <path d="M17.45 16.6l1.4 1.65" />
    </svg>
  );
}

function LargeLeanToCanopyIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.4 9.75h19.2" />
      <path d="M1.8 11.7h20.4" />
      <path d="M4.75 11.7v4.8" />
      <path d="M12 11.7v4.8" />
      <path d="M19.25 11.7v4.8" />
      <path d="M4.75 16.5 3.35 18.15" />
      <path d="M12 16.5v1.7" />
      <path d="M19.25 16.5l1.4 1.65" />
    </svg>
  );
}

function ApexCanopyIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 11.6 12 5l8.5 6.6" />
      <path d="M5.5 11.6h13" />
      <path d="M12 5v6.6" />
      <path d="M6.75 11.6v5.1" />
      <path d="M17.25 11.6v5.1" />
      <path d="M6.75 16.7 5.2 18.7" />
      <path d="M17.25 16.7l1.55 2" />
    </svg>
  );
}

function FlatTopCanopyIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.2 8.8v8.7" />
      <path d="M18.8 8.8v8.7" />
      <path d="M5.2 8.8h13.6" />
    </svg>
  );
}

export function ServiceIcon({
  iconKey,
  className,
}: {
  iconKey: string;
  className?: string;
}) {
  switch (iconKey) {
    case "roman":
      return <RomanCanopyIcon className={className} />;
    case "small-lean-to":
      return <SmallLeanToCanopyIcon className={className} />;
    case "large-lean-to":
      return <LargeLeanToCanopyIcon className={className} />;
    case "apex":
      return <ApexCanopyIcon className={className} />;
    case "flat-top":
      return <FlatTopCanopyIcon className={className} />;
    case "door-surrounds":
      return <DoorOpen className={className} />;
    case "columns":
      return <Columns3 className={className} />;
    case "pvc-sills":
      return <Pill className={className} />;
    case "aluminium-sills":
      return <Hexagon className={className} />;
    case "chimneys":
      return <Flame className={className} />;
    default:
      return <LayoutPanelTop className={className} />;
  }
}
