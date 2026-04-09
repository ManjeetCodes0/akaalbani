import { createClient } from "@sanity/client";
import type { NewsPost } from "@/types/news";
import { categorySlugFromLabel, normalizeCategorySlug } from "@/data/news";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  // CDN was caching old category assignments; disable so edits in Sanity
  // appear on the next page revalidation (~15s) instead of after CDN purge.
  useCdn: false,
});

// Build image URL from Sanity image asset reference
function sanityImageUrl(mainImage: Record<string, unknown> | null): string {
  if (!mainImage) return "https://picsum.photos/600/400";
  const ref = (mainImage.asset as Record<string, string>)?._ref;
  if (!ref) return "https://picsum.photos/600/400";
  // ref format: image-{id}-{width}x{height}-{format}
  const parts = ref.replace("image-", "").split("-");
  const format = parts.pop();
  const id = parts.join("-");
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}.${format}`;
}

// Format date in Punjabi
function formatPunjabiDate(isoDate: string): string {
  const months = [
    "ਜਨਵਰੀ", "ਫ਼ਰਵਰੀ", "ਮਾਰਚ", "ਅਪ੍ਰੈਲ", "ਮਈ", "ਜੂਨ",
    "ਜੁਲਾਈ", "ਅਗਸਤ", "ਸਤੰਬਰ", "ਅਕਤੂਬਰ", "ਨਵੰਬਰ", "ਦਸੰਬਰ"
  ];
  const d = new Date(isoDate);
  return `${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// Convert Sanity portable text blocks to structured paragraphs with style info
export interface BodyBlock {
  text: string;
  style: string; // "normal" | "h2" | "h3" | "blockquote"
  listItem?: string; // "bullet" | "number"
}

export function portableTextToBlocks(blocks: Array<Record<string, unknown>>): BodyBlock[] {
  if (!blocks || !Array.isArray(blocks)) return [];
  return blocks
    .filter((b) => b._type === "block")
    .map((b) => {
      const children = b.children as Array<Record<string, string>> | undefined;
      const text = children ? children.map((c) => c.text || "").join("") : "";
      return {
        text,
        style: (b.style as string) || "normal",
        listItem: b.listItem as string | undefined,
      };
    })
    .filter((b) => b.text.length > 0);
}

// Legacy: plain text array
export function portableTextToPlain(blocks: Array<Record<string, unknown>>): string[] {
  return portableTextToBlocks(blocks).map((b) => b.text);
}

// Map a Sanity post document to the NewsPost interface
function mapSanityPost(doc: Record<string, unknown>): NewsPost {
  const cats = (doc.categories as Array<Record<string, unknown>> | undefined) ?? [];

  const resolved = cats.map((c) => {
    const title = (c?.title as string) || "";
    const slugRaw = (c?.slug as Record<string, string> | undefined)?.current;
    const slug = normalizeCategorySlug(slugRaw || categorySlugFromLabel(title));
    return { title, slug };
  });

  const primary = resolved[0];
  const catTitle = primary?.title || "ਪੰਜਾਬ";
  const catSlug = primary?.slug || "punjab";
  const catSlugs = resolved.map((r) => r.slug).filter(Boolean);

  return {
    id: (doc.slug as Record<string, string>)?.current || (doc._id as string),
    title: (doc.title as string) || "",
    category: catTitle,
    categorySlug: catSlug,
    categorySlugs: catSlugs.length ? catSlugs : [catSlug],
    author: "ਆਕਾਲ ਬਾਣੀ",
    date: doc.publishedAt ? formatPunjabiDate(doc.publishedAt as string) : "",
    publishedAtISO: (doc.publishedAt as string) || undefined,
    image: sanityImageUrl(doc.mainImage as Record<string, unknown> | null),
    excerpt: doc.excerpt as string | undefined,
  };
}

// Fetch all published posts from Sanity
export async function fetchSanityPosts(): Promise<NewsPost[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    "categories": categories[]->{ title, slug },
    publishedAt,
    body
  }`;

  try {
    const docs = await sanityClient.fetch(query);
    return (docs as Array<Record<string, unknown>>).map(mapSanityPost);
  } catch {
    return [];
  }
}

// Fetch a single post by slug
export async function fetchSanityPostBySlug(slug: string): Promise<{
  post: NewsPost;
  bodyParagraphs: string[];
  bodyBlocks: BodyBlock[];
} | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    "categories": categories[]->{ title, slug },
    publishedAt,
    body,
    sourceUrl
  }`;

  try {
    const doc = await sanityClient.fetch(query, { slug });
    if (!doc) return null;
    const bodyRaw = (doc as Record<string, unknown>).body as Array<Record<string, unknown>>;
    return {
      post: mapSanityPost(doc as Record<string, unknown>),
      bodyParagraphs: portableTextToPlain(bodyRaw),
      bodyBlocks: portableTextToBlocks(bodyRaw),
    };
  } catch {
    return null;
  }
}
