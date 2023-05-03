import React, { useContext, useEffect, useReducer } from "react";
import styled from "styled-components";
import { poster_url as poster } from "../utils/constants";
import { formatDate, createBgImg } from "../utils/helpers";
import samplePoster from "../assets/sample-poster.png";
import { useParams } from "react-router-dom";
import { useFetchContext } from "../context/fetch_context";
import apiLogo from "../assets/movie_db_logo.svg";
import Loading from "./Loading";
const SingleMoviePage = ({}) => {
  const { id } = useParams();
  const {
    single_movie,
    single_movie_loading,
    single_movie_error,
    fetchSingleMovie,
    fetchExtraMovieInfo,
  } = useFetchContext();

  const poster_path = "/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg";
  useEffect(() => {}, []);

  if (single_movie_loading) {
    return <Loading></Loading>;
  }

  return (
    <Wrapper>
      <div className="movie-poster">
        <h1></h1>
        <div
          className="poster"
          style={{
            backgroundImage: `url(${createBgImg(poster, poster_path)})`,
          }}
        ></div>
      </div>
      <div className="movie-details">
        <h2>Description</h2>
        <p></p>
        <h3>Cast</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          animi doloremque voluptatum vero itaque consequatur fuga incidunt,
          nihil atque excepturi corporis mollitia quibusdam repellendus nisi
          voluptatem vitae temporibus debitis necessitatibus!
        </p>
        <h3>Director</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        <h3>Release date</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      </div>
      <a href="https://www.themoviedb.org/" target="_blank">
        <img src={apiLogo} className="api-logo" />
      </a>
      <div className="director-reco">
        <h2>More from director</h2>
        <div className="reco-poster"></div>
        <div className="reco-poster"></div>
        <div className="reco-poster"></div>
      </div>
    </Wrapper>
  );
};

/*    <div className="single-movie-container">
      </div> */

const Wrapper = styled.div`
  /*
  display: flex;
  justify-content: center;
  align-items: center;*/

  display: grid;
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: auto minmax(0, 1.5fr) minmax(0, 1fr);
  grid-template-rows: auto auto;
  grid-gap: 10px;
  /*
  .single-movie-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 2rem;
  }*/
  .movie-poster {
    width: fit-content;
    padding: 0rem 2rem 0rem 2rem;
    margin-left: auto;
  }

  .poster {
    height: 400px;
    width: 300px;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 20px;
  }

  .reco-poster {
    height: 150px;
    width: 200px;
    background-color: white;
    margin: 1rem;
  }

  .director-reco {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    grid-column: 1/3;
  }
`;

export default SingleMoviePage;
