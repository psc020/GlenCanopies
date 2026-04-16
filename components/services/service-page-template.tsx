import { ProjectGrid } from "@/components/projects/project-grid";
import { CTASection } from "@/components/layout/cta-section";
import { SectionHeading } from "@/components/layout/section-heading";
import { ServiceCard } from "@/components/services/service-card";
import { ServiceHero } from "@/components/services/service-hero";
import { getChildServices } from "@/content/services";
import type { BreadcrumbItem } from "@/lib/seo";
import type { Project } from "@/types/project";
import type { Service } from "@/types/service";

type ServicePageTemplateProps = {
  service: Service;
  breadcrumbs: BreadcrumbItem[];
  heroImageSrc?: string;
  relatedProjects?: Project[];
};

export function ServicePageTemplate({
  service,
  breadcrumbs,
  heroImageSrc,
  relatedProjects = [],
}: ServicePageTemplateProps) {
  const childServices = getChildServices(service);
  const isMainServicePage = service.slug === "canopies";
  const visibleSections = service.bodySections.filter(
    (section) => !section.title.startsWith("Where "),
  );
  const relatedProjectsTitle =
    isMainServicePage
      ? "Recent Canopy Projects"
      : service.group === "canopies"
      ? "Recent Projects Using This Style"
      : "Recent Projects Using This Service";
  const relatedProjectsDescription =
    isMainServicePage
      ? "A few recent installations that show how Glen Canopies styles are being used on completed properties."
      : service.group === "canopies"
      ? "A few recent installations that show how this canopy style is being used on completed projects."
      : "A few recent installations that show how this service is being used on completed projects.";

  return (
    <>
      <ServiceHero
        breadcrumbs={breadcrumbs}
        imageSrc={heroImageSrc}
        service={service}
        showBenefits={!isMainServicePage}
      />
      <div className="shell-container section-space space-y-7 md:space-y-8">
        {isMainServicePage ? (
          <>
            {visibleSections.length > 0 ? (
              <section className="max-w-4xl space-y-8">
                {visibleSections.map((section) => (
                  <section
                    key={section.title}
                    className="border-t border-slate-200 pt-6 first:border-t-0 first:pt-0"
                  >
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{section.title}</h2>
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-pretty text-[1rem] leading-7 text-slate-600 md:text-[1.0625rem]">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {section.bullets?.length ? (
                      <ul className="mt-6 grid gap-3 md:grid-cols-2">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="surface-panel rounded-[1rem] px-4 py-3 text-sm font-medium leading-7 text-slate-700"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </section>
            ) : null}
            {childServices.length > 0 ? (
              <section className="space-y-8">
                <SectionHeading
                  eyebrow="Canopy Styles"
                  title="Choose a Canopy Style"
                  description="Explore the main canopy styles and compare the option that best suits your entrance."
                />
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
                  {childServices.map((childService) => (
                    <ServiceCard key={childService.slug} service={childService} />
                  ))}
                </div>
              </section>
            ) : null}
            {relatedProjects.length > 0 ? (
              <section className="space-y-8">
                <SectionHeading
                  eyebrow="Recent Work"
                  title={relatedProjectsTitle}
                  description={relatedProjectsDescription}
                />
                <ProjectGrid className="xl:grid-cols-3" projects={relatedProjects} />
              </section>
            ) : null}
          </>
        ) : (
          <>
            {visibleSections.length > 0 ? (
              <section className="max-w-4xl space-y-8">
                {visibleSections.map((section) => (
                  <section
                    key={section.title}
                    className="border-t border-slate-200 pt-6 first:border-t-0 first:pt-0"
                  >
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{section.title}</h2>
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-pretty text-[1rem] leading-7 text-slate-600 md:text-[1.0625rem]">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {section.bullets?.length ? (
                      <ul className="mt-6 grid gap-3 md:grid-cols-2">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="surface-panel rounded-[1rem] px-4 py-3 text-sm font-medium leading-7 text-slate-700"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </section>
            ) : null}
            {relatedProjects.length > 0 ? (
              <section className="space-y-8">
                <SectionHeading
                  eyebrow="Recent Work"
                  title={relatedProjectsTitle}
                  description={relatedProjectsDescription}
                />
                <ProjectGrid className="xl:grid-cols-3" projects={relatedProjects} />
              </section>
            ) : null}
          </>
        )}
      </div>
      <CTASection
        title={`Need Help with ${service.shortTitle}?`}
        description="Tell us about the property, the style you have in mind, and your area, and we’ll help you find the right option."
      />
    </>
  );
}
