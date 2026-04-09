export interface NewsPost {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  categorySlugs: string[];
  author: string;
  date: string;
  publishedAtISO?: string; // raw ISO date string for SEO/sitemap use
  image: string;
  excerpt?: string;
  comments?: number;
}

export interface SocialMetric {
  platform: string;
  stat: string;
  color: string;
}
