import React from "react";
import styled from "styled-components";
import { poster_url as poster } from "../utils/constants";
import FavButton from "./FavButton";
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
  const { filterMedia } = useFetchContext();
  const media_type_fav = media_type ? media_type : filterMedia; // featured fetch missing field media_type FIX
  const props = {
    id,
    title,
    overview: description,
    vote_average,
    poster_path,
    name,
    media_type: media_type_fav,
  };
  const record_name = title || name;

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
          <div className="title">
            <h1>{record_name}</h1>
          </div>
          <div className="description">
            {description && description.length > 100
              ? description.slice(0, 150) + "..."
              : description}
          </div>
          <div className="more">
            <Link to={`/${media_type_fav}/${id}`}>
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
    display: grid;
    grid-template-columns: 60% 40%;
    grid-template-rows: 60% 40%;
    align-items: flex-end;
    grid-row-start: 3;
    grid-row-end: 4;
    padding: 40px;
  }

  .title {
    grid-column-start: 1;
    grid-column-end: 3;
    padding-bottom: 30px;
  }

  .more {
    display: flex;
    margin-left: auto;
  }

  .description {
    margin-right: 5px;
  }

  span {
    color: #ffffff;
  }

  @media screen and (max-width: 1050px) {
    .movie-page {
      width: 100px;
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 800px) {
    height: 800px;

    .title {
      font-size: 2rem;
    }

    .description {
      font-size: 1.6rem;
    }

    .movie-page {
      height: 80px;
      width: 160px;
      font-size: 1.6rem;
    }
  }

  @media screen and (max-width: 620px) {
    height: 600px;

    .title {
      font-size: 1.5rem;
      padding-bottom: 10px;
    }

    .description {
      font-size: 1rem;
    }

    .movie-page {
      height: 60px;
      width: 120px;
      font-size: 1.4rem;
    }
  }

  @media screen and (max-width: 510px) {
    height: 500px;

    .title {
      font-size: 0.8rem;
      padding-bottom: 5px;
    }

    .description {
      font-size: 0.8rem;
    }

    .movie-page {
      height: 50px;
      width: 100px;
      font-size: 1.2rem;
    }
  }
`;

export default FeatureCard;
