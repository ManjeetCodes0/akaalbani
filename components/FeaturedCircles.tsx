"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { NewsPost } from "@/types/news";

type FeaturedCirclesProps = {
  posts: NewsPost[];
};

export default function FeaturedCircles({ posts }: FeaturedCirclesProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", paddingTop: "0.8rem", paddingBottom: "1.3rem" }}>
      {posts.map((post, index) => (
        <Link key={post.id} href={`/news/${post.id}`} style={{ textDecoration: "none" }}>
          <motion.article
            className="card"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.24 }}
            style={{ display: "flex", alignItems: "center", gap: "0.8rem", padding: "0.7rem", borderRadius: "1.1rem" }}
          >
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ width: "4.45rem", height: "4.45rem", borderRadius: "999px", overflow: "hidden", border: "3px solid #fff", boxShadow: "0 0 0 1px var(--border)" }}>
                <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} referrerPolicy="no-referrer" />
              </div>
              <span style={{ position: "absolute", right: "-0.2rem", top: "-0.15rem", width: "1.3rem", height: "1.3rem", borderRadius: "999px", background: "var(--secondary)", color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: "0.68rem" }}>
                {index + 1}
              </span>
            </div>
            <div>
              <p className="kicker" style={{ margin: 0 }}>{post.category}</p>
              <h3 style={{ margin: "0.25rem 0", fontSize: "0.95rem", lineHeight: 1.35 }}>{post.title}</h3>
              <p className="meta" style={{ margin: 0 }}>{post.date}</p>
            </div>
          </motion.article>
        </Link>
      ))}
    </div>
  );
}
