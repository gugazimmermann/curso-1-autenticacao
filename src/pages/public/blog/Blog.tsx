import {useCallback, useEffect, useState} from "react";
import {type IBlogApiPost, type IBlogApiResponse, type IBlogPost} from "../../../common/interfaces/pages";
import {PTBR} from "../../../common/constants";
import {Title} from "../../../components/layout";
import {Loading} from "../../../components";
import BlogPost from "./BlogPost";

const handleFormatPost = (blogs: IBlogApiPost[]): IBlogPost[] => {
  return blogs.map(blog => ({
    id: String(blog.id),
    category: blog.category,
    title: blog.title,
    image: blog.photo_url,
    description: blog.description,
    content: blog.content_html,
    date: new Date(blog.created_at).toLocaleDateString("pt-BR"),
  }));
};

const Blog = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [blogPosts, setBlogPosts] = useState<IBlogPost[]>();

  const fetchBlogPosts = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch("https://api.slingacademy.com/v1/sample-data/blog-posts?limit=10");
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        setBlogPosts([]);
        return;
      }
      const data: IBlogApiResponse = await response.json();
      setBlogPosts(handleFormatPost(data.blogs));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchBlogPosts();
  }, []);

  return (
    <section className="w-full">
      <Title title={PTBR.PAGES.BLOG.TITLE} />
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-4 mt-4">
          {blogPosts?.length !== undefined && blogPosts.map(post => BlogPost({post}))}
        </div>
      )}
    </section>
  );
};

export default Blog;
