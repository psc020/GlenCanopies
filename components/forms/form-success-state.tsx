import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FormSuccessState() {
  return (
    <div className="surface-panel rounded-[2rem] p-8 md:p-10">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-600 text-white">
        <CheckCircle2 className="size-7" />
      </div>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
        Thanks for Getting in Touch
      </h1>
      <p className="mt-4 max-w-2xl text-pretty text-base leading-8 text-slate-600 md:text-lg">
        Your enquiry has been received. We&apos;ll be in touch as soon as we can.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/recent-work">
            View Recent Work
            <ArrowRight />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/about#services">Explore Services</Link>
        </Button>
      </div>
    </div>
  );
}
