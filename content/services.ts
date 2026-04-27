import { generalFaqs } from "@/content/faqs";
import type { Service, ServiceGroup } from "@/types/service";

const serviceFaqs = {
  canopies: [generalFaqs[0], generalFaqs[1], generalFaqs[2], generalFaqs[5]],
  lighting: [generalFaqs[0], generalFaqs[2], generalFaqs[3], generalFaqs[5]],
  developments: [generalFaqs[0], generalFaqs[1], generalFaqs[4], generalFaqs[5]],
  finishes: [generalFaqs[0], generalFaqs[2], generalFaqs[5]],
};

export const traditionalCanopyRangeParagraphs = [
  "Our collection of traditional-style door canopies is designed for straightforward installation and long-lasting performance. Each canopy is manufactured from Glass Reinforced Polymer (GRP), a proven composite material widely used in architectural applications. GRP offers exceptional durability and a high strength-to-weight ratio, making it ideal for door canopies. Unlike timber, it will not warp, rot, or deteriorate when exposed to the elements.",
  "Every canopy in this range is handcrafted in Northern Ireland and supplied and fitted by our trained professionals. A UV-stable protective coating is applied to help maintain its colour and prevent fading over time. This also means there is no need for ongoing repainting or maintenance, saving both time and effort.",
  "We offer five design variations to suit a wide range of property styles, including Roman, Small Lean-To, Large Lean-To, Flat Top, and Apex canopies. All models are designed to fit standard front door widths across the UK and Ireland.",
];

export const traditionalCanopyLeadParagraphs = traditionalCanopyRangeParagraphs.slice(0, 2);

