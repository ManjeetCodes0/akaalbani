"use client";

import Link from "next/link";
import { CalendarRange, UserRound } from "lucide-react";
import { NewsPost } from "@/types/news";

type HeroProps = {
  mainPost: NewsPost;
  sidePosts: NewsPost[];
};

export default function Hero({ mainPost, sidePosts }: HeroProps) {
  return (
    <section className="hero-section">
      {/* Main featured article */}
      <Link href={`/news/${mainPost.categorySlug}/${mainPost.id}`} className="hero-main-link">
        <article className="hero-main">
          <img src={mainPost.image} alt={mainPost.title} loading="eager" className="hero-main-img" referrerPolicy="no-referrer" />
          <div className="hero-main-overlay" />
          <div className="hero-main-content">
            <span className="hero-badge">{mainPost.category}</span>
            <h2 className="hero-main-title">{mainPost.title}</h2>
            <div className="hero-main-meta">
              <span><UserRound size={14} /> {mainPost.author}</span>
              <span><CalendarRange size={14} /> {mainPost.date}</span>
            </div>
            {mainPost.excerpt && (
              <p className="hero-main-excerpt">{mainPost.excerpt}</p>
            )}
          </div>
        </article>
      </Link>

      {/* Side articles */}
      <div className="hero-side">
        {sidePosts.map((post) => (
          <Link key={post.id} href={`/news/${post.categorySlug}/${post.id}`} className="hero-side-link">
            <article className="hero-side-card">
              <div className="hero-side-img">
                <img src={post.image} alt={post.title} loading="lazy" referrerPolicy="no-referrer" />
              </div>
              <div className="hero-side-info">
                <p className="kicker">{post.category}</p>
                <h3 className="hero-side-title">{post.title}</h3>
                <p className="meta">{post.author} &bull; {post.date}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .hero-section {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        :global(.hero-main-link) {
          text-decoration: none;
          color: inherit;
        }

        .hero-main {
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          min-height: clamp(300px, 48vh, 500px);
          background: #222;
          cursor: pointer;
          transition: box-shadow 0.2s;
        }

        .hero-main:hover {
          box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        }

        .hero-main-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s;
        }

        .hero-main:hover .hero-main-img {
          transform: scale(1.02);
        }

        .hero-main-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(12,12,12,0.05) 30%, rgba(12,10,8,0.88) 100%);
        }

        .hero-main-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: clamp(1rem, 3vw, 1.75rem);
          color: #fff;
        }

        .hero-badge {
          align-self: flex-start;
          background: var(--accent);
          color: #2a231b;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 11px;
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
        }

        .hero-main-title {
          margin: 0.65rem 0 0.5rem;
          font-family: var(--font-heading), serif;
          font-size: clamp(20px, 3.2vw, 38px);
          line-height: 1.22;
          max-width: 780px;
        }

        .hero-main-meta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          font-size: 13px;
          color: rgba(255,255,255,0.75);
        }

        .hero-main-meta span {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .hero-main-excerpt {
          margin: 0.65rem 0 0;
          color: rgba(255,255,255,0.7);
          font-size: clamp(13px, 1.5vw, 15px);
          max-width: 65ch;
          line-height: 1.5;
        }

        .hero-side {
          display: grid;
          gap: 0.75rem;
          align-content: start;
        }

        :global(.hero-side-link) {
          text-decoration: none;
          color: inherit;
        }

        .hero-side-card {
          display: flex;
          gap: 0.75rem;
          padding: 0.6rem;
          border-radius: 10px;
          background: #fff;
          border: 1px solid #e8e3da;
          transition: box-shadow 0.2s, transform 0.15s;
        }

        .hero-side-card:hover {
          box-shadow: 0 3px 12px rgba(0,0,0,0.07);
          transform: translateY(-1px);
        }

        .hero-side-img {
          width: 110px;
          min-width: 110px;
          aspect-ratio: 4 / 3;
          border-radius: 8px;
          overflow: hidden;
        }

        .hero-side-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-side-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }

        .hero-side-title {
          margin: 4px 0;
          font-size: 14px;
          line-height: 1.4;
          color: #1f1c1a;
          font-weight: 600;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 900px) {
          .hero-section {
            grid-template-columns: 1fr;
          }

          .hero-side {
            grid-template-columns: repeat(3, 1fr);
          }

          .hero-side-card {
            flex-direction: column;
            gap: 0;
          }

          .hero-side-img {
            width: 100%;
            min-width: unset;
            aspect-ratio: 16 / 9;
          }

          .hero-side-info {
            padding: 0.5rem;
          }
        }

        @media (max-width: 600px) {
          .hero-side {
            grid-template-columns: 1fr;
          }

          .hero-side-card {
            flex-direction: row;
          }

          .hero-side-img {
            width: 100px;
            min-width: 100px;
            aspect-ratio: 1;
          }
        }
      `}</style>
    </section>
  );
}
