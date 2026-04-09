"use client";

import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { NewsPost } from "@/types/news";

type FeaturedCirclesProps = {
  posts: NewsPost[];
};

export default function FeaturedCircles({ posts }: FeaturedCirclesProps) {
  return (
    <section className="fc-section">
      <div className="fc-header">
        <TrendingUp size={18} />
        <span className="fc-label">Trending Now</span>
      </div>

      <div className="fc-strip">
        {posts.map((post, index) => (
          <Link key={post.id} href={`/news/${post.categorySlug}/${post.id}`} className="fc-item">
            <div className="fc-thumb">
              <img src={post.image} alt={post.title} loading="lazy" referrerPolicy="no-referrer" />
              <span className="fc-rank">{index + 1}</span>
            </div>
            <div className="fc-info">
              <p className="kicker">{post.category}</p>
              <h3 className="fc-title">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .fc-section {
          padding: 1rem 0 1.5rem;
        }

        .fc-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 1rem;
          color: var(--primary);
          font-weight: 700;
        }

        .fc-label {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .fc-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        :global(.fc-item) {
          text-decoration: none;
          color: inherit;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem;
          border-radius: 10px;
          background: #fff;
          border: 1px solid #e8e3da;
          transition: box-shadow 0.2s, transform 0.2s;
        }

        :global(.fc-item:hover) {
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          transform: translateY(-1px);
        }

        .fc-thumb {
          position: relative;
          flex-shrink: 0;
          width: 64px;
          height: 64px;
          border-radius: 8px;
          overflow: hidden;
        }

        .fc-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .fc-rank {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--primary);
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          display: grid;
          place-items: center;
        }

        .fc-info {
          min-width: 0;
        }

        .fc-title {
          margin: 3px 0 0;
          font-size: 14px;
          line-height: 1.4;
          font-weight: 600;
          color: #1f1c1a;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 1024px) {
          .fc-strip {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .fc-strip {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
