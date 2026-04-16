export function TrustStrip() {
  return (
    <section className="relative isolate overflow-hidden bg-[#1D1D1D] text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(254,165,2,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(254,165,2,0.08),transparent_28%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:7rem_7rem]" />
      </div>

      <div className="shell-container relative section-space py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-12">
          <div className="space-y-4">
            <span className="eyebrow eyebrow-light">Why Choose</span>
            <h2 className="max-w-md text-balance text-[clamp(2rem,4vw,4.2rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white">
              Why Choose Glen Canopies
            </h2>
          </div>

          <div className="max-w-3xl border-l border-white/10 pl-0 text-[1rem] leading-8 tracking-[-0.014em] text-white/78 sm:text-[1.06rem] lg:pl-8">
            <p>
              With decades of experience, Glen Canopies has been proudly serving homes
              and businesses across Northern Ireland with high-quality, durable
              solutions. We specialise in the manufacture and supply of premium GRP
              products, including door canopies, lean-to canopies, and bespoke
              surrounds.
            </p>
            <p className="mt-5">
              Designed to enhance and protect your property, our products combine
              strength, low maintenance, and timeless style. At Glen Canopies, we take
              pride in delivering reliable craftsmanship and finishes built to last.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
