export type BlogT = {
  id: string,
  title: string,
  description: string,
  category: string,
  views: number,
  likes: string[],
  dislikes: string[]
  image: string,
  author: string
};

export type BlogModelT = Omit<BlogT, 'id' | "likes" | "dislikes" | 'image' | 'views'>;
