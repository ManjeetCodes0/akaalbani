import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, UserRound, MessagesSquare } from "lucide-react";
import { ALL_POSTS, getPostById } from "@/data/news";

type NewsPageProps = {
  params: Promise<{ id: string }>;
};

const DUMMY_BODY = [
  "ਇਹ ਇੱਕ ਡਮੀ ਲੇਖ ਹੈ ਜੋ ਅਸਲ ਨਿਊਜ਼ ਲੇਆਉਟ ਨੂੰ ਦਿਖਾਉਣ ਲਈ ਬਣਾਇਆ ਗਿਆ ਹੈ। ਇੱਥੇ ਤੁਸੀਂ ਸਿਰਲੇਖ, ਲੇਖਕ, ਤਾਰੀਖ ਅਤੇ ਮੁੱਖ ਵਿਸ਼ੇ ਦੀ ਸਪਸ਼ਟ ਪ੍ਰਸਤੁਤੀ ਵੇਖ ਸਕਦੇ ਹੋ।",
  "ਨਿਊਜ਼ ਪੇਜ ਵਿੱਚ ਪੜ੍ਹਨ-ਲਾਇਕ ਟਾਈਪੋਗ੍ਰਾਫੀ, ਸੁਚੱਜੇ ਪੈਰਾਗ੍ਰਾਫ ਅਤੇ ਵਧੀਆ ਖਾਲੀ ਜਗ੍ਹਾ ਦੀ ਵਰਤੋਂ ਕੀਤੀ ਗਈ ਹੈ ਤਾਂ ਜੋ ਲੰਬੇ ਲੇਖ ਵੀ ਆਸਾਨੀ ਨਾਲ ਪੜ੍ਹੇ ਜਾ ਸਕਣ।",
  "ਡਿਜ਼ਾਇਨ ਦਾ ਮਕਸਦ ਇਹ ਯਕੀਨੀ ਬਣਾਉਣਾ ਹੈ ਕਿ ਪਾਠਕ ਇੱਕ ਕਲਿੱਕ ਨਾਲ ਮੁੱਖ ਪੇਜ ਤੋਂ ਲੇਖ ਖੋਲ੍ਹ ਸਕੇ, ਲੇਖ ਨੂੰ ਸਕ੍ਰੋਲ ਕਰੇ ਅਤੇ ਆਖਿਰ ਵਿੱਚ ਹੋਰ ਸੰਬੰਧਤ ਪੋਸਟਾਂ ਵੀ ਦੇਖ ਸਕੇ।",
  "ਤੁਸੀਂ ਇਸ ਡਮੀ ਸਮੱਗਰੀ ਨੂੰ ਬਾਅਦ ਵਿੱਚ CMS ਜਾਂ API ਨਾਲ ਅਸਲ ਖਬਰਾਂ ਨਾਲ ਬਦਲ ਸਕਦੇ ਹੋ। ਰੂਟ ਸਟ੍ਰਕਚਰ ਇਸ ਤਰ੍ਹਾਂ ਤਿਆਰ ਹੈ ਕਿ ਹਰ ਪੋਸਟ ਲਈ ਅਲੱਗ URL ਉਪਲਬਧ ਰਹੇ।"
];

export default async function NewsPostPage({ params }: NewsPageProps) {
  const { id } = await params;
  const post = getPostById(id);

  if (!post) {
    notFound();
  }

  const relatedPosts = ALL_POSTS.filter((item) => item.id !== post.id).slice(0, 4);

  return (
    <main className="site-shell" style={{ paddingTop: "1.2rem", paddingBottom: "2.2rem" }}>
      <div style={{ marginBottom: "0.9rem", fontSize: "0.85rem", color: "var(--muted)" }}>
        <Link href="/" style={{ color: "var(--secondary)", fontWeight: 700 }}>ਮੁੱਖ ਪੇਜ</Link> / <span>{post.category}</span>
      </div>

      <article className="card" style={{ borderRadius: "1.2rem", overflow: "hidden" }}>
        <div style={{ maxHeight: "500px", overflow: "hidden" }}>
          <img src={post.image} alt={post.title} style={{ width: "100%", objectFit: "cover" }} referrerPolicy="no-referrer" />
        </div>

        <div style={{ padding: "1.1rem 1.15rem" }}>
          <p className="kicker" style={{ margin: 0 }}>{post.category}</p>
          <h1 style={{ margin: "0.42rem 0 0.5rem", fontFamily: "var(--font-heading)", lineHeight: 1.25, fontSize: "clamp(1.5rem, 3vw, 2.35rem)" }}>
            {post.title}
          </h1>

          <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", fontSize: "0.82rem", color: "var(--muted)", marginBottom: "0.8rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}><UserRound size={15} /> {post.author}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}><CalendarDays size={15} /> {post.date}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}><MessagesSquare size={15} /> {post.comments ?? 0} ਟਿੱਪਣੀਆਂ</span>
          </div>

          <p style={{ marginTop: 0, lineHeight: 1.7, color: "#4f4943" }}>
            {post.excerpt ?? "ਇਹ ਲੇਖ ਡੈਮੋ ਉਦੇਸ਼ਾਂ ਲਈ ਹੈ ਅਤੇ ਲੇਆਉਟ ਦੀ ਵਰਤੋਂ ਦਿਖਾਉਂਦਾ ਹੈ।"}
          </p>

          {DUMMY_BODY.map((paragraph, index) => (
            <p key={index} style={{ lineHeight: 1.85, color: "#352f2a", marginBottom: "0.85rem", fontSize: "1.03rem" }}>
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <section style={{ marginTop: "1.4rem" }}>
        <h2 className="section-title" style={{ marginBottom: "0.75rem" }}>ਹੋਰ ਪੜ੍ਹੋ</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.8rem" }}>
          {relatedPosts.map((item) => (
            <Link key={item.id} href={`/news/${item.id}`} className="card" style={{ borderRadius: "1rem", overflow: "hidden" }}>
              <div style={{ aspectRatio: "4 / 3", overflow: "hidden" }}>
                <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} referrerPolicy="no-referrer" />
              </div>
              <div style={{ padding: "0.75rem" }}>
                <p className="kicker" style={{ margin: 0 }}>{item.category}</p>
                <h3 style={{ margin: "0.3rem 0 0", fontSize: "0.95rem", lineHeight: 1.35 }}>{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}