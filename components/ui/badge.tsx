import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[#1D1D1D]/8 bg-card px-3 py-1 text-[0.72rem] font-medium tracking-[-0.01em] text-slate-700",
        className,
      )}
      {...props}
    />
  );
}
