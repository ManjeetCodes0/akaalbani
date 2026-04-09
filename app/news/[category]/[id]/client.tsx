"use client";

import Link from "next/link";
import {
  Clock3,
  BookOpen,
  PlayCircle,
  Play,
  ChevronRight,
} from "lucide-react";
import type { NewsPost } from "@/types/news";
import type { BodyBlock } from "@/lib/sanity";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type NewsArticleClientProps = {
  post: NewsPost;
  relatedPosts: NewsPost[];
  bodyParagraphs?: string[];
  bodyBlocks?: BodyBlock[];
};

function readMinutes(post: NewsPost, bodyParagraphs?: string[], bodyBlocks?: BodyBlock[]) {
  const blockText = (bodyBlocks ?? []).map((b) => b.text).join(" ");
  const paragraphText = (bodyParagraphs ?? []).join(" ");
  const titleText = post.title ?? "";
  const totalWords = `${titleText} ${post.excerpt ?? ""} ${blockText} ${paragraphText}`
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(3, Math.round(totalWords / 160));
}

/**
 * Group consecutive blocks: non-list blocks are standalone,
 * consecutive list items (bullet / number) are collected into
 * a single styled points card.
 */
function renderStoryBody(blocks: BodyBlock[] | undefined, paragraphs: string[] | undefined) {
  if (blocks && blocks.length > 0) {
    const groups: Array<{ type: "block"; block: BodyBlock; idx: number } | { type: "list"; items: { block: BodyBlock; idx: number }[] }> = [];

    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      if (b.listItem === "bullet" || b.listItem === "number") {
        const last = groups[groups.length - 1];
        if (last && last.type === "list") {
          last.items.push({ block: b, idx: i });
        } else {
          groups.push({ type: "list", items: [{ block: b, idx: i }] });
        }
      } else {
        groups.push({ type: "block", block: b, idx: i });
      }
    }

    return groups.map((group) => {
      if (group.type === "block") {
        const { block, idx } = group;
        if (block.style === "h2") return <h2 key={idx} className="news-h2">{block.text}</h2>;
        if (block.style === "h3") return <h3 key={idx} className="news-h3">{block.text}</h3>;
        if (block.style === "blockquote") {
          return <blockquote key={idx} className="news-quote"><p>{block.text}</p></blockquote>;
        }
        return <p key={idx} className="news-p">{block.text}</p>;
      }

      // Render grouped list items as a styled points card
      const firstIdx = group.items[0].idx;
      return (
        <div key={`list-${firstIdx}`} className="points-card">
          <div className="points-accent" />
          <ol className="points-list">
            {group.items.map(({ block, idx }, pos) => (
              <li key={idx} className="points-item">
                <span className="points-num">{pos + 1}</span>
                <span className="points-text">{block.text}</span>
              </li>
            ))}
          </ol>
        </div>
      );
    });
  }

  const fallback = paragraphs ?? [];
  if (!fallback.length) {
    return <p className="news-p">ਇਸ ਲੇਖ ਲਈ ਮੁੱਖ ਸਮੱਗਰੀ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।</p>;
  }

  return fallback.map((paragraph, index) => (
    <p key={index} className="news-p">{paragraph}</p>
  ));
}

