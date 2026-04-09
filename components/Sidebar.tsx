"use client";

import { Facebook, Instagram, Rss, Youtube, MessageCircleMore, AtSign } from "lucide-react";
import { SOCIAL_METRICS } from "@/data/news";

const iconMap = [Facebook, AtSign, Instagram, Youtube, MessageCircleMore, Rss];

export default function Sidebar() {
  return (
    <aside className="sb-aside">
      {/* Social follow */}
      <section className="sb-card">
        <h3 className="sb-title">Follow Us</h3>
        <div className="sb-social">
          {SOCIAL_METRICS.map((item, index) => {
            const Icon = iconMap[index];
            return (
              <a key={item.platform} href="#" className="sb-social-btn" style={{ background: item.color }}>
                <span className="sb-social-name"><Icon size={15} /> {item.platform}</span>
                <span className="sb-social-stat">{item.stat}</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Newsletter */}
      <section className="sb-card">
        <h3 className="sb-title">Newsletter</h3>
        <p className="sb-desc">Get morning headlines delivered to your inbox.</p>
        <input type="email" placeholder="Email address" className="sb-input" />
        <button className="sb-btn">Subscribe</button>
      </section>

      <style jsx>{`
        .sb-aside {
          display: grid;
          gap: 1.25rem;
        }

        .sb-card {
          border-radius: 10px;
          padding: 1rem;
          background: #fff;
          border: 1px solid #e8e3da;
        }

        .sb-title {
          margin: 0 0 0.75rem;
          font-family: var(--font-heading), serif;
          font-size: 16px;
          color: #1f1c1a;
        }

        .sb-social {
          display: grid;
          gap: 0.5rem;
        }

        .sb-social-btn {
          border-radius: 6px;
          color: #fff;
          padding: 0.55rem 0.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.15s;
        }

        .sb-social-btn:hover {
          opacity: 0.9;
        }

        .sb-social-name {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .sb-social-stat {
          font-size: 11px;
          opacity: 0.9;
        }

        .sb-desc {
          margin: 0 0 0.75rem;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.5;
        }

        .sb-input {
          width: 100%;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          padding: 0.6rem 0.75rem;
          margin-bottom: 0.6rem;
          font-size: 14px;
          font-family: inherit;
          color: #222;
          outline: none;
        }

        .sb-input:focus {
          border-color: var(--primary);
        }

        .sb-btn {
          width: 100%;
          border: none;
          border-radius: 6px;
          background: var(--primary);
          color: #fff;
          font-weight: 600;
          padding: 0.6rem;
          cursor: pointer;
          font-size: 14px;
          font-family: inherit;
          transition: opacity 0.15s;
        }

        .sb-btn:hover {
          opacity: 0.9;
        }

        @media (max-width: 1024px) {
          .sb-aside {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .sb-aside {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </aside>
  );
}
