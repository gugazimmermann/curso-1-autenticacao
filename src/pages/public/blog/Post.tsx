import {useCallback, useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import DOMPurify from "dompurify";
import {type IBlogApiPostResponse, type IBlogApiPost, type IBlogPost} from "../../../common/interfaces/pages";
import {PTBR, ROUTES} from "../../../common/constants";
import {Button, Loading} from "../../../components";

const handleFormatPost = (post: IBlogApiPost): IBlogPost => {
  return {
    id: String(post.id),
    category: post.category,
    title: post.title,
    image: post.photo_url,
    description: post.description,
    content: post.content_html,
    date: new Date(post.created_at).toLocaleDateString("pt-BR"),
  };
};

const Post = (): JSX.Element => {
  const navigate = useNavigate();
  const {postId} = useParams();
  const {state} = useLocation();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<IBlogPost>();

  const fetchBlogPost = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.slingacademy.com/v1/sample-data/blog-posts/${id}`);
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        navigate(ROUTES.BLOG);
        return;
      }
      const data: IBlogApiPostResponse = await response.json();
      setPost(handleFormatPost(data.blog));
    } catch (error) {
      console.error("Error fetching data: ", error);
      navigate(ROUTES.BLOG);
      return;
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (state?.post !== undefined) setPost(state.post as IBlogPost);
    else if (postId !== undefined) void fetchBlogPost(postId);
    else navigate(ROUTES.BLOG);
  }, []);

  return (
    <section className="w-full">
      {loading ? (
        <Loading />
      ) : (
        post !== undefined && (
          <>
            <div className="relative z-20 w-full mt-4 md:flex md:items-center">
              <div className="absolute w-full bg-secondary-500 -z-10 rounded-2xl md:h-48" />
              <div className="flex flex-col items-center p-6 sm:p-0 bg-secondary-500 rounded-2xl md:bg-transparent sm:flex-row">
                <img className="h-64 w-auto rounded-2xl shadow-md" src={post.image} alt={post.title} />
                <div className="mt-2 leading-relaxed tracking-tight text-text-50 text-center sm:text-left sm:ml-4">
                  <p className="text-sm text-secondary-200">
                    {post.category} - {post.date}
                  </p>
                  <h1 className="mt-2 text-xl">{post.title}</h1>
                  <p className="mt-4 text-lg">{`“${post.description}”`}</p>
                </div>
              </div>
            </div>
            <div
              className="py-4 post"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(String(post.content)),
              }}
            />
            <div className="text-center">
              <Button
                text={PTBR.PAGES.BLOG.BUTTON}
                onClick={() => {
                  navigate(-1);
                }}
              />
            </div>
          </>
        )
      )}
    </section>
  );
};

export default Post;
