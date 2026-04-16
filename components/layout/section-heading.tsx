import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  actions?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  actions,
  className,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isCentered && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <div className="max-w-3xl space-y-2.5">
        <h2 className="title-as-eyebrow text-balance text-3xl text-slate-950 md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="text-pretty text-[1.0625rem] leading-[1.58] text-slate-600 md:text-[1.125rem]">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
