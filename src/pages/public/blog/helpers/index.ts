import {type IBlogApiPost, type IBlogApiGenre, type IBlogPost} from "../../../../common/interfaces/pages";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${String(process.env.REACT_APP_TMDB_TOKEN)}`,
  },
};

const handleBlogData = (data: IBlogApiPost, genres?: IBlogApiGenre[]): IBlogPost => {
  const genreNames = genres
    ? genres.reduce<IBlogApiGenre[]>(
        (acc, genre) => ((data?.genre_ids ?? []).includes(genre.id) ? [...acc, genre] : acc),
        [],
      )
    : data.genres ?? [];
  return {
    id: String(data.id),
    genres: genreNames,
    title: data.title,
    image: data.poster_path,
    description: data.overview,
    date: new Date(data.release_date).toLocaleDateString("pt-BR"),
  };
};

export const formatBlogData = (
  data: IBlogApiPost | IBlogApiPost[],
  genres?: IBlogApiGenre[],
): IBlogPost | IBlogPost[] => {
  if (Array.isArray(data)) {
    return data.map(d => handleBlogData(d, genres));
  } else {
    return handleBlogData(data);
  }
};
