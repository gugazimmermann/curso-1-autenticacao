import {useNavigate, Link} from "react-router-dom";
import {type BlogPostProps} from "../../../common/interfaces/pages";
import {PTBR, ROUTES} from "../../../common/constants";
import {Button} from "../../../components";

const Post = ({post}: BlogPostProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative z-20 w-full mt-4 md:flex md:items-center">
        <div className="absolute w-full bg-secondary-500 -z-10 rounded-2xl md:h-48" />
        <div className="flex flex-col items-center p-6 sm:p-0 bg-secondary-500 rounded-2xl md:bg-transparent sm:flex-row sm:ml-12">
          <img
            className="w-64 h-auto rounded-2xl shadow-md"
            src={`${String(process.env.REACT_APP_TMDB_IMG_URL)}${post.image}`}
            alt={post.title}
          />
          <div className="mx-6">
            <div className="mt-2 leading-relaxed tracking-tight text-text-50 text-center sm:text-left sm:ml-4">
              <p className="text-secondary-200">
                {PTBR.PAGES.BLOG.RELEASE}: {post.date}
              </p>
              {post.genres.map(genre => (
                <Link key={genre.id} to={`${ROUTES.BLOG}${ROUTES.BLOG_GENRE}/${genre.id}`}>
                  <span className="capitalize mr-2 hover:underline">{genre.name}</span>
                </Link>
              ))}
              <h2 className="mt-4 text-2xl">{post.title}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 post">{post.description}</div>
      <div className="text-center">
        <Button
          text={PTBR.PAGES.BLOG.BUTTON}
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
    </>
  );
};

export default Post;