export default function NewsArticleClient({
  post,
  relatedPosts,
  bodyParagraphs,
  bodyBlocks,
}: NewsArticleClientProps) {
  const latestNews = relatedPosts.slice(0, 4);
  const editorsPicks = relatedPosts.slice(0, 2);
  const mostRead = relatedPosts.slice(0, 5);
  const minutes = readMinutes(post, bodyParagraphs, bodyBlocks);

  return (
    <>
      <Header posts={[post, ...relatedPosts]} />

      <main className="news-shell">
        <div className="news-breadcrumb">
          <Link href="/" className="crumb-home">ਮੁੱਖ ਪੇਜ</Link>
          <ChevronRight size={14} />
          <span>{post.category}</span>
        </div>

        <div className="news-layout">
          <article className="story">
            <header className="story-header">
              <h1>{post.title}</h1>
              <div className="story-meta">
                <span><Clock3 size={14} /> {post.date}</span>
                <span className="meta-divider" />
                <span><BookOpen size={14} /> ਪੜ੍ਹਨ ਦਾ ਸਮਾਂ: {minutes} ਮਿੰਟ</span>
              </div>
            </header>

            <figure className="hero-figure">
              <img src={post.image} alt={post.title} referrerPolicy="no-referrer" loading="eager" />
              <figcaption>
                ਖ਼ਬਰ ਨਾਲ ਸਬੰਧਤ ਤਸਵੀਰ। ਸਾਰੀ ਜਾਣਕਾਰੀ ਦੀ ਪੁਸ਼ਟੀ ਲਈ ਸਾਡੀ ਟੀਮ ਲਗਾਤਾਰ ਅਪਡੇਟ ਕਰਦੀ ਰਹਿੰਦੀ ਹੈ।
              </figcaption>
            </figure>

            <div className="story-body">
              {post.excerpt && <p className="news-p intro">{post.excerpt}</p>}
              {renderStoryBody(bodyBlocks, bodyParagraphs)}
            </div>

            <section className="video-highlights">
              <h2><PlayCircle size={22} /> ਵੀਡੀਓ ਹਾਈਲਾਈਟਸ</h2>
              <div className="video-grid">
                {(relatedPosts.length ? relatedPosts.slice(0, 2) : [post, post]).map((item, index) => (
                  <Link key={`${item.id}-${index}`} href={`/news/${item.categorySlug}/${item.id}`} className="video-card">
                    <div className="video-thumb">
                      <img src={item.image} alt={item.title} referrerPolicy="no-referrer" loading="lazy" />
                      <span className="play-btn"><Play size={18} /></span>
                    </div>
                    <h3>{item.title}</h3>
                  </Link>
                ))}
              </div>
            </section>
          </article>

          <aside className="sidebar">
            <section>
              <div className="side-head"><h2>ਤਾਜ਼ਾ ਖ਼ਬਰਾਂ</h2></div>
              <div className="latest-list">
                {latestNews.map((news) => (
                  <Link key={news.id} href={`/news/${news.categorySlug}/${news.id}`} className="latest-item">
                    <h3>{news.title}</h3>
                    <p>{news.date}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="editor-box">
              <div className="side-head"><h2>ਸਿਫਾਰਿਸ਼</h2></div>
              <div className="editor-list">
                {editorsPicks.map((pick) => (
                  <Link key={pick.id} href={`/news/${pick.categorySlug}/${pick.id}`} className="editor-item">
                    <img src={pick.image} alt={pick.title} referrerPolicy="no-referrer" loading="lazy" />
                    <h3>{pick.title}</h3>
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <section className="most-read">
          <h2>ਸਭ ਤੋਂ ਵੱਧ ਪੜ੍ਹੀਆਂ ਗਈਆਂ</h2>
          <div className="most-grid">
            {mostRead.map((item, idx) => (
              <Link key={item.id} href={`/news/${item.categorySlug}/${item.id}`} className="most-item">
                <span>{idx + 1}</span>
                <h3>{item.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        <style jsx>{`
          /* ─── Shell ─────────────────────────────────────────── */
          .news-shell {
            background: #f9f9f9;
            color: #1a1c1c;
            width: 100%;
            padding: 2rem clamp(1rem, 3.5vw, 3rem) 5rem;
          }

          /* ─── Breadcrumb ─────────────────────────────────────── */
          .news-breadcrumb {
            max-width: 1380px;
            margin: 0 auto 1.5rem;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            color: #666;
            font-size: 15px;
          }

          .crumb-home {
            color: #8b0000;
            text-decoration: none;
            font-weight: 700;
          }

          /* ─── Two-column layout ──────────────────────────────── */
          .news-layout {
            max-width: 1380px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: minmax(0, 2fr) 320px;
            gap: clamp(2rem, 4vw, 4.5rem);
            align-items: start;
          }

          /* ─── Article header ─────────────────────────────────── */
          .story-header {
            margin-bottom: 2rem;
          }

          .story-header h1 {
            margin: 0 0 1.25rem;
            font-family: var(--font-heading), serif;
            font-size: clamp(28px, 4vw, 52px);
            line-height: 1.22;
            color: #0d0d0d;
            font-weight: 700;
          }

          .story-meta {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.75rem;
            color: #666;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }

          .story-meta span {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
          }

          .meta-divider {
            width: 1px;
            height: 14px;
            background: #ccc;
          }

          /* ─── Hero image ─────────────────────────────────────── */
          .hero-figure {
            margin: 0 0 2.5rem;
          }

          .hero-figure img {
            width: 100%;
            aspect-ratio: 16 / 9;
            object-fit: cover;
            border-radius: 4px;
            display: block;
          }

          .hero-figure figcaption {
            margin-top: 0.75rem;
            font-size: 14px;
            line-height: 1.7;
            color: #555;
            border-left: 3px solid #8b0000;
            padding-left: 0.85rem;
          }

          /* ─── Article body ───────────────────────────────────── */
          .story-body {
            border-top: 2px solid #e0e0e0;
            padding-top: 2rem;
          }

          /*
           * Body text classes use :global() because they are rendered
           * by renderStoryBody() — a helper function outside this
           * component. styled-jsx only scopes elements lexically
           * inside the component that owns <style jsx>, so without
           * :global() these rules never match.
           */
          :global(.news-p) {
            font-family: var(--font-body), "Noto Sans Gurmukhi", sans-serif;
            font-size: clamp(19px, 1.6vw, 22px);
            line-height: 2.1;
            color: #111;
            margin: 0 0 1.75em;
            font-weight: 500;
          }

          /* Lead / intro paragraph — slightly larger and bolder */
          :global(.news-p.intro) {
            font-size: clamp(21px, 1.85vw, 25px);
            line-height: 2.0;
            font-weight: 600;
            color: #0d0d0d;
            padding-bottom: 1.75em;
            border-bottom: 1px dashed #d8d8d8;
            margin-bottom: 2em;
          }

          :global(.news-bullet) {
            padding-left: 1.5rem;
            position: relative;
          }

          :global(.news-bullet)::before {
            content: "";
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #8b0000;
            position: absolute;
            left: 0;
            top: 0.85em;
          }

          :global(.news-h2) {
            font-family: var(--font-heading), serif;
            font-size: clamp(24px, 2.4vw, 34px);
            line-height: 1.3;
            margin: 3rem 0 1.25rem;
            color: #0d0d0d;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #eee;
          }

          :global(.news-h3) {
            font-family: var(--font-heading), serif;
            font-size: clamp(21px, 1.9vw, 28px);
            line-height: 1.35;
            margin: 2.5rem 0 1rem;
            color: #1a1a1a;
          }

          :global(.news-quote) {
            margin: 2.5rem 0;
            padding: 1.75rem 1.75rem 1.75rem 2rem;
            border-left: 5px solid #8b0000;
            background: #fff;
            box-shadow: 0 2px 12px rgba(0,0,0,0.06);
            border-radius: 0 4px 4px 0;
          }

          :global(.news-quote p) {
            margin: 0;
            font-family: var(--font-heading), serif;
            font-size: clamp(20px, 1.7vw, 24px);
            line-height: 1.85;
            color: #222;
            font-style: italic;
          }

          /* ─── Points card (grouped list items) ───────────────── */
          :global(.points-card) {
            position: relative;
            margin: 2.25rem 0;
            background: #fffdf7;
            border: 1px solid #e6dccf;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 18px rgba(65, 47, 24, 0.08);
          }

          :global(.points-accent) {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(90deg, #b64022 0%, #e2b93b 50%, #036666 100%);
          }

          :global(.points-list) {
            list-style: none;
            margin: 0;
            padding: 1.75rem 1.75rem 1rem;
            counter-reset: none;
          }

          :global(.points-item) {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            padding: 1rem 0;
            border-bottom: 1px solid #f0ebe0;
          }

          :global(.points-item:last-child) {
            border-bottom: none;
            padding-bottom: 0.5rem;
          }

          :global(.points-num) {
            flex-shrink: 0;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #b64022;
            color: #fff;
            font-family: var(--font-heading), serif;
            font-size: 16px;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 0.15em;
          }

          :global(.points-text) {
            font-family: var(--font-body), "Noto Sans Gurmukhi", sans-serif;
            font-size: clamp(17px, 1.4vw, 20px);
            line-height: 1.95;
            color: #1f1c1a;
            font-weight: 500;
          }

          /* ─── Video highlights ───────────────────────────────── */
          .video-highlights {
            margin-top: 3rem;
            padding: 1.5rem;
            background: #f0f0f0;
            border-radius: 4px;
          }

          .video-highlights h2 {
            margin: 0 0 1.25rem;
            font-family: var(--font-heading), serif;
            font-size: 20px;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }

          .video-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.25rem;
          }

          :global(.video-card) {
            text-decoration: none;
            color: inherit;
          }

          .video-thumb {
            position: relative;
            overflow: hidden;
            border-radius: 3px;
          }

          .video-thumb img {
            width: 100%;
            aspect-ratio: 16 / 9;
            object-fit: cover;
            transition: transform 0.35s ease;
          }

          .video-card:hover .video-thumb img {
            transform: scale(1.04);
          }

          .play-btn {
            position: absolute;
            left: 0.75rem;
            bottom: 0.75rem;
            width: 2.2rem;
            height: 2.2rem;
            border-radius: 50%;
            background: #8b0000;
            color: #fff;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .video-card h3 {
            margin: 0.6rem 0 0;
            font-size: 15px;
            line-height: 1.45;
          }

          /* ─── Sidebar ────────────────────────────────────────── */
          .sidebar {
            position: sticky;
            top: 7rem;
            display: grid;
            gap: 2rem;
          }

          .side-head {
            border-top: 4px solid #8b0000;
            padding-top: 0.5rem;
            margin-bottom: 1rem;
          }

          .side-head h2 {
            margin: 0;
            font-size: 18px;
            font-family: var(--font-heading), serif;
          }

          .latest-list {
            display: grid;
            gap: 0;
          }

          :global(.latest-item) {
            text-decoration: none;
            color: inherit;
            display: block;
            border-bottom: 1px solid #e6e6e6;
            padding: 0.85rem 0;
          }

          .latest-item h3 {
            margin: 0 0 0.35rem;
            font-size: 15px;
            line-height: 1.5;
            font-weight: 600;
          }

          .latest-item p {
            margin: 0;
            color: #777;
            font-size: 13px;
          }

          .editor-box {
            background: #f4f4f4;
            padding: 1.1rem;
            border-radius: 4px;
          }

          .editor-list {
            display: grid;
            gap: 1.25rem;
          }

          :global(.editor-item) {
            text-decoration: none;
            color: inherit;
            display: block;
          }

          .editor-item img {
            width: 100%;
            aspect-ratio: 16 / 9;
            object-fit: cover;
            margin-bottom: 0.55rem;
            border-radius: 3px;
          }

          .editor-item h3 {
            margin: 0;
            font-size: 15px;
            line-height: 1.45;
          }

          /* ─── Most read ──────────────────────────────────────── */
          .most-read {
            max-width: 1380px;
            margin: 3.5rem auto 2rem;
            border-top: 2px solid #ddd;
            padding-top: 2rem;
          }

          .most-read h2 {
            margin: 0 0 1.5rem;
            font-family: var(--font-heading), serif;
            font-size: clamp(22px, 2.5vw, 30px);
          }

          .most-grid {
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: 1.5rem;
          }

          :global(.most-item) {
            text-decoration: none;
            color: inherit;
            display: flex;
            gap: 0.65rem;
            align-items: flex-start;
          }

          .most-item span {
            font-size: 2.5rem;
            line-height: 1;
            color: #e0e0e0;
            font-weight: 900;
            flex-shrink: 0;
          }

          .most-item h3 {
            margin: 0;
            font-size: 15px;
            line-height: 1.5;
            padding-top: 0.25rem;
          }

          /* ─── Tablet (≤ 1100px): drop sidebar below ──────────── */
          @media (max-width: 1100px) {
            .news-layout {
              grid-template-columns: 1fr;
            }

            .sidebar {
              position: static;
              grid-template-columns: repeat(2, 1fr);
            }

            .most-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
          }

          /* ─── Mobile (≤ 680px) ───────────────────────────────── */
          @media (max-width: 680px) {
            .news-shell {
              padding: 1.25rem 1rem 4rem;
            }

            .news-breadcrumb {
              margin-bottom: 1rem;
              font-size: 13px;
            }

            .story-header {
              margin-bottom: 1.25rem;
            }

            .story-header h1 {
              font-size: clamp(24px, 7.5vw, 36px);
              line-height: 1.28;
            }

            .hero-figure {
              margin-bottom: 1.75rem;
            }

            :global(.news-p) {
              font-size: clamp(17px, 5vw, 20px);
              line-height: 2.05;
              margin-bottom: 1.5em;
            }

            :global(.news-p.intro) {
              font-size: clamp(18px, 5.5vw, 22px);
              line-height: 1.95;
            }

            :global(.news-h2) {
              font-size: clamp(21px, 6vw, 26px);
              margin-top: 2.25rem;
            }

            :global(.news-h3) {
              font-size: clamp(19px, 5.5vw, 23px);
              margin-top: 2rem;
            }

            :global(.news-quote) {
              padding: 1.25rem 1.25rem 1.25rem 1.5rem;
              margin: 1.75rem 0;
            }

            :global(.news-quote p) {
              font-size: clamp(17px, 5vw, 20px);
            }

            :global(.points-list) {
              padding: 1.25rem 1rem 0.5rem;
            }

            :global(.points-num) {
              width: 30px;
              height: 30px;
              font-size: 14px;
            }

            :global(.points-text) {
              font-size: clamp(15px, 4.5vw, 18px);
            }

            .sidebar {
              grid-template-columns: 1fr;
            }

            .video-grid {
              grid-template-columns: 1fr;
            }

            .most-grid {
              grid-template-columns: 1fr;
            }

            .most-read {
              margin-top: 2.5rem;
            }
          }
        `}</style>
      </main>

      <Footer recentPosts={relatedPosts.slice(0, 2)} />
    </>
  );
}
