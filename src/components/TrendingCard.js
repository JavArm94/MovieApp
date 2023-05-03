import React from "react";
import styled from "styled-components";
import { poster_url as poster } from "../utils/constants";
import FavButton from "./FavButton";
import emptyStarIcon from "../assets/star-empty.png";
import emptyHeartIcon from "../assets/heart-empty.png";
import { createBgImg } from "../utils/helpers";
import { Link } from "react-router-dom";
import { useFetchContext } from "../context/fetch_context";

const FeatureCard = ({
  overview: description,
  vote_average,
  poster_path,
  media_type,
  title,
  name,
  id,
}) => {
  const props = {
    id,
    title,
    overview: description,
    vote_average,
    poster_path,
    name,
    media_type,
  };

  const { filterMedia } = useFetchContext();

  return (
    <Wrapper
      style={{
        backgroundImage: `url(${createBgImg(poster, poster_path)}) `,
      }}
    >
      <div className="layer">
        <div className="top">
          <div className="top-left"></div>
          <div className="top-right">
            <button>{vote_average ? vote_average.toFixed(2) : 0.0}</button>
            <FavButton {...props}></FavButton>
          </div>
        </div>
        <div className="bottom">
          <div className="bottom-left">
            <div className="description">
              <h1>{title || name}</h1>
              <p>
                {description && description.length > 100
                  ? description.slice(0, 150) + "..."
                  : description}
              </p>
            </div>
          </div>
          <div className="bottom-right">
            <Link to={`/${media_type ? media_type : filterMedia}/${id}`}>
              <button className="movie-page">More...</button>
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: 100px auto;
  height: 600px;
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  border-radius: 50px;
  margin-bottom: 20px;
  background-position: 50% 50%;

  .layer {
    display: grid;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 4;
    border-radius: 50px;
    min-height: 100%;
    user-select: none;
    background: linear-gradient(
      180deg,
      rgba(217, 217, 217, 0.3953) 0%,
      rgba(0, 0, 0, 0.67) 63.54%
    );
  }

  button {
    color: #ffffff;
    white-space: nowrap;
    height: 50px;
    width: fit-content;
    border-radius: 50px;
    border: none;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  button img {
    height: 30px;
    width: 30px;
    padding: 0;
    margin: 0;
  }

  .movie-page {
    width: 140px;
    font-size: 1.2rem;
    font-weight: bold;
    height: 60px;
    background-color: #ffffff;
    color: #000000;
    cursor: pointer;
  }

  .top {
    display: grid;
    grid-template-columns: auto 200px;
    grid-row-start: 1;
    grid-row-end: 2;
    padding: 40px;
    align-items: flex-start;
  }

  .top-left {
    display: flex;
    align-items: center;
  }
  .top-right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .top button {
    height: 60px;
    width: 60px;
  }

  .icon {
    height: 30px;
    width: 30px;
  }

  .bottom {
    display: flex;
    align-items: flex-end;
    grid-row-start: 3;
    grid-row-end: 4;
    grid-gap: 10px;
    padding: 40px;
  }

  .bottom-left {
  }

  span {
    color: #ffffff;
  }
`;

export default FeatureCard;
