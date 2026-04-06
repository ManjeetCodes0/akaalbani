"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { NewsPost } from "@/types/news";
import Sidebar from "@/components/Sidebar";

const tabs = ["ਯਾਤਰਾ", "ਸਿਹਤ", "ਖੇਡਾਂ", "ਰੋਜ਼ਗਾਰ"];

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
    <section style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem", marginBottom: "2.2rem" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.8rem", marginBottom: "0.85rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <h2 className="section-title">ਨਵਾਂ ਕੀ ਹੈ</h2>
            <span style={{ width: "8px", height: "8px", borderRadius: "999px", background: "var(--secondary)" }} />
          </div>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  border: activeTab === tab ? "1px solid transparent" : "1px solid var(--border)",
                  background: activeTab === tab ? "var(--secondary)" : "#fff",
                  color: activeTab === tab ? "#fff" : "#3f3a35",
                  borderRadius: "999px",
                  padding: "0.36rem 0.72rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: "0.77rem"
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.8rem" }}>
          <Link href={`/news/${mainPost.id}`} style={{ textDecoration: "none" }}>
            <motion.article
              key={activeTab}
              className="card"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              style={{ borderRadius: "1rem", overflow: "hidden" }}
            >
              <div style={{ aspectRatio: "4 / 3" }}>
                <img src={mainPost.image} alt={mainPost.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} referrerPolicy="no-referrer" />
              </div>
              <div style={{ padding: "0.88rem" }}>
                <p className="kicker" style={{ margin: 0 }}>{mainPost.category}</p>
                <h3 style={{ margin: "0.42rem 0", fontFamily: "var(--font-heading)", lineHeight: 1.32 }}>{mainPost.title}</h3>
                <p className="meta" style={{ margin: "0 0 0.42rem" }}>{mainPost.date} • {mainPost.author}</p>
                <p style={{ margin: 0, color: "#5a544e", fontSize: "0.92rem", lineHeight: 1.6 }}>{mainPost.excerpt}</p>
              </div>
            </motion.article>
          </Link>

          <div style={{ display: "grid", gap: "0.72rem" }}>
            {shuffled.map((post, index) => (
              <Link key={post.id} href={`/news/${post.id}`} style={{ textDecoration: "none" }}>
                <motion.article
                  className="card"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.07 }}
                  style={{ borderRadius: "0.9rem", display: "flex", gap: "0.58rem", padding: "0.5rem" }}
                >
                  <div style={{ width: "90px", minWidth: "90px", borderRadius: "0.7rem", overflow: "hidden" }}>
                    <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="kicker" style={{ margin: 0 }}>{post.category}</p>
                    <h4 style={{ margin: "0.2rem 0", fontSize: "0.89rem", lineHeight: 1.33 }}>{post.title}</h4>
                    <p className="meta" style={{ margin: 0 }}>{post.date}</p>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Sidebar />

      <style jsx>{`
        @media (max-width: 1024px) {
          section {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 780px) {
          section > div:nth-child(1) > div:nth-child(2) {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
