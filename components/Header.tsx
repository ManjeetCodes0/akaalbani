"use client";

import { CalendarDays, Flame, Menu, Search, Sparkles, BellRing } from "lucide-react";
import { motion } from "framer-motion";
import { NAV_ITEMS, TRENDING_HEADLINE } from "@/data/news";

export default function Header() {
  return (
    <header>
      <div
        style={{
          background: "linear-gradient(90deg, #241e1a 0%, #3f2a20 45%, #623224 100%)",
          color: "#f6eede"
        }}
      >
        <div className="site-shell" style={{ paddingTop: "0.62rem", paddingBottom: "0.62rem", display: "flex", gap: "1rem", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", minWidth: "260px", flex: "1 1 320px" }}>
            <span style={{ background: "var(--primary)", borderRadius: "999px", padding: "0.25rem 0.65rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "0.2rem" }}>
              <Flame size={13} /> ਟ੍ਰੈਂਡਿੰਗ
            </span>
            <p style={{ margin: 0, fontSize: "0.78rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {TRENDING_HEADLINE}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", fontSize: "0.78rem", opacity: 0.95 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
              <CalendarDays size={14} /> 06 ਅਪ੍ਰੈਲ 2026
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
              <Sparkles size={14} /> Live ਪੰਜਾਬ ਡੈਸਕ
            </span>
          </div>
        </div>
      </div>

      <div className="site-shell" style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
        <div className="card" style={{ borderRadius: "1.15rem", padding: "0.95rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", background: "linear-gradient(130deg, #fffdf7 0%, #f6efe2 60%, #fcf7ef 100%)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <motion.div
              animate={{ rotate: [0, -6, 0, 6, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              style={{ width: "2.6rem", height: "2.6rem", borderRadius: "0.9rem", background: "var(--primary)", color: "white", display: "grid", placeItems: "center", fontWeight: 700, fontSize: "1.22rem", fontFamily: "var(--font-heading)" }}
            >
              ਅ
            </motion.div>
            <div>
              <h1 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "1.55rem", lineHeight: 1 }}>ਆਕਾਲ ਬਾਣੀ</h1>
              <p style={{ margin: "0.2rem 0 0", fontSize: "0.78rem", color: "var(--muted)" }}>Punjabi Digital Newsroom</p>
            </div>
          </div>

          <nav style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            {NAV_ITEMS.map((item, index) => (
              <a
                key={item}
                href="#"
                style={{
                  fontWeight: index === 0 ? 700 : 600,
                  color: index === 0 ? "var(--primary)" : "#2d2a27",
                  fontSize: "0.87rem",
                  borderBottom: index === 0 ? "2px solid var(--primary)" : "2px solid transparent",
                  paddingBottom: "0.24rem"
                }}
              >
                {item}
              </a>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            {[Search, BellRing, Menu].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.94 }}
                style={{ border: "1px solid var(--border)", background: "white", width: "2.2rem", height: "2.2rem", borderRadius: "0.7rem", display: "grid", placeItems: "center", color: "#463d35", cursor: "pointer" }}
              >
                <Icon size={18} />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
