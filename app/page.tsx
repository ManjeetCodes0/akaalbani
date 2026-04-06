"use client";

import AnimatedSection from "@/components/AnimatedSection";
import BannerAd from "@/components/BannerAd";
import FeaturedCircles from "@/components/FeaturedCircles";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TopStories from "@/components/TopStories";
import WhatsNew from "@/components/WhatsNew";
import { FEATURED_POSTS, HERO_MAIN, HERO_SIDE, TOP_STORIES, WHATS_NEW_LIST, WHATS_NEW_MAIN } from "@/data/news";

export default function HomePage() {
  return (
    <>
      <div className="page-bg-shape shape-a" />
      <div className="page-bg-shape shape-b" />
      <div className="page-bg-shape shape-c" />

      <Header />

      <main className="site-shell">
        <AnimatedSection delay={0.04}>
          <FeaturedCircles posts={FEATURED_POSTS} />
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <Hero mainPost={HERO_MAIN} sidePosts={HERO_SIDE} />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <BannerAd />
        </AnimatedSection>

        <AnimatedSection delay={0.16}>
          <TopStories posts={TOP_STORIES} />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <WhatsNew mainPost={WHATS_NEW_MAIN} listPosts={WHATS_NEW_LIST} />
        </AnimatedSection>
      </main>

      <Footer />
    </>
  );
}
