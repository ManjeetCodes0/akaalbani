import { NewsPost, SocialMetric } from "@/types/news";

export const TRENDING_HEADLINE = "ਚੰਡੀਗੜ੍ਹ ਤੋਂ ਅੰਮ੍ਰਿਤਸਰ ਤੱਕ ਮੌਸਮੀ ਤਬਦੀਲੀ ਨਾਲ ਕਿਸਾਨੀ ਰਣਨੀਤੀ ਵਿੱਚ ਨਵੇਂ ਪ੍ਰਯੋਗ";

export const NAV_ITEMS = ["ਮੁੱਖ ਖਬਰਾਂ", "ਪੰਜਾਬ", "ਦੇਸ਼", "ਵਿਦੇਸ਼", "ਖੇਡਾਂ", "ਮਨੋਰੰਜਨ", "ਸੰਪਰਕ"];

export const FEATURED_POSTS: NewsPost[] = [
  {
    id: "fp-1",
    title: "ਲੁਧਿਆਣਾ ਵਿੱਚ ਟੈਕ ਸਟਾਰਟਅਪ ਹੱਬ ਦਾ ਸ਼ੁਭਾਰੰਭ",
    category: "ਟੈਕਨਾਲੋਜੀ",
    author: "ਸੰਪਾਦਕ ਮੰਡਲ",
    date: "06 ਅਪ੍ਰੈਲ 2026",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: "fp-2",
    title: "ਦਰਿਆ ਕੰਢੇ ਨਵੇਂ ਇਕੋ-ਟੂਰਿਜ਼ਮ ਰੂਟ ਲੋਕਾਂ ਲਈ ਖੁੱਲ੍ਹੇ",
    category: "ਯਾਤਰਾ",
    author: "ਖਾਸ ਰਿਪੋਰਟ",
    date: "05 ਅਪ੍ਰੈਲ 2026",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: "fp-3",
    title: "ਪੰਜਾਬੀ ਸਿਨੇਮਾ ਵਿੱਚ ਲੋਕ-ਕਹਾਣੀਆਂ ਦੀ ਵਾਪਸੀ",
    category: "ਮਨੋਰੰਜਨ",
    author: "ਸੰਸਕ੍ਰਿਤਿਕ ਡੈਸਕ",
    date: "05 ਅਪ੍ਰੈਲ 2026",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: "fp-4",
    title: "ਮਹਿਲਾ ਹਾਕੀ ਕੈਂਪ ਲਈ 40 ਨਵੀਆਂ ਖਿਡਾਰਨੀਆਂ ਦੀ ਚੋਣ",
    category: "ਖੇਡਾਂ",
    author: "ਖੇਡ ਡੈਸਕ",
    date: "04 ਅਪ੍ਰੈਲ 2026",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80&auto=format&fit=crop"
  }
];

export const HERO_MAIN: NewsPost = {
  id: "hero-main",
  title: "ਪੰਜਾਬ ਸਰਕਾਰ ਨੇ ਪਿੰਡ ਪੱਧਰ ਤੇ ਡਿਜਿਟਲ ਸਿਹਤ ਕੇਂਦਰ ਯੋਜਨਾ ਸ਼ੁਰੂ ਕੀਤੀ",
  category: "ਪੰਜਾਬ",
  author: "ਹਰਪ੍ਰੀਤ ਕੌਰ",
  date: "06 ਅਪ੍ਰੈਲ 2026",
  comments: 18,
  image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=80&auto=format&fit=crop",
  excerpt: "ਨਵੀਂ ਯੋਜਨਾ ਅਧੀਨ 1200 ਪਿੰਡਾਂ ਵਿੱਚ ਟੈਲੀ-ਮੈਡਿਸਨ, ਡਿਜਿਟਲ ਰਿਕਾਰਡ ਅਤੇ ਮੋਬਾਈਲ ਡਾਇਗਨੋਸਟਿਕ ਸੇਵਾਵਾਂ ਦਿੱਤੀਆਂ ਜਾਣਗੀਆਂ।"
};