export const services: Service[] = [
  {
    slug: "canopies",
    href: "/services/canopies",
    group: "canopies",
    icon: "canopies",
    title: "Canopies",
    shortTitle: "Canopies",
    heroEyebrow: "Canopy Services",
    intro:
      "Glen Canopies supplies and fits Roman, Lean-To, Flat Top, and Apex canopies across Ireland.",
    introParagraphs: traditionalCanopyRangeParagraphs,
    overview: "The main canopy category covering Roman, Lean-To, Flat Top, and Apex styles for homes and developments.",
    heroImage: "/brand/services/apex-canopies.jpg",
    benefits: [
      "Clear choice of canopy styles",
      "Options to suit different entrances and frontages",
      "Supply and fit service",
      "Strong focus on finish, proportion, and shelter",
    ],
    styleOptions: ["Roman Canopies", "Small Lean-To", "Large Lean-To", "Flat Top Canopies", "Apex Canopies"],
    childServiceSlugs: [
      "roman-canopies",
      "small-lean-to-canopies",
      "large-lean-to-canopies",
      "flat-top-canopies",
      "apex-canopies",
    ],
    bodySections: [
      {
        title: "Choosing the Right Canopy Style",
        paragraphs: [
          "The best canopy usually comes down to the shape of the entrance, how much coverage is needed, and the type of finish that suits the property.",
          "Roman styles work well where the entrance needs more character, Apex canopies add a stronger pitched profile, Lean-To canopies are a clean option for both compact and wider frontages, and Flat Top canopies suit simpler entrances that need a sharper understated line.",
        ],
      },
    ],
    faqs: serviceFaqs.canopies,
    relatedProjectTags: ["Roman", "Lean-Too", "Flat Top", "Apex", "Double Hipped", "LED Spotlights", "All Black"],
    seo: {
      title: "Canopies Ireland | Glen Canopies",
      description:
        "Roman, Lean-To, Flat Top and Apex canopies supplied and fitted across Ireland. Premium canopy specialists for homes and developments.",
    },
  },
  {
    slug: "roman-canopies",
    href: "/services/canopies/roman-canopies",
    group: "canopies",
    icon: "roman",
    title: "Roman Canopies",
    shortTitle: "Roman Canopies",
    heroEyebrow: "Decorative Canopy Style",
    intro:
      "This stylish canopy offers a more decorative and feature-led look, helping to give your entrance a stronger visual presence.",
    introParagraphs: traditionalCanopyLeadParagraphs,
    overview: "A more decorative canopy style that adds character and presence to the entrance.",
    heroImage: "/brand/services/roman-canopies.jpg",
    benefits: [
      "Adds character and presence to the entrance",
      "Manufactured from durable, lightweight materials",
      "Available in a range of colours and styles",
      "Can be enhanced with recessed lighting",
    ],
    styleOptions: ["Feature Entrances", "Double Door", "Decorative Profile"],
    bodySections: [
      {
        title: "Roman Canopy Details",
        paragraphs: [
          "Roman canopies help frame the entrance neatly and give the front of the property a broader, more decorative finish.",
          "They can be paired with recessed lighting and colour-matched finishes to tie in with the rest of the frontage without making the design feel overdone.",
        ],
      },
    ],
    faqs: serviceFaqs.canopies,
    relatedProjectTags: ["Roman", "Double Door"],
    seo: {
      title: "Roman Canopies Ireland | Glen Canopies",
      description:
        "Roman canopies supplied and fitted across Ireland. Decorative canopy styles for feature entrances and wider frontages.",
    },
  },
  {
    slug: "small-lean-to-canopies",
    href: "/services/canopies/small-lean-to-canopies",
    group: "canopies",
    icon: "small-lean-to",
    title: "Small Lean-To Canopies",
    shortTitle: "Small Lean-To Canopies",
    heroEyebrow: "Compact Lean-To Style",
    intro:
      "Our Small Lean-To canopy is one of the most popular options. It offers a clean, modern look, similar in style to a larger Lean-To, but designed to cover just the entrance door.",
    introParagraphs: traditionalCanopyLeadParagraphs,
    overview:
      "A clean, modern canopy designed to cover the entrance door. One of the most popular options for a simple but effective upgrade.",
    heroImage: "/brand/services/small-lean-to-canopies.jpg",
    benefits: [
      "Clean, modern look for the entrance door",
      "One of the most popular simple upgrades",
      "Can include columns, gallows brackets, and recessed lighting",
      "Includes fascia, soffits, and guttering as standard",
    ],
    styleOptions: ["Compact Coverage", "Modern Finish", "Single Door"],
    bodySections: [
      {
        title: "Small Lean-To Details",
        paragraphs: [
          "This style works especially well on standard front doors and smaller entrances where a simple, well-proportioned canopy is the right fit.",
          "It keeps the frontage looking neat while still giving useful shelter and a sharper finish around the doorway.",
          "Columns, gallows brackets, and recessed lighting can be added where a more detailed or more premium finish is wanted.",
        ],
      },
    ],
    faqs: serviceFaqs.finishes,
    relatedProjectTags: ["Lean-Too", "Single Door", "All Black"],
    seo: {
      title: "Small Lean-To Canopies Ireland",
      description:
        "Small Lean-To canopies supplied and fitted across Ireland. Compact, modern canopy designs for cleaner front entrances.",
    },
  },
  {
    slug: "large-lean-to-canopies",
    href: "/services/canopies/large-lean-to-canopies",
    group: "canopies",
    icon: "large-lean-to",
    title: "Large Lean-To Canopies",
    shortTitle: "Large Lean-To Canopies",
    heroEyebrow: "Wide Frontage Coverage",
    intro:
      "Our Large Lean-To canopy is designed for wider frontages, providing coverage across both the entrance and front-facing windows.",
    introParagraphs: traditionalCanopyLeadParagraphs,
    overview: "A wider canopy designed to cover larger frontages, including entrances and windows.",
    heroImage: "/brand/services/large-lean-to-canopies.jpg",
    benefits: [
      "Designed for wider frontages and front-facing windows",
      "Adds extra protection and a more balanced frontage",
      "Can include gallows brackets, columns, and recessed lighting",
      "Includes fascia, soffits, and guttering as standard",
    ],
    styleOptions: ["Wide Coverage", "LED Spotlights", "Double Door", "Double Hipped"],
    bodySections: [
      {
        title: "Large Lean-To Details",
        paragraphs: [
          "Large Lean-To canopies suit wider frontages, door-and-window combinations, and entrances where a smaller canopy would feel lost.",
          "They help bring the full front elevation together instead of only covering the doorway.",
          "Columns, gallows brackets, and recessed lighting can be included where a more modern and more complete frontage finish is needed.",
        ],
      },
    ],
    faqs: serviceFaqs.lighting,
    relatedProjectTags: ["Lean-Too", "Double Hipped", "LED Spotlights", "Double Door"],
    seo: {
      title: "Large Lean-To Canopies Ireland",
      description:
        "Large Lean-To canopies supplied and fitted across Ireland. Wider canopy designs for bigger frontages, double doors and LED options.",
    },
  },
  {
    slug: "flat-top-canopies",
    href: "/services/canopies/flat-top-canopies",
    group: "canopies",
    icon: "flat-top",
    title: "Flat Top Canopies",
    shortTitle: "Flat Top Canopies",
    heroEyebrow: "Minimal Flat Top Style",
    intro:
      "A flat top canopy is a minimalist approach to improving the entrance of your home while still giving practical shelter and a clean modern finish.",
    introParagraphs: traditionalCanopyLeadParagraphs,
    overview: "A minimal, modern canopy option for smaller entrances with a clean finish.",
    heroImage: "/brand/services/flat-top-canopies.jpg",
    benefits: [
      "Minimal, modern profile for smaller entrances",
      "Keeps the frontage clean and understated",
      "Can be designed in a range of finishes",
      "Includes fascia, soffits, and guttering as standard",
    ],
    styleOptions: ["Flat Top Profile", "Modern Finish", "Compact Entrance"],
    bodySections: [
      {
        title: "Flat Top Canopy Details",
        paragraphs: [
          "Flat Top canopies are a strong choice where the entrance needs a cleaner, simpler canopy line without the extra presence of a pitched design.",
          "They work well on small and medium-sized entrances and can be finished to suit the rest of the property.",
          "The result is a practical canopy that gives shelter while keeping the overall frontage looking neat and modern.",
        ],
      },
    ],
    faqs: serviceFaqs.finishes,
    relatedProjectTags: ["Flat Top", "Single Door", "All Black"],
    seo: {
      title: "Flat Top Canopies Ireland | Glen Canopies",
      description:
        "Flat Top canopies supplied and fitted across Ireland. Minimal modern canopy styles for clean front entrances and smaller openings.",
    },
  },
  {
    slug: "apex-canopies",
    href: "/services/canopies/apex-canopies",
    group: "canopies",
    icon: "apex",
    title: "Apex Canopies",
    shortTitle: "Apex Canopies",
    heroEyebrow: "Pitched Canopy Style",
    intro:
      "Apex canopies are a strong feature to add to the front of your home, offering both visual impact and practical protection from the elements.",
    introParagraphs: traditionalCanopyLeadParagraphs,
    overview: "A pitched canopy design that adds structure, style, and protection to the entrance.",
    heroImage: "/brand/services/chimneys.jpg",
    benefits: [
      "Adds visual impact and practical protection",
      "Designed and tailored to suit the property",
      "Available in a range of slate colours and styles",
      "Includes fascia, soffits, and guttering as standard",
    ],
    styleOptions: ["Pitched Profile", "All Black", "Single Door", "Development Work"],
    bodySections: [
      {
        title: "Apex Canopy Details",
        paragraphs: [
          "The pitched shape gives the entrance more structure and helps the canopy feel like part of the property rather than an add-on.",
          "It works particularly well on homes that suit a stronger roofline and a more defined front elevation.",
          "Apex canopies are available in a range of slate colours and styles so the final result can be matched more closely to the property.",
        ],
      },
    ],
    faqs: serviceFaqs.developments,
    relatedProjectTags: ["Apex", "All Black", "Housing Development", "Single Door"],
    seo: {
      title: "Apex Canopies Ireland | Glen Canopies",
      description:
        "Apex canopies supplied and fitted across Ireland. Strong pitched canopy designs for homes, developments, and modern front entrances.",
    },
  },
  {
    slug: "door-surrounds",
    href: "/services/door-surrounds",
    group: "additional",
    icon: "door-surrounds",
    title: "Door Surrounds",
    shortTitle: "Door Surrounds",
    heroEyebrow: "Entrance Finishing",
    intro:
      "Door surrounds help frame the entrance and give the front of your home a more complete and defined look.",
    overview: "A finishing feature that frames the entrance and gives it a more complete look.",
    heroImage: "/brand/services/door-surrounds.jpg",
    benefits: [
      "Frames the entrance and improves definition",
      "Fixed directly to the canopy and the property",
      "Helps create a more complete overall look",
      "Available in a range of styles and options",
    ],
    bodySections: [
      {
        title: "A Finishing Detail for the Entrance",
        paragraphs: [
          "Unlike columns, which are free-standing beneath the canopy, door surrounds are fixed directly to both the canopy and the front of the property.",
          "We offer a range of styles and options to suit different design preferences and property types.",
        ],
      },
    ],
    faqs: serviceFaqs.finishes,
    relatedProjectTags: [],
    seo: {
      title: "Door Surrounds Ireland | Glen Canopies",
      description:
        "Door surrounds supplied and fitted across Ireland to sharpen and complete the entrance alongside canopy work.",
    },
  },
  {
    slug: "columns",
    href: "/services/columns",
    group: "additional",
    icon: "columns",
    title: "Columns",
    shortTitle: "Columns",
    heroEyebrow: "Exterior Detailing",
    intro:
      "Columns are optional features that can be added to styles such as Small Lean-To, Large Lean-To, and Flat Top canopies.",
    overview:
      "Optional features that add structure and a more premium look to selected canopy styles.",
    heroImage: "/brand/services/columns.jpg",
    benefits: [
      "Adds structure and balance to the entrance",
      "Works with Small Lean-To, Large Lean-To, and Flat Top canopies",
      "Helps create a more premium overall look",
      "Can be customised to suit the property finish",
    ],
    bodySections: [
      {
        title: "When Columns Work Best",
        paragraphs: [
          "They add structure and balance to the entrance while also enhancing the overall look of the canopy.",
          "Each option can be customised to suit the design and finish of your property.",
        ],
      },
    ],
    faqs: serviceFaqs.finishes,
    relatedProjectTags: [],
    seo: {
      title: "Columns Ireland | Glen Canopies",
      description:
        "Columns supplied and fitted across Ireland for stronger entrance detailing and a more complete exterior finish.",
    },
  },
  {
    slug: "pvc-sills",
    href: "/services/pvc-sills",
    group: "additional",
    icon: "pvc-sills",
    title: "PVC Sills",
    shortTitle: "PVC Sills",
    heroEyebrow: "Exterior Finish Detailing",
    intro:
      "External PVC sills are a practical way to improve worn or discoloured window sills and refresh the look of your property.",
    overview:
      "Low-maintenance sill upgrades that improve the finish of windows and frontage.",
    heroImage: "/brand/services/pvc-sills.jpg",
    benefits: [
      "Improves worn or discoloured window sills",
      "Low maintenance throughout the year",
      "Durable and cost-effective",
      "Available in a range of colours and styles",
    ],
    bodySections: [
      {
        title: "Why PVC Sills Are Useful",
        paragraphs: [
          "They maintain their appearance throughout the year, require very little maintenance, and are a durable, cost-effective solution.",
          "Available in a range of colours and styles, they can be fitted to match and complement the existing frontage.",
        ],
      },
    ],
    faqs: serviceFaqs.finishes,
    relatedProjectTags: [],
    seo: {
      title: "PVC Sills Ireland | Glen Canopies",
      description:
        "PVC sills supplied and fitted across Ireland for a cleaner, low-maintenance exterior finish.",
    },
  },
  {
    slug: "aluminium-sills",
    href: "/services/aluminium-sills",
    group: "additional",
    icon: "aluminium-sills",
    title: "Aluminium Sills",
    shortTitle: "Aluminium Sills",
    heroEyebrow: "Premium Sill Detailing",
    intro:
      "Aluminium sills give a sharper, more premium finish where cleaner lines and a more modern look are wanted.",
    overview: "Premium sill detailing for contemporary frontages.",
    heroImage: "/brand/services/aluminium-sills.jpg",
    benefits: [
      "Sharper finish than more basic sill options",
      "Works well on modern frontages",
      "Durable and clean-lined",
      "Supports a more complete exterior finish",
    ],
    bodySections: [
      {
        title: "Aluminium Sill Details",
        paragraphs: [
          "Aluminium sills are a good fit for more modern projects where the finish needs to feel sharper and more deliberately detailed.",
        ],
      },
    ],
    faqs: serviceFaqs.finishes,
    relatedProjectTags: [],
    seo: {
      title: "Aluminium Sills Ireland | Glen Canopies",
      description:
        "Aluminium sills supplied and fitted across Ireland for a sharper, more premium exterior finish.",
    },
  },
  {
    slug: "chimneys",
    href: "/services/chimneys",
    group: "additional",
    icon: "chimneys",
    title: "Chimneys",
    shortTitle: "Chimneys",
    heroEyebrow: "Roofline Finishing",
    intro:
      "Chimney work can help the wider exterior feel more complete, especially on projects where the entrance and frontage are also being improved.",
    overview:
      "Chimney finishing that helps tie the upper roofline into the rest of the exterior upgrade.",
    heroImage: "/brand/services/apex-canopies.jpg",
    benefits: [
      "Helps the wider exterior feel complete",
      "Supports a cleaner roofline finish",
      "Works well with larger frontage upgrades",
      "Keeps detailing consistent across the property",
    ],
    bodySections: [
      {
        title: "Why Chimney Work Matters",
        paragraphs: [
          "On some projects, the chimney is part of the overall finish. When the entrance and frontage are being upgraded, roofline detail can make a big difference to the final look.",
        ],
      },
    ],
    faqs: serviceFaqs.finishes,
    relatedProjectTags: [],
    seo: {
      title: "Chimneys Ireland | Glen Canopies",
      description:
        "Chimney finishing and exterior detailing across Ireland to help complete wider frontage and roofline upgrades.",
    },
  },
];

export const canopyServices = services.filter((service) => service.group === "canopies");
export const additionalServices = services.filter((service) => service.group === "additional");

export function getServicesByGroup(group: ServiceGroup) {
  return services.filter((service) => service.group === group);
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function requireServiceBySlug(slug: string) {
  const service = getServiceBySlug(slug);

  if (!service) {
    throw new Error(`Missing service content for slug: ${slug}`);
  }

  return service;
}

export function getServiceByHref(href: string) {
  return services.find((service) => service.href === href);
}

export function getServiceBySegments(segments: string[]) {
  return getServiceByHref(`/services/${segments.join("/")}`);
}

export function getChildServices(service: Service) {
  return services.filter((candidate) => service.childServiceSlugs?.includes(candidate.slug));
}
