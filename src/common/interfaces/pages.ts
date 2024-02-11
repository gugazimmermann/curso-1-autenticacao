export interface IBlogPost {
  id: string;
  genres: IBlogApiGenre[];
  title: string;
  image: string;
  description: string;
  date: string;
}

export interface BlogPostProps {
  post: IBlogPost;
}

export interface IBlogApiGenre {
  id: number;
  name: string;
}

export interface IBlogApiPost {
  id: number;
  genre_ids?: number[];
  genres?: IBlogApiGenre[];
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}
