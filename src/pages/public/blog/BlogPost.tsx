import {type BlogPostProps} from "../../../common/interfaces/pages";

const BlogPost = ({category, title, image, description, date}: BlogPostProps): JSX.Element => {
  return (
    <div>
      <div className="relative z-10 p-2">
        <img className=" object-cover w-full rounded-md h-56" src={image} alt={title} />
      </div>
      <div className="relative z-20 p-4 mx-auto -mt-20 bg-background-50 rounded-md shadow-md">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">{description}</p>
        <div className="mt-3 text-sm w-full flex flex-row justify-between">
          <span>{category}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
