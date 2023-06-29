import React from "react";
import styled from "styled-components";
import { poster_url as poster } from "../utils/constants";
import { createBgImg } from "../utils/helpers";
import { useFetchContext } from "../context/fetch_context";
import { Link } from "react-router-dom";
import FavButton from "./FavButton";

const MovieCard = ({
  id,
  title,
  overview,
  description,
  favDescription,
  vote_average,
  poster_path,
  name,
  media_type,
}) => {
  const { filterMedia } = useFetchContext();
  const media_type_fav = media_type ? media_type : filterMedia;
  const movDescription = overview || description || favDescription;
  const props = {
    id,
    title,
    vote_average,
    poster_path,
    name,
    media_type: media_type_fav,
    description: movDescription,
  };

  return (
    <Wrapper
      style={{
        backgroundImage: `url(${createBgImg(poster, poster_path)}) `,
      }}
    >
      <FavButton {...props}></FavButton>
      <Link to={`/${media_type_fav}/${id}`}>
        <div className="movie-info layer">
          <button className="score">
            {vote_average ? vote_average.toFixed(2) : 0.0}
          </button>
          <h1> {title || name}</h1>
          <p>
            {movDescription && movDescription.length > 100
              ? movDescription.slice(0, 100) + "..."
              : movDescription}
          </p>
        </div>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  //  border: red 1px solid;
  font-size: 0.8rem;
  border-radius: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  position: relative;
  .layer {
    height: 100%;
    user-select: none;
    background: linear-gradient(
      180deg,
      rgba(217, 217, 217, 0.3953) 0%,
      rgba(0, 0, 0, 0.67) 63.54%
    );
  }
  .star {
    height: 23px;
    width: 23px;
  }
  .movie-info {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    color: #ffffff;
    font-weight: 700;
    word-wrap: break-word;
    text-align: left;
  }
  h1,
  p {
    padding: 10px;
    margin: 0;
  }
  h1 {
    padding: 0px 10px;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    color: #ffffff;
    white-space: nowrap;
    height: 50px;
    width: 50px;
    border-radius: 50px;
    border: none;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }
  .score {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .fav {
    position: absolute;
    right: 10px;
    top: 65px;
  }

  @media screen and (max-width: 1050px) {
    h1 {
      font-size: 1.4rem;
    }
  }

  @media screen and (max-width: 800px) {
    height: 400px;
    h1 {
      font-size: 1.6rem;
    }
    .movie-info p {
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 620px) {
    height: 300px;
    h1 {
      font-size: 1.2rem;
    }
    .movie-info p {
      font-size: 0.8rem;
    }
  }

  @media screen and (max-width: 510px) {
    height: 500px;
    h1 {
      font-size: 2rem;
    }
    .movie-info p {
      font-size: 1.4rem;
      font-weight: lighter;
    }
  }
`;

export default MovieCard;
