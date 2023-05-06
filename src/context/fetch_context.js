import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import reducer from "../reducers/fetch_reducer";
import { search_record as search_record_url } from "../utils/constants";
import { trending as tredingUrl } from "../utils/constants";
import { top_rated as topRatedUrl } from "../utils/constants";
import { base_url as base_url_api } from "../utils/constants";
import { director_movie_url as single_person } from "../utils/constants";
import {
  GET_RECORDS_BEGIN,
  GET_RECORDS_SUCCESS,
  GET_RECORDS_ERROR,
  GET_SINGLE_RECORD_BEGIN,
  GET_SINGLE_RECORD_SUCCESS,
  GET_SINGLE_RECORD_ERROR,
  GET_FAVORITES,
} from "../actions";
import { formatInput } from "../utils/helpers";
const initialState = {
  records_loading: false,
  records_error: false,
  records: [],
  single_record_loading: true,
  single_record_error: false,
  single_record: {},
  extra_info: {},
  extra_info_error: false,
  extra_info_loading: false,
  genres: [],
  genre_error: false,
  lastPage: 0,
};

const FetchContext = React.createContext();

export const FetchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSearching, setIsSearching] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [filterMedia, setFilterMedia] = useState("all");
  const [filterUser, setFilterUser] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [filterCriteria, setFilterCriteria] = useState("trending");

  if (!localStorage.getItem("favMovies")) {
    const favMovies = [];
    localStorage.setItem("favMovies", JSON.stringify(favMovies));
  }

  const fetchRecords = async (input, page = 1) => {
    const formattedInput = formatInput(input);
    let fetchUrl = "";

    dispatch({ type: GET_RECORDS_BEGIN });

    if (formattedInput) {
      setIsSearching(true);
      setUserInput(formattedInput);
      fetchUrl =
        search_record_url.replace(
          "filter",
          filterMedia === "all" ? "multi" : filterMedia
        ) +
        formattedInput +
        "&page=" +
        page;
    } else {
      setIsSearching(false);
      setUserInput("");
      if (filterCriteria !== "trending") {
        fetchUrl = topRatedUrl.replace("filter", filterMedia) + "&page=" + page;
      } else {
        fetchUrl =
          tredingUrl.replace(
            "filter",
            filterMedia === "multi" ? "all" : filterMedia
          ) +
          "&page=" +
          page;
      }
    }

    try {
      const response = await axios.get(fetchUrl);
      const records = response.data;

      dispatch({ type: GET_RECORDS_SUCCESS, payload: records });
    } catch (error) {
      dispatch({ type: GET_RECORDS_ERROR });
    }
  };

  const localUserFavRecords = (input) => {
    const formattedInput = formatInput(input);
    let records = JSON.parse(localStorage.getItem("favMovies"));
    if (formattedInput) {
      setUserInput(formattedInput);
      setIsSearching(true);
      records = records.filter((record) =>
        record.name
          ? record.name.toLowerCase().indexOf(formattedInput) !== -1
          : record.title.toLowerCase().indexOf(formattedInput) !== -1
      );
    } else {
      setUserInput("");
      setIsSearching(false);
    }

    if (filterMedia !== "all" && filterMedia !== "multi") {
      records = records.filter((record) => record.media_type === filterMedia);
    }

    dispatch({ type: GET_FAVORITES, payload: records });
  };

  const fetchSingleRecord = async (media_type, id) => {
    const fetchSingleRecordUrl = `${base_url_api}${media_type}/${id}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`;
    const creditsRecordUrl = `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`;
    const productionId = Number(id);

    dispatch({ type: GET_SINGLE_RECORD_BEGIN });

    try {
      const response = await axios.get(fetchSingleRecordUrl);
      const singleRecord = response.data;
      const responseCredits = await axios.get(creditsRecordUrl);
      const creditsData = responseCredits.data;
      const cast = creditsData.cast;
      const directorInfo = creditsData.crew.filter((person) => {
        return (
          person.known_for_department === "Directing" ||
          person.department === "Directing" ||
          person.job === "Director"
        );
      });

      if (directorInfo.length > 0) {
        const urlRecordsDirector = `${single_person}${directorInfo[0].id}/combined_credits?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`;
        const responseDirector = await axios.get(urlRecordsDirector);
        const directorRecords = responseDirector.data.crew
          .filter((record) => {
            return (
              record.id !== productionId &&
              (record.known_for_department === "Directing" ||
                record.job === "Director")
            );
          })
          .sort((a, b) => {
            return b.popularity - a.popularity;
          })
          .slice(0, 10)
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);
        dispatch({
          type: GET_SINGLE_RECORD_SUCCESS,
          payload: { singleRecord, directorInfo, directorRecords, cast },
        });
      } else {
        // RECORDS FROM DIRECTOR FETCH
        dispatch({
          type: GET_SINGLE_RECORD_SUCCESS,
          payload: { singleRecord, cast },
        });
      }
    } catch (error) {
      dispatch({ type: GET_SINGLE_RECORD_ERROR });
    }
  };

  useEffect(() => {
    if (filterCriteria === "trending") {
      if (filterUser) {
        if (isSearching) {
          localUserFavRecords(userInput);
        } else {
          localUserFavRecords("");
        }
      } else {
        if (isSearching) {
          fetchRecords(userInput, pageIndex);
        } else {
          fetchRecords("", pageIndex);
        }
      }
    } else {
      if (filterUser) {
        if (isSearching) {
          localUserFavRecords(userInput);
        } else {
          localUserFavRecords("");
        }
      } else {
        if (isSearching) {
          fetchRecords(userInput, pageIndex);
        } else {
          fetchRecords("", pageIndex);
        }
      }
    }
  }, [filterCriteria, filterMedia, filterUser, isSearching, pageIndex]);

  return (
    <FetchContext.Provider
      value={{
        ...state,
        fetchRecords,
        fetchSingleRecord,
        localUserFavRecords,
        setIsSearching,
        setFilterMedia,
        setFilterUser,
        setFilterCriteria,
        setPageIndex,
        isSearching,
        filterMedia,
        filterUser,
        filterCriteria,
        userInput,
        pageIndex,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

export const useFetchContext = () => {
  return useContext(FetchContext);
};
