import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Advertise With Us | Akaal Bani",
  description: "Partner with Akaal Bani for high-impact Punjabi digital advertising campaigns."
};

export default function AdvertisePage() {
  return (
    <>
      <Header posts={[]} />
      <main style={{ width: "100%", paddingLeft: "clamp(0.75rem, 2.6vw, 2.8rem)", paddingRight: "clamp(0.75rem, 2.6vw, 2.8rem)", paddingTop: "1.2rem", paddingBottom: "2rem" }}>
        <section className="card" style={{ maxWidth: "960px", margin: "0 auto", padding: "clamp(1rem, 2.4vw, 1.8rem)", borderRadius: "1rem" }}>
          <p className="kicker" style={{ marginTop: 0, marginBottom: "0.35rem" }}>Advertise With Us</p>
          <h1 className="section-title" style={{ marginTop: 0, marginBottom: "0.8rem" }}>Grow Your Brand Through Trusted Punjabi Media</h1>
          <p style={{ marginTop: 0, marginBottom: "0.8rem", color: "var(--muted)", lineHeight: 1.75 }}>
            Akaal Bani offers digital advertising solutions for businesses, institutions, and campaigns that want meaningful visibility in Punjabi-speaking audiences.
          </p>

          <h2 style={{ marginTop: "1.1rem", marginBottom: "0.45rem", fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>Available Formats</h2>
          <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "var(--muted)", lineHeight: 1.7 }}>
            <li>Homepage banner placements</li>
            <li>Category sponsorships</li>
            <li>Sponsored stories with editorial guidelines</li>
            <li>Custom festival and election campaign packages</li>
          </ul>

          <h2 style={{ marginTop: "1.1rem", marginBottom: "0.45rem", fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>Campaign Support</h2>
          <p style={{ marginTop: 0, marginBottom: "0.4rem", color: "var(--muted)", lineHeight: 1.7 }}>
            Dedicated account support for planning, creatives, and performance reporting.
          </p>
          <p style={{ marginTop: 0, marginBottom: 0, color: "var(--muted)", lineHeight: 1.7 }}>
            Contact: ads@akaalbani.com | +91 172 400 1199
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