export const HERO_SIDE: NewsPost[] = [
  {
    id: "hero-side-1",
    title: "ਰੋਪੜ ਦੇ ਸਕੂਲਾਂ ਵਿੱਚ AI ਲੈਬ ਸੈੱਟਅਪ",
    category: "ਸਿੱਖਿਆ",
    author: "ਰਿਪੋਰਟਰ ਟੀਮ",
    date: "06 ਅਪ੍ਰੈਲ 2026",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&q=80&auto=format&fit=crop"
  },
  {
    id: "hero-side-2",
    title: "ਮਲੇਰਕੋਟਲਾ ਵਿੱਚ ਇਤਿਹਾਸਕ ਬਾਜ਼ਾਰ ਦਾ ਸੰਭਾਲ ਪ੍ਰੋਜੈਕਟ",
    category: "ਵਿਰਾਸਤ",
    author: "ਖਾਸ ਰਿਪੋਰਟ",
    date: "05 ਅਪ੍ਰੈਲ 2026",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=700&q=80&auto=format&fit=crop"
  },
  {
    id: "hero-side-3",
    title: "ਬਠਿੰਡਾ ਸੌਲਰ ਪਾਰਕ ਤੋਂ 24x7 ਸਾਫ਼ ਬਿਜਲੀ ਸਪਲਾਈ",
    category: "ਊਰਜਾ",
    author: "ਇੰਡਸਟਰੀ ਡੈਸਕ",
    date: "05 ਅਪ੍ਰੈਲ 2026",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&q=80&auto=format&fit=crop"
  }
];

export const TOP_STORIES: NewsPost[] = [
  {
    id: "top-1",
    title: "ਕਿਸਾਨ ਉਤਪਾਦਕ ਕੰਪਨੀਆਂ ਲਈ ਨਵਾਂ ਵਿੱਤੀ ਪੈਕੇਜ",
    category: "ਅਰਥਵਿਵਸਥਾ",
    author: "ਬਿਜ਼ਨਸ ਡੈਸਕ",
    date: "04 ਅਪ੍ਰੈਲ 2026",
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=800&q=80&auto=format&fit=crop"
  },
  {
    id: "top-2",
    title: "ਮੋਹਾਲੀ ਸਟਾਰਟਅਪ ਸਮਿੱਟ ਵਿੱਚ 300 ਤੋਂ ਵੱਧ ਫਾਊਂਡਰ ਸ਼ਾਮਲ",
    category: "ਸਟਾਰਟਅਪ",
    author: "ਟੈਕ ਟੀਮ",
    date: "03 ਅਪ੍ਰੈਲ 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop"
  },
  {
    id: "top-3",
    title: "ਰਾਤੀ ਬਸ ਸੇਵਾ ਨਾਲ ਅੰਤਰ-ਜ਼ਿਲ੍ਹਾ ਯਾਤਰਾ ਹੋਈ ਆਸਾਨ",
    category: "ਪਬਲਿਕ ਟ੍ਰਾਂਸਪੋਰਟ",
    author: "ਸ਼ਹਿਰੀ ਡੈਸਕ",
    date: "03 ਅਪ੍ਰੈਲ 2026",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80&auto=format&fit=crop"
  },
  {
    id: "top-4",
    title: "ਜਲੰਧਰ ਦੀ ਜੂਨੀਅਰ ਕ੍ਰਿਕਟ ਟੀਮ ਨੇ ਰਾਸ਼ਟਰੀ ਖਿਤਾਬ ਜਿੱਤਿਆ",
    category: "ਖੇਡਾਂ",
    author: "ਖੇਡ ਡੈਸਕ",
    date: "02 ਅਪ੍ਰੈਲ 2026",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80&auto=format&fit=crop"
  }
];

export const WHATS_NEW_MAIN: NewsPost = {
  id: "new-main",
  title: "ਪਟਿਆਲਾ ਵਿੱਚ ਨਵਾਂ ਵਿਰਾਸਤੀ ਕਲਾ ਮੇਲਾ: ਨੌਜਵਾਨ ਕਲਾਕਾਰਾਂ ਨੂੰ ਵੱਡਾ ਮੰਚ",
  category: "ਸੰਸਕ੍ਰਿਤੀ",
  author: "ਮਨਦੀਪ ਸਿੰਘ",
  date: "06 ਅਪ੍ਰੈਲ 2026",
  image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000&q=80&auto=format&fit=crop",
  excerpt: "ਤਿੰਨ ਦਿਨੀ ਮੇਲੇ ਦੌਰਾਨ ਲੋਕ-ਸੰਗੀਤ, ਹਸਤਕਲਾ ਅਤੇ ਨਵੀਨਤਾ ਨੂੰ ਇਕੱਠੇ ਪੇਸ਼ ਕੀਤਾ ਜਾਵੇਗਾ, ਜਿਸ ਨਾਲ ਸਥਾਨਕ ਕਲਾਕਾਰਾਂ ਨੂੰ ਆਰਥਿਕ ਮਦਦ ਵੀ ਮਿਲੇਗੀ।"
};

