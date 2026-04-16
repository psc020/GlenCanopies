import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="shell-container section-space">
      <div className="surface-panel rounded-[2rem] p-8 md:p-10">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Page Not Found</h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-8 text-slate-600">
          The page you were looking for isn’t available. You can head back to the homepage,
          browse recent work, or request a quote.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">Back to Homepage</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/recent-work">View Recent Work</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
