"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Instagram, Youtube, BadgeInfo } from "lucide-react";
import { RECENT_POSTS } from "@/data/news";

const social = [Facebook, Instagram, Youtube, BadgeInfo];

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "2rem",
        background: "linear-gradient(180deg, #1d1814 0%, #120f0c 100%)",
        color: "#f2e7d9",
        borderTop: "1px solid rgba(255,255,255,0.08)"
      }}
    >
      <div className="site-shell" style={{ paddingTop: "2rem", paddingBottom: "1.2rem", display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1.2fr", gap: "1rem" }}>
        <div>
          <h3 style={{ marginTop: 0, marginBottom: "0.5rem", fontFamily: "var(--font-heading)", fontSize: "1.4rem" }}>ਆਕਾਲ ਬਾਣੀ</h3>
          <p style={{ margin: 0, color: "#d5c8b7", fontSize: "0.9rem", lineHeight: 1.7 }}>ਲੋਕ-ਕੇਂਦਰਿਤ, ਭਰੋਸੇਯੋਗ ਅਤੇ ਤੇਜ਼ ਪੰਜਾਬੀ ਖਬਰਾਂ ਲਈ ਤੁਹਾਡਾ ਭਰੋਸੇਮੰਦ ਡਿਜਿਟਲ ਮੰਚ।</p>
          <div style={{ display: "flex", gap: "0.42rem", marginTop: "0.78rem" }}>
            {social.map((Icon, index) => (
              <motion.a
                href="#"
                key={index}
                whileHover={{ y: -4 }}
                style={{ width: "2rem", height: "2rem", borderRadius: "999px", display: "grid", placeItems: "center", border: "1px solid rgba(255,255,255,0.18)", color: "#f2e7d9" }}
              >
                <Icon size={14} />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ marginTop: 0, marginBottom: "0.5rem" }}>ਤੁਰੰਤ ਲਿੰਕ</h4>
          {["ਸਾਡੇ ਬਾਰੇ", "ਸੰਪਰਕ", "ਗੋਪਨੀਯਤਾ ਨੀਤੀ", "ਵਿਗਿਆਪਨ"].map((item) => (
            <p key={item} style={{ margin: "0 0 0.35rem", color: "#d5c8b7", fontSize: "0.86rem" }}>{item}</p>
          ))}
        </div>

        <div>
          <h4 style={{ marginTop: 0, marginBottom: "0.5rem" }}>ਸੈਕਸ਼ਨ</h4>
          {["ਪੰਜਾਬ", "ਦੇਸ਼", "ਵਿਸ਼ਲੇਸ਼ਣ", "ਖੇਡਾਂ"].map((item) => (
            <p key={item} style={{ margin: "0 0 0.35rem", color: "#d5c8b7", fontSize: "0.86rem" }}>{item}</p>
          ))}
        </div>

        <div>
          <h4 style={{ marginTop: 0, marginBottom: "0.5rem" }}>ਹਾਲੀਆ ਪੋਸਟਾਂ</h4>
          <div style={{ display: "grid", gap: "0.55rem" }}>
            {RECENT_POSTS.map((post) => (
              <Link key={post.id} href={`/news/${post.id}`} style={{ display: "flex", gap: "0.5rem", textDecoration: "none" }}>
                <div style={{ width: "58px", minWidth: "58px", height: "58px", borderRadius: "0.5rem", overflow: "hidden" }}>
                  <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p style={{ margin: "0.1rem 0", fontSize: "0.82rem", lineHeight: 1.3 }}>{post.title}</p>
                  <p style={{ margin: 0, fontSize: "0.7rem", color: "#baa88f" }}>{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="site-shell" style={{ borderTop: "1px solid rgba(255,255,255,0.09)", paddingTop: "0.8rem", paddingBottom: "1.1rem", display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", color: "#b9a790", fontSize: "0.76rem" }}>
        <span>© 2026 ਆਕਾਲ ਬਾਣੀ. ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ.</span>
        <span>ਪੰਜਾਬੀ ਨਿਊਜ਼ • ਡਿਜਿਟਲ ਐਡੀਸ਼ਨ</span>
      </div>

      <style jsx>{`
        @media (max-width: 1000px) {
          .site-shell:first-child {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 650px) {
          .site-shell:first-child {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
