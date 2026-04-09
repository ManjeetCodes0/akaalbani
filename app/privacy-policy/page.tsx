import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Akaal Bani",
  description: "Read the Akaal Bani privacy policy and learn how we collect, use, and protect user information."
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header posts={[]} />
      <main style={{ width: "100%", paddingLeft: "clamp(0.75rem, 2.6vw, 2.8rem)", paddingRight: "clamp(0.75rem, 2.6vw, 2.8rem)", paddingTop: "1.2rem", paddingBottom: "2rem" }}>
        <section className="card" style={{ maxWidth: "960px", margin: "0 auto", padding: "clamp(1rem, 2.4vw, 1.8rem)", borderRadius: "1rem" }}>
          <p className="kicker" style={{ marginTop: 0, marginBottom: "0.35rem" }}>Privacy Policy</p>
          <h1 className="section-title" style={{ marginTop: 0, marginBottom: "0.8rem" }}>Your Privacy Matters at Akaal Bani</h1>
          <p style={{ marginTop: 0, marginBottom: "0.8rem", color: "var(--muted)", lineHeight: 1.75 }}>
            Akaal Bani collects limited information to improve site performance, provide relevant content, and maintain platform security.
            We do not sell personal data to third parties.
          </p>

          <h2 style={{ marginTop: "1.1rem", marginBottom: "0.45rem", fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>Information We Collect</h2>
          <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "var(--muted)", lineHeight: 1.7 }}>
            <li>Basic analytics data such as device type, browser, and pages visited.</li>
            <li>Contact details you voluntarily provide through emails or forms.</li>
            <li>Technical logs used to monitor uptime and prevent abuse.</li>
          </ul>

          <h2 style={{ marginTop: "1.1rem", marginBottom: "0.45rem", fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>How We Use Data</h2>
          <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "var(--muted)", lineHeight: 1.7 }}>
            <li>To improve article recommendations and reading experience.</li>
            <li>To respond to user requests and editorial communication.</li>
            <li>To protect our services from fraud, misuse, and unauthorized access.</li>
          </ul>

          <p style={{ marginTop: "1rem", marginBottom: 0, color: "var(--muted)", lineHeight: 1.75 }}>
            For privacy-related questions, contact us at privacy@akaalbani.com.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
