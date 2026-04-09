"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, BadgeInfo } from "lucide-react";
import type { NewsPost } from "@/types/news";
import { CATEGORIES } from "@/data/news";

const social = [Facebook, Instagram, Youtube, BadgeInfo];
const socialLinks = [
  "https://www.facebook.com",
  "https://www.instagram.com",
  "https://www.youtube.com",
  "/about"
];

type FooterProps = {
  recentPosts?: NewsPost[];
};

export default function Footer({ recentPosts = [] }: FooterProps) {
  return (
    <footer className="ft-root">
      <div className="ft-main">
        {/* Brand column */}
        <div className="ft-brand">
          <h3 className="ft-brand-name">ਆਕਾਲ ਬਾਣੀ</h3>
          <p className="ft-brand-tag">Trusted Punjabi News</p>
          <p className="ft-brand-desc">Your digital destination for reliable, fast, and people-first Punjabi news coverage across Punjab, India, and the world.</p>
          <div className="ft-social">
            {social.map((Icon, index) => (
              <a
                key={index}
                href={socialLinks[index]}
                target={socialLinks[index].startsWith("http") ? "_blank" : undefined}
                rel={socialLinks[index].startsWith("http") ? "noreferrer" : undefined}
                className="ft-social-icon"
                aria-label={["Facebook", "Instagram", "YouTube", "About"][index]}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="ft-heading">Quick Links</h4>
          {[
            { label: "About Us", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Advertise With Us", href: "/advertise" }
          ].map((item) => (
            <Link key={item.label} href={item.href} className="ft-link">{item.label}</Link>
          ))}
        </div>

        {/* Sections */}
        <div>
          <h4 className="ft-heading">Sections</h4>
          {CATEGORIES.slice(0, 6).map((cat) => (
            <Link key={cat.slug} href={`/news/${cat.slug}`} className="ft-link">{cat.label}</Link>
          ))}
        </div>

        {/* Recent posts */}
        <div>
          <h4 className="ft-heading">Recent Posts</h4>
          <div className="ft-recent">
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/news/${post.categorySlug}/${post.id}`} className="ft-recent-item">
                <div className="ft-recent-img">
                  <img src={post.image} alt={post.title} referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="ft-recent-title">{post.title}</p>
                  <p className="ft-recent-date">{post.date}</p>
                </div>
              </Link>
            ))}
            {recentPosts.length === 0 && (
              <p className="ft-empty">No recent posts available.</p>
            )}
          </div>
        </div>
      </div>

      <div className="ft-bottom">
        <span>&copy; {new Date().getFullYear()} Akaal Bani. All rights reserved.</span>
        <span>Punjabi News &bull; Digital Edition</span>
      </div>

      <style jsx>{`
        .ft-root {
          margin-top: 3rem;
          background: linear-gradient(180deg, #1a1612 0%, #110e0b 100%);
          color: #e8ddd0;
          width: 100%;
        }

        .ft-main {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2.5rem clamp(1rem, 2.6vw, 2.8rem) 1.5rem;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
          gap: 2rem;
        }

        .ft-brand-name {
          margin: 0;
          font-family: var(--font-heading), serif;
          font-size: 26px;
          color: #e2b93b;
        }

        .ft-brand-tag {
          margin: 2px 0 0.75rem;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9a8d7c;
        }

        .ft-brand-desc {
          margin: 0;
          color: #bfb3a0;
          font-size: 14px;
          line-height: 1.65;
        }

        .ft-social {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .ft-social-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,0.15);
          color: #e8ddd0;
          transition: all 0.15s;
          text-decoration: none;
        }

        .ft-social-icon:hover {
          background: rgba(255,255,255,0.1);
          border-color: #e2b93b;
          color: #e2b93b;
        }

        .ft-heading {
          margin: 0 0 0.75rem;
          font-size: 15px;
          font-weight: 700;
          color: #f0e4d5;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        :global(.ft-link) {
          display: block;
          margin: 0 0 0.45rem;
          color: #bfb3a0;
          font-size: 14px;
          text-decoration: none;
          transition: color 0.15s;
        }

        :global(.ft-link:hover) {
          color: #e2b93b;
        }

        .ft-recent {
          display: grid;
          gap: 0.75rem;
        }

        :global(.ft-recent-item) {
          display: flex;
          gap: 0.6rem;
          text-decoration: none;
          color: inherit;
        }

        .ft-recent-img {
          width: 56px;
          min-width: 56px;
          height: 56px;
          border-radius: 6px;
          overflow: hidden;
        }

        .ft-recent-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .ft-recent-title {
          margin: 0;
          font-size: 13px;
          line-height: 1.4;
          color: #d5c8b7;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ft-recent-date {
          margin: 3px 0 0;
          font-size: 11px;
          color: #8a7d6e;
        }

        .ft-empty {
          margin: 0;
          color: #8a7d6e;
          font-size: 14px;
        }

        .ft-bottom {
          max-width: 1400px;
          margin: 0 auto;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 1rem clamp(1rem, 2.6vw, 2.8rem);
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
          color: #8a7d6e;
          font-size: 12px;
        }

        @media (max-width: 900px) {
          .ft-main {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .ft-main {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </footer>
  );
}
