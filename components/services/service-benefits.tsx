import { Check } from "lucide-react";

type ServiceBenefitsProps = {
  title?: string;
  items: string[];
};

export function ServiceBenefits({
  title = "Why this service works well",
  items,
}: ServiceBenefitsProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
      <ul className="mt-6 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 border-t border-slate-200 pt-4 text-sm leading-7 text-slate-700"
          >
            <span className="brand-icon-tile mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg">
              <Check className="size-3.5" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
