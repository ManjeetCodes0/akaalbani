import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import { fetchSanityPostBySlug, fetchSanityPosts } from "@/lib/sanity";
import NewsArticleClient from "./client";

export const revalidate = 15;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://akaalbani.com";

type ArticlePageProps = {
  params: Promise<{ category: string; id: string }>;
};

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { category, id } = await params;

  const sanityResult = await fetchSanityPostBySlug(id);
  const post = sanityResult?.post;

  if (!post) {
    return { title: "Article Not Found" };
  }

  const canonicalUrl = `${BASE_URL}/news/${post.categorySlug}/${id}`;

  return {
    title: `${post.title} | ਆਕਾਲ ਬਾਣੀ`,
    description: post.excerpt || `ਪੜ੍ਹੋ: ${post.title}`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || "ਸੋ ਖਬਰਾਂ",
      url: canonicalUrl,
      siteName: "ਆਕਾਲ ਬਾਣੀ",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      // publishedTime must be ISO 8601 for Open Graph / Google News signals
      publishedTime: post.publishedAtISO || undefined,
      authors: [post.author],
      locale: "pa_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || `ਪੜ੍ਹੋ: ${post.title}`,
      images: [post.image],
    },
  };
}

export default async function NewsPostPage({ params }: ArticlePageProps) {
  const { category, id } = await params;

  const sanityResult = await fetchSanityPostBySlug(id);
  if (!sanityResult) {
    notFound();
  }

  // Canonicalize the URL: redirect if the category in the URL doesn't match
  // the post's actual category.
  const correctCategory = sanityResult.post.categorySlug || "punjab";
  if (category !== correctCategory && !sanityResult.post.categorySlugs.includes(category)) {
    redirect(`/news/${correctCategory}/${id}`);
  }

  const sanityPosts = await fetchSanityPosts();
  const relatedPosts = sanityPosts
    .filter((item) => item.id !== sanityResult.post.id)
    .slice(0, 4);

  const post = sanityResult.post;
  const canonicalUrl = `${BASE_URL}/news/${post.categorySlug}/${id}`;

  // JSON-LD NewsArticle structured data — required for Google News eligibility
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt || post.title,
    image: [post.image],
    datePublished: post.publishedAtISO || new Date().toISOString(),
    dateModified: post.publishedAtISO || new Date().toISOString(),
    author: [
      {
        "@type": "Organization",
        name: "ਆਕਾਲ ਬਾਣੀ",
        url: BASE_URL,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "ਆਕਾਲ ਬਾਣੀ",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    inLanguage: "pa",
    isAccessibleForFree: true,
  };

  return (
    <>
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NewsArticleClient
        post={post}
        relatedPosts={relatedPosts}
        bodyParagraphs={sanityResult.bodyParagraphs}
        bodyBlocks={sanityResult.bodyBlocks}
      />
    </>
  );
}
