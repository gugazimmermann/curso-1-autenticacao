import {Link} from "react-router-dom";
import {ROUTES} from "../../../common/constants";
import {type BlogPostProps} from "../../../common/interfaces/pages";

const BlogPost = ({post}: BlogPostProps): JSX.Element => {
  return (
    <Link key={post.id} to={`${ROUTES.BLOG}/${post.id}`} state={{post}}>
      <div className="p-8">
        <img className="object-cover rounded-lg h-56" src={post.image} alt={post.title} />
      </div>
      <div className="relative z-10 p-4 -mt-20 bg-background-50 rounded shadow">
        <h2 className="font-semibold text-lg">{post.title}</h2>
        <p className="mt-3">{post.description}</p>
        <div className="flex flex-row justify-between text-sm mt-3">
          <span className="uppercase">{post.category}</span>
          <span>{post.date}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogPost;
