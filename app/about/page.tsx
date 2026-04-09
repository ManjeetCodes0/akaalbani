import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us | Akaal Bani",
  description: "Learn about Akaal Bani, our editorial mission, and our commitment to accurate Punjabi journalism."
};

export default function AboutPage() {
  return (
    <>
      <Header posts={[]} />
      <main style={{ width: "100%", paddingLeft: "clamp(0.75rem, 2.6vw, 2.8rem)", paddingRight: "clamp(0.75rem, 2.6vw, 2.8rem)", paddingTop: "1.2rem", paddingBottom: "2rem" }}>
        <section className="card" style={{ maxWidth: "960px", margin: "0 auto", padding: "clamp(1rem, 2.4vw, 1.8rem)", borderRadius: "1rem" }}>
          <p className="kicker" style={{ marginTop: 0, marginBottom: "0.35rem" }}>About Us</p>
          <h1 className="section-title" style={{ marginTop: 0, marginBottom: "0.8rem" }}>Akaal Bani: Independent Punjabi News for a Connected Generation</h1>
          <p style={{ marginTop: 0, marginBottom: "0.8rem", color: "var(--muted)", lineHeight: 1.75 }}>
            Akaal Bani is a Punjabi digital news platform focused on credible reporting, clear analysis, and community-centered storytelling.
            We cover Punjab, national affairs, global developments, public policy, sports, and culture with a newsroom approach that values
            facts over noise.
          </p>
          <p style={{ marginTop: 0, marginBottom: "0.8rem", color: "var(--muted)", lineHeight: 1.75 }}>
            Our mission is simple: publish reliable information quickly, verify before we report, and explain why a story matters to everyday readers.
            We prioritize editorial transparency and responsible journalism in both breaking and long-form formats.
          </p>
          <h2 style={{ marginTop: "1.1rem", marginBottom: "0.45rem", fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>Editorial Values</h2>
          <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "var(--muted)", lineHeight: 1.7 }}>
            <li>Accuracy and verification in every published update.</li>
            <li>Clear sourcing and context-first reporting.</li>
            <li>Respect for reader intelligence and diversity of views.</li>
            <li>Responsible coverage that avoids sensationalism.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
