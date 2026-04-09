"use client";

import Link from "next/link";
import { NewsPost } from "@/types/news";

type TopStoriesProps = {
  posts: NewsPost[];
};

export default function TopStories({ posts }: TopStoriesProps) {
  return (
    <section className="ts-section">
      <div className="ts-header">
        <h2 className="section-title">Top Stories</h2>
        <span className="ts-bar" />
      </div>

      <div className="ts-grid">
        {posts.map((post) => (
          <Link key={post.id} href={`/news/${post.categorySlug}/${post.id}`} className="ts-link">
            <article className="ts-card">
              <div className="ts-img-wrap">
                <img src={post.image} alt={post.title} loading="lazy" referrerPolicy="no-referrer" />
              </div>
              <div className="ts-body">
                <p className="kicker">{post.category}</p>
                <h3 className="ts-title">{post.title}</h3>
                <p className="meta">{post.author} &bull; {post.date}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .ts-section {
          margin-bottom: 2.5rem;
        }

        .ts-header {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          margin-bottom: 1.25rem;
        }

        .ts-bar {
          width: 3px;
          height: 20px;
          background: var(--primary);
          border-radius: 2px;
        }

        .ts-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        :global(.ts-link) {
          text-decoration: none;
          color: inherit;
        }

        .ts-card {
          border-radius: 10px;
          overflow: hidden;
          background: #fff;
          border: 1px solid #e8e3da;
          transition: box-shadow 0.2s, transform 0.2s;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .ts-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }

        .ts-img-wrap {
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }

        .ts-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .ts-card:hover .ts-img-wrap img {
          transform: scale(1.04);
        }

        .ts-body {
          padding: 0.85rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .ts-title {
          margin: 0.35rem 0 0.4rem;
          font-size: 15px;
          line-height: 1.4;
          color: #1f1c1a;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .ts-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .ts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
