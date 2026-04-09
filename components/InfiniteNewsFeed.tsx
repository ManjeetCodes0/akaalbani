"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LoaderCircle, Newspaper } from "lucide-react";
import { NewsPost } from "@/types/news";

type FeedItem = NewsPost & { feedKey: string };

type InfiniteNewsFeedProps = {
  posts: NewsPost[];
};

const CHUNK_SIZE = 10;
const FEED_SIZE = 20;

export default function InfiniteNewsFeed({ posts }: InfiniteNewsFeedProps) {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);

  const feedItems = useMemo<FeedItem[]>(() => {
    if (!posts.length) return [];
    return Array.from({ length: FEED_SIZE }, (_, index) => {
      const post = posts[index % posts.length];
      return { ...post, feedKey: `${post.id}-${index}` };
    });
  }, [posts]);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + CHUNK_SIZE, feedItems.length));
        }
      },
      { rootMargin: "220px" }
    );

    observer.observe(loader);
    return () => observer.disconnect();
  }, [feedItems.length]);

  const visibleItems = feedItems.slice(0, visibleCount);
  const hasMore = visibleCount < feedItems.length;

  return (
    <section className="inf-section">
      <div className="inf-header">
        <h2 className="section-title" style={{ display: "inline-flex", alignItems: "center", gap: "0.42rem" }}>
          <Newspaper size={22} color="var(--primary)" /> News Feed
        </h2>
      </div>

      <div className="inf-grid">
        {visibleItems.map((item, index) => (
          <Link key={item.feedKey} href={`/news/${item.categorySlug}/${item.id}`} className="inf-link">
            <motion.article
              className="card inf-card"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.25, delay: (index % CHUNK_SIZE) * 0.02 }}
              whileHover={{ y: -3 }}
            >
              <div className="inf-img">
                <img src={item.image} alt={item.title} loading="lazy" referrerPolicy="no-referrer" />
              </div>
              <div className="inf-body">
                <p className="kicker">{item.category}</p>
                <h3 className="inf-title">{item.title}</h3>
                <p className="meta">{item.author} &bull; {item.date}</p>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>

      <div ref={loaderRef} className="inf-loader">
        {hasMore ? (
          <p className="inf-loading">
            <LoaderCircle size={16} className="inf-spin" /> Loading more...
          </p>
        ) : (
          <p className="inf-end">You&apos;ve reached the end.</p>
        )}
      </div>

      <style jsx>{`
        .inf-section {
          margin-bottom: 2.5rem;
        }

        .inf-header {
          margin-bottom: 1.25rem;
        }

        .inf-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        :global(.inf-link) {
          text-decoration: none;
          color: inherit;
        }

        :global(.inf-card) {
          border-radius: 12px;
          overflow: hidden;
          height: 100%;
        }

        .inf-img {
          aspect-ratio: 16 / 10;
          overflow: hidden;
        }

        .inf-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .inf-body {
          padding: 0.75rem;
        }

        .inf-title {
          margin: 4px 0 6px;
          font-size: 14px;
          line-height: 1.4;
        }

        .inf-loader {
          margin-top: 1rem;
          min-height: 2rem;
          display: grid;
          place-items: center;
        }

        .inf-loading,
        .inf-end {
          margin: 0;
          color: var(--muted);
          font-weight: 600;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        :global(.inf-spin) {
          animation: inf-spin-kf 1s linear infinite;
        }

        @keyframes inf-spin-kf {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .inf-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .inf-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
