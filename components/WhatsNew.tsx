"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { NewsPost } from "@/types/news";
import Sidebar from "@/components/Sidebar";

const tabs = ["ਵਿਦੇਸ਼", "ਦੇਸ਼", "ਖੇਤੀ", "ਟੈਕਨੋਲੋਜੀ ਅਤੇ ਏਆਈ"];

type WhatsNewProps = {
  mainPost: NewsPost;
  listPosts: NewsPost[];
};

export default function WhatsNew({ mainPost, listPosts }: WhatsNewProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const shuffled = useMemo(() => {
    if (activeTab === tabs[0]) return listPosts;
    return [...listPosts].reverse();
  }, [activeTab, listPosts]);

  return (
    <section className="wn-section">
      <div className="wn-content">
        <div className="wn-top">
          <div className="wn-title-wrap">
            <h2 className="section-title">Latest News</h2>
            <span className="wn-bar" />
          </div>
          <div className="wn-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`wn-tab ${activeTab === tab ? "active" : ""}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="wn-grid">
          <Link href={`/news/${mainPost.categorySlug}/${mainPost.id}`} className="wn-main-link">
            <article className="wn-main">
              <div className="wn-main-img">
                <img src={mainPost.image} alt={mainPost.title} referrerPolicy="no-referrer" />
              </div>
              <div className="wn-main-body">
                <p className="kicker">{mainPost.category}</p>
                <h3 className="wn-main-title">{mainPost.title}</h3>
                <p className="meta">{mainPost.date} &bull; {mainPost.author}</p>
                {mainPost.excerpt && <p className="wn-excerpt">{mainPost.excerpt}</p>}
              </div>
            </article>
          </Link>

          <div className="wn-list">
            {shuffled.map((post) => (
              <Link key={post.id} href={`/news/${post.categorySlug}/${post.id}`} className="wn-list-link">
                <article className="wn-list-item">
                  <div className="wn-list-img">
                    <img src={post.image} alt={post.title} referrerPolicy="no-referrer" />
                  </div>
                  <div className="wn-list-info">
                    <p className="kicker">{post.category}</p>
                    <h4 className="wn-list-title">{post.title}</h4>
                    <p className="meta">{post.date}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Sidebar />

      <style jsx>{`
        .wn-section {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .wn-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-bottom: 1.25rem;
        }

        .wn-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .wn-bar {
          width: 3px;
          height: 20px;
          background: var(--secondary);
          border-radius: 2px;
        }

        .wn-tabs {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .wn-tab {
          border: 1px solid #e0e0e0;
          background: #fff;
          color: #3f3a35;
          border-radius: 6px;
          padding: 0.4rem 0.85rem;
          font-weight: 600;
          cursor: pointer;
          font-size: 13px;
          font-family: inherit;
          transition: all 0.15s;
        }

        .wn-tab.active {
          border-color: transparent;
          background: var(--primary);
          color: #fff;
        }

        .wn-tab:hover:not(.active) {
          border-color: #ccc;
          background: #f5f5f5;
        }

        .wn-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 1rem;
        }

        :global(.wn-main-link) {
          text-decoration: none;
          color: inherit;
        }

        .wn-main {
          border-radius: 10px;
          overflow: hidden;
          background: #fff;
          border: 1px solid #e8e3da;
          transition: box-shadow 0.2s;
          height: 100%;
        }

        .wn-main:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }

        .wn-main-img {
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }

        .wn-main-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .wn-main-body {
          padding: 0.85rem;
        }

        .wn-main-title {
          margin: 0.35rem 0;
          font-family: var(--font-heading), serif;
          font-size: 16px;
          line-height: 1.4;
          color: #1f1c1a;
        }

        .wn-excerpt {
          margin: 0.4rem 0 0;
          color: #5a544e;
          font-size: 14px;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .wn-list {
          display: grid;
          gap: 0.75rem;
        }

        :global(.wn-list-link) {
          text-decoration: none;
          color: inherit;
        }

        .wn-list-item {
          display: flex;
          gap: 0.65rem;
          padding: 0.55rem;
          border-radius: 10px;
          background: #fff;
          border: 1px solid #e8e3da;
          transition: box-shadow 0.2s;
        }

        .wn-list-item:hover {
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
        }

        .wn-list-img {
          width: 88px;
          min-width: 88px;
          border-radius: 8px;
          overflow: hidden;
        }

        .wn-list-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 1;
        }

        .wn-list-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .wn-list-title {
          margin: 3px 0;
          font-size: 14px;
          line-height: 1.4;
          color: #1f1c1a;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .wn-section {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 680px) {
          .wn-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
