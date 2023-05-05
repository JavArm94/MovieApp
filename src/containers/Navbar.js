import { Search, Filter, UserProfile } from "../components";
import React from "react";
import styled from "styled-components";
import apiLogos from "../assets/movie_db_large_logo.svg";

const NavBar = () => {
  return (
    <Wrapper>
      <a
        href="https://www.themoviedb.org/"
        target="_blank"
        className="api-logo"
      >
        <img src={apiLogos} />
      </a>
      <Search></Search>
      <Filter></Filter>
      <UserProfile></UserProfile>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr);
  gap: 10px;

  .api-logo {
    display: none;
  }

  @media screen and (max-width: 1300px) {
    width: 1000px;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);

    .api-logo {
      display: initial;
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
    }

    .api-logo img {
      scale: 0.8;
    }
  }

  @media screen and (max-width: 1050px) {
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 1.5fr);
    width: 800px;
  }

  @media screen and (max-width: 800px) {
    width: 600px;
  }

  @media screen and (max-width: 620px) {
    display: flex;
    flex-direction: column;
    width: 480px;
    padding-bottom: 20px;
  }
`;

export default NavBar;
