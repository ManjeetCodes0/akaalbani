import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact | Akaal Bani",
  description: "Get in touch with Akaal Bani for editorial queries, feedback, and newsroom communication."
};

export default function ContactPage() {
  return (
    <>
      <Header posts={[]} />
      <main style={{ width: "100%", paddingLeft: "clamp(0.75rem, 2.6vw, 2.8rem)", paddingRight: "clamp(0.75rem, 2.6vw, 2.8rem)", paddingTop: "1.2rem", paddingBottom: "2rem" }}>
        <section className="card" style={{ maxWidth: "960px", margin: "0 auto", padding: "clamp(1rem, 2.4vw, 1.8rem)", borderRadius: "1rem" }}>
          <p className="kicker" style={{ marginTop: 0, marginBottom: "0.35rem" }}>Contact</p>
          <h1 className="section-title" style={{ marginTop: 0, marginBottom: "0.8rem" }}>Reach the Akaal Bani Team</h1>
          <p style={{ marginTop: 0, marginBottom: "0.8rem", color: "var(--muted)", lineHeight: 1.75 }}>
            We welcome reader feedback, story ideas, corrections, and partnership inquiries. If you need to contact our newsroom, please use the details below.
          </p>

          <h2 style={{ marginTop: "1.1rem", marginBottom: "0.45rem", fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>Editorial Desk</h2>
          <p style={{ marginTop: 0, marginBottom: "0.4rem", color: "var(--muted)", lineHeight: 1.7 }}>
            Email: editor@akaalbani.com
          </p>
          <p style={{ marginTop: 0, marginBottom: "0.4rem", color: "var(--muted)", lineHeight: 1.7 }}>
            Phone: +91 172 400 1122
          </p>

          <h2 style={{ marginTop: "1.1rem", marginBottom: "0.45rem", fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>Business and Advertising</h2>
          <p style={{ marginTop: 0, marginBottom: "0.4rem", color: "var(--muted)", lineHeight: 1.7 }}>
            Email: business@akaalbani.com
          </p>
          <p style={{ marginTop: 0, marginBottom: "0.4rem", color: "var(--muted)", lineHeight: 1.7 }}>
            Phone: +91 172 400 1188
          </p>

          <h2 style={{ marginTop: "1.1rem", marginBottom: "0.45rem", fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>Office Address</h2>
          <p style={{ marginTop: 0, marginBottom: 0, color: "var(--muted)", lineHeight: 1.7 }}>
            Akaal Bani Media House, Sector 22,
            <br />
            Chandigarh, India 160022
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
