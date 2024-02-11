import {Link} from "react-router-dom";
import {type BlogPostProps} from "../../../common/interfaces/pages";
import {PTBR, ROUTES} from "../../../common/constants";

const BlogPost = ({post}: BlogPostProps): JSX.Element => {
  return (
    <div>
      <Link to={`${ROUTES.BLOG}/${post.id}`} state={{post}}>
        <div className="flex flex-row justify-center p-8">
          <img
            className="object-cover rounded-lg w-56"
            src={`${String(process.env.REACT_APP_TMDB_IMG_URL)}${post.image}`}
            alt={post.title}
          />
        </div>
      </Link>
      <div className="relative z-10 p-4 -mt-20 bg-background-50 rounded shadow">
        <h2 className="font-semibold text-lg">{post.title}</h2>
        <h3 className="text-sm">
          {PTBR.PAGES.BLOG.RELEASE}: {post.date}
        </h3>
        {post.genres.map(genre => (
          <Link key={genre.id} to={`${ROUTES.BLOG}${ROUTES.BLOG_GENRE}/${genre.id}`}>
            <span className="capitalize text-sm mr-2 hover:underline">{genre.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPost;
