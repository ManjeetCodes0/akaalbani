"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, X, ChevronRight, Facebook, Instagram, Youtube } from "lucide-react";
import type { NewsPost } from "@/types/news";
import { NAV_ITEMS } from "@/data/news";

type HeaderProps = {
  posts?: NewsPost[];
};

function todayFormatted(): string {
  const d = new Date();
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Header({ posts = [] }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setQuery("");
  }, [pathname]);

  const results = query.trim().length > 1
    ? posts.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  return (
    <>
      <header className="hdr-root">
        {/* ── Top utility bar ──────────────────────────── */}
        <div className="hdr-utility">
          <div className="hdr-utility-inner">
            <span className="hdr-date">{todayFormatted()}</span>
            <div className="hdr-social">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={14} /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={14} /></a>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={14} /></a>
            </div>
          </div>
        </div>

        {/* ── Brand bar ────────────────────────────────── */}
        <div className="hdr-brand">
          <div className="hdr-brand-inner">
            <button
              className="hdr-menu-btn"
              aria-label="Open menu"
              type="button"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={22} />
            </button>

            <Link href="/" className="hdr-logo">
              <span className="hdr-logo-main">ਆਕਾਲ ਬਾਣੀ</span>
              <span className="hdr-logo-tag">Trusted Punjabi News</span>
            </Link>

            <div className="hdr-search-area">
              {!searchOpen ? (
                <button
                  className="hdr-search-btn"
                  onClick={() => setSearchOpen(true)}
                  type="button"
                  aria-label="Search"
                >
                  <Search size={18} />
                  <span className="hdr-search-label">Search</span>
                </button>
              ) : (
                <div className="hdr-search-box">
                  <Search size={16} className="hdr-search-icon" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search news..."
                    className="hdr-search-input"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setSearchOpen(false);
                        setQuery("");
                      }
                      if (e.key === "Enter" && results.length > 0) {
                        router.push(`/news/${results[0].categorySlug}/${results[0].id}`);
                        setSearchOpen(false);
                        setQuery("");
                      }
                    }}
                  />
                  <button
                    className="hdr-search-close"
                    onClick={() => { setSearchOpen(false); setQuery(""); }}
                    type="button"
                    aria-label="Close search"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Search results dropdown */}
              {searchOpen && results.length > 0 && (
                <div className="hdr-results">
                  {results.map((r) => (
                    <Link
                      key={r.id}
                      href={`/news/${r.categorySlug}/${r.id}`}
                      className="hdr-result-item"
                      onClick={() => { setSearchOpen(false); setQuery(""); }}
                    >
                      <img src={r.image} alt="" className="hdr-result-img" referrerPolicy="no-referrer" />
                      <div>
                        <span className="hdr-result-cat">{r.category}</span>
                        <p className="hdr-result-title">{r.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Category nav bar ─────────────────────────── */}
        <nav className="hdr-nav" aria-label="Primary categories">
          <div className="hdr-nav-inner">
            <Link href="/" className={`hdr-cat ${pathname === "/" ? "active" : ""}`}>
              Home
            </Link>
            {NAV_ITEMS.map((item) => {
              const href = `/news/${item.slug}`;
              const active = pathname?.startsWith(href);
              return (
                <Link key={item.slug} href={href} className={`hdr-cat ${active ? "active" : ""}`}>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {/* ── Mobile slide-out menu ──────────────────────── */}
      {mobileMenuOpen && (
        <div className="hdr-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="hdr-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="hdr-drawer-top">
              <span className="hdr-drawer-brand">ਆਕਾਲ ਬਾਣੀ</span>
              <button onClick={() => setMobileMenuOpen(false)} className="hdr-drawer-close" type="button" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <nav className="hdr-drawer-nav">
              <Link href="/" className="hdr-drawer-link">
                Home <ChevronRight size={14} />
              </Link>
              {NAV_ITEMS.map((item) => (
                <Link key={item.slug} href={`/news/${item.slug}`} className="hdr-drawer-link">
                  {item.label} <ChevronRight size={14} />
                </Link>
              ))}
            </nav>
            <div className="hdr-drawer-footer">
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/advertise">Advertise</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ── Root ─────────────────────────────────── */
        .hdr-root {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        /* ── Utility bar ──────────────────────────── */
        .hdr-utility {
          background: #1a1612;
          color: #d4c8b8;
          font-size: 12px;
        }

        .hdr-utility-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(0.75rem, 2.4vw, 2rem);
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .hdr-date {
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .hdr-social {
          display: flex;
          gap: 0.75rem;
        }

        .hdr-social a {
          color: #d4c8b8;
          display: inline-flex;
          transition: color 0.15s;
        }

        .hdr-social a:hover {
          color: #e2b93b;
        }

        /* ── Brand bar ────────────────────────────── */
        .hdr-brand {
          border-bottom: 1px solid #eee;
        }

        .hdr-brand-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(0.75rem, 2.4vw, 2rem);
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .hdr-menu-btn {
          display: none;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: 1px solid #e5e5e5;
          background: transparent;
          color: #333;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }

        :global(.hdr-logo) {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .hdr-logo-main {
          font-family: var(--font-heading), serif;
          font-size: clamp(22px, 2.5vw, 32px);
          font-weight: 700;
          color: #8b0000;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }

        .hdr-logo-tag {
          font-size: 11px;
          color: #999;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* ── Search ───────────────────────────────── */
        .hdr-search-area {
          position: relative;
          flex-shrink: 0;
        }

        .hdr-search-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          border: 1px solid #e0e0e0;
          background: #f9f9f9;
          color: #666;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.15s;
        }

        .hdr-search-btn:hover {
          border-color: #ccc;
          background: #f0f0f0;
        }

        .hdr-search-box {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0 0.75rem;
          border-radius: 999px;
          border: 2px solid #8b0000;
          background: #fff;
          width: clamp(260px, 30vw, 380px);
          height: 40px;
        }

        :global(.hdr-search-icon) {
          color: #999;
          flex-shrink: 0;
        }

        .hdr-search-input {
          border: none;
          outline: none;
          flex: 1;
          font-size: 14px;
          font-family: inherit;
          color: #222;
          background: transparent;
          min-width: 0;
        }

        .hdr-search-input::placeholder {
          color: #aaa;
        }

        .hdr-search-close {
          border: none;
          background: transparent;
          color: #999;
          cursor: pointer;
          padding: 2px;
          display: inline-flex;
          flex-shrink: 0;
        }

        .hdr-results {
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          width: clamp(300px, 35vw, 420px);
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
          overflow: hidden;
          z-index: 200;
        }

        :global(.hdr-result-item) {
          display: flex;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          text-decoration: none;
          color: inherit;
          border-bottom: 1px solid #f0f0f0;
          transition: background 0.1s;
        }

        :global(.hdr-result-item:hover) {
          background: #f9f6f0;
        }

        :global(.hdr-result-item:last-child) {
          border-bottom: none;
        }

        .hdr-result-img {
          width: 48px;
          height: 48px;
          border-radius: 6px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .hdr-result-cat {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 700;
          color: var(--secondary);
        }

        .hdr-result-title {
          margin: 2px 0 0;
          font-size: 14px;
          line-height: 1.35;
          font-weight: 600;
          color: #222;
        }

        /* ── Category nav ─────────────────────────── */
        .hdr-nav {
          background: #8b0000;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .hdr-nav::-webkit-scrollbar {
          display: none;
        }

        .hdr-nav-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(0.75rem, 2.4vw, 2rem);
          height: 44px;
          display: flex;
          align-items: center;
          gap: 0;
        }

        :global(.hdr-cat) {
          text-decoration: none;
          color: rgba(255,255,255,0.88);
          font-size: 14px;
          font-weight: 600;
          padding: 0 clamp(0.5rem, 1.2vw, 1rem);
          height: 44px;
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          border-bottom: 3px solid transparent;
          transition: all 0.15s;
          position: relative;
        }

        :global(.hdr-cat:hover) {
          color: #fff;
          background: rgba(255,255,255,0.08);
        }

        :global(.hdr-cat.active) {
          color: #fff;
          border-bottom-color: #e2b93b;
          font-weight: 700;
        }

        /* ── Mobile drawer ────────────────────────── */
        .hdr-overlay {
          position: fixed;
          inset: 0;
          z-index: 500;
          background: rgba(0,0,0,0.45);
        }

        .hdr-drawer {
          position: absolute;
          top: 0;
          left: 0;
          width: min(320px, 85vw);
          height: 100%;
          background: #fff;
          display: flex;
          flex-direction: column;
          box-shadow: 4px 0 20px rgba(0,0,0,0.15);
        }

        .hdr-drawer-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #eee;
        }

        .hdr-drawer-brand {
          font-family: var(--font-heading), serif;
          font-size: 22px;
          font-weight: 700;
          color: #8b0000;
        }

        .hdr-drawer-close {
          border: none;
          background: transparent;
          color: #333;
          cursor: pointer;
          padding: 4px;
        }

        .hdr-drawer-nav {
          flex: 1;
          overflow-y: auto;
          padding: 0.5rem 0;
        }

        :global(.hdr-drawer-link) {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.25rem;
          text-decoration: none;
          color: #222;
          font-size: 16px;
          font-weight: 600;
          border-bottom: 1px solid #f5f5f5;
          transition: background 0.1s;
        }

        :global(.hdr-drawer-link:hover) {
          background: #f9f6f0;
          color: #8b0000;
        }

        .hdr-drawer-footer {
          padding: 1rem 1.25rem;
          border-top: 1px solid #eee;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1rem;
        }

        .hdr-drawer-footer :global(a) {
          font-size: 13px;
          color: #666;
          text-decoration: none;
        }

        .hdr-drawer-footer :global(a:hover) {
          color: #8b0000;
        }

        /* ── Responsive ───────────────────────────── */
        @media (max-width: 768px) {
          .hdr-utility {
            display: none;
          }

          .hdr-brand-inner {
            height: 56px;
          }

          .hdr-menu-btn {
            display: inline-flex;
          }

          .hdr-logo-tag {
            display: none;
          }

          .hdr-search-label {
            display: none;
          }

          .hdr-search-btn {
            padding: 0.45rem;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            justify-content: center;
          }

          .hdr-search-box {
            width: clamp(180px, 55vw, 280px);
          }

          .hdr-results {
            position: fixed;
            top: 56px;
            left: 0;
            right: 0;
            width: auto;
            border-radius: 0 0 12px 12px;
          }

          .hdr-nav-inner {
            height: 40px;
          }

          :global(.hdr-cat) {
            font-size: 13px;
            height: 40px;
          }
        }
      `}</style>
    </>
  );
}
