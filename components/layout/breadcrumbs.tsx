import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Breadcrumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Breadcrumb[];
  variant?: "default" | "inverse";
};

export function Breadcrumbs({ items, variant = "default" }: BreadcrumbsProps) {
  const isInverse = variant === "inverse";

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "text-[15px] leading-6 tracking-[-0.01em]",
        isInverse ? "text-white/70" : "text-slate-500",
      )}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  className={cn(
                    "font-normal transition-colors",
                    isInverse ? "hover:text-white" : "hover:text-slate-950",
                  )}
                  href={item.href}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "font-medium",
                    isInverse ? "text-white" : "text-slate-700",
                  )}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? <ChevronRight className="size-4" aria-hidden="true" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
