// src/types/index.ts

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
}

export interface Manga {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    }
  };
  score: number | null;
}

export interface LibraryItem extends Manga {
  id?: number;
  userId: string;
}