import { SocialMetric } from "@/types/news";

export type CategoryMeta = { slug: string; label: string };

// Canonical category list — slug is used in URLs (clean English),
// label is the Gurmukhi display name. Slugs match Sanity category slugs.
export const CATEGORIES: CategoryMeta[] = [
  { slug: "punjab", label: "ਪੰਜਾਬ" },
  { slug: "international", label: "ਵਿਦੇਸ਼" },
  { slug: "national", label: "ਦੇਸ਼" },
  { slug: "heritage", label: "ਵਿਰਾਸਤ" },
  { slug: "education", label: "ਸਿੱਖਿਆ" },
  { slug: "business", label: "ਕਾਰੋਬਾਰ" },
  { slug: "agriculture", label: "ਖੇਤੀ" },
  { slug: "science", label: "ਸਾਇੰਸ" },
  { slug: "sports", label: "ਖੇਡਾਂ" },
  { slug: "entertainment", label: "ਮਨੋਰੰਜਨ" },
  { slug: "technology", label: "ਟੈਕਨੋਲੋਜੀ ਅਤੇ AI" },
];

// Aliases: legacy/Sanity slugs mapped to canonical English slugs.
export const CATEGORY_SLUG_ALIASES: Record<string, string> = {
  videsh: "international",
  desh: "national",
  virasat: "heritage",
  kheti: "agriculture",
  khedan: "sports",
  manoranjan: "entertainment",
  "tech-ai": "technology",
};

export function normalizeCategorySlug(slug: string): string {
  return CATEGORY_SLUG_ALIASES[slug] ?? slug;
}

export const NAV_ITEMS = CATEGORIES;

export function categoryLabelFromSlug(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

export function categorySlugFromLabel(label: string): string {
  return CATEGORIES.find((c) => c.label === label)?.slug
    ?? label.toLowerCase().replace(/\s+/g, "-");
}

export const SOCIAL_METRICS: SocialMetric[] = [
  { platform: "Facebook", stat: "1.2M ਫਾਲੋਅਰ", color: "#1877F2" },
  { platform: "X", stat: "880K ਅਪਡੇਟ", color: "#111111" },
  { platform: "Instagram", stat: "640K ਦਰਸ਼ਕ", color: "#E4405F" },
  { platform: "YouTube", stat: "410K ਸਬਸਕ੍ਰਾਈਬਰ", color: "#FF0000" },
  { platform: "WhatsApp", stat: "Daily ਬੁਲੇਟਿਨ", color: "#25D366" },
  { platform: "RSS", stat: "ਫੀਡ ਐਕਟਿਵ", color: "#F26522" }
];
