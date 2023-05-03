import {
  GET_RECORDS_BEGIN,
  GET_RECORDS_SUCCESS,
  GET_RECORDS_ERROR,
  GET_GENRES,
  GET_GENRES_ERROR,
  GET_SINGLE_RECORD_BEGIN,
  GET_SINGLE_RECORD_SUCCESS,
  GET_SINGLE_RECORD_ERROR,
  GET_EXTRA_MOVIE_INFO_BEGIN,
  GET_EXTRA_MOVIE_INFO_ERROR,
  GET_EXTRA_MOVIE_INFO_SUCCESS,
  GET_EXTRA_RECORD_INFO_BEGIN,
  GET_EXTRA_RECORD_INFO_ERROR,
  GET_EXTRA_RECORD_INFO_SUCCESS,
  GET_FAVORITES,
} from "../actions";

const fetch_reducer = (state, action) => {
  // FEATURED
  /*
  if (action.type === GET_FEATURED_ERROR) {
    return { ...state, records_loading: false, records_error: true };
  }

  if (action.type === GET_FEATURED_SUCCESS) {
    let records = action.payload.results;
    return {
      ...state,
      records: records,
      records_loading: false,
      records_error: false,
    };
  }*/

  // SOLICITUD API PELICULAS,SERIES O AMBAS - INICIO //

  if (action.type === GET_RECORDS_BEGIN) {
    return { ...state, records_loading: true };
  }
  if (action.type === GET_RECORDS_SUCCESS) {
    let records = action.payload.results;
    return {
      ...state,
      records: records,
      records_loading: false,
      records_error: false,
    };
  }

  if (action.type === GET_RECORDS_ERROR) {
    return { ...state, records_loading: false, records_error: true };
  }

  // SOLICITUD API PELICULAS,SERIES O AMBAS - FIN //

  // GENRES COMPLEMENTARY TO SEARCH

  if (action.type === GET_GENRES) {
    return { ...state, genres: action.payload, genre_error: false };
  }

  if (action.type === GET_GENRES_ERROR) {
    return { ...state, genre_error: true };
  }

  //SINGLE RECORD

  if (action.type === GET_SINGLE_RECORD_BEGIN) {
    return { ...state, single_record_loading: true };
  }

  if (action.type === GET_SINGLE_RECORD_SUCCESS) {
    return {
      ...state,
      single_record_loading: false,
      single_record_error: false,
      single_record: action.payload,
    };
  }

  if (action.type === GET_SINGLE_RECORD_ERROR) {
    return { ...state, single_record_error: true };
  }

  //EXTRA MOVIE INFO

  if (action.type === GET_EXTRA_RECORD_INFO_BEGIN) {
    return { ...state, extra_info_loading: true };
  }

  if (action.type === GET_EXTRA_RECORD_INFO_SUCCESS) {
    return {
      ...state,
      extra_info_loading: false,
      extra_info_error: false,
      extra_info: action.payload,
    };
  }

  if (action.type === GET_EXTRA_RECORD_INFO_ERROR) {
    return { ...state, extra_info_loading: false, extra_info_error: true };
  }

  // FAVORITE

  if (action.type === GET_FAVORITES) {
    return { ...state, records: action.payload };
  }
  /*
  if (action.type == GET_FAVORITE_SERIES) {
    let fav_movies = JSON.parse(localStorage.getItem("favMovies")).filter(
      (movie) => movie.media_type == "tv"
    );
    return { ...state, records: fav_movies };
  }

  if (action.type == GET_FAVORITES) {
    let fav_movies = JSON.parse(localStorage.getItem("favMovies"));
    return { ...state, records: fav_movies };
  }*/

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default fetch_reducer;
