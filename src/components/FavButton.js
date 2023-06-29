import React, { useState } from "react";
import styled from "styled-components";
import emptyHeartIcon from "../assets/heart-empty.png";
import filledHeartIcon from "../assets/heart-filled.png";

const FavButton = ({
  id: idMovie,
  title,
  name,
  overview,
  description,
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
    let favDescription = overview || description;
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
        description: favDescription,
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
export default FavButton;
