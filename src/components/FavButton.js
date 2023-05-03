import React, { useState } from "react";
import styled from "styled-components";
import emptyHeartIcon from "../assets/heart-empty.png";
import filledHeartIcon from "../assets/heart-filled.png";

const FavButton = ({
  id: idMovie,
  title,
  name,
  overview,
  vote_average,
  poster_path,
  media_type,
}) => {
  const checkMovie = (id) => {
    const userFavMovies = JSON.parse(localStorage.getItem("favMovies"));
    if (userFavMovies.length > 0) {
      const check = userFavMovies.filter((movie) => movie.id == id);
      if (check.length > 0) {
        return true;
      }
    }
    return false;
  };

  const [faved, setFaved] = useState(checkMovie(idMovie));
  const favMovie = (id) => {
    let userFavMovies = JSON.parse(localStorage.getItem("favMovies"));
    if (checkMovie(id)) {
      userFavMovies = userFavMovies.filter((movie) => movie.id !== id);
      localStorage.setItem("favMovies", JSON.stringify(userFavMovies));
      setFaved(false);
    } else {
      userFavMovies.push({
        id,
        favorite: true,
        media_type,
        title,
        name,
        overview,
        vote_average,
        poster_path,
      });
      localStorage.setItem("favMovies", JSON.stringify(userFavMovies));
      setFaved(true);
    }
  };

  return (
    <Wrapper
      onClick={() => {
        favMovie(idMovie);
      }}
      className="fav"
    >
      <img src={faved ? filledHeartIcon : emptyHeartIcon} alt="" />
    </Wrapper>
  );
};

const Wrapper = styled.button`
  img {
    transform: scale(1);
    transition: transform 0.5s ease-in-out;
    position: relative;
    top: 2px;
    left: 1px;
    height: 25px;
    width: 25px;
  }

  img:hover {
    transform: scale(1.2);
    transition: transform 0.5s ease-in-out;
  }
`;

/*
const Wrapper = styled.button`
  display: grid;
  grid-template-columns: 35% 65%;
  width: 400px;
  height: 200px;
  background-color: #ffffff;
  padding: 6px;
  //  border: red 1px solid;
  font-size: 12px;
  border-radius: 5px;

  .poster {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: black;
    position: relative;
    grid-column: 1/2;
    border-radius: 5px;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.25);
    overflow: hidden;
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

  .star {
    height: 23px;
    width: 23px;
  }

  .movie-info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: black;
    font-weight: 700;
    padding: 5px;
  }

  h1,
  p {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
*/
export default FavButton;
