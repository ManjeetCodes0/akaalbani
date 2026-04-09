import Link from "next/link";
import type { Metadata } from "next";
import { fetchSanityPosts } from "@/lib/sanity";
import { CATEGORIES, categoryLabelFromSlug } from "@/data/news";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const revalidate = 15;

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

function isKnownCategory(slug: string): boolean {
  return CATEGORIES.some((c) => c.slug === slug);
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const name = categoryLabelFromSlug(category);
  return {
    title: `${name} | ਆਕਾਲ ਬਾਣੀ`,
    description: `${name} ਨਾਲ ਜੁੜੀਆਂ ਤਾਜ਼ਾ ਖਬਰਾਂ`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const name = categoryLabelFromSlug(category);
  const known = isKnownCategory(category);

  const allPosts = await fetchSanityPosts();
  const posts = allPosts.filter((p) => p.categorySlugs.includes(category));

  return (
    <>
      <Header posts={allPosts} />

      <main
        style={{
          width: "100%",
          paddingLeft: "clamp(0.9rem, 2.6vw, 2.8rem)",
          paddingRight: "clamp(0.9rem, 2.6vw, 2.8rem)",
          paddingTop: "1.4rem",
          paddingBottom: "2.4rem",
          flex: 1,
        }}
      >
        <nav style={{ fontSize: "0.86rem", color: "#71695f", marginBottom: "0.85rem" }}>
          <Link href="/" style={{ color: "#036666", fontWeight: 700 }}>ਮੁੱਖ ਪੇਜ</Link>
          {" › "}
          <span>{name}</span>
        </nav>

        <header style={{ marginBottom: "1.4rem" }}>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.7rem, 4vw, 2.6rem)",
              color: "#201d1a",
            }}
          >
            {name}
          </h1>
          <p style={{ margin: "0.3rem 0 0", color: "var(--muted)", fontSize: "0.92rem" }}>
            {posts.length} ਲੇਖ
          </p>
        </header>

        {posts.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>
            {known ? "ਇਸ ਸ਼੍ਰੇਣੀ ਵਿੱਚ ਕੋਈ ਲੇਖ ਮੌਜੂਦ ਨਹੀਂ ਹੈ।" : "ਅਣਜਾਣ ਸ਼੍ਰੇਣੀ।"}
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/news/${post.categorySlug}/${post.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <article
                  style={{
                    background: "#fffdf8",
                    border: "1px solid #eadfcf",
                    borderRadius: "0.85rem",
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ aspectRatio: "16 / 10", overflow: "hidden", background: "#eee" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "0.85rem 0.95rem 1rem" }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.66rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                        color: "#866e5b",
                        fontWeight: 800,
                      }}
                    >
                      {post.category}
                    </p>
                    <h2
                      style={{
                        margin: "0.4rem 0 0.5rem",
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.08rem",
                        lineHeight: 1.36,
                        color: "#201d1a",
                      }}
                    >
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p
                        style={{
                          margin: 0,
                          color: "#544a40",
                          fontSize: "0.9rem",
                          lineHeight: 1.55,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.excerpt}
                      </p>
                    )}
                    <p style={{ margin: "0.55rem 0 0", color: "#7a6f62", fontSize: "0.74rem" }}>
                      {post.author} • {post.date}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer recentPosts={allPosts.slice(0, 2)} />
    </>
  );
}
