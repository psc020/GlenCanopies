export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  date: string;
  dateLabel: string;
  sourceLabel: string;
  sourceUrl?: string;
  avatarSrc?: string;
  imageSrc?: string;
  isRecommended: boolean;
};
