import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {type IBlogPost} from "../../../common/interfaces/pages";
import {PTBR} from "../../../common/constants";
import BlogPost from "./BlogPost";

const movie: IBlogPost = {
  id: "1",
  image: "/poster.png",
  title: "Test Movie",
  description: "Movie Description",
  date: "01/01/2024",
  genres: [
    {
      id: 1,
      name: "genre one",
    },
    {
      id: 2,
      name: "genre two",
    },
  ],
};

describe("BlogPost", () => {
  test("BlogPost should have image, title, date and date", async () => {
    render(
      <MemoryRouter>
        <BlogPost post={movie} />
      </MemoryRouter>,
    );
    expect(screen.getByAltText(movie.title)).toBeInTheDocument();
    expect(screen.getByText(movie.title)).toBeInTheDocument();
    expect(screen.getByText(movie.title)).toBeInTheDocument();
    expect(screen.getByText(`${PTBR.PAGES.BLOG.RELEASE}: ${movie.date}`)).toBeInTheDocument();
    expect(screen.getByText(movie.genres[0].name)).toBeInTheDocument();
    expect(screen.getByText(movie.genres[1].name)).toBeInTheDocument();
  });
});
