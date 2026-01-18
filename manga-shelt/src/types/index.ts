// src/types/index.ts

export interface Author {
  name: string;
}

export interface Manga {
  mal_id: number;
  title: string;
  type: string;       
  status: string;     
  published: {
    from: string;     
  };
  authors: Author[];  
  synopsis: string;   
  images: {
    jpg: {
      image_url: string;
    }
  };
  score: number | null;
}


export interface User { id: string; email: string; name: string; password?: string; }
export interface LibraryItem extends Manga { id?: number; userId: string; }