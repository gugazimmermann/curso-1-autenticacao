import {useCallback, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {type IBlogPost, type IBlogApiGenre, type IBlogApiPost} from "../../../common/interfaces/pages";
import {type AlertProps} from "../../../common/interfaces/components";
import {PTBR} from "../../../common/constants";
import {Title} from "../../../components/layout";
import {Alert, Loading} from "../../../components";
import {options, formatBlogData} from "./helpers";
import BlogPost from "./BlogPost";
import Post from "./Post";

const Blog = (): JSX.Element => {
  const {postId, genreId} = useParams();
  const {state} = useLocation();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertProps>();
  const [movies, setMovies] = useState<IBlogPost[]>();
  const [movie, setMovie] = useState<IBlogPost>();
  const [genre, setGenre] = useState<string>("");

  const clearData = (): void => {
    setAlert(undefined);
    setMovies(undefined);
    setMovie(undefined);
    setGenre("");
  };

  const httpError = (status: number): void => {
    setAlert({
      type: "error",
      text: `HTTP error! status: ${status}`,
    });
    setLoading(false);
  };

  const ferchMoviesList = useCallback(async (gId?: string): Promise<void> => {
    const moviesURL = `${String(process.env.REACT_APP_TMDB_ENDPOINT)}movie/now_playing?language=pt-BR&page=1&region=BR`;
    const genresMoviesURL = `${String(process.env.REACT_APP_TMDB_ENDPOINT)}discover/movie?include_adult=true&include_video=true&language=pt-BR&page=1&region=BR&sort_by=popularity.desc&with_genres=${gId}`;
    const genresURL = `${String(process.env.REACT_APP_TMDB_ENDPOINT)}genre/movie/list?language=pt-BR`;
    const listURL = gId !== undefined ? genresMoviesURL : moviesURL;
    const [moviesResult, genresResult] = await Promise.all([fetch(listURL, options), fetch(genresURL, options)]);
    if (!moviesResult.ok || !genresResult.ok) {
      httpError(!moviesResult.ok ? moviesResult.status : genresResult.status);
      return;
    }
    const [moviesData, genresData] = await Promise.all([moviesResult.json(), genresResult.json()]);
    const genresList = genresData.genres as IBlogApiGenre[];
    setMovies(formatBlogData(moviesData.results as IBlogApiPost[], genresList) as IBlogPost[]);
    if (gId !== undefined) {
      const genreName = genresList.find(g => String(g.id) === gId);
      setGenre(String(genreName?.name));
    }
  }, []);

  const fetchMovieDetail = useCallback(async (mId?: string): Promise<void> => {
    const movieURL = `${String(process.env.REACT_APP_TMDB_ENDPOINT)}movie/${mId}?language=pt-BR`;
    const movieResult = await fetch(movieURL, options);
    if (!movieResult.ok) {
      httpError(movieResult.status);
      return;
    }
    const movieData: IBlogApiPost = await movieResult.json();
    setMovie(formatBlogData(movieData) as IBlogPost);
  }, []);

  const fetchData = useCallback(async ({mId, gId}: {mId?: string; gId?: string}): Promise<void> => {
    setLoading(true);
    try {
      if (mId !== undefined) await fetchMovieDetail(mId);
      else await ferchMoviesList(gId);
    } catch (error) {
      setAlert({
        type: "error",
        text: PTBR.PAGES.BLOG.ERROR,
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    clearData();
    if (state?.post !== undefined) setMovie(state.post as IBlogPost);
    else void fetchData({mId: postId, gId: genreId});
  }, [postId, genreId]);

  const renderContent = (): JSX.Element => {
    if (loading) {
      return <Loading />;
    } else if (alert) {
      return <Alert text={alert.text} type={alert.type} />;
    } else if (movie) {
      return <Post post={movie} />;
    } else if (Array.isArray(movies) && movies.length > 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-4">
          {movies.map(m => (
            <BlogPost key={m.id} post={m} />
          ))}
        </div>
      );
    }
    return <Alert text={PTBR.PAGES.BLOG.NORESULT} type="info" />;
  };

  return (
    <section className="w-full">
      {postId === undefined && <Title title={`${PTBR.PAGES.BLOG.TITLE}${genre?.length > 0 ? ` - ${genre}` : ""}`} />}
      {renderContent()}
    </section>
  );
};

export default Blog;
