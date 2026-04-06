"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Rss, Youtube, MessageCircleMore, AtSign } from "lucide-react";
import { SOCIAL_METRICS } from "@/data/news";

const iconMap = [Facebook, AtSign, Instagram, Youtube, MessageCircleMore, Rss];

export default function Sidebar() {
  return (
    <aside style={{ display: "grid", gap: "1rem" }}>
      <section className="card" style={{ borderRadius: "1rem", padding: "0.9rem" }}>
        <h3 style={{ margin: "0 0 0.65rem", fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>ਜੁੜੇ ਰਹੋ</h3>
        <div style={{ display: "grid", gap: "0.5rem" }}>
          {SOCIAL_METRICS.map((item, index) => {
            const Icon = iconMap[index];
            return (
              <motion.a
                key={item.platform}
                href="#"
                whileHover={{ x: 4 }}
                style={{
                  background: item.color,
                  borderRadius: "0.7rem",
                  color: "white",
                  padding: "0.62rem 0.68rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.83rem",
                  fontWeight: 600
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}><Icon size={15} /> {item.platform}</span>
                <span>{item.stat}</span>
              </motion.a>
            );
          })}
        </div>
      </section>

      <section className="card" style={{ borderRadius: "1rem", padding: "1rem", background: "linear-gradient(180deg, #fff9ec 0%, #fff5d8 100%)" }}>
        <h3 style={{ margin: "0 0 0.4rem", fontFamily: "var(--font-heading)", fontSize: "1.1rem" }}>ਨਿਊਜ਼ਲੈਟਰ</h3>
        <p style={{ margin: "0 0 0.72rem", color: "var(--muted)", fontSize: "0.87rem" }}>ਸਵੇਰੇ ਦੀਆਂ ਮੁੱਖ ਖਬਰਾਂ WhatsApp ਅਤੇ ਈਮੇਲ ਤੇ ਪ੍ਰਾਪਤ ਕਰੋ।</p>
        <input
          type="email"
          placeholder="ਤੁਹਾਡਾ ਈਮੇਲ ਪਤਾ"
          style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "0.68rem", padding: "0.64rem 0.72rem", marginBottom: "0.5rem", outline: "none" }}
        />
        <button
          style={{ width: "100%", border: "none", borderRadius: "0.68rem", background: "var(--primary)", color: "white", fontWeight: 700, padding: "0.65rem", cursor: "pointer" }}
        >
          Subscribe ਕਰੋ
        </button>
      </section>
    </aside>
  );
}
