import {render, screen, fireEvent} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {type IBlogPost} from "../../../common/interfaces/pages";
import {PTBR} from "../../../common/constants";
import Post from "./Post";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

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
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("BlogPost should have title and all posts", async () => {
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
    render(
      <MemoryRouter>
        <Post post={movie} />
      </MemoryRouter>,
    );
    expect(screen.getByAltText(movie.title)).toBeInTheDocument();
    expect(screen.getByText(`${PTBR.PAGES.BLOG.RELEASE}: ${movie.date}`)).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: movie.title, level: 2})).toBeInTheDocument();
    expect(screen.getByText(movie.description)).toBeInTheDocument();
    fireEvent.click(screen.getByText(PTBR.PAGES.BLOG.BUTTON));
    expect(mockNavigate).toHaveBeenCalled();
  });
});
