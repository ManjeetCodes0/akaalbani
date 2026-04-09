import { createClient } from "@sanity/client";

type SeedCategory = {
  slug: string;
  title: string;
  description: string;
};

const categories: SeedCategory[] = [
  { slug: "videsh", title: "ਵਿਦੇਸ਼", description: "ਵਿਦੇਸ਼ ਨਾਲ ਸੰਬੰਧਿਤ ਮੁੱਖ ਖਬਰਾਂ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਣ।" },
  { slug: "virasat", title: "ਵਿਰਾਸਤ", description: "ਪੰਜਾਬੀ ਇਤਿਹਾਸ, ਸਭਿਆਚਾਰ ਅਤੇ ਵਿਰਾਸਤੀ ਸੰਦਰਭ।" },
  { slug: "education", title: "ਸਿੱਖਿਆ ਤੇ ਕੈਰੀਅਰ", description: "ਸਿੱਖਿਆ, ਨੌਕਰੀਆਂ ਅਤੇ ਕੈਰੀਅਰ ਅਪਡੇਟਸ।" },
  { slug: "business", title: "ਕਾਰੋਬਾਰ", description: "ਕਾਰੋਬਾਰ, ਮਾਰਕੀਟ ਅਤੇ ਆਰਥਿਕ ਖਬਰਾਂ।" },
  { slug: "science", title: "ਸਾਇੰਸ ਪੰਜਾਬ", description: "ਵਿਗਿਆਨ, ਰਿਸਰਚ ਅਤੇ ਪੰਜਾਬ ਨਾਲ ਜੁੜੀਆਂ ਨਵੀਆਂ ਖੋਜਾਂ।" },
  { slug: "punjab", title: "ਪੰਜਾਬ", description: "ਪੰਜਾਬ ਰਾਜ ਦੀਆਂ ਤਾਜ਼ਾ ਅਤੇ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਖਬਰਾਂ।" },
  { slug: "India", title: "ਦੇਸ਼", description: "ਦੇਸ਼-ਪੱਧਰੀ ਰਾਜਨੀਤਕ ਅਤੇ ਸਮਾਜਿਕ ਅਪਡੇਟਸ।" },
  { slug: "farming", title: "ਖੇਤੀ", description: "ਕਿਸਾਨੀ, ਫਸਲਾਂ ਅਤੇ ਖੇਤੀਬਾੜੀ ਨੀਤੀਆਂ ਨਾਲ ਸੰਬੰਧਿਤ ਖਬਰਾਂ।" },
  { slug: "sports", title: "ਖੇਡਾਂ", description: "ਦੇਸੀ ਅਤੇ ਅੰਤਰਰਾਸ਼ਟਰੀ ਖੇਡ ਖਬਰਾਂ।" },
  { slug: "entertainment", title: "ਮਨੋਰੰਜਨ", description: "ਫਿਲਮ, ਸੰਗੀਤ ਅਤੇ ਮਨੋਰੰਜਨ ਉਦਯੋਗ ਅਪਡੇਟਸ।" },
  { slug: "tech-ai", title: "ਟੈਕਨੋਲੋਜੀ ਅਤੇ ਏਆਈ", description: "ਟੈਕਨੋਲੋਜੀ, ਡਿਜ਼ਿਟਲ ਨਵੀਨਤਾ ਅਤੇ ਏਆਈ ਅਪਡੇਟਸ।" }
];

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error("Missing env vars: NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN are required.");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-04-06",
  token,
  useCdn: false
});

async function seed() {
  for (const item of categories) {
    await client.createIfNotExists({
      _id: `category.${item.slug}`,
      _type: "category",
      title: item.title,
      slug: { current: item.slug },
      description: item.description
    });
  }

  console.log(`Seeded ${categories.length} categories successfully.`);
}

seed().catch((error) => {
  console.error("Category seed failed:", error);
  process.exit(1);
});
