import { cn } from "@/lib/utils";

type FacebookButtonProps = {
  href: string;
  label?: string;
  className?: string;
  compact?: boolean;
};

function FacebookMark({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn(
        "shrink-0 fill-current",
        compact ? "size-4.5" : "size-5",
      )}
    >
      <path d="M13.5 22v-8.2h2.8l.42-3.2H13.5V8.57c0-.94.27-1.58 1.62-1.58h1.73V4.12c-.3-.04-1.33-.12-2.54-.12-2.5 0-4.21 1.53-4.21 4.34v2.26H7.3v3.2h2.85V22h3.35Z" />
    </svg>
  );
}

export function FacebookButton({
  href,
  label = "Facebook",
  className,
  compact = false,
}: FacebookButtonProps) {
  return (
    <a
      className={cn(
        "brand-icon-tile inline-flex items-center justify-center rounded-xl transition-colors duration-200 hover:bg-[rgb(var(--brand-red-rgb)/0.14)] hover:text-[#A62103]",
        compact ? "size-10" : "size-11",
        className,
      )}
      aria-label={label}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      title={label}
    >
      <FacebookMark compact={compact} />
    </a>
  );
}
