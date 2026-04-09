"use client";

import Link from "next/link";
import { Tags } from "lucide-react";
import type { NewsPost } from "@/types/news";

type CategoryCloudProps = {
  posts: NewsPost[];
};

type CategoryMeta = {
  name: string;
  slug: string;
  count: number;
};

export default function CategoryCloud({ posts }: CategoryCloudProps) {
  const categoriesMap = new Map<string, CategoryMeta>();

  for (const post of posts) {
    const key = post.categorySlug;
    const existing = categoriesMap.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      categoriesMap.set(key, { name: post.category, slug: post.categorySlug, count: 1 });
    }
  }

  const categories = Array.from(categoriesMap.values()).sort((a, b) => b.count - a.count);
  const maxCount = Math.max(...categories.map((c) => c.count), 1);

  return (
    <section className="cc-section card">
      <div className="cc-header">
        <h2 className="section-title" style={{ display: "inline-flex", alignItems: "center", gap: "0.42rem", fontSize: "1.25rem" }}>
          <Tags size={20} color="var(--secondary)" /> Explore Topics
        </h2>
      </div>

      <div className="cc-tags">
        {categories.map((cat) => {
          const intensity = cat.count / maxCount;
          const fontSize = 0.82 + intensity * 0.35;
          const bgAlpha = 0.08 + intensity * 0.16;

          return (
            <Link key={cat.slug} href={`/news/${cat.slug}`} className="cc-tag" style={{
              fontSize: `${fontSize}rem`,
              background: `rgba(182, 64, 34, ${bgAlpha})`,
            }}>
              <span>{cat.name}</span>
              <span className="cc-count">{cat.count}</span>
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        .cc-section {
          margin-bottom: 2.5rem;
          border-radius: 12px;
          padding: 1.25rem;
          background: linear-gradient(145deg, #fffdf7 0%, #f5ecdd 100%);
        }

        .cc-header {
          margin-bottom: 1rem;
        }

        .cc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        :global(.cc-tag) {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          border-radius: 999px;
          border: 1px solid rgba(59, 51, 44, 0.12);
          color: #2f2722;
          padding: 0.38rem 0.85rem;
          font-weight: 700;
          line-height: 1;
          transition: transform 0.15s, box-shadow 0.15s;
        }

        :global(.cc-tag:hover) {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .cc-count {
          font-size: 0.74em;
          opacity: 0.7;
        }
      `}</style>
    </section>
  );
}
