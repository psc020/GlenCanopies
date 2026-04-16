import { FeaturedProjects } from "@/components/home/featured-projects";
import { Hero } from "@/components/home/hero";
import { ServicesGrid } from "@/components/home/services-grid";
import { TrustStrip } from "@/components/home/trust-strip";
import { DevelopmentHighlights } from "@/components/home/development-highlights";
import { ContactCTA } from "@/components/home/contact-cta";
import { TestimonialsSection } from "@/components/testimonials/testimonials-section";
import { services } from "@/content/services";
import { dedupeProjectsBySlug, getServiceShowcaseImageMap } from "@/lib/project-showcase";
import { buildMetadata } from "@/lib/seo";
import { getDevelopmentProjects, getFeaturedProjects, getProjects } from "@/lib/spiffy";
import { getTestimonials } from "@/lib/testimonials";

export const metadata = buildMetadata({
  title: "Canopies Ireland | Glen Canopies",
  description:
    "Roman, Lean-To, Flat Top and Apex canopies supplied and fitted across Ireland, with matching exterior finishing services. Get a free quote.",
  path: "/",
});

export default async function HomePage() {
  const [heroProjects, developmentProjects, allProjects, testimonials] = await Promise.all([
    getFeaturedProjects(5),
    getDevelopmentProjects(10),
    getProjects(),
    getTestimonials(10),
  ]);
  const featuredProjects = heroProjects.slice(0, 4);
  const uniqueDevelopmentProjects = dedupeProjectsBySlug(developmentProjects).slice(0, 3);
  const serviceImageMap = getServiceShowcaseImageMap(
    allProjects,
    services.map((service) => service.slug),
  );

  return (
    <>
      <Hero />
      <div className="relative z-10 bg-background">
        <TrustStrip />
        <ServicesGrid
          developmentImageSrc={uniqueDevelopmentProjects[0]?.images[0]?.src}
          imageByServiceSlug={serviceImageMap}
          services={services}
        />
        <FeaturedProjects projects={featuredProjects} />
        <div className="shell-container section-space">
          <TestimonialsSection
            testimonials={testimonials}
            eyebrow="Testimonials"
            title="What Customers Say"
            description="Feedback from customers across Ireland after their canopy installation."
          />
        </div>
        <DevelopmentHighlights projects={uniqueDevelopmentProjects} />
        <ContactCTA />
      </div>
    </>
  );
}
