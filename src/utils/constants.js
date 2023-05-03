export const base_url = "https://api.themoviedb.org/3/";
export const poster_url = "https://image.tmdb.org/t/p/original/";
export const genres_url =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=";
export const director_movie_url = "https://api.themoviedb.org/3/person/";

// FILTER: TV - PERSON - MOVIE - MULTI

export const search_record =
  "https://api.themoviedb.org/3/search/filter?api_key=" +
  process.env.REACT_APP_MOVIEDB_API_KEY +
  "&query=";

export const trending =
  "https://api.themoviedb.org/3/trending/filter/week?api_key=" +
  process.env.REACT_APP_MOVIEDB_API_KEY;

export const top_rated =
  "https://api.themoviedb.org/3/filter/top_rated?api_key=" +
  process.env.REACT_APP_MOVIEDB_API_KEY;
