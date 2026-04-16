import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  src?: string;
  href?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
};

export function BrandLogo({
  src = "/brand/glen-canopies-logo.png",
  href = "/",
  width = 240,
  height = 112,
  className = "w-[164px] md:w-[190px]",
  style,
}: BrandLogoProps) {
  const logo = (
    <span
      className={cn("relative block shrink-0", className)}
      style={{ aspectRatio: `${width} / ${height}`, ...style }}
    >
      <Image
        src={src}
        alt="Glen Canopies"
        fill
        className="object-contain object-center"
        priority
        sizes={`${width}px`}
      />
    </span>
  );

  return href ? <Link className="flex items-center" href={href}>{logo}</Link> : logo;
}
