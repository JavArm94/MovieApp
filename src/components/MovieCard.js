import React from "react";
import styled from "styled-components";
import { poster_url as poster } from "../utils/constants";
import { createBgImg } from "../utils/helpers";
import { useFetchContext } from "../context/fetch_context";
import { Link } from "react-router-dom";

const MovieCard = ({
  id,
  title,
  overview,
  vote_average,
  poster_path,
  name,
  media_type,
}) => {
  const { filterMedia } = useFetchContext();
  let media_type_search = media_type ? media_type : filterMedia;
  let description = overview || "";
  return (
    <Wrapper
      style={{
        backgroundImage: `url(${createBgImg(poster, poster_path)}) `,
      }}
    >
      <Link to={`/${media_type_search}/${id}`} className="layer">
        <div className="movie-info">
          <button className="score">
            {vote_average ? vote_average.toFixed(2) : 0.0}
          </button>
          <h1> {title || name}</h1>
          <p>
            {description && description.length > 100
              ? description.slice(0, 100) + "..."
              : description}
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
`;

export default MovieCard;