export const WHATS_NEW_LIST: NewsPost[] = [
  {
    id: "new-list-1",
    title: "ਧਾਰਮਿਕ ਸੈਰ-ਸਪਾਟੇ ਲਈ ਇਕੋ-ਫ੍ਰੈਂਡਲੀ ਕੋਰੀਡੋਰ",
    category: "ਯਾਤਰਾ",
    author: "ਡੈਸਕ",
    date: "05 ਅਪ੍ਰੈਲ 2026",
    image: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=300&q=80&auto=format&fit=crop"
  },
  {
    id: "new-list-2",
    title: "ਰੋਜ਼ਗਾਰ ਮੇਲੇ ਵਿੱਚ 120 ਕੰਪਨੀਆਂ ਨੇ ਦਿੱਤੇ ਆਫਰ",
    category: "ਰੋਜ਼ਗਾਰ",
    author: "ਡੈਸਕ",
    date: "05 ਅਪ੍ਰੈਲ 2026",
    image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=300&q=80&auto=format&fit=crop"
  },
  {
    id: "new-list-3",
    title: "ਲੁਧਿਆਣਾ ਵਿੱਚ ਸਾਈਕਲਿੰਗ ਟਰੈਕ ਦਾ ਪਹਿਲਾ ਚਰਨ ਪੂਰਾ",
    category: "ਸ਼ਹਿਰੀ ਜੀਵਨ",
    author: "ਡੈਸਕ",
    date: "04 ਅਪ੍ਰੈਲ 2026",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&q=80&auto=format&fit=crop"
  }
];

export const RECENT_POSTS: NewsPost[] = [
  {
    id: "recent-1",
    title: "ਨਦੀ ਸੰਰਕਸ਼ਣ ਲਈ ਵਿਦਿਆਰਥੀਆਂ ਦੀ ਵੱਡੀ ਮੁਹਿੰਮ",
    category: "ਪ੍ਰਕਿਰਤੀ",
    author: "ਡੈਸਕ",
    date: "04 ਅਪ੍ਰੈਲ 2026",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=220&q=80&auto=format&fit=crop"
  },
  {
    id: "recent-2",
    title: "ਸਿਹਤ ਕੈਂਪ ਵਿੱਚ 10 ਹਜ਼ਾਰ ਲੋਕਾਂ ਦੀ ਜਾਂਚ",
    category: "ਸਿਹਤ",
    author: "ਡੈਸਕ",
    date: "03 ਅਪ੍ਰੈਲ 2026",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=220&q=80&auto=format&fit=crop"
  }
];

export const SOCIAL_METRICS: SocialMetric[] = [
  { platform: "Facebook", stat: "1.2M ਫਾਲੋਅਰ", color: "#1877F2" },
  { platform: "X", stat: "880K ਅਪਡੇਟ", color: "#111111" },
  { platform: "Instagram", stat: "640K ਦਰਸ਼ਕ", color: "#E4405F" },
  { platform: "YouTube", stat: "410K ਸਬਸਕ੍ਰਾਈਬਰ", color: "#FF0000" },
  { platform: "WhatsApp", stat: "Daily ਬੁਲੇਟਿਨ", color: "#25D366" },
  { platform: "RSS", stat: "ਫੀਡ ਐਕਟਿਵ", color: "#F26522" }
];

export const ALL_POSTS: NewsPost[] = [
  ...FEATURED_POSTS,
  HERO_MAIN,
  ...HERO_SIDE,
  ...TOP_STORIES,
  WHATS_NEW_MAIN,
  ...WHATS_NEW_LIST,
  ...RECENT_POSTS
];

export function getPostById(id: string): NewsPost | undefined {
  return ALL_POSTS.find((post) => post.id === id);
}
