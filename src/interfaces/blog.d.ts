import { Optional } from 'sequelize';

export interface IBlog {
  id: string;
  title: string;
  description: string;
  category: string;
  views: number;
  likes: string[];
  dislikes: string[];
  image: string | null;
  author: string;
}

export interface IBlogCreationAttributes
  extends Optional<IBlog, 'id' | 'likes' | 'dislikes' | 'image' | 'views'> {}
