import { fetchSanityPosts } from "@/lib/sanity";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://akaalbani.com";
const PUBLICATION_NAME = "ਆਕਾਲ ਬਾਣੀ";
const LANGUAGE = "pa"; // Punjabi (ISO 639-1)

// Google News sitemaps must only contain articles published in the last 2 days.
// Revalidate every 15 minutes so breaking news appears quickly.
export const revalidate = 900;

export async function GET() {
  const posts = await fetchSanityPosts();

  // Filter to articles published within the last 48 hours (Google News requirement)
  const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

  const recentPosts = posts.filter((p) => {
    if (!p.publishedAtISO) return false;
    return new Date(p.publishedAtISO) >= twoDaysAgo;
  });

  const urlEntries = recentPosts
    .filter((p) => p.id && p.title)
    .map((p) => {
      const pubDate = p.publishedAtISO
        ? new Date(p.publishedAtISO).toISOString()
        : new Date().toISOString();

      return `  <url>
    <loc>${BASE_URL}/news/${p.categorySlug}/${p.id}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(PUBLICATION_NAME)}</news:name>
        <news:language>${LANGUAGE}</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapeXml(p.title)}</news:title>
    </news:news>
    <lastmod>${pubDate}</lastmod>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlEntries}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Cache for 15 minutes on CDN, allow stale for another 15 min
      "Cache-Control": "public, max-age=900, stale-while-revalidate=900",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
