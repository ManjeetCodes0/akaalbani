"use client";

import AnimatedSection from "@/components/AnimatedSection";
import BannerAd from "@/components/BannerAd";
import CategoryCloud from "@/components/CategoryCloud";
import FeaturedCircles from "@/components/FeaturedCircles";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfiniteNewsFeed from "@/components/InfiniteNewsFeed";
import LiveNewsGrid from "@/components/LiveNewsGrid";
import TopStories from "@/components/TopStories";
import WhatsNew from "@/components/WhatsNew";
import type { NewsPost } from "@/types/news";

type HomePageClientProps = {
  allPosts: NewsPost[];
  featuredPosts: NewsPost[];
  heroMain: NewsPost | null;
  heroSide: NewsPost[];
  topStories: NewsPost[];
  whatsNewMain: NewsPost | null;
  whatsNewList: NewsPost[];
};

export default function HomePageClient({
  allPosts,
  featuredPosts,
  heroMain,
  heroSide,
  topStories,
  whatsNewMain,
  whatsNewList,
}: HomePageClientProps) {
  const hasRealPosts = allPosts.length > 0 && heroMain && whatsNewMain;

  return (
    <>
      <Header posts={allPosts} />

      <main className="hp-main">
        {!hasRealPosts ? (
          <section className="hp-empty">
            <h2>No Articles Available</h2>
            <p>Publish posts in Sanity CMS to see them here.</p>
          </section>
        ) : (
          <>
            <AnimatedSection delay={0.04}>
              <FeaturedCircles posts={featuredPosts} />
            </AnimatedSection>

            <AnimatedSection delay={0.08}>
              <Hero mainPost={heroMain!} sidePosts={heroSide} />
            </AnimatedSection>

            <AnimatedSection delay={0.12}>
              <BannerAd />
            </AnimatedSection>

            <AnimatedSection delay={0.16}>
              <TopStories posts={topStories} />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <WhatsNew mainPost={whatsNewMain!} listPosts={whatsNewList} />
            </AnimatedSection>

            <AnimatedSection delay={0.24}>
              <LiveNewsGrid posts={allPosts} />
            </AnimatedSection>

            <AnimatedSection delay={0.28}>
              <InfiniteNewsFeed posts={allPosts} />
            </AnimatedSection>

            <AnimatedSection delay={0.32}>
              <CategoryCloud posts={allPosts} />
            </AnimatedSection>
          </>
        )}
      </main>

      <Footer recentPosts={allPosts.slice(0, 2)} />

      <style jsx>{`
        .hp-main {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(0.75rem, 2.6vw, 2.8rem);
        }

        .hp-empty {
          padding: 3rem 1.5rem;
          text-align: center;
          color: var(--muted);
        }

        .hp-empty h2 {
          margin: 0 0 0.5rem;
          font-family: var(--font-heading), serif;
          font-size: 1.5rem;
          color: var(--ink);
        }

        .hp-empty p {
          margin: 0;
          font-size: 15px;
        }
      `}</style>
    </>
  );
}
