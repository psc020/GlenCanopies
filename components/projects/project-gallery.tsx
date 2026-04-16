"use client";

import { useState } from "react";

import { ResilientProjectImage } from "@/components/projects/resilient-project-image";
import type { ProjectImage } from "@/types/project";

type ProjectGalleryProps = {
  images: ProjectImage[];
};

function ProjectGalleryItem({ image }: { image: ProjectImage }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <figure className="surface-panel overflow-hidden rounded-[1.5rem] p-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem]">
        <ResilientProjectImage
          images={[image]}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 42vw, 100vw"
          onExhausted={() => setIsVisible(false)}
        />
      </div>
    </figure>
  );
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {images.map((image, index) => (
        <ProjectGalleryItem key={`${image.src}-${index}`} image={image} />
      ))}
    </div>
  );
}
