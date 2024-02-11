import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter, Routes, Route} from "react-router-dom";
import {type IBlogApiGenre, type IBlogApiPost} from "../../../common/interfaces/pages";
import {PTBR, ROUTES} from "../../../common/constants";
import Blog from "./Blog";

const genresList: IBlogApiGenre[] = [
  {id: 1, name: "genre one"},
  {id: 2, name: "genre two"},
];

const movie: IBlogApiPost = {
  id: 1,
  genres: [{id: 2, name: "genre two"}],
  title: "Test Movie",
  overview: "Movie Description",
  release_date: "2024-01-01",
  poster_path: "/poster.png",
};

const moviesList: IBlogApiPost[] = [{...movie, genre_ids: [1, 2]}];

describe("Blog", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockFetchResponse = async (ok: boolean, status: number, data: any): Promise<Response> => {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          ok,
          status,
          json: async () => await Promise.resolve(data),
        } as unknown as Response);
      }, 100);
    });
  };

  const mockError = async (): Promise<Response> => {
    return await mockFetchResponse(false, 401, {});
  };

  const mockMovies = async (): Promise<Response> => {
    return await mockFetchResponse(true, 200, {results: moviesList});
  };

  const mockEmptyMovies = async (): Promise<Response> => {
    return await mockFetchResponse(true, 200, {results: []});
  };

  const mockGenres = async (): Promise<Response> => {
    return await mockFetchResponse(true, 200, {genres: genresList});
  };

  const mockMovie = async (): Promise<Response> => {
    return await mockFetchResponse(true, 200, {...moviesList[0]});
  };

  const setupComponent = (route: string, state?: any): void => {
    render(
      <MemoryRouter initialEntries={[{pathname: route, state}]}>
        <Routes>
          <Route path={`${ROUTES.BLOG}/:postId?`} element={<Blog />} />
          <Route path={`${ROUTES.BLOG}${ROUTES.BLOG_GENRE}/:genreId?`} element={<Blog />} />
        </Routes>
      </MemoryRouter>,
    );
  };

  it("renders loading", async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(async () => await mockError())
      .mockImplementationOnce(async () => await mockError());
    setupComponent(ROUTES.BLOG);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("handles fetch error on movie kist", async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(async () => await mockError())
      .mockImplementationOnce(async () => await mockGenres());
    setupComponent(ROUTES.BLOG);
    await waitFor(() => {
      expect(screen.getByText("HTTP error! status: 401")).toBeInTheDocument();
    });
  });

  it("handles fetch error on genre list", async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(async () => await mockMovies())
      .mockImplementationOnce(async () => await mockError());
    setupComponent(ROUTES.BLOG);
    await waitFor(() => {
      expect(screen.getByText("HTTP error! status: 401")).toBeInTheDocument();
    });
  });

  it("fetches movies and genres and displays", async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(async () => await mockMovies())
      .mockImplementationOnce(async () => await mockGenres());
    setupComponent(ROUTES.BLOG);
    expect(global.fetch).toBeCalledTimes(2);
    await waitFor(() => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });

  it("fetches movies and genres with genre id and displays", async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(async () => await mockMovies())
      .mockImplementationOnce(async () => await mockGenres());
    setupComponent(`${ROUTES.BLOG}${ROUTES.BLOG_GENRE}/2`);
    await waitFor(() => {
      expect(screen.getByText(`${PTBR.PAGES.BLOG.TITLE} - ${genresList[1].name}`)).toBeInTheDocument();
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });

  it("fetches with genre id and have no movie", async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(async () => await mockEmptyMovies())
      .mockImplementationOnce(async () => await mockGenres());
    setupComponent(`${ROUTES.BLOG}${ROUTES.BLOG_GENRE}/1`);
    await waitFor(() => {
      expect(screen.getByText(`${PTBR.PAGES.BLOG.TITLE} - ${genresList[0].name}`)).toBeInTheDocument();
      expect(screen.getByText(PTBR.PAGES.BLOG.NORESULT)).toBeInTheDocument();
    });
  });

  it("handles fetch error on movie detauil", async () => {
    global.fetch = jest.fn().mockImplementationOnce(async () => await mockError());
    setupComponent(`${ROUTES.BLOG}/1`);
    await waitFor(() => {
      expect(screen.getByText("HTTP error! status: 401")).toBeInTheDocument();
    });
  });

  it("fetches movie detail and displays", async () => {
    global.fetch = jest.fn().mockImplementationOnce(async () => await mockMovie());
    setupComponent(`${ROUTES.BLOG}/1`);
    expect(global.fetch).toBeCalledTimes(1);
    await waitFor(() => {
      expect(screen.getByRole("heading", {name: moviesList[0].title, level: 2})).toBeInTheDocument();
    });
  });

  it("handles exception in fetch call", async () => {
    global.fetch = jest.fn().mockImplementationOnce(async () => await Promise.reject(new Error("Network error")));
    setupComponent(ROUTES.BLOG);
    await waitFor(() => {
      expect(screen.getByText(PTBR.PAGES.BLOG.ERROR)).toBeInTheDocument();
    });
  });

  it("sets movie from state when state.post is not undefined", async () => {
    setupComponent(ROUTES.BLOG, {post: movie});
    await waitFor(() => {
      expect(screen.getByRole("heading", {name: movie.title, level: 2})).toBeInTheDocument();
    });
  });
});
