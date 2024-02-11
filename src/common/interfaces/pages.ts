export interface IBlogPost {
  id: string;
  category: string;
  title: string;
  image: string;
  description: string;
  content?: string;
  date: string;
}

export interface BlogPostProps {
  post: IBlogPost;
}

export interface IBlogApiPost {
  id: number;
  category: string;
  title: string;
  photo_url: string;
  description: string;
  content_html: string;
  created_at: string;
}

export interface IBlogApiResponse {
  blogs: IBlogApiPost[];
}

export interface IBlogApiPostResponse {
  blog: IBlogApiPost;
}
