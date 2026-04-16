import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";

const styleCards = [
  {
    title: "Roman Canopies",
    description: "Decorative canopy styling for feature entrances and broader front elevations.",
    href: "/services/canopies/roman-canopies",
  },
  {
    title: "Small Lean-To",
    description: "Compact Lean-To canopies for tighter frontages and cleaner modern entrances.",
    href: "/services/canopies/small-lean-to-canopies",
  },
  {
    title: "Large Lean-To",
    description: "Broader canopy coverage with room for double-door layouts and LED detailing.",
    href: "/services/canopies/large-lean-to-canopies",
  },
  {
    title: "Apex Canopies",
    description: "Pitched canopy designs that add height, structure, and a sharper frontage line.",
    href: "/services/canopies/apex-canopies",
  },
];

export function StylesGrid() {
  return (
    <section className="shell-container section-space">
      <SectionHeading
        eyebrow="Styles"
        title="Canopy Styles"
        description="Explore popular canopy styles for domestic properties, developments, and project-led frontage upgrades."
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {styleCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="surface-panel group rounded-[1.25rem] p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold tracking-tight text-slate-950">{card.title}</h3>
              <p className="text-sm leading-7 text-slate-600">{card.description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
                Learn more
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
