"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bolt, Radio, TrendingUp } from "lucide-react";
import { NewsPost } from "@/types/news";

type LiveNewsGridProps = {
  posts: NewsPost[];
};

export default function LiveNewsGrid({ posts }: LiveNewsGridProps) {
  const live = posts.slice(0, 6);
  const spotlight = posts.slice(6, 10);
  const trend = posts.slice(10, 16);

  return (
    <section className="lng-section">
      <div className="lng-header">
        <h2 className="section-title" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
          <Radio size={22} color="var(--primary)" /> Live Newsroom
        </h2>
      </div>

      <div className="lng-grid">
        {/* Breaking stream */}
        <div className="lng-panel card">
          <h3 className="lng-panel-title">
            <Bolt size={16} color="var(--secondary)" /> Breaking
          </h3>
          <div className="lng-panel-list">
            {live.map((item) => (
              <Link key={item.id} href={`/news/${item.categorySlug}/${item.id}`} className="lng-panel-item">
                <p className="kicker">{item.category}</p>
                <p className="lng-panel-text">{item.title}</p>
                <p className="meta">{item.date}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Spotlight cards */}
        <div className="lng-spotlight">
          {spotlight.map((item, idx) => (
            <Link key={item.id} href={`/news/${item.categorySlug}/${item.id}`} className="lng-spot-link">
              <motion.article
                className="card lng-spot-card"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.28, delay: idx * 0.05 }}
                whileHover={{ y: -3 }}
              >
                <div className="lng-spot-img">
                  <img src={item.image} alt={item.title} referrerPolicy="no-referrer" />
                </div>
                <div className="lng-spot-body">
                  <p className="kicker">{item.category}</p>
                  <h3 className="lng-spot-title">{item.title}</h3>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        {/* Trending desk */}
        <div className="lng-panel card lng-trend">
          <h3 className="lng-panel-title">
            <TrendingUp size={16} color="var(--primary)" /> Trending
          </h3>
          <div className="lng-panel-list">
            {trend.map((item, idx) => (
              <Link key={`${item.id}-${idx}`} href={`/news/${item.categorySlug}/${item.id}`} className="lng-trend-item">
                <p className="lng-trend-rank">#{idx + 1} {item.category}</p>
                <p className="lng-trend-text">{item.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .lng-section {
          margin-bottom: 2.5rem;
        }

        .lng-header {
          margin-bottom: 1.25rem;
        }

        .lng-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr 1fr;
          gap: 1rem;
        }

        .lng-panel {
          border-radius: 12px;
          padding: 1rem;
        }

        .lng-trend {
          background: linear-gradient(180deg, #fffdf7 0%, #f8f0e3 100%);
        }

        .lng-panel-title {
          margin: 0 0 0.75rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 15px;
        }

        .lng-panel-list {
          display: grid;
          gap: 0.5rem;
        }

        :global(.lng-panel-item) {
          display: block;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.5rem;
          text-decoration: none;
          color: inherit;
        }

        .lng-panel-text {
          margin: 3px 0 0;
          font-size: 14px;
          line-height: 1.4;
          font-weight: 600;
        }

        .lng-spotlight {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        :global(.lng-spot-link) {
          text-decoration: none;
          color: inherit;
        }

        :global(.lng-spot-card) {
          border-radius: 12px;
          overflow: hidden;
          height: 100%;
        }

        .lng-spot-img {
          aspect-ratio: 16 / 9;
          overflow: hidden;
        }

        .lng-spot-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .lng-spot-body {
          padding: 0.75rem;
        }

        .lng-spot-title {
          margin: 4px 0 0;
          font-size: 14px;
          line-height: 1.4;
        }

        :global(.lng-trend-item) {
          text-decoration: none;
          color: inherit;
          background: #fff;
          border: 1px solid #eee2d2;
          border-radius: 8px;
          padding: 0.5rem 0.6rem;
          display: block;
          transition: box-shadow 0.15s;
        }

        :global(.lng-trend-item:hover) {
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .lng-trend-rank {
          margin: 0;
          font-weight: 700;
          font-size: 12px;
          color: var(--secondary);
        }

        .lng-trend-text {
          margin: 3px 0 0;
          font-size: 14px;
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .lng-grid {
            grid-template-columns: 1fr;
          }

          .lng-spotlight {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .lng-spotlight {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
