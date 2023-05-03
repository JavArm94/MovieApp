import React from "react";
import styled from "styled-components";
import emptyStarIcon from "../assets/star-empty.png";
import halfStarIcon from "../assets/star-half.png";
import filledStarIcon from "../assets/star-filled.png";
import FavButton from "./FavButton";
import { poster_url as poster } from "../utils/constants";
import { formatDate, createBgImg } from "../utils/helpers";
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
  const props = {
    id,
    title,
    overview,
    vote_average,
    poster_path,
    name,
    media_type,
  };
  //const { genres, genre_error } = useFetchContext();

  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    const stars = Math.round(vote_average) / 2;

    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <img src={filledStarIcon} alt="" className="star" />
        ) : stars >= number ? (
          <img src={halfStarIcon} alt="" className="star" />
        ) : (
          <img src={emptyStarIcon} alt="" className="star" />
        )}
      </span>
    );
  });

  let description = overview || "";

  /*
  const checkMovie = (idMovie) => {
    const userFavMovies = JSON.parse(localStorage.getItem("favMovies"));
    const check = userFavMovies.filter((movie) => (movie.id = idMovie));
    if (check.length > 0) {
      return true;
    }
    return false;
  };

  const favMovie = (idMovie) => {
    const userFavMovies = JSON.parse(localStorage.getItem("favMovies"));
    console.log(userFavMovies);
    let newUserFavMovies = [];
    if (checkMovie(idMovie)) {
      newUserFavMovies = userFavMovies.filter((movie) => movie.id != idMovie);
      localStorage.setItem("favMovies", JSON.stringify(newUserFavMovies));
    } else {
      newUserFavMovies = userFavMovies.push({ id: idMovie, favorite: true });
      localStorage.setItem("favMovies", JSON.stringify(newUserFavMovies));
    }
  };
  
  if (!genre_error) {
    genre_list = genres
      .filter((element) => genre_ids.includes(element.id))
      .map((gen) => {
        return gen.name;
      })
      .join(", ");
  }*/

  return (
    <Wrapper
      style={{
        backgroundImage: `url(${createBgImg(poster, poster_path)}) `,
      }}
    >
      <div className="layer">
        <div className="movie-info">
          <FavButton {...props}></FavButton>
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
      </div>
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

  /*
  .poster {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: black;
    position: relative;
    grid-column: 1/2;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    border-radius: 20px;
    height: 100%;
    z-index: 0;
  }

  .favorite {
    position: absolute;
    left: 5px;
    top: 5px;
    height: 25px;
    width: 25px;
    cursor: pointer;
  }

  .favorite:hover {
    content: url($ {filledHeartIcon});
  }

  .score {
    position: absolute;
    top: 165px;
    left: 10px;
    cursor: pointer;
  }

  .score:hover {
    filter: invert(44%) sepia(84%) saturate(1308%) hue-rotate(92deg)
      brightness(98%) contrast(106%);
  }

   <button  onClick={() => favMovie(id)}></button>
*/
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
