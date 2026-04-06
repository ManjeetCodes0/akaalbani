"use client";

import { motion } from "framer-motion";
import { Sparkles, RadioTower, ArrowRight } from "lucide-react";

export default function BannerAd() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="card"
      style={{
        marginBottom: "1.8rem",
        borderRadius: "1.3rem",
        overflow: "hidden",
        background: "linear-gradient(118deg, #005f73 0%, #0a9396 40%, #94d2bd 100%)",
        color: "#f8fffe",
        position: "relative"
      }}
    >
      <div style={{ position: "absolute", width: "180px", height: "180px", borderRadius: "999px", right: "-34px", top: "-72px", background: "rgba(255,255,255,0.15)" }} />
      <div style={{ position: "absolute", width: "150px", height: "150px", borderRadius: "999px", left: "23%", bottom: "-90px", background: "rgba(0,0,0,0.12)" }} />

      <div style={{ position: "relative", zIndex: 2, padding: "1.25rem 1.2rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <p style={{ margin: 0, display: "inline-flex", alignItems: "center", gap: "0.35rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", fontSize: "0.72rem" }}>
            <RadioTower size={14} /> Sponsored Update
          </p>
          <h3 style={{ margin: "0.45rem 0", fontFamily: "var(--font-heading)", fontSize: "1.55rem" }}>ਆਕਾਲ ਬਾਣੀ Live ਐਪ ਹੁਣ ਉਪਲਬਧ</h3>
          <p style={{ margin: 0, opacity: 0.92 }}>ਤੇਜ਼ ਨੋਟੀਫਿਕੇਸ਼ਨ, ਵੀਡੀਓ ਬੁਲੇਟਿਨ ਅਤੇ ਜ਼ਿਲ੍ਹਾ-ਵਾਰ ਅਲਰਟ ਇੱਕੇ ਥਾਂ।</p>
        </div>

        <motion.button
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.94 }}
          style={{
            border: "none",
            borderRadius: "999px",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontWeight: 700,
            cursor: "pointer",
            padding: "0.68rem 1.08rem",
            color: "#0d504e",
            background: "#fef9d9"
          }}
        >
          <Sparkles size={15} /> ਹੁਣੇ ਡਾਊਨਲੋਡ ਕਰੋ <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.section>
  );
}
