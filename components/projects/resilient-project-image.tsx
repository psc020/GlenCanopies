"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { ProjectImage } from "@/types/project";

type ResilientProjectImageProps = Omit<ImageProps, "src" | "alt"> & {
  images: ProjectImage[];
  fallbackAlt?: string;
  onExhausted?: () => void;
};

export function ResilientProjectImage({
  images,
  fallbackAlt,
  onExhausted,
  onError,
  unoptimized,
  ...props
}: ResilientProjectImageProps) {
  const candidates = useMemo(() => {
    const seen = new Set<string>();

    return images.filter((image) => {
      if (!image?.src || seen.has(image.src)) {
        return false;
      }

      seen.add(image.src);
      return true;
    });
  }, [images]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExhausted, setIsExhausted] = useState(candidates.length === 0);

  useEffect(() => {
    if (isExhausted) {
      onExhausted?.();
    }
  }, [isExhausted, onExhausted]);

  if (isExhausted || candidates.length === 0) {
    return null;
  }

  const currentImage = candidates[Math.min(currentIndex, candidates.length - 1)];

  return (
    <Image
      {...props}
      src={currentImage.src}
      alt={currentImage.alt || fallbackAlt || ""}
      unoptimized={unoptimized ?? currentImage.src.includes("/api/media?")}
      onError={(event) => {
        onError?.(event);

        if (currentIndex < candidates.length - 1) {
          setCurrentIndex((index) => index + 1);
          return;
        }

        setIsExhausted(true);
      }}
    />
  );
}
