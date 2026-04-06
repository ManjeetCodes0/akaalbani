export interface NewsPost {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  excerpt?: string;
  comments?: number;
}

export interface SocialMetric {
  platform: string;
  stat: string;
  color: string;
}
