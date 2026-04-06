"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { NewsPost } from "@/types/news";

type TopStoriesProps = {
  posts: NewsPost[];
};

export default function TopStories({ posts }: TopStoriesProps) {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.8rem" }}>
        <h2 className="section-title">ਟੌਪ ਸਟੋਰੀਜ਼</h2>
        <span style={{ width: "8px", height: "8px", borderRadius: "999px", background: "var(--primary)" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "0.95rem" }}>
        {posts.map((post, index) => (
          <Link key={post.id} href={`/news/${post.id}`} style={{ textDecoration: "none" }}>
            <motion.article
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -7 }}
              style={{ borderRadius: "1rem", overflow: "hidden" }}
            >
              <div style={{ aspectRatio: "4 / 3", overflow: "hidden" }}>
                <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} referrerPolicy="no-referrer" />
              </div>
              <div style={{ padding: "0.78rem" }}>
                <p className="kicker" style={{ margin: 0 }}>{post.category}</p>
                <h3 style={{ margin: "0.33rem 0", lineHeight: 1.35, fontSize: "1.02rem" }}>{post.title}</h3>
                <p className="meta" style={{ margin: 0 }}>{post.author} • {post.date}</p>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </section>
  );
}
