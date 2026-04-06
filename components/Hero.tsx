"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircleMore, CalendarRange, UserRound } from "lucide-react";
import { NewsPost } from "@/types/news";

type HeroProps = {
  mainPost: NewsPost;
  sidePosts: NewsPost[];
};

export default function Hero({ mainPost, sidePosts }: HeroProps) {
  return (
    <section style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem", marginBottom: "1.8rem" }}>
      <Link href={`/news/${mainPost.id}`} style={{ textDecoration: "none" }}>
        <motion.article
          initial={{ scale: 0.98, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card"
          style={{ borderRadius: "1.4rem", overflow: "hidden", position: "relative", minHeight: "510px" }}
        >
          <img src={mainPost.image} alt={mainPost.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} referrerPolicy="no-referrer" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(12,12,12,0.08) 28%, rgba(16, 12, 8, 0.88) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "1.2rem 1.4rem", color: "#fff6eb" }}>
            <span style={{ alignSelf: "flex-start", background: "var(--accent)", color: "#2a231b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.7rem", padding: "0.26rem 0.56rem", borderRadius: "0.5rem" }}>
              {mainPost.category}
            </span>
            <h2 style={{ margin: "0.6rem 0", fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 3vw, 2.45rem)", maxWidth: "780px", lineHeight: 1.22 }}>
              {mainPost.title}
            </h2>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.78rem", color: "#ece0cf" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}><UserRound size={14} /> {mainPost.author}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}><CalendarRange size={14} /> {mainPost.date}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}><MessageCircleMore size={14} /> {mainPost.comments ?? 0} ਟਿੱਪਣੀਆਂ</span>
            </div>
            <p style={{ margin: "0.8rem 0 0", color: "#f4eadc", maxWidth: "70ch", fontSize: "0.93rem" }}>{mainPost.excerpt}</p>
          </div>
        </motion.article>
      </Link>

      <div style={{ display: "grid", gap: "0.85rem" }}>
        {sidePosts.map((post, idx) => (
          <Link key={post.id} href={`/news/${post.id}`} style={{ textDecoration: "none" }}>
            <motion.article
              className="card"
              initial={{ x: 16, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.34, delay: idx * 0.08 }}
              style={{ display: "flex", gap: "0.75rem", padding: "0.62rem", borderRadius: "1rem" }}
            >
              <div style={{ width: "114px", minWidth: "114px", borderRadius: "0.84rem", overflow: "hidden" }}>
                <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} referrerPolicy="no-referrer" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p className="kicker" style={{ margin: 0 }}>{post.category}</p>
                <h3 style={{ margin: "0.25rem 0", fontSize: "0.92rem", lineHeight: 1.35 }}>{post.title}</h3>
                <p className="meta" style={{ margin: 0 }}>{post.author} • {post.date}</p>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>

      <style jsx>{`
        section {
          align-items: stretch;
        }
        @media (max-width: 1024px) {
          section {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
