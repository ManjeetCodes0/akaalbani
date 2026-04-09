import type { MetadataRoute } from "next";
import { fetchSanityPosts } from "@/lib/sanity";
import { NAV_ITEMS } from "@/data/news";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://akaalbani.com";

// Regenerate sitemap every hour so newly published Sanity articles appear
// without requiring a full redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchSanityPosts();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/advertise`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...NAV_ITEMS.map((cat) => ({
      url: `${BASE_URL}/news/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 0.8,
    })),
  ];

  const articlePages: MetadataRoute.Sitemap = posts
    .filter((p) => p.id)
    .map((p) => ({
      url: `${BASE_URL}/news/${p.categorySlug}/${p.id}`,
      // Use actual Sanity publish date so Google sees accurate freshness signals
      lastModified: p.publishedAtISO ? new Date(p.publishedAtISO) : new Date(),
      changeFrequency: "weekly" as const,
      // Recent articles get a small priority boost
      priority: 0.8,
    }));

  return [...staticPages, ...articlePages];
}
