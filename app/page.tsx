import { fetchSanityPosts } from "@/lib/sanity";
import HomePageClient from "./HomePageClient";

// Revalidate quickly so edits in Sanity appear without a redeploy
export const revalidate = 15;

export default async function HomePage() {
  const sanityPosts = await fetchSanityPosts();

  const allPosts = sanityPosts;
  const heroMain = sanityPosts[0] ?? null;
  const heroSide = sanityPosts.slice(1, 4);
  const featuredPosts = sanityPosts.slice(4, 8);
  const topStories = sanityPosts.slice(8, 12);
  const whatsNewMain = sanityPosts[12] ?? sanityPosts[0] ?? null;
  const whatsNewList = sanityPosts.slice(13, 16);

  if (!heroMain || !whatsNewMain) {
    return <HomePageClient allPosts={[]} featuredPosts={[]} heroMain={null} heroSide={[]} topStories={[]} whatsNewMain={null} whatsNewList={[]} />;
  }

  return (
    <HomePageClient
      allPosts={allPosts}
      featuredPosts={featuredPosts}
      heroMain={heroMain}
      heroSide={heroSide}
      topStories={topStories}
      whatsNewMain={whatsNewMain}
      whatsNewList={whatsNewList}
    />
  );
}
